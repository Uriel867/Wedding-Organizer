import React from "react";
import { useNavigate } from "react-router-dom";

const SupplierKycStartPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Redirect to the first supplier KYC step (customize as needed)
    navigate("/supplier-kyc-service");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h2>Welcome to Supplier KYC</h2>
      <p>Let's get started with your business profile.</p>
      <button onClick={handleNext} style={{ padding: "12px 32px", fontSize: "1.1em", borderRadius: "8px", background: "#5a38ea", color: "#fff", border: "none", marginTop: "24px", cursor: "pointer" }}>
        Next
      </button>
    </div>
  );
};

export default SupplierKycStartPage;
