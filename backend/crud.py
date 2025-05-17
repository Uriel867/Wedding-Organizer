from sqlalchemy.orm import Session
from models import User, Vendor
from sections import sections


def get_user_by_email(db: Session, email: str):
    """Retrieve a user by their email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, password_hash: str, rank: int = None):
    """Create a new user in the database."""
    # Ensure rank is either None or between 0 and 9
    if rank is not None:
        rank = max(0, min(rank, 9))  # Clamp rank to the range 0-9

    new_user = User(name=name, email=email, password_hash=password_hash, rank=rank)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def create_vendor(db: Session, vendor_data: dict):
    """Create a new vendor in the database."""
    new_vendor = Vendor(**vendor_data)
    db.add(new_vendor)
    db.commit()
    db.refresh(new_vendor)
    return new_vendor

def get_vendor_by_google_place_id(db: Session, google_place_id: str):
    """Retrieve a vendor by their Google Place ID."""
    return db.query(Vendor).filter(Vendor.google_place_id == google_place_id).first()

def get_suppliers_grouped_by_sections(db: Session):
    """Fetch suppliers from the database and group them by sections."""
    suppliers = db.query(Vendor).all()  # Fetch all suppliers
    grouped_suppliers = {section: [] for section in sections.keys()}

    for supplier in suppliers:
        for section, categories in sections.items():
            if supplier.category in categories:
                grouped_suppliers[section].append(supplier)
                break  # Stop checking other sections once matched

    return grouped_suppliers