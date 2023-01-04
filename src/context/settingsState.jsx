// import { createContext, useReducer, useRef, useEffect } from 'react';
import { createContext, useEffect, useState } from 'react';
import { TYPES } from '@context/clockState.jsx';

export const CONSTRAINTS = {
  MIN: 1,
  MAX: 60,
};

const initialSession = 25;
const initialBreak = 5;

export const SettingsContext = createContext({});

export function SettingsProvider({ children }) {
  const [sessionDuration, setSessionDuration] = useState(initialSession);
  const [breakDuration, setBreakDuration] = useState(initialBreak);
  const [totalDuration, setTotalDuration] = useState(
    initialSession + initialBreak
  );

  const durations = {
    [TYPES.SESSION]: sessionDuration,
    [TYPES.BREAK]: breakDuration,
    total: totalDuration,
  };

  const updateDuration = (key, value) => {
    if (key === TYPES.SESSION) {
      setSessionDuration(value);
      setTotalDuration(value + breakDuration);
      return;
    }
    setBreakDuration(value);
    setTotalDuration(sessionDuration + value);
  };

  const resetDurations = () => {
    setSessionDuration(initialSession);
    setBreakDuration(initialBreak);
    setTotalDuration(initialSession + initialBreak);
  };

  useEffect(() => {
    console.count('Updated settings context');
  });

  return (
    <SettingsContext.Provider
      value={{
        durations,
        updateDuration,
        resetDurations,
        // toggleCountdown,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
