from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, crud
from database import get_db
import bcrypt
from pydantic import BaseModel

router = APIRouter()

@router.post("/signup")
async def signup(request: schemas.SignupRequest, db: Session = Depends(get_db)):
    """Handle user signup."""
    # Check if the email already exists
    existing_user = crud.get_user_by_email(db, request.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())

    # Create a new user
    new_user = crud.create_user(
        db,
        name=request.name,
        email=request.email,
        password_hash=hashed_password.decode('utf-8'),
    )
    return {"status": "ok", "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}}

@router.post("/login")
async def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    """Handle user login."""
    # Retrieve the user by email
    user = crud.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify the password
    if not bcrypt.checkpw(request.password.encode('utf-8'), user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check if all three rank fields are NULL (None)
    if user.food is None and user.music is None and user.wedding_hall is None:
        return {"status": "kyc", "message": "User needs to complete KYC", "user": {"id": user.id, "name": user.name, "email": user.email}}
    else:
        return {"status": "suppliers", "message": "Redirect to wedding suppliers", "user": {"id": user.id, "name": user.name, "email": user.email}}