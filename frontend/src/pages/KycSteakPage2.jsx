import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import steakImage from "./images/steak.avif";
import axios from "axios";

function KycSteakPage2() {
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
      // Example: you can update another section or just finish the flow
      // Here, let's just finish and go to suppliers page
      navigate("/wedding-suppliers");
    } catch (error) {
      setErrorMsg("Error updating KYC. Please try again.");
      console.error("Error updating KYC:", error);
    }
  };

  return (
    <>
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      <KycPageTemplate
        title="Do you like steak? (Page 2)"
        description="Rate your preference on the scale below."
        imageSrc={steakImage}
        onScaleSubmit={handleScaleSubmit}
        progress="2 of 5"
      />
    </>
  );
}

export default KycSteakPage2;
