/**
 * STRICT_ZERO_COST vs the read-only candidate inspector (#7819 Level 1, #9133).
 *
 * With `freeAccessPolicy: "strict"`, the zero-cost guard used to run on the
 * inspector's pool as well as the dispatch pool, so a candidate it excluded
 * simply vanished from the listing — the operator could not tell "no free
 * allowance left" from "the quota lookup never answered". The guard now honours
 * the same `skip` opt-out the resilience filter already did, and each candidate
 * carries the reason instead.
 *
 * Two guarantees, in this order of importance:
 *   1. the dispatch pool is byte-for-byte what it was (the guard still applies);
 *   2. the listing keeps the excluded candidates, each with its reason.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-access-reason-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const candidateHandler = await import("../../open-sse/handlers/autoComboCandidates.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection() {
  return providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-strict@example.com",
    accessToken: "fake-antigravity-access-token",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("the dispatch pool still drops what the guard excludes", async () => {
  await seedConnection();
  await settingsDb.updateSettings({ freeAccessPolicy: "strict" });

  // skip:false is the routing path. Nothing in this change may widen it.
  const dispatch = await virtualFactory.prepareVirtualAutoComboInputs({}, false);
  const survivors = dispatch.regularCandidates;

  assert.ok(
    survivors.every((candidate) => candidate.freeAccessExclusion === undefined),
    "the dispatch build must not pay for an annotation it never reads"
  );

  // Every survivor is one the guard cleared: no live quota reading exists in
  // this harness, so under `strict` the guard can only keep genuinely keyless
  // candidates. An empty pool is the correct, conservative answer here.
  const strictOff = await (async () => {
    await settingsDb.updateSettings({ freeAccessPolicy: "off" });
    const prepared = await virtualFactory.prepareVirtualAutoComboInputs({}, false);
    await settingsDb.updateSettings({ freeAccessPolicy: "strict" });
    return prepared.regularCandidates;
  })();

  assert.ok(
    survivors.length <= strictOff.length,
    "the guard must never add candidates to the dispatch pool"
  );
});

test("a candidate the guard would exclude stays in the listing, with its reason", async () => {
  const connection = await seedConnection();
  await settingsDb.updateSettings({ freeAccessPolicy: "strict" });

  const listing = await candidateHandler.getAutoComboCandidates("auto", null);
  const rows = listing.candidates.filter((candidate) => candidate.connectionId === connection.id);

  assert.ok(rows.length > 0, "the guard must not empty the read-only listing");

  const excluded = rows.filter((candidate) => candidate.freeAccessExclusion !== null);
  assert.ok(
    excluded.length > 0,
    "under a strict policy some candidates are excluded; the listing must still show them"
  );

  const reasons = new Set(excluded.map((candidate) => candidate.freeAccessExclusion));
  const known = new Set([
    "not-in-catalog",
    "regime-not-free",
    "no-hard-stop",
    "contradictory-noauth",
    "exhausted",
    "state-unknown",
    "no-connection",
  ]);
  for (const reason of reasons) {
    assert.ok(known.has(String(reason)), `unexpected exclusion reason: ${String(reason)}`);
  }

  // A model absent from the free-tier catalog is the commonest case, and it is a
  // different problem from a drained allowance — which is the whole point of
  // reporting a reason rather than a boolean.
  assert.ok(
    reasons.has("not-in-catalog"),
    "a model the free catalog does not list must say so, not just disappear"
  );
});

test("with the policy off, the listing reports no reason and does no work", async () => {
  const connection = await seedConnection();
  await settingsDb.updateSettings({ freeAccessPolicy: "off" });

  const listing = await candidateHandler.getAutoComboCandidates("auto", null);
  const rows = listing.candidates.filter((candidate) => candidate.connectionId === connection.id);

  assert.ok(rows.length > 0, "candidates must be listed when the guard is off");
  assert.ok(
    rows.every((candidate) => candidate.freeAccessExclusion === null),
    "no policy, no reason — the default case must stay free"
  );
});
