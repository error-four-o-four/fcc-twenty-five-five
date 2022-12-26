import { useCallback, useEffect, useRef, useState } from 'react';

// import { TYPES, useClockContext, useClockContextUpdater } from './Context.jsx';
import { TYPES } from '@js/clockReducer.js';
import CountdownSVG from './CountdownSVG.jsx';

import styles from './Clock.module.css';

const toTitleCase = (string) => string[0].toUpperCase() + string.substring(1);

const clockify = (ticks, sessionTicks, total) => {
  const remaining =
    ticks <= sessionTicks ? sessionTicks - ticks : total - ticks;
  const minutes = `${Math.floor(remaining / 60)}`.padStart(2, '0');
  const seconds = `${remaining % 60}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export default function Countdown({ clock, settings }) {
  // const { type, active, paused } = useClockContext();
  // const { setType } = useClockContextUpdater();

  const { active, paused } = clock;

  const sessionTicks = settings[TYPES.SESSION] * 60;
  const totalTicks = settings.total * 60 + 2;

  const [ticks, setTicks] = useState(0);
  const [type, setType] = useState(TYPES.SESSION);

  const updateTicks = useCallback(() => {
    setTicks((prev) => (prev + 1) % totalTicks);
  }, [totalTicks]);

  const interval = useRef(undefined);

  const updateInterval = useCallback(() => {
    if (interval.current && (!active || paused)) {
      interval.current = clearInterval(interval.current);
    }

    if (!interval.current && active && !paused) {
      interval.current = setInterval(updateTicks, 250);
    }
  }, [active, paused, updateTicks]);

  const removeInterval = useCallback(() => {
    if (interval.current && (!active || paused)) {
      clearInterval(interval.current);
      console.log('cleared');
    }
  }, [active, paused]);

  // Context Clock
  const updateType = useCallback(() => {
    if (type === TYPES.SESSION && ticks > sessionTicks) {
      setType(TYPES.BREAK);
    }

    if (type === TYPES.BREAK && ticks === 0) {
      setType(TYPES.SESSION);
    }
  }, [ticks, sessionTicks, type, setType]);

  useEffect(() => {
    if (!active && ticks !== 0) setTicks(0);

    updateInterval();
    updateType();

    console.count('Render Countdown');
    // console.log(styles);

    return () => {
      removeInterval();
    };
  }, [active, ticks, updateInterval, removeInterval, updateType]);

  return (
    <div id={styles.clockVisuals}>
      <CountdownSVG
        active={active}
        type={type === TYPES.SESSION}
        ticks={ticks}
        sessionTicks={sessionTicks + 1}
        totalTicks={totalTicks}
      />
      <div className={styles.clockCountdownWrap}>
        <div className={styles.clockCountdown}>
          <div id="timer-label">{toTitleCase(type)}</div>
          <div id="time-left">
            {clockify(ticks, sessionTicks, totalTicks - 1)}
          </div>
        </div>
      </div>
      {/* <input
        type="number"
        value={ticks}
        min="0"
        max={totalTicks}
        onChange={(e) => setTicks(e.target.value)}
      /> */}
    </div>
  );
}
