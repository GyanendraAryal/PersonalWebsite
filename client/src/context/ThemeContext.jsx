import { useLayoutEffect, useState } from "react";
import { ThemeContext } from "./ThemeContextValue";

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");
  const toggleTheme = () =>
    setThemeMode((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.documentElement.style.colorScheme = themeMode;
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{ themeMode, darkTheme, lightTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
