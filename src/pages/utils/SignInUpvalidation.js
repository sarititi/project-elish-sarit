function requiredMin(value, minLength, fieldName) {
  if (!value) return `יש להזין ${fieldName}`;
  if (value.length < minLength)
    return `${fieldName} חייב להכיל לפחות ${minLength} תווים`;
  return "";
}

export function validateField(name, value, extraData = {}) {
  switch (name) {
    case "username":
      return requiredMin(value, 3, "שם משתמש");

    case "website":
      return requiredMin(value, 4, "סיסמה");

    case "verifyWebsite":
      if (!value) return "יש לאמת את הסיסמה";
      if (value.length < 4) return "הסיסמה חייבת להיות מעל 4 תווים";
      if (value !== extraData.website) return "הסיסמאות אינן תואמות";
      return "";

    case "name":
      return requiredMin(value, 3, "שם מלא");

    case "email":
      if (!value) return "יש להזין כתובת אימייל";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "כתובת האימייל אינה תקינה";
      return "";

    case "phone":
      if (!value) return "יש להזין מספר טלפון";
      if (!/^\d+$/.test(value))
        return "מספר הטלפון יכול להכיל ספרות בלבד";
      if (value.length < 9)
        return "מספר הטלפון חייב להכיל לפחות 9 ספרות";
      return "";

    case "address.street":
      if (!value?.trim()) return "יש להזין רחוב";
      if (value.trim().length < 3) return "שם הרחוב חייב להכיל לפחות 3 תווים";
      return "";

    case "address.suite":
      if (!value?.trim()) return "יש להזין דירה";
      return "";

    case "address.city":
      if (!value?.trim()) return "יש להזין עיר";
      return "";


    default:
      return "";
  }
}

export function getFieldValue(data, field) {
  const value = field.includes(".")
    ? field.split(".").reduce((obj, key) => obj?.[key], data)
    : data[field];
  return value ?? "";  // כאן מחזירים "" במקום undefined
}


export function validateForm(data, fields) {
  let isValid = true;
  const errors = {};

  fields.forEach((field) => {
    const value = getFieldValue(data, field);   // כאן משתמשים בפונקציה החדשה
    const error = validateField(field, value, data);
    errors[field] = error;
    if (error) isValid = false;
  });

  return { isValid, errors };
}

