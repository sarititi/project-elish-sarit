// import { useEffect, useState, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext.jsx";
// import { getUserById, updateUser } from "../api/SignInUpAPI.js";
// import { validateForm, validateField } from "../utils/SignInUpvalidation";
// import "./UserInformation.css";
// import { useParams } from "react-router-dom";
// ///יש לי טעות עם הקונטקבט והפארם
// function UserInformation() {
//     // const location = useLocation();
//     const navigate = useNavigate();
//     const { user, setUser } = useContext(AuthContext);


//     // const userId = location.state?.userId;
//     const { userId } = useParams();
//     const [errors, setErrors] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         street: "",
//         suite: "",
//         city: ""
//     });

//     const [userData, setUserData] = useState({
//         name: "",
//         username: "",
//         email: "",
//         address: { street: "", suite: "", city: "" },
//         phone: "",
//         website: ""
//     }); const [loading, setLoading] = useState(true);

//     // הגנה מניווט ישיר
//     useEffect(() => {
//         if (!userId || !user?.id) {
//             navigate("/signup");
//             return;
//         }

//         async function fetchUser() {
//             try {
//                 const data = await getUserById(user.id);

//                 setUserData({
//                     ...data,
//                     address: data.address || {
//                         street: "",
//                         suite: "",
//                         city: ""
//                     }
//                 });

//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//             }
//         }

//         fetchUser();
//     }, [userId, user?.id, navigate]);


//     async function handleSubmit(e) {
//         e.preventDefault();

//         const { isValid, errors } = validateForm(userData, [
//             "name",
//             "email",
//             "phone",
//             "address.street",
//             "address.suite",
//             "address.city"
//         ]);

//         setErrors({
//             name: errors["name"],
//             email: errors["email"],
//             phone: errors["phone"],
//             street: errors["address.street"],
//             suite: errors["address.suite"],
//             city: errors["address.city"]
//         });

//         if (!isValid) return;

//         try {
//             const updatedUser = await updateUser(user.id, userData);

//             setUser({
//                 username: updatedUser.username,
//                 id: updatedUser.id,
//                 email: updatedUser.email

//             });

//             alert("הפרטים נשמרו בהצלחה!");
//             navigate(`/users/${user.id}/home`);
//         } catch (err) {
//             console.error(err);
//             alert("שגיאה בשמירת הנתונים");
//         }
//     }

//     function validateSingleField(fieldName, value) {
//         const error = validateField(fieldName, value, userData);

//         setErrors((prev) => ({
//             ...prev,
//             [fieldName]: error
//         }));
//     }
//     function handleChange(e) {
//         const { name, value } = e.target;

//         setUserData((prev) => ({
//             ...prev,
//             [name]: value
//         }));

//         validateSingleField(name, value);
//     }


//     function handleAddressChange(e) {
//         const { name, value } = e.target;

//         setUserData((prev) => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [name]: value
//             }
//         }));

//         validateSingleField(name, value);
//     }


//     if (loading) return <p>טוען נתונים...</p>;

//     return (
//         <div className="user-info-container">
//             <h2>השלמת פרטים</h2>

//             <form onSubmit={handleSubmit}>
//                 {/* שם מלא */}
//                 <label>שם מלא</label>
//                 <input
//                     name="name"
//                     value={userData.name || ""}
//                     onChange={handleChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}

//                 />
//                 {errors.name && <p className="error">{errors.name}</p>}

//                 {/* שם משתמש */}
//                 <label>שם משתמש</label>
//                 <input value={userData.username} disabled />

//                 {/* Email */}
//                 <label>Email</label>
//                 <input
//                     name="email"
//                     value={userData.email || ""}
//                     onChange={handleChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}

//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}

//                 {/* רחוב */}
//                 <label>רחוב</label>
//                 <input
//                     name="street"
//                     value={userData.address.street}
//                     onChange={handleAddressChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}

//                 />
//                 {errors.street && <p className="error">{errors.street}</p>}

//                 {/* דירה */}
//                 <label>דירה</label>
//                 <input
//                     name="suite"
//                     value={userData.address.suite}
//                     onChange={handleAddressChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}

//                 />
//                 {errors.suite && <p className="error">{errors.suite}</p>}

//                 {/* עיר */}
//                 <label>עיר</label>
//                 <input
//                     name="city"
//                     value={userData.address.city}
//                     onChange={handleAddressChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}

//                 />
//                 {errors.city && <p className="error">{errors.city}</p>}

