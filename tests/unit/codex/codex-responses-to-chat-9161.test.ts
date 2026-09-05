import assert from "node:assert/strict";
import test from "node:test";

import { resolveChatCoreTargetFormat } from "../../../open-sse/handlers/chatCore/targetFormat.ts";
import { sanitizeChatRequestBody } from "../../../open-sse/handlers/chatCore/sanitization.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";

test("#9161 Responses client honors a custom OpenAI-compatible Chat target", () => {
  const result = resolveChatCoreTargetFormat({
    provider: "openai-compatible-chat-regression",
    resolvedModel: "custom-chat-model",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "chat" },
  });

  assert.equal(result.targetFormat, FORMATS.OPENAI);
});

test("#9161 Responses client preserves a custom OpenAI-compatible Responses target", () => {
  const result = resolveChatCoreTargetFormat({
    provider: "openai-compatible-responses-regression",
    resolvedModel: "custom-responses-model",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "responses" },
  });

  assert.equal(result.targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("#9161 official OpenAI keeps Responses routing for the Responses API", () => {
  const result = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: "gpt-4o",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });

  assert.equal(result.targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("#9161 Responses source targeting Chat converts max_output_tokens to max_tokens", () => {
  const body = sanitizeChatRequestBody(
    { max_output_tokens: 256 },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );

  assert.equal(body.max_tokens, 256);
  assert.equal(body.max_output_tokens, undefined);
});

test("#9161 Responses target keeps the Responses token field", () => {
  const body = sanitizeChatRequestBody(
    { max_tokens: 128 },
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES
  );

  assert.equal(body.max_output_tokens, 128);
  assert.equal(body.max_tokens, undefined);
});
