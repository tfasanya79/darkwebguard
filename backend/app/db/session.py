from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.db.models import Base
import os

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./darkwebguard.db")

# Create engine with proper SQLite configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables on first run
def init_db():
    Base.metadata.create_all(bind=engine)
