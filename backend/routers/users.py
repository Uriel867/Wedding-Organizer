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

    # Check if it's the user's first login
    if user.rank is None:
        return {"status": "kyc", "message": "User needs to complete KYC"}
    else:
        return {"status": "suppliers", "message": "Redirect to wedding suppliers"}

class UpdateRankRequest(BaseModel):
    email: str
    rank: int

@router.post("/update-rank")
async def update_rank(request: UpdateRankRequest, db: Session = Depends(get_db)):
    """Update the user's rank."""
    user = crud.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update the user's rank
    user.rank = request.rank
    db.commit()
    return {"status": "ok", "rank": user.rank}