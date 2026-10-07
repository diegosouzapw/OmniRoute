// #14360: a request refused by the quota-parking path returns a synthesized 429
// but wrote nothing to call_logs / usage_history. Upstream 429s are logged; this
// router-side skip was not, so the refusal only existed in the client's terminal.
// recordQuotaParkedSkip (called from chat.ts right after handleNoCredentials)
// records it with the same api-key attribution the pipeline-gate path uses, and
// skips combo targets — the combo-exhausted path already writes one row.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-skip-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { recordQuotaParkedSkip, recordGateRejection, quotaParkedSkipStatus } =
  await import("../../src/sse/handlers/quotaParkedSkipUsage.ts");

const PARKED = {
  allRateLimited: true,
  lastError: "All qwen-cloud-token-plan accounts have exhausted their quota",
  lastErrorCode: 429,
  retryAfterHuman: "4d",
};

const parked = (provider: string) => ({
  credentials: PARKED,
  lastError: null,
  lastStatus: null,
  provider,
  model: "deepseek-v4-flash",
});

type LogRow = {
  provider?: string;
  status?: number;
  error?: string | null;
  apiKeyId?: string | null;
};

async function waitForLogs(provider: string, expectAtLeast: number): Promise<LogRow[]> {
  let rows: LogRow[] = [];
  for (let i = 0; i < 50; i++) {
    const logs = await callLogs.getCallLogs({});
    const list = ((logs as { logs?: LogRow[] }).logs ?? logs) as LogRow[];
    rows = (list ?? []).filter((l) => l.provider === provider);
    if (rows.length >= expectAtLeast) break;
    await new Promise((r) => setTimeout(r, 10));
  }
  return rows;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  usageHistory.clearPendingRequests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14360 a quota-parked skip writes call_logs + usage_history attributed to the api key", async () => {
  await recordQuotaParkedSkip(parked("qwen-cloud-token-plan"), {
    body: { model: "deepseek-v4-flash" },
    clientRawRequest: { endpoint: "/v1/chat/completions" },
    apiKeyInfo: { id: "key-14360", name: "reporter-key" },
    runtimeOptions: { correlationId: "corr-14360", conversationId: "conv-14360" },
    telemetry: { startTime: Date.now() - 4 },
    isCombo: false,
  });

  const rows = await waitForLogs("qwen-cloud-token-plan", 1);
  assert.equal(rows.length, 1, "the synthesized 429 must reach call_logs");
  assert.equal(rows[0].status, 429);
  assert.match(String(rows[0].error ?? ""), /exhausted their quota/);
  assert.equal(rows[0].apiKeyId, "key-14360");

  const history = (await usageHistory.getUsageDb()).data.history as Array<{
    apiKeyId?: string | null;
    success?: boolean;
  }>;
  const keyRows = history.filter((r) => r.apiKeyId === "key-14360");
  assert.equal(keyRows.length, 1, "usage_history must count the refusal against the key");
  assert.equal(keyRows[0].success, false);
});

test("#14360 a parked combo target is not recorded (combo-exhausted path owns the row)", async () => {
  await recordQuotaParkedSkip(parked("qwen-cloud-token-plan"), {
    apiKeyInfo: { id: "key-combo" },
    comboName: "prod",
    isCombo: true,
  });
  // A sentinel non-combo write proves the log pipeline flushed before we assert absence.
  await recordQuotaParkedSkip(parked("sentinel-provider"), { isCombo: false });
  await waitForLogs("sentinel-provider", 1);

  assert.equal((await waitForLogs("qwen-cloud-token-plan", 0)).length, 0);
  const history = (await usageHistory.getUsageDb()).data.history as Array<{
    apiKeyId?: string | null;
  }>;
  assert.equal(history.filter((r) => r.apiKeyId === "key-combo").length, 0);
});

test("#14360 status mirrors handleNoCredentials and skips the model-cooldown branch", () => {
  assert.equal(quotaParkedSkipStatus(null, null), null);
  assert.equal(quotaParkedSkipStatus({ allRateLimited: false }, 429), null);
  assert.equal(quotaParkedSkipStatus(PARKED, null), 429);
  assert.equal(quotaParkedSkipStatus({ allRateLimited: true }, null), 503);
  assert.equal(quotaParkedSkipStatus({ allRateLimited: true }, 502), 502);
  assert.equal(quotaParkedSkipStatus({ ...PARKED, cooldownScope: "model" }, null), null);
});

test("the gate path shares the attribution and keeps combo fields for combo targets", async () => {
  await recordGateRejection(503, "gate-provider", "claude-sonnet-5", {
    body: { model: "claude-sonnet-5" },
    apiKeyInfo: { id: "key-gate", name: "gate-key" },
    runtimeOptions: { comboStepId: "s1", comboExecutionKey: "k1" },
    comboName: "prod",
    isCombo: true,
  });
  const rows = await waitForLogs("gate-provider", 1);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, 503);
  assert.equal(rows[0].apiKeyId, "key-gate");
  assert.equal(rows[0].comboName, "prod");
  assert.match(String(rows[0].error ?? ""), /Pipeline gate rejected/);
});
