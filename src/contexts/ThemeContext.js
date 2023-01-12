import React, { useContext, useState, useEffect } from "react";

const ThemeContext = React.createContext();

export function useLocalTheme() {
  return useContext(ThemeContext);
}

export function LocalThemeProvider({ children }) {
  const [localTheme, setLocalTheme] = useState("dark");
  const [viewportHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [isSmallSize, setIsSmallSize] = useState(false);

  function toggleTheme() {
    setLocalTheme(localTheme === "light" ? "dark" : "light");
    return localTheme;
  }

  function setTheme(theme) {
    setLocalTheme(theme);
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      return setIsSmallSize(true);
    }
    return setIsSmallSize(false);
  }

  //Run whenever width changes
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width]);

  const value = {
    toggleTheme,
    localTheme,
    setTheme,
    viewportHeight,
    width,
    isSmallSize,
    handleWindowSizeChange
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
