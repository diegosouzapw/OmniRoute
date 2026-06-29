// tests/unit/chatcore-compression-usage-receipt.test.ts
// Characterization of attachCompressionUsageReceiptAfterAnalytics — the fire-and-forget compression
// usage-receipt attachment extracted from handleChatCore (chatCore god-file decomposition, #3501).
// Uses a real temp DB: inserts a compression_analytics row, attaches a receipt after pendingWrite,
// and asserts the aggregated realUsage. Also locks the best-effort error swallowing.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-compression-receipt-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { insertCompressionAnalyticsRow, getCompressionAnalyticsSummary } = await import(
  "../../src/lib/db/compressionAnalytics.ts"
);
const { attachCompressionUsageReceiptAfterAnalytics } = await import(
  "../../open-sse/handlers/chatCore/compressionUsageReceipt.ts"
);

const tick = (ms: number) => new Promise((r) => setTimeout(r, ms));

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
});

test("attaches the usage receipt only after pendingWrite resolves", async () => {
  insertCompressionAnalyticsRow({
    timestamp: new Date().toISOString(),
    mode: "test",
    original_tokens: 100,
    compressed_tokens: 60,
    tokens_saved: 40,
    request_id: "req-1",
  });

  let pendingResolved = false;
  const pendingWrite = new Promise<void>((res) =>
    setTimeout(() => {
      pendingResolved = true;
      res();
    }, 20)
  );

  attachCompressionUsageReceiptAfterAnalytics(
    { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    "provider",
    { pendingWrite, skillRequestId: "req-1" }
  );

  await tick(80);
  assert.equal(pendingResolved, true, "pendingWrite should have resolved first");

  const summary = getCompressionAnalyticsSummary();
  assert.equal(summary.realUsage.requestsWithReceipts, 1);
  assert.equal(summary.realUsage.promptTokens, 10);
  assert.equal(summary.realUsage.completionTokens, 5);
});

test("swallows the no-matching-row case without throwing or recording a receipt", async () => {
  assert.doesNotThrow(() =>
    attachCompressionUsageReceiptAfterAnalytics(
      { prompt_tokens: 1, total_tokens: 1 },
      "provider",
      { pendingWrite: null, skillRequestId: "does-not-exist" }
    )
  );
  await tick(40);
  const summary = getCompressionAnalyticsSummary();
  assert.equal(summary.realUsage.requestsWithReceipts, 1);
});
