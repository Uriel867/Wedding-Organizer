import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import discoImage from "./images/disco.jpg";
import axios from "axios";

function KycDiscoPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-hall");
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like disco music?"
      description="Rate your preference on the scale below."
      imageSrc={discoImage}
      onScaleSubmit={handleScaleSubmit}
      progress="2 of 5"
    />
  );
}

export default KycDiscoPage;