import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import flowersImage from "./images/flowers.jpg";
import axios from "axios";

function SupplierKycServicePage() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail"); // Retrieve the logged-in supplier's email

  const handleLike = async () => {
    try {
      // Example: Set the supplier's service preference
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "flowers",
        value: 1,
      });
      navigate("/supplier-kyc-music"); // Go to next supplier KYC page
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "flowers",
        value: 0,
      });
      navigate("/supplier-kyc-music");
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you offer flower arrangements?"
      description="Let us know if you provide this service."
      imageSrc={flowersImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="1 of 3"
    />
  );
}

export default SupplierKycServicePage;
