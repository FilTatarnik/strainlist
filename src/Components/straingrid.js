import { useState, useEffect } from "react";
import strains from "../Data/strain_data.json";
import StrainCard from "./straincard";
import StrainModal from "./strainmodal";
import "./straingrid.css";

function StrainGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOption, setSortOption] = useState(null);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleTypeClick = (type) => {
    setActiveType(activeType === type ? null : type);
  };

  const openModal = (strain) => {
    setSelectedStrain(strain);
  };

  const closeModal = () => {
    setSelectedStrain(null);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setShowFilterMenu(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    setActiveType(null);
    setSortOption(null);
  };

  // Filter strains
  let filteredStrains = strains.filter((strain) => {
    const matchesName = strain.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = activeType ? strain.type === activeType : true;
    return matchesName && matchesType;
  });

  // Sort strains
  if (sortOption) {
    filteredStrains = [...filteredStrains].sort((a, b) => {
      switch (sortOption) {
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        case "thc-high":
          return (parseFloat(b.thc_level) || 0) - (parseFloat(a.thc_level) || 0);
        case "thc-low":
          return (parseFloat(a.thc_level) || 0) - (parseFloat(b.thc_level) || 0);
        default:
          return 0;
      }
    });
  }

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
          <div className="filter-dropdown-container">
            <button
              className={`filter-btn ${sortOption ? "active" : ""}`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              Filter {sortOption && "✓"}
            </button>
            {showFilterMenu && (
              <div className="filter-dropdown">
                <button
                  className={sortOption === "a-z" ? "active" : ""}
                  onClick={() => handleSort("a-z")}
                >
                  A → Z
                </button>
                <button
                  className={sortOption === "z-a" ? "active" : ""}
                  onClick={() => handleSort("z-a")}
                >
                  Z → A
                </button>
                <div className="dropdown-divider"></div>
                <button
                  className={sortOption === "thc-high" ? "active" : ""}
                  onClick={() => handleSort("thc-high")}
                >
                  THC ↑
                </button>
                <button
                  className={sortOption === "thc-low" ? "active" : ""}
                  onClick={() => handleSort("thc-low")}
                >
                  THC ↓
                </button>
              </div>
            )}
          </div>
          <button onClick={handleClear}>Clear</button>
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
        <button
          className={`type-btn theme-toggle ${darkMode ? "sativa" : "indica"}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button 
          className='type-btn indica'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ▲
        </button>
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