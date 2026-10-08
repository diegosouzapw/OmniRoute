import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

// Live grok-cli /v1/models (2026-09-22) returns each tier as an object, not a string:
// { id, value, label, description, default }. The parser kept only string items,
// so the non-empty object list counted as "explicit" and the fallback never ran.
const liveTier = (value: string, isDefault = false) => ({
  id: value,
  value,
  label: value,
  description: value,
  default: isDefault,
});

test("grok-cli discovery keeps object reasoning tiers, including xhigh", () => {
  const models = PROVIDER_MODELS_CONFIG["grok-cli"].parseResponse({
    data: [
      {
        id: "grok-4.7",
        model: "grok-4.7",
        name: "Grok 4.7",
        context_window: 500000,
        api_backend: "responses",
        reasoning_effort: "high",
        supports_reasoning_effort: true,
        reasoning_efforts: [
          liveTier("xhigh"),
          liveTier("high", true),
          liveTier("medium"),
          liveTier("low"),
        ],
      },
    ],
  });

  assert.equal(models.length, 1);
  assert.equal(models[0].id, "grok-4.7");
  assert.equal(models[0].supportsThinking, true);
  assert.deepEqual(models[0].supportedThinkingEfforts, ["xhigh", "high", "medium", "low"]);
});

test("an empty value string does not hide a usable id", () => {
  const models = PROVIDER_MODELS_CONFIG["grok-cli"].parseResponse({
    data: [
      {
        id: "grok-4.7",
        apiBackend: "responses",
        reasoning_efforts: [
          { id: "xhigh", value: "" },
          { id: "high", value: "high" },
        ],
      },
    ],
  });

  assert.deepEqual(models[0].supportedThinkingEfforts, ["xhigh", "high"]);
});

test("grok-4.7 without an effort still leaves with the build default", () => {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-4.7",
    { model: "grok-4.7", input: "hi" },
    false,
    {}
  ) as { reasoning?: { effort?: string } };
  assert.equal(out.reasoning?.effort, "high");
});
