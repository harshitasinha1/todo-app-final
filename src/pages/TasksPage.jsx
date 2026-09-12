import React, { useState, useEffect } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

function TasksPage() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="page tasks-page">
      <h1>To-Do List</h1>

      <TodoInput setTodos={setTodos} />

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>✨ Everything is done! Time to bloom 🌸 </p>
        </div>
      ) : (
        <TodoList todos={filteredTodos} setTodos={setTodos} />
      )}

      {todos.length > 0 && (
        <button
          className="clear-btn"
          onClick={() => setTodos([])}
          style={{ marginTop: "20px", color: "#2E0F38" }}
        >
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default TasksPage;
