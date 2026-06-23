// Characterization of scheduleStreamingQuotaShareConsumption — the streaming shared-quota POST-hook
// extracted from handleChatCore's onStreamComplete (chatCore god-file decomposition, #3501). Sync
// fire-and-forget / fail-open. The injected calculateCost is used as the observable. Locks: the
// guard (missing ids OR streamStatus != 200 → no recording) and that a valid 200 stream resolves
// the cost via calculateCost.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-stream-quota-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { scheduleStreamingQuotaShareConsumption } = await import(
  "../../open-sse/handlers/chatCore/streamingQuotaShare.ts"
);

function makeCostSpy() {
  const calls: Array<{ provider: string; model: string }> = [];
  const calculateCost = async (provider: string, model: string) => {
    calls.push({ provider, model });
    return 0.0042;
  };
  return { calculateCost, calls };
}

async function waitFor(pred: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 10));
  }
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

test("streamStatus != 200 records nothing (calculateCost never called)", async () => {
  const { calculateCost, calls } = makeCostSpy();
  scheduleStreamingQuotaShareConsumption({
    apiKeyId: "key-1",
    connectionId: "conn-1",
    provider: "openai",
    model: "gpt-x",
    streamUsage: { prompt_tokens: 10, completion_tokens: 5 },
    streamStatus: 500,
    serviceTier: "standard",
    calculateCost,
  });
  await new Promise((r) => setTimeout(r, 80));
  assert.equal(calls.length, 0);
});

test("missing connectionId records nothing", async () => {
  const { calculateCost, calls } = makeCostSpy();
  scheduleStreamingQuotaShareConsumption({
    apiKeyId: "key-1",
    connectionId: null,
    provider: "openai",
    model: "gpt-x",
    streamUsage: { prompt_tokens: 10 },
    streamStatus: 200,
    calculateCost,
  });
  await new Promise((r) => setTimeout(r, 80));
  assert.equal(calls.length, 0);
});

test("valid 200 stream resolves cost via injected calculateCost", async () => {
  const { calculateCost, calls } = makeCostSpy();
  scheduleStreamingQuotaShareConsumption({
    apiKeyId: "key-1",
    connectionId: "conn-1",
    provider: "deepseek",
    model: "deepseek-chat",
    streamUsage: { prompt_tokens: 100, completion_tokens: 50 },
    streamStatus: 200,
    serviceTier: "standard",
    calculateCost,
  });
  await waitFor(() => calls.length > 0);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].provider, "deepseek");
  assert.equal(calls[0].model, "deepseek-chat");
});
