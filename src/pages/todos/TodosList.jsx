import TodoItem from "./TodoItem";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";

function TodosList({ todos, onDelete, onUpdate }) {
    const { user, setUser } = useContext(AuthContext);
    console.log("TodosList received:", todos);
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
}

export default TodosList;
