import { useEffect } from 'react';

import { SettingsProvider } from '@context/settingsState.jsx';
import { SoundProvider } from '@context/soundState.jsx';
import { ClockProvider } from '@context/clockState.jsx';

import Settings from './settings/Settings.jsx';
import Timer from './clock/Timer.jsx';
import Buttons from './clock/Buttons.jsx';

function App() {
  useEffect(() => {
    console.count('Render App');
  });

  return (
    <div className="App">
      <SoundProvider>
        <SettingsProvider>
          <ClockProvider>
            <div id="clock-wrap">
              <Timer />
              <Buttons />
            </div>
            <div id="settings-wrap">
              <Settings />
            </div>
          </ClockProvider>
        </SettingsProvider>
      </SoundProvider>
      <div id="disclaimer-wrap">
        Sounds offered by:{' '}
        <a href="https://orangefreesounds.com/">
          <i>Orange Free Sounds</i>
        </a>{' '}
        and{' '}
        <a href="https://quicksounds.com/">
          <i>Quick Sounds</i>
        </a>
      </div>
    </div>
  );
}

export default App;
