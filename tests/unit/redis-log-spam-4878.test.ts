import test from "node:test";
import assert from "node:assert/strict";

import { createRedisErrorThrottle } from "../../src/shared/utils/rateLimiter.ts";

// #4878 — ioredis emits an `error` event on every failed (re)connection
// attempt, so a configured-but-unreachable REDIS_URL floods the logs with one
// `[REDIS] Error:` line per retry. The throttle logs the first occurrence of a
// message immediately, then at most once per interval.

test("#4878 redis error throttle logs the first occurrence then suppresses repeats within the interval", () => {
  const shouldLog = createRedisErrorThrottle(60_000);
  assert.equal(shouldLog("connect ECONNREFUSED 127.0.0.1:6379", 1_000), true);
  assert.equal(shouldLog("connect ECONNREFUSED 127.0.0.1:6379", 2_000), false);
  assert.equal(shouldLog("connect ECONNREFUSED 127.0.0.1:6379", 30_000), false);
  assert.equal(shouldLog("connect ECONNREFUSED 127.0.0.1:6379", 61_001), true);
});

test("#4878 redis error throttle logs immediately when the error message changes", () => {
  const shouldLog = createRedisErrorThrottle(60_000);
  assert.equal(shouldLog("connect ECONNREFUSED 127.0.0.1:6379", 1_000), true);
  assert.equal(shouldLog("READONLY You can't write against a read only replica", 1_500), true);
});
