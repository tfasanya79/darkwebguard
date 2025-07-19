import sys
import os

# Add the project root to the Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.insert(0, project_root)
sys.path.insert(0, os.path.join(project_root, 'backend', 'app'))

from backend.app.db.session import SessionLocal
from backend.app.db.models import Brand, Alert
from backend.app.services.risk_score import calculate_risk

def scan_darkreddit():
    db = SessionLocal()
    try:
        brands = db.query(Brand).all()
        for brand in brands:
            # Simulate a found mention for demo
            mention = f"DarkReddit post about {brand.name} leaked credentials"
            source = "darkreddit"
            risk = calculate_risk(mention)
            exists = db.query(Alert).filter_by(brand=brand.name, message=mention).first()
            if not exists:
                alert = Alert(brand=brand.name, source=source, message=mention, risk_score=risk)
                db.add(alert)
                db.commit()
                print(f"[+] Alert created for {brand.name} on darkreddit: {mention}")
    finally:
        db.close()

if __name__ == "__main__":
    scan_darkreddit()
