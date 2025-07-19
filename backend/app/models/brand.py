from pydantic import BaseModel
from typing import Optional

class Brand(BaseModel):
    name: str
    domain: str
    created_by: Optional[str] = None
    
    class Config:
        from_attributes = True
