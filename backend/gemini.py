import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# ✅ To‘g‘ri model nomi
model = genai.GenerativeModel(model_name="gemini-2.0-flash")

def ask_gemini(message: str) -> str:
    try:
        response = model.generate_content(message)
        return response.text
    except Exception as e:
        print("Gemini xatosi:", e)
        return "AI bilan bog‘lanishda xatolik yuz berdi."
