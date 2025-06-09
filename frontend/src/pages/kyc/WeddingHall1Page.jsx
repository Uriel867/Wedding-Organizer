import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import hallImage from "../images/hall.jpg";

function WeddingHall1Page() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Make sure you store userId in localStorage after login/register

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post(`http://localhost:8000/users/${userId}/kyc?page=1`, {
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
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
    />
  );
}

export default WeddingHall1Page;
