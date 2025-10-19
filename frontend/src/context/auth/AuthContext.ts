import { createContext, useContext } from "react";
import type { LoginResponseProp } from "@/types";

export const AuthContext = createContext<LoginResponseProp | null>(null);

export function useAuth(): LoginResponseProp {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
