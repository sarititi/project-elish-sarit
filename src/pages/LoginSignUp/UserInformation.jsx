import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./UserInformation.css";
import { useParams } from "react-router-dom";
///יש לי טעות עם הקונטקבט והפארם
function UserInformation() {
    // const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);


    // const userId = location.state?.userId;
    const { userId } = useParams();
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        suite: "",
        city: ""
    });

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        address: { street: "", suite: "", city: "" },
        phone: "",
        website: ""
    }); const [loading, setLoading] = useState(true);

    // הגנה מניווט ישיר
    useEffect(() => {
        if (!userId || !user?.id) {
            navigate("/signup");
            return;
        }


        async function fetchUser() {
            const res = await fetch(`http://localhost:3001/users/${user.id}`);
            const data = await res.json();

            // אתחול מבנה address אם לא קיים
            setUserData({
                ...data,
                address: data.address || {
                    street: "",
                    suite: "",
                    city: ""
                }
            });

            setLoading(false);
        }

        fetchUser();
    }, [userId, user?.id, navigate]);
    
    function validateForm(userData) {
        const { name, email, phone, address } = userData;
        let valid = true;
        const newErrors = {
            name: "",
            email: "",
            phone: "",
            street: "",
            suite: "",
            city: ""
        };

        if (!name) {
            newErrors.name = "יש להזין שם מלא";
            valid = false;
        }

        if (!email) {
            newErrors.email = "יש להזין כתובת אימייל";
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "כתובת האימייל אינה תקינה";
                valid = false;
            }
        }

        if (!phone) {
            newErrors.phone = "יש להזין מספר טלפון";
            valid = false;
        }

        if (!address.street) {
            newErrors.street = "יש להזין רחוב";
            valid = false;
        }

        if (!address.suite) {
            newErrors.suite = "יש להזין דירה";
            valid = false;
        }

        if (!address.city) {
            newErrors.city = "יש להזין עיר";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    function handleAddressChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            address: {
                ...userData.address,
                [name]: value
            }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm(userData)) {
            return;
        }

        const response = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const updatedUser = await response.json();

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser({
            username: updatedUser.username,
            id: updatedUser.id
        });

        alert("הפרטים נשמרו בהצלחה!");
        navigate(`/users/${user.id}/home`);
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
                    style={{ borderColor: errors.name ? "red" : "#ccc" }}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                {/* שם משתמש */}
                <label>שם משתמש</label>
                <input value={userData.username} disabled />

                {/* Email */}
                <label>Email</label>
                <input
                    name="email"
                    value={userData.email || ""}
                    onChange={handleChange}
                    style={{ borderColor: errors.email ? "red" : "#ccc" }}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                {/* רחוב */}
                <label>רחוב</label>
                <input
                    name="street"
                    value={userData.address.street}
                    onChange={handleAddressChange}
                    style={{ borderColor: errors.street ? "red" : "#ccc" }}
                />
                {errors.street && <p className="error">{errors.street}</p>}

                {/* דירה */}
                <label>דירה</label>
                <input
                    name="suite"
                    value={userData.address.suite}
                    onChange={handleAddressChange}
                    style={{ borderColor: errors.suite ? "red" : "#ccc" }}
                />
                {errors.suite && <p className="error">{errors.suite}</p>}

                {/* עיר */}
                <label>עיר</label>
                <input
                    name="city"
                    value={userData.address.city}
                    onChange={handleAddressChange}
                    style={{ borderColor: errors.city ? "red" : "#ccc" }}
                />
                {errors.city && <p className="error">{errors.city}</p>}

                {/* טלפון */}
                <label>טלפון</label>
                <input
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleChange}
                    style={{ borderColor: errors.phone ? "red" : "#ccc" }}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}

                {/* website */}
                <label>website</label>
                <input value={userData.website} disabled />

                <button type="submit">שמירה והמשך</button>
            </form>
        </div>
    );
}

export default UserInformation;
