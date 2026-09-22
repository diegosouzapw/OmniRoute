import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-quota-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "claude-quota-auth-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

const EXPLICIT_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(
  provider: string,
  overrides: { name?: string; authType?: string; accessToken?: string; refreshToken?: string } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: `sk-test-${Math.random().toString(16).slice(2, 10)}`,
    accessToken: overrides.accessToken,
    refreshToken: overrides.refreshToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function scopedQuota(resetAt: string, modelId: string | null = "claude-fable-5-1") {
  return {
    remainingPercentage: 0,
    resetAt,
    claudeQuota: {
      kind: "weekly_scoped" as const,
      active: true,
      severity: "critical",
      scopeKey: "model:fable",
      modelId,
      modelDisplayName: "Fable",
    },
  };
}

async function flushWrites() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test.beforeEach(async () => {
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Claude quota cooldown resolution preserves evidence precedence", () => {
  const modelReset = {
    scope: "model" as const,
    evidence: "blocking" as const,
    resetAt: "2030-01-01T00:00:00.000Z",
    cooldownMs: 12_000,
  };
  assert.equal(quotaCache.resolveClaudeQuotaCooldownMs(modelReset, 30_000, 60_000), 12_000);
  assert.equal(
    quotaCache.resolveClaudeQuotaCooldownMs(
      { ...modelReset, scope: "connection", resetAt: null, cooldownMs: null },
      30_000,
      60_000
    ),
    60_000
  );
  assert.equal(
    quotaCache.resolveClaudeQuotaCooldownMs(
      { scope: "connection", evidence: "none", resetAt: null, cooldownMs: null },
      30_000,
      60_000
    ),
    30_000
  );
  assert.equal(
    quotaCache.resolveClaudeQuotaCooldownMs(
      { scope: "connection", evidence: "none", resetAt: null, cooldownMs: null },
      null,
      60_000
    ),
    60_000
  );
});

test("cached Claude quota scope requires fresh matching scoped-only evidence", () => {
  assert.equal(fallback.hasPerModelQuota("claude"), false);
  const connectionId = "claude-cached-scope";
  const now = Date.now();
  const futureReset = new Date(now + 120_000).toISOString();
  const decide = (
    overrides: Partial<{
      connectionId: string;
      provider: string;
      status: number;
      errorText: string;
      model: string;
      nowMs: number;
    }> = {}
  ) =>
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: "claude/claude-fable-5-1:thinking",
      nowMs: now,
      ...overrides,
    });

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(futureReset),
    }
  );
  assert.deepEqual(decide(), {
    scope: "model",
    evidence: "blocking",
    resetAt: futureReset,
    cooldownMs: 120_000,
  });
  assert.deepEqual(decide({ provider: "cc" }), decide());
  for (const status of [402, 404, 500, 502, 503, 504]) {
    assert.equal(decide({ status }).scope, "connection");
  }
  assert.equal(decide({ provider: "anthropic" }).scope, "connection");
  assert.equal(decide({ errorText: "TPM rate limit exceeded" }).scope, "connection");
  assert.equal(decide({ errorText: "RPM usage limit exceeded" }).scope, "connection");
  assert.equal(decide({ model: "claude-opus-5" }).scope, "connection");
  assert.equal(decide({ connectionId: "claude-cold-cache" }).scope, "connection");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(futureReset, null),
    }
  );
  assert.equal(decide().scope, "model");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(futureReset, "claude-opus-5"),
    }
  );
  assert.equal(decide().scope, "connection");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(new Date(now + 10 * 60_000).toISOString()),
    }
  );
  assert.equal(decide({ nowMs: now + 6 * 60_000 }).scope, "connection");

  const inactive = scopedQuota(futureReset);
  inactive.claudeQuota.active = false;
  quotaCache.setQuotaCache(connectionId, "claude", {}, { "weekly Fable (7d)": inactive });
  assert.equal(decide().scope, "connection");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(new Date(now - 1).toISOString()),
    }
  );
  assert.equal(decide().scope, "connection");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": { ...scopedQuota(futureReset), resetAt: null },
    }
  );
  assert.equal(decide().scope, "connection");

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {
      "session (5h)": {
        remainingPercentage: 0,
        resetAt: futureReset,
        claudeQuota: {
          kind: "session",
          active: true,
          severity: "critical",
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
    },
    { "weekly Fable (7d)": scopedQuota(futureReset) }
  );
  assert.equal(decide().scope, "connection");
});

