/**
 * DISABLE_SQLITE_AUTO_BACKUP is a production setting (.env.example: "Set true only when
 * those backups are managed externally"), but checkRateLimit() and the Redis auth cache
 * also read it as "running under tests". A deployment with REDIS_URL and externally
 * managed backups therefore rate-limited every key in process memory, so each replica
 * enforced the full per-key limit on its own.
 *
 * The REDIS_URL below points at a closed port. Taking the Redis path shows up as the
 * limiter's fail-open { allowed: true }; the in-memory test store would reject the
 * second request against a limit of 1.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ENV_KEYS = ["REDIS_URL", "NODE_ENV", "DISABLE_SQLITE_AUTO_BACKUP"] as const;

async function twoRequestsAgainstLimitOne(env: Partial<Record<(typeof ENV_KEYS)[number], string>>) {
  const saved = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of ENV_KEYS) {
    if (env[key] === undefined) delete process.env[key];
    else process.env[key] = env[key];
  }
  const originalConsoleError = console.error;
  console.error = () => {};
  const modulePath = path.join(process.cwd(), "src/shared/utils/rateLimiter.ts");
  const rateLimiter = await import(`${pathToFileURL(modulePath).href}?case=${Math.random()}`);
  try {
    const rules = [{ limit: 1, window: 60 }];
    return [
      await rateLimiter.checkRateLimit("key-1", rules),
      await rateLimiter.checkRateLimit("key-1", rules),
    ];
  } finally {
    if (rateLimiter.isRedisConfigured()) {
      (await rateLimiter.getRedisClient()).disconnect();
    }
    console.error = originalConsoleError;
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

test("DISABLE_SQLITE_AUTO_BACKUP=true does not move a Redis deployment to the in-memory store", async () => {
  const results = await twoRequestsAgainstLimitOne({
    REDIS_URL: "redis://127.0.0.1:1",
    NODE_ENV: "production",
    DISABLE_SQLITE_AUTO_BACKUP: "true",
  });
  assert.deepEqual(results, [{ allowed: true }, { allowed: true }]);
});

test("NODE_ENV=test still keeps the limiter in memory even with REDIS_URL set", async () => {
  const results = await twoRequestsAgainstLimitOne({
    REDIS_URL: "redis://127.0.0.1:1",
    NODE_ENV: "test",
  });
  assert.deepEqual(results, [{ allowed: true }, { allowed: false, failedWindow: 60 }]);
});

test("the Redis auth cache is not switched off by DISABLE_SQLITE_AUTO_BACKUP", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "src/lib/db/apiKeys.ts"), "utf8");
  const gate = source.match(/function isRedisAuthCacheEnabled\(\)[^{]*\{([\s\S]*?)\n\}/);
  assert.ok(gate, "isRedisAuthCacheEnabled() not found");
  assert.doesNotMatch(gate[1], /DISABLE_SQLITE_AUTO_BACKUP/);
  assert.match(gate[1], /NODE_ENV !== "test"/);
});
