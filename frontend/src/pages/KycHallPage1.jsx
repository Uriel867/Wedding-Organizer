import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import hallImage from "./images/hall.jpg"; // Replace with the actual image path
import axios from "axios";

function KycHallPage1() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Make sure you store userId in localStorage after login/register

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post(`http://localhost:8000/users/${userId}/kyc`, {
        section: "wedding_hall",
        rank: value,
      });
      navigate("/kyc-hall-2"); // Go to KycHallPage2 after KycHallPage1
    } catch (error) {
      console.error("Error updating wedding_hall KYC:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה דתית היית רוצה את החתונה?"
      description="Rate your preference on the scale below."
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
      progress="3 of 5"
    />
  );
}

export default KycHallPage1;
