from pydantic import BaseModel

class Alert(BaseModel):
    id: int
    brand: str
    source: str
    message: str
    risk_score: float
