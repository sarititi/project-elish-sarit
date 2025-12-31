import { useLocation, Navigate } from "react-router-dom";

function IsRegistered() {
  const location = useLocation();
  const data = location.state;

  // הגנה: אם מישהו נכנס לכתובת ישירות
  if (!data) {
    return <Navigate to="/login" />;
  }

  const { username, password } = data;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Is Registered</h2>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
    </div>
  );
}

export default IsRegistered;
