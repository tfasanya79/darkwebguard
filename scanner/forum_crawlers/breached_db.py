
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app/db')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app/services')))

from backend.app.db.session import SessionLocal
from backend.app.db.models import Brand, Alert
from backend.app.services.risk_score import calculate_risk

def scan_forum():
    db = SessionLocal()
    try:
        brands = db.query(Brand).all()
        for brand in brands:
            # Simulate a found mention for demo
            mention = f"Fake scam post mentioning {brand.name}"
            source = "demo_forum"
            risk = calculate_risk(mention)
            # Check if alert already exists
            exists = db.query(Alert).filter_by(brand=brand.name, message=mention).first()
            if not exists:
                alert = Alert(brand=brand.name, source=source, message=mention, risk_score=risk)
                db.add(alert)
                db.commit()
                print(f"[+] Alert created for {brand.name}: {mention}")
    finally:
        db.close()

if __name__ == "__main__":
    scan_forum()
