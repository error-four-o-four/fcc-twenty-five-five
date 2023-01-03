import Timer from './Timer.jsx';
import Buttons from './Buttons.jsx';

export default function Clock({
  clockState,
  dispatchClockUpdate,
  settingsState,
}) {
  return (
    <div id="clock-wrap">
      <Timer clockState={clockState} settingsState={settingsState} />
      <Buttons
        clockState={clockState}
        dispatchClockUpdate={dispatchClockUpdate}
      />
    </div>
  );
}
