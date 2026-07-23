import test from "node:test";
import assert from "node:assert/strict";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

// Live incident: aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1 (a
// dynamically-discovered AI Horde model, not statically catalogued) got
// selected as a combo target for a tool-heavy conversation and narrated a
// fake tool call in prose instead of erroring or being skipped. Root cause:
// getResolvedModelCapabilities()'s `supportsTools` resolution only checks
// per-model registry entries and synced/static specs — none of which exist
// for a live-discovered model — so it falls through to `heuristicToolCalling`,
// which optimistically defaults to `true` for any unrecognized model string
// (TOOL_CALLING_UNSUPPORTED_PATTERNS is empty). That's wrong for providers
// like AI Horde whose registry entry already declares a provider-wide
// `unsupportedParams: ["tools", ...]` (added for the strip/flatten fix) —
// this fix reuses that same signal here so capability-based combo filtering
// (filterTargetsByRequestCompatibility in comboStructure.ts) actually skips
// these targets for tool-bearing requests instead of guessing wrong.
test("a dynamically-discovered aihorde model resolves toolCalling: false via the provider-level unsupportedParams fallback", () => {
  const caps = getResolvedModelCapabilities("aihorde/aphrodite/TheDrummer/Behemoth-X-123B-v2.1");
  assert.equal(caps.toolCalling, false);
  assert.equal(caps.supportsTools, false);
});

test("any other live-discovered aihorde model also resolves toolCalling: false", () => {
  const caps = getResolvedModelCapabilities("aihorde/deepseek/deepseek-v4-flash");
  assert.equal(caps.toolCalling, false);
});

test("a statically-catalogued aihorde model keeps its explicit per-model toolCalling: false", () => {
  const caps = getResolvedModelCapabilities("aihorde/aphrodite/TheDrummer/Cydonia-24B-v4.3");
  assert.equal(caps.toolCalling, false);
});

test("the provider-level fallback does not affect providers with no unsupportedParams declaration", () => {
  const caps = getResolvedModelCapabilities("mistral/mistral-small-latest");
  // Mistral's real models genuinely support tools; heuristic default (true)
  // should still apply since Mistral has no provider-level unsupportedParams.
  assert.equal(caps.toolCalling, true);
});
