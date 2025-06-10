import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../../components/KycPageTemplate";
import steakImage from "../../images/steak.avif";

function SupplierFood2Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "food2",
        value,
      });
      navigate("/supplier-kyc-music-1");
    } catch (error) {
      console.error("Error updating supplier food2 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה גורמה היית רוצה להציע?"
      imageSrc={steakImage}
      onScaleSubmit={handleScaleSubmit}
      progress="2 of 6"
    />
  );
}

export default SupplierFood2Page;
