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
    "אולם אירועים", "גן אירועים", "מקום לחתונה", "אולמות חתונה", "וילה לאירועים",
    "קייטרינג לחתונה", "שירותי קייטרינג", "קייטרינג לאירועים", "אוכל לאירועים",
    "תקליטן לחתונה", "DJ לחתונה", "להקה לחתונה", "מוזיקה לאירועים", "הרכב מוסיקלי לאירועים",
    "צלם חתונות", "צלם לחתונה", "צלם מגנטים", "וידאו לחתונה",
    "עוגת חתונה", "קינוחים לאירועים", "קונדיטוריה לאירועים",
    "מתנות לאורחים", "אטרקציות לאירועים", "שולחנות משחק לחתונה", "עמדת צילום לאירועים",
    "מעצבת אירועים", "הפקת חתונות", "עיצוב אירועים",
    "רכב לחתונה", "לימוזינה לחתונה", "הסעות לאירועים"
]

locations = [
    {"name": "Tel Aviv", "lat": 32.0853, "lng": 34.7818},
    {"name": "Haifa", "lat": 32.7940, "lng": 34.9896},
    {"name": "Jerusalem", "lat": 31.7683, "lng": 35.2137},
    {"name": "Be'er Sheva", "lat": 31.2518, "lng": 34.7913},
    {"name": "Eilat", "lat": 29.5581, "lng": 34.9482}
]
# Function to fetch data from Google Places API
def fetch_vendors_from_api(keyword, location):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    all_results = []
    params = {
        "query": keyword,
        "key": GOOGLE_API_KEY,
        "language": "iw",  # Hebrew
        "region": "IL",    # Israel
        "location": f"{location['lat']},{location['lng']}"  # Central location
    }

    while True:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        results = data.get("results", [])
        all_results.extend(results)

        # Check if there's a next page
        next_page_token = data.get("next_page_token")
        if not next_page_token:
            break

        # Wait a few seconds before making the next request
        import time
        time.sleep(2)
        params["pagetoken"] = next_page_token

    return all_results
def fetch_place_details(place_id):
    """Fetch additional details for a place using the Place Details API."""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "key": GOOGLE_API_KEY,
        "fields": "formatted_phone_number,website"  # Specify the fields you need
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    details = response.json().get("result", {})
    return {
        "phone_number": details.get("formatted_phone_number"),
        "website": details.get("website")
    }

# Function to save vendors to the database
def save_vendors_to_db(vendors, category, db: Session):
    for vendor in vendors:
        # Check if the vendor already exists in the database
        existing_vendor = get_vendor_by_google_place_id(db, vendor["place_id"])
        if existing_vendor:
            print(f"Vendor already exists: {vendor['name']}")
            continue

        # Fetch additional details (phone number and website)
        details = fetch_place_details(vendor["place_id"])

        # Map price_level to price_range (exclude "Free")
        price_level = vendor.get("price_level")
        price_range = None
        if price_level is not None:
            if price_level == 1 or price_level == 0:
                price_range = "$"  # Inexpensive
            elif price_level == 2:
                price_range = "$$"  # Moderate
            elif price_level == 3:
                price_range = "$$$"  # Expensive
            elif price_level == 4:
                price_range = "$$$$"  # Very Expensive

        # Prepare vendor data
        vendor_data = {
            "google_place_id": vendor["place_id"],
            "name": vendor["name"],
            "category": category,
            "rating": vendor.get("rating"),
            "user_ratings_total": vendor.get("user_ratings_total"),
            "address": vendor.get("formatted_address"),
            "phone_number": details.get("phone_number"),  # Add phone number
            "website": details.get("website"),            # Add website
            "lat": vendor["geometry"]["location"]["lat"],
            "lng": vendor["geometry"]["location"]["lng"],
            "price_range": price_range,                   # Use price_range only
            "wedding_score": None  # Optional: Can be calculated later
        }

        # Save the vendor to the database
        create_vendor(db, vendor_data)
        print(f"Vendor saved: {vendor['name']}")

# Main function to fetch and save vendors
def main():
    db = SessionLocal()
    try:
        for location in locations:
            for keyword in keywords:
                print(f"Fetching vendors for keyword: {keyword} in {location['name']}")
                vendors = fetch_vendors_from_api(keyword, location)
                save_vendors_to_db(vendors, category=keyword, db=db)
                print(f"Finished processing keyword: {keyword} in {location['name']}")
    finally:
        db.close()

if __name__ == "__main__":
    main()

