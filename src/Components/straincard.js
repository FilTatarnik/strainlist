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
  const { name, type } = strain;
  const abbr = getAbbreviation(name);

  return (
    <div className={`straincard ${typeColors[type]}`} onClick={onClick}>
      <div className="strain-type">{type[0]}</div>
      <div className="strain-abbr">{abbr}</div>
      <div className="strain-name">{name}</div>
    </div>
  );
};

export default StrainCard;