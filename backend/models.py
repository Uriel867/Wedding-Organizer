from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, Text, func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    food = Column(Integer, nullable=True, default=None)
    wedding_hall = Column(Integer, nullable=True, default=None)
    music = Column(Integer, nullable=True, default=None)


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    google_place_id = Column(String, unique=True, nullable=False)
    buisness_name = Column(String, nullable=False)
    category = Column(String, nullable=True)
    section = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    user_ratings_total = Column(Integer, nullable=True)
    address = Column(Text, nullable=True)
    phone_number = Column(String, nullable=True)
    website = Column(String, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    email = Column(String, unique=True, nullable=True)
    password_hash = Column(String, nullable=True)
    food = Column(Integer, nullable=True, default=None)
    wedding_hall = Column(Integer, nullable=True, default=None)
    music = Column(Integer, nullable=True, default=None)



