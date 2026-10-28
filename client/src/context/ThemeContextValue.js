import { createContext } from "react";

export const ThemeContext = createContext({
  themeMode: "dark",
  darkTheme: () => {},
  lightTheme: () => {},
  toggleTheme: () => {},
});
