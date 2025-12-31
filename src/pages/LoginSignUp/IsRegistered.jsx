// עכשיו IsRegistered היא **פונקציה בלבד**, מחזירה Promise<boolean>
async function IsRegistered(username, password) {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    const userExists = users.some(
      (user) =>
        user.username === username &&
        user.website === password 
    );

    return userExists; // true / false
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
}

export default IsRegistered;


// import { useLocation, Navigate, useNavigate } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../AuthContext.jsx";

// function IsRegistered() {
//   const location = useLocation();
//   const data = location.state;

//   const [isValidUser, setIsValidUser] = useState(null); // null / true / false
//   const [loading, setLoading] = useState(true);

//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // הגנה: כניסה ישירה לכתובת
//   if (!data) {
//     return <Navigate to="/login" />;
//   }

//   const { username, password } = data;

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/users");
//         const users = await response.json(); 
//         // float the json to object(arr js), await because the float take a lot of time 

//         const userExists = users.some( // SOME בודקת אם לפחות איבר אחד עמד בתנאי כדלהלן
//           (user) =>
//             user.username === username &&
//             user.website === password
//         );

//         setIsValidUser(userExists);

//         if (userExists) {
//           const loggedUser = { username };

//           // שמירה בלוקל סטורג'
//           localStorage.setItem("user", JSON.stringify(loggedUser));

//           // שמירה ב־Context
//           setUser(loggedUser);

//           // מעבר לעמוד הבא
//           navigate("/home");
//         } else {
//           // משתמש לא קיים → הרשמה
//           navigate("/signup");
//         }

//       } catch (error) {
//         console.error("Error checking user:", error);
//         setIsValidUser(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, [username, password, navigate, setUser]);

//   if (loading) return <p>Checking...</p>;

//   return null;
// }

// export default IsRegistered;


// import { useLocation, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function IsRegistered() {
//   const location = useLocation();
//   const data = location.state;

//   const [isValidUser, setIsValidUser] = useState(null); // null / true / false
//   const [loading, setLoading] = useState(true);

//   // הגנה: כניסה ישירה לכתובת
//   if (!data) {
//     return <Navigate to="/login" />;
//   }

//   const { username, password } = data;

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/users");
//         const users = await response.json(); //float the json to object(arr js), await because the float take a lot of time 

//         const userExists = users.some(//SOME בודקת אם לפחות איבר אחד עמד בתנאי כדלהלן
//           (user) =>
//             user.username === username &&
//             user.website === password
//         );

//         setIsValidUser(userExists);
//       } catch (error) {
//         console.error("Error checking user:", error);
//         setIsValidUser(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, [username, password]);
//   //מכאן ומטה צריך לסדר שזה יתאים לעמוד של רישום/ התחברות!!!!!

//   if (loading) return <p>Checking...</p>;

//   if (!isValidUser) {
//     return <Navigate to="/login" />;
//   }

//   return <div>OK</div>;
// }

// export default IsRegistered;
