import { AuthContext } from "../AuthContext.jsx";
import {useState, useContext } from "react";

function TodoForm({ onAddTodo, onCancel }) {
  const { user} = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      title: title,
      completed: completed,
      userId: user.id
    };

    onAddTodo(newTodo);        
    setTitle("");             
    setCompleted(false);
  }

    return (
    <div className="todo-item todo-form-card">
      <div className="todo-form-inner">
        <input
          className="todo-form-input"
          placeholder="✨ מה המטלה החדשה?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          autoFocus
        />

        <div className="todo-form-actions">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={e => setCompleted(e.target.checked)}
            />
            <span>בוצעה</span>
          </label>

          <div className="form-buttons">
            <button onClick={handleSubmit} className="save-btn">💾 שמור</button>
            <button onClick={onCancel} className="cancel-btn">❌ ביטול</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
