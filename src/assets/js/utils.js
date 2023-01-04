export const toTitleCase = (string) =>
  string[0].toUpperCase() + string.substring(1);

export const toMmSsCase = (ticks, session, total) => {
  const remaining = ticks <= session ? session - ticks : total - ticks;
  const minutes = `${Math.floor(remaining / 60)}`.padStart(2, '0');
  const seconds = `${remaining % 60}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};
