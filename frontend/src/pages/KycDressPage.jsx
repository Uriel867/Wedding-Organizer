import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import dressImage from "./images/dress.jpg"; // Replace with the actual image path
import axios from "axios";

function KycDressPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleLike = async () => {
    try {
      // Increase the user's rank by 1
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: 1, // Increase rank by 1
      });
      navigate("/wedding-suppliers"); // Redirect to the wedding suppliers page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  const handleDislike = async () => {
    try {
      // Decrease the user's rank by 1
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: -1, // Decrease rank by 1
      });
      navigate("/wedding-suppliers"); // Redirect to the wedding suppliers page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like extreme wedding dresses?"
      description="Swipe left or right to select your preferred style"
      imageSrc={dressImage} // Use the dress image
      onLike={handleLike}
      onDislike={handleDislike}
      progress="5 of 5"
    />
  );
}

export default KycDressPage;