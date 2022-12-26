const SESSION = 'session';
const BREAK = 'break';

export const TYPES = {
  SESSION,
  BREAK,
};

const TOGGLE = 'toggle';
const STOP = 'stop';

export const ACTIONS = {
  TOGGLE,
  STOP,
};

export const initialClockState = {
  active: false,
  paused: false,
};

const actionHandler = {
  [TOGGLE]: (prev) => {
    return !prev.active
      ? {
          ...prev,
          active: true,
          paused: false,
        }
      : {
          ...prev,
          paused: !prev.paused,
        };
  },
  [STOP]: () => initialClockState,
};

export function clockReducer(state, action) {
  return actionHandler[action.type](state, action.payload);
}
