from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()
OPENAI_KEY = os.getenv("OPENAI_API_KEY", "")

class Body(BaseModel):
    prompt: str
    lang: str = "en"

@app.get("/health")
def health():
    return {"status": "ai ok"}

@app.post("/generate")
def generate(b: Body):
    # Demo: returns echo or uses OpenAI if key present
    if OPENAI_KEY:
        return {"result": f"(would call OpenAI) {b.prompt} in {b.lang}"}
    return {"result": f"(placeholder) {b.prompt} [{b.lang}]"}
