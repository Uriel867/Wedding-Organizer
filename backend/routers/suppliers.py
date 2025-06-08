from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Vendor
from pydantic import BaseModel
import bcrypt

router = APIRouter()

class SupplierRegister(BaseModel):
    business_name: str
    email: str
    password: str

@router.post("/register")
async def register_supplier(request: SupplierRegister, db: Session = Depends(get_db)):
    """Handle supplier registration."""
    # Check if the email already exists
    existing_supplier = db.query(Vendor).filter(Vendor.email == request.email).first()
    if existing_supplier:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())

    # Get the last ID in the vendors table
    last_vendor = db.query(Vendor).order_by(Vendor.id.desc()).first()
    new_id = (last_vendor.id + 1) if last_vendor else 1  # Increment last ID or start at 1

    # Create a new vendor with only essential fields
    new_vendor = Vendor(
        id=new_id,  # Manually set the new ID
        buisness_name=request.business_name,
        email=request.email,
        password_hash=hashed_password.decode('utf-8'),
        google_place_id=f"manual_{request.email}",  # Create a unique identifier since it's required
    )

    try:
        db.add(new_vendor)
        db.commit()
        db.refresh(new_vendor)
        return {"status": "ok", "vendor": {"id": new_vendor.id, "business_name": new_vendor.buisness_name, "email": new_vendor.email}}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))