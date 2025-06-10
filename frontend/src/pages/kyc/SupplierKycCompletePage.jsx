import React from "react";
import { useNavigate } from "react-router-dom";

function SupplierKycCompletePage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>תודה שמילאת את שאלון הספק!</h2>
      <button className="purple-button" onClick={() => navigate('/supplier-dashboard')}>סיום</button>
    </div>
  );
}

export default SupplierKycCompletePage;
