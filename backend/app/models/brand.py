from pydantic import BaseModel

class Brand(BaseModel):
    name: str
    domain: str
    created_by: str
