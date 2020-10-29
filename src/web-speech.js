import React, { useCallback, useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useSpeechSynthesis } from "react-speech-kit";

const TalkInput = ({ index, timer, updateTimers }) => {
  const [time, setTime] = useState(timer.time);
  const [text, setText] = useState(timer.text);

  function onBlurHandler() {
    updateTimers(index, time, text);
  }

  return (
    <form>
      <input
        type="number"
        value={time}
        className="input-number"
        onChange={(e) => setTime(+e.target.value)}
        onBlur={onBlurHandler}
      />
      <input
        type="text"
        value={text}
        className="input-text"
        onChange={(e) => setText(e.target.value)}
        onBlur={onBlurHandler}
      />
    </form>
  );
};

const WebSpeech = () => {
  const [timers, setTimers] = useState([
    { time: 2, text: "its my timer" },
    { time: 7, text: "ding-dong" },
    { time: 10, text: "and the message" }
  ]);

  const updateTimers = (index, time, text) => {
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers);
  };

  const addTimer = () => {
    const newTimers = [...timers, { time: 12, text: "another message" }];
    setTimers(newTimers);
  };

  const { seconds, isRunning, start, reset } = useStopwatch();
  const { speak, speaking, supported } = useSpeechSynthesis();

  const doReset = useCallback(() => reset(), []);
  const doSpeak = useCallback((...p) => speak(...p), []);

  useEffect(() => {
    const usingTimer = timers.find((timer) => timer.time === seconds);
    if (usingTimer) doSpeak({ text: usingTimer.text });
    if (seconds > timers[timers.length - 1].time) doReset();
  }, [seconds, timers, doReset, doSpeak]);

  if (!supported) {
    return <div>Your browser is not supported. Sorry.</div>;
  }

  return (
    <div className="talk">
      <div className="talk-title">TALK THE TALK</div>
      <div className="talk-container">
        {timers.map((timer, index) => (
          <TalkInput
            key={index}
            index={index}
            timer={timer}
            setTimers={setTimers}
            updateTimers={updateTimers}
          />
        ))}
      </div>
      <button className="talk-btn" onClick={addTimer}>
        Add
      </button>
      <div className="talk-title">{seconds}</div>
      {!isRunning && (
        <button className="btn-timer start" onClick={start}>
          Start
        </button>
      )}
      {isRunning && (
        <button className="btn-timer stop" onClick={reset}>
          Stop
        </button>
      )}
      {speaking && <p className="speaking">I am speaking</p>}
    </div>
  );
};

export default WebSpeech;
