import React from "react";
import "../pages/KycStandardPage.css"; // Corrected path to the CSS file

function KycPageTemplate({ title, description, imageSrc, onLike, onDislike, progress }) {
  return (
    <div className="kyc-container">
      <h1 className="kyc-title">{title}</h1>
      <p className="kyc-description">{description}</p>

      <div className="kyc-card">
        <div className="kyc-image">
          <img src={imageSrc} alt={title} />
        </div>
      </div>

      <div className="kyc-feedback">
        <button className="not-for-me-button" onClick={onDislike}>
          Not for me
        </button>
        <button className="love-it-button" onClick={onLike}>
          I love it
        </button>
      </div>

      <p className="progress-indicator">{progress}</p>
    </div>
  );
}

export default KycPageTemplate;