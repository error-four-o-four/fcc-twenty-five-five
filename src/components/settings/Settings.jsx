import { RESET_VALUES, SOURCE_VALUES } from '@js/settingsReducer.js';
import { TYPES, ACTIONS } from '@js/clockReducer.js';

import NumberComponent from './number/number.jsx';
import ResetComponent from './reset/reset.jsx';
import VolumeComponent from './volume/volume.jsx';
import SelectComponent from './select/select.jsx';
import CheckboxComponent from './checkbox/checkbox.jsx';

export default function Settings({
  settingsState,
  dispatchSettingsUpdate,
  dispatchClockUpdate,
}) {
  return (
    <div id="settings-wrap">
      <div>
        {Object.values(TYPES).map((type) => (
          <div key={type} className="settings-part">
            <NumberComponent
              type={type}
              state={settingsState}
              dispatch={dispatchSettingsUpdate}
            />
          </div>
        ))}
        <div className="settings-part">
          <ResetComponent
            dispatchClockUpdate={dispatchClockUpdate}
            dispatchSettingsUpdate={dispatchSettingsUpdate}
          />
        </div>
        <div className="settings-part">
          <CheckboxComponent
            id="countdown"
            state={settingsState}
            dispatch={dispatchSettingsUpdate}
          />
        </div>
      </div>
      <div>
        <div className="settings-part">
          <VolumeComponent
            id="audio-volume"
            state={settingsState}
            dispatch={dispatchSettingsUpdate}
          />
        </div>
        <div className="settings-part">
          <SelectComponent
            id="audio-source"
            options={SOURCE_VALUES}
            dispatch={dispatchSettingsUpdate}>
          </SelectComponent>
        </div>
      </div>
    </div>
  );
}
