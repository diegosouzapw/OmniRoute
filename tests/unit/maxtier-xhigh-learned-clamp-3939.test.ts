// Port of decolua/9router#3939 — the max-tier early return (deepseek-v4+, glm-5.x,
// kimi-k3+, ollama-cloud, opencode-go) rewrote xhigh → max BEFORE the learned
// reasoning-effort clamp, so a custom OpenAI-compatible host whose effort menu
// lacks `max` kept getting 400 even after OmniRoute had learned the accepted set.
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";
import {
  recordLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";

const CUSTOM = "openai-compatible-chat-3939";
const MODEL = "deepseek-v4-flash";

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

function effortOf(provider: string, model: string, effort: string): string {
  const out = sanitizeReasoningEffortForProvider({ reasoning_effort: effort }, provider, model) as {
    reasoning_effort: string;
  };
  return out.reasoning_effort;
}

test("#3939: learned set without max clamps xhigh via the learned set, not → max", () => {
  recordLearnedReasoningEffort(CUSTOM, MODEL, ["low", "high"]);
  assert.equal(effortOf(CUSTOM, MODEL, "xhigh"), "high");
});

test("#3939: learned set that accepts xhigh (but not max) passes xhigh through", () => {
  recordLearnedReasoningEffort(CUSTOM, MODEL, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(effortOf(CUSTOM, MODEL, "xhigh"), "xhigh");
  assert.equal(effortOf(CUSTOM, MODEL, "max"), "xhigh");
});

test("#3939 regression guard: no learned set keeps the max-tier xhigh → max rewrite", () => {
  assert.equal(effortOf(CUSTOM, MODEL, "xhigh"), "max");
});

test("#3939 regression guard: learned set that includes max keeps xhigh → max", () => {
  recordLearnedReasoningEffort(CUSTOM, MODEL, ["low", "high", "max"]);
  assert.equal(effortOf(CUSTOM, MODEL, "xhigh"), "max");
});

test("#3939: native deepseek provider is untouched (xhigh → max)", () => {
  assert.equal(effortOf("deepseek", MODEL, "xhigh"), "max");
});
