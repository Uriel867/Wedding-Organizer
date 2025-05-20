import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import steakImage from "./images/steak.avif";
import axios from "axios";

function KycSteakPage1() {
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
      await axios.post(`http://localhost:8000/users/${userId}/kyc`, {
        section: "food",
        rank: value,
      });
      navigate("/kyc-steak-2");
    } catch (error) {
      setErrorMsg("Error updating food KYC. Please try again.");
      console.error("Error updating food KYC:", error);
    }
  };

  return (
    <>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <KycPageTemplate
        title="כמה בשרי היית רוצה את החתונה?"
        description="Rate your preference on the scale below."
        imageSrc={steakImage}
        onScaleSubmit={handleScaleSubmit}
        progress="1 of 5"
      />
    </>
  );
}

export default KycSteakPage1;
