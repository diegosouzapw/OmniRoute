import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getProviderErrorRuleMatch,
  setOperatorProviderErrorRules,
  resolveRuleMatchBody,
  honorsRuleLockScope,
  type OperatorProviderErrorRule,
} from "../../open-sse/config/providerErrorRules.ts";

describe("operator error rules", () => {
  beforeEach(() => {
    // Isolate each test from the settings-backed cache.
    setOperatorProviderErrorRules(undefined);
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
});
