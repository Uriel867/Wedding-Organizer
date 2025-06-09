import os
import requests
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import create_vendor, get_vendor_by_google_place_id
from dotenv import load_dotenv
from sections import sections
from models import Vendor
MAX_VENDORS_PER_KEYWORD = 20
# Load environment variables
load_dotenv()

# Google Places API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

locations = [
   {"name": "Tel Aviv", "lat": 32.0853, "lng": 34.7818},
    {"name": "Haifa", "lat": 32.7940, "lng": 34.9896},
    # {"name": "Jerusalem", "lat": 31.7683, "lng": 35.2137},
    #{"name": "Be'er Sheva", "lat": 31.2518, "lng": 34.7913},
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

def get_section_for_category(category):
    for section, categories in sections.items():
        if category in categories:
            return section
    return None

class VendorLimitReached(Exception):
    pass

# Function to save vendors to the database
def save_vendors_to_db(vendors, category, section, db: Session):
    current_vendor_count = db.query(Vendor).count()
    max_vendors = 900
    for vendor in vendors:
        # Stop if we've reached the limit
        if current_vendor_count >= max_vendors:
            print("Reached vendor limit, stopping fetch.")
            raise VendorLimitReached()
        # Check if the vendor already exists in the database
        existing_vendor = get_vendor_by_google_place_id(db, vendor["place_id"])
        if existing_vendor:
            print(f"Vendor already exists: {vendor['name']}")
            continue
        # Fetch additional details (phone number and website)
        details = fetch_place_details(vendor["place_id"])
        # Prepare vendor data according to the new Vendor model
        vendor_data = {
            "google_place_id": vendor["place_id"],
            "buisness_name": vendor["name"],
            "category": category,
            "section": section,
            "rating": vendor.get("rating"),
            "user_ratings_total": vendor.get("user_ratings_total"),
            "address": vendor.get("formatted_address"),
            "phone_number": details.get("phone_number"),
            "website": details.get("website"),
            "lat": vendor["geometry"]["location"]["lat"],
            "lng": vendor["geometry"]["location"]["lng"],
            "ARS_score": None,
            "email": None,
            "password_hash": None,
            "kyc_grade": None
        }
        # Save the vendor to the database
        create_vendor(db, vendor_data)
        current_vendor_count += 1
        print(f"Vendor saved: {vendor['name']}")

# Main function to fetch and save vendors
def main():
    db = SessionLocal()
    try:
        for location in locations:
            for section, keywords_in_section in sections.items():
                for keyword in keywords_in_section:
                    print(f"Fetching vendors for keyword: {keyword} in section: {section} at {location['name']}")
                    vendors = fetch_vendors_from_api(keyword, location)
                    vendors = vendors[:MAX_VENDORS_PER_KEYWORD]  # Only keep up to 6 vendors per keyword
                    try:
                        save_vendors_to_db(vendors, category=keyword, section=section, db=db)
                    except VendorLimitReached:
                        print("Global vendor limit reached. Stopping all fetching.")
                        return
                    print(f"Finished processing keyword: {keyword} in section: {section} at {location['name']}")
    finally:
        db.close()

if __name__ == "__main__":
    main()

