import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  detectSupportedThinkingEfforts,
  normalizeDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import { transformModelsDevToCapabilities } from "../../src/lib/modelsDevSync/transform.ts";
import { getThinkingCapabilityFields } from "../../src/app/api/v1/models/catalogHelpers.ts";

// Live upstreams publish reasoning tiers as objects, not strings, and each
// vendor picked a different object. The generic discovery path only read
// `{ effort }`, so the other two shapes synced a model with no tier list and
// the import had nothing to carry.

test("grok-build reasoning_efforts objects {value,id} survive the generic discovery path", () => {
  const record = {
    id: "grok-x",
    reasoning: {
      supported_efforts: [
        { value: "low", id: "low" },
        { value: "high", id: "high" },
      ],
    },
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high"]);
});

test("models.dev reasoning_options effort values survive the generic discovery path", () => {
  const record = {
    id: "gpt-x",
    reasoning_options: [{ type: "effort", values: ["low", "high", "max"] }],
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high", "max"]);
});

test("a string effort list still wins over an object list declared beside it", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "model-i",
      reasoning: { supported_efforts: ["low"] },
      reasoning_options: [{ type: "effort", values: ["high", "max"] }],
    },
  ]);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["low"]);
});

test("models.dev sync keeps the effort values from reasoning_options", () => {
  const caps = transformModelsDevToCapabilities({
    openai: {
      id: "openai",
      models: {
        "gpt-x": {
          id: "gpt-x",
          name: "GPT-X",
          reasoning: true,
          reasoning_options: [{ type: "effort", values: ["low", "high", "max"] }],
        },
      },
    },
  } as never);
  assert.deepEqual(caps.openai["gpt-x"].reasoning_efforts, ["low", "high", "max"]);
});

test("models.dev sync leaves reasoning_efforts null when the catalog declares none", () => {
  const caps = transformModelsDevToCapabilities({
    openai: {
      id: "openai",
      models: {
        "gpt-y": { id: "gpt-y", name: "GPT-Y", reasoning: false },
      },
    },
  } as never);
  assert.equal(caps.openai["gpt-y"].reasoning_efforts, null);
});

test("reasoning enabled without declared effort tiers still syncs null", () => {
  const budgetOnly = transformModelsDevToCapabilities({
    openrouter: {
      id: "openrouter",
      models: {
        "z-ai/glm5": {
          id: "z-ai/glm5",
          reasoning: true,
          reasoning_options: [{ type: "budget", values: [1024, 2048] }],
        },
      },
    },
  } as never);
  assert.equal(budgetOnly.openrouter["z-ai/glm5"].reasoning, true);
  assert.equal(budgetOnly.openrouter["z-ai/glm5"].reasoning_efforts, null);

  const emptyOptions = transformModelsDevToCapabilities({
    openrouter: {
      id: "openrouter",
      models: {
        "z-ai/glm5": { id: "z-ai/glm5", reasoning: true, reasoning_options: [] },
      },
    },
  } as never);
  assert.equal(emptyOptions.openrouter["z-ai/glm5"].reasoning_efforts, null);
});

test("normalizeDiscoveredModels falls back to reasoning_options when no effort list is declared", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "z-ai/glm5",
      reasoning_options: [{ type: "effort", values: ["low", "medium", "high"] }],
    },
  ]);
  assert.deepEqual(model.supportedThinkingEfforts, ["low", "medium", "high"]);
});

test("sync deduplicates effort values repeated across reasoning_options entries", () => {
  const caps = transformModelsDevToCapabilities({
    openrouter: {
      id: "openrouter",
      models: {
        "z-ai/glm5": {
          id: "z-ai/glm5",
          reasoning: true,
          reasoning_options: [
            { type: "effort", values: ["low", "high"] },
            { type: "effort", values: ["high", "max"] },
          ],
        },
      },
    },
  } as never);
  assert.deepEqual(caps.openrouter["z-ai/glm5"].reasoning_efforts, ["low", "high", "max"]);
});

test("catalog thinking fields use supplied synced tiers and do not open SQLite", () => {
  const dataDir = process.env.DATA_DIR;
  assert.equal(typeof dataDir, "string");
  const sqlitePath = path.join(dataDir as string, "storage.sqlite");
  const existed = fs.existsSync(sqlitePath);
  const supplied = getThinkingCapabilityFields("openai", "gpt-x", true, undefined, false, [
    "low",
    "max",
  ]);
  assert.deepEqual(supplied.effort_tiers, ["low", "max"]);
  const canonical = getThinkingCapabilityFields("openai", "gpt-undeclared", true);
  assert.deepEqual(canonical.effort_tiers, ["none", "low", "medium", "high", "xhigh", "max"]);
  assert.equal(fs.existsSync(sqlitePath), existed);
});

test("a declared flat effort list wins over reasoning_options during normalization", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "z-ai/glm5",
      supportedThinkingEfforts: ["low"],
      reasoning_options: [{ type: "effort", values: ["high", "max"] }],
    },
  ]);
  assert.deepEqual(model.supportedThinkingEfforts, ["low"]);
});
