import { test } from "node:test";
import assert from "node:assert/strict";
import { requiresReasoningReplay } from "../../../open-sse/services/reasoningCache.ts";

// Regression guard: the reasoning-cache write in chatCore.ts must be gated by the same
// predicate the read sites already use, so an installation whose traffic never touches a
// replay provider stops writing to the cache on every reasoning-bearing response.
test("requiresReasoningReplay recognizes every provider chatCore.ts's write guard must cover", () => {
  // Providers explicitly in REASONING_REPLAY_PROVIDERS
  assert.equal(requiresReasoningReplay({ provider: "deepseek", model: "deepseek-chat" }), true);
  assert.equal(requiresReasoningReplay({ provider: "kimi-coding", model: "kimi-k2" }), true);
  assert.equal(requiresReasoningReplay({ provider: "xiaomi-mimo", model: "mimo-v1" }), true);

  // Providers NOT in the set, caught by the model-pattern fallback (the same fallback
  // that covers claudeHelper.ts's non-Anthropic Claude-shape read site, site C in the
  // design decision above)
  assert.equal(
    requiresReasoningReplay({ provider: "some-glm-host", model: "glm-4-thinking" }),
    true
  );
  assert.equal(requiresReasoningReplay({ provider: "zai", model: "kimi-k2" }), true);

  // A provider/model that should NOT trigger a write — proves the guard actually skips
  // something (otherwise this write-guard change is a no-op)
  assert.equal(requiresReasoningReplay({ provider: "openai", model: "gpt-5.1" }), false);
  assert.equal(requiresReasoningReplay({ provider: "anthropic", model: "claude-opus-5" }), false);
});
