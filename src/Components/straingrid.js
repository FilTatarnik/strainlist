import { useState } from "react";
import strains from "../Data/strain_data.json";
import StrainCard from "./straincard";
import StrainModal from "./strainmodal";
import "./straingrid.css";

function StrainGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);

  const filteredStrains = strains.filter((strain) => {
    const matchesName = strain.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = activeType ? strain.type === activeType : true;
    return matchesName && matchesType;
  });

  const handleTypeClick = (type) => {
    setActiveType(activeType === type ? null : type);
  };

  const openModal = (strain) => {
    setSelectedStrain(strain);
  };

  const closeModal = () => {
    setSelectedStrain(null);
  };

  return (
    <div className="strain-container">
      <div className="filter-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search strains..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>

        <div className="type-filters">
          <button
            className={`type-btn sativa ${activeType === "Sativa" ? "active" : ""}`}
            onClick={() => handleTypeClick("Sativa")}
          >
            Sativa
          </button>
          <button
            className={`type-btn indica ${activeType === "Indica" ? "active" : ""}`}
            onClick={() => handleTypeClick("Indica")}
          >
            Indica
          </button>
          <button
            className={`type-btn hybrid ${activeType === "Hybrid" ? "active" : ""}`}
            onClick={() => handleTypeClick("Hybrid")}
          >
            Hybrid
          </button>
        </div>
      </div>

      <p className="results-count">{filteredStrains.length} strains found</p>

      <div className="strain-grid">
        {filteredStrains.map((strain, i) => (
          <StrainCard
            key={i}
            strain={strain}
            onClick={() => openModal(strain)}
          />
        ))}
      </div>

      <StrainModal strain={selectedStrain} onClose={closeModal} />
    </div>
  );
}

export default StrainGrid;