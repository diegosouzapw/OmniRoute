import type Redis from "ioredis";

// Redis is optional. When REDIS_URL is unset, use a process-local fallback
// instead of probing localhost on every API request.
const REDIS_URL = process.env.REDIS_URL?.trim() || "";
if (process.env.NODE_ENV === "production" && !REDIS_URL) {
  console.warn("[REDIS] REDIS_URL is not set in production. Using in-memory rate limiting.");
}

// #6559 — `ioredis` must stay a LAZY dependency here. This module is bundled
// (via esbuild --packages=external) into the MCP server output, and esbuild
// hoists any static top-level `import ... from "ioredis"` into a real
// top-level ESM import in the compiled bundle — even though this module is
// only ever reached through a dynamic `await import(...)` several call-sites
// deep (apiKeys.ts -> mcpCallerIdentity.ts -> compressionTools.ts -> server.ts).
// A static import forces Node to resolve `ioredis` at module-link time,
// before any `--mcp` startup code runs, and `ioredis` is not guaranteed to
// ship in the MCP-only bundle's node_modules. Mirrors the established
// soft-dependency pattern in src/lib/quota/redisQuotaStore.ts.
let redisClientPromise: Promise<Redis> | null = null;

export function isRedisConfigured(): boolean {
  return REDIS_URL.length > 0;
}

/**
 * State-change-gated log throttle for the Redis error handler.
 *
 * #4878: when REDIS_URL points at a non-running server, ioredis retries on a
 * backoff and fires the "error" event on every attempt, flooding the logs with
 * identical "[REDIS] Error:" lines. We only want to log when the error STATE
 * actually changes (first occurrence, or a different error message), not on
 * every retry of the same failure.
 */
export function createRedisLogThrottle() {
  let lastLogged: string | null = null;
  return {
    shouldLog(message: string): boolean {
      if (message === lastLogged) return false;
      lastLogged = message;
      return true;
    },
    reset(): void {
      lastLogged = null;
    },
  };
}

const redisLogThrottle = createRedisLogThrottle();

// Exposed for unit tests — returns a fresh, isolated throttle instance.
export function _createRedisLogThrottleForTests() {
  return createRedisLogThrottle();
}

/**
 * Return the singleton Redis client, creating it (lazily importing `ioredis`)
 * on first call. Throws SYNCHRONOUSLY (not a rejected Promise) when Redis is
 * not configured — callers rely on this to fail fast without an `await`.
 * Otherwise returns a Promise that resolves once the client is constructed.
 */
export function getRedisClient(): Promise<Redis> {
  if (!isRedisConfigured()) {
    throw new Error("Redis is not configured");
  }

  if (!redisClientPromise) {
    redisClientPromise = (async () => {
      // Lazy dynamic import — see the #6559 note above the singleton declaration.
      const mod = await import("ioredis");
      const RedisCtor = (mod.default ?? mod) as typeof Redis;
      const client = new RedisCtor(REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        retryStrategy(times) {
          return Math.min(times * 50, 2000); // Exponential backoff
        },
      });
      client.on("error", (err) => {
        // Throttle: log once per error-state change instead of on every retry (#4878).
        if (redisLogThrottle.shouldLog(err.message)) {
          console.error("[REDIS] Error:", err.message);
        }
      });
      // A successful connection resets the throttle so the next failure logs again.
      client.on("ready", () => redisLogThrottle.reset());
      return client;
    })();
  }
  return redisClientPromise;
}

export interface RateLimitRule {
  limit: number;
  window: number; // in seconds
}

export interface RateLimitResult {
  allowed: boolean;
  failedWindow?: number;
}

/**
 * Atomic Lua script for multi-rule rate limiting using fixed window.
 * Returns {1, 0} if allowed, or {0, failedWindow} if rejected.
 */
const RATE_LIMIT_SCRIPT = `
local key_prefix = KEYS[1]
local current_time = tonumber(ARGV[1])

local rules = {}
for i = 2, #ARGV, 2 do
  table.insert(rules, {
    limit = tonumber(ARGV[i]),
    window = tonumber(ARGV[i+1])
  })
end

-- First pass: check if any limit is exceeded
for i, rule in ipairs(rules) do
  local current_window = math.floor(current_time / rule.window)
  local window_key = key_prefix .. ":" .. rule.window .. ":" .. current_window

  local count = tonumber(redis.call("GET", window_key) or "0")
  if count >= rule.limit then
    return { 0, rule.window } -- Reject, return which window failed
  end
end

-- Second pass: increment all rules
for i, rule in ipairs(rules) do
  local current_window = math.floor(current_time / rule.window)
  local window_key = key_prefix .. ":" .. rule.window .. ":" .. current_window

  local count = redis.call("INCR", window_key)
  if count == 1 then
    -- TTL is twice the window size to ensure it covers the current window safely
    redis.call("EXPIRE", window_key, rule.window * 2)
  end
end

return { 1, 0 } -- Accepted
`;

