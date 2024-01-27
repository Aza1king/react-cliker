
import React, { useState, useEffect } from 'react';
import './App.css';



function ClickerGame() {
  const [timer, setTimer] = useState(10); 
  const [clicks, setClicks] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [editableTimer, setEditableTimer] = useState(timer);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [smiley, setSmiley] = useState('🖕🏼');

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalId);
      setClicksPerSecond(clicks / 10);
      setTimer(0); 
      setGameStarted(false);
    }
  }, [timer]);

  const handleClick = () => {
    if (gameStarted) {
      setClicks(clicks + 1);
      changeSmiley(); 
    }
  };

  const changeSmiley = () => {
    const smileys = ['😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😌', '😍', '😎', '😏', '😐', '😒', '😓', '😔', '😖', '😘', '😚',
      '😜', '😝', '😞', '😠', '😡', '😢', '😣', '😤', '😥', '😨', '😩', '😪', '😫', '😭',' 😰', '😱', '😲', '😳', '😵', '😶', '😷', '👴',]; // Список смайликов
    const randomIndex = Math.floor(Math.random() * smileys.length); 
    setSmiley(smileys[randomIndex]); 
  };

  const handleTimerChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setEditableTimer(value);
    }
  };

  const startGame = () => {
    setTimer(editableTimer);
    setClicks(0);
    setClicksPerSecond(0);
    setGameStarted(true);
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 0.01);
    }, 10);
    setIntervalId(id);
  };

  return (
    <div className="container"> 
      <h1>Кликер</h1>
      <div>
        <button className="click-btn" onClick={handleClick} disabled={!gameStarted}>
          {smiley} 
        </button>
        <p>Кликов {clicks}</p>
        <p>кл/с {clicksPerSecond.toFixed(2)}</p>
        <div>
          <label>Таймер в секундах</label>
          <input
            className="timer-input"
            type="number"
            min="1"
            value={editableTimer}
            onChange={handleTimerChange}
          />
          <button className="start-btn" onClick={startGame} disabled={gameStarted}>
            {gameStarted ? 'Игра идет' : 'Новая игра'}
          </button>
        </div>
        <p>Осталось времени {timer.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ClickerGame;
