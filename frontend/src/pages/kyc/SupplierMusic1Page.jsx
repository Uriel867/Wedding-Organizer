import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function SupplierMusic1Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music1",
        value,
      });
      navigate("/supplier-kyc-music-2");
    } catch (error) {
      console.error("Error updating supplier music1 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה חשובה לך המוזיקה שאתה מספק?"
      imageSrc={bandImage}
      onScaleSubmit={handleScaleSubmit}
      progress="3 of 6"
    />
  );
}

export default SupplierMusic1Page;
