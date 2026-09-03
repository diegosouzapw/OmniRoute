import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectSupportedThinkingEfforts,
  normalizeDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import { buildProviderModelsUrl } from "@/app/api/providers/[id]/models/discoveryClientVersion";

// #8347: generic openai-compatible / custom-node discovery had no metadata-mapping layer
// for `supported_reasoning_levels` (CLIProxyAPI-style upstreams) or `thinking.levels`. This
// suite proves the two new shapes are parsed onto the existing `supportedThinkingEfforts`
// pipeline, that the #7694 precedence order is preserved, and that the `client_version`
// opt-in touches the model-list URL only — never inference URLs — and defaults off.

test("supported_reasoning_levels as {effort} objects is parsed into supportedThinkingEfforts", () => {
  const record = {
    id: "model-a",
    supported_reasoning_levels: [{ effort: "low" }, { effort: "high" }],
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high"]);
});

test("supported_reasoning_levels as plain strings is parsed into supportedThinkingEfforts", () => {
  const record = {
    id: "model-b",
    supported_reasoning_levels: ["low", "medium"],
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "medium"]);
});

test("thinking.levels is parsed into supportedThinkingEfforts", () => {
  const record = {
    id: "model-c",
    thinking: { levels: ["medium", "high"] },
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["medium", "high"]);
});

test("duplicates are deduped, max is canonical, unknown native tier retained", () => {
  const record = {
    id: "model-d",
    supported_reasoning_levels: [{ effort: "max" }, { effort: "max" }, { effort: "ultra" }],
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["max", "ultra"]);
});

test("a malformed entry inside an otherwise-valid array is dropped, the rest survive, no throw", () => {
  const record = {
    id: "model-e",
    supported_reasoning_levels: [{ effort: "low" }, { effort: 42 }, null, "high", 7],
  };
  assert.doesNotThrow(() => detectSupportedThinkingEfforts(record));
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high"]);
});

test("a fully malformed shape degrades to undefined instead of throwing", () => {
  const record = { id: "model-f", supported_reasoning_levels: "not-an-array" };
  assert.doesNotThrow(() => detectSupportedThinkingEfforts(record));
  assert.equal(detectSupportedThinkingEfforts(record), undefined);
});

test("precedence: flat supportedThinkingEfforts wins over reasoning.supported_efforts and both new shapes (#7694 regression guard)", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "model-g",
      supportedThinkingEfforts: ["none"],
      reasoning: { supported_efforts: ["low"] },
      supported_reasoning_levels: ["medium"],
      thinking: { levels: ["high"] },
    },
  ]);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["none"]);
});

test("precedence: reasoning.supported_efforts wins over supported_reasoning_levels and thinking.levels", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "model-h",
      reasoning: { supported_efforts: ["low"] },
      supported_reasoning_levels: ["medium"],
      thinking: { levels: ["high"] },
    },
  ]);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["low"]);
});

test("precedence: supported_reasoning_levels wins over thinking.levels when both present", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "model-i",
      supported_reasoning_levels: ["medium"],
      thinking: { levels: ["high"] },
    },
  ]);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["medium"]);
});

test("thinking.levels alone still populates supportedThinkingEfforts via normalizeDiscoveredModels", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "model-j",
      thinking: { levels: ["high"] },
    },
  ]);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["high"]);
});
test("CrofAI reasoning_effort true maps to the supported effort tiers", () => {
  const [model] = normalizeDiscoveredModels(
    [{ id: "crof-reasoning-model", reasoning_effort: true }],
    "crof"
  );
  assert.equal(model.supportsThinking, true);
  assert.deepEqual(model.supportedThinkingEfforts, ["none", "low", "medium", "high", "max"]);
});

test("Command Code discovery supplies provider-wide effort tiers when /models omits them", () => {
  const [model] = normalizeDiscoveredModels(
    [{ id: "command-code-live-model", name: "Command Code Live Model" }],
    "command-code"
  );
  assert.equal(model.supportsThinking, true);
  assert.deepEqual(model.supportedThinkingEfforts, ["low", "medium", "high", "xhigh", "max"]);
});

test("CrofAI false or absent reasoning_effort adds no reasoning metadata", () => {
  const models = normalizeDiscoveredModels(
    [{ id: "crof-no-reasoning", reasoning_effort: false }, { id: "crof-unknown-reasoning" }],
    "crof"
  );
  for (const model of models) {
    assert.equal(model.supportsThinking, undefined);
    assert.equal("supportedThinkingEfforts" in model, false);
  }
});

test("reasoning_effort boolean remains provider-scoped", () => {
  assert.deepEqual(
    normalizeDiscoveredModels(
      [{ id: "other-provider-model", reasoning_effort: true, custom_reasoning: true }],
      "other-provider"
    ),
    [{ id: "other-provider-model", name: "other-provider-model", source: "imported" }]
  );
});

test("explicit effort tiers take precedence over the CrofAI boolean fallback", () => {
  const models = normalizeDiscoveredModels(
    [
      {
        id: "crof-flat-tiers",
        reasoning_effort: true,
        supportedThinkingEfforts: ["low", "high"],
      },
      {
        id: "crof-nested-tiers",
        reasoning_effort: true,
        reasoning: { supported_efforts: ["medium"] },
      },
    ],
    "crof"
  );
  assert.deepEqual(models[0].supportedThinkingEfforts, ["low", "high"]);
  assert.deepEqual(models[1].supportedThinkingEfforts, ["medium"]);
});

test("client_version is absent from the model-list URL by default", () => {
  const url = buildProviderModelsUrl("https://example.com/v1/models", undefined);
  assert.equal(url, "https://example.com/v1/models");
  assert.ok(!url.includes("client_version"));
});

test("client_version is present on the model-list URL only when the connection opts in", () => {
  const url = buildProviderModelsUrl("https://example.com/v1/models", {
    discoveryClientVersionEnabled: true,
    discoveryClientVersion: "1.2.3",
  });
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("client_version"), "1.2.3");
});

test("client_version opt-in without an explicit version still defaults off (no gate silently mutates every request)", () => {
  const url = buildProviderModelsUrl("https://example.com/v1/models", {
    discoveryClientVersionEnabled: false,
    discoveryClientVersion: "1.2.3",
  });
  assert.ok(!url.includes("client_version"));
});

test("metadata.reasoning.supported_efforts (neuralwatt shape) is parsed into supportedThinkingEfforts", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "neuralwatt/glm-5.2",
      metadata: {
        reasoning: { supported_efforts: ["max", "high", "none"] },
        capabilities: { reasoning_effort: true },
      },
    },
  ]);
  // `max` is a first-class canonical tier (#11875) and is preserved as-is.
  assert.deepEqual(model.supportedThinkingEfforts, ["max", "high", "none"]);
});

test("metadata.reasoning.supported_efforts does not override a top-level declared tier list", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "both-shapes",
      reasoning: { supported_efforts: ["medium"] },
      metadata: { reasoning: { supported_efforts: ["max", "none"] } },
    },
  ]);
  assert.deepEqual(model.supportedThinkingEfforts, ["medium"]);
});

test("malformed metadata.reasoning shape degrades to undefined, does not throw", () => {
  const models = normalizeDiscoveredModels([
    { id: "bad-metadata-1", metadata: { reasoning: { supported_efforts: "not-an-array" } } },
    { id: "bad-metadata-2", metadata: { reasoning: 42 } },
    { id: "bad-metadata-3", metadata: null },
  ]);
  for (const model of models) {
    assert.equal("supportedThinkingEfforts" in model, false);
  }
});
