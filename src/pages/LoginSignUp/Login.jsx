import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages/LoginSignUp/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/is-registered", {
      state: {
        username,
        password,
      },
    });
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

        <button type="submit">Login</button>
      </form>

      <Link to="/signup">להרשמה</Link>
    </div>
  );
}

export default Login;


// import { useState } from "react";
// import { Link } from "react-router-dom";


// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("username:", username);
//     console.log("password:", password);
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label><br />
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Password</label><br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//       <Link to="/signup">להרשמה</Link>

//     </div>
//   );
// }

// export default Login;
