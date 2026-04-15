// Data Mode Context
// Manages global data mode state (mock vs live) across the application

import { createContext, useContext, useState } from "react";

const DataModeContext = createContext();

/**
 * DataModeProvider - Wrap your app with this to enable data mode switching
 */
export const DataModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    // Load from localStorage or default to 'mock'
    const saved = localStorage.getItem("dataMode");
    return saved || "mock";
  });

  // Persist mode to localStorage
  const setMode = (newMode) => {
    setModeState(newMode);
    localStorage.setItem("dataMode", newMode);
    // Trigger window event to notify all components
    window.dispatchEvent(
      new CustomEvent("dataModeChanged", { detail: { mode: newMode } }),
    );
  };

  return (
    <DataModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DataModeContext.Provider>
  );
};

/**
 * useDataMode - Hook to access and set data mode
 */
export const useDataMode = () => {
  const context = useContext(DataModeContext);
  if (!context) {
    throw new Error("useDataMode must be used within DataModeProvider");
  }
  return context;
};
