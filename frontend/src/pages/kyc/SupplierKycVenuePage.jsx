import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import hallImage from "../images/hall.jpg";

function SupplierKycVenuePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next");
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "venue",
        value: 1,
      });
      handleNext();
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
      handleNext();
    } catch (error) {
      console.error("Error updating supplier preference:", error);
    }
  };

  const handleNext = () => {
    if (next) {
      const [first, ...rest] = next.split(",");
      const nextQuery = rest.length > 0 ? `?next=${rest.join(",")}` : "";
      if (first === "food") navigate(`/supplier-kyc-food${nextQuery}`);
      else if (first === "music") navigate(`/supplier-kyc-music${nextQuery}`);
      else navigate("/supplier-dashboard");
    } else {
      navigate("/supplier-dashboard");
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
