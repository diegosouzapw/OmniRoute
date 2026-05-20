/**
 * Issue #2357 — Redis is optional. When `REDIS_URL` is unset, the rate
 * limiter must fall back to the in-memory store silently instead of
 * spamming `connect ECONNREFUSED 127.0.0.1:6379` for every request.
 *
 * `ioredis` has a packaging quirk (`@ioredis/commands/built/commands.json`
 * is actually JS, not JSON) that prevents `node:test` from importing it
 * cleanly, so we verify the contract at the source level instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RATE_LIMITER_SRC = path.resolve(__dirname, "../../src/shared/utils/rateLimiter.ts");
const src = fs.readFileSync(RATE_LIMITER_SRC, "utf8");

test("#2357 REDIS_URL no longer falls back to localhost:6379 silently", () => {
  // The old code was `process.env.REDIS_URL || "redis://localhost:6379"`,
  // which made Redis effectively required and produced ECONNREFUSED spam
  // when no sibling Redis container existed. The fix gates Redis on the
  // explicit env var.
  assert.ok(
    !/process\.env\.REDIS_URL\s*\|\|\s*"redis:\/\/localhost:6379"/.test(src),
    "rateLimiter must not default REDIS_URL to localhost (Redis is optional)"
  );
  assert.ok(
    /REDIS_ENABLED\s*=\s*Boolean\(REDIS_URL\)/.test(src),
    "rateLimiter must expose REDIS_ENABLED gated on the env var"
  );
});

test("#2357 getRedisClient returns null when REDIS_URL is not set", () => {
  // The function must short-circuit instead of constructing a client that
  // would spin retrying against localhost:6379.
  assert.ok(
    /export function getRedisClient\(\)[\s\S]{0,200}if \(!REDIS_ENABLED\) return null/.test(src),
    "getRedisClient must return null when REDIS_ENABLED is false"
  );
});

test("#2357 checkRateLimit takes the in-memory branch when REDIS_URL is unset", () => {
  // Look for the new `isTestMode || !isRedisEnabled()` guard. This is the
  // line that routes the request to the in-memory store on docker
  // installations without a Redis sidecar.
  assert.ok(
    /isTestMode\s*\|\|\s*!isRedisEnabled\(\)/.test(src),
    "checkRateLimit must route to the in-memory fallback when Redis is disabled"
  );
});

test("#2357 connection errors only log once instead of per-request spam", () => {
  // The error handler used to be `console.error("[REDIS] Error:", err.message)`
  // fired on every reconnect attempt. The new behavior wraps it with a
  // `redisErrorLogged` latch so production logs do not get flooded.
  assert.ok(
    /redisErrorLogged/.test(src),
    "Redis error handler must dedupe so docker logs do not flood with ECONNREFUSED"
  );
});

test("#2357 RATE_LIMITER eval failure also dedupes its warn", () => {
  // The fail-open `console.error` call on Redis eval failure used to fire
  // on every request. The new path reuses the same latch so a single warn
  // is emitted even under sustained Redis outage. Anchor the search on the
  // catch handler that surrounds the RATE_LIMITER warn so we exercise the
  // exact code path that produced the user's log flood.
  const fenceIdx = src.indexOf("RATE_LIMITER");
  assert.ok(fenceIdx > 0, "RATE_LIMITER fail-open warn should exist");
  const windowStart = Math.max(0, fenceIdx - 200);
  const windowEnd = Math.min(src.length, fenceIdx + 200);
  const window = src.slice(windowStart, windowEnd);
  assert.ok(
    /if \(!redisErrorLogged\)/.test(window),
    "Rate limiter eval failure must check the dedup latch before logging"
  );
});
