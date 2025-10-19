import type { ReactNode } from "react";
export interface User {
  username: string;
  name: string;
  surname: string;
  role: "STUDENT" | "ADMIN" | "LECTURER" | "ADMINISTRATOR" | "HOD";
}
export interface LoginResponseProp {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
