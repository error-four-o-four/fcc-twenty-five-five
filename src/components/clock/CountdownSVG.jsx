import styles from './CountdownSVG.module.css';

const width = 10;
const height = 10;
const cx = 0.5 * width;
const cy = 0.5 * height;
const viewBox = `0 0 ${width} ${height}`;

const strokeWidth = 0.8;
const radius = cx - strokeWidth;

const PI_HALF = 0.5 * Math.PI;
const TAU = 2 * Math.PI;

const getProgressLine = (t) => {
  const o = 0.625 * strokeWidth;
  const a = t * TAU - PI_HALF;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const x1 = cx + cos * (radius - o);
  const y1 = cy + sin * (radius - o);
  const x2 = cx + cos * (radius + o);
  const y2 = cy + sin * (radius + o);

  return [x1, y1, x2, y2];
};

const getArcPath = (type, total, session) => {
  const ratioAngle = (TAU / total) * session - PI_HALF;

  const rx = cx + Math.cos(ratioAngle) * radius;
  const ry = cy + Math.sin(ratioAngle) * radius;

  const flag = ratioAngle < PI_HALF ? 0 : 1;

  return type
    ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 ${flag} 1 ${rx} ${ry}`
    : `M ${rx} ${ry} A ${radius} ${radius} 0 ${1 - flag} 1 ${cx} ${
        cy - radius
      }`;
};

export default function CountdownSVG({
  active,
  type,
  ticks,
  sessionTicks,
  totalTicks,
}) {
  const arcPath = getArcPath(type, totalTicks, sessionTicks);
  const [x1, y1, x2, y2] = getProgressLine(ticks / totalTicks);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <g id={styles.main} className={active ? styles.active : ''}>
        <circle
          id={styles.mainCircle}
          cx={cx}
          cy={cy}
          r={radius}
          style={{ strokeWidth, fill: 'none' }}
        />
        <path d={arcPath} style={{ strokeWidth, fill: 'none' }} />
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={{ strokeWidth: 0.125 * strokeWidth }}
        />
      </g>
    </svg>
  );
}
