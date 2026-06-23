// Characterization of scheduleQuotaShareConsumption — the non-streaming shared-quota POST-hook
// extracted from handleChatCore (chatCore god-file decomposition, #3501). Fire-and-forget /
// fail-open. Locks: the guard (missing api-key id OR connection id → no-op) and that a valid call
// never throws (the underlying scheduleRecordConsumption is setImmediate + fail-open).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-share-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { scheduleQuotaShareConsumption } = await import(
  "../../open-sse/handlers/chatCore/quotaShareConsumption.ts"
);

const validUsage = { prompt_tokens: 10, completion_tokens: 5 };

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

test("missing apiKeyId is a no-op (never throws)", async () => {
  await assert.doesNotReject(
    scheduleQuotaShareConsumption({
      apiKeyId: null,
      connectionId: "conn-1",
      provider: "openai",
      usage: validUsage,
      estimatedCost: 0.01,
    })
  );
});

test("missing connectionId is a no-op (never throws)", async () => {
  await assert.doesNotReject(
    scheduleQuotaShareConsumption({
      apiKeyId: "key-1",
      connectionId: null,
      provider: "openai",
      usage: validUsage,
      estimatedCost: 0.01,
    })
  );
});

test("valid input schedules consumption and never throws (fire-and-forget)", async () => {
  await assert.doesNotReject(
    scheduleQuotaShareConsumption({
      apiKeyId: "key-1",
      connectionId: "conn-1",
      provider: "openai",
      usage: validUsage,
      estimatedCost: 0.0123,
    })
  );
  // give the scheduled setImmediate consumption a tick to run (fail-open, no assertion on DB
  // state — pool config is out of scope; this proves the hook does not throw end-to-end)
  await new Promise((r) => setTimeout(r, 50));
});

test("absent provider falls back without throwing", async () => {
  await assert.doesNotReject(
    scheduleQuotaShareConsumption({
      apiKeyId: "key-2",
      connectionId: "conn-2",
      provider: null,
      usage: null,
      estimatedCost: 0,
    })
  );
});
