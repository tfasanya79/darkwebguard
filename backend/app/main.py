from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.api import alerts, users, brands, admin
from backend.app.db.session import init_db
import os

app = FastAPI(title="DarkWebGuard")

# CORS for frontend-backend communication
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url and frontend_url != "*":
    allow_origins = [frontend_url]
else:
    allow_origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler for generic errors
import logging
logger = logging.getLogger("uvicorn.error")

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# Use FastAPI lifespan event for DB initialization
@app.on_event("startup")
def on_startup():
    init_db()
    # Print all registered routes for debugging (safe version)
    print("\nRegistered routes:")
    for route in app.routes:
        path = getattr(route, 'path', None)
        methods = getattr(route, 'methods', None)
        if path and methods:
            print(f"{path} -> {methods}")
        elif path:
            print(f"{path}")

app.include_router(alerts.router, prefix="/api/alerts")
app.include_router(users.router, prefix="/api/users")
app.include_router(brands.router, prefix="/api/brands")
app.include_router(admin.router, prefix="/admin")

@app.get("/")
def root():
    return {"message": "Welcome to DarkWebGuard"}

# Health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

# Debug endpoint to list all registered routes (only enabled in development)
import sys
IS_PRODUCTION = os.getenv("ENV", "development").lower() == "production"

if not IS_PRODUCTION:
    @app.get("/debug/routes")
    def debug_routes():
        return [
            {"path": getattr(route, 'path', str(route)), "methods": list(getattr(route, 'methods', []))}
            for route in app.routes
        ]
