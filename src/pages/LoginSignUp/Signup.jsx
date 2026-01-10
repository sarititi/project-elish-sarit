import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../api/SignInUpAPI.js";
import { validateForm, validateField } from "../utils/SignInUpvalidation";
import "./Signup.css";

function Signup() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", website: "", verifyWebsite: "" });
  const [errors, setErrors] = useState({ username: "", website: "", verifyWebsite: "" });
  const [touched, setTouched] = useState({ username: false, website: false, verifyWebsite: false });

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const updatedFormData = { ...formData, [name]: value };
    const error = validateField(name, value, updatedFormData);
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ username: true, website: true, verifyWebsite: true });

    const { isValid, errors } = validateForm(formData, ["username", "website", "verifyWebsite"]);
    setErrors(errors);
    if (!isValid) return;

    try {
      const newUser = await createUser(//put the new user in rhe data
        formData.username,
        formData.website
      );

      if (!newUser) {
        alert("שם משתמש כבר קיים במערכת");
        return;
      }

      setUser({
        username: newUser.username,
        id: newUser.id,
        email: newUser.email,
        isProfileComplete: false
      });

      navigate(`/users/${newUser.id}/userInformation`);
    } catch (error) {
      console.error("Signup error:", error);
      alert("שגיאה בהרשמה, נסי שוב");
    }
  }
  const getBorderColor = (field) => {
    if (!touched[field]) return "#ccc";
    return errors[field] ? "red" : "green";
  };

  return (
    <div className="login-container">
      <h2>הרשמה</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("username") }}
          />
          {errors.username && touched.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>

        <div>
          <label>סיסמה</label><br />
          <input
            type="password"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("website") }}
          />
          {errors.website && touched.website && (
            <p className="error">{errors.website}</p>
          )}
        </div>

        <div>
          <label>אימות סיסמה</label><br />
          <input
            type="password"
            name="verifyWebsite"
            value={formData.verifyWebsite}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("verifyWebsite") }}
          />
          {errors.verifyWebsite && touched.verifyWebsite && (
            <p className="error">{errors.verifyWebsite}</p>
          )}
        </div>

        <button type="submit">הרשמה</button>
      </form>

      <Link to="/login">כבר רשום? התחבר</Link>
    </div>
  );
}

export default Signup;
