import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";

// Issue #12196: opencode-go/gpt-5.6-luna is served by the Go upstream ONLY on
// /responses — /chat/completions 500s for this model. The github provider
// already declares targetFormat:"openai-responses" for the same model id, and
// opencode-go already does the same for deepseek-v4-pro/deepseek-v4-flash on
// this exact provider — but gpt-5.6-luna itself is missing from the
// opencode-go registry, so getModelTargetFormat() falls through to null and
// resolveOpencodeTargetFormat() defaults to "openai", which makes
// OpencodeExecutor.buildUrl() post to /chat/completions instead of /responses.
test("opencode-go/gpt-5.6-luna must resolve to the openai-responses target format", () => {
  const resolved = resolveOpencodeTargetFormat("opencode-go", "gpt-5.6-luna");
  assert.equal(
    resolved,
    "openai-responses",
    "opencode-go/gpt-5.6-luna resolved to '" +
      resolved +
      "' instead of 'openai-responses' — OpencodeExecutor.buildUrl() will post to " +
      "/chat/completions, which the Go upstream 500s on for this model (issue #12196)"
  );
});

// Control: the sibling deepseek-v4-flash entry on the SAME opencode-go
// provider already declares targetFormat:"openai-responses" and must keep
// working — proves the assertion above isn't failing for an unrelated reason
// (e.g. a broken import or alias resolution).
test("control: opencode-go/deepseek-v4-flash already resolves to openai-responses", () => {
  const resolved = resolveOpencodeTargetFormat("opencode-go", "deepseek-v4-flash");
  assert.equal(resolved, "openai-responses");
});
