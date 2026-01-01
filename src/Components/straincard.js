import React from "react";
import "./straincard.css";

function getAbbreviation(name) {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.slice(0, 3);
  }
  return words
    .map((w) => w[0])
    .join("")
    .slice(0, 3);
}

const typeColors = {
  Sativa: "sativa",
  Indica: "indica",
  Hybrid: "hybrid",
};

const StrainCard = ({ strain, onClick }) => {
  const { name, type, thc_level } = strain;
  const abbr = getAbbreviation(name);
  const thcValue = parseInt(thc_level);
  const typeClass = typeColors[type] || "unknown";
  
  return (
    <div className={`straincard ${typeClass}`} onClick={onClick}>
      <div className="strain-type">{type?.[0] || "?"}</div>
      {!isNaN(thcValue) && <div className="strain-thc">{thcValue}</div>}
      <div className="strain-abbr">{abbr}</div>
      <div className="strain-name">{name}</div>
    </div>
  );
};

export default StrainCard;