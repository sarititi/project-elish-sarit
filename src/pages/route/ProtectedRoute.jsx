import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

