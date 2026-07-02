// tests/unit/compression/ionizerEngine.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { ionizerEngine } from "../../../open-sse/services/compression/engines/ionizer/index.ts";
import { retrieveBlock, resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";

const bigArray = JSON.stringify(Array.from({ length: 400 }, (_, i) => ({ i, v: `row-${i}` })));

test("ionizer enabled: oversized homogeneous array → inline sample + recoverable CCR marker", () => {
  resetCcrStore();
  const body = { messages: [{ role: "user", content: bigArray }] };
  const res = ionizerEngine.apply(body, { stepConfig: {}, principalId: "p1" });
  assert.equal(res.compressed, true);
  const content = (res.body.messages as Array<{ content: string }>)[0].content;
  assert.match(content, /\[ionizer: kept \d+\/400 rows; full → CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
  const hash = content.match(/hash=([0-9a-f]{24})/)![1];
  assert.equal(retrieveBlock(hash, "p1"), bigArray);
});

test("ionizer disabled via enabled:false → no-op", () => {
  resetCcrStore();
  const body = { messages: [{ role: "user", content: bigArray }] };
  const res = ionizerEngine.apply(body, { stepConfig: { enabled: false }, principalId: "p1" });
  assert.equal(res.compressed, false);
});

test("small array / non-array / non-homogeneous → no-op", () => {
  resetCcrStore();
  const small = { messages: [{ role: "user", content: JSON.stringify([{ a: 1 }, { a: 2 }]) }] };
  assert.equal(ionizerEngine.apply(small, { stepConfig: {} }).compressed, false);
  const notArr = { messages: [{ role: "user", content: '{"a":1}' }] };
  assert.equal(ionizerEngine.apply(notArr, { stepConfig: {} }).compressed, false);
  const mixed = { messages: [{ role: "user", content: JSON.stringify([{ a: 1 }, 2, "x"]) }] };
  assert.equal(ionizerEngine.apply(mixed, { stepConfig: {} }).compressed, false);
});

test("engine declares sampling:true and is registered", () => {
  assert.equal(ionizerEngine.sampling, true);
  assert.equal(ionizerEngine.id, "ionizer");
});
