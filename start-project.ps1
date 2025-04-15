# Activate virtual environment
& "./venv/Scripts/Activate.ps1"

# Start FastAPI backend from inside 'backend' folder
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn main:app --reload"

# Start frontend (assumes you're already in root and 'frontend' is there)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
