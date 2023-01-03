import { TYPES } from './clockReducer.js';

export const RESET_VALUES = 'reset-values';

export const SOURCE_VALUES = [
  {name: 'sound1', value: 'a'},
  {name: 'sound2', value: 'b'},
  {name: 'sound3', value: 'c'},
  {name: 'sound4', value: 'd'},
  {name: 'sound5', value: 'e'},
  {name: 'sound6', value: 'f'},
]

const initialSession = 25;
const initialBreak = 5;

export const initialSettingsState = {
  [TYPES.SESSION]: initialSession,
  [TYPES.BREAK]: initialBreak,
  total: initialSession + initialBreak,
  iterations: Infinity,
};

const actionHandler = {
  [TYPES.SESSION]: (prev, payload) => {
    const { duration } = payload;
    return {
      ...prev,
      [TYPES.SESSION]: duration,
      total: duration + prev[TYPES.BREAK],
    };
  },
  [TYPES.BREAK]: (prev, payload) => {
    const { duration } = payload;
    return {
      ...prev,
      [TYPES.BREAK]: duration,
      total: prev[TYPES.SESSION] + duration,
    };
  },
  [RESET_VALUES]: () => initialSettingsState,
};

export function settingsReducer(state, action) {
  return actionHandler[action.type](state, action.payload);
}
