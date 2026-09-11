import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fable-usage-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "fable-usage-test-secret";

const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");
const { parseQuotaData } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts");
const { GET } = await import("../../src/app/api/usage/[connectionId]/route.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getProviderLimitsCache } = await import("../../src/lib/db/providerLimits.ts");
const { getQuotaCache } = await import("../../src/domain/quotaCache.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const originalFetch = globalThis.fetch;
const resetAt = "2099-09-10T15:59:59.522764+00:00";
const normalizedResetAt = "2099-09-10T15:59:59.522Z";
const fableKey = "weekly fable (7d)";

function scopedLimit(percent: unknown = 100) {
  return {
    kind: "weekly_scoped",
    group: "weekly",
    percent,
    resets_at: resetAt,
    scope: { model: { display_name: "Fable" } },
  };
}

function mockUsage(limits: unknown, unavailable = false) {
  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/api/oauth/usage") && !unavailable) {
      return Response.json({
        five_hour: { utilization: 12, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 34, resets_at: "2099-09-16T13:00:00Z" },
        seven_day_omelette: null,
        limits,
      });
    }
    return new Response(null, { status: 503 });
  };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("Fable percentages remain separate from shared quotas and render as percentage rows", async () => {
  for (const percent of [0, 27.5, 100]) {
    mockUsage([scopedLimit(percent)]);
    const usage = await getClaudeUsage("fable-test-token");
    const rows = parseQuotaData("claude", usage);
    const fable = rows.find((row) => row.name === fableKey);
    assert.ok(fable, `missing Fable row for ${percent}% used`);
    assert.equal(fable.used, percent);
    assert.equal(fable.remainingPercentage, 100 - percent);
    assert.equal(fable.resetAt, normalizedResetAt);
    assert.ok("modelQuotas" in usage);
    assert.equal(usage.modelQuotas[fableKey].unlimited, false);
    assert.notEqual(fable.unlimited, true);
    assert.equal(fable.isPercentageOnly, true);
    assert.equal(rows.find((row) => row.name === "session (5h)")?.used, 12);
    assert.equal(rows.find((row) => row.name === "weekly (7d)")?.used, 34);
    assert.equal(rows.length, 3);
  }
});

test("missing or invalid Fable telemetry never becomes a zero or unlimited quota", async () => {
  for (const limits of [
    undefined,
    null,
    {},
    [],
    [null],
    [scopedLimit(null)],
    [scopedLimit("100")],
    [scopedLimit(-1)],
    [scopedLimit(101)],
    [{ ...scopedLimit(), kind: "weekly_all" }],
    [{ ...scopedLimit(), scope: null }],
    [{ ...scopedLimit(), scope: { model: { display_name: "Something else" } } }],
  ]) {
    mockUsage(limits);
    const rows = parseQuotaData("claude", await getClaudeUsage("fable-test-token"));
    assert.equal(rows.length, 2);
    assert.equal(
      rows.some((row) => row.name === fableKey),
      false
    );
  }
});

test("Fable reset data stays independent and missing resets stay unknown", async () => {
  for (const resets_at of [null, "invalid", "2099-09-17T16:00:00Z"]) {
    mockUsage([{ ...scopedLimit(), resets_at }]);
    const rows = parseQuotaData("claude", await getClaudeUsage("fable-test-token"));
    assert.equal(
      rows.find((row) => row.name === fableKey)?.resetAt,
      resets_at === "2099-09-17T16:00:00Z" ? "2099-09-17T16:00:00.000Z" : null
    );
  }
});

test("usage API persists per-account Fable rows without changing account-wide routing quotas", async () => {
  const ids: string[] = [];
  for (const percent of [100, 25]) {
    const connection = await createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: `Fable usage ${percent}`,
      email: `fable-${percent}@example.test`,
      accessToken: `fable-token-${percent}`,
      isActive: true,
      expiresAt: "2099-01-01T00:00:00Z",
    });
    const id = connection.id as string;
    ids.push(id);
    mockUsage([scopedLimit(percent)]);
    const response = await GET(new Request("http://localhost/api/usage/test"), {
      params: Promise.resolve({ connectionId: id }),
    });
    assert.equal(response.status, 200);
    const usage = await response.json();
    assert.equal(
      parseQuotaData("claude", usage).find((row) => row.name === fableKey)?.used,
      percent
    );
    assert.equal(
      parseQuotaData("claude", getProviderLimitsCache(id)).find((row) => row.name === fableKey)
        ?.used,
      percent
    );
    assert.deepEqual(Object.keys(getQuotaCache(id)?.quotas ?? {}).sort(), [
      "session (5h)",
      "weekly (7d)",
    ]);
  }
  assert.equal(
    parseQuotaData("claude", getProviderLimitsCache(ids[0])).find((row) => row.name === fableKey)
      ?.used,
    100
  );

  mockUsage(null, true);
  const staleResponse = await GET(new Request("http://localhost/api/usage/test"), {
    params: Promise.resolve({ connectionId: ids[0] }),
  });
  const stale = await staleResponse.json();
  assert.equal(stale._stale, true);
  assert.equal(parseQuotaData("claude", stale).find((row) => row.name === fableKey)?.used, 100);
});
