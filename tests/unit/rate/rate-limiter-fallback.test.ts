import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

async function importFreshRateLimiter(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/rateLimiter.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test("rate limiter uses in-memory fallback when REDIS_URL is unset", async () => {
  const previousRedisUrl = process.env.REDIS_URL;
  const previousNodeEnv = process.env.NODE_ENV;
  const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;

  delete process.env.REDIS_URL;
  process.env.NODE_ENV = "production";
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;

  try {
    const rateLimiter = await importFreshRateLimiter("fallback");

    assert.equal(rateLimiter.isRedisConfigured(), false);
    assert.throws(() => rateLimiter.getRedisClient(), /Redis is not configured/);

    const first = await rateLimiter.checkRateLimit("key-1", [{ limit: 1, window: 60 }]);
    const second = await rateLimiter.checkRateLimit("key-1", [{ limit: 1, window: 60 }]);

    assert.deepEqual(first, { allowed: true });
    assert.deepEqual(second, { allowed: false, failedWindow: 60 });
  } finally {
    if (previousRedisUrl === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = previousRedisUrl;

    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;

    if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
    else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
  }
});
