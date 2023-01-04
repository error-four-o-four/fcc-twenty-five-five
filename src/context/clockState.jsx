import { createContext, useEffect, useState } from 'react';

const SESSION = 'session';
const BREAK = 'break';

export const TYPES = {
  SESSION,
  BREAK,
};

export const ClockContext = createContext({});

export function ClockProvider({ children }) {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    if (!active) {
      setActive(true);
      setPaused(false);
      return;
    }

    setPaused((prev) => !prev);
  };

  const stop = () => {
    setActive(false);
    setPaused(false);
  };

  useEffect(() => {
    console.count('Updated clock context');
  });

  return (
    <ClockContext.Provider
      value={{
        active,
        paused,
        toggle,
        stop,
      }}>
      {children}
    </ClockContext.Provider>
  );
}
