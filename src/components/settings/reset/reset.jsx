import { RESET_VALUES } from '@js/settingsReducer.js';
import { ACTIONS } from '@js/clockReducer.js';

import { Icon } from '@iconify/react';
import reloadIcon from '@iconify/icons-mdi/reload';

export default function ResetComponent({
  dispatchClockUpdate,
  dispatchSettingsUpdate,
}) {
  const resetSettings = () => {
    dispatchSettingsUpdate({ type: RESET_VALUES });
    dispatchClockUpdate({ type: ACTIONS.STOP });
  };

  return (
    <>
      <span className="input-single-label">Reset values:</span>
      <button
        id="reset"
        className="btn-icon"
        type="button"
        onClick={resetSettings}>
        <Icon icon={reloadIcon} />
      </button>
    </>
  );
}
