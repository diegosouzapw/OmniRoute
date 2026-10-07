/**
 * Issue #11535 — protocol-clients E2E must boot a peer-stamped, open-bootstrap server.
 *
 * The suite's harness (`scripts/dev/run-protocol-clients-tests.mjs`) used to spawn
 * `run-next-playwright.mjs dev`, which runs the plain `next dev` CLI. That flavour of
 * server never writes the trusted PEER_IP_HEADER stamp (only the custom Node server in
 * `run-next.mjs` does), so `resolveStampedPeer()` returns null and the LOCAL_ONLY gate
 * fails closed → every request to `/api/mcp/audit` answered 403 where the test accepts
 * 200|401. Swapping the boot target to `run-next.mjs` fixes locality, but would go
 * "green shallow": `bootstrap-env.mjs` deliberately drops empty strings from env, so an
 * `.env`/server.env `INITIAL_PASSWORD` would leak back in and the audit block would
 * silently never execute (401). These source contracts pin both halves of the fix:
 *
 *   1. the harness boots `run-next.mjs dev` (peer stamping present on this path);
 *   2. `run-next.mjs` applies the E2E "open" bootstrap AFTER merging persisted/.env
 *      credentials into process.env, clearing them so the suite exercises 200.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const harnessSource = readFileSync(
  join(repoRoot, "scripts", "dev", "run-protocol-clients-tests.mjs"),
  "utf8"
);
const runNextSource = readFileSync(join(repoRoot, "scripts", "dev", "run-next.mjs"), "utf8");

describe("protocol clients E2E harness (#11535)", () => {
  it("boots the peer-stamped custom server (run-next.mjs), not the bare next CLI", () => {
    assert.ok(
      harnessSource.includes('"scripts/dev/run-next.mjs"'),
      "harness must spawn scripts/dev/run-next.mjs so requests carry the trusted peer-IP stamp"
    );
    assert.ok(
      !harnessSource.includes("run-next-playwright.mjs"),
      "harness must not boot via run-next-playwright.mjs (plain next dev has no peer stamping)"
    );
  });

  it("still passes the isolated port/data-dir/open-mode env to the spawned server", () => {
    // The harness relies on these env vars to isolate the run and disable auth;
    // swapping the boot target must not drop them.
    for (const key of [
      "DATA_DIR:",
      "PORT:",
      "DASHBOARD_PORT:",
      "OMNIROUTE_E2E_BOOTSTRAP_MODE",
      // Under the programmatic next() entry, middleware nextUrl.hostname mirrors the
      // configured HOST — an unpinned "0.0.0.0" bind makes apiAuth treat loopback
      // requests as remote, so the open-bootstrap anonymous allow never fires.
      '"127.0.0.1"',
    ]) {
      assert.ok(harnessSource.includes(key), `testEnv must still define ${key}`);
    }
  });

  it("run-next.mjs stamps the real TCP peer IP into its request listener", () => {
    const listenerIdx = runNextSource.indexOf("http.createServer(");
    const stampIdx = runNextSource.indexOf("stampPeerIp(req)");
    assert.notEqual(listenerIdx, -1, "custom http.createServer listener expected");
    assert.notEqual(stampIdx, -1, "stampPeerIp(req) call expected");
    assert.ok(
      stampIdx > listenerIdx,
      "stampPeerIp must be wired inside/after the request listener setup"
    );
    assert.ok(runNextSource.includes("ensurePeerStampToken()"), "per-process token required");
  });

  it("run-next.mjs applies the E2E open-mode credential clear AFTER the env merge", () => {
    const mergeLoopIdx = runNextSource.indexOf("Object.entries(mergedEnv)");
    const openModeIdx = runNextSource.indexOf('OMNIROUTE_E2E_BOOTSTRAP_MODE === "open"');
    assert.notEqual(mergeLoopIdx, -1, "mergedEnv application loop expected");
    assert.notEqual(openModeIdx, -1, "open-mode bootstrap hook missing");

    const openModeBlock = runNextSource.slice(Math.max(0, openModeIdx - 200));
    for (const key of ["INITIAL_PASSWORD", "OMNIROUTE_E2E_PASSWORD", "OMNIROUTE_API_KEY"]) {
      // Empty-string assignment, NOT delete: Next's env loader re-reads the repo .env
      // during app prepare() (after this hook), so an absent var would be re-populated
      // from the file and bcrypt-persisted by instrumentation — 401s everywhere.
      const cleared = new RegExp(`process\\.env\\.${key} = "";`).exec(openModeBlock);
      assert.ok(cleared, `open mode must set ${key} to "" after the bootstrap merge`);
      const deleted = new RegExp(`delete process\\.env\\.${key}`).exec(openModeBlock);
      assert.ok(!deleted, `open mode must not merely delete ${key} (dotenv would restore it)`);
    }
    // bootstrap-env.mjs filters empty strings, so the hook must run after the merge
    // loop that copies persisted/.env values into process.env — otherwise a CI .env
    // INITIAL_PASSWORD=CHANGEME would survive and the suite would go green shallow.
    assert.ok(
      openModeIdx > mergeLoopIdx,
      "open-mode hook must be positioned after the mergedEnv -> process.env loop"
    );
  });
});
