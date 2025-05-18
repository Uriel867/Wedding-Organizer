import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import bandImage from "./images/band.jpg";
import axios from "axios";

function KycSongPage2() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const handleScaleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: value,
      });
      navigate("/kyc-hall"); // Go to KycHallPage1 after KycSongPage2
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like that song? (Page 2)"
      description="Rate your preference on the scale below."
      imageSrc={bandImage}
      onScaleSubmit={handleScaleSubmit}
      progress="4 of 5"
    />
  );
}

export default KycSongPage2;
