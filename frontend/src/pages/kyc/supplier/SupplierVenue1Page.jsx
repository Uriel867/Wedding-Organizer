import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../../components/KycPageTemplate";
import hallImage from "../../images/hall.jpg";

function SupplierVenue1Page() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "venue1",
        value,
      });
      navigate("/supplier-kyc-venue-2");
    } catch (error) {
      console.error("Error updating supplier venue1 preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה חשוב לך להציע מקום לאירועים?"
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
      progress="5 of 6"
    />
  );
}

export default SupplierVenue1Page;
