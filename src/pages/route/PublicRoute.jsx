import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user && user.id && user.isProfileComplete) {
    return <Navigate to={`/users/${user.id}/home`} replace />;
  }

  return children;
}
