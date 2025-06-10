import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function SupplierMusic2Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music2",
        value,
      });
      navigate("/supplier-kyc-venue-1");
    } catch (error) {
      console.error("Error updating supplier music2 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה סגנונות מוזיקה אתה מספק?"
      imageSrc={bandImage}
      onScaleSubmit={handleScaleSubmit}
      progress="4 of 6"
    />
  );
}

export default SupplierMusic2Page;
