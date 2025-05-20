from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, Text, func, CheckConstraint
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    rank = Column(Integer, nullable=True, default=None)  # Allow None or 0-9

    # New columns
    food = Column(String, nullable=True)
    wedding_hall = Column(String, nullable=True)
    music = Column(String, nullable=True)

    __table_args__ = (
        CheckConstraint('(rank IS NULL OR (rank >= 0 AND rank <= 9))', name='check_rank_range'),  # Allow None or 0-9
    )

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    google_place_id = Column(String, unique=True, nullable=False)
    buisness_name = Column(String, nullable=False)
    category = Column(String, nullable=True)  # Optional: based on search query
    section = Column(String, nullable=True)  # Optional: based on search query
    rating = Column(Float, nullable=True)
    user_ratings_total = Column(Integer, nullable=True)
    address = Column(Text, nullable=True)
    phone_number = Column(String, nullable=True)
    website = Column(String, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    ARS_score = Column(Integer, nullable=True)  # Optional: a score from 0–9
    created_at = Column(TIMESTAMP, server_default=func.now())
    email = Column(String, unique=True, nullable=True)
    password_hash = Column(String, nullable=True)
    kyc_completed = Column(Integer, default=0)  # 0 = not completed, 1 = completed



