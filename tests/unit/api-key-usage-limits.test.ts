import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-usage-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "usage-limit-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("@/lib/db/settings");
const localDb = { updatePricing };
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const NOW = Date.parse("2026-06-19T20:00:00.000Z");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("API key USD usage limits persist and default off", async () => {
  const created = await apiKeysDb.createApiKey("Usage Limit Key", "machine-limit-01");

  let metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.usageLimitEnabled, false);
  assert.equal(metadata?.dailyUsageLimitUsd, null);
  assert.equal(metadata?.weeklyUsageLimitUsd, null);

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 10.5,
    weeklyUsageLimitUsd: 50,
  });
  apiKeysDb.clearApiKeyCaches();

  metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metadata?.usageLimitEnabled, true);
  assert.equal(metadata?.dailyUsageLimitUsd, 10.5);
  assert.equal(metadata?.weeklyUsageLimitUsd, 50);
});

test("getApiKeyUsageLimitStatus aligns weekly USD spend with provider resetAt when available", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-opus-4-8": {
        input: 1,
        cached: 1,
        output: 1,
        reasoning: 1,
        cache_creation: 1,
      },
    },
  });

  const created = await apiKeysDb.createApiKey("Metered Key", "machine-limit-02");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 10,
    weeklyUsageLimitUsd: 20,
  });

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    apiKeyId: created.id,
    apiKeyName: "Metered Key",
    tokens: { input: 2_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-19T12:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    apiKeyId: created.id,
    apiKeyName: "Metered Key",
    tokens: { input: 3_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-18T21:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    apiKeyId: created.id,
    apiKeyName: "Metered Key",
    tokens: { input: 7_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-18T12:00:00.000Z",
  });

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);

  const weeklyResetAt = "2026-06-25T20:00:00.000Z";
  const status = await usageLimits.getApiKeyUsageLimitStatus(
    { ...metadata, allowedConnections: ["conn-claude"] },
    {
      now: () => NOW,
      getProviderConnectionById: async () => ({
        id: "conn-claude",
        provider: "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => ({
        plan: "Claude Max",
        quotas: {
          "weekly (7d)": {
            used: 27,
            total: 100,
            resetAt: weeklyResetAt,
          },
        },
        message: null,
        fetchedAt: new Date(NOW).toISOString(),
      }),
      getAllProviderLimitsCache: () => ({}),
    }
  );

  assert.equal(status.enabled, true);
  assert.equal(status.dailySpentUsd, 2);
  assert.equal(status.weeklySpentUsd, 5);
  assert.equal(status.dailyLimitUsd, 10);
  assert.equal(status.weeklyLimitUsd, 20);
  assert.equal(status.dailyResetAtIso, "2026-06-20T03:00:00.000Z");
  assert.equal(status.weeklyWindowStartIso, "2026-06-18T20:00:00.000Z");
  assert.equal(status.weeklyResetAtIso, weeklyResetAt);
  assert.equal(status.dailyExceeded, false);
  assert.equal(status.weeklyExceeded, false);
});

