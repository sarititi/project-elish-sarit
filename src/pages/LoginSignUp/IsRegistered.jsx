import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function IsRegistered() {
  const location = useLocation();
  const data = location.state;

  const [isValidUser, setIsValidUser] = useState(null); // null / true / false
  const [loading, setLoading] = useState(true);

  // הגנה: כניסה ישירה לכתובת
  if (!data) {
    return <Navigate to="/login" />;
  }

  const { username, password } = data;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json(); //float the json to object(arr js), await because the float take a lot of time 

        const userExists = users.some(//SOME בודקת אם לפחות איבר אחד עמד בתנאי כדלהלן
          (user) =>
            user.username === username &&
            user.website === password
        );

        setIsValidUser(userExists);
      } catch (error) {
        console.error("Error checking user:", error);
        setIsValidUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [username, password]);
  //מכאן ומטה צריך לסדר שזה יתאים לעמוד של רישום/ התחברות!!!!!

  if (loading) return <p>Checking...</p>;

  if (!isValidUser) {
    return <Navigate to="/login" />;
  }

  return <div>OK</div>;
}

export default IsRegistered;
