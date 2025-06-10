import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import hallImage from "../images/hall.jpg";

function SupplierKycVenuePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);  const next = new URLSearchParams(location.search).get("next");
  const supplierEmail = localStorage.getItem("supplierEmail");
  const supplierId = localStorage.getItem("supplierId");

  useEffect(() => {
    if (!supplierEmail || !supplierId) {
      navigate("/supplier-login");
    } else {
      setLoading(false);
    }
  }, [supplierEmail, supplierId, navigate]);

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "venue",
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
      if (first === "food") navigate(`/supplier-kyc-food${nextQuery}`);
      else if (first === "music") navigate(`/supplier-kyc-music${nextQuery}`);
      else if (first === "venue") navigate(`/supplier-kyc-venue${nextQuery}`);
      else navigate("/supplier-kyc-complete"); // All done, go to complete page
    } else {
      navigate("/supplier-kyc-complete"); // All done, go to complete page
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <KycPageTemplate
      title="Do you offer a wedding venue?"
      description="Let us know if you provide this service."
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
      progress="3 of 3"
      error={error}
    />
  );
}

export default SupplierKycVenuePage;
