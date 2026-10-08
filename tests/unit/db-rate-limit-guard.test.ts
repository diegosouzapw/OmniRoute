import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-ratelimit-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts") as typeof import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts") as typeof import("../../src/lib/db/providers.ts");
const {
  setConnectionRateLimitUntil,
  clearConnectionRateLimit,
  isConnectionRateLimited,
} = providersDb;

function readRateLimitedUntil(connectionId: string): unknown {
  const db = (
    core as unknown as {
      getDbInstance: () => {
        prepare: (sql: string) => {
          get: (id: string) => { rate_limited_until: unknown } | undefined;
        };
      };
    }
  ).getDbInstance();
  return db
    .prepare("SELECT rate_limited_until FROM provider_connections WHERE id = ?")
    .get(connectionId)?.rate_limited_until ?? null;
}

async function resetStorage() {
  core.resetDbInstance();
  // Retry loop copied from db-providers-crud.test.ts:17-30 (Windows EBUSY/EPERM).
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | null)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  // No retry here (unlike resetStorage): teardown-only, Linux CI; Windows
  // EBUSY surfaces in beforeEach retries, not here.
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function seedConnection(): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Guard probe",
    apiKey: "guard-key",
  });
  return (connection as { id: string }).id;
}

test("ignores NaN (row unchanged)", async () => {
  const id = await seedConnection();
  setConnectionRateLimitUntil(id, NaN);
  assert.equal(readRateLimitedUntil(id), null);
});

test("ignores Infinity and -Infinity", async () => {
  const id = await seedConnection();
  setConnectionRateLimitUntil(id, Infinity);
  setConnectionRateLimitUntil(id, -Infinity);
  assert.equal(readRateLimitedUntil(id), null);
});

test("ignores past timestamps and 0 (documented noop; clear path is null)", async () => {
  const id = await seedConnection();
  setConnectionRateLimitUntil(id, Date.now() - 1000);
  setConnectionRateLimitUntil(id, 0);
  assert.equal(readRateLimitedUntil(id), null);
});

test("writes future timestamps", async () => {
  const id = await seedConnection();
  const until = Date.now() + 60_000;
  setConnectionRateLimitUntil(id, until);
  assert.equal(Number(readRateLimitedUntil(id)), until);
  assert.equal(isConnectionRateLimited(id), true);
});

test("preserves null clear (non-regression for clearConnectionRateLimit)", async () => {
  const id = await seedConnection();
  setConnectionRateLimitUntil(id, Date.now() + 60_000);
  clearConnectionRateLimit(id);
  assert.equal(readRateLimitedUntil(id), null);
  assert.equal(isConnectionRateLimited(id), false);
});

test("expired write does not overwrite a live row (future preserved)", async () => {
  const id = await seedConnection();
  const future = Date.now() + 60_000;
  setConnectionRateLimitUntil(id, future);
  setConnectionRateLimitUntil(id, Date.now() - 1000);
  assert.equal(Number(readRateLimitedUntil(id)), future);
  assert.equal(isConnectionRateLimited(id), true);
});

// Without the guard the TEXT column stores the string "NaN" — rejected by
// current readers, but hygiene demands never writing it.
