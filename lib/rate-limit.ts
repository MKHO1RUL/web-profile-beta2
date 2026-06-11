interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 30 * 1000; // 30 seconds window
const MAX_REQUESTS = 5; // 5 requests max per window

export interface RateLimitResult {
  limited: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Checks if a given IP address is rate-limited.
 * Allows a sliding window of MAX_REQUESTS per WINDOW_MS.
 */
export function isRateLimited(ip: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Filter timestamps to only keep those within the window
  const validTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = validTimestamps[0];
    const resetTime = oldestTimestamp + WINDOW_MS;
    return {
      limited: true,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: Math.max(1, Math.ceil((resetTime - now) / 1000)),
    };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: validTimestamps });

  // Cleanup rateLimitMap occasionally to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      const active = val.timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, { timestamps: active });
      }
    }
  }

  return {
    limited: false,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - validTimestamps.length,
    reset: Math.ceil(WINDOW_MS / 1000),
  };
}
