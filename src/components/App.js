import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [time, setTime] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Time format function (Minutes:Seconds:Centiseconds)
  const formatTime = (totalCenti) => {
    const centi = `0${totalCenti % 100}`.slice(-2);
    const totalSec = Math.floor(totalCenti / 100);
    const sec = `0${totalSec % 60}`.slice(-2);
    const min = `0${Math.floor(totalSec / 60)}`.slice(-2);
    return `${min}:${sec}:${centi}`;
  };

  // 1. Start Button: Timer shuru karega
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }
  };

  // 2. Stop Button: Timer ko pause karega
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  // 3. Lap Button: Current time ko list mein add karega
  const recordLap = () => {
    if (isActive) {
      setLaps([...laps, time]);
    }
  };

  // 4. Reset Button: Sab kuch zero kar dega
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="lap-timer-container">
      <h1>Timer: {formatTime(time)}</h1>
      
      <div className="button-group">
        <button className="start-btn" onClick={startTimer}>Start</button>
        <button className="stop-btn" onClick={stopTimer}>Stop</button>
        <button className="lap-btn" onClick={recordLap}>Lap</button>
        <button className="reset-btn" onClick={resetTimer}>Reset</button>
      </div>

      <div className="laps-list">
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
