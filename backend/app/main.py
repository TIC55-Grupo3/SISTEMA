from fastapi import FastAPI
from app.api.routes import auth

app = FastAPI(title="Assistência Técnica API", version="1.0.0")

app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "API Assistência Técnica"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}