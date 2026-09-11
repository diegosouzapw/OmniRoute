import test from "node:test";
import assert from "node:assert/strict";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { opencodeProvider } from "../../open-sse/config/providers/registry/opencode/index.ts";

// #12674: Muse Spark 1.3 Contributor is served by OpenCode Go only on the
// OpenAI Responses API (/responses), not /chat/completions. Without
// targetFormat:"openai-responses" the executor keeps selecting the
// /chat/completions URL and the upstream answers 500 Internal server error.
// #12698: the 1.3 free id needs the same Responses wire format on the
// opencode + opencode-zen registries.
const GO_IDS = [
  "muse-spark-1.3-contributor",
  "muse-spark-1.3-contributor-minimal",
  "muse-spark-1.3-contributor-low",
  "muse-spark-1.3-contributor-medium",
  "muse-spark-1.3-contributor-high",
  "muse-spark-1.3-contributor-xhigh",
];

test("opencode-go muse-spark-1.3-contributor family targets the Responses API", () => {
  for (const id of GO_IDS) {
    const model = opencode_goProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the opencode-go provider`);
    assert.equal(
      model?.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not the default chat/completions pass-through`
    );
    assert.equal(model?.supportsReasoning, true);
  }
});

test("muse-spark-1.3-contributor-free targets Responses on opencode + zen", () => {
  for (const provider of [opencodeProvider, opencode_zenProvider]) {
    const model = provider.models.find((m) => m.id === "muse-spark-1.3-contributor-free");
    assert.ok(model, `muse-spark-1.3-contributor-free should be registered (${provider.id})`);
    assert.equal(model?.targetFormat, "openai-responses");
    assert.equal(model?.supportsReasoning, true);
  }
});

test("parseEffortLevel covers the 1.3 contributor tiers", async () => {
  const { parseEffortLevel } = (await import("../../open-sse/executors/opencode.ts")) as {
    parseEffortLevel: (model: string) => { baseModel: string; effort: string } | null;
  };
  for (const effort of ["minimal", "low", "medium", "high", "xhigh"]) {
    assert.deepEqual(parseEffortLevel(`muse-spark-1.3-contributor-${effort}`), {
      baseModel: "muse-spark-1.3-contributor",
      effort,
    });
  }
});
