import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function Music1Page() {
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
      console.log("Submitting music KYC:", { userId, value });
      await axios.post(`http://localhost:8000/users/${userId}/kyc?page=1`, {
        section: "music",
        rank: value,
      });
      navigate("/kyc-song-2");
    } catch (error) {
      setErrorMsg("Error updating music KYC. Please try again.");
      console.error("Error updating music KYC:", error);
    }
  };

  return (
    <>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <KycPageTemplate
        title="כמה חשובה לך המוזיקה בחתונה?"
        imageSrc={bandImage}
        onScaleSubmit={handleScaleSubmit}
        progress="5 of 5"
      />
    </>
  );
}

export default Music1Page;
