import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../open-sse/config/providers/shared.ts";

// Source: https://docs.sambanova.ai/docs/en/models/rate-limits (read 2026-10-09). The Free Tier table lists
// DeepSeek-V3.1, Meta-Llama-3.3-70B-Instruct, gpt-oss-120b, DeepSeek-V3.2 and gemma-4-31B-it; MiniMax-M2.7 is
// only in the Developer table and Llama-4-Maverick is not on the page.
const free = new Set(
  FREE_MODEL_BUDGETS.filter((m) => m.provider === "sambanova").map((m) => m.modelId)
);
const registry = new Set(CHAT_OPENAI_COMPAT_MODELS.sambanova.map((m) => m.id));

test("SambaNova free catalog lists the models of its Free Tier table", () => {
  for (const id of [
    "DeepSeek-V3.1",
    "Meta-Llama-3.3-70B-Instruct",
    "gpt-oss-120b",
    "DeepSeek-V3.2",
    "gemma-4-31B-it",
  ]) {
    assert.ok(free.has(id), `${id} must be in the SambaNova free catalog`);
    assert.ok(registry.has(id), `${id} must be routable`);
  }
});

test("SambaNova free catalog excludes models its page does not give to the Free Tier", () => {
  for (const id of ["MiniMax-M2.7", "Llama-4-Maverick-17B-128E-Instruct"]) {
    assert.ok(!free.has(id), `${id} must not be listed as free`);
  }
});
