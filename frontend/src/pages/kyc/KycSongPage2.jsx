import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../../components/KycPageTemplate";
import bandImage from "../images/band.jpg";

function KycSongPage2() {
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
      // Example: you can update another section or just go to next KYC page
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
        title="Do you like that song? (Page 2)"
        description="Rate your preference on the scale below."
        imageSrc={bandImage}
        onScaleSubmit={handleScaleSubmit}
        progress="4 of 5"
      />
    </>
  );
}

export default KycSongPage2;
