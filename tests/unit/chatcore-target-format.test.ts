// tests/unit/chatcore-target-format.test.ts
// Characterization of resolveChatCoreTargetFormat — the wire target-format resolution extracted
// from handleChatCore (chatCore god-file decomposition, #3501). Resolves the provider alias and the
// upstream target format: apiFormat==="responses" forces OpenAI Responses; otherwise the model's
// registry target format, then the custom-model override, then the provider default. Returns both
// `alias` (reused downstream when stripping the alias/ prefix off the upstream model) and
// `targetFormat`. Asserted against the inline composition so the delegation stays byte-identical.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import {
  PROVIDER_ID_TO_ALIAS,
  getModelTargetFormat,
} from "../../open-sse/config/providerModels.ts";
import { getTargetFormat } from "../../open-sse/services/provider.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function expected(
  provider: string,
  resolvedModel: string,
  apiFormat: string | undefined,
  customModelTargetFormat: string | undefined,
  providerSpecificData: unknown
) {
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat =
    apiFormat === "responses"
      ? FORMATS.OPENAI_RESPONSES
      : modelTargetFormat ||
        customModelTargetFormat ||
        getTargetFormat(provider, providerSpecificData);
  return { alias, targetFormat };
}

test("apiFormat='responses' short-circuits to OPENAI_RESPONSES (alias still resolved)", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: "gpt-4o",
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI_RESPONSES);
  assert.equal(r.alias, PROVIDER_ID_TO_ALIAS["openai"] || "openai");
});

test("delegates byte-identically for a normal model (no apiFormat / no custom override)", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: "gpt-4o",
    apiFormat: undefined,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.deepEqual(r, expected("openai", "gpt-4o", undefined, undefined, undefined));
});

test("customModelTargetFormat is used when the model has no registry target format", () => {
  const customModel = "totally-unknown-custom-model-xyz";
  // precondition: the registry has no target format for this unknown model
  assert.ok(!getModelTargetFormat(PROVIDER_ID_TO_ALIAS["openai"] || "openai", customModel));
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: customModel,
    apiFormat: undefined,
    customModelTargetFormat: "claude",
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, "claude");
});

test("falls back to getTargetFormat(provider) when neither model nor custom format apply", () => {
  const customModel = "totally-unknown-custom-model-xyz";
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: customModel,
    apiFormat: undefined,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, getTargetFormat("openai", undefined));
});

test("unmapped provider → alias falls back to the provider id", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "some-unmapped-provider",
    resolvedModel: "x",
    apiFormat: "responses",
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.alias, "some-unmapped-provider");
});
