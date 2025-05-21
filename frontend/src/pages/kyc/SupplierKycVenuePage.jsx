import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import hallImage from "../images/hall.jpg";

function SupplierKycVenuePage() {
  const navigate = useNavigate();
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "venue",
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
        preference: "venue",
        value: 0,
      });
      navigate("/supplier-dashboard");
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you offer a wedding venue?"
      description="Let us know if you provide this service."
      imageSrc={hallImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="3 of 3"
    />
  );
}

export default SupplierKycVenuePage;
