import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SupplierKycCompletePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supplierEmail = localStorage.getItem("supplierEmail");
    const supplierId = localStorage.getItem("supplierId");
    if (!supplierEmail || !supplierId) {
      navigate("/supplier-login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem("supplierEmail");
    localStorage.removeItem("supplierId");
    navigate("/supplier-login");
  };

  const handleKycAgain = () => {
    navigate("/supplier-kyc-start");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem"
      }}>
        <h2 style={{ color: "#3730a3", marginBottom: "0.5rem" }}>KYC Complete!</h2>
        <p style={{ color: "#64748b", marginBottom: "1.5rem", textAlign: "center" }}>
          Thank you for completing your KYC. You can log out or start the process again if you wish.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "#f87171",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(248, 113, 113, 0.15)",
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = '#ef4444'}
            onMouseOut={e => e.currentTarget.style.background = '#f87171'}
          >
            Log Out
          </button>
          <button
            onClick={handleKycAgain}
            style={{
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(99, 102, 241, 0.15)",
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = '#4338ca'}
            onMouseOut={e => e.currentTarget.style.background = '#6366f1'}
          >
            Do KYC Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierKycCompletePage;
