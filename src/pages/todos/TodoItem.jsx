import { useState } from "react";


function TodoItem({ todo, onDeleteFromServer, onUpdate }) {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  async function toggleCompleted() {
    const updated = { ...todo, completed: !todo.completed };
    await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    onUpdate(updated);
  }

  async function saveEdit() {
    const updated = { ...todo, title: editTitle };
    await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    onUpdate(updated);
    setIsEditing(false);
  }

  async function remove() {
    await fetch(`http://localhost:3001/todos/${todo.id}`, { method: "DELETE" });
   onDeleteFromServer(todo.id);

  }

  return (
   <li className={`todo-card ${todo.completed ? "done" : ""}`}>
  <span className="todo-id">#{todo.id}</span>

  <input
    type="checkbox"
    checked={todo.completed}
    onChange={toggleCompleted}
  />

  <span className="todo-title">{todo.title}</span>

  <button onClick={() => setIsEditing(true)}>✏</button>
  <button onClick={remove}>🗑</button>
</li>

  );
}

export default TodoItem;
