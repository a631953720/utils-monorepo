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