import assert from "node:assert/strict";
import test from "node:test";
import { resetDbInstance } from "@/lib/db/core.ts";
import { buildKiroPayload } from "@omniroute/open-sse/translator/request/openai-to-kiro.ts";
import { supportsKiroAdaptiveThinking } from "@omniroute/open-sse/translator/request/openai-to-kiro/adaptiveThinking.ts";
import { convertResponsesApiFormat } from "@omniroute/open-sse/translator/helpers/responsesApiHelper.ts";
import { openaiResponsesToOpenAIRequest } from "@omniroute/open-sse/translator/request/openai-responses.ts";
import { normalizeResponsesReasoningEffort } from "@omniroute/open-sse/translator/request/openai-responses/helpers.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { translateRequest } from "@omniroute/open-sse/translator/index.ts";

const efforts = ["low", "medium", "high", "xhigh", "max"];
test.after(() => resetDbInstance());

for (const effort of efforts) {
  test(`Kiro Opus 5.5 forwards adaptive ${effort} effort`, () => {
    assert.equal(supportsKiroAdaptiveThinking("claude-opus-5.5"), true);
    const payload = buildKiroPayload(
      "claude-opus-5.5",
      {
        messages: [{ role: "user", content: "Reply OK" }],
        reasoning_effort: effort,
        max_tokens: 2048,
      },
      true,
      null
    );
    assert.equal(
      payload.conversationState.currentMessage.userInputMessage.modelId,
      "claude-opus-5.5"
    );
    assert.equal(payload.additionalModelRequestFields?.output_config?.effort, effort);
    assert.deepEqual(payload.additionalModelRequestFields?.thinking, {
      type: "adaptive",
      display: "summarized",
    });
    assert.equal(payload.additionalModelRequestFields?.max_tokens, 2048);
    assert.match(
      payload.conversationState.currentMessage.userInputMessage.content,
      /<thinking_mode>enabled<\/thinking_mode>/
    );
  });

  test(`Responses preserves Kiro Opus 5.5 ${effort} through all conversion paths`, () => {
    const body = { model: "claude-opus-5.5", input: "Reply OK", reasoning: { effort } };
    const converted = convertResponsesApiFormat(body, null, "kiro");
    const hub = openaiResponsesToOpenAIRequest("claude-opus-5.5", body, true, {
      _targetFormat: FORMATS.KIRO,
    });
    for (const request of [converted, hub]) {
      const payload = buildKiroPayload("claude-opus-5.5", request, true, null);
      assert.equal(payload.additionalModelRequestFields?.output_config?.effort, effort);
    }
    const translated = translateRequest(
      FORMATS.OPENAI_RESPONSES,
      FORMATS.KIRO,
      "claude-opus-5.5",
      body,
      true,
      null,
      "kiro"
    );
    assert.equal(translated.additionalModelRequestFields?.output_config?.effort, effort);
  });
}

test("Kiro Opus 5.5 leaves thinking disabled when not requested", () => {
  const payload = buildKiroPayload(
    "claude-opus-5.5",
    {
      messages: [{ role: "user", content: "Reply OK" }],
    },
    true,
    null
  );
  assert.equal(payload.additionalModelRequestFields, undefined);
});

test("Kiro max preservation is scoped to the qualified model and provider", () => {
  for (const model of [
    "kiro/claude-opus-5.5",
    "kr/claude-opus-5.5",
    "kiro/claude-opus-5.5-thinking",
    "kr/claude-opus-5-5",
  ]) {
    assert.equal(normalizeResponsesReasoningEffort("max", model), "max");
  }
  for (const model of [
    "claude-opus-5.5",
    "claude/claude-opus-5.5",
    "kiro/claude-sonnet-5",
    "kiro/claude-opus-4.8",
  ]) {
    assert.equal(normalizeResponsesReasoningEffort("max", model), "xhigh");
  }
  const output = openaiResponsesToOpenAIRequest(
    "claude-opus-5.5",
    {
      input: "Reply OK",
      reasoning: { effort: "max" },
    },
    true,
    { _targetFormat: FORMATS.OPENAI }
  ) as Record<string, unknown>;
  assert.equal(output.reasoning_effort, "xhigh");
  assert.equal(normalizeResponsesReasoningEffort("max", "claude-opus-5.5", FORMATS.KIRO), "max");
  assert.equal(
    normalizeResponsesReasoningEffort("max", "claude-opus-5.5", FORMATS.OPENAI),
    "xhigh"
  );
  assert.equal(supportsKiroAdaptiveThinking("claude-haiku-4.5"), false);
  assert.equal(supportsKiroAdaptiveThinking("claude-sonnet-4.5"), false);
});
