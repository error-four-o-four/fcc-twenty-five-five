import { useContext, useEffect } from 'react';
import reloadIcon from '@iconify/icons-mdi/reload';
import playIcon from '@iconify/icons-mdi/play';
import pauseIcon from '@iconify/icons-mdi/pause';

import { SOUND_SOURCES, SoundContext } from '@context/soundState.jsx';
import { SettingsContext } from '@context/settingsState.jsx';
import { TYPES, ClockContext } from '@context/clockState.jsx';

import NumberComponent from '../inputs/Number.jsx';
import VolumeComponent from '../inputs/Volume.jsx';
import SelectComponent from '../inputs/Select.jsx';
// import CheckboxComponent from '../inputs/Checkbox.jsx';
import ButtonComponent from '../inputs/Button.jsx';

import styles from './Settings.module.css';

export default function Settings() {
  const {
    loaded,
    playing,
    stop: stopSound,
    play: playSound,
    updateSource,
  } = useContext(SoundContext);

  const { durations, updateDuration, resetDurations } =
    useContext(SettingsContext);

  const { stop: stopClock } = useContext(ClockContext);

  const handleReset = () => {
    resetDurations();
    stopClock();
    stopSound();
  };

  const handlePreview = () => {
    if (playing) {
      stopSound();
      return;
    }

    playSound();
  };

  useEffect(() => {
    console.count('Rendered Settings');
  });

  return (
    <>
      <div>
        {Object.values(TYPES).map((type) => (
          <div key={type} className={styles.inputWrap}>
            <NumberComponent
              type={type}
              value={durations[type]}
              dispatch={updateDuration}
            />
          </div>
        ))}
        <div className={styles.inputWrap}>
          <ButtonComponent
            label="Reset values:"
            icon={reloadIcon}
            dispatch={handleReset}
          />
        </div>
        {/*
        <div className={styles.inputWrap}>
          <CheckboxComponent id="countdown" dispatch={() => {}} />
        </div>
        */}
      </div>
      <div>
        <div className={styles.inputWrap}>
          <VolumeComponent id="audio-volume" />
        </div>
        <div className={styles.inputWrap}>
          <SelectComponent
            id="audio-source"
            label="Sound:"
            options={SOUND_SOURCES}
            dispatch={updateSource}
          />
        </div>
        <div className={styles.inputWrap}>
          <ButtonComponent
            label="Preview:"
            icon={!playing ? playIcon : pauseIcon}
            dispatch={handlePreview}
            disabled={!loaded}
          />
        </div>
      </div>
    </>
  );
}
