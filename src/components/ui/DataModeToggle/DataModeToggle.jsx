// DataModeToggle Component
// Toggle between mock and live Supabase data modes

import { useEffect, useState } from "react";
import { useDataMode } from "../../../contexts/DataModeContext";
import "./DataModeToggle.css";

export const DataModeToggle = () => {
  const { mode, setMode } = useDataMode();
  const [isLive, setIsLive] = useState(mode === "live");

  useEffect(() => {
    setIsLive(mode === "live");
  }, [mode]);

  const handleToggle = () => {
    const newMode = mode === "mock" ? "live" : "mock";
    setMode(newMode);
    setIsLive(newMode === "live");
  };

  return (
    <div className="data-mode-toggle">
      <label className="toggle-label">
        <span className="mode-label">
          {isLive ? "🔴 Live DB" : "📋 Mock Data"}
        </span>
        <button
          className={`toggle-button ${isLive ? "active" : ""}`}
          onClick={handleToggle}
          aria-label="Toggle data mode"
          title={`Current: ${mode === "live" ? "Live Supabase" : "Mock Demo Data"}`}
        >
          <span className="toggle-slider"></span>
        </button>
      </label>
    </div>
  );
};

export default DataModeToggle;
