import { useCallback, useEffect, useRef, useState } from 'react';

import { TYPES } from '@js/clockReducer.js';
import { toTitleCase } from '@js/utils.js';

import TimerSvg from './TimerSvg.jsx';

const toMmSsCase = (ticks, session, total) => {
  const remaining = ticks <= session ? session - ticks : total - ticks;
  const minutes = `${Math.floor(remaining / 60)}`.padStart(2, '0');
  const seconds = `${remaining % 60}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export default function Countdown({ clockState, settingsState }) {
  const { active, paused } = clockState;

  const sessionTicks = settingsState[TYPES.SESSION] * 60;
  const totalTicks = settingsState.total * 60 + 2;

  const [ticks, setTicks] = useState(0);
  const [type, setType] = useState(TYPES.SESSION);

  const updateTicks = useCallback(() => {
    setTicks((prev) => (prev + 1) % totalTicks);
  }, [totalTicks]);

  const interval = useRef(undefined);

  const checkInterval = useCallback(() => {
    if (interval.current && (!active || paused)) {
      interval.current = clearInterval(interval.current);
    }

    if (!interval.current && active && !paused) {
      interval.current = setInterval(updateTicks, 250);
    }
  }, [active, paused, updateTicks]);

  const checkType = useCallback(() => {
    if (type === TYPES.SESSION && ticks > sessionTicks) {
      setType(TYPES.BREAK);
    }

    if (type === TYPES.BREAK && ticks === 0) {
      setType(TYPES.SESSION);
    }
  }, [ticks, sessionTicks, type, setType]);

  useEffect(() => {
    if (!active && ticks !== 0) setTicks(0);

    checkInterval();
    checkType();

    console.count('Render Countdown');
    // console.log(styles);

    return () => {
      if (interval.current && (!active || paused)) {
        clearInterval(interval.current);
      }
    };
  }, [active, paused, ticks, checkInterval, checkType]);

  const label = toTitleCase(type);
  const left = toMmSsCase(ticks, sessionTicks, totalTicks - 1);
  const hide = {
    height: '0px',
    overflow: 'hidden',
  };

  const svgProps = {
    label,
    left,
    ticks,
    sessionTicks: sessionTicks + 1,
    totalTicks,
  };

  return (
    <div id="clock-visuals-wrap" className={active ? `active ${type}` : ''}>
      <TimerSvg props={svgProps} />
      <div style={hide}>
        <div id="timer-label">{label}</div>
        <div id="time-left">{left}</div>
      </div>
    </div>
  );
}
