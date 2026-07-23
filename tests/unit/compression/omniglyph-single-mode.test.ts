import { test } from "node:test";
import assert from "node:assert";
import { applyCompressionAsync } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";

const DENSE = "X".repeat(500) + "\n" +
  Array.from({ length: 400 }, (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`).join("\n");
const body = () => ({
  model: "claude-fable-5",
  max_tokens: 128,
  system: DENSE,
  messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
});

test("modo omniglyph sozinho comprime (selecionar o modo é o enable)", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
  });
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("modo omniglyph em transporte agregador é no-op", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "aggregator",
  });
  assert.equal(r.compressed, false);
});
