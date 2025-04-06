from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from database import chatlogs_collection, elonlar
from auth import SECRET_KEY, ALGORITHM
from openai_client import ask_openai
from gemini import ask_gemini
import re

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# ---------------------------- MODELS ----------------------------

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str


# ---------------------- JWT VALIDATOR ---------------------------

async def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token noto‘g‘ri")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Tokenni ochib bo‘lmadi")


# ------------------ E'LON QIDIRUV (semantik) --------------------

async def search_elonlar_semantic(user_input: str) -> tuple:
    keywords = user_input.lower().split()
    filters = []

    for word in keywords:
        regex = re.compile(f".*{word}.*", re.IGNORECASE)
        filters.extend([
            {"title": regex},
            {"description": regex},
        ])

    query = {"$or": filters} if filters else {}
    cursor = elonlar.find(query).limit(10)
    results = await cursor.to_list(length=10)

    fallback_used = False
    if not results:
        fallback_used = True
        cursor = elonlar.find().limit(10)  # fallbackda barcha e'lonlardan 10 tasini olib beradi
        results = await cursor.to_list(length=10)

    return results, fallback_used


# ------------------- PROMPT YARATISH ----------------------------

def build_context_prompt_semantic(user_message: str, listings: list, fallback_used: bool = False) -> str:
    if not listings:
        return f"""
Foydalanuvchi so‘radi: "{user_message}"
E’lonlar bazasidan hech narsa topilmadi. Shunchaki mos javob yozing."""

    listing_texts = "\n\n".join([
        f"""{idx+1}. 
Sarlavha: {item.get('title', 'Nomaʼlum')}
Izoh: {item.get('description', 'Izoh yo‘q')}
Narx: {item.get('price', 'Nomaʼlum')}
Vaqti: {item.get('post_time', 'Nomaʼlum')}
Havola: {item.get('url', 'Yoq')}"""
        for idx, item in enumerate(listings)
    ])

    if fallback_used:
        prompt = f"""
Foydalanuvchi umumiy eʼlon so‘rovini yubordi: "{user_message}"

Quyida e'lonlar bazasidan topilgan 10 ta umumiy e'lon ro‘yxati keltirilgan:

{listing_texts}

Iltimos, ushbu ma’lumotlarga asoslanib foydalanuvchiga foydali tavsiya yozing.
Qaysi e'lonlar arzon yoki yaxshi ekanini tushuntiring.
Javobingiz o‘zbek tilida, tushunarli va foydalanuvchi savoliga mos bo‘lsin.
"""
    else:
        prompt = f"""
Foydalanuvchi quyidagicha izlash so‘rovini yubordi: "{user_message}"

Quyida bazadan topilgan mos eʼlonlar keltirilgan:

{listing_texts}

Iltimos, foydalanuvchiga o‘zbek tilida foydali javob yozing.
Qaysi eʼlonlar yaxshi variant bo‘lishi mumkinligini tushuntiring, muhim tafsilotlarni ajrating.
"""

    return prompt



# ------------------------ CHAT ENDPOINT -------------------------

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, email: str = Depends(get_current_user)):
    listings, fallback_used = await search_elonlar_semantic(req.message)

    if not listings:
        return {"response": "Hozircha e’lonlar bazasi bo‘sh yoki mos keladigan e’lon topilmadi."}

    prompt = build_context_prompt_semantic(req.message, listings, fallback_used)
    ai_response = ask_gemini(prompt)

    # ✅ Chat logni MongoDB bazasiga yozish
    chat_entry = {
        "email": email,
        "user_message": req.message,
        "ai_response": ai_response,
        "timestamp": datetime.utcnow(),
        "source": "elon_search"
    }
    await chatlogs_collection.insert_one(chat_entry)

    return {"response": ai_response}
