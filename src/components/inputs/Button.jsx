import { Icon } from '@iconify/react';

import styles from '../settings/Settings.module.css';

export default function ButtonComponent({ label, icon, dispatch, disabled }) {
  return (
    <>
      <span className={styles.inputSingleLabel}>{label}</span>
      <button
        id="reset"
        className={styles.btnIcon}
        type="button"
        onClick={dispatch}
        disabled={disabled}>
        <Icon icon={icon} />
      </button>
    </>
  );
}
