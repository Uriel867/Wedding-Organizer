import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import steakImage from "./images/steak.avif";
import axios from "axios";

function KycSteakPage1() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-steak-2"); // Go to KycSteakPage2 after KycSteakPage1
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like steak?"
      description="Rate your preference on the scale below."
      imageSrc={steakImage}
      onScaleSubmit={handleScaleSubmit}
      progress="2 of 5"
    />
  );
}

export default KycSteakPage1;
