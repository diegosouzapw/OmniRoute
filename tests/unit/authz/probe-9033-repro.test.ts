// Repro test for #9033 — IP blacklist does not block on direct connections
// and does not propagate without restart.
// D1: blacklisted IP on a DIRECT connection (trusted peer stamp, no XFF) is NOT blocked
// D2: persisted config written after first load is never re-read by the loaded instance
// Bonus: ipFilterModeSchema rejects "whitelist-priority" that the UI offers and checkIP implements
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = path.join(process.env.DATA_DIR!, "probe-9033-repro");
// NOTE: Not reassigning process.env.DATA_DIR at module scope because
// node --test spawns test files as worker threads sharing process.env.
// A module-level DATA_DIR override would leak to ALL concurrently running
// workers, causing them to share the same SQLite file and race on it (#9541).
// isolateDataDir.ts (--import) already set DATA_DIR to a unique temp dir per
// process; we use a subdirectory within it instead.

process.env.JWT_SECRET = "test-secret-9033";

const core = await import("../../../src/lib/db/core.ts");
const ipFilter = await import("../../../open-sse/services/ipFilter.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  ipFilter.resetIPFilter();
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
});

const BLOCKED = "203.0.113.99";

function makeRequest(extraHeaders: Record<string, string> = {}) {
  return new NextRequest("http://localhost/v1/models", {
    headers: { ...extraHeaders },
  });
}

test("D1: blacklisted IP is blocked on a DIRECT connection (trusted peer stamp, no XFF)", async () => {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  // Simulate a direct connection: the peer stamp says the client is BLOCKED,
  // and there is no x-forwarded-for header (direct connection, not via proxy).
  const res = await pipeline.runAuthzPipeline(
    makeRequest({ "x-omniroute-peer-ip": "stamp-tok|203.0.113.99" }),
    { enforce: true }
  );

  assert.equal(res.status, 403, `direct blacklisted IP must be blocked, got status=${res.status}`);
});

test("D2: persisted config written after first load is honored WITHOUT restart", async () => {
  // Simulate: the settings route (separate module instance) writes config to DB.
  // The ipFilter module instance (already loaded) must re-read it.
  // First, load the module once (simulates initial load from a previous request).
  ipFilter.resetIPFilter();
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);
  assert.equal(ipFilter.checkIP(BLOCKED).allowed, false, "blacklist must be active after config");

  // Now simulate a "settings route" write: write directly to the DB key_value table
  // with a DIFFERENT config (e.g. empty blacklist, effectively "allow all").
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "ipFilter",
    "config",
    JSON.stringify({ enabled: true, mode: "blacklist", blacklist: [], whitelist: [] })
  );

  // Without a restart, the ipFilter instance must re-read from DB on next checkIP call.
  // The BLOCKED IP should NOT be blocked anymore because the DB config has empty blacklist.
  const result = ipFilter.checkIP(BLOCKED);
  assert.equal(
    result.allowed,
    true,
    `stale-config enforcer must re-read DB, got: ${JSON.stringify(result)}`
  );
});

test("D3: behind reverse proxy (peer stamp=loopback + via-proxy marker + XFF=blacklisted IP) still blocks", async () => {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-tok";
  ipFilter.configureIPFilter({ enabled: true, mode: "blacklist" });
  ipFilter.addToBlacklist(BLOCKED);

  // Behind a reverse proxy: the peer IP is the proxy hop (127.0.0.1),
  // the via-proxy marker is set, and the real client IP is in x-forwarded-for.
  const res = await pipeline.runAuthzPipeline(
    makeRequest({
      "x-omniroute-peer-ip": "stamp-tok|127.0.0.1",
      "x-omniroute-via-proxy": "stamp-tok|1",
      "x-forwarded-for": BLOCKED,
    }),
    { enforce: true }
  );

  assert.equal(
    res.status,
    403,
    `behind-proxy blacklisted IP must be blocked, got status=${res.status}`
  );
});

test("Bonus: ipFilterModeSchema accepts whitelist-priority", async () => {
  const { ipFilterModeSchema } = await import("../../../src/shared/validation/schemas/misc.ts");
  const result = ipFilterModeSchema.safeParse("whitelist-priority");
  assert.equal(
    result.success,
    true,
    `ipFilterModeSchema must accept "whitelist-priority", got: ${JSON.stringify(result)}`
  );
});
