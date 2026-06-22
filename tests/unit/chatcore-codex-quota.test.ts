// tests/unit/chatcore-codex-quota.test.ts
// Characterization of buildCodexQuotaPersistence — the pure core of handleChatCore's
// persistCodexQuotaState, extracted during the chatCore god-file decomposition (#3501). Locks the
// shape of the persisted providerSpecificData: the codexQuotaState snapshot, the existing-data
// passthrough, and the 429 dual-window exhaustion fields (codexScopeRateLimitedUntil /
// codexExhaustedWindow) plus the debug-log message. The handler keeps the DB write, the
// preflight-cache invalidation, and the log emission; this function only builds the data.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCodexQuotaPersistence } from "../../open-sse/handlers/chatCore/codexQuota.ts";
import { getCodexModelScope } from "../../open-sse/executors/codex.ts";

const MODEL = "gpt-5-codex";
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function quotaHeaders(over: Record<string, string> = {}) {
  return {
    "x-codex-5h-usage": "50",
    "x-codex-5h-limit": "100",
    "x-codex-5h-reset-at": "2999-01-01T00:00:00.000Z",
    "x-codex-7d-usage": "10",
    "x-codex-7d-limit": "100",
    "x-codex-7d-reset-at": "2999-01-08T00:00:00.000Z",
    ...over,
  };
}

test("returns null when the response carries no codex quota headers", () => {
  assert.equal(
    buildCodexQuotaPersistence({
      headers: {},
      existingProviderData: {},
      modelForScope: MODEL,
      status: 200,
    }),
    null
  );
  assert.equal(
    buildCodexQuotaPersistence({
      headers: { "content-type": "application/json" },
      existingProviderData: {},
      modelForScope: MODEL,
      status: 200,
    }),
    null
  );
});

test("builds codexQuotaState (parsed numbers + scope + updatedAt) and preserves existing provider data", () => {
  const built = buildCodexQuotaPersistence({
    headers: quotaHeaders(),
    existingProviderData: { keepMe: "yes", apiKeyHealth: { primary: {} } },
    modelForScope: MODEL,
    status: 200,
  });
  assert.ok(built);
  const qs = built.nextProviderData.codexQuotaState as Record<string, unknown>;
  assert.equal(qs.usage5h, 50);
  assert.equal(qs.limit5h, 100);
  assert.equal(qs.usage7d, 10);
  assert.equal(qs.limit7d, 100);
  assert.equal(qs.scope, getCodexModelScope(MODEL));
  assert.match(String(qs.updatedAt), ISO);
  // existing keys passed through, not dropped
  assert.equal(built.nextProviderData.keepMe, "yes");
  assert.deepEqual(built.nextProviderData.apiKeyHealth, { primary: {} });
  // non-429 → no exhaustion fields, no log
  assert.equal(built.exhaustionLog, null);
  assert.equal(built.nextProviderData.codexScopeRateLimitedUntil, undefined);
  assert.equal(built.nextProviderData.codexExhaustedWindow, undefined);
});

test("429 with a near-exhausted 5h window records the per-scope cooldown + window + log", () => {
  const built = buildCodexQuotaPersistence({
    headers: quotaHeaders({ "x-codex-5h-usage": "100" }), // ratio 1.0 >= 0.95, reset far in the future
    existingProviderData: {},
    modelForScope: MODEL,
    status: 429,
  });
  assert.ok(built);
  assert.equal(built.nextProviderData.codexExhaustedWindow, "5h");
  const scope = getCodexModelScope(MODEL);
  const scopeMap = built.nextProviderData.codexScopeRateLimitedUntil as Record<string, string>;
  assert.ok(scopeMap[scope]?.startsWith("2999-01-01T00:00:00"));
  assert.match(
    String(built.exhaustionLog),
    /^Quota exhaustion on 5h window, cooldown until 2999-01-01T00:00:00/
  );
});

test("429 merges into an existing codexScopeRateLimitedUntil map without dropping other scopes", () => {
  const built = buildCodexQuotaPersistence({
    headers: quotaHeaders({ "x-codex-5h-usage": "100" }),
    existingProviderData: {
      codexScopeRateLimitedUntil: { "other-scope": "2999-12-31T00:00:00.000Z" },
    },
    modelForScope: MODEL,
    status: 429,
  });
  assert.ok(built);
  const scopeMap = built.nextProviderData.codexScopeRateLimitedUntil as Record<string, string>;
  assert.equal(scopeMap["other-scope"], "2999-12-31T00:00:00.000Z");
  assert.ok(scopeMap[getCodexModelScope(MODEL)]);
});

test("429 below the exhaustion threshold builds the snapshot but no cooldown / no log", () => {
  const built = buildCodexQuotaPersistence({
    headers: quotaHeaders({ "x-codex-5h-usage": "1", "x-codex-7d-usage": "1" }), // ratios well under 0.95
    existingProviderData: {},
    modelForScope: MODEL,
    status: 429,
  });
  assert.ok(built);
  assert.ok(built.nextProviderData.codexQuotaState);
  assert.equal(built.exhaustionLog, null);
  assert.equal(built.nextProviderData.codexScopeRateLimitedUntil, undefined);
  assert.equal(built.nextProviderData.codexExhaustedWindow, undefined);
});
