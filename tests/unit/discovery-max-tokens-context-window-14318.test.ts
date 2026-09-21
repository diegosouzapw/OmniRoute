import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

// #14318: `max_tokens` on an OpenAI-compatible model record is the maximum
// *output* length — the same meaning as the request parameter — not the context
// window. Reading it as a window made a record that carries only `max_tokens`
// sync with `inputTokenLimit` set to that output cap, so the combo
// context-window filter excluded a 128K model for any prompt above 4K.
test("discovery does not read max_tokens as the context window (#14318)", () => {
  const [model] = normalizeDiscoveredModels(
    [{ id: "local-llm", object: "model", max_tokens: 4096 }],
    "lmstudio"
  );

  assert.equal(model.inputTokenLimit, undefined);
});

test("discovery keeps context_length when max_tokens is also reported (#14318)", () => {
  const [model] = normalizeDiscoveredModels(
    [{ id: "local-llm", object: "model", context_length: 131072, max_tokens: 4096 }],
    "lmstudio"
  );

  assert.equal(model.inputTokenLimit, 131072);
});
