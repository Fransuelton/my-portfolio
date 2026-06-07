const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_REQUESTS = 5;

type Record = { count: number; resetAt: number };
const store = new Map<string, Record>();

// Remove expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of store.entries()) {
    if (now > rec.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRate(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const rec = store.get(ip);

  if (!rec || now > rec.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (rec.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((rec.resetAt - now) / 1000) };
  }

  rec.count++;
  return { ok: true };
}
