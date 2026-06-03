import Redis from "ioredis";

// Redis is optional. When REDIS_URL is unset, use a process-local fallback
// instead of probing localhost on every API request.
const REDIS_URL = process.env.REDIS_URL?.trim() || "";
if (process.env.NODE_ENV === "production" && !REDIS_URL) {
  console.warn("[REDIS] REDIS_URL is not set in production. Using in-memory rate limiting.");
}

let redisClient: Redis | null = null;

export function isRedisConfigured(): boolean {
  return REDIS_URL.length > 0;
}

export function getRedisClient() {
  if (!isRedisConfigured()) {
    throw new Error("Redis is not configured");
  }

  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: false,
      retryStrategy(times) {
        return Math.min(times * 50, 2000); // Exponential backoff
      },
    });
    redisClient.on("error", (err) => console.error("[REDIS] Error:", err.message));
  }
  return redisClient;
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

  const redis = getRedisClient();

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
