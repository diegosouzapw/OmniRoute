// Characterization of recordNonStreamingUsageStats — the per-request usage-stats persistence
// extracted from handleChatCore's non-streaming success path (chatCore god-file decomposition,
// #3501). Uses a real temp DB and polls usage_history (saveRequestUsage is async +
// fire-and-forget). Locks: the non-object usage guard (no-op), the field mapping
// (provider/model/connection/api-key/tokens/serviceTier), and the trace-log line format.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-nonstream-usage-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { recordNonStreamingUsageStats } = await import(
  "../../open-sse/handlers/chatCore/nonStreamingUsageStats.ts"
);

function baseCtx(overrides: Record<string, unknown> = {}) {
  return {
    traceEnabled: false,
    provider: "openai",
    connectionId: "conn-12345678abc",
    model: "gpt-x",
    startTime: Date.now() - 50,
    apiKeyInfo: { id: "key-1", name: "Key One" },
    effectiveServiceTier: "standard",
    isCombo: false,
    comboStrategy: null,
    ...overrides,
  } as Parameters<typeof recordNonStreamingUsageStats>[1];
}

async function rowsFor(provider: string): Promise<Array<Record<string, unknown>>> {
  return (await getUsageHistory({ provider })) as Array<Record<string, unknown>>;
}

async function waitForRows(provider: string, min: number, timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const rows = await rowsFor(provider);
    if (rows.length >= min) return rows;
    await new Promise((r) => setTimeout(r, 25));
  }
  return rowsFor(provider);
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("non-object usage is a no-op (null, undefined, number, string)", async () => {
  const before = (await rowsFor("guard-prov")).length;
  for (const bad of [null, undefined, 42, "usage", true]) {
    recordNonStreamingUsageStats(bad, baseCtx({ provider: "guard-prov" }));
  }
  // give any (erroneous) async write a chance to land, then assert nothing was persisted
  await new Promise((r) => setTimeout(r, 100));
  const after = (await rowsFor("guard-prov")).length;
  assert.equal(after, before);
});

test("valid usage persists a row with the mapped fields", async () => {
  recordNonStreamingUsageStats(
    { prompt_tokens: 11, completion_tokens: 7 },
    baseCtx({ provider: "map-prov", model: "gpt-map", connectionId: "conn-abc", isCombo: false })
  );
  const rows = await waitForRows("map-prov", 1);
  assert.equal(rows.length, 1);
  const row = rows[0] as {
    provider: string;
    model: string;
    connectionId: string;
    apiKeyId: string;
    apiKeyName: string;
    success: boolean;
    status: string;
    tokens: { input: number; output: number };
  };
  assert.equal(row.provider, "map-prov");
  assert.equal(row.model, "gpt-map");
  assert.equal(row.connectionId, "conn-abc");
  assert.equal(row.apiKeyId, "key-1");
  assert.equal(row.apiKeyName, "Key One");
  assert.equal(row.success, true);
  assert.equal(row.status, "200");
  assert.equal(row.tokens.input, 11);
  assert.equal(row.tokens.output, 7);
});

test("falls back to 'unknown' provider/model when absent", async () => {
  recordNonStreamingUsageStats(
    { prompt_tokens: 1, completion_tokens: 1 },
    baseCtx({ provider: null, model: null, apiKeyInfo: null })
  );
  const rows = await waitForRows("unknown", 1);
  const mine = rows.find((r) => (r as { model?: string }).model === "unknown");
  assert.ok(mine, "expected a row with provider/model 'unknown'");
});

test("trace log emits a [USAGE] line with the upper-cased provider when traceEnabled", () => {
  const original = console.log;
  const captured: string[] = [];
  console.log = (...args: unknown[]) => {
    captured.push(args.map(String).join(" "));
  };
  try {
    recordNonStreamingUsageStats(
      { prompt_tokens: 3, completion_tokens: 2 },
      baseCtx({ provider: "trace-prov", traceEnabled: true })
    );
  } finally {
    console.log = original;
  }
  const usageLine = captured.find((l) => l.includes("[USAGE]"));
  assert.ok(usageLine, "expected a [USAGE] trace line");
  assert.match(usageLine as string, /TRACE-PROV/);
});
