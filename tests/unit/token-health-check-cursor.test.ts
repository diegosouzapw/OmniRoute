/**
 * Task 3 — wiring the Cursor renewal orchestrator (src/lib/cursor/renewal.ts,
 * Task 2) into the proactive token health-check sweep (src/lib/tokenHealthCheck.ts
 * + src/lib/tokenHealthCheckCursor.ts).
 *
 * Real DB, real checkConnection()/checkCursorConnectionIfNeeded() — matching
 * this file family's existing convention (see
 * tests/unit/token-health-check.test.ts, tests/unit/token-health-no-refresh-token-expired-5326.test.ts):
 * a real SQLite DB under a temp DATA_DIR, real createProviderConnection()/
 * updateProviderConnection()/getProviderConnectionById() round-trips, no
 * mocking of the DB layer.
 *
 * checkCursorConnectionIfNeeded() calls the REAL renewCursorConnection()
 * (Task 2) with no deps override, so — exactly as in
 * tests/unit/cursor-renewal.test.ts — its dependencies are driven via real
 * HOME-relative fixture files and a real fake `cursor-agent` binary, never a
 * mock. This ALSO means the ambient real cursor-agent install on some dev
 * hosts (see tests/unit/cursor-agent-models.test.ts) must always be shadowed
 * by a fake binary here too, so no test in this file ever risks invoking a
 * real cursor-agent process.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hc-cursor-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");
const tokenHealthCheckCursor = await import("../../src/lib/tokenHealthCheckCursor.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code =
        error && typeof error === "object" && "code" in error
          ? (error as { code?: unknown }).code
          : null;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function getId(connection: { id?: unknown }): string {
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

async function freshConn(id: string) {
  const conn = await providersDb.getProviderConnectionById(id);
  assert.ok(conn, `expected connection ${id} to exist`);
  return conn as Record<string, unknown>;
}

// ---- Real fake cursor-agent binary + IDE/agent fixture helpers, mirroring
// tests/unit/cursor-renewal.test.ts and tests/unit/cursor-token-extractor.test.ts ----

const FAKE_CURSOR_AGENT_SCRIPT = `#!/usr/bin/env node
const fs = require("fs");
const args = process.argv.slice(2);
if (process.env.FAKE_CURSOR_AGENT_LOG) {
  fs.appendFileSync(process.env.FAKE_CURSOR_AGENT_LOG, JSON.stringify(args) + "\\n");
}
if (args[0] === "status") {
  const mode = process.env.FAKE_CURSOR_AGENT_STATUS_MODE || "unauthenticated";
  if (mode === "authenticated") {
    process.stdout.write(JSON.stringify({ status: "authenticated", isAuthenticated: true }));
  } else {
    process.stdout.write(JSON.stringify({ status: "unauthenticated", isAuthenticated: false }));
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

interface CursorEnv {
  tmpHome: string;
  logPath: string;
  writeIdeToken(accessToken: string, machineId?: string): Promise<void>;
  writeAgentToken(accessToken: string): void;
  cleanup(): void;
}

async function withCursorEnv<T>(fn: (env: CursorEnv) => Promise<T>): Promise<T> {
  const originalHome = process.env.HOME;
  const originalUserProfile = process.env.USERPROFILE;
  const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");

  Object.defineProperty(process, "platform", { value: "darwin", configurable: true });
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hc-cursor-env-"));
  process.env.HOME = tmpHome;
  process.env.USERPROFILE = tmpHome;

  const logPath = path.join(tmpHome, "log.jsonl");
  process.env.FAKE_CURSOR_AGENT_LOG = logPath;
  // Never authenticated by default — the point of these tests is the sweep
  // wiring/DB-update shapes (Task 2 already covers the nudge itself), and
  // this also guarantees the real ambient cursor-agent install some hosts
  // have is never the one actually resolved (this fake one always shadows
  // it, since it's the first fixed candidate resolveCursorAgentBinary checks).
  process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated";
  writeFakeCursorAgentBinary(path.join(tmpHome, ".local", "bin", "cursor-agent"));

  const env: CursorEnv = {
    tmpHome,
    logPath,
    async writeIdeToken(accessToken, machineId) {
      const { openDatabaseAsync } = await import("../../src/lib/db/adapters/driverFactory.ts");
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
    },
    writeAgentToken(accessToken) {
      const authDir = path.join(tmpHome, ".config", "cursor");
      fs.mkdirSync(authDir, { recursive: true });
      fs.writeFileSync(path.join(authDir, "auth.json"), JSON.stringify({ accessToken }));
    },
    cleanup() {
      if (originalPlatformDescriptor) {
        Object.defineProperty(process, "platform", originalPlatformDescriptor);
      }
      process.env.HOME = originalHome;
      if (originalUserProfile !== undefined) process.env.USERPROFILE = originalUserProfile;
      else delete process.env.USERPROFILE;
      delete process.env.FAKE_CURSOR_AGENT_LOG;
      delete process.env.FAKE_CURSOR_AGENT_STATUS_MODE;
      fs.rmSync(tmpHome, { recursive: true, force: true });
    },
  };

  try {
    return await fn(env);
  } finally {
    env.cleanup();
  }
}

const NEAR_EXPIRY_ISO = new Date(Date.now() + 60_000).toISOString(); // 1 min out (< 5 min buffer)
const PAST_EXPIRY_ISO = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1h ago
const FAR_FUTURE_ISO = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

async function createCursorConnection(overrides: Record<string, unknown> = {}) {
  const connection = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    email: "cursor-healthcheck@example.com",
    accessToken: "old-token",
    refreshToken: null,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
  return getId(connection);
}

// ============================================================================
// Step 2: checkCursorConnectionIfNeeded DB-update shapes
// ============================================================================

test("checkConnection: Cursor renewed-via-IDE result persists accessToken, ~24h expiry, active status, cleared error fields", async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: NEAR_EXPIRY_ISO,
      expiresAt: NEAR_EXPIRY_ISO,
      providerSpecificData: { machineId: "old-machine" },
    });
    await env.writeIdeToken("new-ide-token", "new-machine");

    const before = Date.now();
    await tokenHealthCheck.checkConnection(await freshConn(id));
    const after = Date.now();

    const updated = await freshConn(id);
    assert.equal(updated.accessToken, "new-ide-token");
    assert.equal(updated.testStatus, "active");
    assert.equal(updated.lastError ?? null, null);
    assert.equal(updated.lastErrorAt ?? null, null);
    assert.equal(updated.lastErrorType ?? null, null);
    assert.equal(updated.errorCode ?? null, null);
    assert.equal(updated.expiredRetryCount ?? null, null);
    assert.equal(updated.expiredRetryAt ?? null, null);
    assert.equal(updated.expiresAt, updated.tokenExpiresAt);

    const expiresAtMs = new Date(updated.expiresAt as string).getTime();
    assert.ok(
      expiresAtMs >= before + 24 * 60 * 60 * 1000 - 5000 &&
        expiresAtMs <= after + 24 * 60 * 60 * 1000 + 5000,
      `expected expiresAt ~24h out, got ${updated.expiresAt}`
    );

    const psd = updated.providerSpecificData as Record<string, unknown>;
    assert.equal(psd.machineId, "new-machine");
  });
});

test('checkConnection: Cursor "unchanged" result marks cursor_session_stale, stays non-terminal (testStatus active, not expired)', async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: NEAR_EXPIRY_ISO,
      expiresAt: NEAR_EXPIRY_ISO,
    });
    // No writeIdeToken/writeAgentToken -> both tokenExtractor functions
    // gracefully report {found:false} -> renewCursorConnection() returns "unchanged".
    void env;

    await tokenHealthCheck.checkConnection(await freshConn(id));

    const updated = await freshConn(id);
    assert.equal(updated.errorCode, "cursor_session_stale");
    assert.equal(updated.lastErrorType, "cursor_session_stale");
    assert.match(updated.lastError as string, /Cursor session unchanged/);
    assert.equal(
      updated.testStatus,
      "active",
      "must NOT be terminal — future sweeps must keep retrying"
    );
    assert.ok(updated.lastHealthCheckAt);
    const psd = updated.providerSpecificData as Record<string, unknown>;
    assert.equal((psd.refreshCircuit as { streak?: number })?.streak, 1);
  });
});

test('checkCursorConnectionIfNeeded: Cursor "error" result -> DB update shape (via the deps testability seam)', async () => {
  await resetStorage();
  const id = await createCursorConnection({
    accessToken: "old-token",
    tokenExpiresAt: NEAR_EXPIRY_ISO,
    expiresAt: NEAR_EXPIRY_ISO,
  });

  // Closes the gap the skipped test above used to document: checkCursorConnectionIfNeeded()
  // now forwards an optional `deps` param straight through to renewCursorConnection() (mirroring
  // the seam Task 2 added there), so this can force a {status:"error"} result directly instead
  // of going through tokenHealthCheck.checkConnection(), which has no deps param of its own.
  const rawMessage =
    "Failed to read Cursor IDE database at " +
    "/Users/secret-user/project/src/lib/cursor/tokenExtractor.ts:284:15 - permission denied";
  const throwingTryIdeAuth = async (): Promise<never> => {
    throw new Error(rawMessage);
  };
  const throwingTryAgentAuth = async (): Promise<never> => {
    throw new Error(rawMessage);
  };

  const errors: string[] = [];
  const warnings: string[] = [];
  const now = new Date().toISOString();

  await tokenHealthCheckCursor.checkCursorConnectionIfNeeded({
    conn: await freshConn(id),
    now,
    buildRefreshFailureUpdate: tokenHealthCheck.buildRefreshFailureUpdate,
    log: () => {},
    logWarn: (message: string) => warnings.push(message),
    logError: (message: string) => errors.push(message),
    getConnectionLogLabel: (c) => String(c.email ?? c.id ?? "unknown"),
    logPrefix: "[test]",
    deps: {
      tryIdeAuth: throwingTryIdeAuth,
      tryAgentAuth: throwingTryAgentAuth,
      checkCursorAgentAvailability: async () => ({ available: false, binaryPath: null }),
    },
  });

  const updated = await freshConn(id);
  assert.equal(updated.errorCode, "cursor_session_stale");
  assert.equal(updated.lastErrorType, "cursor_session_stale");
  assert.match(updated.lastError as string, /Cursor session renewal failed:/);
  assert.equal(
    updated.testStatus,
    "active",
    "must NOT be terminal — future sweeps must keep retrying"
  );
  assert.ok(updated.lastHealthCheckAt);

  assert.equal(errors.length, 1, "the error branch must log via logError, not logWarn");
  assert.equal(warnings.length, 0);
  assert.ok(
    !errors[0].includes("/Users/secret-user"),
    `raw absolute path must not survive sanitization, got: ${errors[0]}`
  );
});

// ============================================================================
// Step 1: buildRefreshFailureUpdate's overrides param — DB-shape-adjacent proof
// (the pure-function unit test lives in tests/unit/token-health-check-circuit-breaker.test.ts;
// this asserts the SAME override plumbing end-to-end through the real DB write above)
// ============================================================================

test("checkConnection: the cursor_session_stale override forces testStatus:active even for a connection whose PRIOR testStatus was expired", async () => {
  await resetStorage();
  await withCursorEnv(async () => {
    // A Cursor connection that landed at "expired" via the pre-existing
    // request-time path (src/sse/services/auth.ts::resolveTerminalConnectionStatus)
    // — Task 3 Step 3's carve-out lets this reach the branch; Step 1/2's override
    // must then force it back to non-terminal, not leave/re-derive "expired".
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: PAST_EXPIRY_ISO,
      expiresAt: PAST_EXPIRY_ISO,
      testStatus: "expired",
    });

    await tokenHealthCheck.checkConnection(await freshConn(id));

    const updated = await freshConn(id);
    assert.equal(
      updated.testStatus,
      "active",
      'buildRefreshFailureUpdate\'s default wasExpired-derived testStatus:"expired" must be overridden'
    );
    assert.equal(updated.errorCode, "cursor_session_stale");
  });
});

// ============================================================================
// Step 3: terminal-status carve-out (isRecoverableCursorExpired)
// ============================================================================

test("checkConnection: Cursor + expired + no lastErrorType is NOT permanently skipped (reaches the Cursor branch)", async () => {
  await resetStorage();
  await withCursorEnv(async () => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: PAST_EXPIRY_ISO,
      expiresAt: PAST_EXPIRY_ISO,
      testStatus: "expired",
      // no lastErrorType at all
    });

    await tokenHealthCheck.checkConnection(await freshConn(id));

    const updated = await freshConn(id);
    assert.ok(
      updated.lastHealthCheckAt,
      "must have reached the Cursor branch (which always writes lastHealthCheckAt)"
    );
    assert.equal(updated.testStatus, "active");
  });
});

test("checkConnection: Cursor + expired + lastErrorType:account_deactivated STAYS permanently skipped", async () => {
  await resetStorage();
  await withCursorEnv(async () => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: PAST_EXPIRY_ISO,
      expiresAt: PAST_EXPIRY_ISO,
      testStatus: "expired",
      lastErrorType: "account_deactivated",
      lastHealthCheckAt: null,
    });
    const before = await freshConn(id);

    await tokenHealthCheck.checkConnection(before);

    const after = await freshConn(id);
    assert.deepEqual(after, before, "a permanently-dead account must not be touched at all");
  });
});

test("checkConnection: a banned Cursor connection stays skipped regardless of lastErrorType", async () => {
  await resetStorage();
  await withCursorEnv(async () => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: PAST_EXPIRY_ISO,
      expiresAt: PAST_EXPIRY_ISO,
      testStatus: "banned",
      lastErrorType: "some_other_reason",
    });
    const before = await freshConn(id);

    await tokenHealthCheck.checkConnection(before);

    const after = await freshConn(id);
    assert.deepEqual(after, before);
  });
});

test("checkConnection: a credits_exhausted Cursor connection stays skipped regardless of lastErrorType", async () => {
  await resetStorage();
  await withCursorEnv(async () => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: PAST_EXPIRY_ISO,
      expiresAt: PAST_EXPIRY_ISO,
      testStatus: "credits_exhausted",
    });
    const before = await freshConn(id);

    await tokenHealthCheck.checkConnection(before);

    const after = await freshConn(id);
    assert.deepEqual(after, before);
  });
});

// ============================================================================
// Step 4: due/backoff dispatch
// ============================================================================

test("checkConnection: Cursor connection NOT near expiry is left completely untouched (no renewal attempt)", async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: FAR_FUTURE_ISO,
      expiresAt: FAR_FUTURE_ISO,
    });
    const before = await freshConn(id);

    await tokenHealthCheck.checkConnection(before);

    const after = await freshConn(id);
    assert.deepEqual(after, before);
    assert.equal(
      readLoggedInvocations(env.logPath).length,
      0,
      "must never spawn cursor-agent when not due"
    );
  });
});

test("checkConnection: Cursor connection near expiry and NOT in backoff triggers a renewal attempt", async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: NEAR_EXPIRY_ISO,
      expiresAt: NEAR_EXPIRY_ISO,
    });

    await tokenHealthCheck.checkConnection(await freshConn(id));

    assert.ok(
      readLoggedInvocations(env.logPath).length >= 1,
      "expected a cursor-agent availability check"
    );
    const updated = await freshConn(id);
    assert.ok(updated.lastHealthCheckAt);
  });
});

test("checkConnection: Cursor connection near expiry but currently in backoff is skipped", async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      tokenExpiresAt: NEAR_EXPIRY_ISO,
      expiresAt: NEAR_EXPIRY_ISO,
      providerSpecificData: {
        refreshCircuit: { streak: 1, until: new Date(Date.now() + 10 * 60 * 1000).toISOString() },
      },
    });
    const before = await freshConn(id);

    await tokenHealthCheck.checkConnection(before);

    const after = await freshConn(id);
    assert.deepEqual(after, before);
    assert.equal(readLoggedInvocations(env.logPath).length, 0, "must not spawn while in backoff");
  });
});

test("checkConnection: a Cursor connection with no known expiry at all is treated as due", async () => {
  await resetStorage();
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection({
      accessToken: "old-token",
      // no tokenExpiresAt/expiresAt at all
    });

    await tokenHealthCheck.checkConnection(await freshConn(id));

    assert.ok(
      readLoggedInvocations(env.logPath).length >= 1,
      "an unknown expiry must be treated as due, not permanently skipped"
    );
  });
});

// ============================================================================
// Step 5: full sweep-level regression — non-Cursor behavior must be unaffected
// ============================================================================

test("checkConnection: a refresh-capable non-Cursor provider missing its refresh token is still marked expired/no_refresh_token (#5326 unaffected)", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity No-Refresh Account (Cursor-plan regression)",
    email: "antigravity-cursor-regression@example.com",
    accessToken: "access-token-only",
    refreshToken: null,
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById(getId(connection));
  assert.equal(updated?.testStatus, "expired");
  assert.equal(updated?.errorCode, "no_refresh_token");
});

test("checkConnection: a banned non-Cursor connection is still skipped (terminal-status guard unaffected by the Cursor carve-out)", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    email: "openai-banned-regression@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    testStatus: "banned",
    isActive: true,
  });
  const before = await providersDb.getProviderConnectionById(getId(connection));

  await tokenHealthCheck.checkConnection(before);

  const after = await providersDb.getProviderConnectionById(getId(connection));
  assert.deepEqual(after, before);
});
