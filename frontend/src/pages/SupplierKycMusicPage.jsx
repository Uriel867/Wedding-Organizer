import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import bandImage from "./images/band.jpg";
import axios from "axios";

function SupplierKycMusicPage() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music",
        value: 1,
      });
      navigate("/supplier-kyc-venue");
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music",
        value: 0,
      });
      navigate("/supplier-kyc-venue");
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you provide music or DJ services?"
      description="Let us know if you provide this service."
      imageSrc={bandImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="2 of 3"
    />
  );
}

export default SupplierKycMusicPage;
