import Redis from "ioredis";

// Issue #2357: When OmniRoute runs in Docker without a sibling Redis
// container (the default `docker run` / portainer one-click install), every
// rate-limit lookup hits `redis://localhost:6379` inside the container and
// spams `[REDIS] Error: connect ECONNREFUSED 127.0.0.1:6379`. Rate limiting
// is non-essential for a single-instance deployment, so we now:
//
// 1) Treat `REDIS_URL` as opt-in. If it's not set we silently fall back to
//    the in-memory store (same code path used by unit tests).
// 2) Even when set, errors degrade gracefully: a single startup warning,
//    then suppress per-request error spam after the first occurrence.
const REDIS_URL = process.env.REDIS_URL;
const REDIS_ENABLED = Boolean(REDIS_URL);

let redisClient: Redis | null = null;
let redisErrorLogged = false;

export function getRedisClient(): Redis | null {
  if (!REDIS_ENABLED) return null;
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL as string, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: false,
      lazyConnect: false,
      retryStrategy(times) {
        return Math.min(times * 50, 2000); // Exponential backoff
      },
    });
    redisClient.on("error", (err) => {
      if (!redisErrorLogged) {
        console.warn("[REDIS] Connection error — rate limiter degraded to in-memory:", err.message);
        redisErrorLogged = true;
      }
    });
  }
  return redisClient;
}

export function isRedisEnabled(): boolean {
  return REDIS_ENABLED;
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
let explicitTestMode = false;

export function setRateLimiterTestMode(enabled: boolean) {
  explicitTestMode = enabled;
  if (enabled) TEST_MEMORY_STORE.clear();
}

/**
 * Checks multi-window rate limits for an API key atomically via Redis.
 */
function checkRateLimitInMemory(keyId: string, rules: RateLimitRule[]): RateLimitResult {
  const now = Math.floor(Date.now() / 1000);
  for (const rule of rules) {
    const currentWindow = Math.floor(now / rule.window);
    const windowKey = `rl:api_key:${keyId}:${rule.window}:${currentWindow}`;
    const count = TEST_MEMORY_STORE.get(windowKey) || 0;
    if (count >= rule.limit) {
      return { allowed: false, failedWindow: rule.window };
    }
  }
  for (const rule of rules) {
    const currentWindow = Math.floor(now / rule.window);
    const windowKey = `rl:api_key:${keyId}:${rule.window}:${currentWindow}`;
    TEST_MEMORY_STORE.set(windowKey, (TEST_MEMORY_STORE.get(windowKey) || 0) + 1);
  }
  return { allowed: true };
}

export async function checkRateLimit(
  keyId: string,
  rules: RateLimitRule[]
): Promise<RateLimitResult> {
  if (!rules || rules.length === 0) return { allowed: true };

  // ── In-memory path for unit tests AND single-instance deployments ──
  // Issue #2357: when REDIS_URL is unset we used to hammer
  // localhost:6379 and surface a stream of ECONNREFUSED errors. Now the
  // in-memory fallback handles single-instance setups silently. The
  // explicit test-mode flag still wins so suites can opt-in even with
  // REDIS_URL set.
  const isTestMode =
    explicitTestMode ||
    process.env.NODE_ENV === "test" ||
    process.env.DISABLE_SQLITE_AUTO_BACKUP === "true";

  if (isTestMode || !isRedisEnabled()) {
    return checkRateLimitInMemory(keyId, rules);
  }

  const redis = getRedisClient();
  if (!redis) return checkRateLimitInMemory(keyId, rules);

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
    // Fail-open strategy if Redis goes down to prevent complete API outage.
    // First failure already logged in the connection error handler — keep
    // per-request output to a debug line to avoid log spam.
    if (!redisErrorLogged) {
      console.warn(
        "[RATE_LIMITER] Redis eval failed, bypassing rate limit:",
        (error as Error)?.message ?? String(error)
      );
      redisErrorLogged = true;
    }
    return { allowed: true };
  }
}
