import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function SupplierKycMusicPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next");
  const supplierEmail = localStorage.getItem("supplierEmail");

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/suppliers/update-preference", {
        email: supplierEmail,
        preference: "music",
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
        preference: "music",
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
      if (first === "venue") navigate(`/supplier-kyc-venue${nextQuery}`);
      else if (first === "food") navigate(`/supplier-kyc-food${nextQuery}`);
      else navigate("/supplier-dashboard");
    } else {
      navigate("/supplier-dashboard");
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
