import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context";

export function PrivateRoute({ children }: { children: ReactNode }){
  const { user, loading } = useContext(AuthContext);

  if(loading) return <div></div>;

  if(!user) return <Navigate to="/login" replace />;

  return children;
}