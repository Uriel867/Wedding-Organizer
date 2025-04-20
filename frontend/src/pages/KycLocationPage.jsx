import React from "react";
import "./KycLocationPage.css";
import flowers from "./images/flowers.jpg";


function KycLocationPage() {
  return (
    <div className="kyc-container">
      <h1>Choose your ideal flowers</h1>
      <p>Swipe left or right to select your preferred style</p>

      <div className="flower-card">
        <h2>Bridal Bouquet</h2>
        <p>Classic arrangement with roses, peonies and greenery for a timeless look</p>
        <div className="flower-actions">
          <button className="select-button">Select</button>
          <button className="view-more-button">View More</button>
        </div>
      </div>

      <div className="flower-image">
        <img
          src={flowers} // Replace with your actual image URL
          alt="Bridal Bouquet"
        />
      </div>

      <div className="flower-feedback">
        <button className="not-for-me-button">Not for me</button>
        <button className="love-it-button">I love it</button>
      </div>

      <p className="progress-indicator">1 of 5</p>
    </div>
  );
}

export default KycLocationPage;