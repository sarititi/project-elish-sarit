import { useState } from "react";
import { filterByIdTitle } from "../utils/filterByIdTitle";

function TodoSearchPanel({ todos, onSearchResult }) {

  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState("title");

function handleSearch() {
  let filtered = [];

 if (criteria === "id") {
    filtered = filterByIdTitle(todos, query, "");
  } 
  else if (criteria === "title") {
    filtered = filterByIdTitle(todos, "", query);
  } 
  else if (criteria === "completed") {
    filtered = filterByIdTitle(todos, "", "", query === "true");
  }

  onSearchResult(filtered);//show filtered results
}

  return (
    <div className="search-panel">
      <select
        className="search-select"
        value={criteria}
        onChange={e => {
          setCriteria(e.target.value);
          setQuery("");
        }}
      >
        <option value="id">🔢 מזהה</option>
        <option value="title">📝 כותרת</option>
        <option value="completed">✅ מצב ביצוע</option>
      </select>

      {criteria === "completed" ? (
        <select className="search-input" value={query} onChange={e => setQuery(e.target.value)}>
          <option value="">בחר...</option>
          <option value="true">בוצע</option>
          <option value="false">לא בוצע</option>
        </select>
      ) : (
        <input
          className="search-input"
          placeholder="🔍 הקלד לחיפוש..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
      )}

      <button onClick={handleSearch} className="search-btn">🔍 חפש</button>

      <button onClick={() => { onSearchResult(null); setQuery(""); }} className="show-all-btn">
        📋 הצג הכל
      </button>
    </div>
  );
}

export default TodoSearchPanel;
