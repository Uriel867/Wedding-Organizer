from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import update_user_kyc
from schemas import KycUpdateRequest

router = APIRouter()

@router.post("/users/{user_id}/kyc")
def set_kyc_answer(user_id: int, kyc: KycUpdateRequest, db: Session = Depends(get_db)):
    """
    Endpoint to update a user's KYC answer for a section.
    section: "food", "wedding_hall", or "music"
    rank: integer value (0-9)
    """
    if kyc.section not in ["food", "wedding_hall", "music"]:
        raise HTTPException(status_code=400, detail="Invalid section")
    if not (0 <= kyc.rank <= 9):
        raise HTTPException(status_code=400, detail="Rank must be between 0 and 9")

    user = update_user_kyc(db, user_id, kyc.section, kyc.rank)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"{kyc.section} updated", "user_id": user_id, "section": kyc.section, "rank": kyc.rank}