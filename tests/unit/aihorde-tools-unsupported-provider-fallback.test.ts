import { test } from "node:test";
import assert from "node:assert/strict";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

// Live incident: after adding aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1
// to the "default" combo, real OpenClaw traffic carrying a 25-tool schema hit a
// 500 Internal Server Error from AI Horde's Aphrodite backend on every attempt.
// The pipeline artifact showed `tools` still present, unstripped, in the request
// actually sent upstream (providerRequest.body.tools).
//
// Root cause: `unsupportedParams: ["tools", "tool_choice", "parallel_tool_calls"]`
// is declared on the 3 models statically listed in the aihorde registry entry
// (Cydonia-24B, Skyfall-31B, google/gemma-4-31b) — but AI Horde uses
// `passthroughModels: true` (its live worker roster changes constantly), so
// Behemoth-X-123B — like every other dynamically-discovered aihorde model — has
// NO model-specific unsupportedParams entry at all, and getUnsupportedParams()
// returned [] for it, so tools never got stripped. But the limitation
// ("the workers run raw text-completion backends") is true of every model AI
// Horde serves, not just the 3 statically catalogued ones.
const { aihordeProvider } =
  await import("../../open-sse/config/providers/registry/aihorde/index.ts");

test("aihorde registry entry declares a provider-level unsupportedParams fallback", () => {
  assert.deepEqual(aihordeProvider.unsupportedParams, [
    "tools",
    "tool_choice",
    "parallel_tool_calls",
  ]);
});

test("getUnsupportedParams strips tools for a dynamically-discovered aihorde model with no static entry", () => {
  const result = getUnsupportedParams("aihorde", "aphrodite/TheDrummer/Behemoth-X-123B-v2.1");
  assert.deepEqual(result, ["tools", "tool_choice", "parallel_tool_calls"]);
});

test("getUnsupportedParams strips tools for any other live-discovered aihorde model (deepseek-v4-flash)", () => {
  const result = getUnsupportedParams("aihorde", "deepseek/deepseek-v4-flash");
  assert.deepEqual(result, ["tools", "tool_choice", "parallel_tool_calls"]);
});

test("getUnsupportedParams still returns the per-model entry for a statically-catalogued aihorde model", () => {
  // Cydonia-24B already had its own model-level unsupportedParams before this
  // fix — the provider-level fallback must not change that, only fill the gap
  // for models with no per-model entry.
  const result = getUnsupportedParams("aihorde", "aphrodite/TheDrummer/Cydonia-24B-v4.3");
  assert.deepEqual(result, ["tools", "tool_choice", "parallel_tool_calls"]);
});

test("getUnsupportedParams provider-level fallback does not leak to unrelated providers", () => {
  assert.deepEqual(getUnsupportedParams("mistral", "mistral-small-latest"), []);
});
