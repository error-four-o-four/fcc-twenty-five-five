import { toTitleCase } from '@js/utils.js';

import styles from '../settings/Settings.module.css';

export default function CheckboxComponent({ id, dispatch }) {
  return (
    <>
      <span className={styles.inputSingleLabel}>{toTitleCase(id)}:</span>
      <input
        id={id}
        className={styles.checkbox}
        type="checkbox"
        onChange={dispatch}
      />
    </>
  );
}
