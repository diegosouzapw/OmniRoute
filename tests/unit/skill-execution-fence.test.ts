process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require_ = createRequire(import.meta.url);
const BetterSqlite3 = require_("better-sqlite3") as typeof import("better-sqlite3");

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";

import {
  claimServerToolExecution,
  finalizeServerToolExecution,
} from "../../src/lib/db/skillExecutionFence";
import { runWithServerToolFence } from "../../src/lib/skills/toolExecutionFence";

// Minimal fixture schema — only what tests need; no SCHEMA_SQL import from core.ts
const FIXTURE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS server_tool_executions (
    id TEXT PRIMARY KEY,
    api_key_id TEXT NOT NULL,
    request_identity TEXT NOT NULL,
    tool_call_id TEXT NOT NULL,
    tool_name TEXT NOT NULL,
    input_digest TEXT NOT NULL,
    output TEXT,
    status TEXT NOT NULL CHECK(status IN ('running', 'success', 'error', 'timeout')),
    error_message TEXT,
    duration_ms INTEGER,
    claim_expires_at TEXT NOT NULL,
    completed_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(api_key_id, request_identity, tool_call_id)
  );
  CREATE INDEX IF NOT EXISTS idx_server_tool_executions_status_expiry
    ON server_tool_executions(status, claim_expires_at);
  CREATE INDEX IF NOT EXISTS idx_server_tool_executions_created
    ON server_tool_executions(created_at);
