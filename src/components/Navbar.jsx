import React from "react";

const TABS = [
  { id: "tasks", label: "Tasks", icon: "✅" },
  { id: "diary", label: "Diary", icon: "📔" },
  { id: "timer", label: "Timer", icon: "⏱️" },
];

function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${activePage === tab.id ? "active" : ""}`}
          onClick={() => setActivePage(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
