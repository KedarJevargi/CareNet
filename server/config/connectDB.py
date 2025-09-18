from fastapi import Request
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import logging


load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

async def connect_DB(app):
    try:
        app.mongodb_client = AsyncIOMotorClient(
            MONGODB_URI,
            tls=True,
            tlsAllowInvalidCertificates=True
        )

        app.mongodb = app.mongodb_client.get_database("CareNet")
        
        # Test the connection
        await app.mongodb_client.admin.command('ping')
        
        # # Get collection handles
        # app.db_addresses = app.mongodb.get_collection("users")
        # app.db_cartproducts = app.mongodb.get_collection("chats")
        # app.db_categories = app.mongodb.get_collection("categories")
        # app.db_orders = app.mongodb.get_collection("orders")
        # app.db_products = app.mongodb.get_collection("products")
        app.db_chats = app.mongodb.get_collection("chats")
        app.db_users = app.mongodb.get_collection("users")
        
        logging.info("✅ Connected to MongoDB and collection handles are ready.")
    except Exception as e:
        logging.error("❌ MongoDB connection error: %s", e)
        raise e

async def disconnect_DB(app):
    try:
        if hasattr(app, 'mongodb_client'):
            app.mongodb_client.close()
            logging.info("✅ MongoDB connection closed.")
    except Exception as e:
        logging.error("❌ Error closing MongoDB connection: %s", e)