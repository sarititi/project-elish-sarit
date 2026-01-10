import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { getUserById, updateUser } from "../api/SignInUpAPI.js";
import { validateForm, validateField, getFieldValue } from "../utils/SignInUpvalidation";
import "./UserInformation.css";

function UserInformation() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "", username: "", email: "",
    address: { street: "", suite: "", city: "" },
    phone: "", website: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) return;
    fetchUser();
  }, [user.id]);

  async function fetchUser() {
    const data = await getUserById(user.id);
    setUserData({
      ...data,
      address: data.address || { street: "", suite: "", city: "" }
    });
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
 if (name.startsWith("address.")) {
    const field = name.split(".")[1];
    setUserData({
      ...userData,
      address: { ...userData.address, [field]: value }
    });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const value = getFieldValue(userData, name);
    const error = validateField(name, value, userData);
    setErrors({ ...errors, [name]: error });
  }

  const getBorderColor = (field) => {
    if (!touched[field]) return "#ccc";
    return errors[field] ? "red" : "green";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { isValid, errors: formErrors } = validateForm(userData, [
      "name", "email", "phone",
      "address.street", "address.suite", "address.city"
    ]);

    setErrors(formErrors);
    const newTouched = {};
    Object.keys(formErrors).forEach((key) => (newTouched[key] = true));
    setTouched(newTouched);

    if (!isValid) return;
    try {
      const updatedUser = await updateUser(user.id, userData);
      setUser(prev => ({
      ...prev,                      
      email: updatedUser.email,
      isProfileComplete: true  
    }));

      alert("הפרטים נשמרו בהצלחה!");
      navigate(`/users/${user.id}/home` , { replace: true });
    } catch (err) {
      console.error(err);
      alert("שגיאה בשמירת הנתונים");
    }
  }
  if (loading) return <p>טוען נתונים...</p>;

  return (
    <div className="user-info-container">
      <h2>השלמת פרטים</h2>

      <form onSubmit={handleSubmit}>
        <label>שם מלא</label>
        <input
          name="name"
          value={userData.name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("name") }}
        />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}

        <label>שם משתמש</label>
        <input value={userData.username} disabled />

        <label>Email</label>
        <input
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("email") }}
        />
        {errors.email && touched.email && <p className="error">{errors.email}</p>}

        <label>רחוב</label>
        <input
          name="address.street"
          value={userData.address.street}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.street") }}
        />
       {errors["address.street"] && touched["address.street"] && (
  <p className="error">{errors["address.street"]}</p>
        )}

        <label>דירה</label>
        <input
          name="address.suite"
          value={userData.address.suite}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.suite") }}
        />
        {errors["address.suite"] && touched["address.suite"] && (
  <p className="error">{errors["address.suite"]}</p>
        )}

        <label>עיר</label>
        <input
          name="address.city"
          value={userData.address.city}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.city") }}
        />
        {errors["address.city"] && touched["address.city"] && (
  <p className="error">{errors["address.city"]}</p>
        )}

        <label>טלפון</label>
        <input
          name="phone"
          value={userData.phone || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("phone") }}
        />
        {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}

        <label>website</label>
        <input value={userData.website} disabled />

        <button type="submit">שמירה והמשך</button>
      </form>
    </div>
  );
}

export default UserInformation;
