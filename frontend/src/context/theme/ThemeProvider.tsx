import type { ThemeProviderProps } from "@/types";
import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkTheme, setDarkTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setDarkTheme(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    console.log(darkTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
