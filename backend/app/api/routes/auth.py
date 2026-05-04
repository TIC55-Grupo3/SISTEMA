from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.database import get_db
from app.models.token_blacklist import TokenBlacklist

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    already_invalid = db.query(TokenBlacklist).filter(
        TokenBlacklist.token == token
    ).first()

    if already_invalid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token já foi invalidado"
        )

    blacklisted = TokenBlacklist(token=token, invalidated_at=datetime.utcnow())
    db.add(blacklisted)
    db.commit()

    return {"message": "Logout realizado com sucesso"}