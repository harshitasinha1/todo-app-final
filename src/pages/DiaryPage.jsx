import React, { useState, useEffect } from "react";

const MOODS = [
  { emoji: "🌸", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😔", label: "Low" },
  { emoji: "🔥", label: "Motivated" },
];

function DiaryPage() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("diaryEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [draft, setDraft] = useState("");
  const [mood, setMood] = useState(MOODS[0].emoji);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!draft.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: draft.trim(),
      mood,
      date: new Date().toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setEntries([newEntry, ...entries]);
    setDraft("");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="page diary-page">
      <h1>Diary</h1>

      <div className="diary-input-card">
        <div className="mood-picker">
          {MOODS.map((m) => (
            <button
              key={m.emoji}
              className={`mood-btn ${mood === m.emoji ? "active" : ""}`}
              onClick={() => setMood(m.emoji)}
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        <textarea
          className="diary-textarea"
          placeholder="What's on your mind today?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
        />

        <button className="diary-save-btn" onClick={addEntry}>
          Save Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>📝 No entries yet. Write your first thought! 🌸</p>
        </div>
      ) : (
        <div className="diary-entries">
          {entries.map((entry) => (
            <div className="diary-entry" key={entry.id}>
              <div className="diary-entry-header">
                <span className="diary-entry-mood">{entry.mood}</span>
                <span className="diary-entry-date">{entry.date}</span>
                <button
                  className="diary-delete-btn"
                  onClick={() => deleteEntry(entry.id)}
                  aria-label="Delete entry"
                >
                  ✕
                </button>
              </div>
              <p className="diary-entry-text">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiaryPage;