`;

function makeTempDb(): {
  adapter: SqliteAdapter;
  dir: string;
  raw: import("better-sqlite3").Database;
} {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fence-test-"));
  const dbPath = path.join(dir, "test.db");
  const raw = new BetterSqlite3(dbPath);
  raw.pragma("journal_mode = WAL");
  raw.pragma("busy_timeout = 2000");
  raw.exec(FIXTURE_SCHEMA);
  const adapter = createBetterSqliteAdapter(raw);
  return { adapter, dir, raw };
}

function makeSecondAdapter(dir: string): {
  adapter: SqliteAdapter;
  raw: import("better-sqlite3").Database;
} {
  const dbPath = path.join(dir, "test.db");
  const raw = new BetterSqlite3(dbPath);
  raw.pragma("journal_mode = WAL");
  raw.pragma("busy_timeout = 2000");
  const adapter = createBetterSqliteAdapter(raw);
  return { adapter, raw };
}

function cleanup(raw: import("better-sqlite3").Database, dir: string) {
  raw.close();
  fs.rmSync(dir, { recursive: true, force: true });
}

const BASE_INPUT = {
  apiKeyId: "key-1",
  requestIdentity: "key-1:req-id:body-hash",
  toolCallId: "call-1",
  toolName: "memory_search",
  inputDigest: "abc123",
  leaseExpiresAt: new Date(Date.now() + 60_000).toISOString(),
};

const BASE_FINALIZE = {
  executionId: "",
  status: "success" as const,
  output: { result: "ok" },
  errorMessage: null,
  durationMs: 100,
};

// ── Defect 1: Lease expiry compares STORED claim_expires_at, not input ──

test("claim: stored expired lease → unknown even if retry supplies future lease", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const pastLease = new Date(Date.now() - 60_000).toISOString();
    const claim1 = claimServerToolExecution(
      { ...BASE_INPUT, leaseExpiresAt: pastLease },
      adapter,
      Date.now()
    );
    assert.equal(claim1.kind, "claimed");
    const futureLease = new Date(Date.now() + 300_000).toISOString();
    const claim2 = claimServerToolExecution(
      { ...BASE_INPUT, leaseExpiresAt: futureLease },
      adapter,
      Date.now()
    );
    assert.equal(claim2.kind, "unknown", "must compare stored lease, not input lease");
  } finally {
    cleanup(raw, dir);
  }
});

test("claim: stored future lease with expired retry → in_progress (not unknown)", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const futureLease = new Date(Date.now() + 300_000).toISOString();
    const claim1 = claimServerToolExecution(
      { ...BASE_INPUT, leaseExpiresAt: futureLease },
      adapter,
      Date.now()
    );
    assert.equal(claim1.kind, "claimed");
    const pastLease = new Date(Date.now() - 10_000).toISOString();
    const claim2 = claimServerToolExecution(
      { ...BASE_INPUT, leaseExpiresAt: pastLease },
      adapter,
      Date.now()
    );
    assert.equal(claim2.kind, "in_progress", "stored lease is future, so should be in_progress");
  } finally {
    cleanup(raw, dir);
  }
});

// ── Basic claim/replay tests ──

test("claim: first claim returns claimed", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const result = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(result.kind, "claimed");
    assert.ok(typeof result.executionId === "string" && result.executionId.length > 0);
  } finally {
    cleanup(raw, dir);
  }
});

test("claim: terminal row (success) with same identity returns replay", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim1 = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim1.kind, "claimed");
    finalizeServerToolExecution({ ...BASE_FINALIZE, executionId: claim1.executionId }, adapter);
    const claim2 = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim2.kind, "replay");
    if (claim2.kind === "replay") {
      assert.equal(claim2.status, "success");
      assert.deepEqual(claim2.output, { result: "ok" });
    }
  } finally {
    cleanup(raw, dir);
  }
});

test("claim: terminal row (error) replay preserves error status and message", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim1 = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim1.kind, "claimed");
    finalizeServerToolExecution(
      {
        ...BASE_FINALIZE,
        executionId: claim1.executionId,
        status: "error",
        output: null,
        errorMessage: "tool failed",
        durationMs: 42,
      },
      adapter
    );
    const claim2 = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim2.kind, "replay");
    if (claim2.kind === "replay") {
      assert.equal(claim2.status, "error");
      assert.equal(claim2.errorMessage, "tool failed");
    }
  } finally {
    cleanup(raw, dir);
  }
});

test("claim: same key but different name returns identity_conflict", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    claimServerToolExecution(BASE_INPUT, adapter);
    const claim2 = claimServerToolExecution({ ...BASE_INPUT, toolName: "different_tool" }, adapter);
    assert.equal(claim2.kind, "identity_conflict");
  } finally {
    cleanup(raw, dir);
  }
});

test("claim: same key but different inputDigest returns identity_conflict", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    claimServerToolExecution(BASE_INPUT, adapter);
    const claim2 = claimServerToolExecution(
      { ...BASE_INPUT, inputDigest: "different_digest" },
      adapter
    );
    assert.equal(claim2.kind, "identity_conflict");
  } finally {
    cleanup(raw, dir);
  }
});

// ── Defect 2: Cross-handle poll test with gate-based concurrency ──

test("fence: cross-handle poll — B sees in_progress, then A finalizes, then B replays", async () => {
  const { adapter: adapterA, dir, raw: rawA } = makeTempDb();
  const { adapter: adapterB, raw: rawB } = makeSecondAdapter(dir);
  let fakeTime = 1_000_000;
  const now = () => fakeTime;
  const sleep = async (ms: number) => {
    fakeTime += ms;
    await new Promise<void>((r) => setTimeout(r, 0));
  };

  // Gate: A signals when it starts, B signals when it observes in_progress
  let aStartedResolve!: () => void;
  const aStarted = new Promise<void>((r) => {
    aStartedResolve = r;
  });
  let bObservedResolve!: () => void;
  const bObserved = new Promise<void>((r) => {
    bObservedResolve = r;
  });

  let handlerCallCount = 0;
  const handler = async () => {
    handlerCallCount++;
    aStartedResolve();
    // Wait until B has observed in_progress before finalizing
    await bObserved;
    return "handler-result";
  };

  const sharedArgs = { q: "test-query" };

  // Handle A claims via fence wrapper
  const pA = runWithServerToolFence({
    apiKeyId: "key-1",
    requestIdentity: "key-1:req-id:body-hash",
    toolCallId: "call-1",
    toolName: "memory_search",
    arguments: sharedArgs,
    leaseDurationMs: 60_000,
    execute: handler,
    now,
    sleep,
    db: adapterA,
  });

  // Wait for A to start executing
  await aStarted;

  // Handle B calls the fence wrapper — should find running row, observe in_progress
  const pB = runWithServerToolFence({
    apiKeyId: "key-1",
    requestIdentity: "key-1:req-id:body-hash",
    toolCallId: "call-1",
    toolName: "memory_search",
    arguments: sharedArgs,
    leaseDurationMs: 60_000,
    execute: async () => "should-not-run",
    now,
    sleep,
    db: adapterB,
  });

  // Injected sleep proves B entered polling before A may finalize.
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.ok(fakeTime > 1_000_000, "B must poll before A finalizes");
  bObservedResolve();

  const [, fenceResult] = await Promise.all([pA, pB]);
  assert.equal(handlerCallCount, 1, "handler executes exactly once");
  assert.equal(fenceResult.kind, "replayed");
  if (fenceResult.kind === "replayed") {
    assert.equal(fenceResult.status, "success");
  }
  rawA.close();
  rawB.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("fence: in_progress poll returns in_progress when not finalized within deadline", async () => {
  const { adapter, dir, raw } = makeTempDb();
  let fakeTime = 1_000_000;
  const now = () => fakeTime;
  const sleep = async (ms: number) => {
    fakeTime += ms;
    await new Promise<void>((r) => setTimeout(r, 0));
  };

  const sharedArgs = { q: "test" };
  const digest = require_("crypto")
    .createHash("sha256")
    .update(JSON.stringify(sharedArgs))
    .digest("hex");

  // Insert a running row directly (simulates another process that claimed but hasn't finalized)
  raw.exec(`
    INSERT INTO server_tool_executions
      (id, api_key_id, request_identity, tool_call_id, tool_name, input_digest, status, claim_expires_at)
    VALUES ('ext-id', 'key-1', 'key-1:req:body', 'call-1', 'tool_a', '${digest}', 'running', datetime('now', '+300 seconds'))
  `);

  const result = await runWithServerToolFence({
    apiKeyId: "key-1",
    requestIdentity: "key-1:req:body",
    toolCallId: "call-1",
    toolName: "tool_a",
    arguments: sharedArgs,
    leaseDurationMs: 60_000,
    execute: async () => "should-not-run",
    now,
    sleep,
    db: adapter,
  });

  assert.equal(result.kind, "in_progress");
  assert.ok(fakeTime >= 1_000_000 + 2_000, "time should have advanced by poll budget");
  cleanup(raw, dir);
});

// ── Defect 3: Duration test — drives runWithServerToolFence, advances injected clock ──

test("finalize: duration_ms persisted exactly via fence wrapper (success)", async () => {
  const { adapter, dir, raw } = makeTempDb();
  let fakeTime = 10_000;
  const now = () => fakeTime;
  const sleep = async (ms: number) => {
    fakeTime += ms;
  };

  const result = await runWithServerToolFence({
    apiKeyId: "key-1",
    requestIdentity: "key-1:req:body",
    toolCallId: "call-1",
    toolName: "tool_a",
    arguments: { x: 1 },
    leaseDurationMs: 60_000,
    execute: async (_execId) => {
      fakeTime += 42;
      return "done";
    },
    now,
    sleep,
    db: adapter,
  });

  assert.equal(result.kind, "executed");
  // Query duration_ms from DB — wrapper must have calculated it, not hardcoded 0
  const row = raw
    .prepare("SELECT duration_ms, status FROM server_tool_executions WHERE status = 'success'")
    .get() as { duration_ms: number | null; status: string };
  assert.equal(row.duration_ms, 42, "duration_ms must be exactly 42 via injected clock");
  assert.equal(row.status, "success");
  cleanup(raw, dir);
});

test("finalize: duration_ms persisted exactly via fence wrapper (error)", async () => {
  const { adapter, dir, raw } = makeTempDb();
  let fakeTime = 10_000;
  const now = () => fakeTime;
  const sleep = async (ms: number) => {
    fakeTime += ms;
  };

  await assert.rejects(
    runWithServerToolFence({
      apiKeyId: "key-1",
      requestIdentity: "key-1:req:body",
      toolCallId: "call-1",
      toolName: "tool_a",
      arguments: { x: 1 },
      leaseDurationMs: 60_000,
      execute: async () => {
        fakeTime += 17;
        throw new Error("boom");
      },
      now,
      sleep,
      db: adapter,
    }),
    /boom/,
    "handler error must propagate"
  );

  const row = raw
    .prepare("SELECT duration_ms, status FROM server_tool_executions WHERE status = 'error'")
    .get() as { duration_ms: number | null; status: string };
  assert.equal(row.duration_ms, 17, "duration_ms must be exactly 17 for error via injected clock");
  assert.equal(row.status, "error");
  cleanup(raw, dir);
});

// ── Defect 4: Rejected in-process active Promise → joiner gets replayed ──

test("fence: rejected in-process promise — joiner gets replayed with error status", async () => {
  const { adapter, dir, raw } = makeTempDb();
  let fakeTime = 1_000_000;
  const now = () => fakeTime;
  const sleep = async (ms: number) => {
    fakeTime += ms;
    await new Promise<void>((r) => setTimeout(r, 0));
  };

  // Gate for concurrency: A signals started, B signals it observed in_progress
  let aStartedResolve!: () => void;
  const aStarted = new Promise<void>((r) => {
    aStartedResolve = r;
  });
  let bObservedResolve!: () => void;
  const bObserved = new Promise<void>((r) => {
    bObservedResolve = r;
  });

  let handlerCalled = false;
  const failingHandler = async () => {
    handlerCalled = true;
    aStartedResolve();
    await bObserved;
    throw new Error("handler crashed");
  };

  // Handle A claims via fence — handler will throw, wrapper resolves with error status
  const pA = runWithServerToolFence({
    apiKeyId: "key-2",
    requestIdentity: "key-2:req:body",
    toolCallId: "call-x",
    toolName: "tool_a",
    arguments: {},
    leaseDurationMs: 60_000,
    execute: failingHandler,
    now,
    sleep,
    db: adapter,
  });

  await aStarted;

  // Handle B immediately tries same key — gets in_progress, polls the active promise
  const pB = runWithServerToolFence({
    apiKeyId: "key-2",
    requestIdentity: "key-2:req:body",
    toolCallId: "call-x",
    toolName: "tool_a",
    arguments: {},
    leaseDurationMs: 60_000,
    execute: async () => {
      throw new Error("should-not-run");
    },
    now,
    sleep,
    db: adapter,
  });

  await new Promise((r) => setTimeout(r, 5));
  bObservedResolve();

  const [rA, rB] = await Promise.allSettled([pA, pB]);
  assert.ok(handlerCalled, "handler should have been called");
  assert.equal(rA.status, "rejected", "handle A should reject because handler threw");
  assert.equal(rB.status, "fulfilled");
  if (rB.status === "fulfilled") {
    assert.equal(rB.value.kind, "replayed", "joiner must get replayed for terminal error");
    if (rB.value.kind === "replayed") {
      assert.equal(rB.value.status, "error", "replayed status must be error");
      assert.equal(rB.value.errorMessage, "handler crashed");
    }
  }
  cleanup(raw, dir);
});

// ── Defect 6: isUniqueConstraintError rejects non-UNIQUE constraints ──

test("isUniqueConstraintError: NOT NULL error propagates through claimServerToolExecution", () => {
  const { dir, raw } = makeTempDb();
  try {
    // Build a fake adapter that wraps the real one but makes INSERT throw NOT NULL
    const realDir = fs.mkdtempSync(path.join(os.tmpdir(), "fence-fake-"));
    const fakeRaw = new BetterSqlite3(path.join(realDir, "test.db"));
    fakeRaw.pragma("journal_mode = WAL");
    fakeRaw.exec(FIXTURE_SCHEMA);
    const fake = createBetterSqliteAdapter(fakeRaw);

    // Proxy: intercept INSERT INTO server_tool_executions and inject NOT NULL error
    const proxyAdapter = new Proxy(fake, {
      get(target, prop) {
        if (prop === "prepare") {
          return (sql: string) => {
            const stmt = (target.prepare as Function)(sql);
            if (/INSERT INTO server_tool_executions/i.test(sql)) {
              return {
                ...stmt,
                run: (..._args: unknown[]) => {
                  const err = new Error("NOT NULL constraint failed") as Error & { code: string };
                  err.code = "SQLITE_CONSTRAINT_NOTNULL";
                  throw err;
                },
              };
            }
            return stmt;
          };
        }
        return (target as Record<string, unknown>)[prop as string];
      },
    }) as SqliteAdapter;

    assert.throws(
      () => {
        claimServerToolExecution(BASE_INPUT, proxyAdapter);
      },
      (err: unknown) => {
        return (
          err instanceof Error &&
          err.message.includes("NOT NULL") &&
          (err as { code?: string }).code === "SQLITE_CONSTRAINT_NOTNULL"
        );
      },
      "NOT NULL constraint must propagate, not be swallowed by isUniqueConstraintError"
    );
    fakeRaw.close();
    fs.rmSync(realDir, { recursive: true, force: true });
  } finally {
    cleanup(raw, dir);
  }
});

test("isUniqueConstraintError: CHECK error propagates through claimServerToolExecution", () => {
  const { dir, raw } = makeTempDb();
  try {
    const realDir = fs.mkdtempSync(path.join(os.tmpdir(), "fence-fake-"));
    const fakeRaw = new BetterSqlite3(path.join(realDir, "test.db"));
    fakeRaw.pragma("journal_mode = WAL");
    fakeRaw.exec(FIXTURE_SCHEMA);
    const fake = createBetterSqliteAdapter(fakeRaw);

    const proxyAdapter = new Proxy(fake, {
      get(target, prop) {
        if (prop === "prepare") {
          return (sql: string) => {
            const stmt = (target.prepare as Function)(sql);
            if (/INSERT INTO server_tool_executions/i.test(sql)) {
              return {
                ...stmt,
                run: (..._args: unknown[]) => {
                  const err = new Error("CHECK constraint failed") as Error & { code: string };
                  err.code = "SQLITE_CONSTRAINT_CHECK";
                  throw err;
                },
              };
            }
            return stmt;
          };
        }
        return (target as Record<string, unknown>)[prop as string];
      },
    }) as SqliteAdapter;

    assert.throws(
      () => {
        claimServerToolExecution(BASE_INPUT, proxyAdapter);
      },
      (err: unknown) => {
        return (
          err instanceof Error &&
          err.message.includes("CHECK") &&
          (err as { code?: string }).code === "SQLITE_CONSTRAINT_CHECK"
        );
      },
      "CHECK constraint must propagate, not be swallowed by isUniqueConstraintError"
    );
    fakeRaw.close();
    fs.rmSync(realDir, { recursive: true, force: true });
  } finally {
    cleanup(raw, dir);
  }
});

// ── Existing tests (cleaned up, no done callbacks) ──

test("finalize: only updates running rows, second finalize returns false", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim.kind, "claimed");
    const firstFinalize = finalizeServerToolExecution(
      { ...BASE_FINALIZE, executionId: claim.executionId },
      adapter
    );
    assert.equal(firstFinalize, true);
    const secondFinalize = finalizeServerToolExecution(
      { ...BASE_FINALIZE, executionId: claim.executionId },
      adapter
    );
    assert.equal(secondFinalize, false);
  } finally {
    cleanup(raw, dir);
  }
});

test("finalize: output sanitized — nested credentials stripped, valid JSON preserved", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim.kind, "claimed");
    const sensitiveOutput = {
      token: "sk-live-secret123",
      nested: { bearer: "Bearer abcdefghijklmnop", deep: { key: "sk-test-abcdefghijklmnop" } },
      data: "normal text",
    };
    finalizeServerToolExecution(
      { ...BASE_FINALIZE, executionId: claim.executionId, output: sensitiveOutput },
      adapter
    );
    const row = raw
      .prepare("SELECT output FROM server_tool_executions WHERE id = ?")
      .get(claim.executionId) as { output: string | null };
    assert.ok(row.output, "output should be stored");
    assert.ok(
      !row.output.includes("sk-live-secret123"),
      "output must not contain raw sk- credential"
    );
    assert.ok(
      !row.output.includes("Bearer abcdefghijklmnop"),
      "output must not contain raw Bearer token"
    );
    const parsed = JSON.parse(row.output);
    assert.ok(typeof parsed === "object", "sanitized output must be parseable JSON");
  } finally {
    cleanup(raw, dir);
  }
});

test("finalize: error message sanitized — no raw stack in error_message", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim.kind, "claimed");
    finalizeServerToolExecution(
      {
        executionId: claim.executionId,
        status: "error",
        output: null,
        errorMessage: "Something failed\n  at /internal/path.js:42\n  at processTicksAndRejections",
        durationMs: 50,
      },
      adapter
    );
    const row = raw
      .prepare("SELECT error_message FROM server_tool_executions WHERE id = ?")
      .get(claim.executionId) as { error_message: string | null };
    assert.ok(row.error_message, "error_message should be stored");
    assert.ok(!row.error_message.includes("at /internal/"), "error must not contain raw stack");
  } finally {
    cleanup(raw, dir);
  }
});

test("finalize: output truncated to 32KB with valid JSON envelope", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim.kind, "claimed");
    // Build a nested object that serializes to >32KB after sanitization
    // (sanitizeUpstreamDetails truncates arrays to 32 elements, and strips 'key'-like names)
    const bigObj: Record<string, string> = {};
    for (let i = 0; i < 2000; i++) {
      bigObj[`field_${i}_padding`] = "x".repeat(20);
    }
    finalizeServerToolExecution(
      { ...BASE_FINALIZE, executionId: claim.executionId, output: bigObj },
      adapter
    );
    const row = raw
      .prepare("SELECT output FROM server_tool_executions WHERE id = ?")
      .get(claim.executionId) as { output: string | null };
    assert.ok(row.output, "output must be stored");
    assert.ok(row.output.length <= 32768, `output length ${row.output.length} must be <=32768`);
    const parsed = JSON.parse(row.output);
    assert.ok(parsed.truncated === true, "truncated envelope must have truncated:true");
    assert.ok(typeof parsed.preview === "string", "truncated envelope must have preview string");
  } finally {
    cleanup(raw, dir);
  }
});

test("finalize: raw tool arguments are never stored in the execution row", () => {
  const { adapter, dir, raw } = makeTempDb();
  try {
    const claim = claimServerToolExecution(BASE_INPUT, adapter);
    assert.equal(claim.kind, "claimed");
    finalizeServerToolExecution(
      { ...BASE_FINALIZE, executionId: claim.executionId, output: { key: "value" } },
      adapter
    );
    const row = raw
      .prepare("SELECT output, input_digest FROM server_tool_executions WHERE id = ?")
      .get(claim.executionId) as { output: string | null; input_digest: string };
    assert.ok(row.output, "output should be stored");
    assert.ok(row.input_digest, "input_digest must be digest only, not raw args");
  } finally {
    cleanup(raw, dir);
  }
});

test("contention: two independent SQLite handles on same file — loser UNIQUE caught cleanly", () => {
  const { adapter: adapter1, dir, raw: raw1 } = makeTempDb();
  const { adapter: adapter2, raw: raw2 } = makeSecondAdapter(dir);
  try {
    const claim1 = claimServerToolExecution(BASE_INPUT, adapter1);
    assert.equal(claim1.kind, "claimed");
    const claim2 = claimServerToolExecution(BASE_INPUT, adapter2);
    assert.ok(
      claim2.kind === "replay" || claim2.kind === "in_progress",
      `Expected replay or in_progress, got ${claim2.kind}`
    );
  } finally {
    raw1.close();
    raw2.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("fence: in-process promise joiner replays success result", async () => {
  const { adapter, dir, raw } = makeTempDb();
  let handlerCallCount = 0;
  const handler = async () => {
    handlerCallCount++;
    return "handler-result";
  };

  const p1 = runWithServerToolFence(
    {
      apiKeyId: "key-1",
      requestIdentity: "key-1:req:body",
      toolCallId: "call-1",
      toolName: "tool_a",
      arguments: { q: "test" },
      leaseDurationMs: 60_000,
      execute: handler,
    },
    adapter
  );
  const p2 = runWithServerToolFence(
    {
      apiKeyId: "key-1",
      requestIdentity: "key-1:req:body",
      toolCallId: "call-1",
      toolName: "tool_a",
      arguments: { q: "test" },
      leaseDurationMs: 60_000,
      execute: handler,
    },
    adapter
  );

  const [r1, r2] = await Promise.all([p1, p2]);
  assert.equal(handlerCallCount, 1, "handler should execute exactly once");
  assert.equal(r1.kind, "executed");
  assert.equal(r2.kind, "replayed");
  if (r2.kind === "replayed") {
    assert.equal(r2.status, "success");
    assert.equal(r2.value, "handler-result");
  }
  cleanup(raw, dir);
});
