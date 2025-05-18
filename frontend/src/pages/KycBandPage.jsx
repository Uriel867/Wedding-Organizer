import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import bandImage from "./images/band.jpg"; // Replace with the actual image path
import axios from "axios";

function KycBandPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-dress"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like that song?"
      description="Rate your preference on the scale below."
      imageSrc={bandImage} // Use the band image
      onScaleSubmit={handleScaleSubmit}
      progress="4 of 5"
    />
  );
}

export default KycBandPage;