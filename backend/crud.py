from sqlalchemy.orm import Session
from models import User, Vendor
from sections import sections


def get_user_by_email(db: Session, email: str):
    """Retrieve a user by their email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, name: str, email: str, password_hash: str):
    """Create a new user in the database."""
    new_user = User(name=name, email=email, password_hash=password_hash)
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

def update_user_kyc(db: Session, user_id: int, section: str, rank: int, page: int):
    """
    Update the user's KYC section (food, wedding_hall, music) with the given rank for a specific page (1 or 2).
    Always save the average of both answers for each topic.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    # Use a cross-platform temp directory
    import os, pickle, tempfile
    temp_dir = tempfile.gettempdir()
    cache_file = os.path.join(temp_dir, f"kyc_{user_id}_{section}.pkl")
    answers = [None, None]
    if os.path.exists(cache_file):
        with open(cache_file, "rb") as f:
            answers = pickle.load(f)
    answers[page-1] = rank
    with open(cache_file, "wb") as f:
        pickle.dump(answers, f)

    valid_answers = [a for a in answers if a is not None]
    if len(valid_answers) == 2:
        avg = int(round(sum(valid_answers) / 2))
        setattr(user, section, avg)
        os.remove(cache_file)  # Clean up after both answers are in
    elif len(valid_answers) == 1:
        # Only one answer so far, don't update DB yet
        pass

    db.commit()
    db.refresh(user)
    return user