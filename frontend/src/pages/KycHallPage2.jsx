import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import hallImage from "./images/hall.jpg";
import axios from "axios";

function KycHallPage2() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-steak"); // Go to KycSteakPage1 after KycHallPage2
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="כמה דתית היית רוצה את החתונה? (Page 2)"
      description="Rate your preference on the scale below."
      imageSrc={hallImage}
      onScaleSubmit={handleScaleSubmit}
      progress="3 of 5"
    />
  );
}

export default KycHallPage2;
