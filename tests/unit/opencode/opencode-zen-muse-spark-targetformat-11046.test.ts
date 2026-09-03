import assert from "node:assert/strict";
import test from "node:test";

import { opencode_zenProvider } from "../../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { opencode_goProvider } from "../../../open-sse/config/providers/registry/opencode/go/index.ts";

// opencode-zen and opencode-go both serve the same upstream family
// (opencode.ai/zen/*) as the opencode provider for Muse Spark, but neither
// got the targetFormat:"openai-responses" declaration that #10874 added to
// the opencode provider's entries — so requests routed to either still hit
// /chat/completions and the upstream returns an empty message.
test("muse-spark-1.2 and muse-spark-1.2-contributor-free route to the Responses API on opencode-zen too", () => {
  for (const id of ["muse-spark-1.2", "muse-spark-1.2-contributor-free"]) {
    const model = opencode_zenProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the opencode-zen provider`);
    assert.equal(
      model?.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not the default chat/completions pass-through`
    );
    assert.equal(model?.supportsReasoning, true);
  }
});

test("all muse-spark-1.2-contributor effort-tier entries route to the Responses API on opencode-go too", () => {
  const ids = [
    "muse-spark-1.2-contributor",
    "muse-spark-1.2-contributor-minimal",
    "muse-spark-1.2-contributor-low",
    "muse-spark-1.2-contributor-medium",
    "muse-spark-1.2-contributor-high",
    "muse-spark-1.2-contributor-xhigh",
  ];
  for (const id of ids) {
    const model = opencode_goProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} should be registered in the opencode-go provider`);
    assert.equal(
      model?.targetFormat,
      "openai-responses",
      `${id} must target the Responses API, not the default chat/completions pass-through`
    );
  }
});
