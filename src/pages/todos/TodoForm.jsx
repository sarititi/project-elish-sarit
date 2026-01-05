import { AuthContext } from "../AuthContext.jsx";
import {useState, useContext } from "react";



function TodoForm({ onAddTodo, onCancel }) {
  const { user, setUser } = useContext(AuthContext);

  // 🔹 state של המטלה החדשה
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  // ➕ שליחת מטלה חדשה לאבא
  function handleSubmit(e) {
    e.preventDefault();

    // 🧱 יצירת אובייקט מטלה
    const newTodo = {
      // id: Date.now(),
      completed: completed,
      userId: user.id
    };

    onAddTodo(newTodo);        // שליחה לאבא
    setTitle("");              // ניקוי שדה
    setCompleted(false);
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">

      {/* כותרת המטלה */}
      <input
        placeholder="כותרת המטלה"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      {/* מצב ביצוע */}
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
        />
        בוצעה
      </label>

      {/* כפתורים */}
      <button type="submit">שמור</button>
      <button type="button" onClick={onCancel}>ביטול</button>

    </form>
  );
}

export default TodoForm;
