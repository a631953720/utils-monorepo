export function jsonParse<T = any>(data: any) {
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}
