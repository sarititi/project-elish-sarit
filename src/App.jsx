import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginSignUp/Login.jsx";
import Signup from "./pages/LoginSignUp/Signup.jsx";
import UserInformation from "./pages/LoginSignUp/UserInformation.jsx";
import Home from "./pages/home/Home.jsx";
import TodosPage from "./pages/todos/TodosPage.jsx";
import Albums from "./pages/albums/Albums.jsx";
import AlbumPhotos from "./pages/albums/AlbumPhotos.jsx"


function App() {
  return (
    <Routes>
      {/* עמודים ציבוריים */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* עמודים של משתמש */}
      <Route path="/users/:userId/userInformation" element={<UserInformation />} />
      <Route path="/users/:userId/home" element={<Home />} />
      <Route path="/users/:userId/todos" element={<TodosPage />} />
      <Route path="/users/:userId/albums" element={<Albums />} />
      <Route path="/users/:userId/albums/:albumId" element={<AlbumPhotos />} />



      {/* ברירת מחדל */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;