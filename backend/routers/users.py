from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter()

@router.post("/signup")
async def signup(request: schemas.SignupRequest, db: Session = Depends(get_db)):
    # Check if the email already exists
    existing_user = crud.get_user_by_email(db, request.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create a new user
    new_user = crud.create_user(db, request.name, request.email, request.password_hash)
    return {"status": "ok", "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}}