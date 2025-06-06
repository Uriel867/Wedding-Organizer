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