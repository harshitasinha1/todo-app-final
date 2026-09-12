import React, { useState, useEffect, useRef } from "react";

const PRESETS = [5, 15, 25, 45];

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function TimerPage() {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const selectPreset = (minutes) => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setDurationMinutes(minutes);
    setSecondsLeft(minutes * 60);
  };

  const handleCustomChange = (e) => {
    const value = Math.max(1, Math.min(180, Number(e.target.value) || 1));
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setDurationMinutes(value);
    setSecondsLeft(value * 60);
  };

  const toggleTimer = () => {
    if (secondsLeft === 0) return;
    setIsFinished(false);
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setSecondsLeft(durationMinutes * 60);
  };

  const progress =
    ((durationMinutes * 60 - secondsLeft) / (durationMinutes * 60)) * 100;

  return (
    <div className="page timer-page">
      <h1>Focus Timer</h1>

      <div className="timer-presets">
        {PRESETS.map((minutes) => (
          <button
            key={minutes}
            className={`preset-btn ${
              durationMinutes === minutes ? "active" : ""
            }`}
            onClick={() => selectPreset(minutes)}
          >
            {minutes}m
          </button>
        ))}
        <div className="custom-preset">
          <input
            type="number"
            min="1"
            max="180"
            value={durationMinutes}
            onChange={handleCustomChange}
          />
          <span>min</span>
        </div>
      </div>

      <div className="timer-circle-wrap">
        <div
          className="timer-circle"
          style={{
            background: `conic-gradient(#a685c9 ${progress}%, #f3e4f6 ${progress}%)`,
          }}
        >
          <div className="timer-circle-inner">
            <span className="timer-display">{formatTime(secondsLeft)}</span>
            {isFinished && <span className="timer-status">Time's up! 🌸</span>}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="timer-btn primary" onClick={toggleTimer}>
          {isRunning ? "Pause" : secondsLeft === 0 ? "Done" : "Start"}
        </button>
        <button className="timer-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimerPage;
