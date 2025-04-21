from sqlalchemy.orm import Session
from models import User

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