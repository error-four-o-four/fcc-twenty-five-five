import { useEffect } from 'react';

import { Icon } from '@iconify/react';
import { ACTIONS } from '@js/clockReducer.js';

export default function Buttons({ clockState, dispatchClockUpdate }) {
  const { active, paused } = clockState;

  const toggle = () => {
    dispatchClockUpdate({ type: ACTIONS.TOGGLE });
  };

  const stop = () => {
    dispatchClockUpdate({ type: ACTIONS.STOP });
  };

  useEffect(() => {
    console.count('Render Buttons');
  });

  return (
    <div id="clock-buttons-wrap">
      <div id="clock-buttons">
        {/* <a id="start_stop" href="#play" role="button" onClick={toggle}>
          {active && !paused ? (
            <Icon icon="mdi:pause-circle-outline" />
          ) : (
            <Icon icon="mdi:play-circle-outline" />
          )}
        </a>
        <a
          className={!active ? 'disabled' : ''}
          href="#stop"
          role="button"
          onClick={stop}>
          <Icon icon="mdi:stop-circle-outline" />
        </a> */}
        <button id="start_stop" type="button" onClick={toggle}>
          {active && !paused ? (
            <Icon icon="mdi:pause" />
          ) : (
            <Icon icon="mdi:play" />
          )}
        </button>
        <button type="button" onClick={stop} disabled={!active}>
          <Icon icon="mdi:stop" />
        </button>
      </div>
    </div>
  );
}
