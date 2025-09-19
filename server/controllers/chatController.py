from fastapi import File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
import ollama
import time
from schemas import chatSchema
from utils.splitText import split_text  # ✅ FIXED: direct function import
from config import connectVDB


def get_ai_response_controller(chat_data: chatSchema.SendChat):
    """
    Processes a user's chat message, retrieves relevant context from a vector database,
    and generates an AI response using the Ollama Mistral model.
    """

    try:
        # Step 1: Split the user's text into chunks and add them to the vector database
        chunks = split_text(chat_data.msg)

        # Generate unique IDs for each chunk to avoid collisions
        unique_prefix = str(int(time.time() * 1000))
        connectVDB.collection.add(
            documents=chunks,
            ids=[f"{unique_prefix}_chunk_{i}" for i in range(len(chunks))]
        )

        # Step 2: Query the vector database for relevant context
        results = connectVDB.collection.query(
            query_texts=[chat_data.msg],  # ✅ FIXED: use .msg not .message
            n_results=10
        )

        # Step 3: Build context from retrieved documents
        data = ""
        if results.get("documents") and results["documents"][0]:
            for doc in results["documents"][0]:
                data += doc + "\n"

        # Step 4: Generate response with Ollama
        ollama_response = ollama.chat(
            model="mistral:7b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an AI assistant that answers questions using the context provided. "
                        "If the answer is not in the context, say you don't know. "
                        "Do not make up information."
                    )
                },
                {
                    "role": "user",
                    "content": f"Context:\n{data}\n\nQuestion: {chat_data.msg}"
                }
            ]
        )

        # Step 5: Extract AI response
        ai_response_content = ollama_response["message"]["content"]

        return {"response": ai_response_content, "error": False, "success": True}

    except Exception as e:
        print(f"An error occurred in get_ai_response_controller: {e}")
        return {
            "response": "An internal error occurred while processing your request.",
            "error": True,
            "success": False
        }


async def send_pdf_controller(file: UploadFile = File(...)):
    """Endpoint to handle PDF uploads (future processing)."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF files are supported."
        )

    return JSONResponse(content={"message": "File received and ready for processing."})
