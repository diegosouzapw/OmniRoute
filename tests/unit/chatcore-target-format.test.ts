// tests/unit/chatcore-target-format.test.ts
// Characterization of resolveChatCoreTargetFormat — the wire target-format resolution extracted
// from handleChatCore (chatCore god-file decomposition, #3501). The inbound client API shape is
// independent from the outbound provider protocol: model registry metadata, custom-model overrides,
// and provider configuration determine the upstream target format.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { PROVIDER_ID_TO_ALIAS, getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { getTargetFormat } from "../../open-sse/services/provider.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function expected(
  provider: string,
  resolvedModel: string,
  customModelTargetFormat: string | undefined,
  providerSpecificData: unknown
) {
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat =
    modelTargetFormat || customModelTargetFormat || getTargetFormat(provider, providerSpecificData);
  return { alias, targetFormat };
}

test("Responses client honors a Chat-compatible upstream target", () => {
  const provider = "openai-compatible-chat-regression";
  const r = resolveChatCoreTargetFormat({
    provider,
    resolvedModel: "custom-chat-model",
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "chat" },
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI);
  assert.equal(r.alias, provider);
});

test("Responses client preserves a provider configured for native Responses", () => {
  const provider = "openai-compatible-responses-regression";
  const r = resolveChatCoreTargetFormat({
    provider,
    resolvedModel: "custom-responses-model",
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "responses" },
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("model registry native Responses target overrides a Chat provider default", () => {
  const model = "gpt-5.6-sol";
  assert.equal(getModelTargetFormat("openai", model), FORMATS.OPENAI_RESPONSES);

  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: model,
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("delegates byte-identically for a normal model without a custom override", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: "gpt-4o",
    apiFormat: undefined,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.deepEqual(r, expected("openai", "gpt-4o", undefined, undefined));
});

test("customModelTargetFormat is used when the model has no registry target format", () => {
  const customModel = "totally-unknown-custom-model-xyz";
  assert.ok(!getModelTargetFormat(PROVIDER_ID_TO_ALIAS["openai"] || "openai", customModel));
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: customModel,
    apiFormat: "responses",
    customModelTargetFormat: "claude",
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, "claude");
});

test("falls back to getTargetFormat(provider) when neither model nor custom format apply", () => {
  const customModel = "totally-unknown-custom-model-xyz";
  const r = resolveChatCoreTargetFormat({
    provider: "openai-compatible-chat-regression",
    resolvedModel: customModel,
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: { apiType: "chat" },
  });
  assert.equal(
    r.targetFormat,
    getTargetFormat("openai-compatible-chat-regression", { apiType: "chat" })
  );
});

test("unmapped provider alias falls back to the provider id", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "some-unmapped-provider",
    resolvedModel: "x",
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.alias, "some-unmapped-provider");
});