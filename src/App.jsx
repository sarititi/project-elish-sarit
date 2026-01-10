import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./pages/AuthContext.jsx";
import Login from "./pages/LoginSignUp/Login.jsx";
import Signup from "./pages/LoginSignUp/Signup.jsx";
import UserInformation from "./pages/LoginSignUp/UserInformation.jsx";
import Home from "./pages/home/Home.jsx";
import Info from "./pages/info/Info.jsx";
import TodosPage from "./pages/todos/TodosPage.jsx";
import Albums from "./pages/albums/Albums.jsx";
import Photos from "./pages/albums/Photos.jsx"
import { ProtectedRoute } from "./pages/route/ProtectedRoute.jsx";
import { PublicRoute } from "./pages/route/PublicRoute.jsx";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      <Route path="/users/:userId/userInformation" element={<ProtectedRoute> <UserInformation /></ProtectedRoute>} />

      <Route path="/users/:userId/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}>
        <Route path="info" element={<Info />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId" element={<Photos />} />
      </Route>

<Route
  path="*"
  element={
    user && user.id
      ? <Navigate to={`/users/${user.id}/home`} replace />
      : <Navigate to="/login" replace />
  }
/>
    </Routes>
  );
}

export default App;