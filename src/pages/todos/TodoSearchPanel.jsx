import { useState } from "react";

function TodoSearchPanel({ todos, onSearchResult }) {

  // 🔹 מה המשתמש מחפש
  const [query, setQuery] = useState("");

  // 🔹 לפי איזה קריטריון
  const [criteria, setCriteria] = useState("title");

function handleSearch() {
  let filtered = [];

  if (criteria === "id") {
    filtered = todos.filter(todo => String(todo.id).includes(query));
  } else if (criteria === "title") {
    filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
  } else if (criteria === "completed") {
    filtered = todos.filter(todo => String(todo.completed) === query);
  }

  // ❗ אם אין תוצאות, שמרו מערך ריק, לא null
  // הצג הכל תשלח null באופן מפורש בלבד
  onSearchResult(filtered);

  // ❗ רוקנים את שדה החיפוש תמיד אחרי לחיצה
  setQuery("");
}





  return (
    <div className="search-panel">
      <select
        value={criteria}
        onChange={e => {
          setCriteria(e.target.value);
          setQuery("");
        }}
      >
        <option value="id">מזהה</option>
        <option value="title">כותרת</option>
        <option value="completed">מצב ביצוע (true / false)</option>
      </select>

      {criteria === "completed" ? (
        <select value={query} onChange={e => setQuery(e.target.value)}>
          <option value="true">בוצע</option>
          <option value="false">לא בוצע</option>
        </select>
      ) : (
        <input
          placeholder="הקלד ערך לחיפוש"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

      )}

      <button onClick={handleSearch}>🔍 חפש</button>
      <button
        onClick={() => {
          onSearchResult(null);
          setQuery("");
        }}
      >
        הצג הכל
      </button>
    </div>
  );
}

export default TodoSearchPanel;
