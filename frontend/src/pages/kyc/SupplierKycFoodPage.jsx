import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SupplierKycFoodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next");

  const handleNext = () => {
    if (next) {
      const [first, ...rest] = next.split(",");
      const nextQuery = rest.length > 0 ? `?next=${rest.join(",")}` : "";
      if (first === "venue") navigate(`/supplier-kyc-venue${nextQuery}`);
      else if (first === "music") navigate(`/supplier-kyc-music${nextQuery}`);
      else navigate("/supplier-dashboard");
    } else {
      navigate("/supplier-dashboard");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 10px #eee" }}>
      <h2>Food Supplier KYC</h2>
      <p>Please answer the following questions about your food services.</p>
      {/* Add your food-specific KYC questions here */}
      <div style={{ marginTop: 24 }}>
        <label>What type of cuisine do you offer?</label>
        <input className="register-input" style={{ width: "100%", marginBottom: 16 }} />
        <label>Do you provide vegetarian/vegan options?</label>
        <select className="register-input" style={{ width: "100%", marginBottom: 16 }}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label>Describe your most popular dish:</label>
        <textarea className="register-input" style={{ width: "100%", minHeight: 60 }} />
      </div>
      <button className="purple-button" style={{ width: "100%", padding: 12, fontSize: "1.1em", borderRadius: 8, background: "#5a38ea", color: "#fff", border: "none", marginTop: 24, cursor: "pointer" }} onClick={handleNext}>
        {next ? "Next" : "Finish"}
      </button>
    </div>
  );
};

export default SupplierKycFoodPage;
