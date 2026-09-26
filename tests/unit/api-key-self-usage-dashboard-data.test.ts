import test from "node:test";
import assert from "node:assert/strict";

import { SELF_SERVICE_FIXTURE } from "./fixtures/apiKeySelfServiceView.ts";

const quota = await import("../../src/app/(dashboard)/dashboard/api-manager/selfServiceQuota.ts");
const details =
  await import("../../src/app/(dashboard)/dashboard/api-manager/[id]/apiKeyDetailsData.ts");

test("readSelfServiceQuota keeps null (all), [] (none) and subsets distinct", () => {
  assert.deepEqual(quota.readSelfServiceQuota({}), {
    sharedQuotaProviders: null,
    anthropicRateLimitHeaders: "auto",
  });
  assert.deepEqual(
    quota.readSelfServiceQuota({ sharedQuotaProviders: [] }).sharedQuotaProviders,
    []
  );
  assert.deepEqual(
    quota.readSelfServiceQuota({
      sharedQuotaProviders: [" anthropic ", "anthropic", "codex", 7],
      anthropicRateLimitHeaders: "strip",
    }),
    { sharedQuotaProviders: ["anthropic", "codex"], anthropicRateLimitHeaders: "strip" }
  );
  assert.equal(
    quota.readSelfServiceQuota({ anthropicRateLimitHeaders: "bogus" }).anthropicRateLimitHeaders,
    "auto"
  );
});

test("quotaProviderOptions lists providers of reachable active connections", () => {
  const connections = [
    { id: "a", provider: "anthropic", isActive: true },
    { id: "b", provider: "anthropic", isActive: true },
    { id: "c", provider: "codex", isActive: true },
    { id: "d", provider: "gemini", isActive: false },
  ];
  assert.deepEqual(quota.quotaProviderOptions(connections, null), [
    { provider: "anthropic", connectionCount: 2 },
    { provider: "codex", connectionCount: 1 },
  ]);
  assert.deepEqual(quota.quotaProviderOptions(connections, ["c", "d"]), [
    { provider: "codex", connectionCount: 1 },
  ]);
  assert.deepEqual(quota.toggleSharedQuotaProvider(["anthropic"], "anthropic"), []);
  assert.deepEqual(quota.toggleSharedQuotaProvider([], "codex"), ["codex"]);
});

test("parseSelfServiceView maps the contract §3 status body", () => {
  const view = details.parseSelfServiceView(SELF_SERVICE_FIXTURE);
  assert.ok(view);
  assert.deepEqual(view.apiKey, { id: "key-1", name: "Team key" });
  assert.deepEqual(view.settings.sharedQuotaProviders, ["anthropic"]);
  assert.deepEqual(view.visibility, { selfUsage: true, accountQuota: false });
  assert.equal(view.availableProviders[1].quotaSupported, false);
  assert.equal(view.usage.daily?.tokens.total, 168);
  assert.equal(view.usage.weekly?.requests, 80);

  const [usd, tokens] = view.limits;
  assert.equal(usd.utilization, 1, "utilization is clamped to [0,1]");
  assert.equal(usd.exceeded, true);
  assert.deepEqual(tokens.scope, { type: "provider", value: "anthropic" });
  assert.equal(tokens.resetAt, null);

  const [stale, unavailable] = view.accountQuotas;
  assert.equal(stale.label, "t***@e***.com");
  assert.equal(stale.stale, true);
  assert.equal(stale.plan, "max");
  assert.deepEqual(stale.quotas, [
    { name: "five_hour", usedPercentage: 42, resetAt: "2026-09-24T12:00:00.000Z" },
  ]);
  assert.equal(unavailable.unavailableReason, "not_supported");
  assert.equal(unavailable.stale, false);
  assert.deepEqual(unavailable.quotas, []);
});

test("parsers degrade to empty values for a partial or foreign body", () => {
  assert.equal(details.parseSelfServiceView(null), null);
  const view = details.parseSelfServiceView({ status: { limits: "nope" } });
  assert.ok(view);
  assert.deepEqual(view.limits, []);
  assert.deepEqual(view.accountQuotas, []);
  assert.equal(view.usage.daily, null);
  assert.deepEqual(
    details.parseTokenLimits({ limits: [{ id: "x", scopeType: "odd" }] })[0].scopeType,
    "global"
  );
  assert.deepEqual(details.parseKeyQuota({ limits: { tpmLimit: 0, rpmLimit: 30 } }).tpmLimit, null);
});

test("limit inputs: blank = unlimited, invalid = undefined", () => {
  assert.equal(details.parseOptionalLimitInput(""), null);
  assert.equal(details.parseOptionalLimitInput("0"), null);
  assert.equal(details.parseOptionalLimitInput("2.5"), 2.5);
  assert.equal(details.parseOptionalLimitInput("-1"), undefined);
  assert.equal(details.parseOptionalLimitInput("abc"), undefined);
});

test("withVisibilityScopes only touches the self-service scopes", () => {
  const scopes = ["manage", "self:usage", "self:account-quota"];
  assert.deepEqual(details.withVisibilityScopes(scopes, { selfUsage: true, accountQuota: false }), [
    "manage",
    "self:usage",
  ]);
  assert.deepEqual(
    details.withVisibilityScopes(["manage"], { selfUsage: false, accountQuota: true }),
    ["manage"]
  );
});

test("safeApiErrorMessage never surfaces raw JSON or long text", () => {
  assert.equal(
    details.safeApiErrorMessage({ error: "Key not found" }, "fallback"),
    "Key not found"
  );
  assert.equal(details.safeApiErrorMessage({ error: '{"a":1}' }, "fallback"), "fallback");
  assert.equal(details.safeApiErrorMessage({ error: "x".repeat(300) }, "fallback"), "fallback");
  assert.equal(details.safeApiErrorMessage(null, "fallback"), "fallback");
});
