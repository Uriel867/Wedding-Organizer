import React from "react";
import "../pages/kyc/KycStandardPage.css"; // Corrected path to the CSS file
import KycScale from "./KycScale";

function KycPageTemplate({ title, description, imageSrc, onLike, onDislike, progress, onScaleSubmit }) {
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
        <KycScale onSubmit={onScaleSubmit} />
      </div>

      <p className="progress-indicator">{progress}</p>
    </div>
  );
}

export default KycPageTemplate;