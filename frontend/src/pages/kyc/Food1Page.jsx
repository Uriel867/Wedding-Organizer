import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../components/KycPageTemplate";
import steakImage from "../images/steak.avif";

function Food1Page() {
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
      await axios.post(`http://localhost:8000/users/${userId}/kyc?page=1`, {
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
        title="כמה חשוב שיהיה מגוון של טעמים שונים בחתונה?"
        imageSrc={steakImage}
        onScaleSubmit={handleScaleSubmit}
        progress="1 of 5"
      />
    </>
  );
}

export default Food1Page;
