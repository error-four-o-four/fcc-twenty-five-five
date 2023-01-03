import { Icon } from '@iconify/react';
import volumeHigh from '@iconify/icons-mdi/volume-high';

export default function VolumeComponent({ id, state, dispatch }) {

  return (
    <>
      <label htmlFor={id} className="input-group-label">
        Volume:
      </label>
      <div className="input-group">
        <button id="audio-mute" className="btn-left btn-icon" type="button">
          <Icon icon={volumeHigh} />
        </button>
        <input id={id} name={id} type="range" />
      </div>
    </>
  );
}
