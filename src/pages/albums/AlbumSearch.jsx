import "./Albums.css";

function SearchBar({ searchTerm, setSearchTerm, searchBy, setSearchBy }) {
  return (
    <div className="search-bar">
      <select 
        value={searchBy} 
        onChange={e => setSearchBy(e.target.value)}
        className="search-select"
      >
        <option value="title">חיפוש לפי כותרת</option>
        <option value="id">חיפוש לפי ID</option>
      </select>
      
      <input
        type={searchBy === "id" ? "number" : "text"}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder={searchBy === "id" ? "הכנס ID..." : "הכנס כותרת..."}
        className="search-input"
      />
    </div>
  );
}
export default SearchBar;