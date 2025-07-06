from fastapi import FastAPI
from backend.app.api import alerts, users, brands, admin
from backend.app.db.session import init_db

import os
app = FastAPI(title="DarkWebGuard")

init_db()  # Initialize DB on startup

app.include_router(alerts.router, prefix="/alerts")
app.include_router(users.router, prefix="/users")
app.include_router(brands.router, prefix="/brands")
app.include_router(admin.router, prefix="/admin")

@app.get("/")
def root():
    return {"message": "Welcome to DarkWebGuard"}
