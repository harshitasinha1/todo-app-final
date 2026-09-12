import React from "react";

function TodoList({ todos, setTodos }) {
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
          </label>
          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
