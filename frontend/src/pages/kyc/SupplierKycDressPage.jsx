import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import dressImage from "../images/dress.jpg";

function SupplierKycDressPage() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "dress",
        value: 1,
      });
      navigate("/supplier-dashboard"); // End of supplier KYC
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "dress",
        value: 0,
      });
      navigate("/supplier-dashboard");
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you offer wedding dresses?"
      description="Let us know if you provide this service."
      imageSrc={dressImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="4 of 4"
    />
  );
}

export default SupplierKycDressPage;
