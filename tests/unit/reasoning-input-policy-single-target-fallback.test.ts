import test from "node:test";
import assert from "node:assert/strict";

import {
  applyReasoningInputPolicy,
  resolveIncompatibleReasoningAction,
} from "../../open-sse/services/reasoningInputPolicy.ts";

// Agentic clients replay summary-text reasoning on continuation turns. Direct
// single-target requests to opaque transports (codex family) must default to
// dropping incompatible reasoning so continuation turns do not hard-fail.

test("single-target default is drop when nothing is configured", () => {
  const action = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "skip",
    isComboStep: false,
    headers: null,
    env: {},
  });
  assert.equal(action, "drop");
});

test("env OMNIROUTE_SINGLE_TARGET_REASONING_FALLBACK=reject enforces rejection", () => {
  const action = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "skip",
    isComboStep: false,
    headers: null,
    env: { OMNIROUTE_SINGLE_TARGET_REASONING_FALLBACK: "reject" },
  });
  assert.equal(action, "reject");
});

test("x-omniroute-reasoning-fallback header overrides env and default", () => {
  const rejectHeader = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "skip",
    isComboStep: false,
    headers: { "x-omniroute-reasoning-fallback": "reject" },
    env: {},
  });
  assert.equal(rejectHeader, "reject");

  const dropOverridesEnv = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "skip",
    isComboStep: false,
    headers: new Headers({ "X-OmniRoute-Reasoning-Fallback": "drop" }),
    env: { OMNIROUTE_SINGLE_TARGET_REASONING_FALLBACK: "reject" },
  });
  assert.equal(dropOverridesEnv, "drop");
});

test("combo steps keep their explicit configuration", () => {
  const comboSkip = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "skip",
    isComboStep: true,
    headers: null,
    env: {},
  });
  assert.equal(comboSkip, "reject");

  const comboDrop = resolveIncompatibleReasoningAction({
    reasoningTransportFallback: "drop",
    isComboStep: true,
    headers: null,
    env: {},
  });
  assert.equal(comboDrop, "drop");
});

test("default single-target policy strips plaintext reasoning when targeting opaque provider", () => {
  const body: Record<string, unknown> = {
    messages: [
      { role: "user", content: "research this project" },
      {
        role: "assistant",
        content: "Here is the summary.",
        reasoning_content: "**Planning multi-project analysis and inspection**",
      },
    ],
  };

  const result = applyReasoningInputPolicy(body, "chat", {
    provider: "codex",
    onIncompatibleReasoning: resolveIncompatibleReasoningAction({
      reasoningTransportFallback: "skip",
      isComboStep: false,
      headers: null,
      env: {},
    }),
  });

  assert.equal(result.incompatibleReasoning, false);
  const assistantMsg = (body.messages as Array<Record<string, unknown>>)[1];
  assert.equal(assistantMsg.reasoning_content, undefined);
  assert.equal(assistantMsg.content, "Here is the summary.");
});
