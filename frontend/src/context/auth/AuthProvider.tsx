import { useEffect, useState } from "react";
import type { AuthProviderProps, LoginResponseProp } from "@/types";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponseProp["user"] | null>(() =>{
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);
  
  return (
    <AuthContext.Provider value={{ user: user!, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}