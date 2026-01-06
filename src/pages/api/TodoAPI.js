const BASE_URL = "http://localhost:3001/todos";

// ➕ הוספת מטלה
export async function createTodo(todo) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });
  return res.json(); // מחזיר את המטלה עם id מהשרת
}

// 🔄 עדכון מטלה
export async function updateTodoApi(todo) {
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "PATCH",//patch???
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });
  return res.json();
}

// ❌ מחיקת מטלה
export async function deleteTodoApi(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

// 📥 קבלת כל המטלות של משתמש
export async function fetchTodos(userId) {
  const res = await fetch(`${BASE_URL}?userId=${userId}`);
  return res.json(); // מחזיר מערך של מטלות
}