test("getApiKeyUsageLimitStatus cuts weekly USD spend at observed provider quota reset", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-opus-4-8": {
        input: 1,
        cached: 1,
        output: 1,
        reasoning: 1,
        cache_creation: 1,
      },
    },
  });

  const created = await apiKeysDb.createApiKey("Reset Cut Key", "machine-limit-reset");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 10,
    weeklyUsageLimitUsd: 20,
  });

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    apiKeyId: created.id,
    apiKeyName: "Reset Cut Key",
    tokens: { input: 7_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-19T23:30:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    apiKeyId: created.id,
    apiKeyName: "Reset Cut Key",
    tokens: { input: 2_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-20T02:00:00.000Z",
  });

  const db = core.getDbInstance();
  const insertSnapshot = db.prepare(`
    INSERT INTO quota_snapshots (
      provider,
      connection_id,
      window_key,
      remaining_percentage,
      is_exhausted,
      next_reset_at,
      window_duration_ms,
      raw_data,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertSnapshot.run(
    "claude",
    "conn-claude",
    "weekly (7d)",
    72,
    0,
    "2026-06-25T23:00:00.000Z",
    null,
    null,
    "2026-06-19T23:55:00.000Z"
  );
  insertSnapshot.run(
    "claude",
    "conn-claude",
    "weekly (7d)",
    100,
    0,
    "2026-06-25T23:00:00.000Z",
    null,
    null,
    "2026-06-20T01:42:52.590Z"
  );
  insertSnapshot.run(
    "claude",
    "conn-claude",
    "weekly (7d)",
    99,
    0,
    "2026-06-25T23:00:00.000Z",
    null,
    null,
    "2026-06-20T02:10:00.000Z"
  );
  db.prepare(
    `
    INSERT INTO provider_quota_reset_events
      (provider, connection_id, window_key, window_started_at, window_resets_at,
       observed_at, previous_remaining_percentage, new_remaining_percentage,
       previous_used_percentage, new_used_percentage, raw_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "claude",
    "conn-claude",
    "weekly (7d)",
    "2026-06-18T23:00:00.000Z",
    "2026-06-25T23:00:00.000Z",
    "2026-06-18T23:04:00.000Z",
    0,
    100,
    100,
    0,
    null
  );

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);

  const weeklyResetAt = "2026-06-25T23:00:00.000Z";
  const status = await usageLimits.getApiKeyUsageLimitStatus(
    { ...metadata, allowedConnections: ["conn-claude"] },
    {
      now: () => Date.parse("2026-06-20T14:30:00.000Z"),
      getProviderConnectionById: async () => ({
        id: "conn-claude",
        provider: "claude",
        isActive: true,
      }),
      getProviderConnections: async () => [],
      getProviderLimitsCache: () => ({
        plan: "Claude Max",
        quotas: {
          "weekly (7d)": {
            used: 5,
            total: 100,
            resetAt: weeklyResetAt,
          },
        },
        message: null,
        fetchedAt: "2026-06-20T14:30:00.000Z",
      }),
      getAllProviderLimitsCache: () => ({}),
    }
  );

  assert.equal(status.weeklyWindowStartIso, "2026-06-20T01:42:52.590Z");
  assert.equal(status.weeklySpentUsd, 2);
});

const WEEKLY_WINDOW_ENV_KEYS = [
  "OMNIROUTE_API_KEY_WEEKLY_WINDOW",
  "OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE",
  "TZ",
] as const;

async function withWeeklyWindowEnv<T>(
  values: Partial<Record<(typeof WEEKLY_WINDOW_ENV_KEYS)[number], string>>,
  run: () => Promise<T>
): Promise<T> {
  const saved = Object.fromEntries(WEEKLY_WINDOW_ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of WEEKLY_WINDOW_ENV_KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try {
    return await run();
  } finally {
    for (const key of WEEKLY_WINDOW_ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

// A shared multi-account pool: two upstream accounts whose weekly resets are
// days apart. In provider mode the key's window follows the earliest one.
function sharedPoolDeps(now: number) {
  const connections = [
    { id: "pool-a", provider: "codex", isActive: true },
    { id: "pool-b", provider: "codex", isActive: true },
  ];
  const caches: Record<string, { quotas: Record<string, { resetAt: string }> }> = {
    "pool-a": { quotas: { weekly: { resetAt: "2026-09-23T06:47:00.000Z" } } },
    "pool-b": { quotas: { weekly: { resetAt: "2026-09-28T02:20:00.000Z" } } },
  };
  return {
    now: () => now,
    getProviderConnectionById: async (id: string) => connections.find((c) => c.id === id) ?? null,
    getProviderConnections: async () => connections,
    getProviderLimitsCache: (id: string) => (caches[id] ?? null) as never,
    getAllProviderLimitsCache: () => caches as never,
  };
}

async function seedSharedPoolKey(name: string) {
  await localDb.updatePricing({
    codex: { "gpt-test": { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 } },
  });
  const created = await apiKeysDb.createApiKey(name, `machine-${name}`);
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd: 100,
  });
  // Sunday 2026-09-20 15:00Z = Sunday 23:00 in Asia/Shanghai (previous local week).
  // Monday 2026-09-21 02:00Z = Monday 10:00 in Asia/Shanghai (current local week).
  for (const [input, timestamp] of [
    [40_000_000, "2026-09-16T08:00:00.000Z"],
    [7_000_000, "2026-09-20T15:00:00.000Z"],
    [3_000_000, "2026-09-21T02:00:00.000Z"],
  ] as const) {
    await usageHistory.saveRequestUsage({
      provider: "codex",
      model: "gpt-test",
      apiKeyId: created.id,
      apiKeyName: name,
      tokens: { input, output: 0 },
      success: true,
      timestamp,
    });
  }
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);
  return metadata;
}

// Wednesday 2026-09-23 05:55Z = Wednesday 13:55 in Asia/Shanghai.
const POOL_NOW = Date.parse("2026-09-23T05:55:00.000Z");

test("weekly window defaults to the earliest provider reset when the env is unset", async () => {
  const metadata = await seedSharedPoolKey("pool-default");
  const status = await withWeeklyWindowEnv({}, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, sharedPoolDeps(POOL_NOW))
  );

  assert.equal(status.weeklyResetAtIso, "2026-09-23T06:47:00.000Z");
  assert.equal(status.weeklyWindowStartIso, "2026-09-16T06:47:00.000Z");
  assert.equal(status.weeklySpentUsd, 50);
});

