// Characterization of recordStreamingUsageStats — the per-request usage-stats persistence extracted
// from handleChatCore's onStreamComplete (chatCore god-file decomposition, #3501). Uses a real temp
// DB and polls usage_history (saveRequestUsage is async + fire-and-forget). Locks: the non-object
// usage guard, the streaming field mapping (status/success/ttft/errorCode), and a non-200 stream.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-stream-usage-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { recordStreamingUsageStats } = await import(
  "../../open-sse/handlers/chatCore/streamingUsageStats.ts"
);

function baseCtx(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    model: "gpt-x",
    streamStatus: 200,
    startTime: Date.now() - 50,
    ttft: 12,
    streamErrorCode: null,
    connectionId: "conn-1",
    apiKeyInfo: { id: "key-1", name: "Key One" },
    effectiveServiceTier: "standard",
    isCombo: false,
    comboStrategy: null,
    ...overrides,
  } as Parameters<typeof recordStreamingUsageStats>[1];
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

test("non-object usage is a no-op", async () => {
  const before = (await rowsFor("guard-stream")).length;
  for (const bad of [null, undefined, 7, "x"]) {
    recordStreamingUsageStats(bad, baseCtx({ provider: "guard-stream" }));
  }
  await new Promise((r) => setTimeout(r, 100));
  assert.equal((await rowsFor("guard-stream")).length, before);
});

test("200 stream persists a success row with ttft and status 200", async () => {
  recordStreamingUsageStats(
    { prompt_tokens: 20, completion_tokens: 9 },
    baseCtx({ provider: "smap-prov", model: "gpt-stream", streamStatus: 200 })
  );
  const rows = await waitForRows("smap-prov", 1);
  const row = rows[0] as {
    model: string;
    success: boolean;
    status: string;
    timeToFirstTokenMs: number;
    tokens: { input: number; output: number };
  };
  assert.equal(row.model, "gpt-stream");
  assert.equal(row.success, true);
  assert.equal(row.status, "200");
  assert.equal(row.timeToFirstTokenMs, 12);
  assert.equal(row.tokens.input, 20);
  assert.equal(row.tokens.output, 9);
});

test("non-200 stream persists a failure row (success=false, status string)", async () => {
  recordStreamingUsageStats(
    { prompt_tokens: 1, completion_tokens: 0 },
    baseCtx({ provider: "sfail-prov", streamStatus: 503, streamErrorCode: "upstream_5xx" })
  );
  const rows = await waitForRows("sfail-prov", 1);
  const row = rows[0] as { success: boolean; status: string; errorCode: string };
  assert.equal(row.success, false);
  assert.equal(row.status, "503");
  assert.equal(row.errorCode, "upstream_5xx");
});
