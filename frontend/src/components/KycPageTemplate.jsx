import React from "react";
import "../pages/kyc/KycStandardPage.css"; // Corrected path to the CSS file
import KycScale from "./KycScale";

function KycPageTemplate({ title, imageSrc, onLike, onDislike, onScaleSubmit }) {
  return (
    <div className="kyc-container">
      <h1 className="kyc-title">{title}</h1>

      <div className="kyc-card">
        <div className="kyc-image">
          <img src={imageSrc} alt={title} />
        </div>
      </div>

      <div className="kyc-feedback">
        <KycScale onSubmit={onScaleSubmit} />
      </div>
    </div>
  );
}

export default KycPageTemplate;