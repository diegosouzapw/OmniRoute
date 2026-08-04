// Repro probe for GitHub issue #6576.
//
// Kiro/CodeWhisperer rejects `additionalModelRequestFields` for
// claude-sonnet-4.5 / claude-haiku-4.5 with a raw upstream 400:
//   "[400]: additionalModelRequestFields is not supported for this model"
//
// buildKiroPayload() gates thinking injection on supportsReasoning(model),
// which resolves from the GENERIC Anthropic-API capability data
// (MODEL_SPECS["claude-sonnet-4-5-..."].supportsThinking === true,
// MODEL_SPECS["claude-haiku-4-5-20251001"].supportsThinking === true).
// That flag says nothing about whether the *Kiro/AWS CodeWhisperer*
// backend accepts the adaptive-thinking additionalModelRequestFields
// envelope for these specific models — only the newer adaptive-only
// models (Opus 4.7/4.8, Sonnet 5, Fable 5) are proven to accept it there
// (see the existing "drops temperature when thinking is enabled" tests).
//
// This test asserts the payload for claude-sonnet-4.5 (the reporter's own
// model) must NOT carry additionalModelRequestFields when reasoning is
// requested, matching what Kiro's upstream actually accepts. It currently
// FAILS because buildKiroPayload has no Kiro-specific allowlist/exclusion
// and blindly forwards the field whenever the generic capability flag says
// supportsThinking:true.
import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import(
  "../../open-sse/translator/request/openai-to-kiro.ts"
);

test("[repro #6576] buildKiroPayload must not attach additionalModelRequestFields for claude-sonnet-4.5 (Kiro rejects it)", () => {
  const body = {
    messages: [{ role: "user", content: "Calculate 51818+62218, and reply with result only." }],
    reasoning_effort: "medium",
    max_tokens: 2048,
    stream: false,
  };

  const result = buildKiroPayload("claude-sonnet-4.5", body, false, null);

  assert.equal(
    result.additionalModelRequestFields,
    undefined,
    "additionalModelRequestFields must not be sent for claude-sonnet-4.5 — " +
      "Kiro/CodeWhisperer rejects it upstream with " +
      "'[400]: additionalModelRequestFields is not supported for this model' (issue #6576)"
  );
});

test("[repro #6576] buildKiroPayload must not attach additionalModelRequestFields for claude-haiku-4.5 (Kiro rejects it)", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "adaptive" },
  };

  const result = buildKiroPayload("claude-haiku-4.5", body, false, null);

  assert.equal(
    result.additionalModelRequestFields,
    undefined,
    "additionalModelRequestFields must not be sent for claude-haiku-4.5 — " +
      "Kiro/CodeWhisperer rejects it upstream (issue #6576 comment by fenix007: " +
      "9/9 production requests with reasoning params 400'd for this exact model)"
  );
});
