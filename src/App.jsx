import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginSignUp/Login.jsx";
import Signup from "./pages/LoginSignUp/Signup.jsx";
import UserInformation from "./pages/LoginSignUp/UserInformation.jsx";
import Home from "./pages/home/Home.jsx";
import Info from "./pages/info/Info.jsx";
import TodosPage from "./pages/todos/TodosPage.jsx";
import Albums from "./pages/albums/Albums.jsx";
import AlbumPhotos from "./pages/albums/AlbumPhotos.jsx"


function App() {
  return (
    <Routes>
      {/* עמודים ציבוריים */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users/:userId/userInformation" element={<UserInformation />} />
      <Route path="/users/:userId/home" element={<Home />}>
        <Route path="info" element={<Info />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId" element={<AlbumPhotos />} />
      </Route>



      {/* ברירת מחדל */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;