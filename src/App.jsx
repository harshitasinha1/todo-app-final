import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import DiaryPage from "./pages/DiaryPage";
import TimerPage from "./pages/TimerPage";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("tasks");

  const renderPage = () => {
    switch (activePage) {
      case "diary":
        return <DiaryPage />;
      case "timer":
        return <TimerPage />;
      case "tasks":
      default:
        return <TasksPage />;
    }
  };

  return (
    <div className="app">
      <div className="content">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
