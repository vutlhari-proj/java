import { createContext, useContext } from "react";
import type { ThemeContextProp } from "@/types";

export const ThemeContext = createContext<ThemeContextProp | undefined>(
  undefined
);
export function useTheme(): ThemeContextProp {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
