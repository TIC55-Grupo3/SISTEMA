from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.db.database import Base

class TokenBlacklist(Base):
    __tablename__ = "token_blacklist"

    token = Column(String, primary_key=True, index=True)
    invalidated_at = Column(DateTime, default=datetime.utcnow)