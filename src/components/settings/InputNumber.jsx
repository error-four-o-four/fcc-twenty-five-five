import { useEffect, useState } from 'react';

function InputNumber({ type, settings, updateSettings }) {
  const [duration, setDuration] = useState(settings[type]);

  const min = 1;
  const max = 60;

  const updateDuration = (value) => {
    const newDuration = Math.max(min, Math.min(max, value));

    if (newDuration === duration) return;

    setDuration(newDuration);
  };

  useEffect(() => {
    updateSettings({ type, payload: { duration } });
  }, [type, duration, updateSettings]);

  useEffect(() => {
    setDuration(settings[type]);
  }, [type, settings]);

  return (
    <div id={`${type}-label`}>
      {type}
      <button
        id={`${type}-decrement`}
        type="button"
        onClick={() => updateDuration(duration - 1)}>
        -
      </button>
      <input
        id={`${type}-length`}
        type="number"
        value={duration}
        min={min}
        max={max}
        onChange={(e) => updateDuration(e.target.value)}
      />
      <button
        id={`${type}-increment`}
        type="button"
        onClick={() => updateDuration(duration + 1)}>
        +
      </button>
    </div>
  );
}

export default InputNumber;
