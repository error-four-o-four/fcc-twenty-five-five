import { useEffect, useState } from 'react';

import { toTitleCase } from '@js/utils.js';

function InputNumber({ type, state, dispatch }) {
  const [duration, setDuration] = useState(state[type]);

  const min = 1;
  const max = 60;

  const updateDuration = (value) => {
    const newDuration = Math.max(min, Math.min(max, value));

    if (newDuration === duration) return;

    setDuration(newDuration);
  };

  useEffect(() => {
    dispatch({ type, payload: { duration } });
  }, [type, duration, dispatch]);

  useEffect(() => {
    setDuration(state[type]);
  }, [type, state]);

  return (
    <>
      <label
        id={`${type}-label`}
        className="input-group-label"
        htmlFor={`${type}-length`}>
        {toTitleCase(type)}:
      </label>
      <div className="input-group">
        <button
          id={`${type}-decrement`}
          className="btn-left"
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
          className="btn-right"
          type="button"
          onClick={() => updateDuration(duration + 1)}>
          +
        </button>
      </div>
    </>
  );
}

export default InputNumber;
