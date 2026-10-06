/**
 * POST /api/providers/[id]/refresh-cursor (Cursor renewal plan, Task 4).
 *
 * Direct route.ts invocation, matching this codebase's existing precedent
 * for testing App Router handlers without a running server (e.g.
 * tests/unit/dahl-tokens-route.test.ts, tests/unit/agent-bridge-dns-params-7271.test.ts):
 * import the exported POST function and call it with a real Request and
 * `{ params: Promise.resolve({ id }) }`.
 *
 * Real DB (temp DATA_DIR, same convention as tests/unit/token-health-check-cursor.test.ts)
 * and the same real fake-cursor-agent-binary + HOME-override technique from
 * tests/unit/cursor-renewal.test.ts — renewCursorConnection() has no deps
 * override at this call site either, so its dependencies are driven for
 * real, never mocked.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-refresh-cursor-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/providers/[id]/refresh-cursor/route.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function getId(connection: { id?: unknown }): string {
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

function makeRequest(): Request {
  return new Request("http://localhost/api/providers/x/refresh-cursor", { method: "POST" });
}

function callRoute(id: string) {
  return POST(makeRequest(), { params: Promise.resolve({ id }) });
}

// ---- Real fake cursor-agent binary + IDE/agent fixtures (mirrors
// tests/unit/cursor-renewal.test.ts / tests/unit/token-health-check-cursor.test.ts) ----

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
  cleanup(): void;
}

async function withCursorEnv<T>(fn: (env: CursorEnv) => Promise<T>): Promise<T> {
  const originalHome = process.env.HOME;
  const originalUserProfile = process.env.USERPROFILE;
  const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");

  Object.defineProperty(process, "platform", { value: "darwin", configurable: true });
  const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-refresh-cursor-route-env-"));
  process.env.HOME = tmpHome;
  process.env.USERPROFILE = tmpHome;

  const logPath = path.join(tmpHome, "log.jsonl");
  process.env.FAKE_CURSOR_AGENT_LOG = logPath;
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
    cleanup() {
      if (originalPlatformDescriptor) {
        Object.defineProperty(process, "platform", originalPlatformDescriptor);
      }
      process.env.HOME = originalHome;
      if (originalUserProfile !== undefined) process.env.USERPROFILE = originalUserProfile;
      else delete process.env.USERPROFILE;
      delete process.env.FAKE_CURSOR_AGENT_LOG;
      delete process.env.FAKE_CURSOR_AGENT_STATUS_MODE;
      fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    },
  };

  try {
    return await fn(env);
  } finally {
    env.cleanup();
  }
}

async function createCursorConnection(overrides: Record<string, unknown> = {}) {
  const connection = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    email: `cursor-route-${Math.random()}@example.com`,
    accessToken: "old-token",
    refreshToken: null,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
  return getId(connection);
}

test("renewed: returns 200 with the documented shape and persists the new token", async () => {
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection();
    await env.writeIdeToken("new-ide-token", "new-machine");

    const res = await callRoute(id);
    const body = (await res.json()) as Record<string, unknown>;

    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.connectionId, id);
    assert.equal(body.provider, "cursor");
    assert.ok(body.expiresAt);
    assert.ok(body.refreshedAt);
    assert.equal(body.unchanged, undefined);

    const updated = await providersDb.getProviderConnectionById(id);
    assert.equal(updated?.accessToken, "new-ide-token");
    assert.equal(updated?.testStatus, "active");
  });
});

test("unchanged: returns 200 {success:true, unchanged:true, ...} without a new token", async () => {
  await withCursorEnv(async () => {
    const id = await createCursorConnection({
      expiresAt: "2026-01-01T00:00:00.000Z",
    });
    // No IDE/agent fixtures written -> renewCursorConnection() reports "unchanged".

    const res = await callRoute(id);
    const body = (await res.json()) as Record<string, unknown>;

    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.unchanged, true);
    assert.equal(body.connectionId, id);
    assert.equal(body.provider, "cursor");
    assert.equal(
      body.expiresAt,
      "2026-01-01T00:00:00.000Z",
      "echoes the connection's CURRENT (unchanged) expiresAt"
    );
    assert.ok(body.refreshedAt);
    assert.match(body.message as string, /already current/);
  });
});

test(
  'error: renewCursorConnection returning {status:"error"} -> 502',
  {
    skip:
      "Same testability gap already flagged for C2/C3: renewCursorConnection() (called with " +
      'no deps override here, same as the sweep) never returns {status:"error"} from a ' +
      "black-box test because tryIdeAuth()/tryAgentAuth() catch every internal failure and " +
      "resolve to {found:false,...} rather than throwing. This route's 502 mapping " +
      '(`{error: "Token refresh failed — provider returned no new token", details: result.error}`) ' +
      "is a straight passthrough of result.error, already proven correctly sanitized in " +
      "tests/unit/cursor-renewal.test.ts's case (d).",
  },
  async () => {}
);

test("non-Cursor connection -> 400", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    email: "not-cursor@example.com",
    accessToken: "token",
    refreshToken: "refresh",
    isActive: true,
  });
  const id = getId(connection);

  const res = await callRoute(id);
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(res.status, 400);
  assert.match(body.error as string, /only supports Cursor connections/);
});

test("nonexistent connection -> 404", async () => {
  const res = await callRoute("does-not-exist-" + Math.random());
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(res.status, 404);
  assert.match(body.error as string, /not found/i);
});

test("a second call within the 30s cooldown returns 429 with Retry-After, without invoking renewCursorConnection again", async () => {
  await withCursorEnv(async (env) => {
    const id = await createCursorConnection();
    // No fixtures -> first call resolves "unchanged", also sets the cooldown timestamp.

    const first = await callRoute(id);
    assert.equal(first.status, 200);
    const invocationsAfterFirst = readLoggedInvocations(env.logPath).length;
    assert.ok(
      invocationsAfterFirst >= 1,
      "expected the first call to actually check cursor-agent availability"
    );

    const second = await callRoute(id);
    assert.equal(second.status, 429);
    assert.ok(second.headers.get("Retry-After"), "expected a Retry-After header");
    const secondBody = (await second.json()) as Record<string, unknown>;
    assert.ok(typeof secondBody.retryAfterMs === "number");
    assert.ok(
      (secondBody.retryAfterMs as number) > 0 && (secondBody.retryAfterMs as number) <= 30_000
    );

    assert.equal(
      readLoggedInvocations(env.logPath).length,
      invocationsAfterFirst,
      "renewCursorConnection() must NOT be invoked a second time while in cooldown"
    );
  });
});

test("a different connection's request is unaffected by another connection's cooldown", async () => {
  await withCursorEnv(async () => {
    const idA = await createCursorConnection();
    const idB = await createCursorConnection();

    const first = await callRoute(idA);
    assert.equal(first.status, 200);

    const second = await callRoute(idB);
    assert.equal(
      second.status,
      200,
      "a different connectionId must not be throttled by connection A's cooldown"
    );
  });
});

test("an unexpected thrown error is caught by the outer handler and returns 500 with sanitized details (no raw stack/path)", async () => {
  const rawMessage =
    "Simulated failure at /Users/secret-user/project/src/app/api/providers/[id]/refresh-cursor/route.ts:44:5";
  const res = await POST(makeRequest(), {
    params: Promise.reject(new Error(rawMessage)) as unknown as Promise<{ id: string }>,
  });
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(res.status, 500);
  assert.equal(body.error, "Token refresh failed");
  const details = body.details as string;
  assert.ok(!details.includes("/Users/secret-user"), `raw path leaked: ${details}`);
  assert.ok(!details.includes("route.ts:44:5"), `raw source location leaked: ${details}`);
  assert.ok(!details.includes("at /"), `stack-trace-style substring leaked: ${details}`);
});
