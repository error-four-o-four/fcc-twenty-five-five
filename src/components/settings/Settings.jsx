import { RESET_VALUES } from '@js/settingsReducer.js';
import { TYPES, ACTIONS } from '@js/clockReducer.js';
// import { TYPES, useClockContextUpdater } from '../clock/Context.jsx';

import InputNumber from './InputNumber.jsx';

export default function Settings({ settings, updateSettings, updateClock }) {
  // const { setType, setActive, setPaused } = useClockContextUpdater();

  const resetSettings = () => {
    updateSettings({ type: RESET_VALUES });
    updateClock({ type: ACTIONS.STOP });
    // setType(TYPES.SESSION);
    // setActive(false);
    // setPaused(false);
  };

  return (
    <>
      {Object.values(TYPES).map((type) => (
        <InputNumber
          key={type}
          type={type}
          settings={settings}
          updateSettings={updateSettings}
        />
      ))}
      <button id="reset" type="button" onClick={resetSettings}>
        Reset values
      </button>
    </>
  );
}
