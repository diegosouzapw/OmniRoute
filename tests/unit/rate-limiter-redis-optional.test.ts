/**
 * Issue #2357 - Redis is optional. When `REDIS_URL` is unset, the rate
 * limiter must use the in-memory store instead of probing localhost.
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
  assert.ok(
    !src.includes('process.env.REDIS_URL || "redis://localhost:6379"'),
    "rateLimiter must not default REDIS_URL to localhost"
  );
  assert.ok(
    src.includes('const REDIS_URL = process.env.REDIS_URL?.trim() || "";'),
    "rateLimiter must only use Redis when REDIS_URL is explicitly configured"
  );
});

test("#2357 getRedisClient is strict when REDIS_URL is not set", () => {
  assert.ok(
    src.includes('throw new Error("Redis is not configured");'),
    "getRedisClient must throw when Redis is not configured"
  );
});

test("#2357 checkRateLimit falls back when REDIS_URL is unset", () => {
  assert.ok(
    src.includes("if (!isRedisConfigured())") &&
      src.includes("return checkInMemoryRateLimit(FALLBACK_MEMORY_STORE, keyId, rules);"),
    "checkRateLimit must route to the in-memory fallback when Redis is disabled"
  );
});