test("calendar weekly window starts Monday 00:00 in the configured timezone", async () => {
  const metadata = await seedSharedPoolKey("pool-calendar");
  const status = await withWeeklyWindowEnv(
    {
      OMNIROUTE_API_KEY_WEEKLY_WINDOW: "calendar",
      OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE: "Asia/Shanghai",
    },
    () => usageLimits.getApiKeyUsageLimitStatus(metadata, sharedPoolDeps(POOL_NOW))
  );

  assert.equal(status.weeklyWindowStartIso, "2026-09-20T16:00:00.000Z");
  assert.equal(status.weeklyResetAtIso, "2026-09-27T16:00:00.000Z");
  assert.equal(status.weeklySpentUsd, 3);
  assert.equal(status.weeklyExceeded, false);
});

test("calendar weekly window does not move when the pool's accounts reset", async () => {
  const metadata = await seedSharedPoolKey("pool-stable");
  const env = {
    OMNIROUTE_API_KEY_WEEKLY_WINDOW: "calendar",
    OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE: "Asia/Shanghai",
  };
  const before = await withWeeklyWindowEnv(env, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, sharedPoolDeps(POOL_NOW))
  );
  // One hour later pool-a has reset; provider mode would jump to pool-b's window.
  const afterDeps = sharedPoolDeps(POOL_NOW + 60 * 60 * 1000);
  const after = await withWeeklyWindowEnv(env, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, afterDeps)
  );

  assert.equal(after.weeklyWindowStartIso, before.weeklyWindowStartIso);
  assert.equal(after.weeklyResetAtIso, before.weeklyResetAtIso);
  assert.equal(after.weeklySpentUsd, before.weeklySpentUsd);

  // Contrast: provider mode, same key, same hour.
  const providerBefore = await withWeeklyWindowEnv({}, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, sharedPoolDeps(POOL_NOW))
  );
  const providerAfter = await withWeeklyWindowEnv({}, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, afterDeps)
  );
  assert.equal(providerBefore.weeklySpentUsd, 50);
  assert.equal(providerAfter.weeklyWindowStartIso, "2026-09-21T02:20:00.000Z");
  assert.equal(providerAfter.weeklySpentUsd, 0);
});

test("calendar weekly window uses the process timezone when no timezone is configured", async () => {
  const metadata = await seedSharedPoolKey("pool-process-tz");
  const status = await withWeeklyWindowEnv(
    { OMNIROUTE_API_KEY_WEEKLY_WINDOW: "calendar", TZ: "UTC" },
    () => usageLimits.getApiKeyUsageLimitStatus(metadata, sharedPoolDeps(POOL_NOW))
  );

  assert.equal(status.weeklyWindowStartIso, "2026-09-21T00:00:00.000Z");
  assert.equal(status.weeklyResetAtIso, "2026-09-28T00:00:00.000Z");
  assert.equal(status.weeklySpentUsd, 3);
});

test("invalid weekly window values fall back instead of failing requests", () => {
  assert.deepEqual(
    usageLimits.getApiKeyWeeklyWindowSetting({
      OMNIROUTE_API_KEY_WEEKLY_WINDOW: "fortnight",
      OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE: "Asia/Shanghai",
    }),
    { mode: "provider", timeZone: "Asia/Shanghai" }
  );
  const fallback = usageLimits.getApiKeyWeeklyWindowSetting({
    OMNIROUTE_API_KEY_WEEKLY_WINDOW: " Calendar ",
    OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE: "Not/AZone",
  });
  assert.equal(fallback.mode, "calendar");
  assert.equal(fallback.timeZone, Intl.DateTimeFormat().resolvedOptions().timeZone);
});

