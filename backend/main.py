from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from routers import users, suppliers  # Import suppliers router
from database import Base, engine, get_db
from crud import get_suppliers_grouped_by_sections
from routes import router

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
app.include_router(suppliers.router, prefix="/suppliers", tags=["suppliers"])  # Add suppliers router
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/suppliers")
def suppliers_page(db: Session = Depends(get_db)):
    grouped_suppliers = get_suppliers_grouped_by_sections(db)
    return {"grouped_suppliers": grouped_suppliers}