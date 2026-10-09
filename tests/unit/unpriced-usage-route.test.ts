import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unpriced-route-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.INITIAL_PASSWORD = "isolated-unpriced-route-password";

const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const accessTokens = await import("../../src/lib/db/accessTokens.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const { GET } = await import("../../src/app/api/pricing/unpriced-usage/route.ts");
const { getUnpricedUsageReport, UNPRICED_USAGE_LOOKBACK_DAYS } =
  await import("../../src/lib/usage/unpricedUsage.ts");

function request(token?: string): Request {
  return new Request("http://localhost/api/pricing/unpriced-usage", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("unpriced report rejects anonymous and inference-only keys, accepts management credentials", async () => {
  assert.equal((await GET(request())).status, 401);
  const inferenceKey = await keys.createApiKey("inference-only", "unpriced-route-inference");
  assert.equal((await GET(request(inferenceKey.key))).status, 403);

  const managementKey = await keys.createApiKey("management", "unpriced-route-management");
  await keys.updateApiKeyPermissions(managementKey.id, { scopes: ["manage"] });
  keys.clearApiKeyCaches();
  const response = await GET(request(managementKey.key));
  assert.equal(response.status, 200);
  const report = await response.json();
  assert.equal(report.policy, "fail_closed");
  assert.deepEqual(report.models, []);

  // The latest management guard also supports scoped CLI access tokens.
  const { secret } = accessTokens.createAccessToken({ name: "report-reader", scope: "read" });
  assert.equal((await GET(request(secret))).status, 200);
  assert.equal((await GET(request("oma_live_invalid_report_token"))).status, 401);
});

test("eight-day report includes its boundary but excludes older and unsuccessful usage", async () => {
  const now = Date.parse("2026-10-09T12:00:00.000Z");
  const boundary = now - 8 * 24 * 60 * 60 * 1000;
  assert.equal(UNPRICED_USAGE_LOOKBACK_DAYS, 8);
  const key = await keys.createApiKey("limited", "unpriced-route-lookback");
  await keys.updateApiKeyPermissions(key.id, { usageLimitEnabled: true, weeklyUsageLimitUsd: 100 });
  for (const row of [
    { model: "boundary", time: boundary, success: true },
    { model: "too-old", time: boundary - 1, success: true },
    { model: "unsuccessful", time: now, success: false },
  ]) {
    await usage.saveRequestUsage({
      provider: "unpriced-route-fixture",
      model: row.model,
      apiKeyId: key.id,
      tokens: { input: 100, output: 10 },
      timestamp: new Date(row.time).toISOString(),
      success: row.success,
    });
  }
  const report = await getUnpricedUsageReport({ now: () => now });
  assert.equal(report.sinceIso, new Date(boundary).toISOString());
  assert.deepEqual(
    report.models.map((m) => m.model),
    ["boundary"]
  );
  assert.equal(report.models[0].requests, 1);
  assert.equal(report.models[0].limitedApiKeys, 1);
  assert.equal(report.limitedApiKeysAffected, 1);
});

test("report failures return a fixed error without stack traces or storage paths", async () => {
  const { secret } = accessTokens.createAccessToken({ name: "failure-reader", scope: "read" });
  core.getDbInstance().exec("ALTER TABLE usage_history RENAME TO usage_history_offline");
  try {
    const response = await GET(request(secret));
    assert.equal(response.status, 500);
    const body = await response.json();
    assert.deepEqual(body, { error: "Failed to build unpriced usage report" });
    assert.doesNotMatch(JSON.stringify(body), /at \/|storage\.sqlite|usage_history/);
  } finally {
    core.getDbInstance().exec("ALTER TABLE usage_history_offline RENAME TO usage_history");
  }
});
