// import "../LoginSignUp/UserInformation.css";

export function validateField(name, value, extraData = {}) {
  switch (name) {
    case "username":
      if (!value) return "יש להזין שם משתמש";
      if (value.length < 3) return "שם המשתמש חייב להיות מעל 3 תווים";
      return "";

    case "website":
      if (!value) return "יש להזין סיסמה";
      if (value.length < 4) return "הסיסמה חייבת להיות מעל 4 תווים";
      return "";

    case "verifyWebsite":
      if (!value) return "יש לאמת את הסיסמה";
      if (value !== extraData.website) return "הסיסמאות אינן תואמות";
      return "";

    case "name":
      if (!value) return "יש להזין שם מלא";
      return "";

    case "email":
      if (!value) return "יש להזין כתובת אימייל";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "כתובת האימייל אינה תקינה";
      return "";

    case "phone":
      if (!value) return "יש להזין מספר טלפון";
      return "";

    case "street":
      if (!value) return "יש להזין רחוב";
      return "";

    case "suite":
      if (!value) return "יש להזין דירה";
      return "";

    case "city":
      if (!value) return "יש להזין עיר";
      return "";

    default:
      return "";
  }
}

// פונקציה שבודקת אובייקט שלם לפי רשימת שדות
export function validateForm(data, fields) {
  let isValid = true;
  const errors = {};

  fields.forEach((field) => {
    const value =
      field.includes(".")
        ? field.split(".").reduce((obj, key) => obj?.[key], data)
        : data[field];

    const error = validateField(field.split(".").pop(), value, data);

    errors[field] = error;
    if (error) isValid = false;
  });

  return { isValid, errors };
}
