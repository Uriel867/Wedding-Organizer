import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import bandImage from "./images/band.jpg";
import axios from "axios";

function KycSongPage1() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-song-2"); // Go to KycSongPage2 after KycSongPage1
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like that song?"
      description="Rate your preference on the scale below."
      imageSrc={bandImage}
      onScaleSubmit={handleScaleSubmit}
      progress="4 of 5"
    />
  );
}

export default KycSongPage1;
