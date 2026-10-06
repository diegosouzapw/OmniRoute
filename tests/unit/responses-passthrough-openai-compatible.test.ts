import { test } from "node:test";
import assert from "node:assert/strict";
import {
  shouldUseNativeOpenAICompatibleResponsesPassthrough,
  stampNativeResponsesPassthroughBody,
} from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("shouldUseNativeOpenAICompatibleResponsesPassthrough detects valid passthrough candidate", () => {
  const result = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai-compatible-custom-123",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    providerSpecificData: { apiType: "responses" },
  });
  assert.equal(result, true);
});

test("shouldUseNativeOpenAICompatibleResponsesPassthrough rejects non-openai-compatible providers", () => {
  const result = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    providerSpecificData: { apiType: "responses" },
  });
  assert.equal(result, false);
});

test("shouldUseNativeOpenAICompatibleResponsesPassthrough rejects chat apiType", () => {
  const result = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai-compatible-custom-123",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    providerSpecificData: { apiType: "chat" },
  });
  assert.equal(result, false);
});

test("shouldUseNativeOpenAICompatibleResponsesPassthrough respects forceResponses flag", () => {
  const result = shouldUseNativeOpenAICompatibleResponsesPassthrough({
    provider: "openai-compatible-custom-123",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    providerSpecificData: { _omnirouteForceResponsesUpstream: true },
  });
  assert.equal(result, true);
});

test("resolveChatCoreTargetFormat sets targetFormat to OPENAI_RESPONSES for passthrough", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "openai-compatible-custom-123",
    resolvedModel: "gpt-5.6-sol",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "responses" },
    nativeOpenAICompatibleResponsesPassthrough: true,
  });
  assert.equal(targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("stampNativeResponsesPassthroughBody stamps _nativeOpenAICompatibleResponsesPassthrough", () => {
  const body = {
    model: "gpt-5.6-sol",
    tools: [
      {
        name: "exec",
        type: "custom",
        format: { syntax: "lark", type: "grammar", definition: "..." },
      },
    ],
  };
  const stamped = stampNativeResponsesPassthroughBody(body, "openai-compatible");
  assert.equal(stamped._nativeOpenAICompatibleResponsesPassthrough, true);
  assert.deepEqual(stamped.tools, body.tools);
});
