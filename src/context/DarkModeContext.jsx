import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDaKMode] = useLocalStorageState(false);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDaKMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// create custom hook

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkMode using outside...");
  return context;
}

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DarkModeProvider, useDarkMode };
