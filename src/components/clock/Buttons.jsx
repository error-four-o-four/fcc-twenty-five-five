import { useEffect } from 'react';

// import { TYPES, useClockContext, useClockContextUpdater } from './Context.jsx';
import { ACTIONS } from '@js/clockReducer.js';

import styles from './Clock.module.css';

function ClockButtons({ clock, updateClock }) {
  // const { active, paused } = useClockContext();
  // const { setType, setActive, setPaused } = useClockContextUpdater();

  const { active, paused } = clock;

  const toggle = () => {
    updateClock({ type: ACTIONS.TOGGLE });
    // if (!active) {
    //   setActive(true);
    // } else {
    //   setActive(false);
    //   setPaused(false);
    //   setType(TYPES.SESSION);
    // }
  };

  // const pause = () => {
  //   setPaused((prev) => !prev);
  // };

  const stop = () => {
    updateClock({ type: ACTIONS.STOP });
  };

  useEffect(() => {
    console.count('Render Buttons');
  });

  // const labelStartStop = active ? 'Stop' : 'Start';
  // const labelPause = paused ? 'Resume' : 'Pause';

  const label = !active ? 'Start' : paused ? 'Resume' : 'Pause';

  return (
    <div className={styles.clockButtonsWrap}>
      <div className={styles.clockButtons}>
        <button id="start_stop" type="button" onClick={toggle}>
          {label}
        </button>
        <button type="button" onClick={stop} disabled={!active}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default ClockButtons;
