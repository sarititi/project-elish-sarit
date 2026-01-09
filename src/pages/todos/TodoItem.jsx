import { useState } from "react";
import { updateTodoApi, deleteTodoApi } from "../api/TodoAPI.js";

function TodoItem({ todo, refreshTodos }) {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  async function toggleCompleted() {
    const updated = { ...todo, completed: !todo.completed };
    await updateTodoApi(updated);  
    refreshTodos();                
  }

  async function saveEdit() {
    const updated = { ...todo, title: editTitle };
    await updateTodoApi(updated);  
    setIsEditing(false);
    refreshTodos();                
  }

  async function remove() {
    await deleteTodoApi(todo.id);  
    refreshTodos();              
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span className="todo-id">#{todo.id}</span>

      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {isEditing ? (
        <div className="todo-edit-mode">
          <input
            className="todo-edit-input"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && saveEdit()}
          />
          <div className="edit-actions">
            <button onClick={saveEdit} className="icon-btn save">💾</button>
            <button onClick={() => setIsEditing(false)} className="icon-btn cancel">❌</button>
          </div>
        </div>
      ) : (
        <div className="todo-view-mode">
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="icon-btn edit">✏️</button>
            <button onClick={remove} className="icon-btn delete">🗑️</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
