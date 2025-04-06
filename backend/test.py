from pymongo import MongoClient

client = MongoClient("MONGO_URL_HERE")
print(client.list_database_names())
