"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function setThemeCookie(isDark) {
  const value = isDark ? "dark" : "light";
  document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function DarkModeProvider({ children, initialTheme = "light" }) {
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === "dark");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleLightDarkMode() {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      setThemeCookie(nextMode); // Write cookie when toggled
      return nextMode;
    });
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleLightDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
