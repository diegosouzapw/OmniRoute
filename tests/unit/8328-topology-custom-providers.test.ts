import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// #8328 — the Topology view's local getProviderConfig() only looked up the static
// AI_PROVIDERS registry; any id not present there (every custom/compatible provider
// backed by the provider_nodes table) fell back to a single hardcoded gray color
// (#6b7280), so every custom provider rendered as the same anonymous gray node —
// visually indistinguishable from any other custom provider — even though presence
// and label resolution were already correct. This guards the fix: unknown ids get a
// deterministic, distinguishable color instead of one shared gray fallback, while
// predefined AI_PROVIDERS entries stay byte-identical.

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const providerTopologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");

test("getFallbackProviderColor gives two different custom provider ids distinct colors", async () => {
  const { getFallbackProviderColor } = await import(
    "../../src/shared/utils/providerFallbackColor.ts"
  );
  const colorAlpha = getFallbackProviderColor("openai-compatible-my-custom-alpha-node");
  const colorBeta = getFallbackProviderColor("openai-compatible-my-custom-beta-node");
  assert.notEqual(
    colorAlpha,
    colorBeta,
    "two distinct custom provider ids must not resolve to the same fallback color"
  );
});

test("getFallbackProviderColor is deterministic for the same id", async () => {
  const { getFallbackProviderColor } = await import(
    "../../src/shared/utils/providerFallbackColor.ts"
  );
  const first = getFallbackProviderColor("anthropic-compatible-my-node-abc123");
  const second = getFallbackProviderColor("anthropic-compatible-my-node-abc123");
  assert.equal(first, second, "the same provider id must always resolve to the same color");
});

test("getFallbackProviderColor spreads ids across more than one palette entry", async () => {
  const { getFallbackProviderColor, FALLBACK_COLOR_PALETTE } = await import(
    "../../src/shared/utils/providerFallbackColor.ts"
  );
  assert.ok(
    FALLBACK_COLOR_PALETTE.length > 1,
    "the fallback palette must offer more than one distinguishable color"
  );
  const sampleIds = Array.from({ length: 12 }, (_, i) => `openai-compatible-custom-${i}`);
  const distinctColors = new Set(sampleIds.map((id) => getFallbackProviderColor(id)));
  assert.ok(
    distinctColors.size > 1,
    "a spread of custom provider ids must not all collapse onto a single color"
  );
});

test("ProviderTopology's getProviderConfig no longer hardcodes a single gray fallback", () => {
  assert.doesNotMatch(
    providerTopologySrc,
    /\|\|\s*\{\s*color:\s*"#6b7280"/,
    "the unknown-provider branch must no longer fall back to one hardcoded gray color"
  );
  assert.match(
    providerTopologySrc,
    /getFallbackProviderColor/,
    "getProviderConfig must resolve unknown provider ids through the deterministic fallback helper"
  );
});

test("ProviderTopology's getProviderConfig still resolves predefined AI_PROVIDERS entries first", () => {
  assert.match(
    providerTopologySrc,
    /\(AI_PROVIDERS as Record<string, ProviderConfig>\)\[providerId\]/,
    "a predefined provider id must still resolve from the static registry, unaffected by the fallback"
  );
});
