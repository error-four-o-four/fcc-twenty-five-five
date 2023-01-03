const { PI } = Math;
const PI_HALF = 0.5 * PI;
const TAU = 2 * PI;

const width = 240;
const height = 240;
const cx = 0.5 * width;
const cy = 0.5 * height;
const viewBox = `0 0 ${width} ${height}`;

const innerFillRadius = 0.375 * width;
const outerFillRadius = 0.495 * width;

const getCoordsFromAngle = (a, r1, r2) => {
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return [cx + cos * r1, cy + sin * r1, cx + cos * r2, cy + sin * r2];
};

const getArcPath = (x1, y1, x2, y2, x3, y3, x4, y4, a1, a2, r1, r2) => {
  if (a1 > a2) return '';

  const a = a2 + PI_HALF - (a1 + PI_HALF);
  const f = a < PI ? 0 : 1;
  // const f = 0;

  return `
  M ${x1} ${y1}
  A ${r1} ${r1} 0 ${f} 1 ${x3} ${y3}
  L ${x4} ${y4}
  A ${r2} ${r2} 0 ${f} 0 ${x2} ${y2} Z `;
};

const getPaths = (ticks, total, session) => {
  const startAngle = -PI_HALF;
  const ratioAngle = (TAU / total) * session - PI_HALF;
  const progressAngle = (TAU * ticks) / total - PI_HALF;
  const endAngle = PI + PI_HALF;

  const r1 = innerFillRadius;
  const r2 = outerFillRadius;

  const startCoords = getCoordsFromAngle(startAngle, r1, r2);
  const ratioCoords = getCoordsFromAngle(ratioAngle, r1, r2);
  const progressCoords = getCoordsFromAngle(progressAngle, r1, r2);

  const sessionArc = getArcPath(
    ...progressCoords,
    ...ratioCoords,
    progressAngle,
    ratioAngle,
    r1,
    r2
  );

  const breakArc =
    progressAngle < ratioAngle
      ? getArcPath(...ratioCoords, ...startCoords, ratioAngle, endAngle, r1, r2)
      : getArcPath(
          ...progressCoords,
          ...startCoords,
          progressAngle,
          endAngle,
          r1,
          r2
        );

  const progressArc = getArcPath(
    ...startCoords,
    ...progressCoords,
    startAngle,
    progressAngle,
    r1,
    r2
  );

  return [sessionArc, breakArc, progressArc];
};

export default function CountdownSVG({ props }) {
  const { label, left, ticks, sessionTicks, totalTicks } = props;

  const [sessionArc, breakArc, progressArc] = getPaths(
    ticks,
    totalTicks,
    sessionTicks
  );
  // const progressArc = getProgressArc(ticks / totalTicks);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <circle cx={cx} cy={cy} r={innerFillRadius} />
      <text id="label" x={cx} y={0.65 * cy} textAnchor="middle">
        {label}
      </text>
      <text id="left" x={cx} y={cy} textAnchor="middle">
        {left}
      </text>
      <path id="session" d={sessionArc} />
      <path id="break" d={breakArc} />
      <path id="progress" d={progressArc} />
    </svg>
  );
}
