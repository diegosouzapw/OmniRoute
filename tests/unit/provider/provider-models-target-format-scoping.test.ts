import assert from "node:assert/strict";
import test from "node:test";

import { getModelTargetFormat } from "../../../open-sse/config/providerModels.ts";
import { resolveChatCoreTargetFormat } from "../../../open-sse/handlers/chatCore/targetFormat.ts";

// Regression: #8835 tagged gpt-5.6-* with targetFormat "openai-responses" in the
// ghe-copilot catalog. getModelTargetFormat falls back to getGlobalModel() when
// the provider's own catalog lacks the model id, importing the DECLARING
// provider's endpoint semantics into every other provider serving the same id.
// command-code's chat-shaped executor then received a
// Responses-format body (input, not messages) and shipped `messages: []`
// upstream — upstream rejected with "Invalid prompt: messages must not be empty"
// (502). Model-level targetFormat is provider-scoped: it must not leak.
test("model-level targetFormat does not leak across provider catalogs", () => {
  // command-code serves gpt-5.6-luna over its chat-shaped provider endpoint
  assert.equal(getModelTargetFormat("cmd", "gpt-5.6-luna"), null);
  // raw provider id form behaves identically (alias resolution)
  assert.equal(getModelTargetFormat("command-code", "gpt-5.6-luna"), null);
  // the declaring provider (ghe-copilot) keeps its Responses routing
  assert.equal(getModelTargetFormat("gh", "gpt-5.6-luna"), "openai-responses");
  assert.equal(getModelTargetFormat("ghe-copilot", "gpt-5.6-luna"), "openai-responses");
  // unrelated models are unaffected
  assert.equal(getModelTargetFormat("cmd", "kimi-k2"), null);
});

test("chat completions to command-code gpt-5.6-luna resolve to chat format", () => {
  const resolved = resolveChatCoreTargetFormat({
    provider: "command-code",
    resolvedModel: "gpt-5.6-luna",
    apiFormat: undefined,
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: null,
  });
  assert.equal(resolved.alias, "cmd");
  assert.equal(resolved.targetFormat, "openai");
});
