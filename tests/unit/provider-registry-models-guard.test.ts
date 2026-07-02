import { test } from "node:test";
import assert from "node:assert/strict";
import { REGISTRY, getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

// Regression guard for `TypeError: entry.models is not iterable`.
//
// A registry entry can legitimately have no static model catalogue — e.g. the
// `mimocode` proxy provider, whose `models` is `undefined`. The byModelId map
// builder already tolerates this (`if (entry.models && entry.models.length > 0)`),
// but `getUnsupportedParams` had two unguarded accesses:
//   - `ensureUnsupportedParamsPopulated()` iterated `entry.models` for EVERY entry,
//   - the per-provider lookup did `entry?.models.find(...)`.
// Either one threw on the first call once a model-less entry existed, which made
// `handleChatCore` report "All models failed" for unrelated requests.

test("getUnsupportedParams does not throw when a registry entry has no models (mimocode regression)", () => {
  // This call triggers ensureUnsupportedParamsPopulated() which walks ALL entries.
  assert.doesNotThrow(() => getUnsupportedParams("openai", "gpt-4o"));
});

test("getUnsupportedParams returns [] for a model-less proxy provider", () => {
  assert.deepEqual(getUnsupportedParams("mimocode", "anything"), []);
});

test("provider registry model entries keep capabilities and compatibility metadata nested", () => {
  const legacyTopLevelKeys = [
    "contextLength",
    "maxOutputTokens",
    "toolCalling",
    "supportsToolCall",
    "supportsReasoning",
    "supportsThinking",
    "supportsVision",
    "supportsXHighEffort",
    "supportsMaxEffort",
    "supportedThinkingEfforts",
    "maxThinkingBudget",
    "targetFormat",
    "strip",
    "unsupportedParams",
    "compatibility",
    "interleavedField",
  ] as const;

  const violations: string[] = [];
  for (const [providerId, entry] of Object.entries(REGISTRY)) {
    for (const model of entry.models ?? []) {
      for (const key of legacyTopLevelKeys) {
        if (Object.prototype.hasOwnProperty.call(model, key)) {
          violations.push(`${providerId}/${model.id}.${key}`);
        }
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    `registry model entries must use capabilities/compat metadata: ${violations.join(", ")}`
  );
});

test("provider registry model IDs are unique within each provider", () => {
  const duplicates: string[] = [];
  for (const [providerId, entry] of Object.entries(REGISTRY)) {
    const seen = new Set<string>();
    for (const model of entry.models ?? []) {
      if (seen.has(model.id)) duplicates.push(`${providerId}/${model.id}`);
      seen.add(model.id);
    }
  }

  assert.deepEqual(
    duplicates,
    [],
    `registry model IDs must be unique within each provider: ${duplicates.join(", ")}`
  );
});
