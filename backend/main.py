# main.py
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from models import UserRegister, UserLogin, TokenData
from auth import hash_password, verify_password, create_access_token
from jose import JWTError, jwt
from database import users_collection
from gemini import ask_gemini  # ✅ AI funksiyasi

from bson.objectid import ObjectId

app = FastAPI()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- AUTH ------------------------

@app.post("/register")
async def register(user: UserRegister):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Bu email allaqachon mavjud")

    hashed = hash_password(user.password)
    new_user = {"email": user.email, "password": hashed}
    await users_collection.insert_one(new_user)

    return {"msg": "Foydalanuvchi ro'yxatdan o'tdi"}

@app.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Email yoki parol noto‘g‘ri")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token noto‘g‘ri")
        return email
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Tokenni ochib bo‘lmadi")

@app.get("/me")
async def read_users_me(email: str = Depends(get_current_user)):
    return {"email": email}

# --------------------- AI CHAT (Gemini 1.5 Pro) ------------------------

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    answer = ask_gemini(req.message)
    return {"response": answer}
