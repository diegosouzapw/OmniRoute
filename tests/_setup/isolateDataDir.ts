// Test-only DATA_DIR isolation.
//
// Loaded via `node --import ./tests/_setup/isolateDataDir.ts` from the test/mutation
// invocations (package.json test scripts, stryker.conf.json tap.nodeArgs, the
// quality.yml TIA step, and the CI test jobs) — NEVER from production. It MUST stay
// out of open-sse/utils/setupPolyfill.ts, which is also imported by production
// (bin/omniroute.mjs, proxyFetch.ts, proxyDispatcher.ts) where redirecting DATA_DIR
// would point the live SQLite DB at a throwaway temp dir.
//
// Why: node:test spawns a process per test file and Stryker spawns one per sandbox,
// but every process resolves DATA_DIR to the SAME default (~/.omniroute) when the env
// var is unset (see src/lib/dataPaths.ts::resolveDataDir). Concurrent processes then
// open the SAME on-disk storage.sqlite, causing cross-file state races: SQLite lock
// contention that hangs `test:unit` under high `--test-concurrency`, and the
// non-deterministic baseline that forced Stryker to `concurrency: 1`.
//
// Giving each process its own DATA_DIR under the OS temp dir removes the shared file,
// so concurrent test processes never collide. Tests that set DATA_DIR explicitly keep
// winning — this only fills in an isolated default when none was chosen.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// File logger worker threads can outlive a test's temporary DATA_DIR cleanup and then
// raise ENOENT/ENOTEMPTY after the test has already passed. Keep the global test default
// console-only; tests that cover file logging explicitly set APP_LOG_TO_FILE themselves.
process.env.APP_LOG_TO_FILE ||= "false";

if (!process.env.DATA_DIR) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-"));
  process.env.DATA_DIR = dir;

  // Best-effort cleanup so a long suite run does not leak hundreds of temp DBs.
  process.on("exit", () => {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // ignore — the OS reaps its temp dir eventually.
    }
  });
}

// Plugin-dir guard: the plugin scanner (src/lib/plugins/scanner.ts) resolves its directory
// from OMNIROUTE_PLUGINS_DIR, else from HOME, which would point every test process at the
// developer's real ~/.omniroute/plugins (scanned, and loaded, by the chat pipeline). Keep it
// under the isolated DATA_DIR unless the caller already chose a directory; a blank value
// counts as unset, matching the scanner's own trim.
process.env.OMNIROUTE_PLUGINS_DIR =
  process.env.OMNIROUTE_PLUGINS_DIR?.trim() || path.join(process.env.DATA_DIR!, "plugins");

// System-trust guard: the suite must NEVER mutate the OS trust store. On a
// persistent self-hosted runner the cert-flow integration test installed a fake
// 105-byte PEM into /usr/local/share/ca-certificates and update-ca-certificates
// baked it into the bundle, breaking ALL system TLS on the VM (2026-07-05).
// installCert/uninstallCert/installTproxyCa/uninstallTproxyCa no-op under this.
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";

// Browser-spawn guard: the Adobe Firefly session warm (adobeFireflySession.ts)
// spawns the SYSTEM Chrome with --remote-debugging-port whenever a test reaches it
// without a valid user JWT — which any mocked-fetch test does by construction.
// Per-call-site allowBrowserRefresh/tryBrowser flags are not enough: the warm is also
// reachable indirectly via client/handler paths, so the guard must be global.
// ||= (not =) so a browser-path integration test can still opt back in. The
// hard `= "0"` override (tests/_setup/disableAdobeBrowser.ts, #14876) is imported
// directly by the Firefly unit files only — importing it here would erase that opt-in.
process.env.ADOBE_FIREFLY_BROWSER_REFRESH ||= "0";

// DNS-write guard: the suite must NEVER mutate /etc/hosts. Tests that exercise
// the real MITM path call addDNSEntries(); this env var makes it a no-op.
process.env.OMNIROUTE_SKIP_DNS_WRITE = "1";

// Decision-layer hermeticity: the Jev integration lanes default to engaging
// whenever a classifier credential resolves, and the credential is read from the
// process env first (OMNIROUTE_JEV_API_KEY / TYPESAFE_API_KEY). Developer shells
// managed by agents (omp exports TYPESAFE_API_KEY from ~/.omp/agent/.env) would
// therefore silently switch production-path tests onto the decision lanes and
// break contracts pinned before the integration existed. Tests that exercise the
// lanes set these variables explicitly per test; everything else must see none.
for (const key of Object.keys(process.env)) {
  if (
    key.startsWith("OMNIROUTE_JEV_") ||
    key === "TYPESAFE_API_KEY" ||
    key === "TYPESAFE_BASE_URL"
  ) {
    delete process.env[key];
  }
}
