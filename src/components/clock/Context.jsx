/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

const SESSION = 'session';
const BREAK = 'break';

export const TYPES = {
  SESSION,
  BREAK,
};

const ClockContext = createContext({});
const ClockContextUpdater = createContext({});

export function useClockContext() {
  return useContext(ClockContext);
}

export function useClockContextUpdater() {
  return useContext(ClockContextUpdater);
}

export function ClockProvider(props) {
  const { children } = props;

  const [type, setType] = useState(SESSION);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <ClockContext.Provider value={{ type, active, paused }}>
      <ClockContextUpdater.Provider value={{ setType, setActive, setPaused }}>
        {children}
      </ClockContextUpdater.Provider>
    </ClockContext.Provider>
  );
}
