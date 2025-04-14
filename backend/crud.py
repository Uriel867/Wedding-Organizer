from sqlalchemy.orm import Session
from models import User

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