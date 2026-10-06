/**
 * effort_tiers loop — plugin maps server-declared tiers to ModelV2 variants.
 * Blind mapping (I3): no owned_by/provider knowledge here — the SERVER gates
 * eligibility (shouldExposeSyncedEffortVariants). Absence semantics (M3):
 * no tiers => NO variants key at all (an empty object would also kill
 * opencode's own fallback for non-tiered models).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mapRawModelToModelV2, type OmniRouteRawModelEntry } from "../src/index.js";

const CTX = { providerId: "omniroute", baseURL: "http://127.0.0.1:20128" } as const;

test("maps declared tiers to reasoningEffort variants", () => {
  const raw: OmniRouteRawModelEntry = {
    id: "oc/x-preview-f-free",
    owned_by: "opencode",
    capabilities: { reasoning: true, effort_tiers: ["low", "high", "max"] },
  };
  const model = mapRawModelToModelV2(raw, { ...CTX });
  const variants = (model as unknown as Record<string, unknown>).variants as
    Record<string, Record<string, unknown>> | undefined;
  assert.ok(variants, "variants key present when tiers declared");
  assert.deepEqual(Object.keys(variants).sort(), ["high", "low", "max"]);
  assert.deepEqual(variants.max, { reasoningEffort: "max" });
  assert.deepEqual(variants.low, { reasoningEffort: "low" });
});

test("no tiers => NO variants key (not an empty object)", () => {
  const raw: OmniRouteRawModelEntry = {
    id: "plain-model",
    capabilities: { reasoning: true },
  };
  const model = mapRawModelToModelV2(raw, { ...CTX }) as unknown as Record<string, unknown>;
  assert.equal("variants" in model, false);
});

test("empty or malformed tiers array => NO variants key", () => {
  const empty = mapRawModelToModelV2(
    { id: "m", capabilities: { effort_tiers: [] } },
    { ...CTX }
  ) as unknown as Record<string, unknown>;
  assert.equal("variants" in empty, false);

  const junk = mapRawModelToModelV2(
    { id: "m", capabilities: { effort_tiers: [42, null, "ok"] as unknown as string[] } },
    { ...CTX }
  ) as unknown as Record<string, unknown>;
  const variants = junk.variants as Record<string, Record<string, unknown>> | undefined;
  assert.deepEqual(Object.keys(variants ?? {}), ["ok"], "non-string tokens dropped");
});

test("static registry entry WITH tiers also gets variants (N1 blast radius)", () => {
  const raw: OmniRouteRawModelEntry = {
    id: "some-static-model",
    owned_by: "registry",
    capabilities: { effort_tiers: ["minimal", "high"] },
  };
  const model = mapRawModelToModelV2(raw, { ...CTX }) as unknown as Record<string, unknown>;
  const variants = model.variants as Record<string, Record<string, unknown>> | undefined;
  assert.deepEqual(Object.keys(variants ?? {}).sort(), ["high", "minimal"]);
});
