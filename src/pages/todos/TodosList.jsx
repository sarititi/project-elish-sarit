import TodoItem from "./TodoItem";

function TodosList({ todos, refreshTodos }) {
  return (
    <ul className="todos-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          refreshTodos={refreshTodos}
        />
      ))}
    </ul>
  );
}

export default TodosList;
