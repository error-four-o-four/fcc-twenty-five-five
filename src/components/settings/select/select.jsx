import { useRef } from 'react';

export default function SelectComponent({ id, options, dispatch }) {
  const selectElement = useRef(null);

  const prevOption = () => {
		const elt = selectElement.current;
		const n = elt.length;
		const i = (elt.selectedIndex + n - 1) % n;
		elt.value = elt[i].value;
	};
  const nextOption = () => {
		const elt = selectElement.current;
		const n = elt.length;
		const i = (elt.selectedIndex + 1) % n;
		elt.value = elt[i].value;
		// elt.dispatchEvent('change');
	};

  return (
    <>
      <label htmlFor={id} className="input-group-label">
        Source:
      </label>
      <div className="input-group">
        <button className="btn-left" type="button" onClick={prevOption}>
          &lt;
        </button>
        <select id={id} ref={selectElement} onChange={(e) => console.log('dispatched', e.target)} >
          {options.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
        <button className="btn-right" type="button" onClick={nextOption}>
          &gt;
        </button>
      </div>
    </>
  );
}
