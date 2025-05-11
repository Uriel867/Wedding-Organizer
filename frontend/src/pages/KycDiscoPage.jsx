import React from "react";
import { useNavigate } from "react-router-dom";
import KycPageTemplate from "../components/KycPageTemplate";
import discoImage from "./images/disco.jpg";
import axios from "axios";

function KycDiscoPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Retrieve the logged-in user's email

  const handleLike = async () => {
    try {
      // Increase the user's rank by 1
      await axios.post("http://localhost:8000/users/update-rank", {
        email: userEmail,
        rankChange: 1, // Increase rank by 1
      });
      navigate("/kyc-hall"); // Redirect to the next KYC page
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
      navigate("/kyc-hall"); // Redirect to the next KYC page
    } catch (error) {
      console.error("Error updating rank:", error);
    }
  };

  return (
    <KycPageTemplate
      title="Do you like disco music?"
      description="If yes click the i love it button!"
      imageSrc={discoImage}
      onLike={handleLike}
      onDislike={handleDislike}
      progress="2 of 5"
    />
  );
}

export default KycDiscoPage;