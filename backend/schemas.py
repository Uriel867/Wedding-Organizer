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