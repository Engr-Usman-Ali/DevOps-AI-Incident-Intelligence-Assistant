from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models import User
from app.routes.auth import router as auth_router

app = FastAPI(
    title="DevOps AI Assistant API",
    version="1.0.0",
)

# Create tables
Base.metadata.create_all(bind=engine)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Backend Running 🚀"}