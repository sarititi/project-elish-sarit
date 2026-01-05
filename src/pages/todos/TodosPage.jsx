import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import TodoSearchPanel from "./TodoSearchPanel";
import "./todos.css";

function TodosPage() {
    // const userId=useParams();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [sortBy, setSortBy] = useState("id");//Decide how to sort
    const [searchResults, setSearchResults] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);


    useEffect(() => {
        // if (!user) return;

        // fetch(`http://localhost:3001/todos?userId=${user.id}`)
        fetch(`http://localhost:3001/todos?userId=${Number(user.id)}`)

            .then(res => res.json())
            .then(data => setTodos(data));
    }, [user]);


    async function addTodo(newTodo) {
        const res = await fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        });

        const savedTodo = await res.json(); // ⬅ id אמיתי מהשרת

        setTodos(prev => [...prev, savedTodo]);
        setShowAddForm(false);
    }



    function deleteTodo(id) {
        setTodos(todos.filter(t => t.id !== id));
    }

    function updateTodo(updatedTodo) {
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    }

    function handleSearchResult(results) {
        if (results.length === 0) {
            setSearchResults(null);
        } else {
            setSearchResults(results);
        }
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


    const todosToShow = searchResults !== null ? searchResults : getSortedTodos();
    console.log("user:", user);

    console.log("todos:", todos);
    console.log("todosToShow:", todosToShow);


    return (
        <div className="todos-page">

            {/* 🔝 אזור עליון: חיפוש + מיון */}
            <div className="search-panel">

                <button
                    className="add-todo-btn"
                    onClick={() => showAddForm==false? setShowAddForm(true) :setShowAddForm(false)}
                >
                    ➕
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
                <TodoFilter setSortBy={setSortBy} />
            </div>

            <TodosList
                todos={todosToShow}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
            />

        </div>
    );

}

export default TodosPage;