const TEST_MEMORY_STORE = new Map<string, number>();
const FALLBACK_MEMORY_STORE = new Map<string, number>();
let explicitTestMode = false;

// Minimum store size before we bother sweeping (avoids O(n) cost on tiny stores)
const EVICTION_THRESHOLD = 50;

/**
 * Evict all in-memory rate-limit window keys whose window has already ended.
 *
 * Key format: `rl:api_key:{id}:{windowSize}:{windowNumber}`
 * A key expires at epoch-second `(windowNumber + 1) * windowSize`.
 *
 * Exported so tests can exercise it directly and so callers can invoke it
 * with any store (TEST_MEMORY_STORE or FALLBACK_MEMORY_STORE).
 *
 * Fixes: #4041 — FALLBACK_MEMORY_STORE accumulated indefinitely → OOM (#4771).
 */
export function evictStaleRateLimitWindows(store: Map<string, number>, nowSeconds: number): void {
  for (const key of store.keys()) {
    // Format: rl:api_key:{id}:{windowSize}:{windowNumber}
    // Split only on the last two colons to handle ids that contain colons.
    const lastColon = key.lastIndexOf(":");
    if (lastColon === -1) continue;
    const secondLastColon = key.lastIndexOf(":", lastColon - 1);
    if (secondLastColon === -1) continue;

    const windowNumber = Number(key.slice(lastColon + 1));
    const windowSize = Number(key.slice(secondLastColon + 1, lastColon));

    if (!Number.isFinite(windowNumber) || !Number.isFinite(windowSize) || windowSize <= 0) {
      continue;
    }

    const windowEnd = (windowNumber + 1) * windowSize;
    if (windowEnd <= nowSeconds) {
      store.delete(key);
    }
  }
}

export function setRateLimiterTestMode(enabled: boolean) {
  explicitTestMode = enabled;
  if (enabled) TEST_MEMORY_STORE.clear();
}

function checkInMemoryRateLimit(
  store: Map<string, number>,
  keyId: string,
  rules: RateLimitRule[]
): RateLimitResult {
  const now = Math.floor(Date.now() / 1000);

  // Opportunistic eviction: sweep stale windows when the store has grown past
  // the threshold. Bounded O(n) sweep — no timer, no background work.
  if (store.size > EVICTION_THRESHOLD) {
    evictStaleRateLimitWindows(store, now);
  }
  for (const rule of rules) {
    const currentWindow = Math.floor(now / rule.window);
    const windowKey = `rl:api_key:${keyId}:${rule.window}:${currentWindow}`;
    const count = store.get(windowKey) || 0;
    if (count >= rule.limit) {
      return { allowed: false, failedWindow: rule.window };
    }
  }

  for (const rule of rules) {
    const currentWindow = Math.floor(now / rule.window);
    const windowKey = `rl:api_key:${keyId}:${rule.window}:${currentWindow}`;
    store.set(windowKey, (store.get(windowKey) || 0) + 1);
  }

  return { allowed: true };
}

export async function checkRateLimit(
  keyId: string,
  rules: RateLimitRule[]
): Promise<RateLimitResult> {
  if (!rules || rules.length === 0) return { allowed: true };

  // ── In-memory mock for unit tests ──
  const isTestMode =
    explicitTestMode ||
    process.env.NODE_ENV === "test" ||
    process.env.DISABLE_SQLITE_AUTO_BACKUP === "true";

  if (isTestMode) {
    return checkInMemoryRateLimit(TEST_MEMORY_STORE, keyId, rules);
  }

  if (!isRedisConfigured()) {
    return checkInMemoryRateLimit(FALLBACK_MEMORY_STORE, keyId, rules);
  }

  const redis = await getRedisClient();

  const args: (string | number)[] = [Math.floor(Date.now() / 1000)];

  for (const rule of rules) {
    args.push(rule.limit, rule.window);
  }

  try {
    const result = (await redis.eval(RATE_LIMIT_SCRIPT, 1, `rl:api_key:${keyId}`, ...args)) as [
      number,
      number,
    ];

    if (result[0] === 0) {
      return { allowed: false, failedWindow: result[1] };
    }

    return { allowed: true };
  } catch (error) {
    // Fail-open strategy if Redis goes down to prevent complete API outage
    console.error("[RATE_LIMITER] Redis eval failed, bypassing rate limit:", error);
    return { allowed: true };
  }
}
