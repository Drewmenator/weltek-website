/**
 * Best-effort in-process rate limiter.
 *
 * Honest about what this is: serverless instances do not share memory, so a
 * determined attacker spraying across cold starts can exceed the nominal
 * limit. It reliably stops the common case, which is a single client hammering
 * one warm instance, and it costs nothing to run.
 *
 * If abuse ever becomes real rather than theoretical, move the counter to
 * Vercel KV or Upstash. The call signature here will not need to change.
 */

type Hit = { count: number; resetAt: number };

const hits = new Map<string, Hit>();

/** Bound the map so a spray of unique keys cannot grow it without limit. */
const MAX_KEYS = 5_000;

function sweep(now: number) {
  if (hits.size < MAX_KEYS) return;
  for (const [key, hit] of hits) {
    if (hit.resetAt <= now) hits.delete(key);
  }
  // Still oversized after clearing expired entries: drop the oldest.
  if (hits.size >= MAX_KEYS) {
    const overflow = hits.size - MAX_KEYS + 1;
    let i = 0;
    for (const key of hits.keys()) {
      hits.delete(key);
      if (++i >= overflow) break;
    }
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. Suitable for a Retry-After header. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const hit = hits.get(key);
  if (!hit || hit.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  hit.count += 1;
  const retryAfter = Math.max(1, Math.ceil((hit.resetAt - now) / 1000));
  if (hit.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - hit.count, retryAfter };
}

/**
 * Client address, taken from the leftmost x-forwarded-for entry.
 *
 * This is only safe because Vercel's edge overwrites the header with the real
 * client address before the function sees it, which was confirmed against the
 * deployment: requests carrying a spoofed x-forwarded-for still land in the
 * caller's own bucket rather than a bucket of their choosing.
 *
 * That assumption is load-bearing. On a host that appends to the header rather
 * than replacing it, the leftmost entry is attacker-controlled and the limit
 * becomes trivially bypassable. If this ever moves off Vercel, read the client
 * address from the platform's trusted source instead.
 *
 * Falls back to a shared bucket rather than failing open, so an unidentifiable
 * caller is still limited.
 */
export function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}
