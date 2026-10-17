import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getProviderErrorRuleMatch,
  setOperatorProviderErrorDefaults,
  setOperatorProviderErrorRules,
  resolveRuleMatchBody,
  honorsRuleLockScope,
  type OperatorProviderErrorDefault,
  type OperatorProviderErrorRule,
} from "../../open-sse/config/providerErrorRules.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

describe("operator error rules", () => {
  beforeEach(() => {
    // Isolate each test from the settings-backed cache.
    setOperatorProviderErrorRules(undefined);
    setOperatorProviderErrorDefaults(undefined);
  });

  it("operator rule overrides the catalog registry for a provider", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      nvidia: [{ status: 404, match: "Not found for account", scope: "model", cooldownMs: 1000 }],
    };
    const m = getProviderErrorRuleMatch("nvidia", 404, null, "Not found for account id 123", op);
    assert.ok(m, "operator rule should match");
    assert.equal(m.scope, "model");
    assert.equal(m.cooldownMs, 1000);
  });

  it("operator rule wins even when a catalog rule would also match", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      openrouter: [{ status: 402, match: "credits exhausted", scope: "model" }],
    };
    const m = getProviderErrorRuleMatch("openrouter", 402, null, "credits exhausted on key", op);
    assert.ok(m);
    // Catalog rule for openrouter/402 uses scope "connection"; the operator
    // override must take precedence.
    assert.equal(m.scope, "model");
  });

  it("operator can reclassify a 401 before the global permanent rule", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      acme: [
        { status: 401, match: "transient quota", scope: "connection", reason: "quota_exhausted" },
      ],
    };
    const m = getProviderErrorRuleMatch("acme", 401, null, "transient quota — retry shortly", op);
    assert.ok(m);
    assert.equal(m.scope, "connection");
    assert.equal(m.reason, "quota_exhausted");
  });

  it("unknown provider with no operator rule returns null (no throw)", () => {
    const m = getProviderErrorRuleMatch("unknown-provider", 402, null, "anything");
    assert.equal(m, null);
  });

  it("substring match is case-insensitive", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      nvidia: [{ status: 404, match: "NOT FOUND", scope: "model" }],
    };
    const m = getProviderErrorRuleMatch("nvidia", 404, null, "Body says Not Found Here", op);
    assert.ok(m);
    assert.equal(m.scope, "model");
  });

  it("status must match before the substring is considered", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      nvidia: [{ status: 404, match: "not found", scope: "model" }],
    };
    // 500 with the same body text must NOT match a 404 rule.
    const m = getProviderErrorRuleMatch("nvidia", 500, null, "not found for account", op);
    assert.equal(m, null);
  });

  it("without an operator override the catalog registry is intact", () => {
    const m = getProviderErrorRuleMatch("openrouter", 402, null, "credits exhausted on key");
    assert.ok(m);
    assert.equal(m.scope, "connection");
    assert.equal(m.cooldownMs, 2 * 60 * 1000);
  });

  it("reads the settings-backed cache via setOperatorProviderErrorRules", () => {
    setOperatorProviderErrorRules({
      nvidia: [{ status: 404, match: "Not found", scope: "model" }],
    });
    const m = getProviderErrorRuleMatch("nvidia", 404, null, "Not found for account");
    assert.ok(m);
    assert.equal(m.scope, "model");
    // Provider key lookup is case-insensitive.
    const m2 = getProviderErrorRuleMatch("NVIDIA", 404, null, "Not found here");
    assert.ok(m2);
    assert.equal(m2.scope, "model");
  });

  // Regression coverage for #11104's original gap: an operator rule for any
  // provider outside the built-in FULL_TEXT_RULE_PROVIDERS/
  // HONORS_RULE_LOCK_SCOPE_PROVIDERS allowlists was silently text-blind (only
  // {code,type} reached the matcher) and had its declared scope dropped by the
  // persistence layer. Declaring an operator rule for a provider must be
  // sufficient by itself — no separate allowlist entry required.
  describe("operator rule bypasses the built-in allowlists", () => {
    it("resolveRuleMatchBody hands the full error text once an operator rule exists for the provider", () => {
      setOperatorProviderErrorRules({
        acme: [{ status: 404, match: "model withdrawn", scope: "model" }],
      });
      const body = resolveRuleMatchBody("acme", { code: "not_found" }, "Model withdrawn upstream");
      assert.equal(body, "Model withdrawn upstream");
    });

    it("resolveRuleMatchBody keeps returning the structured error for a provider with no operator rule", () => {
      const body = resolveRuleMatchBody("acme", { code: "not_found" }, "Model withdrawn upstream");
      assert.deepEqual(body, { code: "not_found" });
    });

    it("honorsRuleLockScope is true once an operator rule exists for the provider", () => {
      assert.equal(honorsRuleLockScope("acme"), false);
      setOperatorProviderErrorRules({
        acme: [{ status: 404, match: "model withdrawn", scope: "model" }],
      });
      assert.equal(honorsRuleLockScope("acme"), true);
    });

    it("an operator rule for a non-allowlisted provider matches on raw body text end to end", () => {
      setOperatorProviderErrorRules({
        acme: [{ status: 404, match: "model withdrawn", scope: "model" }],
      });
      const body = resolveRuleMatchBody(
        "acme",
        { code: "not_found" },
        "Error: model withdrawn upstream"
      );
      const m = getProviderErrorRuleMatch("acme", 404, null, body);
      assert.ok(m, "operator rule should match once resolveRuleMatchBody hands it the raw text");
      assert.equal(m.scope, "model");
    });
  });

  describe("status is optional (match-only rules)", () => {
    const op: Record<string, OperatorProviderErrorRule[]> = {
      acme: [{ match: "insufficient_quota", scope: "connection", cooldownMs: 3_600_000 }],
    };

    it("a match-only rule matches any status carrying the code", () => {
      const body = '{"error":{"code":"insufficient_quota","message":"no credit"}}';
      const on429 = getProviderErrorRuleMatch("acme", 429, null, body, op);
      const on403 = getProviderErrorRuleMatch("acme", 403, null, body, op);
      assert.ok(on429, "429 carrying the code must match");
      assert.ok(on403, "403 carrying the code must match");
      assert.equal(on429.scope, "connection");
      assert.equal(on429.cooldownMs, 3_600_000);
      assert.equal(on403.cooldownMs, 3_600_000);
    });

    it("a match-only rule still requires its substring", () => {
      assert.equal(getProviderErrorRuleMatch("acme", 429, null, "slow down", op), null);
    });

    it("a status-only rule matches every body for that status", () => {
      const statusOnly: Record<string, OperatorProviderErrorRule[]> = {
        acme: [{ status: 402, scope: "provider", cooldownMs: 60_000 }],
      };
      const m = getProviderErrorRuleMatch("acme", 402, null, "anything at all", statusOnly);
      assert.ok(m);
      assert.equal(m.scope, "provider");
      assert.equal(getProviderErrorRuleMatch("acme", 429, null, "anything", statusOnly), null);
    });

    it("status + match are AND-ed", () => {
      const both: Record<string, OperatorProviderErrorRule[]> = {
        acme: [{ status: 429, match: "insufficient_quota", scope: "connection" }],
      };
      assert.ok(getProviderErrorRuleMatch("acme", 429, null, "insufficient_quota", both));
      assert.equal(getProviderErrorRuleMatch("acme", 403, null, "insufficient_quota", both), null);
      assert.equal(getProviderErrorRuleMatch("acme", 429, null, "rate limited", both), null);
    });

    it("a rule with neither status nor match never matches (defensive)", () => {
      const empty: Record<string, OperatorProviderErrorRule[]> = {
        acme: [{ scope: "connection", cooldownMs: 60_000 }],
      };
      assert.equal(getProviderErrorRuleMatch("acme", 429, null, "anything", empty), null);
    });

    it("checkFallbackError applies a match-only rule's cooldown and scope on a 429", () => {
      // A provider-specific code no built-in text detector knows (the built-in
      // credits/daily-quota detectors still run first for their own phrases).
      setOperatorProviderErrorRules({
        acme: [{ match: "acme_err_7731", scope: "connection", cooldownMs: 3_600_000 }],
      });
      const result = checkFallbackError(429, '{"error":{"code":"acme_err_7731"}}', 0, null, "acme");
      assert.equal(result.shouldFallback, true);
      assert.equal(result.cooldownMs, 3_600_000);
      assert.equal(result.ruleScope, "connection");
    });
  });

  describe("settings schema", () => {
    const parseRules = (rules: unknown) =>
      updateSettingsSchema.safeParse({ providerErrorRules: { acme: rules } });

    it("rejects a rule with neither status nor match", () => {
      assert.equal(parseRules([{ scope: "connection", cooldownMs: 60_000 }]).success, false);
    });

    it("accepts match-only and status-only rules", () => {
      assert.equal(
        parseRules([{ match: "insufficient_quota", scope: "connection" }]).success,
        true
      );
      assert.equal(parseRules([{ status: 429, scope: "model" }]).success, true);
    });

    it("accepts a custom cooldown up to 30 days and rejects anything longer", () => {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      assert.equal(
        parseRules([{ status: 429, scope: "model", cooldownMs: thirtyDays }]).success,
        true
      );
      assert.equal(
        parseRules([{ status: 429, scope: "model", cooldownMs: thirtyDays + 1 }]).success,
        false
      );
    });

    it("bounds the catch-all default cooldown to 1 minute .. 30 days", () => {
      const parseDefault = (value: unknown) =>
        updateSettingsSchema.safeParse({ providerErrorDefaults: { acme: value } });
      assert.equal(parseDefault({ cooldownMs: 3_600_000 }).success, true);
      assert.equal(parseDefault({ cooldownMs: 3_600_000, scope: "model" }).success, true);
      assert.equal(parseDefault({ cooldownMs: 59_999 }).success, false);
      assert.equal(parseDefault({ cooldownMs: 30 * 24 * 60 * 60 * 1000 + 1 }).success, false);
      assert.equal(parseDefault({ scope: "model" }).success, false);
    });
  });

  describe("per-provider catch-all default", () => {
    const defaults: Record<string, OperatorProviderErrorDefault> = {
      acme: { cooldownMs: 1_800_000 },
    };

    it("is not applied when the provider has no default configured", () => {
      assert.equal(getProviderErrorRuleMatch("acme", 429, null, "boom", {}, {}), null);
    });

    it("applies only when no rule matched", () => {
      const m = getProviderErrorRuleMatch("acme", 429, null, "boom", {}, defaults);
      assert.ok(m);
      assert.equal(m.cooldownMs, 1_800_000);
      assert.equal(m.scope, "connection");
      assert.equal(m.reason, "rate_limit_exceeded");

      const op: Record<string, OperatorProviderErrorRule[]> = {
        acme: [{ match: "boom", scope: "model", cooldownMs: 60_000 }],
      };
      const ruled = getProviderErrorRuleMatch("acme", 429, null, "boom", op, defaults);
      assert.ok(ruled);
      assert.equal(ruled.cooldownMs, 60_000, "a matching operator rule wins over the default");
    });

    it("a matching built-in catalog rule wins over the default", () => {
      const m = getProviderErrorRuleMatch(
        "openrouter",
        402,
        null,
        "credits exhausted on key",
        {},
        { openrouter: { cooldownMs: 7_200_000 } }
      );
      assert.ok(m);
      assert.equal(m.cooldownMs, 2 * 60 * 1000);
    });

    it("never applies to request-shape 4xx or bare 401 errors", () => {
      for (const status of [400, 401, 404, 409, 413, 422]) {
        assert.equal(
          getProviderErrorRuleMatch("acme", status, null, "boom", {}, defaults),
          null,
          `status ${status} must not hit the catch-all`
        );
      }
    });

    it("covers 402/403/408/429 and 5xx with a status-derived reason", () => {
      const reasonFor = (status: number) =>
        getProviderErrorRuleMatch("acme", status, null, "boom", {}, defaults)?.reason;
      assert.equal(reasonFor(402), "quota_exhausted");
      assert.equal(reasonFor(403), "auth_error");
      assert.equal(reasonFor(408), "server_error");
      assert.equal(reasonFor(429), "rate_limit_exceeded");
      assert.equal(reasonFor(500), "server_error");
      assert.equal(reasonFor(503), "model_capacity");
    });

    it("honors an explicit reason and scope on the default", () => {
      const m = getProviderErrorRuleMatch(
        "acme",
        500,
        null,
        "boom",
        {},
        { acme: { cooldownMs: 120_000, scope: "model", reason: "quota_exhausted" } }
      );
      assert.ok(m);
      assert.equal(m.scope, "model");
      assert.equal(m.reason, "quota_exhausted");
    });

    it("checkFallbackError uses the configured default on an unmatched 503", () => {
      setOperatorProviderErrorDefaults(defaults);
      assert.equal(honorsRuleLockScope("acme"), true, "a default is an operator opt-in");
      const result = checkFallbackError(503, "Service Unavailable", 0, null, "acme");
      assert.equal(result.shouldFallback, true);
      assert.equal(result.cooldownMs, 1_800_000);
      assert.equal(result.ruleScope, "connection");
    });

    it("checkFallbackError leaves a 400 untouched by the default", () => {
      const before = checkFallbackError(400, "invalid request: bad field", 0, null, "acme");
      setOperatorProviderErrorDefaults(defaults);
      const after = checkFallbackError(400, "invalid request: bad field", 0, null, "acme");
      assert.deepEqual(after, before);
    });
  });
});
