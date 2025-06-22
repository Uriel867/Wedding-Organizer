import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";
import axios from "axios";

function Music2Page() {
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
        section: "music",
        rank: value,
      });
      navigate("/kyc-hall"); // Go to KycHallPage1 after KycSongPage2
    } catch (error) {
      setErrorMsg("Error updating KYC. Please try again.");
      console.error("Error updating KYC:", error);
    }
  };

  return (
    <>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <KycPageTemplate
        title="כמה חשוב שתהיה מוסיקה מזרחית בחתונה"
        imageSrc={bandImage}
        onScaleSubmit={handleScaleSubmit}
        progress="4 of 5"
      />
    </>
  );
}

export default Music2Page;