test("buildApiKeyUsageLimitText returns API-key quota spend percentage and reset lines", async () => {
  const text = usageLimits.buildApiKeyUsageLimitText(
    {
      enabled: true,
      dailyLimitUsd: 10,
      weeklyLimitUsd: 50,
      dailySpentUsd: 2,
      weeklySpentUsd: 5.25,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: "2026-06-25T20:00:00.000Z",
      dailyExceeded: false,
      weeklyExceeded: false,
    },
    Date.parse("2026-06-19T20:00:00.000Z")
  );

  assert.equal(
    text,
    [
      "Daily quota",
      "$10.00",
      "Daily spent",
      "$2.00",
      "Daily used",
      "20%",
      "Resets in 7h 0m",
      "",
      "Weekly quota",
      "$50.00",
      "Weekly spent",
      "$5.25",
      "Weekly used",
      "11%",
      "Resets in 6d 0h 0m",
    ].join("\n")
  );
});

test("buildApiKeyUsageLimitPercentText returns remaining percentages only", () => {
  const text = usageLimits.buildApiKeyUsageLimitPercentText(
    {
      enabled: true,
      dailyLimitUsd: 10,
      weeklyLimitUsd: 50,
      dailySpentUsd: 2,
      weeklySpentUsd: 5.25,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: "2026-06-25T20:00:00.000Z",
      dailyExceeded: false,
      weeklyExceeded: false,
    },
    Date.parse("2026-06-19T20:00:00.000Z")
  );

  assert.equal(
    text,
    ["Daily", "80% left", "⏱ reset in 7h 0m", "", "Weekly", "90% left", "⏱ reset in 6d 0h 0m"].join(
      "\n"
    )
  );
});

test("buildApiKeyUsageLimitRejection includes over-quota percentage and reset hint", async () => {
  const response = usageLimits.buildApiKeyUsageLimitRejection(
    new Request("http://localhost/v1/messages", {
      headers: { "anthropic-version": "2023-06-01" },
    }),
    {
      enabled: true,
      dailyLimitUsd: 10,
      weeklyLimitUsd: 1,
      dailySpentUsd: 0.25,
      weeklySpentUsd: 1.09,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: "2026-06-25T20:00:00.000Z",
      dailyExceeded: false,
      weeklyExceeded: true,
    },
    Date.parse("2026-06-19T20:00:00.000Z")
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { message: string } };
  assert.equal(
    body.error.message,
    "This API key reached its weekly USD usage quota ($1.09 of $1.00, 109%). Resets in 6d 0h 0m. Choose another allowed model after reset."
  );
});

test("buildApiKeyUsageLimitRejection can hide USD amounts for client-facing policy errors", async () => {
  const response = usageLimits.buildApiKeyUsageLimitRejection(
    new Request("http://localhost/v1/messages", {
      headers: { "anthropic-version": "2023-06-01" },
    }),
    {
      enabled: true,
      dailyLimitUsd: 10,
      weeklyLimitUsd: 1,
      dailySpentUsd: 0.25,
      weeklySpentUsd: 1.09,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: "2026-06-25T20:00:00.000Z",
      dailyExceeded: false,
      weeklyExceeded: true,
    },
    Date.parse("2026-06-19T20:00:00.000Z"),
    { showUsd: false }
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { message: string } };
  assert.equal(
    body.error.message,
    "This API key reached its weekly usage quota (109%). Resets in 6d 0h 0m. Choose another allowed model after reset."
  );
});

test("buildApiKeyUsageLimitRejection uses 400 so Claude Code does not trigger login", () => {
  const response = usageLimits.buildApiKeyUsageLimitRejection(
    new Request("http://localhost/v1/messages", {
      headers: { "anthropic-version": "2023-06-01" },
    }),
    {
      enabled: true,
      dailyLimitUsd: 10,
      weeklyLimitUsd: 50,
      dailySpentUsd: 12,
      weeklySpentUsd: 20,
      dailyWindowStartIso: "2026-06-19T03:00:00.000Z",
      dailyResetAtIso: "2026-06-20T03:00:00.000Z",
      weeklyWindowStartIso: "2026-06-12T20:00:00.000Z",
      weeklyResetAtIso: "2026-06-19T20:00:00.000Z",
      dailyExceeded: true,
      weeklyExceeded: false,
    }
  );

  assert.equal(response.status, 400);
});
