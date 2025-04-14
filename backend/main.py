from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include user routes
app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}