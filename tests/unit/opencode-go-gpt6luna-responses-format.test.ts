import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";

// opencode-go/gpt-6-luna is served by the Go upstream ONLY on /responses.
// Live-verified 2026-10-02 against https://opencode.ai/zen/go/v1:
//   POST /responses        -> 200 (normal completion)
//   POST /chat/completions -> 400 {"type":"error","error":{"type":
//                             "ModelProtocolUnsupported","message":
//                             "Model does not support this protocol."}}
// Same failure mode as #12196 (gpt-5.6-luna): without a registry entry
// getModelTargetFormat() returns null, resolveOpencodeTargetFormat() falls
// back to "openai", and OpencodeExecutor.buildUrl() posts to
// /chat/completions — so every request dies with that 400.
test("opencode-go/gpt-6-luna must resolve to the openai-responses target format", () => {
  const resolved = resolveOpencodeTargetFormat("opencode-go", "gpt-6-luna");
  assert.equal(
    resolved,
    "openai-responses",
    "opencode-go/gpt-6-luna resolved to '" +
      resolved +
      "' instead of 'openai-responses' — OpencodeExecutor.buildUrl() will post " +
      "to /chat/completions, which the Go upstream rejects with " +
      "ModelProtocolUnsupported"
  );
});

// Control: the sibling entry fixed by #12196 must keep resolving the same way,
// proving the assertion above isn't failing for an unrelated reason (broken
// import, alias resolution, or a registry load failure).
test("control: opencode-go/gpt-5.6-luna still resolves to openai-responses", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "gpt-5.6-luna"), "openai-responses");
});

// Control: a chat-served model on the SAME provider must NOT flip to
// responses — otherwise this registry change would break the fast path that
// serves deepseek-v4.1-flash (1214 successful /chat/completions calls logged).
test("control: opencode-go/deepseek-v4.1-flash keeps its chat format", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "deepseek-v4.1-flash"), "openai");
});