test("verified current Claude payload flows from parser through live cache to model scope", () => {
  const connectionId = "claude-current-payload";
  const now = Date.now();
  const resetAt = new Date(now + 120_000).toISOString();
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    limits: [
      {
        kind: "weekly_all",
        percent: 40,
        resetsAt: resetAt,
        isActive: false,
        severity: "normal",
        scope: null,
      },
      {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: resetAt,
        isActive: true,
        severity: "critical",
        scope: { model: { displayName: "Fable" } },
      },
    ],
  });
  quotaCache.setQuotaCache(connectionId, "claude", quotas, modelQuotas);

  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-fable-5-1"),
    true
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-opus-5"),
    false
  );
  assert.equal(quotaCache.getQuotaWeightedRemainingPercent(connectionId), 60);

  assert.deepEqual(
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: "claude-fable-5-1",
      nowMs: now,
    }),
    { scope: "model", evidence: "blocking", resetAt, cooldownMs: 120_000 }
  );
});

test("scoped-only Claude refresh replaces an explicit 429 placeholder", () => {
  const connectionId = "claude-scoped-only-refresh";
  const now = Date.now();
  const resetAt = new Date(now + 120_000).toISOString();

  quotaCache.markAccountExhaustedFrom429(connectionId, "claude");
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    limits: [
      {
        kind: "weekly_scoped",
        resetsAt: resetAt,
        isActive: true,
        severity: "critical",
        scope: { model: { displayName: "Fable" } },
      },
    ],
  });
  quotaCache.setQuotaCache(connectionId, "claude", quotas, modelQuotas);

  assert.deepEqual(
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: "claude-fable-5-1",
      nowMs: now,
    }),
    { scope: "model", evidence: "blocking", resetAt, cooldownMs: 120_000 }
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-opus-5"),
    false
  );
});

test("Claude session preflight allows upstream recovery opt-ins without bypassing weekly limits", () => {
  const connectionId = "claude-session-recovery-preflight";
  const futureReset = new Date(Date.now() + 120_000).toISOString();
  const sessionQuota = {
    remainingPercentage: 0,
    resetAt: futureReset,
    claudeQuota: {
      kind: "session" as const,
      active: true,
      severity: "critical",
      scopeKey: null,
      modelId: null,
      modelDisplayName: null,
    },
  };
  const weeklyQuota = {
    ...sessionQuota,
    claudeQuota: { ...sessionQuota.claudeQuota, kind: "weekly_all" as const },
  };

  quotaCache.setQuotaCache(connectionId, "claude", { "session (5h)": sessionQuota });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-opus-5"),
    true
  );
  for (const providerSpecificData of [
    { lowPriorityMode: true, autoLimitReset: false },
    { lowPriorityMode: false, autoLimitReset: true },
  ]) {
    assert.equal(
      quotaCache.isQuotaExhaustedForRequest(
        connectionId,
        "claude",
        "claude-opus-5",
        providerSpecificData
      ),
      false
    );
  }

  quotaCache.setQuotaCache(connectionId, "claude", { "weekly (7d)": weeklyQuota });
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-opus-5", {
      lowPriorityMode: true,
      autoLimitReset: true,
    }),
    true
  );

  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {},
    { "weekly Fable (7d)": scopedQuota(futureReset) }
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, "claude", "claude-fable-5-1", {
      lowPriorityMode: true,
      autoLimitReset: true,
    }),
    true
  );
});

test("active critical current limits route by upstream state without a percent threshold", () => {
  const connectionId = "claude-current-active-state";
  const now = Date.now();
  const resetAt = new Date(now + 120_000).toISOString();

  for (const [index, percent] of [undefined, 37].entries()) {
    const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
      limits: [
        {
          kind: "weekly_scoped",
          ...(percent === undefined ? {} : { percent }),
          resetsAt: resetAt,
          isActive: true,
          severity: "critical",
          scope: { model: { displayName: "Fable" } },
        },
      ],
    });
    quotaCache.setQuotaCache(`${connectionId}-${index}`, "claude", quotas, modelQuotas);

    assert.deepEqual(
      quotaCache.getCachedClaudeQuotaScopeDecision({
        connectionId: `${connectionId}-${index}`,
        provider: "claude",
        status: 429,
        errorText: EXPLICIT_QUOTA_ERROR,
        model: "claude-fable-5-1",
        nowMs: now,
      }),
      { scope: "model", evidence: "blocking", resetAt, cooldownMs: 120_000 }
    );
  }
});

