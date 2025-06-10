import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KycPageTemplate from "../../../components/KycPageTemplate";
import steakImage from "../../images/steak.avif";

function Food2Page() {
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
        section: "food",
        rank: value,
      });
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
        imageSrc={steakImage}
        onScaleSubmit={handleScaleSubmit}
        progress="2 of 5"
      />
    </>
  );
}

export default Food2Page;
