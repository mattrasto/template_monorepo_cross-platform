// Formats a date in locale format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

import { logError } from '@logging';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export const MONTH_FIRST_LETTERS = MONTHS.map((m) => m.charAt(0));

const _MS_PER_DAY = 24 * 60 * 60 * 1000;

// Return number of days between two Date objects
export function daysDiff(from, to, round = 'down') {
  const days = (to - from) / _MS_PER_DAY;
  if (round === 'down') return Math.floor(days);
  if (round === 'up') return Math.ceil(days);
  return days;
}

// Return current date as Date object
export function getCurrentDatetime() {
  return new Date();
}

// Formats a date to string format: YYYY-[M]M-[D]D
// TODO: Use toISOString()? This would enforce 0s before month and day if single-digit
export function formatDateStr(dt) {
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
}

// Returns a Date object m months in the past from the passed Date object
export function subtractDateMonths(dt, m) {
  const dtCopy = new Date(dt);
  dtCopy.setMonth(dtCopy.getMonth() - m);
  return dtCopy;
}

// Given a date, return YYYY-MM-DD
export const getISODate = (d) => d.toISOString().slice(0, 10);

// Calculate timestamp timeString length in future
// timeString is of format '[num][interval]' where interval is one of ['s', 'm', 'h', 'd']
export const calculateFutureTimestamp = (timeString) => {
  const timeNum = timeString.slice(0, -1);
  const timeInterval = timeString.slice(-1);
  const now = new Date();
  let seconds = 0;
  if (timeInterval === 's') seconds = timeNum;
  else if (timeInterval === 'm') seconds = timeNum * 60;
  else if (timeInterval === 'h') seconds = timeNum * 60 * 60;
  else if (timeInterval === 'd') seconds = timeNum * 60 * 60 * 24;
  else return logError(`Could not convert time string. Invalid time interval: ${timeString}`);
  return new Date(now.getTime() + seconds * 1000);
};
