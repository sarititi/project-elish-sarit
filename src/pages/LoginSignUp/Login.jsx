import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import IsRegistered from "./IsRegistered";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // פונקציה שתעביר ל-IsRegistered ותקבל תשובה
  const handleLoginCheck = async () => {
    setLoading(true);
    try {
      const userExists = await IsRegistered(username, password); // IsRegistered מחזיר promise<boolean>

      if (userExists) {
        const loggedUser = { username };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setUser(loggedUser);
        navigate("/home");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginCheck();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>

      <Link to="/signup">להרשמה</Link>
    </div>
  );
}

export default Login;
