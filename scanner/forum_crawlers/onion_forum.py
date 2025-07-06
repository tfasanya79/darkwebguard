import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app/db')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/app/services')))

from backend.app.db.session import SessionLocal
from backend.app.db.models import Brand, Alert
from backend.app.services.risk_score import calculate_risk

def scan_onion_forum():
    db = SessionLocal()
    try:
        brands = db.query(Brand).all()
        for brand in brands:
            # Simulate a found mention for demo
            mention = f"Onion forum scam targeting {brand.name} impersonation"
            source = "onion_forum"
            risk = calculate_risk(mention)
            exists = db.query(Alert).filter_by(brand=brand.name, message=mention).first()
            if not exists:
                alert = Alert(brand=brand.name, source=source, message=mention, risk_score=risk)
                db.add(alert)
                db.commit()
                print(f"[+] Alert created for {brand.name} on onion_forum: {mention}")
    finally:
        db.close()

if __name__ == "__main__":
    scan_onion_forum()
