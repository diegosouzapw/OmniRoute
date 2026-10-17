import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cooldownFromMs,
  cooldownToMs,
  serializeErrorRulesDraft,
  toErrorRulesDraft,
  type ErrorRulesDraft,
} from "../../src/app/(dashboard)/dashboard/resilience/cooldowns/components/providerErrorRulesModel.ts";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

const HOUR = 3_600_000;

describe("operator error rules editor model", () => {
  it("maps cooldowns to presets, custom minutes, or automatic", () => {
    assert.deepEqual(cooldownFromMs(undefined), { choice: "auto", customMinutes: "" });
    assert.deepEqual(cooldownFromMs(HOUR), { choice: "1h", customMinutes: "" });
    assert.deepEqual(cooldownFromMs(90 * 60_000), { choice: "custom", customMinutes: "90" });
    assert.equal(cooldownToMs({ choice: "auto", customMinutes: "" }), undefined);
    assert.equal(cooldownToMs({ choice: "24h", customMinutes: "" }), 24 * HOUR);
    assert.equal(cooldownToMs({ choice: "custom", customMinutes: "1" }), 60_000);
    assert.equal(cooldownToMs({ choice: "custom", customMinutes: "43200" }), 30 * 24 * HOUR);
    assert.equal(cooldownToMs({ choice: "custom", customMinutes: "0" }), null);
    assert.equal(cooldownToMs({ choice: "custom", customMinutes: "43201" }), null);
    assert.equal(cooldownToMs({ choice: "custom", customMinutes: "1.5" }), null);
  });

  it("round-trips stored settings through the draft into a schema-valid payload", () => {
    const stored = {
      providerErrorRules: {
        openai: [
          { match: "insufficient_quota", scope: "connection", cooldownMs: HOUR },
          { status: 429, match: "per-minute", scope: "model", reason: "rate_limit_exceeded" },
        ],
        acme: [{ status: 402, scope: "provider", cooldownMs: 90 * 60_000 }],
      },
      providerErrorDefaults: { openai: { cooldownMs: 5 * HOUR, scope: "connection" } },
    };
    const result = serializeErrorRulesDraft(toErrorRulesDraft(stored));
    assert.deepEqual(result, { ok: true, payload: stored });
    assert.equal(updateSettingsSchema.safeParse(stored).success, true);
  });

  it("tolerates missing or malformed stored values", () => {
    assert.deepEqual(toErrorRulesDraft({}), { rules: [], defaults: [] });
    const draft = toErrorRulesDraft({
      providerErrorRules: { openai: "nope", acme: [null, { match: "x", scope: "weird" }] },
      providerErrorDefaults: { acme: { scope: "model" } },
    });
    assert.equal(draft.rules.length, 1);
    assert.equal(draft.rules[0].scope, "connection");
    assert.equal(draft.defaults.length, 0);
  });

  it("normalizes the provider key and keeps the match text verbatim", () => {
    const draft: ErrorRulesDraft = {
      rules: [
        {
          key: "a",
          provider: "  OpenAI ",
          status: "",
          match: "Insufficient Quota",
          scope: "connection",
          reason: "",
          cooldown: { choice: "auto", customMinutes: "" },
        },
      ],
      defaults: [],
    };
    assert.deepEqual(serializeErrorRulesDraft(draft), {
      ok: true,
      payload: {
        providerErrorRules: { openai: [{ match: "Insufficient Quota", scope: "connection" }] },
        providerErrorDefaults: {},
      },
    });
  });

  it("reports every blocking problem with its row", () => {
    const draft: ErrorRulesDraft = {
      rules: [
        {
          key: "a",
          provider: "",
          status: "",
          match: "",
          scope: "connection",
          reason: "",
          cooldown: { choice: "custom", customMinutes: "0" },
        },
        {
          key: "b",
          provider: "openai",
          status: "700",
          match: "",
          scope: "model",
          reason: "",
          cooldown: { choice: "1h", customMinutes: "" },
        },
      ],
      defaults: [
        {
          key: "c",
          provider: "openai",
          scope: "model",
          cooldown: { choice: "1h", customMinutes: "" },
        },
        {
          key: "d",
          provider: "OPENAI",
          scope: "model",
          cooldown: { choice: "auto", customMinutes: "" },
        },
      ],
    };
    assert.equal(serializeErrorRulesDraft(draft).ok, false);
    assert.deepEqual(serializeErrorRulesDraft(draft), {
      ok: false,
      issues: [
        { kind: "provider", target: "rule", index: 0 },
        { kind: "condition", target: "rule", index: 0 },
        { kind: "duration", target: "rule", index: 0 },
        { kind: "status", target: "rule", index: 1 },
        { kind: "duplicateDefault", target: "default", index: 1 },
        { kind: "duration", target: "default", index: 1 },
      ],
    });
  });

  it("refuses more than 50 rules", () => {
    const rules = Array.from({ length: 51 }, (_, i) => ({
      key: `r${i}`,
      provider: "openai",
      status: "429",
      match: "",
      scope: "connection" as const,
      reason: "" as const,
      cooldown: { choice: "auto" as const, customMinutes: "" },
    }));
    assert.deepEqual(serializeErrorRulesDraft({ rules, defaults: [] }), {
      ok: false,
      issues: [{ kind: "tooMany" }],
    });
  });
});
