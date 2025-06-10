import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../../components/KycPageTemplate";
import steakImage from "../../images/steak.avif";

function SupplierFood1Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "food1",
        value,
      });
      navigate("/supplier-kyc-food-2");
    } catch (error) {
      console.error("Error updating supplier food1 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה בשרי היית רוצה להציע?"
      imageSrc={steakImage}
      onScaleSubmit={handleScaleSubmit}
      progress="1 of 6"
    />
  );
}

export default SupplierFood1Page;
