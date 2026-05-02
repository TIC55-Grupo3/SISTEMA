#Endpoint que só pode ser acessado com token JWT válido.
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

@router.get("/me")
def get_me(current_user: Usuario = Depends(get_current_user)):
    return {
        "id": current_user.id_usuario,
        "nome": current_user.nome,
        "email": current_user.email
    }