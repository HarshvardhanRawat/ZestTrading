import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail);
    };
    window.addEventListener("theme-changed", handleThemeChange);
    
    // Set theme attribute on mount to match the state
    document.documentElement.setAttribute("data-theme", theme);

    return () => {
      window.removeEventListener("theme-changed", handleThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: newTheme }));
  };

  return [theme, toggleTheme];
}
