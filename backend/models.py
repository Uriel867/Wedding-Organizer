from sqlalchemy import Column, Integer, String, TIMESTAMP, func, CheckConstraint
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    rank = Column(Integer, nullable=True, default=None)  # Allow None or 0-9

    __table_args__ = (
        CheckConstraint('(rank IS NULL OR (rank >= 0 AND rank <= 9))', name='check_rank_range'),  # Allow None or 0-9
    )