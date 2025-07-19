from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app.db.session import SessionLocal
from backend.app.db.models import Alert, Brand
from backend.app.models.alert import Alert as AlertSchema
from backend.app.api.users import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[AlertSchema])
@router.get("", response_model=List[AlertSchema])
def list_alerts(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_brands = db.query(Brand).filter(Brand.created_by == current_user.email).all()
    brand_names = [b.name for b in user_brands]
    alerts = db.query(Alert).filter(Alert.brand.in_(brand_names)).all()
    return alerts

@router.get("/{alert_id}", response_model=AlertSchema)
def get_alert(alert_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_brands = db.query(Brand).filter(Brand.created_by == current_user.email).all()
    brand_names = [b.name for b in user_brands]
    alert = db.query(Alert).filter(Alert.id == alert_id, Alert.brand.in_(brand_names)).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.post("/mark_read")
def mark_alert_read(alert_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_brands = db.query(Brand).filter(Brand.created_by == current_user.email).all()
    brand_names = [b.name for b in user_brands]
    alert = db.query(Alert).filter(Alert.id == alert_id, Alert.brand.in_(brand_names)).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    # Fix: set to True for boolean columns
    alert.is_read = True
    db.commit()
    return {"ok": True}
