import { useEffect, useState } from 'react';

import { toTitleCase } from '@js/utils.js';
import { CONSTRAINTS } from '@context/settingsState.jsx';

import styles from '../settings/Settings.module.css';

// => as props from Settings.jsx
const { MIN, MAX } = CONSTRAINTS;

function InputNumber({ type, value, dispatch }) {
  const [duration, setDuration] = useState(value);

  const handleChange = (newValue) => {
    const newDuration = Math.max(MIN, Math.min(MAX, newValue));

    if (newDuration === duration) return;

    setDuration(newDuration);
    dispatch(type, newDuration);
  };

  useEffect(() => {
    setDuration(value);
  }, [value]);

  return (
    <>
      <label
        id={`${type}-label`}
        className={styles.inputGroupLabel}
        htmlFor={`${type}-length`}>
        {toTitleCase(type)}:
      </label>
      <div className={styles.inputGroup}>
        <button
          id={`${type}-decrement`}
          className={styles.btnLeft}
          type="button"
          onClick={() => handleChange(duration - 1)}>
          -
        </button>
        <input
          id={`${type}-length`}
          className={styles.number}
          type="number"
          value={duration}
          min={MIN}
          max={MAX}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          id={`${type}-increment`}
          className={styles.btnRight}
          type="button"
          onClick={() => handleChange(duration + 1)}>
          +
        </button>
      </div>
    </>
  );
}

export default InputNumber;
