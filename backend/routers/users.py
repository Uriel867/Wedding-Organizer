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

    # Create a new user with rank set to None
    new_user = crud.create_user(
        db,
        name=request.name,
        email=request.email,
        password_hash=hashed_password.decode('utf-8'),
        rank=None  # Explicitly set rank to None
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

    # Always return user id in response
    if user.rank is None:
        return {"status": "kyc", "message": "User needs to complete KYC", "user": {"id": user.id, "name": user.name, "email": user.email}}
    else:
        return {"status": "suppliers", "message": "Redirect to wedding suppliers", "user": {"id": user.id, "name": user.name, "email": user.email}}

class UpdateRankRequest(BaseModel):
    email: str
    rankChange: int  # Change rank dynamically

@router.post("/update-rank")
async def update_rank(request: UpdateRankRequest, db: Session = Depends(get_db)):
    """Update the user's rank dynamically."""
    user = crud.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the user's rank dynamically
    user.rank = max(0, min((user.rank or 0) + request.rankChange, 9))  # Ensure rank stays between 0 and 9
    db.commit()
    return {"status": "ok", "rank": user.rank}