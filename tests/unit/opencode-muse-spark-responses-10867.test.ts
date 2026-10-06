import test from "node:test";
import assert from "node:assert/strict";
import { opencodeProvider } from "../../open-sse/config/providers/registry/opencode/index.ts";

// #10867: Muse Spark is served by OpenCode Zen only on the OpenAI Responses API
// (/responses), not /chat/completions. Without targetFormat:"openai-responses"
// these models fall through to the default chat/completions pass-through and the
// upstream returns null/empty content.
test("muse-spark-1.2 and muse-spark-1.2-contributor-free route to the Responses API", () => {
  for (const id of ["muse-spark-1.2", "muse-spark-1.2-contributor-free"]) {
    const model = opencodeProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the opencode provider`);
    assert.equal(
      model?.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not the default chat/completions pass-through`
    );
    assert.equal(model?.supportsReasoning, true);
  }
});
