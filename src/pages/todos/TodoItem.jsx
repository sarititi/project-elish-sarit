import { useState } from "react";
import { updateTodoApi, deleteTodoApi } from "../api/TodoAPI.js";


function TodoItem({ todo, refreshTodos }) {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  async function toggleCompleted() {
    const updated = { ...todo, completed: !todo.completed };
    await updateTodoApi(updated);  // משתמשים ב-API
    refreshTodos();                // מרעננים את הרשימה מהשרת
  }

  async function saveEdit() {
    const updated = { ...todo, title: editTitle };
    await updateTodoApi(updated);  // משתמשים ב-API
    setIsEditing(false);
    refreshTodos();                // מרעננים את הרשימה מהשרת
  }

  async function remove() {
    await deleteTodoApi(todo.id);  // משתמשים ב-API
    refreshTodos();                // מרעננים את הרשימה מהשרת
  }

  return (
    <li className={`todo-card ${todo.completed ? "done" : ""}`}>

      <span className="todo-id">#{todo.id}</span>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <button onClick={saveEdit}>💾</button>
          <button onClick={() => setIsEditing(false)}>❌</button>
        </>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <button onClick={() => setIsEditing(true)}>✏</button>
          <button onClick={remove}>🗑</button>
        </>
      )}

    </li>
  );

}

export default TodoItem;
