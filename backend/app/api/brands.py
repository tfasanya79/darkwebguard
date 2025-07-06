from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.db.models import Brand
from backend.app.models.brand import Brand as BrandSchema
from backend.app.api.users import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[BrandSchema])
@router.get("", response_model=list[BrandSchema])
def list_brands(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    brands = db.query(Brand).filter(Brand.created_by == current_user.email).all()
    return brands

@router.post("/", response_model=BrandSchema)
def add_brand(brand: BrandSchema, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    db_brand = Brand(name=brand.name, domain=brand.domain, created_by=current_user.email)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

@router.delete("/{brand_id}")
def delete_brand(brand_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    brand = db.query(Brand).filter(Brand.id == brand_id, Brand.created_by == current_user.email).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    db.delete(brand)
    db.commit()
    return {"ok": True}
