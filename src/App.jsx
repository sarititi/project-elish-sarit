import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginSignUp/Login.jsx";
import IsRegistered from "./pages/LoginSignUp/IsRegistered";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* ברירת מחדל */}
      <Route path="*" element={<Navigate to="/login" />} />
      {/* <Route path="/is-registered" element={<IsRegistered />} /> */}
    </Routes>
  );
}

export default App;