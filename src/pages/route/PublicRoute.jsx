// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext.jsx";

// export function PublicRoute({ children }) {
//   const { user, isAuthLoading } = useContext(AuthContext);

//   if (isAuthLoading) return null;


//   if (user && user.id && user.isProfileComplete) {
//     return <Navigate to={`/users/${user.id}/home`} replace />;
//   }

//   return children;
// }
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export function PublicRoute({ children }) {
  const { user, isAuthLoading  } = useContext(AuthContext);
 if (isAuthLoading) return null;

  if (user?.id && user.isProfileComplete) {
    return <Navigate to={`/users/${user.id}/home`} replace />;
  }

  return children;
}