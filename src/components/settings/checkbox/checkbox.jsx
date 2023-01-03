import { toTitleCase } from '@js/utils.js';

export default function CheckboxComponent({ id, state, dispatch }) {
  return (
    <>
      <span className="input-single-label">{toTitleCase(id)}:</span>
      <input id={id} type="checkbox" />
    </>
  );
}
