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

    # If it's a new supplier (not in list), create as usual
    if request.business_name.startswith("manual_") or not db.query(Vendor).filter(Vendor.buisness_name == request.business_name).first():
        # Check if email already exists
        if db.query(Vendor).filter(Vendor.email == request.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        # Hash the password
        hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
        # Create new vendor
        new_vendor = Vendor(
            buisness_name=request.business_name,
            email=request.email,
            password_hash=hashed_password.decode('utf-8'),
            google_place_id=f"manual_{request.email}",
        )
        db.add(new_vendor)
        db.commit()
        db.refresh(new_vendor)
        return {"status": "ok", "vendor": {"id": new_vendor.id, "business_name": new_vendor.buisness_name, "email": new_vendor.email}}

    # If supplier exists in the list
    vendor = db.query(Vendor).filter(Vendor.buisness_name == request.business_name).first()
    if vendor:
        # If already assigned (has email and password), show error
        if vendor.email and vendor.password_hash:
            raise HTTPException(
                status_code=400,
                detail="This supplier is already assigned. Please contact support@weddingMatcher.com"
            )
        # If not assigned, assign email and password
        if db.query(Vendor).filter(Vendor.email == request.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        vendor.email = request.email
        vendor.password_hash = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db.commit()
        db.refresh(vendor)
        return {"status": "ok", "vendor": {"id": vendor.id, "business_name": vendor.buisness_name, "email": vendor.email}}

    raise HTTPException(status_code=400, detail="Unknown error")

class SupplierLogin(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_supplier(request: SupplierLogin, db: Session = Depends(get_db)):
    """Handle supplier login."""
    # Fetch the supplier by email
    supplier = db.query(Vendor).filter(Vendor.email == request.email).first()
    if not supplier:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify the password
    if not bcrypt.checkpw(request.password.encode('utf-8'), supplier.password_hash.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # If all three fields are null, redirect to supplier KYC start page
    if supplier.food is None and supplier.wedding_hall is None and supplier.music is None:
        return {
            "status": "kyc",
            "message": "Supplier needs to complete KYC",
            "redirect_url": "/supplier-kyc-start",
            "supplier": {
                "id": supplier.id,
                "business_name": supplier.buisness_name,
                "email": supplier.email
            }
        }

    # Otherwise, redirect to the supplier dashboard or main page
    return {
        "status": "ok",
        "message": "Login successful",
        "redirect_url": "/supplier-dashboard",
        "supplier": {
            "id": supplier.id,
            "business_name": supplier.buisness_name,
            "email": supplier.email
        }
    }

@router.get("/all", tags=["suppliers"])
def get_all_suppliers(db: Session = Depends(get_db)):
    suppliers = db.query(Vendor).all()
    return [
        {"id": s.id, "buisness_name": s.buisness_name}
        for s in suppliers
    ]