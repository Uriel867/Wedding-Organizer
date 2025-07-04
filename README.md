# Wedding Supplier Matcher

A web application that helps couples find their perfect wedding suppliers by matching their preferences through a personalized questionnaire system.

## Features

- **User Authentication**: Secure signup and login system for both couples and suppliers
- **KYC (Know Your Customer) Questionnaire**: Interactive questionnaire to understand couples' preferences for:
  - Music and Entertainment
  - Wedding Venue
  - Food and Catering
- **Smart Matching System**: Algorithm that matches couples with suppliers based on their questionnaire responses
- **Supplier Dashboard**: Dedicated interface for wedding suppliers to manage their services
- **Rating System**: 0-10 scale for detailed preference matching
- **Real-time Updates**: Instant matching results after completing the questionnaire

## Technology Stack

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **Database**: SQL
- **Authentication**: bcrypt for password hashing

## Installation and Setup

### Backend Setup
1. Navigate to the backend folder from root directory
2. Create a virtual environment (if not already created):
   ```powershell
   python -m venv venv
   ```
3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
4. Install required packages:
   ```powershell
   python -m pip install -r requirements.txt
   ```
5. **Create the database tables:**
   - On your first run, from the project root, execute:
     ```powershell
     .\start-project.ps1
     ```
   - This will start the backend and frontend, and automatically create the necessary tables in your database.
   - After confirming the tables are created, you can stop the servers if you wish to import or fetch vendors.

### Fetching Vendors (Optional)
You can populate your database with vendor data in two ways:

#### Option 1: Fetch Vendors from Google Places API
1. Make sure you have set up your Google Places API key in your environment or in the script as needed.
2. Run the following command from the backend directory:
   ```powershell
   python fetch_vendors.py
   ```
   This will fetch vendors and populate your database tables automatically.

#### Option 2: Import Vendor List Directly
1. After you have created your database tables (see above), you can import a pre-made vendor list provided in the repository (`vendor_list.csv`).
2. Use your preferred SQL tool or command line to import the file into your database. For example:
   ```powershell
   sqlite3 wedding_app.db < vendor_list.sql
   ```
   or for other databases, use the appropriate import command.

> **Note:** You must create the tables by running the backend at least once (using `start-project.ps1`) before importing or fetching vendors. If you use the provided vendor list, you do not need to run the fetch script.
> On subsequent runs, you can simply use `start-project.ps1` to start the app as usual.

### Frontend Setup
1. Navigate to the frontend folder
2. Install dependencies:
```powershell
npm install
```
3. Start the development server:
```powershell
npm start
```

## Usage

1. **For Couples**:
   - Register an account
   - Complete the KYC questionnaire
   - View matched suppliers based on preferences
   - Save favorite suppliers

2. **For Suppliers**:
   - Register as a supplier
   - Complete service profile
   - Get matched with potential clients