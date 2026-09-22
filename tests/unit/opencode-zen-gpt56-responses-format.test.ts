import assert from "node:assert/strict";
import test from "node:test";

import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";

// The OpenCode Zen upstream serves the GPT-5.6 family only on /responses;
// /chat/completions answers 503 "Endpoint is unavailable". The muse-spark
// entries on this provider already declare targetFormat:"openai-responses"
// (see opencode-zen-muse-spark-targetformat-11046.test.ts), and #12196 made
// the same declaration for gpt-5.6-luna on opencode-go. The zen GPT-5.6
// entries were still defaulting to the chat/completions pass-through, so
// OpencodeExecutor.buildUrl() posted them to an endpoint the upstream does
// not serve these models on.
test("opencode-zen GPT-5.6 family routes to the Responses API", () => {
  for (const id of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
    const model = opencode_zenProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the opencode-zen provider`);
    assert.equal(
      model?.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not the default chat/completions pass-through`
    );
    assert.equal(
      resolveOpencodeTargetFormat("opencode-zen", id),
      "openai-responses",
      `OpencodeExecutor.buildUrl() would post ${id} to /chat/completions, which the upstream 503s on`
    );
  }
});

// Control: the muse-spark entry on this provider already resolves to the
// Responses API and must keep working — proves the assertions above don't
// fail for an unrelated reason (broken import, alias resolution).
test("control: opencode-zen/muse-spark-1.2 already resolves to openai-responses", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "muse-spark-1.2"), "openai-responses");
});
