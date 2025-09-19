from fastapi import APIRouter, Request, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from controllers import userController,chatController
from models import userModel
from schemas import userSchema, chatSchema

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register", status_code=201)
async def register_user(request: Request, data: userModel.User):
    result = await userController.register_user_controller(request, data)
    return result


@router.post("/login", status_code=200)
async def login_user(request: Request, data: userSchema.LoginUser):
    result = await userController.login_user_controller(request, data)
    return result


@router.post("/chat", status_code=200)
async def chat(chat_data: chatSchema.SendChat):
    result = chatController.get_ai_response_controller(chat_data)  # Remove await
    return result


@router.post("/send-pdf", status_code=200)
async def pdf(chat_data: chatSchema.SendChat, pdf_file: UploadFile = File(...)):
    # This endpoint is for uploading a PDF file along with a question.
    if not pdf_file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF files are supported."
        )
    
    result = await chatController.send_pdf_controller(chat_data, pdf_file)
    return result
