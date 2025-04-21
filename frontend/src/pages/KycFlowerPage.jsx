import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import flowersImage from "./images/flowers.jpg";
import axios from "axios";

function KycFlowerPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rank: 4, // Set rank to 4 for "I Love It"
      });
      navigate("/kyc-disco"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const handleDislike = async () => {
    try {
// Send a POST request to update the user's rank to 5
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rank: 5, // Set rank to 5 for "Not for me"
      });
      navigate("/kyc-disco"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Choose your ideal flowers"
      description="Swipe left or right to select your preferred style"
      imageSrc={flowersImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="1 of 5"
    />
  );
}

export default KycFlowerPage;