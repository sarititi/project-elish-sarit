const BASE_URL = "http://localhost:3001/users";

export async function IsRegistered(username, password) {
    try {
        const res = await fetch(BASE_URL);
    const users = await res.json();

        const foundUser = users.find(
            (user) =>
                user.username === username &&
                user.website === password // פה את משתמשת ב-"website" בשביל הסיסמה
        );

        return foundUser || null; // מחזיר את המשתמש או null אם לא קיים
    } catch (error) {
        console.error("Error checking user:", error);
        return null;
    }
}

export async function createUser(username, website) {
  try {
    const res = await fetch(`${BASE_URL}?username=${username}`);
    const users = await res.json();

    if (users.length > 0) {
      return null;
    }
    const createRes = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, website })
    });

    return await createRes.json();
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function getUserById(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}

export async function updateUser(userId, partialUserData) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partialUserData),
  });

  if (!res.ok) throw new Error("Failed to update user");
  return res;
}