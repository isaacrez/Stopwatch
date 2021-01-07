import React from 'react';
import useInterval from './useInterval';
import './App.css';

const intervalSeconds = 25 * 60;
const cooldownSeconds = 5 * 60;

function App() {
  const [time, setTime] = React.useState(intervalSeconds);
  const [laps, setLaps] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);
  const [isCoolDown, setCoolDown] = React.useState(false);

  function clickHandle() {
    setIsRunning(isRunning => !isRunning);
  }

  function decrementTime() {
    setTime(prevTime => prevTime - 1);
  }

  function incrementLaps() {
    setLaps(prevLaps => prevLaps + 1);
  }

  function getFormattedTime() {
    let seconds = time;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;

    return minutes + ':' + seconds;
  }

  useInterval(decrementTime, (isRunning || isCoolDown) ? 1000 : null);

  React.useEffect(resetClockIfNecessary, [time]);

  function resetClockIfNecessary() {
    if (time <= 0) {
      let newTime = isCoolDown ? intervalSeconds : cooldownSeconds;
      setTime(newTime)

      isCoolDown || incrementLaps();
      setCoolDown(prevCoolDown => !prevCoolDown);
    }
  }

  return (
    <div className="body">
      <div className="timer">
        <h1 className={isCoolDown ? "coolDown" : null}>
          {getFormattedTime()}
        </h1>
      </div>

      <h2>Laps: {laps}</h2>
      
      <button
        onClick={clickHandle}>
        {isRunning ? "STOP" : "START"}
      </button>
    </div>
  );
}

export default App;
