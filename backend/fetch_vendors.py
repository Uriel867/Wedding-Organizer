import os
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import create_vendor, get_vendor_by_google_place_id
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Google Places API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Hebrew keywords for search
keywords = [
    "אולמות אירועים",
    "גני אירועים"
]

# Function to fetch data from Google Places API
def fetch_vendors_from_api(keyword):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": keyword,
        "key": GOOGLE_API_KEY,
        "language": "iw",  # Hebrew
        "region": "IL"     # Israel
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    print(response.json())  # Debug: Print the API response
    return response.json().get("results", [])

# Function to save vendors to the database
def save_vendors_to_db(vendors, category, db: Session):
    for vendor in vendors:
        # Check if the vendor already exists in the database
        existing_vendor = get_vendor_by_google_place_id(db, vendor["place_id"])
        if existing_vendor:
            print(f"Vendor already exists: {vendor['name']}")
            continue

        # Prepare vendor data
        vendor_data = {
            "google_place_id": vendor["place_id"],
            "name": vendor["name"],
            "category": category,
            "rating": vendor.get("rating"),
            "user_ratings_total": vendor.get("user_ratings_total"),
            "address": vendor.get("formatted_address"),
            "phone_number": None,  # Phone number is not available in Text Search API
            "website": None,       # Website is not available in Text Search API
            "lat": vendor["geometry"]["location"]["lat"],
            "lng": vendor["geometry"]["location"]["lng"],
            "price_level": vendor.get("price_level"),
            "wedding_score": None  # Optional: Can be calculated later
        }

        # Save the vendor to the database
        create_vendor(db, vendor_data)
        print(f"Vendor saved: {vendor['name']}")

# Main function to fetch and save vendors
def main():
    db = SessionLocal()
    try:
        for keyword in keywords:
            print(f"Fetching vendors for keyword: {keyword}")
            vendors = fetch_vendors_from_api(keyword)
            save_vendors_to_db(vendors, category=keyword, db=db)
            print(f"Finished processing keyword: {keyword}")
    finally:
        db.close()

if __name__ == "__main__":
    main()