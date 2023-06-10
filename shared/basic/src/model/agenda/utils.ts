export function DateToMMDD(date: number) {
  const newDate = new Date(date);
  if (newDate.toString() === 'Invalid Date') return 'Invalid Date';
  const m = (newDate.getMonth() + 1).toString();
  const d = newDate.getDate().toString();
  const mm = m.length < 2 ? `0${m}` : m;
  const dd = d.length < 2 ? `0${d}` : d;
  return `${mm}-${dd}`;
}

export function DateFormat(date: string) {
  const newDate = new Date(date);
  if (newDate.toString() === 'Invalid Date') return 'Invalid Date';
  const yyyymmdd = newDate.toISOString().split('T')[0].replace(/-/gm, '/');
  const h = newDate.getHours().toString();
  const m = newDate.getMinutes().toString();
  const s = newDate.getSeconds().toString();
  const hh = h.length < 2 ? `0${h}` : h;
  const mm = m.length < 2 ? `0${m}` : m;
  const ss = s.length < 2 ? `0${s}` : s;
  return `${yyyymmdd} ${hh}:${mm}:${ss}`;
}

export function randomNumber(range = 1, fixed = 0) {
  const v = Math.random() * range;
  return Number(v.toFixed(fixed));
}

export function checkMins(mins: string): boolean {
  const m = Number(mins);
  if (Number.isNaN(m)) return false;
  if (m >= 0 && m < 60) return true;
  return false;
}

export function checkHours(hours: string) {
  const m = Number(hours);
  if (Number.isNaN(m)) return false;
  if (m >= 0 && m < 24) return true;
  return false;
}

export function checkDayOfMonth(days: string) {
  const m = Number(days);
  if (Number.isNaN(m)) return false;
  if (m > 0 && m < 32) return true;
  return false;
}

export function checkMonth(months: string) {
  const m = Number(months);
  if (Number.isNaN(m)) return false;
  if (m > 0 && m < 32) return true;
  return false;
}

export function checkDayOfWeek(days: string[]) {
  let isAvailable = true;

  for (let i = 0; i < days.length; i += 1) {
    const day = days[i];
    const m = Number(day);
    if (!Number.isNaN(m) && m >= 0 && m < 7) isAvailable = true;
    else {
      isAvailable = false;
      break;
    }
  }
  return isAvailable;
}

export function checkIsFunction(callback: any) {
  if (typeof callback === 'function') return true;
  return false;
}

export type TimeType = { h: number; m: number; s: number };

export function splitStringAndConvertToNumber(
  string = '',
  splitStr = ':'
): TimeType {
  const [h = 0, m = 0, s = 0] = string
    .split(splitStr)
    .map((str) => Number(str));
  return { h, m, s };
}

export function pad(d: number) {
  return d < 10 ? `0${d.toString()}` : d.toString();
}
