/**
 * #11481 — explicit model exposure allow/deny list for `/v1/models` (and, via the
 * mirror in `open-sse/services/autoCombo/modelExposureFilter.ts`, the `auto/*`
 * candidate pool). Follows the `hidePaidModels`/`hideAutoCombos` opt-in shape
 * (`src/lib/db/settings.ts`): default-off, two independent string arrays.
 *
 * Tests the pure predicate `isModelExposureAllowed()` — the single chokepoint
 * both `catalog.ts` and the combo-pool mirror call into.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { isModelExposureAllowed } from "@/shared/utils/modelExposureList";

test("default off (both lists empty) — every model is exposed", () => {
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", {}), true);
  assert.equal(
    isModelExposureAllowed("openai", "gpt-4o", {
      modelVisibilityAllowlist: [],
      modelVisibilityDenylist: [],
    }),
    true
  );
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", null), true);
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", undefined), true);
});

test("denylist hides an exact-id match, leaves everything else exposed", () => {
  const settings = { modelVisibilityDenylist: ["openai/gpt-4o"] };
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", settings), false);
  assert.equal(isModelExposureAllowed("openai", "gpt-4o-mini", settings), true);
  assert.equal(isModelExposureAllowed("anthropic", "claude-opus-5", settings), true);
});

test("denylist also matches the bare model id (no provider prefix required)", () => {
  const settings = { modelVisibilityDenylist: ["gpt-4o"] };
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", settings), false);
});

test("allowlist restricts exposure to exactly the listed models", () => {
  const settings = { modelVisibilityAllowlist: ["openai/gpt-4o-mini", "anthropic/claude-opus-5"] };
  assert.equal(isModelExposureAllowed("openai", "gpt-4o-mini", settings), true);
  assert.equal(isModelExposureAllowed("anthropic", "claude-opus-5", settings), true);
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", settings), false);
  assert.equal(isModelExposureAllowed("google", "gemini-2.5-pro", settings), false);
});

test("denylist wins over allowlist for the same entry (deny is checked first)", () => {
  const settings = {
    modelVisibilityAllowlist: ["openai/gpt-4o"],
    modelVisibilityDenylist: ["openai/gpt-4o"],
  };
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", settings), false);
});

test("glob patterns are supported via the shared globToRegex matcher", () => {
  const denyGlob = { modelVisibilityDenylist: ["openai/gpt-4*"] };
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", denyGlob), false);
  assert.equal(isModelExposureAllowed("openai", "gpt-4.1", denyGlob), false);
  assert.equal(isModelExposureAllowed("openai", "o1-preview", denyGlob), true);

  const allowGlob = { modelVisibilityAllowlist: ["anthropic/*"] };
  assert.equal(isModelExposureAllowed("anthropic", "claude-opus-5", allowGlob), true);
  assert.equal(isModelExposureAllowed("openai", "gpt-4o", allowGlob), false);
});

test("non-array / malformed list values are treated as empty (fail open, never throw)", () => {
  assert.equal(
    isModelExposureAllowed("openai", "gpt-4o", {
      modelVisibilityDenylist: "openai/gpt-4o" as unknown as string[],
    }),
    true
  );
  assert.equal(
    isModelExposureAllowed("openai", "gpt-4o", {
      modelVisibilityDenylist: [123 as unknown as string, "  "],
    }),
    true
  );
});
