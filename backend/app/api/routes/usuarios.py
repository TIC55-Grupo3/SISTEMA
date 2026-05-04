from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.models.usuario import Usuario

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

@router.get("/me")
def get_me(current_user: Usuario = Depends(get_current_user)):
    return {
        "id": current_user.id_usuario,
        "nome": current_user.nome,
        "email": current_user.email,
        "perfil": current_user.perfil.value if hasattr(current_user.perfil, 'value') else current_user.perfil,
        "status": current_user.status,
        "data_criacao": current_user.data_criacao.strftime("%d/%m/%Y %H:%M") if current_user.data_criacao else None
    }