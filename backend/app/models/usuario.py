from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from app.db.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    senha_hash = Column(String(255), nullable=False)
    perfil = Column(String(50), nullable=False)  # 'Admin' ou 'Técnico'
    status = Column(String(20), default="Ativo")  # 'Ativo', 'Inativo' ou 'Bloqueado'
    token_recuperacao = Column(String(255), nullable=True)
    data_expiracao_token = Column(TIMESTAMP, nullable=True)
    data_criacao = Column(TIMESTAMP, server_default=func.now())