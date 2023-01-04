import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SoundContext } from '@context/soundState.jsx';
import { SettingsContext } from '@context/settingsState.jsx';
import { TYPES, ClockContext } from '@context/clockState.jsx';

import { toTitleCase, toMmSsCase } from '@js/utils.js';

import TimerSvg from './TimerSvg.jsx';
import styles from './Timer.module.css';

export default function Countdown() {
  const { play: playSound } = useContext(SoundContext);
  const { active, paused } = useContext(ClockContext);
  const { durations } = useContext(SettingsContext);

  const sessionTicks = durations[TYPES.SESSION] * 60;
  const totalTicks = durations.total * 60 + 2;

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
      interval.current = setInterval(updateTicks, 1000);
    }
  }, [active, paused, updateTicks]);

  const checkType = useCallback(() => {
    if (type === TYPES.SESSION && ticks > sessionTicks) {
      setType(TYPES.BREAK);
      playSound();
    }

    if (type === TYPES.BREAK && ticks === 0) {
      setType(TYPES.SESSION);
      playSound();
    }
  }, [ticks, sessionTicks, type, setType]);

  useEffect(() => {
    if (!active && ticks !== 0) setTicks(0);

    checkInterval();
    checkType();

    // console.count('Render Countdown');
    // console.log(settings);

    return () => {
      if (interval.current && (!active || paused)) {
        clearInterval(interval.current);
      }
    };
  }, [active, paused, ticks, checkInterval, checkType]);

  const label = toTitleCase(type);
  const left = toMmSsCase(ticks, sessionTicks, totalTicks - 1);

  const svgProps = {
    label,
    left,
    ticks,
    sessionTicks: sessionTicks + 1,
    totalTicks,
  };

  return (
    <div
      id={styles.timerWrap}
      className={active ? `${styles.active} ${type}` : ''}>
      <TimerSvg props={svgProps} />
      <div className={styles.hidden}>
        <div id="timer-label">{label}</div>
        <div id="time-left">{left}</div>
      </div>
    </div>
  );
}