test("explicit noncritical severity does not produce model-scoped Claude exhaustion", () => {
  const now = Date.now();
  const resetAt = new Date(now + 120_000).toISOString();

  for (const severity of ["normal", "warning"]) {
    const connectionId = `claude-${severity}-scope`;
    const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
      limits: [
        {
          kind: "weekly_scoped",
          percent: 100,
          resetsAt: resetAt,
          isActive: true,
          severity,
          scope: { model: { displayName: "Fable" } },
        },
      ],
    });
    quotaCache.setQuotaCache(connectionId, "claude", quotas, modelQuotas);

    assert.deepEqual(
      quotaCache.getCachedClaudeQuotaScopeDecision({
        connectionId,
        provider: "claude",
        status: 429,
        errorText: EXPLICIT_QUOTA_ERROR,
        model: "claude-fable-5-1",
        nowMs: now,
      }),
      { scope: "connection", evidence: "none", resetAt: null, cooldownMs: null },
      severity
    );
  }
});

test("active Claude global limits take precedence with the latest proven reset", () => {
  const now = Date.now();
  const sessionReset = new Date(now + 60_000).toISOString();
  const weeklyReset = new Date(now + 180_000).toISOString();
  const decide = (connectionId: string) =>
    quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: "claude-fable-5-1",
      nowMs: now,
    });

  for (const [kind, resetAt] of [
    ["session", sessionReset],
    ["weekly_all", weeklyReset],
  ] as const) {
    const connectionId = `claude-${kind}-precedence`;
    quotaCache.setQuotaCache(
      connectionId,
      "claude",
      {
        [kind]: {
          remainingPercentage: 75,
          resetAt,
          claudeQuota: {
            kind,
            active: true,
            severity: "critical",
            scopeKey: null,
            modelId: null,
            modelDisplayName: null,
          },
        },
      },
      { "weekly Fable (7d)": scopedQuota(new Date(now + 30_000).toISOString()) }
    );
    assert.deepEqual(decide(connectionId), {
      scope: "connection",
      evidence: "blocking",
      resetAt,
      cooldownMs: new Date(resetAt).getTime() - now,
    });
  }

  const connectionId = "claude-global-precedence";
  quotaCache.setQuotaCache(
    connectionId,
    "claude",
    {
      "session (5h)": {
        remainingPercentage: 55,
        resetAt: sessionReset,
        claudeQuota: {
          kind: "session",
          active: true,
          severity: "critical",
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
      "weekly (7d)": {
        remainingPercentage: 80,
        resetAt: weeklyReset,
        claudeQuota: {
          kind: "weekly_all",
          active: true,
          severity: null,
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
    },
    { "weekly Fable (7d)": scopedQuota(new Date(now + 120_000).toISOString()) }
  );

  assert.deepEqual(decide(connectionId), {
    scope: "connection",
    evidence: "blocking",
    resetAt: weeklyReset,
    cooldownMs: 180_000,
  });

  quotaCache.setQuotaCache(
    "claude-global-missing-reset",
    "claude",
    {
      "session (5h)": {
        remainingPercentage: 10,
        resetAt: null,
        claudeQuota: {
          kind: "session",
          active: true,
          severity: "critical",
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
    },
    {
      "weekly Fable (7d)": scopedQuota(new Date(now + 120_000).toISOString()),
    }
  );
  assert.deepEqual(decide("claude-global-missing-reset"), {
    scope: "connection",
    evidence: "blocking",
    resetAt: null,
    cooldownMs: null,
  });
});

test("unknown and unmatched active Claude model scopes fail connection-wide with their reset", () => {
  const now = Date.now();
  const resetAt = new Date(now + 120_000).toISOString();

  const scenarios = [
    {
      connectionId: "claude-unknown-scope",
      scope: null,
    },
    {
      connectionId: "claude-unmatched-scope",
      scope: { model: { id: "claude-opus-5", displayName: "Opus" } },
    },
  ];

  for (const scenario of scenarios) {
    const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
      limits: [
        {
          kind: "weekly_scoped",
          resetsAt: resetAt,
          isActive: true,
          severity: "critical",
          scope: scenario.scope,
        },
      ],
    });
    quotaCache.setQuotaCache(scenario.connectionId, "claude", quotas, modelQuotas);

    assert.deepEqual(
      quotaCache.getCachedClaudeQuotaScopeDecision({
        connectionId: scenario.connectionId,
        provider: "claude",
        status: 429,
        errorText: EXPLICIT_QUOTA_ERROR,
        model: "claude-fable-5-1",
        nowMs: now,
      }),
      { scope: "connection", evidence: "blocking", resetAt, cooldownMs: 120_000 },
      scenario.connectionId
    );
  }
});

test("connection-scoped Claude persistence uses its exact blocker reset", async () => {
  const connection = await seedConnection("claude", {
    name: "claude-exact-connection-reset",
    authType: "oauth",
    accessToken: "claude-exact-connection-reset-access",
    refreshToken: "claude-exact-connection-reset-refresh",
  });
  const now = Date.now();
  const unrelatedReset = new Date(now + 30_000).toISOString();
  const blockerReset = new Date(now + 180_000).toISOString();
  quotaCache.setQuotaCache(connection.id, "claude", {
    "session (5h)": {
      remainingPercentage: 50,
      resetAt: unrelatedReset,
      claudeQuota: {
        kind: "session",
        active: false,
        severity: "normal",
        scopeKey: null,
        modelId: null,
        modelDisplayName: null,
      },
    },
    "weekly (7d)": {
      remainingPercentage: 42,
      resetAt: blockerReset,
      claudeQuota: {
        kind: "weekly_all",
        active: true,
        severity: "critical",
        scopeKey: null,
        modelId: null,
        modelDisplayName: null,
      },
    },
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "claude",
    "claude-fable-5-1"
  );
  await flushWrites();
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.ok(result.cooldownMs > 170_000 && result.cooldownMs <= 180_000);
  assert.equal(updated.rateLimitedUntil, blockerReset);
});

test("proven Claude blockers without a future reset use the classified fallback cooldown", async () => {
  for (const resetKind of ["missing", "past"] as const) {
    const connection = await seedConnection("claude", {
      name: `claude-${resetKind}-blocker-reset`,
      authType: "oauth",
      accessToken: `claude-${resetKind}-blocker-access`,
      refreshToken: `claude-${resetKind}-blocker-refresh`,
    });
    const now = Date.now();
    const unrelatedReset = new Date(now + 90_000).toISOString();
    quotaCache.setQuotaCache(connection.id, "claude", {
      "session (5h)": {
        remainingPercentage: 90,
        resetAt: unrelatedReset,
        claudeQuota: {
          kind: "session",
          active: false,
          severity: "normal",
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
      "weekly (7d)": {
        remainingPercentage: 20,
        resetAt: resetKind === "missing" ? null : new Date(now - 60_000).toISOString(),
        claudeQuota: {
          kind: "weekly_all",
          active: true,
          severity: "critical",
          scopeKey: null,
          modelId: null,
          modelDisplayName: null,
        },
      },
    });

    const decision = quotaCache.getCachedClaudeQuotaScopeDecision({
      connectionId: connection.id,
      provider: "claude",
      status: 429,
      errorText: EXPLICIT_QUOTA_ERROR,
      model: "claude-fable-5-1",
      nowMs: now,
    });
    assert.equal(decision.evidence, "blocking");
    assert.equal(decision.resetAt, null);

    const result = await auth.markAccountUnavailable(
      connection.id,
      429,
      EXPLICIT_QUOTA_ERROR,
      "claude",
      "claude-fable-5-1"
    );
    await flushWrites();
    const updated = await providersDb.getProviderConnectionById(connection.id);
    const persistedResetMs = Date.parse(String(updated.rateLimitedUntil));

    assert.ok(result.cooldownMs >= 5 * 60_000, resetKind);
    assert.ok(persistedResetMs >= now + 5 * 60_000, resetKind);
    assert.notEqual(updated.rateLimitedUntil, unrelatedReset, resetKind);
  }
});

test("matching native Claude quota locks only the failed model until the scoped reset", async () => {
  const failedModel = "claude-fable-5-1";
  const siblingModel = "claude-opus-5";
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  const connection = await seedConnection("claude", {
    name: "claude-model-limit",
    authType: "oauth",
    accessToken: "claude-model-limit-access",
    refreshToken: "claude-model-limit-refresh",
  });
  quotaCache.setQuotaCache(
    connection.id,
    "claude",
    {},
    {
      "weekly Fable (7d)": scopedQuota(resetAt),
    }
  );

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "claude",
    failedModel
  );
  await flushWrites();
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0 && result.cooldownMs <= 120_000);
  assert.equal(updated.isActive, true);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(fallback.isModelLocked("claude", connection.id, failedModel), true);
  assert.equal(fallback.isModelLocked("claude", connection.id, siblingModel), false);

  const failedSelection = await auth.getProviderCredentials("claude", null, null, failedModel);
  const siblingSelection = await auth.getProviderCredentials("claude", null, null, siblingModel);
  assert.equal(failedSelection.allRateLimited, true);
  assert.equal(failedSelection.cooldownScope, "model");
  assert.equal(siblingSelection.connectionId, connection.id);
});

test("global or unproven native Claude quota failures stay connection-wide", async () => {
  const futureReset = new Date(Date.now() + 120_000).toISOString();
  for (const scenario of ["global", "nonmatching", "missing", "generic"] as const) {
    const connection = await seedConnection("claude", {
      name: `claude-${scenario}-quota`,
      authType: "oauth",
      accessToken: `claude-${scenario}-access`,
      refreshToken: `claude-${scenario}-refresh`,
    });
    if (scenario === "global") {
      quotaCache.setQuotaCache(connection.id, "claude", {
        "weekly (7d)": {
          remainingPercentage: 0,
          resetAt: futureReset,
          claudeQuota: {
            kind: "weekly_all",
            active: true,
            severity: "critical",
            scopeKey: null,
            modelId: null,
            modelDisplayName: null,
          },
        },
      });
    } else if (scenario === "nonmatching") {
      quotaCache.setQuotaCache(
        connection.id,
        "claude",
        {},
        {
          "weekly Opus (7d)": scopedQuota(futureReset, "claude-opus-5"),
        }
      );
    }

    await auth.markAccountUnavailable(
      connection.id,
      429,
      scenario === "generic" ? "TPM rate limit exceeded" : EXPLICIT_QUOTA_ERROR,
      "claude",
      "claude-fable-5-1"
    );
    await flushWrites();
    const updated = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(updated.testStatus, "unavailable", scenario);
    assert.ok(updated.rateLimitedUntil, scenario);
    assert.equal(fallback.isModelLocked("claude", connection.id, "claude-fable-5-1"), false);
  }
});

test("Claude non-quota failure scopes and Anthropic API-key behavior follow provider policy", async () => {
  const paymentRequired = await seedConnection("claude", {
    name: "claude-status-402",
    authType: "oauth",
    accessToken: "claude-status-402-access",
    refreshToken: "claude-status-402-refresh",
  });
  await auth.markAccountUnavailable(
    paymentRequired.id,
    402,
    "payment required",
    "claude",
    "claude-fable-5-1"
  );
  await flushWrites();
  const paymentUpdated = await providersDb.getProviderConnectionById(paymentRequired.id);
  assert.equal(fallback.isModelLocked("claude", paymentRequired.id, "claude-fable-5-1"), false);
  assert.notEqual(paymentUpdated.testStatus, "active");

  const transient500 = await seedConnection("claude", {
    name: "claude-status-500",
    authType: "oauth",
    accessToken: "claude-status-500-access",
    refreshToken: "claude-status-500-refresh",
  });
  await auth.markAccountUnavailable(
    transient500.id,
    500,
    "upstream unavailable",
    "claude",
    "claude-fable-5-1"
  );
  await flushWrites();
  const transientUpdated = await providersDb.getProviderConnectionById(transient500.id);
  assert.equal(fallback.isModelLocked("claude", transient500.id, "claude-fable-5-1"), false);
  assert.equal(transientUpdated.testStatus, "active");

  for (const status of [404, 502, 503, 504]) {
    const connection = await seedConnection("claude", {
      name: `claude-model-status-${status}`,
      authType: "oauth",
      accessToken: `claude-model-status-${status}-access`,
      refreshToken: `claude-model-status-${status}-refresh`,
    });
    await auth.markAccountUnavailable(
      connection.id,
      status,
      "upstream unavailable",
      "claude",
      "claude-fable-5-1"
    );
    await flushWrites();
    const updated = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(
      fallback.isModelLocked("claude", connection.id, "claude-fable-5-1"),
      true,
      String(status)
    );
    assert.equal(updated.testStatus, "active", String(status));
  }

  const anthropic = await seedConnection("anthropic", { name: "anthropic-api-key-quota" });
  await auth.markAccountUnavailable(
    anthropic.id,
    429,
    EXPLICIT_QUOTA_ERROR,
    "anthropic",
    "claude-fable-5-1"
  );
  await flushWrites();
  const updated = await providersDb.getProviderConnectionById(anthropic.id);
  assert.equal(fallback.isModelLocked("anthropic", anthropic.id, "claude-fable-5-1"), false);
  assert.notEqual(updated.testStatus, "active");
});
