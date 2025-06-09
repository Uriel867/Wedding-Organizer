from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from crud import update_user_kyc
from schemas import KycUpdateRequest

router = APIRouter()

@router.post("/users/{user_id}/kyc")
def set_kyc_answer(user_id: int, kyc: KycUpdateRequest, db: Session = Depends(get_db), page: int = Query(1, description="KYC page number (1 or 2)")):
    """
    Endpoint to update a user's KYC answer for a section.
    section: "food", "wedding_hall", or "music"
    rank: integer value (0-10)
    page: 1 or 2 (for food1/food2, etc.)
    Each answer is stored and the average is used for the user's score.
    """
    if kyc.section not in ["food", "wedding_hall", "music"]:
        raise HTTPException(status_code=400, detail="Invalid section")
    if not (0 <= kyc.rank <= 10):
        raise HTTPException(status_code=400, detail="Value must be between 0 and 10")
    if page not in [1, 2]:
        raise HTTPException(status_code=400, detail="Page must be 1 or 2")

    user = update_user_kyc(db, user_id, kyc.section, kyc.rank, page)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"{kyc.section} updated (page {page})", "user_id": user_id, "section": kyc.section, "value": kyc.rank, "page": page}