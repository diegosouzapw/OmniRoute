/**
 * Characterization tests for the catalog helper extraction (BLOCO E2 of the
 * god-files campaign). The pure, dependency-free helpers and the request/vision/
 * provider-map helpers were lifted out of `src/app/api/v1/models/catalog.ts`
 * verbatim into cohesive leaf modules so the catalog host shrinks toward the
 * file-size cap. These tests pin the behavior of each extracted helper AND guard
 * the host module's preserved public API (re-exports relied on by other tests).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  isPositiveFiniteNumber,
  parseJsonStringArray,
  intersectStringArrays,
  minKnownNumber,
  maybeOmitCatalogModelName,
} from "../../src/app/api/v1/models/catalogHelpers.ts";
import {
  qualifyOpenRouterModelId,
  normalizeOpenRouterModalities,
  getOpenRouterModelType,
  isZeroPrice,
  isOpenRouterFreeModel,
  getOpenRouterDisplayName,
} from "../../src/app/api/v1/models/catalogOpenrouter.ts";
import {
  isVisionModelId,
  getVisionCapabilityFields,
  getCustomVisionCapabilityFields,
} from "../../src/app/api/v1/models/catalogVision.ts";
import {
  FALLBACK_ALIAS_TO_PROVIDER,
  buildAliasMaps,
} from "../../src/app/api/v1/models/catalogProviderMaps.ts";
import { isCodexModelCatalogClient } from "../../src/app/api/v1/models/catalogRequest.ts";

test("catalogHelpers: isPositiveFiniteNumber", () => {
  assert.equal(isPositiveFiniteNumber(1), true);
  assert.equal(isPositiveFiniteNumber(0), false);
  assert.equal(isPositiveFiniteNumber(-1), false);
  assert.equal(isPositiveFiniteNumber(Number.NaN), false);
  assert.equal(isPositiveFiniteNumber(Infinity), false);
  assert.equal(isPositiveFiniteNumber("5"), false);
  assert.equal(isPositiveFiniteNumber(undefined), false);
});

test("catalogHelpers: parseJsonStringArray keeps only non-empty strings", () => {
  assert.deepEqual(parseJsonStringArray('["a","b"]'), ["a", "b"]);
  assert.deepEqual(parseJsonStringArray('["a", 1, "", "c"]'), ["a", "c"]);
  assert.deepEqual(parseJsonStringArray("not json"), []);
  assert.deepEqual(parseJsonStringArray(""), []);
  assert.deepEqual(parseJsonStringArray('{"x":1}'), []);
  assert.deepEqual(parseJsonStringArray(null), []);
});

test("catalogHelpers: intersectStringArrays (dedup + common)", () => {
  assert.deepEqual(
    intersectStringArrays([
      ["a", "b", "c"],
      ["b", "c", "d"],
    ]),
    ["b", "c"]
  );
  assert.deepEqual(
    intersectStringArrays([
      ["a", "a", "b"],
      ["a", "b"],
    ]),
    ["a", "b"]
  );
  assert.deepEqual(intersectStringArrays([]), []);
  assert.deepEqual(intersectStringArrays([["a"], []]), []);
});

test("catalogHelpers: minKnownNumber ignores non-positive/unknown", () => {
  assert.equal(minKnownNumber([3, 1, 2]), 1);
  assert.equal(minKnownNumber([undefined, 0, -5, 7]), 7);
  assert.equal(minKnownNumber([undefined, undefined]), undefined);
  assert.equal(minKnownNumber([]), undefined);
});

test("catalogHelpers: maybeOmitCatalogModelName drops name only when excluding", () => {
  const model = { id: "x", name: "X" };
  assert.deepEqual(maybeOmitCatalogModelName(model, true), { id: "x", name: "X" });
  assert.deepEqual(maybeOmitCatalogModelName(model, false), { id: "x" });
  // No `name` key -> returned unchanged regardless of flag.
  assert.deepEqual(maybeOmitCatalogModelName({ id: "y" }, false), { id: "y" });
});

test("catalogOpenrouter: qualify + modality normalization + type", () => {
  assert.equal(qualifyOpenRouterModelId("foo/bar"), "openrouter/foo/bar");
  assert.equal(qualifyOpenRouterModelId("openrouter/foo"), "openrouter/foo");
  assert.deepEqual(normalizeOpenRouterModalities(["text", 1, "", "image"]), ["text", "image"]);
  assert.deepEqual(normalizeOpenRouterModalities("nope"), []);
  assert.equal(getOpenRouterModelType(["text"], ["image"]), "image");
  assert.equal(getOpenRouterModelType(["text"], ["audio"]), "audio");
  assert.equal(getOpenRouterModelType(["text"], ["embedding"]), "embedding");
  assert.equal(getOpenRouterModelType(["text"], ["text"]), "chat");
});

test("catalogOpenrouter: free-model detection + display name", () => {
  assert.equal(isZeroPrice(0), true);
  assert.equal(isZeroPrice("0"), true);
  assert.equal(isZeroPrice("0.5"), false);
  assert.equal(isZeroPrice("x"), false);
  assert.equal(isOpenRouterFreeModel({ id: "z/model:free" }), true);
  assert.equal(
    isOpenRouterFreeModel({ id: "z/model", pricing: { prompt: "0", completion: "0" } }),
    true
  );
  assert.equal(
    isOpenRouterFreeModel({ id: "z/model", pricing: { prompt: "0.1", completion: "0" } }),
    false
  );
  assert.equal(getOpenRouterDisplayName({ id: "z/m", name: "Some Model" }), "Some Model");
  assert.equal(
    getOpenRouterDisplayName({ id: "z/m:free", name: "Free Model" }),
    "Free Model (Grátis)"
  );
  // Already labelled "grátis" is not double-tagged.
  assert.equal(
    getOpenRouterDisplayName({ id: "z/m:free", name: "Modelo Grátis" }),
    "Modelo Grátis"
  );
});

test("catalogVision: re-exports isVisionModelId and derives capability fields", () => {
  assert.equal(typeof isVisionModelId, "function");
  // id-based heuristic
  const visionFields = getVisionCapabilityFields("gpt-4o");
  assert.ok(visionFields, "gpt-4o must be detected as vision-capable");
  assert.equal(visionFields?.capabilities.vision, true);
  assert.equal(getVisionCapabilityFields("kimi-k2"), null);
});

test("catalogVision: getCustomVisionCapabilityFields honours explicit flag", () => {
  // explicit true wins
  assert.equal(
    getCustomVisionCapabilityFields({ supportsVision: true }, "x")?.capabilities.vision,
    true
  );
  // explicit false wins even for a vision-looking id
  assert.equal(getCustomVisionCapabilityFields({ supportsVision: false }, "gpt-4o"), null);
  // no flag -> falls back to id heuristic
  assert.equal(getCustomVisionCapabilityFields(null, "gpt-4o")?.capabilities.vision, true);
  assert.equal(getCustomVisionCapabilityFields(null, "kimi-k2"), null);
});

test("catalogProviderMaps: buildAliasMaps seeds the fallback aliases", () => {
  const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();
  assert.equal(typeof aliasToProviderId, "object");
  assert.equal(typeof providerIdToAlias, "object");
  // Fallback entries are always present even if upstream maps loaded partially.
  for (const [alias, providerId] of Object.entries(FALLBACK_ALIAS_TO_PROVIDER)) {
    assert.equal(aliasToProviderId[alias], providerId, `alias ${alias} -> ${providerId}`);
  }
  assert.equal(aliasToProviderId["cx"], "codex");
  assert.equal(aliasToProviderId["kr"], "kiro");
});

test("catalogRequest: isCodexModelCatalogClient detects codex originator/user-agent", () => {
  const byOriginator = new Request("https://x/v1/models", {
    headers: { originator: "codex_cli_rs" },
  });
  assert.equal(isCodexModelCatalogClient(byOriginator), true);
  const byUserAgent = new Request("https://x/v1/models", {
    headers: { "user-agent": "codex_exec/0.137" },
  });
  assert.equal(isCodexModelCatalogClient(byUserAgent), true);
  const other = new Request("https://x/v1/models", {
    headers: { "user-agent": "curl/8.0" },
  });
  assert.equal(isCodexModelCatalogClient(other), false);
});

test("host catalog.ts preserves its public API after the extraction", async () => {
  const host = (await import("../../src/app/api/v1/models/catalog.ts")) as Record<string, unknown>;
  assert.equal(typeof host.getUnifiedModelsResponse, "function", "getUnifiedModelsResponse export");
  assert.equal(
    typeof host.getCustomVisionCapabilityFields,
    "function",
    "getCustomVisionCapabilityFields re-export (llm-selector-custom-vision-models.test.ts)"
  );
  assert.equal(
    typeof host.isVisionModelId,
    "function",
    "isVisionModelId re-export (vision-detection-consistency.test.ts)"
  );
});
