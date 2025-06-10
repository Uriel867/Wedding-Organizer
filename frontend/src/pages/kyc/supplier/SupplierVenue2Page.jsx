import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../../components/KycPageTemplate";
import hallImage from "../../images/hall.jpg";

function SupplierVenue2Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "venue2",
        value,
      });
      navigate("/supplier-kyc-complete"); // Go to complete page
    } catch (error) {
      console.error("Error updating supplier venue2 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה יוקרתית המקום שאתה מציע?"
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
      progress="6 of 6"
    />
  );
}

export default SupplierVenue2Page;
