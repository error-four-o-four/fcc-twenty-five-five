import { useRef, useContext } from 'react';

import { Icon } from '@iconify/react';
import volumeMute from '@iconify/icons-mdi/volume-mute';
import volumeMedium from '@iconify/icons-mdi/volume-medium';
import volumeHigh from '@iconify/icons-mdi/volume-high';

import { SoundContext } from '@context/soundState.jsx';

import styles from '../settings/Settings.module.css';

export default function VolumeComponent({ id }) {
  const { volume, updateVolume } = useContext(SoundContext);

  const previous = useRef(volume);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    previous.current = value;
    updateVolume(value);
  };

  const handleToggle = () => {
    const newValue = volume > 0 ? 0 : previous.current;
    updateVolume(newValue);
  };

  return (
    <>
      <label htmlFor={id} className={styles.inputGroupLabel}>
        Volume:
      </label>
      <div className={styles.inputGroup}>
        <button
          id="audio-mute"
          className={styles.btnIconLeft}
          type="button"
          onClick={handleToggle}>
          {volume === 0 ? (
            <Icon icon={volumeMute} />
          ) : volume < 0.5 ? (
            <Icon icon={volumeMedium} />
          ) : (
            <Icon icon={volumeHigh} />
          )}
        </button>
        <input
          id={id}
          name={id}
          className={styles.range}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
