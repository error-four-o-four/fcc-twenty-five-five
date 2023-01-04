import { useContext, useEffect } from 'react';

import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-mdi/play';
import pauseIcon from '@iconify/icons-mdi/pause';

import { SoundContext } from '@context/soundState.jsx';
import { ClockContext } from '@context/clockState.jsx';

import styles from './Buttons.module.css';

export default function Buttons() {
  const { stop: stopSound } = useContext(SoundContext);
  const { active, paused, toggle, stop: stopClock } = useContext(ClockContext);

  const stop = () => {
    stopSound();
    stopClock();
  };

  useEffect(() => {
    console.count('Render Buttons');
  });

  return (
    <div id={styles.buttonsWrap}>
      <div id={styles.buttons}>
        <button id="start_stop" type="button" onClick={toggle}>
          {active && !paused ? (
            <Icon icon={pauseIcon} />
          ) : (
            <Icon icon={playIcon} />
          )}
        </button>
        <button type="button" onClick={stop} disabled={!active}>
          <Icon icon="mdi:stop" />
        </button>
      </div>
    </div>
  );
}
