import { useEffect, useReducer } from 'react';
import { settingsReducer, initialSettingsState } from '@js/settingsReducer.js';
import { clockReducer, initialClockState } from '@js/clockReducer.js';

// import { ClockProvider } from './clock/Context.jsx';
import ClockCountdown from './clock/Countdown.jsx';
import ClockButtons from './clock/Buttons.jsx';

import styles from './App.module.css';
import Settings from './settings/Settings.jsx';

function App() {
  const [settings, updateSettings] = useReducer(
    settingsReducer,
    initialSettingsState
  );

  const [clock, updateClock] = useReducer(clockReducer, initialClockState);

  useEffect(() => {
    console.count('Render App');
    console.log(clock);
    // console.log(settings);
  });

  return (
    <div className={styles.App}>
      <div className={styles.clock}>
        <ClockCountdown
          clock={clock}
          // updateClock={updateClock}
          settings={settings}
        />
        <ClockButtons clock={clock} updateClock={updateClock} />

        {/* <ClockProvider>
          <ClockCountdown settings={settings} />
          <ClockButtons />
        </ClockProvider> */}
      </div>
      <div className={styles.settings}>
        <Settings
          settings={settings}
          updateSettings={updateSettings}
          updateClock={updateClock}
        />

        {/* <ClockProvider>
          <Settings settings={settings} updateSettings={updateSettings} />
        </ClockProvider> */}
      </div>
    </div>
  );
}

export default App;
