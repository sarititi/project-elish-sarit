import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import IsRegistered from "./IsRegistered.js";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginCheck = async () => {
    setLoading(true);
    try {
      const fullUser = await IsRegistered(username, website);

      if (fullUser) {
        // 1️⃣ שמירה של כל היוזר בלוקל סטורג'
        localStorage.setItem("user", JSON.stringify(fullUser));

        setUser({
          username: fullUser.username,
          id: fullUser.id
        });
        user.username=fullUser.username;
        user.id=fullUser.id;

        alert("התחברת בהצלחה!");
        navigate(`/users/${user.id}/home`);

      } else {
        alert("אינך קיים במערכת, נא להירשם");
        setUsername("");
        setWebsite("");
        return;
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
          <label>Password (website)</label><br />
          <input
            type="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
