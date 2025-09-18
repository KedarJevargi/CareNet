from fastapi import File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
import ollama
from schemas import chatSchema
from utils import splitText
from config import connectVDB
import json # Import the json module

def get_ai_response_controller(chat_data: chatSchema.SendChat):
    """
    Processes a user's chat message, retrieves relevant context from a vector database,
    and generates an AI response using the Ollama Mistral model.

    Args:
        chat_data (chatSchema.SendChat): The incoming chat message data from the user.

    Returns:
        dict: A dictionary containing the AI's response, success status, and error status.
    """
    
    try:
        # Step 1: Split the user's text into chunks and add them to the vector database.
        # It's important to note that adding user data directly to the VDB might not be
        # the intended use case for a simple chat. Typically, the VDB contains
        # a pre-existing knowledge base. This assumes `chat_data` itself is the document.
        chunks = splitText(chat_data.message)
        
        # Add the documents to the vector database.
        # This assumes the 'collection' object is correctly initialized and has an 'add' method.
        # The 'documents' parameter should be a list of strings.
        connectVDB.collection.add(
            documents=chunks,
            ids=[f"chunk_{i}" for i in range(len(chunks))]
        )
        
        # Step 2: Query the vector database to find relevant context for the user's question.
        # The 'query_texts' should be a list containing the user's message.
        results = connectVDB.collection.query(
            query_texts=[chat_data.message],
            n_results=10
        )
        
        # Step 3: Extract the documents from the query results and concatenate them into a single string.
        # We need to handle the case where no documents are returned.
        data = ''
        if results["documents"] and results["documents"][0]:
            for doc in results["documents"][0]:
                data += doc + "\n" # Adding a newline for better readability in the prompt
        
        # Step 4: Call the Ollama API to generate a response.
        ollama_response = ollama.chat(
            model="mistral:7b",
            messages=[
                {"role": "system", "content": 
                 "You are an AI assistant that answers questions using the context provided. "
                 "If the answer is not in the context, say you dont know. "
                 "Do not make up information."
                },
                {"role": "user", "content": 
                 f"Context:\n{data}\n\nQuestion: {chat_data.message}"
                }
            ]
        )
        
        # Step 5: Extract the AI's response text from the Ollama response object.
        ai_response_content = ollama_response['message']['content']
        
        # Step 6: Return a JSON-formatted dictionary.
        # The 'response' key should be the AI's response.
        return {
            "response": ai_response_content,
            "error": False,
            "success": True
        }

    except Exception as e:
        # Step 7: Handle any exceptions that occur and return an error response.
        print(f"An error occurred: {e}")
        return {
            "response": "An internal error occurred while processing your request.",
            "error": True,
            "success": False
        }


async def send_pdf_controller(file: UploadFile = File(...)):
    """
    Endpoint to send a chat message with a PDF file.
    The PDF content will be used as context for the AI.
    """
    # Check if the uploaded file is a PDF
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF files are supported."
        )

    # You would typically pass the file content to your controller
    # For now, we'll just return a success message.
    # The actual processing will be done in the controller.
    # See the updated controller code for how to handle the file.
    return JSONResponse(content={"message": "File received and ready for processing."})