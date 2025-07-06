from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.db.models import User, Alert
from backend.app.api.users import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users")
def list_users(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user.is_admin:
        return []
    return db.query(User).all()

@router.get("/alerts")
def list_all_alerts(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not current_user.is_admin:
        return []
    return db.query(Alert).all()
