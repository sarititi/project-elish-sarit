import { useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "../AuthContext.jsx";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import TodoSearchPanel from "./TodoSearchPanel";
import { fetchTodos, createTodo } from "../api/TodoAPI.js";
import "./todos.css";

function TodosPage() {
  const { user } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [searchResults, setSearchResults] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    refreshTodos();
  }, [user.id]);

  async function refreshTodos() {
    setIsLoading(true);
    const data = await fetchTodos(user.id);
    setTodos(data);
    setIsLoading(false);
  }

  async function addTodo(newTodo) {
    const savedTodo = await createTodo(newTodo);
    setTodos(prev => [...prev, savedTodo]);
    setShowAddForm(false);
  }

  function handleSearchResult(results) {
    setSearchResults(results); // מערך ריק נשאר מערך ריק
  }

  function getSortedTodos() {
    const sorted = [...todos];

    if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "completed") {
      sorted.sort((a, b) => a.completed - b.completed);
    } else {
      sorted.sort((a, b) => a.id - b.id);
    }
    return sorted;
  }

  const todosToShow = searchResults === null ? getSortedTodos() : searchResults;

  return (
    <div className="todos-page">
      <div className="top-controls">
        <TodoSearchPanel todos={todos} onSearchResult={handleSearchResult} />
        <TodoFilter setSortBy={setSortBy} />
      </div>

      {isLoading ? (
        <div className="loading">⏳ טוען מטלות...</div>
      ) : todosToShow.length === 0 ? (
        <p className="no-results">😢 לא מצאנו מטלות</p>
      ) : (
        <TodosList todos={todosToShow} refreshTodos={refreshTodos} />
      )}

      {showAddForm && (
        <div ref={formRef}>
          <TodoForm onAddTodo={addTodo} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <button className="add-todo-btn" onClick={() => setShowAddForm(prev => !prev)}>
        {showAddForm ? "❌" : "➕"}
      </button>
    </div>
  );
}
export default TodosPage;
