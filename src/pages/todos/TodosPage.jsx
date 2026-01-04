import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
// import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
// import TodoFilter from "./TodoFilter";
import TodoSearchPanel from "./TodoSearchPanel";
import "./todos.css";

function TodosPage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [sortBy, setSortBy] = useState("id");//Decide how to sort
    const [searchResults, setSearchResults] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    if (!user) { navigate("/login"); }

    useEffect(() => {//loading the todos from the server
        fetch(`http://localhost:3001/todos?userId=${user.id}`)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, [userId, user?.id, navigate]);

    function addTodo(newTodo) {
        setTodos(prev => [...prev, newTodo]); // הוספה לרשימה
        setShowAddForm(false);                 // סגירת הטופס
    }


    function deleteTodo(id) {
        setTodos(todos.filter(t => t.id !== id));
    }

    function updateTodo(updatedTodo) {
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    }

    function handleSearchResult(results) {
        setSearchResults(results);
    }
    const todosToShow = searchResults || getSortedTodos();


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

return (
    <div className="todos-page">

        {/* 🔝 אזור עליון: חיפוש + מיון */}
        <div className="search-panel">

            {/* ➕ כפתור פתיחת טופס */}
            <button onClick={() => setShowAddForm(true)}>
                ➕ הוסף מטלה
            </button>

            {/* ➕ טופס הוספה – מוצג באותו עמוד */}
            {showAddForm && (
                <TodoForm
                    onAddTodo={addTodo}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {/* 🔍 חיפוש (הלוגיקה בקומפוננטה נפרדת) */}
            <TodoSearchPanel
                todos={todos}
                onSearchResult={handleSearchResult}
            />

            {/*
            <TodoFilter setSortBy={setSortBy} />
            */}
        </div>

        {/*
        <TodosList
            todos={todosToShow}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
        />
        */}

    </div>
);

}

export default TodosPage;
