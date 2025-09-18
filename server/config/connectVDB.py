from typing import Dict
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.Client()
ollama_ef = embedding_functions.OllamaEmbeddingFunction(model_name="nomic-embed-text:v1.5")


collection = client.get_or_create_collection(
    name="docs", 
    embedding_function=ollama_ef
)





