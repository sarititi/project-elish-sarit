import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import TodoSearchPanel from "./TodoSearchPanel";
import { fetchTodos, createTodo } from "../api/TodoAPI.js";
import "./todos.css";

function TodosPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("id"); //Decide how to sort
  const [searchResults, setSearchResults] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 🔄 פונקציה שמרעננת את כל המטלות מהשרת
  async function refreshTodos() {
    if (!user) return;
    const data = await fetchTodos(user.id);
    setTodos(data);
  }

  // 🏗️ מביא את המטלות בפעם הראשונה
  useEffect(() => {
    refreshTodos();
  }, [user]);

  async function addTodo(newTodo) {
    const savedTodo = await createTodo(newTodo);
    setTodos(prev => [...prev, savedTodo]);
    setShowAddForm(false);
  }

  function handleSearchResult(results) {
    setSearchResults(results); // מערך ריק נשאר מערך ריק
  }

  // 🔃 פונקציה שמחזירה רשימת todos ממוינת לפי הבחירה
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
      {/* 🔝 אזור עליון: חיפוש + מיון */}
      <div className="search-panel">
        <button
          className="add-todo-btn"
          onClick={() => setShowAddForm(prev => !prev)}
        >
          ➕
        </button>

        {showAddForm && (
          <TodoForm
            onAddTodo={addTodo}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <TodoSearchPanel
          todos={todos}
          onSearchResult={handleSearchResult}
        />
        <TodoFilter setSortBy={setSortBy} />
      </div>

      {todosToShow.length === 0 ? (
        <p className="no-results">😢 סורי, לא מצאנו את מה שחיפשת</p>
      ) : (
        <TodosList
          todos={todosToShow}
          refreshTodos={refreshTodos} // מעבירים לכל TodoItem
        />
      )}
    </div>
  );
}

export default TodosPage;
