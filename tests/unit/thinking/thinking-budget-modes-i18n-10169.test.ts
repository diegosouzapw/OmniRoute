/**
 * Regression guards for #10169 — Thinking Budget dashboard must use dedicated
 * i18n keys (not settings.auto / autoDesc, which are Auto Combo routing copy),
 * and AUTO mode must strip the Codex/Responses `reasoning` object.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import en from "../../../src/i18n/messages/en.json" with { type: "json" };
import vi from "../../../src/i18n/messages/vi.json" with { type: "json" };
import ptBR from "../../../src/i18n/messages/pt-BR.json" with { type: "json" };

const { applyThinkingBudget, setThinkingBudgetConfig, ThinkingMode, DEFAULT_THINKING_CONFIG } =
  await import("../../../open-sse/services/thinkingBudget.ts");

const THINKING_MODE_KEYS = [
  "thinkingBudgetIndependenceHint",
  "thinkingModePassthrough",
  "thinkingModePassthroughDesc",
  "thinkingModeAuto",
  "thinkingModeAutoDesc",
  "thinkingModeCustom",
  "thinkingModeCustomDesc",
  "thinkingModeAdaptive",
  "thinkingModeAdaptiveDesc",
] as const;

function readSource(relativePath: string): string {
  return readFileSync(new URL("../../../" + relativePath, import.meta.url), "utf8");
}

test("ThinkingBudgetTab uses dedicated thinkingMode* keys (not Auto Combo auto/autoDesc)", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/settings/components/ThinkingBudgetTab.tsx"
  );

  for (const key of [
    "thinkingModePassthrough",
    "thinkingModePassthroughDesc",
    "thinkingModeAuto",
    "thinkingModeAutoDesc",
    "thinkingModeCustom",
    "thinkingModeCustomDesc",
    "thinkingModeAdaptive",
    "thinkingModeAdaptiveDesc",
  ]) {
    assert.ok(source.includes(`"${key}"`), `expected MODES to reference ${key}`);
  }

  // Must not collide with routing's Auto Combo strings.
  assert.equal(source.includes('labelKey: "auto"'), false);
  assert.equal(source.includes('descKey: "autoDesc"'), false);
  assert.ok(source.includes("thinkingBudgetIndependenceHint"));
});

test("en/vi/pt-BR catalogs define Thinking Budget mode keys with real copy", () => {
  for (const [locale, catalog] of [
    ["en", en],
    ["vi", vi],
    ["pt-BR", ptBR],
  ] as const) {
    const settings = (catalog as { settings: Record<string, string> }).settings;
    for (const key of THINKING_MODE_KEYS) {
      const value = settings[key];
      assert.equal(typeof value, "string", `${locale}.settings.${key} missing`);
      assert.ok(value.trim().length > 0, `${locale}.settings.${key} empty`);
      assert.equal(
        /__(?:MISSING|TODO)__:?/i.test(value),
        false,
        `${locale}.settings.${key} must not be a placeholder`
      );
    }

    // Auto Combo routing copy must remain distinct from Thinking Budget Auto (strip).
    assert.notEqual(settings.thinkingModeAuto, settings.auto);
    assert.notEqual(settings.thinkingModeAutoDesc, settings.autoDesc);
  }
});

test("AUTO mode strips Codex reasoning object (effort + summary), not only reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  try {
    const body = {
      model: "gpt-5.4",
      messages: [{ role: "user", content: "hello" }],
      reasoning: { effort: "ultra", summary: "detailed" },
      reasoning_effort: "ultra",
    };
    const result = applyThinkingBudget(body) as Record<string, unknown>;
    assert.equal(result.reasoning, undefined);
    assert.equal(result.reasoning_effort, undefined);
  } finally {
    setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  }
});
