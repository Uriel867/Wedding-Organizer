import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import flowersImage from "./images/flowers.jpg";
import axios from "axios";

function KycFlowerPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-disco"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like those flowers?"
      description="Rate your preference on the scale below."
      imageSrc={flowersImage}
      onScaleSubmit={handleScaleSubmit}
      progress="1 of 5"
    />
  );
}

export default KycFlowerPage;