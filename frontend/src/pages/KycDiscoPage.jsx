import React from "react";
import KycPageTemplate from "../components/KycPageTemplate";
import discoImage from "./images/disco.jpg"; // Import the disco image

function KycDiscoPage() {
  const handleLike = () => {
    console.log("User loves disco!");
    // Add logic to update rank and navigate to the next page
  };

  const handleDislike = () => {
    console.log("User dislikes disco!");
    // Add logic to update rank and navigate to the next page
  };

  return (
    <KycPageTemplate
      title="Do you like disco clubs?"
      description="Swipe left or right to select your preferred style"
      imageSrc={discoImage} // Use the disco image
      onLike={handleLike}
      onDislike={handleDislike}
      progress="2 of 5"
    />
  );
}

export default KycDiscoPage;