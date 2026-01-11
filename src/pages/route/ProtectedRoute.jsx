// import { useContext } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { AuthContext } from "../AuthContext.jsx";

// export function ProtectedRoute({ children }) {
//   const { user, isAuthLoading } = useContext(AuthContext);
//   const { userId } = useParams();

//   if (isAuthLoading) {
//     return <div>טוען משתמש...</div>;
//   }
//   if (user.id !== Number(userId)) {
//     return <Navigate to={`/users/${user.id}/home`} replace />;
//   }

//   if (!user || !user.id) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export function ProtectedRoute({ children }) {
  const { user, isAuthLoading} = useContext(AuthContext);

 if (isAuthLoading) return <div>⏳ טוען...</div>;

  // אם אין user, נווט ל-login
  if (!user?.id) return <Navigate to="/login" replace />;

  return children;
}