//                 {/* טלפון */}
//                 <label>טלפון</label>
//                 <input
//                     name="phone"
//                     value={userData.phone || ""}
//                     onChange={handleChange}
//                     style={{
//                         borderColor: errors.name
//                             ? "red"
//                             : userData.name
//                                 ? "green"
//                                 : "#ccc"
//                     }}
//                 />
//                 {errors.phone && <p className="error">{errors.phone}</p>}

//                 {/* website */}
//                 <label>website</label>
//                 <input value={userData.website} disabled />

//                 <button type="submit">שמירה והמשך</button>
//             </form>
//         </div>
//     );
// }

// export default UserInformation;

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { getUserById, updateUser } from "../api/SignInUpAPI.js";
import { validateForm, validateField } from "../utils/SignInUpvalidation";
import "./UserInformation.css";

function UserInformation() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);

  // הגנה מניווט ישיר
  useEffect(() => {
    if (!userId || !user?.id) {
      navigate("/signup");
      return;
    }

    async function fetchUser() {
      try {
        const data = await getUserById(user.id);
        setUserData({
          ...data,
          address: data.address || { street: "", suite: "", city: "" }
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [userId, user?.id, navigate]);

  // עדכון ערכים בזמן הקלדה
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (touched[name]) {
      const fieldError = validateField(name, value, userData);
      setErrors({ ...errors, [name]: fieldError });
    }
  }

  function handleAddressChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      address: { ...userData.address, [name]: value }
    });

    if (touched[`address.${name}`]) {
      const fieldError = validateField(name, value);
      setErrors({ ...errors, [`address.${name}`]: fieldError });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    const key = name.includes(".") ? name : name;
    setTouched({ ...touched, [key]: true });

    const value = name.includes(".")
      ? name.split(".").reduce((obj, k) => obj?.[k], userData)
      : userData[name];

    const fieldError = validateField(name.split(".").pop(), value, userData);
    setErrors({ ...errors, [key]: fieldError });
  }

  const getBorderColor = (field) => {
    if (!touched[field]) return "#ccc";
    return errors[field] ? "red" : "green";
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // בדיקה מלאה לפני שמירה
    const { isValid, errors: formErrors } = validateForm(userData, [
      "name",
      "email",
      "phone",
      "address.street",
      "address.suite",
      "address.city"
    ]);

    setErrors(formErrors);
    // סמן את כל השדות כ-touched כדי להראות שגיאות
    const newTouched = {};
    Object.keys(formErrors).forEach((key) => (newTouched[key] = true));
    setTouched(newTouched);

    if (!isValid) return;

    try {
      const updatedUser = await updateUser(user.id, userData);
      setUser({
        username: updatedUser.username,
        id: updatedUser.id,
        email: updatedUser.email
      });
      alert("הפרטים נשמרו בהצלחה!");
      navigate(`/users/${user.id}/home`);
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
        {/* שם מלא */}
        <label>שם מלא</label>
        <input
          name="name"
          value={userData.name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("name") }}
        />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}

        {/* שם משתמש */}
        <label>שם משתמש</label>
        <input value={userData.username} disabled />

        {/* Email */}
        <label>Email</label>
        <input
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("email") }}
        />
        {errors.email && touched.email && <p className="error">{errors.email}</p>}

        {/* רחוב */}
        <label>רחוב</label>
        <input
          name="address.street"
          value={userData.address.street}
          onChange={handleAddressChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.street") }}
        />
        {errors["address.street"] && touched["address.street"] && (
          <p className="error">{errors["address.street"]}</p>
        )}

        {/* דירה */}
        <label>דירה</label>
        <input
          name="address.suite"
          value={userData.address.suite}
          onChange={handleAddressChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.suite") }}
        />
        {errors["address.suite"] && touched["address.suite"] && (
          <p className="error">{errors["address.suite"]}</p>
        )}

        {/* עיר */}
        <label>עיר</label>
        <input
          name="address.city"
          value={userData.address.city}
          onChange={handleAddressChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("address.city") }}
        />
        {errors["address.city"] && touched["address.city"] && (
          <p className="error">{errors["address.city"]}</p>
        )}

        {/* טלפון */}
        <label>טלפון</label>
        <input
          name="phone"
          value={userData.phone || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: getBorderColor("phone") }}
        />
        {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}

        {/* website */}
        <label>website</label>
        <input value={userData.website} disabled />

        <button type="submit">שמירה והמשך</button>
      </form>
    </div>
  );
}

export default UserInformation;
