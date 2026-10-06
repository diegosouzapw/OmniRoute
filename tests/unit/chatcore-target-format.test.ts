// tests/unit/chatcore-target-format.test.ts
// Characterization of resolveChatCoreTargetFormat — the wire target-format resolution extracted
// from handleChatCore (chatCore god-file decomposition, #3501). Resolves the provider alias and the
// upstream target format: apiFormat==="responses" forces OpenAI Responses; otherwise the model's
// registry target format, then the custom-model override, then the provider default. Returns both
// `alias` (reused downstream when stripping the alias/ prefix off the upstream model) and
// `targetFormat`.
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
    sourceFormat: FORMATS.OPENAI,
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
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.deepEqual(r, expected("openai", "gpt-4o", undefined, undefined, undefined));
});

test("provider-local target format does not leak from another provider", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "openai-compatible-chat-example",
    resolvedModel: "gpt-5.6-sol",
    apiFormat: undefined,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI);
});

test("customModelTargetFormat is used when the model has no registry target format", () => {
  const customModel = "totally-unknown-custom-model-xyz";
  // precondition: the registry has no target format for this unknown model
  assert.ok(!getModelTargetFormat(PROVIDER_ID_TO_ALIAS["openai"] || "openai", customModel));
  const r = resolveChatCoreTargetFormat({
    provider: "openai",
    resolvedModel: customModel,
    apiFormat: undefined,
    sourceFormat: FORMATS.OPENAI,
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
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, getTargetFormat("openai", undefined));
});

test("AgentRouter explicit connection protocol overrides the inferred inbound protocol", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "agentrouter",
    resolvedModel: "gpt-5.6-sol",
    apiFormat: undefined,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: { targetFormat: FORMATS.CLAUDE },
  });
  assert.equal(r.targetFormat, FORMATS.CLAUDE);
});

test("#8994: customModelTargetFormat takes precedence over apiFormat='responses'", () => {
  // When a Vertex Claude model has customModelTargetFormat="claude" and the
  // handler also receives apiFormat="responses", the model-level override
  // must win — otherwise the request body is translated to OpenAI Responses
  // format (which Vertex's Claude endpoint cannot parse).
  const r = resolveChatCoreTargetFormat({
    provider: "vertex",
    resolvedModel: "claude-sonnet-4-6",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: "claude",
    providerSpecificData: undefined,
  });
  // BUG: apiFormat short-circuits before customModelTargetFormat is checked
  assert.equal(r.targetFormat, "claude", "model-level targetFormat must win over apiFormat");
});

test("a declared connection alternate overrides the inbound Responses protocol", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "deepseek",
    resolvedModel: "deepseek-v4-pro",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    customModelTargetFormat: undefined,
    providerSpecificData: { targetFormat: FORMATS.CLAUDE },
  });
  assert.equal(r.targetFormat, FORMATS.CLAUDE);
});

test("unmapped provider → alias falls back to the provider id", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "some-unmapped-provider",
    resolvedModel: "x",
    apiFormat: "responses",
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.alias, "some-unmapped-provider");
});
