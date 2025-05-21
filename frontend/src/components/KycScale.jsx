import React, { useState } from "react";
import "../pages/kyc/KycStandardPage.css";

const KycScale = ({ onSubmit, initialValue = 5 }) => {
  const [value, setValue] = useState(initialValue);
  const [selected, setSelected] = useState(false);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
    setSelected(true);
  };

  const handleNext = () => {
    if (onSubmit) onSubmit(value);
  };

  return (
    <div className="kyc-scale-container">
      <div className="kyc-scale-labels">
        {[...Array(10)].map((_, i) => (
          <label
            key={i + 1}
            className={`kyc-scale-label kyc-scale-label-${i + 1} ${value === i + 1 ? "selected" : ""}`}
          >
            {i + 1}
          </label>
        ))}
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={handleChange}
        className="kyc-scale-range"
      />
      <div className="kyc-scale-value">{value}</div>
      {selected && (
        <button className="kyc-next-button" onClick={handleNext} style={{marginTop: 16}}>
          Next
        </button>
      )}
    </div>
  );
};

export default KycScale;
