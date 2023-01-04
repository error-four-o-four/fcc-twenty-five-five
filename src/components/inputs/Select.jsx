import { useRef } from 'react';

import { Icon } from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';

import styles from '../settings/Settings.module.css';

export default function SelectComponent({ id, label, options, dispatch }) {
  const selectElement = useRef(null);

  const updateSelection = (value) => {
    selectElement.current.value = value;
    dispatch(value);
  };

  const handleChange = (e) => {
    updateSelection(e.target.value);
  };

  const prevOption = () => {
    const elt = selectElement.current;
    const n = elt.length;
    const i = (elt.selectedIndex + n - 1) % n;
    updateSelection(elt[i].value);
  };
  const nextOption = () => {
    const elt = selectElement.current;
    const n = elt.length;
    const i = (elt.selectedIndex + 1) % n;
    updateSelection(elt[i].value);
  };

  return (
    <>
      <label htmlFor={id} className={styles.inputGroupLabel}>
        {label}
      </label>
      <div className={styles.inputGroup}>
        <button
          className={styles.btnIconLeft}
          type="button"
          onClick={prevOption}>
          <Icon icon={chevronLeft} />
        </button>
        <select
          id={id}
          className={styles.select}
          ref={selectElement}
          onChange={handleChange}>
          {options.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
        <button
          className={styles.btnIconRight}
          type="button"
          onClick={nextOption}>
          <Icon icon={chevronRight} />
        </button>
      </div>
    </>
  );
}
