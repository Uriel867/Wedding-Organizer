from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    """Schema for user signup requests."""
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    """Schema for user login requests."""
    email: EmailStr
    password: str

class KycUpdateRequest(BaseModel):
    section: str  # 'food', 'wedding_hall', or 'music'
    rank: int     # 0-9