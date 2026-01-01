import React from "react";
import "./strainmodal.css";

const typeColors = {
  Sativa: "sativa",
  Indica: "indica",
  Hybrid: "hybrid",
  "": "blank",
};

const StrainModal = ({ strain, onClose }) => {
  if (!strain) return null;

  const { name, type, thc_level, most_common_terpene, description } = strain;

  // Close when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal-content ${typeColors[type]}`}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2 className="modal-name">{name}</h2>
          <span className="modal-type">{type}</span>
        </div>

        <div className="modal-details">
          <div className="detail-item">
            <span className="detail-label">THC</span>
            <span className="detail-value">{thc_level}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Terpene</span>
            <span className="detail-value">{most_common_terpene}</span>
          </div>
        </div>

        <div className="modal-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StrainModal;