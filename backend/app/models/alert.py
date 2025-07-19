from pydantic import BaseModel
from typing import Optional
import datetime

class Alert(BaseModel):
    id: int
    brand: str
    source: str
    message: str
    risk_score: float
    is_read: Optional[bool] = False
    created_at: Optional[datetime.datetime] = None
    
    class Config:
        from_attributes = True
