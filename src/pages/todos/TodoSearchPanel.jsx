import { useState } from "react";

function TodoSearchPanel({ todos, onSearchResult }) {

  // 🔹 מה המשתמש מחפש
  const [query, setQuery] = useState("");

  // 🔹 לפי איזה קריטריון
  const [criteria, setCriteria] = useState("title");

  // 🔍 פונקציית חיפוש
  function handleSearch() {
    let filtered = [];

    if (criteria === "id") {
      filtered = todos.filter(todo => String(todo.id).includes(query));
    }

    if (criteria === "title") {
      filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (criteria === "completed") {
      const value = query === "true";
      filtered = todos.filter(todo => todo.completed === value);
    }

    // 🔁 מחזירים תוצאה לאבא
    onSearchResult(filtered);
  }

  return (
    <div className="search-panel">

      {/* בחירת קריטריון */}
      <select value={criteria} onChange={e => setCriteria(e.target.value)}>
        <option value="id">מזהה</option>
        <option value="title">כותרת</option>
        <option value="completed">מצב ביצוע (true / false)</option>
      </select>

      {/* טקסט חיפוש */}
      <input
        placeholder="הקלד ערך לחיפוש"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* כפתור חיפוש */}
      <button onClick={handleSearch}>🔍 חפש</button>
    </div>
  );
}

export default TodoSearchPanel;
