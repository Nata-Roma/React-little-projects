import React, { useRef, useState } from "react";

const timeCounter = (time) => {
  return time.toString().padStart(2, "0");
};

const TimerGame = () => {
  const [title, setTitle] = useState(`Let the countdown begin!`);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCounting, setIsCounting] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef("");

  function startTimer() {
    if (intervalRef.current !== null) return;
    setIsCounting(true);
    setTitle("Countdown!");
    inputRef.current = "";
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        // reset the timer
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;
    setTitle(`Keep the countdown!`);
    setIsCounting(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTitle(`Let start again!`);
    setTimeLeft(10);
    setIsCounting(false);
    intervalRef.current = null;
  }

  function inputTime(e) {
    inputRef.current = e.target.value;
    setTimeLeft(e.target.value);
  }

  const minutes = timeCounter(Math.floor(timeLeft / 60));
  const seconds = timeCounter(timeLeft - minutes * 60);

  return (
    <div className="timer-game">
      <h1 className="title">{title}</h1>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {!isCounting && <button onClick={startTimer}>Start</button>}
        {isCounting && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="text">
        <label>Enter the time in sec</label>
        <input type="text" onChange={inputTime} value={inputRef.current} />
      </div>
    </div>
  );
};

export default TimerGame;
