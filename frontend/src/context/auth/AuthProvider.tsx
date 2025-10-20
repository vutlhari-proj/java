import { useState } from "react";
import type { AuthProviderProps, LoginResponseProp, User } from "@/types";
import { AuthContext } from "./AuthContext";
import { userStorage } from "@/config";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponseProp["user"] | null>(() => {
    // Load user from session storage using userConfig
    const storedUser = userStorage.getUser();
    // Return the stored user or null
    return storedUser as LoginResponseProp["user"] | null;
  });
  
  const handleSetUser = (userData: LoginResponseProp["user"]) => {
    setUser(userData);
    if (userData) {
      // Store user in session storage using userConfig
      userStorage.setUser(userData as unknown as User);
    } else {
      // Clear user from session storage
      userStorage.clearSession();
    }
  };
  
  return (
    <AuthContext.Provider value={{ user: user!, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
}