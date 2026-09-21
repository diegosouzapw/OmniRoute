import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// #13717 turned the startup DB health/integrity check into an opt-in deferred
// (setImmediate) scan behind DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED, default
// off. Off must preserve the pre-#13717 behavior exactly: getDbInstance()
// blocks until the check has already run. On: getDbInstance() schedules the
// check via setImmediate and returns before it runs.
//
// Each case runs in its own subprocess (a fresh DATA_DIR, no shared migration
// state) rather than inside tests/unit/db-health-check.test.ts's per-test
// full-migration-reset harness, which is not built to interleave safely with
// this test's real DB opens. The subprocess script is written to a real .mjs
// file (not `node -e`): a monkeypatch of `globalThis.setImmediate` only
// reliably intercepts the call site's global lookup when the entry point is
// a loaded file, not an eval string.
const SCRIPT = `
import assert from 'node:assert/strict';
import path from 'node:path';
import Database from 'better-sqlite3';
const core = await import(process.env.OMNI_CORE_TS_PATH);
// Without a "test"-tokened argv/NODE_ENV, shouldRunStartupDbHealthCheck()
// (src/lib/db/core.ts) runs the check on EVERY getDbInstance() cold-open,
// not only when OMNIROUTE_FORCE_DB_HEALTHCHECK is set (that env only matters
// for a test-detected process). Both the flag override and the broken row
// are therefore written through a single raw better-sqlite3 connection that
// bypasses core.ts entirely, so exactly ONE getDbInstance() call happens
// afterward — the one this test observes — instead of the extra opens
// setFeatureFlagOverride()/getFeatureFlagOverride() would each trigger their
// own (harmless, but confounding) health check pass on.
try {
  core.getDbInstance();
  core.resetDbInstance();

  const sqliteFile = path.join(process.env.DATA_DIR, 'storage.sqlite');
  const raw = new Database(sqliteFile);
  if (process.env.OMNIROUTE_TEST_DEFERRED === '1') {
    raw.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('feature_flags', 'DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED', 'true')"
    ).run();
  }
  raw.prepare(
    "INSERT INTO quota_snapshots (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run('openai', 'missing-connection-id', 'monthly', 75, 0, new Date().toISOString());
  raw.close();

  if (process.env.OMNIROUTE_TEST_DEFERRED === '1') {
    // Deferred: getDbInstance() must schedule the check via setImmediate and
    // return BEFORE it runs, rather than run it inline. Whether the
    // scheduled check goes on to repair the row is a separate concern (it
    // can hit the same backup-gated abort the synchronous branch can —
    // orthogonal to #13717's own deferral mechanism; see
    // tests/unit/db-health-check.test.ts's "runs the startup health check
    // synchronously" test and the parameterized "backup ... blocks every
    // mutation" cases in db-health-resource-bounds.test.ts) and is covered
    // end-to-end by tests/unit/db-health-runner.test.ts's own
    // real-child-process repair test, so this test only proves the TIMING
    // contract: deferred, not inline.
    let scheduledDuringGetDbInstance = false;
    let scheduledCallback;
    const originalSetImmediate = globalThis.setImmediate;
    globalThis.setImmediate = (fn, ...args) => {
      scheduledDuringGetDbInstance = true;
      scheduledCallback = fn;
      return originalSetImmediate(fn, ...args);
    };
    try {
      const db = core.getDbInstance();
      const countNow = db.prepare('SELECT COUNT(*) AS n FROM quota_snapshots').get().n;
      assert.equal(countNow, 1, 'deferred mode must not block getDbInstance() on the repair');
      assert.equal(
        scheduledDuringGetDbInstance,
        true,
        'deferred mode must schedule the health check via setImmediate instead of running it inline'
      );
      assert.equal(typeof scheduledCallback, 'function');
    } finally {
      globalThis.setImmediate = originalSetImmediate;
    }
  } else {
    // Default (off): synchronous — repair has already run by the time
    // getDbInstance() returns, exactly like the pre-#13717 behavior.
    const db = core.getDbInstance();
    const countNow = db.prepare('SELECT COUNT(*) AS n FROM quota_snapshots').get().n;
    assert.equal(countNow, 0, 'default (non-deferred) startup repair must block getDbInstance()');
  }
} finally {
  await core.shutdownDbInstance();
}
`;

function runCase(deferred: "0" | "1") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "db-health-startup-deferred-"));
  // The probe script needs to `import 'better-sqlite3'` — a bare specifier
  // resolved by walking up from the script's own directory for a
  // node_modules — so it must live under this worktree, not os.tmpdir().
  fs.mkdirSync(path.join(process.cwd(), "_artifacts"), { recursive: true });
  const scratchDir = fs.mkdtempSync(path.join(process.cwd(), "_artifacts", "db-health-deferred-"));
  const scriptFile = path.join(scratchDir, "probe.mjs");
  fs.writeFileSync(scriptFile, SCRIPT);
  try {
    const child = spawnSync(process.execPath, ["--import", "tsx/esm", scriptFile], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATA_DIR: dir,
        // Deliberately NOT NODE_ENV=test / a "test"-tokened argv here:
        // isAutomatedTestProcess() (src/shared/utils/testProcess.ts) would
        // make createManagedDbBackup() a permanent no-op, so a startup
        // repair could never actually complete in either branch and this
        // test would only be able to assert on the abort path, not the real
        // repair-completes behavior the flag is gating the TIMING of. This
        // subprocess is otherwise fully isolated (its own DATA_DIR, own
        // process), so a real VACUUM INTO backup is safe here.
        NODE_ENV: undefined,
        APP_LOG_TO_FILE: "false",
        DISABLE_SQLITE_AUTO_BACKUP: "true",
        OMNIROUTE_TEST_DEFERRED: deferred,
        OMNI_CORE_TS_PATH: path.join(process.cwd(), "src/lib/db/core.ts"),
      },
      encoding: "utf8",
      timeout: 60000,
    });
    assert.equal(child.status, 0, `deferred=${deferred}\n${child.stdout}\n${child.stderr}`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(scratchDir, { recursive: true, force: true });
  }
}

test("startup health check blocks getDbInstance() by default (DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED off)", () => {
  runCase("0");
});

test("startup health check is deferred past getDbInstance() when DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED is on", () => {
  runCase("1");
});
