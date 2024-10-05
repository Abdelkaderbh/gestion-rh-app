import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  // Check localStorage first, if not, check system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // If no theme is saved, use the system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    // Update the theme based on darkMode state
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    // Update the state when the system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <></>
    // Uncomment the button below to enable dark mode toggle

    // <button
    //   onClick={() => setDarkMode(!darkMode)}
    //   className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    // >
    //   {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    // </button>
  );
};

export default DarkModeToggle;
