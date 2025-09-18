from datetime import datetime
from bson import ObjectId
from fastapi import Request, requests, status
from fastapi.responses import JSONResponse
import bcrypt




from models import userModel
from schemas import userSchema

# Helper function to convert MongoDB document to JSON-serializable format
def serialize_mongo_doc(doc):
    """Recursively convert MongoDB document to JSON-serializable format"""
    if doc is None:
        return None
    
    if isinstance(doc, dict):
        return {key: serialize_mongo_doc(value) for key, value in doc.items()}
    elif isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    elif isinstance(doc, ObjectId):
        return str(doc)
    elif isinstance(doc, datetime):
        return doc.isoformat()
    else:
        return doc

async def register_user_controller(request: Request, user_data: userModel.User):
    try:
        existing_user = await request.app.db_users.find_one({"email": user_data.email})

        if existing_user:
            return JSONResponse(
                content={
                    "message": "Email is already registered",
                    "error": True,
                    "success": False
                },
                status_code=status.HTTP_400_BAD_REQUEST
            )
        
        salt = bcrypt.gensalt(12)
        hashed_password = bcrypt.hashpw(user_data.password.encode("utf-8"), salt).decode("utf-8")
        user_data.password = hashed_password

        result = await request.app.db_users.insert_one(user_data.model_dump())
        new_user = await request.app.db_users.find_one({"_id": result.inserted_id})

        serialized_user = serialize_mongo_doc(new_user)

        if "password" in serialized_user:
            del serialized_user["password"]

        return JSONResponse(
            content={
                "message": "User created successfully. Please check your email to verify your account.",
                "error": False,
                "success": True,
                "data": serialized_user
            },
            status_code=status.HTTP_201_CREATED
        )
    except Exception as e:
        # Catch any unexpected errors
        return JSONResponse(
            content={
                "message": f"An error occurred: {str(e)}",
                "error": True,
                "success": False
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


async def login_user_controller(request: Request, user_data: userSchema.LoginUser):
    """
    Controller to authenticate user login
    """
    try:
        # Find user by email
        existing_user = await request.app.db_users.find_one({"email": user_data.email})

        if not existing_user:
            return JSONResponse(
                content={
                    "message": "Invalid email or password",
                    "error": True,
                    "success": False
                },
                status_code=status.HTTP_401_UNAUTHORIZED
            )
        

        # Verify password
        is_password_valid = bcrypt.checkpw(
            user_data.password.encode("utf-8"),
            existing_user["password"].encode("utf-8")
        )

        if not is_password_valid:
            return JSONResponse(
                content={
                    "message": "Invalid email or password",
                    "error": True,
                    "success": False
                },
                status_code=status.HTTP_401_UNAUTHORIZED
            )
        
        # Convert ObjectId to string before passing to token functions
        user_id_str = str(existing_user["_id"])

        # Remove password from response data BEFORE serialization
        user_response = serialize_mongo_doc(existing_user)
        if "password" in user_response:
            del user_response["password"]


        
        # Create JSONResponse first
        response = JSONResponse(
            content={
                "message": "Login successful",
                "error": False,
                "success": True,
                "data": user_response,
            },
            status_code=status.HTTP_200_OK
        )
        
        return response

    except Exception as e:
        # Catch any unexpected errors
        return JSONResponse(
            content={
                "Origin":"Login controller error",
                "message": f"An error occurred: {str(e)}",
                "error": True,
                "success": False
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )