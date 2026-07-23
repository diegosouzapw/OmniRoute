/**
 * #7079 — `runFreeProxySyncCycle()` is the shared helper extracted out of the
 * manual `POST /api/settings/free-proxies/sync` route so both the manual route
 * and the new auto-sync scheduler go through the exact same code path.
 *
 * This file proves the helper's own boundary preserves the two invariants the
 * extraction must not regress:
 *   - #5595: one provider throwing does not abort the others.
 *   - #4878: the sync timestamp advances even when every provider fails/no-ops.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { FreeProxyProvider } from "../../src/lib/freeProxyProviders/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-proxy-cycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");
const { runFreeProxySyncCycle } = await import("../../src/lib/freeProxyProviders/syncCycle.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  reset();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function makeProvider(
  id: FreeProxyProvider["id"],
  sync: FreeProxyProvider["sync"]
): FreeProxyProvider {
  return { id, name: id, isEnabled: () => true, sync, list: async () => [] };
}

test("#5595 one provider rejecting does not prevent the others from syncing", async () => {
  const good = makeProvider("1proxy", async () => ({
    fetched: 2,
    added: 2,
    updated: 0,
    errors: [],
  }));
  const bad = makeProvider("proxifly", async () => {
    throw new Error("upstream unreachable");
  });

  const { results } = await runFreeProxySyncCycle([bad, good]);

  assert.deepEqual(results["1proxy"], { fetched: 2, added: 2, updated: 0, errors: [] });
  assert.ok(
    (results["proxifly"] as { errors: string[] }).errors.some((e) =>
      e.includes("upstream unreachable")
    )
  );
});

test("#5595 a throwing provider records its error via recordFreeProxySyncErrors", async () => {
  const bad = makeProvider("proxifly", async () => {
    throw new Error("boom");
  });

  await runFreeProxySyncCycle([bad]);

  const errors = await freeProxiesDb.getFreeProxySyncErrors();
  assert.ok(errors["proxifly"]?.some((e) => e.includes("boom")));
});

test("#5595 a subsequent successful sync clears a source's stored error", async () => {
  const bad = makeProvider("proxifly", async () => {
    throw new Error("boom");
  });
  await runFreeProxySyncCycle([bad]);
  assert.ok((await freeProxiesDb.getFreeProxySyncErrors())["proxifly"]?.length);

  const nowGood = makeProvider("proxifly", async () => ({
    fetched: 1,
    added: 1,
    updated: 0,
    errors: [],
  }));
  await runFreeProxySyncCycle([nowGood]);

  assert.equal((await freeProxiesDb.getFreeProxySyncErrors())["proxifly"], undefined);
});

test("#4878 the sync timestamp advances even when every provider fails", async () => {
  const before = await freeProxiesDb.getFreeProxyStats();
  assert.equal(before.lastSyncAt, null);

  const bad = makeProvider("proxifly", async () => {
    throw new Error("dead upstream");
  });
  const { lastSyncAt } = await runFreeProxySyncCycle([bad]);

  assert.ok(typeof lastSyncAt === "string" && lastSyncAt.length > 0);
  const after = await freeProxiesDb.getFreeProxyStats();
  assert.equal(after.lastSyncAt, lastSyncAt);
});

test("omitting `providers` still records a sync timestamp with zero providers enabled", async () => {
  // Disable every default-enabled provider so this stays network-free while
  // still exercising the `providers === undefined` → `getEnabledProviders()`
  // default path the scheduler relies on.
  const prevOneproxy = process.env.FREE_PROXY_1PROXY_ENABLED;
  const prevProxifly = process.env.FREE_PROXY_PROXIFLY_ENABLED;
  process.env.FREE_PROXY_1PROXY_ENABLED = "false";
  process.env.FREE_PROXY_PROXIFLY_ENABLED = "false";
  try {
    const { lastSyncAt, results } = await runFreeProxySyncCycle();
    assert.ok(typeof lastSyncAt === "string" && lastSyncAt.length > 0);
    assert.deepEqual(results, {});
  } finally {
    if (prevOneproxy === undefined) delete process.env.FREE_PROXY_1PROXY_ENABLED;
    else process.env.FREE_PROXY_1PROXY_ENABLED = prevOneproxy;
    if (prevProxifly === undefined) delete process.env.FREE_PROXY_PROXIFLY_ENABLED;
    else process.env.FREE_PROXY_PROXIFLY_ENABLED = prevProxifly;
  }
});
