# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client["authdb"]

users_collection = db["users"]
chatlogs_collection = db["chatlogs"]  # ➕ Chat logs uchun
