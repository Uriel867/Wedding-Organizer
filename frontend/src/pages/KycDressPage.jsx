import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import dressImage from "./images/dress.jpg"; // Replace with the actual image path
import axios from "axios";

function KycDressPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/wedding-suppliers");
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like this wedding dresses?"
      description="Rate your preference on the scale below."
      imageSrc={dressImage}
      onScaleSubmit={handleScaleSubmit}
      progress="5 of 5"
    />
  );
}

export default KycDressPage;