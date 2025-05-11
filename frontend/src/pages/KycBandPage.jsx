import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import bandImage from "./images/band.jpg"; // Replace with the actual image path
import axios from "axios";

function KycBandPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleLike = async () => {
    try {
    // Decrease the user's rank by 1
      
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: -1, // Decrease rank by 1
      });
      navigate("/kyc-dress"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const handleDislike = async () => {
    try {
      // Increase the user's rank by 1
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: 1, // Increase rank by 1
      });
      navigate("/kyc-dress"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like that song?"
      description="If yes click the i love it button!"
      imageSrc={bandImage} // Use the band image
      onLike={handleLike}
      onDislike={handleDislike}
      progress="4 of 5"
    />
  );
}

export default KycBandPage;