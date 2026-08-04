/**
 * TDD regression: the anti-thundering-herd guard inside `markAccountUnavailable`
 * (src/sse/services/auth.ts) uses a raw `new Date(conn.rateLimitedUntil)` instead
 * of the tolerant `cooldownUntilMs` normalizer that the rest of the codebase
 * adopted for #3954.
 *
 * `rate_limited_until` is a TEXT column, but the Antigravity full-quota path
 * (`setConnectionRateLimitUntil`) writes a raw epoch NUMBER, which SQLite TEXT
 * affinity coerces to a numeric string (e.g. "1781696905131"). `new Date(...)`
 * on that string is Invalid Date (NaN), so `NaN > Date.now()` is false and the
 * guard never detects "already marked unavailable" for these connections.
 *
 * Effect: a second concurrent 429/failure on a connection already cooling down
 * from a long (e.g. 1h quota-exhaustion) numeric-epoch cooldown gets treated as
 * a brand-new failure — the guard is bypassed, `checkFallbackError` computes a
 * fresh (much shorter) base cooldown, and it OVERWRITES the long cooldown,
 * making the connection selectable again far sooner than intended.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const HOUR = 3_600_000;

function readConnectionRow(connId: string) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      get: (id: string) => { rate_limited_until: unknown; backoff_level: unknown } | undefined;
    };
  };
  return db
    .prepare("SELECT rate_limited_until, backoff_level FROM provider_connections WHERE id = ?")
    .get(connId);
}

test("markAccountUnavailable does not shorten an existing numeric-epoch cooldown (anti-thundering-herd guard)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "AG guard test",
  });
  const connId = (conn as { id: string }).id;

  // Simulate the Antigravity full-quota path: a long (1h) cooldown persisted as
  // a raw epoch number (the known write-side trap from #3954).
  const longCooldownUntil = Date.now() + HOUR;
  providersDb.setConnectionRateLimitUntil(connId, longCooldownUntil);

  const before = readConnectionRow(connId);
  assert.ok(
    /^\d+(\.\d+)?$/.test(String(before?.rate_limited_until)),
    `expected numeric epoch string, got ${String(before?.rate_limited_until)}`
  );

  // A second, concurrent 429 hits the SAME connection while it is still cooling.
  // The anti-thundering-herd guard should short-circuit and leave the existing
  // (longer) cooldown untouched.
  await markAccountUnavailable(connId, 429, "rate limited", "antigravity");

  const after = readConnectionRow(connId);
  const afterUntilMs = Number(after?.rate_limited_until);

  assert.ok(
    afterUntilMs >= longCooldownUntil - 1_000,
    `guard must not shorten the cooldown: expected >= ${longCooldownUntil}, got ${afterUntilMs}`
  );
  assert.equal(
    Number(after?.backoff_level ?? 0),
    Number(before?.backoff_level ?? 0),
    "backoff level must not be double-incremented by a deduped duplicate mark"
  );
});
