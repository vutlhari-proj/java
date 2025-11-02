import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { AuthContext } from "./AuthContext";
import axios from "@/config/axios";

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.get("http://10.2.40.218:8081/api/auth/me", { withCredentials: true });
        console.log("Authentication check response:", response.data);
        setUser(response.data.userExpanded || response.data);
      }
      catch{
        setUser(null);
      }
      finally{
        setLoading(false);
      }

      console.log("Authentication check completed");
    };
    authenticate();
  }, []);

  const logout = async (): Promise<void> => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      { !loading && children}
    </AuthContext.Provider>
  );
}