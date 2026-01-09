function TodoFilter({ setSortBy }) {
  return (
    <select className="filter-select" onChange={e => setSortBy(e.target.value)}>
      <option value="id">🔢 מזהה</option>
      <option value="title">📝 כותרת</option>
      <option value="completed">✅ לא בוצע</option>
    </select>
  );
}

export default TodoFilter;
