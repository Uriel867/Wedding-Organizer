import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../../../components/KycPageTemplate";
import hallImage from "../../images/hall.jpg";
import axios from "axios";

function WeddingHall2Page() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [errorMsg, setErrorMsg] = useState("");

  const handleScaleSubmit = async (value) => {
    setErrorMsg("");
    if (!userId) {
      setErrorMsg("User ID not found. Please log in again.");
      return;
    }
    try {
      await axios.post(`http://localhost:8000/users/${userId}/kyc?page=2`, {
        section: "wedding_hall",
        rank: value,
      });
      navigate("/kyc-steak"); // Go to KycSteakPage1 after KycHallPage2
    } catch (error) {
      setErrorMsg("Error updating KYC. Please try again.");
      console.error("Error updating KYC:", error);
    }
  };

  return (
    <>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <KycPageTemplate
        title="כמה דתית היית רוצה את החתונה? (Page 2)"
        imageSrc={hallImage}
        onScaleSubmit={handleScaleSubmit}
        progress="3 of 5"
      />
    </>
  );
}

export default WeddingHall2Page;
