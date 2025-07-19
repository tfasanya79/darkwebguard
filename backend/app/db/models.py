from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_admin = Column(Boolean, default=False)
    subscription_status = Column(String, default="inactive")
    
    # Relationship with brands
    brands = relationship("Brand", back_populates="owner")

class Brand(Base):
    __tablename__ = "brands"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    domain = Column(String)
    created_by = Column(String, ForeignKey("users.email"))
    
    # Relationship with user and alerts
    owner = relationship("User", back_populates="brands")
    alerts = relationship("Alert", back_populates="brand_obj")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, ForeignKey("brands.name"))
    source = Column(String)
    message = Column(String)
    risk_score = Column(Float)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationship with brand
    brand_obj = relationship("Brand", back_populates="alerts")
