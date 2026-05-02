from fastapi import FastAPI
from app.api.routes import auth, usuarios

app = FastAPI(title="Assistência Técnica API", version="1.0.0")

# Registrar rotas
app.include_router(auth.router)
app.include_router(usuarios.router)

@app.get("/")
async def root():
    return {"message": "API Assistência Técnica"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}