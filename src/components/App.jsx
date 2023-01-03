import { useEffect, useReducer } from 'react';
import { settingsReducer, initialSettingsState } from '@js/settingsReducer.js';
import { clockReducer, initialClockState } from '@js/clockReducer.js';

import Settings from './settings/Settings.jsx';
import Clock from './clock/Clock.jsx';

function App() {
  const [settingsState, dispatchSettingsUpdate] = useReducer(
    settingsReducer,
    initialSettingsState
  );

  const [clockState, dispatchClockUpdate] = useReducer(
    clockReducer,
    initialClockState
  );

  useEffect(() => {
    console.count('Render App');
    // console.log(clockState);
    // console.log(settings);
  });

  return (
    <div className="App">
      <Clock
        clockState={clockState}
        dispatchClockUpdate={dispatchClockUpdate}
        settingsState={settingsState}
      />
      <Settings
        settingsState={settingsState}
        dispatchSettingsUpdate={dispatchSettingsUpdate}
        dispatchClockUpdate={dispatchClockUpdate}
      />
    </div>
  );
}

export default App;
