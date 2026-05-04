from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.core.security import create_access_token
from app.core.hash import verificar_senha

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def authenticate_user(self, email: str, senha: str):
        print(f"[DEBUG] Buscando usuário: {email}")
        usuario = self.db.query(Usuario).filter(Usuario.email == email).first()
        
        if not usuario:
            print(f"[DEBUG] Usuário NÃO encontrado: {email}")
            return None
        
        print(f"[DEBUG] Usuário encontrado: {usuario.nome}")
        print(f"[DEBUG] Hash no banco: {usuario.senha_hash}")
        print(f"[DEBUG] Senha fornecida: {senha}")
        
        resultado = verificar_senha(senha, usuario.senha_hash)
        print(f"[DEBUG] Resultado bcrypt: {resultado}")
        
        if not resultado:
            return None
        
        return usuario
    
    def login(self, email: str, senha: str):
        usuario = self.authenticate_user(email, senha)
        
        if not usuario:
            return None
        
        access_token = create_access_token(data={"sub": str(usuario.id_usuario)})
        
        return {
            "access_token": access_token,
            "nome_usuario": usuario.nome,
            "perfil": usuario.perfil
        }