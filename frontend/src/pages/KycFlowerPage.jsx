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
      // Set the user's rank to 4
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: 4, // Explicitly set rank to 4
      });
      navigate("/kyc-disco"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const handleDislike = async () => {
    try {
      // Set the user's rank to 5
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: 5, // Explicitly set rank to 5
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