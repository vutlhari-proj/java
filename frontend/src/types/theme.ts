import type { ReactNode } from "react";

export interface ThemeContextProp{
  darkTheme: boolean;
  toggleTheme: (value: React.SetStateAction<boolean>) => void;
}

export interface ThemeProviderProps{
  children: ReactNode;
}