// tests/unit/compression/ionizerGateSkip.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";
import { resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";

registerBuiltinCompressionEngines();

// 400-row array; ionizer drops most rows → a numeric/json-key gate would normally REJECT a lossy
// step. Because ionizer is sampling:true, the fidelity gate must SKIP it and keep the sampled output.
const bigArray = JSON.stringify(Array.from({ length: 400 }, (_, i) => ({ id: i, port: 8080 + i })));

test("fidelity gate ON skips the ionizer step (sampling) and keeps the sampled output", () => {
  resetCcrStore();
  const body = { messages: [{ role: "user", content: bigArray }] };
  const res = applyStackedCompression(body, [{ engine: "ionizer" }], {
    fidelityGate: { enabled: true },
  });
  const content = (res.body.messages as Array<{ content: string }>)[0].content;
  assert.match(content, /\[ionizer: kept \d+\/400 rows/);
});
