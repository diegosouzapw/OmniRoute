// Unknown grok-cli ids (passthrough / not yet synced, e.g. grok-4.7 on release day) must
// still resolve to the Responses wire format: GrokCliExecutor always POSTs to
// /v1/responses, so a chat-completions body 400s upstream.
import test from "node:test";
import assert from "node:assert/strict";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("unknown grok-cli ids fall back to openai-responses (alias and provider id)", () => {
  for (const alias of ["gc", "grok-cli"]) {
    assert.equal(getModelTargetFormat(alias, "grok-4.7"), "openai-responses");
    assert.equal(getModelTargetFormat(alias, "grok-4.7-build-fast"), "openai-responses");
    assert.equal(getModelTargetFormat(alias, "gc/grok-4.99"), "openai-responses");
  }
});

test("seeded grok-cli ids keep their explicit target format", () => {
  assert.equal(getModelTargetFormat("gc", "grok-4.6"), "openai-responses");
  assert.equal(getModelTargetFormat("gc", "grok-4.5"), "openai-responses");
});

test("chatCore routes an unsynced grok-cli id through Responses", () => {
  const r = resolveChatCoreTargetFormat({
    provider: "grok-cli",
    resolvedModel: "grok-4.99",
    apiFormat: undefined,
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined,
  });
  assert.equal(r.targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("the fallback is scoped to grok-cli: unknown xai / xai-oauth ids are unchanged", () => {
  for (const alias of ["xai", "xai-oauth"]) {
    assert.equal(getModelTargetFormat(alias, "grok-4.99"), null);
  }
});
