import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function SupplierKycMusicPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const next = new URLSearchParams(location.search).get("next");
  const supplierEmail = localStorage.getItem("supplierEmail");
  
  if (!supplierEmail) {
    navigate("/supplier-login");
    return null;
  }

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music",
        value,
      });
      handleNext();
    } catch (error) {
      setError("Failed to update preference. Please try again.");
    }
  };

  const handleNext = () => {
    if (next) {
      const [first, ...rest] = next.split(",");
      const nextQuery = rest.length > 0 ? `?next=${rest.join(",")}` : "";
      if (first === "venue") navigate(`/supplier-kyc-venue${nextQuery}`);
      else if (first === "food") navigate(`/supplier-kyc-food${nextQuery}`);
      else navigate("/supplier-dashboard");
    } else {
      navigate("/supplier-dashboard");
    }
  };

  return (
    <KycPageTemplate
      title="Do you provide music or DJ services?"
      description="Let us know if you provide this service."
      imageSrc={bandImage}
      onScaleSubmit={handleScaleSubmit}
      progress="2 of 3"
      error={error}
    />
  );
}

export default SupplierKycMusicPage;
