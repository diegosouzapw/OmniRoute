// #6219 — Sticky session affinity must fail over when the pinned account is
// exhausted/unavailable. Before the fix, the generic account-fallback path in
// src/sse/handlers/chat.ts marked the account unavailable + excluded it for the
// current retry, but never evicted the persisted session-affinity pin — so the
// next request re-pinned the same throttled account until process restart.
//
// The fix adds evictSessionAccountAffinityForConnection() (src/lib/db/
// sessionAccountAffinity.ts) and calls it on that generic failover path. The
// helper reads the stored pin INDEPENDENT of the TTL gate — the pre-existing
// guarded reads via getSessionAccountAffinity(key, provider) (2-arg, ttl=0)
// always returned null, making that guard a silent no-op.
//
// These tests drive the extracted eviction seam directly (running the full
// chat.ts handler is too heavy) plus a source-level guard that the generic
// fallback path wires the eviction in.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sticky-failover-6219-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "sticky-failover-6219-test-secret";

const core = await import("../../src/lib/db/core.ts");
const affinityDb = await import("../../src/lib/db/sessionAccountAffinity.ts");

const PROVIDER = "codex";
const SESSION = "session-6219";
const CONN_A = "conn-A-exhausted";
const CONN_B = "conn-B-healthy";
const TTL = 60_000;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("evicts the sticky pin when the pinned connection fails over (#6219)", () => {
  affinityDb.upsertSessionAccountAffinity(SESSION, PROVIDER, CONN_A, Date.now(), TTL);
  assert.equal(
    affinityDb.getSessionAccountAffinity(SESSION, PROVIDER, TTL)?.connectionId,
    CONN_A,
    "precondition: session pinned to the (soon-exhausted) connection A"
  );

  const evicted = affinityDb.evictSessionAccountAffinityForConnection(SESSION, PROVIDER, CONN_A);

  assert.equal(evicted, true, "failover eviction should report it removed the pin");
  assert.equal(
    affinityDb.getSessionAccountAffinity(SESSION, PROVIDER, TTL),
    null,
    "after failover the sticky pin to the exhausted connection must be gone (re-pins next request)"
  );
});

test("does NOT evict a pin that points at a different (healthy) connection (#6219)", () => {
  affinityDb.upsertSessionAccountAffinity(SESSION, PROVIDER, CONN_B, Date.now(), TTL);

  const evicted = affinityDb.evictSessionAccountAffinityForConnection(SESSION, PROVIDER, CONN_A);

  assert.equal(evicted, false, "must not evict when the pin is for another connection");
  assert.equal(
    affinityDb.getSessionAccountAffinity(SESSION, PROVIDER, TTL)?.connectionId,
    CONN_B,
    "a healthy pin to B must survive a failover on the unrelated connection A"
  );
});

test("eviction is not TTL-gated — clears the pin even for a stale stored record (#6219)", () => {
  // The pre-fix guard read via getSessionAccountAffinity(key, provider) (ttl=0)
  // returned null and never deleted. The helper reads raw so eviction fires
  // regardless of the TTL gate.
  const past = Date.now() - 120_000;
  affinityDb.upsertSessionAccountAffinity(SESSION, PROVIDER, CONN_A, past, 60_000); // already expired

  const evicted = affinityDb.evictSessionAccountAffinityForConnection(SESSION, PROVIDER, CONN_A);

  assert.equal(evicted, true, "raw connection-matched eviction still removes the stale stored pin");
});

test("chat.ts generic account-failover path wires in the sticky eviction (#6219)", () => {
  const src = fs.readFileSync(new URL("../../src/sse/handlers/chat.ts", import.meta.url), "utf8");
  assert.match(
    src,
    /evictSessionAccountAffinityForConnection\(/,
    "chat.ts must call evictSessionAccountAffinityForConnection on the failover path"
  );
});
