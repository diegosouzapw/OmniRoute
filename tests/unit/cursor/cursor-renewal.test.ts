/**
 * Cursor renewal orchestrator (src/lib/cursor/renewal.ts) and the generic
 * keyed-mutex primitive (src/shared/utils/keyedMutex.ts) it builds on.
 *
 * None of runCursorAgentNudge()/checkCursorAgentAvailability()/
 * renewCursorConnection() accept an injectable binary/dependency, and this
 * tsx/ESM + Node native test-runner setup has no mock.module() support (see
 * tests/unit/token-health-check-sweep.test.ts). So instead of mocking:
 *   - runCursorAgentNudge(binary, timeoutMs) DOES take `binary` as a direct
 *     parameter, so it is fully testable with a real spawned fake script.
 *   - checkCursorAgentAvailability()/renewCursorConnection() resolve their
 *     own binary via resolveCursorAgentBinary({allowPathFallback:false}),
 *     whose FIRST fixed candidate is `~/.local/bin/cursor-agent` (HOME-
 *     relative). Overriding HOME (same technique already established in
 *     tests/unit/cursor-token-extractor.test.ts for tryAgentAuth/tryIdeAuth)
 *     lets a real fake script at that path shadow any ambient real
 *     cursor-agent install (confirmed present on at least one dev machine,
 *     at /opt/homebrew/bin/cursor-agent — see cursor-agent-models.test.ts).
 *   - tryIdeAuth()/tryAgentAuth() (Task 1) are similarly HOME-relative and
 *     controlled via real fixture files, exactly as in
 *     tests/unit/cursor-token-extractor.test.ts.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  runCursorAgentNudge,
  checkCursorAgentAvailability,
  getCachedCursorAgentAvailability,
  renewCursorConnection,
  buildCursorRenewedUpdate,
  runCursorRenewalExclusive,
  CURSOR_TOKEN_LIFETIME_S,
} from "@/lib/cursor/renewal";
import { createKeyedMutex } from "@/shared/utils/keyedMutex";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

function deferred<T = void>(): { promise: Promise<T>; resolve: (v: T) => void } {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

// A single fake "cursor-agent" binary driven entirely by env vars, so one
// script file covers every branch this suite needs (status modes, the
// --list-models nudge, and a hang-then-optionally-ignore-SIGTERM mode for
// spawn-timing tests). Invocation args are appended to FAKE_CURSOR_AGENT_LOG
// (one JSON array per line) so tests can assert exactly what was spawned,
// and how many times.
const FAKE_CURSOR_AGENT_SCRIPT = `#!/usr/bin/env node
const fs = require("fs");
const args = process.argv.slice(2);
if (process.env.FAKE_CURSOR_AGENT_LOG) {
  fs.appendFileSync(process.env.FAKE_CURSOR_AGENT_LOG, JSON.stringify(args) + "\\n");
}
if (process.env.FAKE_CURSOR_AGENT_HANG === "1") {
  if (process.env.FAKE_CURSOR_AGENT_IGNORE_SIGTERM === "1") {
    process.on("SIGTERM", () => {});
  }
  const selfExitMs = process.env.FAKE_CURSOR_AGENT_SELF_EXIT_MS;
  if (selfExitMs) {
    setTimeout(() => process.exit(0), Number(selfExitMs));
  } else {
    setInterval(() => {}, 60000);
  }
} else if (args[0] === "status") {
  const mode = process.env.FAKE_CURSOR_AGENT_STATUS_MODE || "authenticated";
  if (mode === "authenticated") {
    process.stdout.write(JSON.stringify({ status: "authenticated", isAuthenticated: true }));
  } else if (mode === "unauthenticated") {
    process.stdout.write(JSON.stringify({ status: "unauthenticated", isAuthenticated: false }));
  } else if (mode === "garbage") {
    process.stdout.write("not json output at all");
  } else if (mode === "legacy-unauthenticated") {
    process.stderr.write("Error: Not logged in. Run 'cursor-agent login' to authenticate.");
  }
}
`;

function writeFakeCursorAgentBinary(destPath: string): void {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, FAKE_CURSOR_AGENT_SCRIPT, { mode: 0o755 });
  fs.chmodSync(destPath, 0o755);
}

function readLoggedInvocations(logPath: string): string[][] {
  if (!fs.existsSync(logPath)) return [];
  return fs
    .readFileSync(logPath, "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function clearFakeCursorAgentEnv(): void {
  delete process.env.FAKE_CURSOR_AGENT_LOG;
  delete process.env.FAKE_CURSOR_AGENT_STATUS_MODE;
  delete process.env.FAKE_CURSOR_AGENT_HANG;
  delete process.env.FAKE_CURSOR_AGENT_IGNORE_SIGTERM;
  delete process.env.FAKE_CURSOR_AGENT_SELF_EXIT_MS;
}

describe("runCursorAgentNudge", () => {
  let tmpDir: string;
  let binary: string;
  let logPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-nudge-"));
    binary = path.join(tmpDir, "cursor-agent");
    writeFakeCursorAgentBinary(binary);
    logPath = path.join(tmpDir, "log.jsonl");
    process.env.FAKE_CURSOR_AGENT_LOG = logPath;
  });

  afterEach(() => {
    clearFakeCursorAgentEnv();
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it('invokes the binary with exactly ["--list-models"] and never "login"', async () => {
    const result = await runCursorAgentNudge(binary, 2000);
    assert.equal(result.code, 0);
    const invocations = readLoggedInvocations(logPath);
    assert.equal(invocations.length, 1);
    assert.deepEqual(invocations[0], ["--list-models"]);
  });

  it('dedupes two concurrent calls under the "nudge" key (spawn invoked exactly once)', async () => {
    const [r1, r2] = await Promise.all([
      runCursorAgentNudge(binary, 2000),
      runCursorAgentNudge(binary, 2000),
    ]);
    assert.equal(r1, r2, "both callers must share the exact same in-flight promise/result");
    assert.equal(readLoggedInvocations(logPath).length, 1, "underlying spawn invoked exactly once");
  });

  it("SIGTERMs at the timeout and SIGKILLs when the process ignores SIGTERM", async () => {
    // 600ms/200ms — see tests/unit/cursor-agent-models.test.ts for why a
    // freshly-spawned node process needs real wall-clock margin before its
    // SIGTERM handler is guaranteed to be registered in this environment.
    process.env.FAKE_CURSOR_AGENT_HANG = "1";
    process.env.FAKE_CURSOR_AGENT_IGNORE_SIGTERM = "1";
    const start = Date.now();
    const result = await runCursorAgentNudge(binary, 600);
    const elapsed = Date.now() - start;
    assert.equal(result.signal, "SIGKILL");
    assert.ok(
      elapsed >= 600,
      `expected SIGKILL only after the 600ms SIGTERM timeout, got ${elapsed}ms`
    );
    assert.ok(elapsed < 10_000, `expected the SIGKILL follow-up well under 10s, got ${elapsed}ms`);
  });
});

describe("checkCursorAgentAvailability", () => {
  const ORIGINAL_HOME = process.env.HOME;
  const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
  let tmpHome: string;
  let binaryPath: string;
  let logPath: string;

  beforeEach(() => {
    tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-avail-"));
    process.env.HOME = tmpHome;
    process.env.USERPROFILE = tmpHome;
    binaryPath = path.join(tmpHome, ".local", "bin", "cursor-agent");
    writeFakeCursorAgentBinary(binaryPath);
    logPath = path.join(tmpHome, "log.jsonl");
    process.env.FAKE_CURSOR_AGENT_LOG = logPath;
  });

  afterEach(() => {
    process.env.HOME = ORIGINAL_HOME;
    if (ORIGINAL_USERPROFILE !== undefined) process.env.USERPROFILE = ORIGINAL_USERPROFILE;
    else delete process.env.USERPROFILE;
    clearFakeCursorAgentEnv();
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("reports available:true when the resolved binary is authenticated", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
    const result = await checkCursorAgentAvailability();
    assert.equal(result.available, true);
    assert.equal(result.binaryPath, binaryPath);
  });

  it("reports available:false when the resolved binary reports unauthenticated", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated";
    const result = await checkCursorAgentAvailability();
    assert.equal(result.available, false);
    assert.equal(result.binaryPath, binaryPath);
  });

  it("reports available:true (legacy-authenticated) on unparseable stdout with no auth-required signal", async () => {
    // Mirrors fetchCursorAgentModels()'s legacy fallback convention in
    // cursorAgent.ts: an older CLI release predating `--format json` support
    // on `status` still produces some non-JSON output, but absent an
    // explicit "not authenticated" signal, the binary is treated as available.
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "garbage";
    const result = await checkCursorAgentAvailability();
    assert.equal(result.available, true);
    assert.equal(result.binaryPath, binaryPath);
  });

  it("reports available:false (legacy-unauthenticated) when unparseable stdout/stderr matches the auth-required pattern", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "legacy-unauthenticated";
    const result = await checkCursorAgentAvailability();
    assert.equal(result.available, false);
    assert.equal(result.binaryPath, binaryPath);
  });

  it("never invokes --list-models from this code path", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
    await checkCursorAgentAvailability();
    for (const args of readLoggedInvocations(logPath)) {
      assert.ok(
        !args.includes("--list-models"),
        `unexpected --list-models in ${JSON.stringify(args)}`
      );
    }
  });

  it('dedupes two concurrent calls under the "status" key (spawn invoked exactly once)', async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
    const [r1, r2] = await Promise.all([
      checkCursorAgentAvailability(),
      checkCursorAgentAvailability(),
    ]);
    assert.deepEqual(r1, r2);
    assert.equal(readLoggedInvocations(logPath).length, 1);
  });

  it('a nudge racing an availability check invokes the spawn TWICE — "nudge" and "status" never share a key (regression: discarded-renewal coalescing bug)', async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
    await Promise.all([runCursorAgentNudge(binaryPath, 2000), checkCursorAgentAvailability()]);
    assert.equal(readLoggedInvocations(logPath).length, 2);
  });

  describe("when no fixed candidate resolves to a real binary", () => {
    const candidates = [
      "/root/.local/bin/cursor-agent",
      "/usr/local/bin/cursor-agent",
      "/usr/bin/cursor-agent",
      "/opt/homebrew/bin/cursor-agent",
    ];
    const ambient = candidates.find((c) => fs.existsSync(c)) ?? null;

    it(
      "reports available:false, binaryPath:null, and never spawns",
      {
        skip: ambient
          ? `ambient cursor-agent install detected at ${ambient} on this host — ` +
            "resolveCursorAgentBinary has no DI seam for its other hardcoded absolute " +
            "candidates, so this branch cannot be made hermetic here; passes in a clean " +
            "CI container without cursor-agent installed"
          : false,
      },
      async () => {
        fs.rmSync(binaryPath); // remove the fake binary this describe block's beforeEach created
        const result = await checkCursorAgentAvailability();
        assert.equal(result.available, false);
        assert.equal(result.binaryPath, null);
        assert.equal(
          readLoggedInvocations(logPath).length,
          0,
          "must not spawn when nothing is found"
        );
      }
    );
  });
});

describe("getCachedCursorAgentAvailability (Task 5 Step 1 — 5-minute TTL wrapper for UI callers)", () => {
  const ORIGINAL_HOME = process.env.HOME;
  const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
  const CACHE_TTL_MS = 5 * 60 * 1000; // mirrors CURSOR_AGENT_AVAILABILITY_CACHE_TTL_MS in renewal.ts
  let tmpHome: string;
  let logPath: string;

  beforeEach(() => {
    tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-avail-cache-"));
    process.env.HOME = tmpHome;
    process.env.USERPROFILE = tmpHome;
    writeFakeCursorAgentBinary(path.join(tmpHome, ".local", "bin", "cursor-agent"));
    logPath = path.join(tmpHome, "log.jsonl");
    process.env.FAKE_CURSOR_AGENT_LOG = logPath;
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
  });

  afterEach(() => {
    process.env.HOME = ORIGINAL_HOME;
    if (ORIGINAL_USERPROFILE !== undefined) process.env.USERPROFILE = ORIGINAL_USERPROFILE;
    else delete process.env.USERPROFILE;
    clearFakeCursorAgentEnv();
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  // A single test, one continuous mocked timeline: getCachedCursorAgentAvailability()'s
  // module-level cache has no exported reset hook and persists for the life of the
  // process, so two separate `it()` blocks each assuming a "fresh" cache would be
  // order-dependent (a later test could silently inherit an earlier test's still-valid
  // cache entry, since node:test's per-test mock-timer teardown restores the REAL clock
  // between tests, not the fake one — the leftover `expiresAt` would still be far in
  // that real future). Keeping both assertions on one uninterrupted fake clock avoids that.
  it("reuses the cached result within the TTL window, then spawns exactly once more after it expires", async (t) => {
    t.mock.timers.enable({ apis: ["Date"] });

    const first = await getCachedCursorAgentAvailability();
    assert.equal(readLoggedInvocations(logPath).length, 1, "the first call must spawn");

    t.mock.timers.tick(CACHE_TTL_MS - 1000); // still inside the window
    const second = await getCachedCursorAgentAvailability();
    assert.deepEqual(first, second);
    assert.equal(
      readLoggedInvocations(logPath).length,
      1,
      "still within the TTL — no second spawn"
    );

    t.mock.timers.tick(2000); // now past the TTL (cumulative: TTL + 1000ms)
    await getCachedCursorAgentAvailability();
    assert.equal(
      readLoggedInvocations(logPath).length,
      2,
      "expiry must trigger exactly one fresh spawn"
    );
  });
});

describe("renewCursorConnection", () => {
  const ORIGINAL_HOME = process.env.HOME;
  const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
  let originalPlatformDescriptor: PropertyDescriptor | undefined;
  let tmpHome: string;
  let binaryPath: string;
  let logPath: string;

  beforeEach(() => {
    originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
    Object.defineProperty(process, "platform", { value: "darwin", configurable: true });

    tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-renew-"));
    process.env.HOME = tmpHome;
    process.env.USERPROFILE = tmpHome;

    binaryPath = path.join(tmpHome, ".local", "bin", "cursor-agent");
    writeFakeCursorAgentBinary(binaryPath);
    logPath = path.join(tmpHome, "log.jsonl");
    process.env.FAKE_CURSOR_AGENT_LOG = logPath;
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "authenticated";
  });

  afterEach(() => {
    if (originalPlatformDescriptor) {
      Object.defineProperty(process, "platform", originalPlatformDescriptor);
    }
    process.env.HOME = ORIGINAL_HOME;
    if (ORIGINAL_USERPROFILE !== undefined) process.env.USERPROFILE = ORIGINAL_USERPROFILE;
    else delete process.env.USERPROFILE;
    clearFakeCursorAgentEnv();
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  async function writeIdeToken(accessToken: string, machineId?: string): Promise<void> {
    const { openDatabaseAsync } = await import("@/lib/db/adapters/driverFactory");
    const dbPath = path.join(
      tmpHome,
      "Library/Application Support/Cursor/User/globalStorage/state.vscdb"
    );
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const seed = await openDatabaseAsync(dbPath);
    seed.exec("CREATE TABLE itemTable (key TEXT PRIMARY KEY, value TEXT)");
    seed
      .prepare("INSERT INTO itemTable (key, value) VALUES (?, ?)")
      .run("cursorAuth/accessToken", accessToken);
    if (machineId) {
      seed
        .prepare("INSERT INTO itemTable (key, value) VALUES (?, ?)")
        .run("storage.serviceMachineId", machineId);
    }
    seed.close();
  }

  function writeAgentToken(accessToken: string): void {
    const authDir = path.join(tmpHome, ".config", "cursor");
    fs.mkdirSync(authDir, { recursive: true });
    fs.writeFileSync(path.join(authDir, "auth.json"), JSON.stringify({ accessToken }));
  }

  async function updateIdeToken(accessToken: string): Promise<void> {
    const { openDatabaseAsync } = await import("@/lib/db/adapters/driverFactory");
    const dbPath = path.join(
      tmpHome,
      "Library/Application Support/Cursor/User/globalStorage/state.vscdb"
    );
    const db = await openDatabaseAsync(dbPath);
    db.prepare("INSERT OR REPLACE INTO itemTable (key, value) VALUES (?, ?)").run(
      "cursorAuth/accessToken",
      accessToken
    );
    db.close();
  }

  it("(a) cursor-agent unavailable + IDE re-scrape finds a new token -> renewed via cursor-ide", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated"; // cursor-agent "unavailable"
    await writeIdeToken("new-ide-token", "machine-1");

    const result = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(result, {
      status: "renewed",
      accessToken: "new-ide-token",
      machineId: "machine-1",
      source: "cursor-ide",
    });

    const invocations = readLoggedInvocations(logPath);
    assert.ok(
      !invocations.some((args) => args.includes("--list-models")),
      "the nudge must never fire when cursor-agent is unavailable"
    );
  });

  it("(b) IDE unchanged but cursor-agent's own token differs -> renewed via cursor-agent (regression: discarded-renewal)", async () => {
    await writeIdeToken("old-token", "machine-1"); // IDE reports the SAME token as current
    writeAgentToken("new-agent-token"); // agent's independent session differs

    const result = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(result, {
      status: "renewed",
      accessToken: "new-agent-token",
      source: "cursor-agent",
    });

    const invocations = readLoggedInvocations(logPath);
    assert.ok(
      invocations.some((args) => args.includes("--list-models")),
      "cursor-agent was authenticated/available, so the nudge should have been attempted"
    );
  });

  it("(c) both sources report the same token as current -> unchanged", async () => {
    await writeIdeToken("old-token", "machine-1");
    writeAgentToken("old-token");

    const result = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(result, { status: "unchanged" });
  });

  it("both sources report not-found (no throw) -> unchanged, not error", async () => {
    // Neither writeIdeToken nor writeAgentToken called: tryIdeAuth()/
    // tryAgentAuth() gracefully report {found:false} (see
    // tests/unit/cursor-token-extractor.test.ts), which renewCursorConnection
    // treats identically to "found but unchanged": unchanged, never error.
    const result = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(result, { status: "unchanged" });
  });

  it("(d) both sources fail/throw -> error with a sanitized message (via the deps injection seam)", async () => {
    // renewCursorConnection()'s 3rd `deps` param is a testability seam added
    // specifically because tryIdeAuth()/tryAgentAuth() never throw for real
    // (they catch everything internally) — see src/lib/cursor/renewal.ts's
    // doc comment on the `deps` parameter.
    const rawMessage =
      "Failed to read Cursor IDE database at " +
      "/Users/secret-user/project/src/lib/cursor/tokenExtractor.ts:284:15 - permission denied";
    const throwingTryIdeAuth = async (): Promise<never> => {
      throw new Error(rawMessage);
    };
    const throwingTryAgentAuth = async (): Promise<never> => {
      throw new Error(rawMessage);
    };

    const result = await renewCursorConnection(
      { accessToken: "old-token" },
      {
        tryIdeAuth: throwingTryIdeAuth,
        tryAgentAuth: throwingTryAgentAuth,
        // Keep this branch isolated from any real/fake spawn — the point of
        // this test is the outer catch around tryIdeAuth/tryAgentAuth.
        checkCursorAgentAvailability: async () => ({ available: false, binaryPath: null }),
      }
    );

    assert.equal(result.status, "error");
    if (result.status !== "error") return; // narrows for TS below
    assert.equal(
      result.error,
      sanitizeErrorMessage(rawMessage),
      "must be routed through sanitizeErrorMessage(), matching this repo's error-sanitization convention"
    );
    assert.ok(
      !result.error.includes("/Users/secret-user"),
      `raw absolute path must not survive sanitization, got: ${result.error}`
    );
    assert.ok(
      !result.error.includes("tokenExtractor.ts:284:15"),
      `raw source path must not survive sanitization, got: ${result.error}`
    );
    assert.ok(
      result.error.includes("<path>"),
      "the absolute path must be replaced with the <path> placeholder"
    );
  });

  it("(e) never invokes cursor-agent with a login argument", async () => {
    await writeIdeToken("new-ide-token-2");
    writeAgentToken("new-agent-token-2");
    await renewCursorConnection({ accessToken: "old-token" });

    for (const args of readLoggedInvocations(logPath)) {
      assert.ok(!args.includes("login"), `unexpected "login" argument in ${JSON.stringify(args)}`);
    }
  });

  it("(f) the availability check's own spawn never uses --list-models, even inside the full orchestrator", async () => {
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated";
    await renewCursorConnection({ accessToken: "old-token" });

    const statusCalls = readLoggedInvocations(logPath).filter((args) => args[0] === "status");
    assert.ok(statusCalls.length >= 1, "expected at least one status check");
    for (const args of statusCalls) {
      assert.ok(!args.includes("--list-models"));
    }
  });

  it("a crashing/unresponsive cursor-agent nudge degrades gracefully and still re-scrapes (does not abort the renewal)", async () => {
    // The nudge (--list-models) hangs forever; runCursorAgentNudge's own
    // sigkillFollowupMs eventually reaps it, but renewCursorConnection's
    // try/catch around the nudge call means this must not block/fail the
    // overall renewal — the IDE re-scrape below must still run and win.
    process.env.FAKE_CURSOR_AGENT_HANG = "1";
    process.env.FAKE_CURSOR_AGENT_IGNORE_SIGTERM = "0"; // exits on the very first SIGTERM
    process.env.FAKE_CURSOR_AGENT_SELF_EXIT_MS = "50";
    await writeIdeToken("new-ide-token-after-nudge-timeout", "machine-9");

    const result = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(result, {
      status: "renewed",
      accessToken: "new-ide-token-after-nudge-timeout",
      machineId: "machine-9",
      source: "cursor-ide",
    });
  });

  it("(g) dedupes tryIdeAuth() across near-simultaneous calls (PERF-001): a stale cached result is served within the TTL, then a fresh one after it expires", async (t) => {
    // Simulates multiple Cursor connections becoming due for renewal in the
    // same sweep tick: renewCursorConnection() is called back-to-back for
    // the SAME host, so the second call must reuse the first's in-flight/
    // recently-resolved tryIdeAuth() result rather than re-opening
    // state.vscdb — this is a resource-usage guard (PERF-001), not a
    // correctness fix. Uses fake timers on `Date` (same technique as
    // getCachedCursorAgentAvailability's TTL test) since renewal.ts's dedup
    // cache is keyed on Date.now(), not a mockable timer/interval.
    t.mock.timers.enable({ apis: ["Date"] });
    process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated"; // skip the nudge; isolate the IDE-cache behavior

    await writeIdeToken("token-A", "machine-a");

    const first = await renewCursorConnection({ accessToken: "old-token" });
    assert.deepEqual(first, {
      status: "renewed",
      accessToken: "token-A",
      machineId: "machine-a",
      source: "cursor-ide",
    });

    // Underlying file now has a NEW token, but a second call within the TTL
    // must still observe the CACHED "token-A" — proven by comparing against
    // current.accessToken: "token-A" (the first result) reads as unchanged
    // only if the cache is actually being served instead of a fresh re-scrape.
    await updateIdeToken("token-B");
    t.mock.timers.tick(2000); // well within the 5s dedup TTL
    const second = await renewCursorConnection({ accessToken: "token-A" });
    assert.deepEqual(
      second,
      { status: "unchanged" },
      "expected the cached (stale) tryIdeAuth() result, not a fresh state.vscdb read"
    );

    // Past the TTL, the next call must re-open the file and observe "token-B".
    t.mock.timers.tick(4000); // cumulative 6s, past the 5s TTL
    const third = await renewCursorConnection({ accessToken: "token-A" });
    assert.deepEqual(third, {
      status: "renewed",
      accessToken: "token-B",
      machineId: "machine-a",
      source: "cursor-ide",
    });
  });
});

describe("buildCursorRenewedUpdate", () => {
  const NOW = "2026-07-31T12:00:00.000Z";

  it("computes a fresh ~24h expiry, sets testStatus active, and clears error/retry fields", () => {
    const update = buildCursorRenewedUpdate(
      {
        providerSpecificData: {
          machineId: "old-machine",
          refreshCircuit: { streak: 3 },
          foo: "bar",
        },
      },
      { status: "renewed", accessToken: "tok", machineId: "new-machine", source: "cursor-ide" },
      NOW
    );

    const expectedExpiresAt = new Date(
      Date.parse(NOW) + CURSOR_TOKEN_LIFETIME_S * 1000
    ).toISOString();
    assert.equal(update.accessToken, "tok");
    assert.equal(update.expiresAt, expectedExpiresAt);
    assert.equal(update.tokenExpiresAt, expectedExpiresAt);
    assert.equal(update.testStatus, "active");
    assert.equal(update.lastHealthCheckAt, NOW);
    assert.equal(update.lastError, null);
    assert.equal(update.lastErrorAt, null);
    assert.equal(update.lastErrorType, null);
    assert.equal(update.lastErrorSource, null);
    assert.equal(update.errorCode, null);
    assert.equal(update.expiredRetryCount, null);
    assert.equal(update.expiredRetryAt, null);

    const psd = update.providerSpecificData as Record<string, unknown>;
    assert.equal(psd.machineId, "new-machine");
    assert.equal(psd.foo, "bar");
    assert.equal(psd.refreshCircuit, undefined, "refreshCircuit must be cleared");
  });

  it("preserves the existing machineId when the renewal result has none", () => {
    const update = buildCursorRenewedUpdate(
      { providerSpecificData: { machineId: "keep-me" } },
      { status: "renewed", accessToken: "tok", source: "cursor-agent" },
      NOW
    );
    assert.equal((update.providerSpecificData as Record<string, unknown>).machineId, "keep-me");
  });

  it("handles a connection with no prior providerSpecificData", () => {
    const update = buildCursorRenewedUpdate(
      {},
      { status: "renewed", accessToken: "tok", source: "cursor-ide" },
      NOW
    );
    assert.deepEqual(update.providerSpecificData, {});
  });
});

describe("createKeyedMutex", () => {
  it("serializes calls for the same key: the second fn does not start until the first settles, and each caller gets its own result", async () => {
    const mutex = createKeyedMutex<string>();
    const events: string[] = [];
    const gate = deferred();

    const p1 = mutex.run("k", async () => {
      events.push("first-start");
      await gate.promise;
      events.push("first-end");
      return "first-result";
    });

    await new Promise((r) => setTimeout(r, 20));
    const p2 = mutex.run("k", async () => {
      events.push("second-start");
      return "second-result";
    });

    assert.deepEqual(events, ["first-start"], "second call must not have started yet");
    gate.resolve();

    const [r1, r2] = await Promise.all([p1, p2]);
    assert.equal(r1, "first-result");
    assert.equal(r2, "second-result");
    assert.deepEqual(events, ["first-start", "first-end", "second-start"]);
  });

  it("runs calls for different keys concurrently (no cross-key serialization)", async () => {
    const mutex = createKeyedMutex<string>();
    const events: string[] = [];
    const gateA = deferred();
    const gateB = deferred();

    const pA = mutex.run("a", async () => {
      events.push("a-start");
      await gateA.promise;
      return "a";
    });
    const pB = mutex.run("b", async () => {
      events.push("b-start");
      await gateB.promise;
      return "b";
    });

    await new Promise((r) => setTimeout(r, 20));
    assert.ok(events.includes("a-start"));
    assert.ok(events.includes("b-start"));

    gateA.resolve();
    gateB.resolve();
    const [ra, rb] = await Promise.all([pA, pB]);
    assert.equal(ra, "a");
    assert.equal(rb, "b");
  });
});

describe("runCursorRenewalExclusive", () => {
  it("two concurrent calls for the SAME connectionId each get their own fn's result, with correct execution ordering", async () => {
    const events: string[] = [];
    const gate = deferred();
    const connectionId = `conn-${Date.now()}-${Math.random()}`;

    const p1 = runCursorRenewalExclusive(connectionId, async () => {
      events.push("sweep-start");
      await gate.promise;
      events.push("sweep-end");
      return { kind: "sweep" };
    });

    await new Promise((r) => setTimeout(r, 20));
    const p2 = runCursorRenewalExclusive(connectionId, async () => {
      events.push("manual-start");
      return { kind: "manual" };
    });

    assert.deepEqual(
      events,
      ["sweep-start"],
      "the manual caller must not start until the sweep settles"
    );
    gate.resolve();

    const [r1, r2] = await Promise.all([p1, p2]);
    assert.deepEqual(r1, { kind: "sweep" });
    assert.deepEqual(r2, { kind: "manual" });
    assert.deepEqual(events, ["sweep-start", "sweep-end", "manual-start"]);
  });

  it("different connectionIds run concurrently without blocking each other", async () => {
    const events: string[] = [];
    const gateA = deferred();
    const gateB = deferred();
    const connA = `conn-a-${Date.now()}-${Math.random()}`;
    const connB = `conn-b-${Date.now()}-${Math.random()}`;

    const pA = runCursorRenewalExclusive(connA, async () => {
      events.push("a-start");
      await gateA.promise;
      return "a";
    });
    const pB = runCursorRenewalExclusive(connB, async () => {
      events.push("b-start");
      await gateB.promise;
      return "b";
    });

    await new Promise((r) => setTimeout(r, 20));
    assert.ok(events.includes("a-start"));
    assert.ok(events.includes("b-start"));

    gateA.resolve();
    gateB.resolve();
    const [ra, rb] = await Promise.all([pA, pB]);
    assert.equal(ra, "a");
    assert.equal(rb, "b");
  });
});
