import test from "node:test";
import assert from "node:assert/strict";
import { summarizeEncoderCandidates } from "../../../open-sse/services/compression/engines/headroom/encoderComparison.ts";

const byteLen = (s: string) => Buffer.byteLength(s, "utf8");

test("agrega sizes e elege winner por tokens", () => {
  const messages = [
    {
      role: "user",
      content: JSON.stringify(Array.from({ length: 20 }, (_, i) => ({ id: i, ok: true }))),
    },
  ];
  const cmp = summarizeEncoderCandidates(messages, 8, byteLen);
  assert.equal(cmp.arraysCompared, 1);
  assert.ok(cmp.json.bytes > 0 && cmp.gcf.bytes > 0);
  assert.ok(["gcf", "toon", "json"].includes(cmp.winner));
  const sizes: Record<string, number> = { gcf: cmp.gcf.tokens, json: cmp.json.tokens };
  if (cmp.toonAvailable) sizes["toon"] = cmp.toon.tokens;
  const min = Math.min(...Object.values(sizes));
  assert.equal(sizes[cmp.winner], min);
});

test("sem array compactável → zerado, sem winner espúrio", () => {
  const cmp = summarizeEncoderCandidates([{ role: "user", content: "oi" }], 8, byteLen);
  assert.equal(cmp.arraysCompared, 0);
  assert.equal(cmp.json.bytes, 0);
  assert.equal(cmp.gcf.bytes, 0);
});

test("system messages são ignoradas (igual ao smartcrusher)", () => {
  const arr = JSON.stringify(Array.from({ length: 20 }, (_, i) => ({ id: i })));
  const cmp = summarizeEncoderCandidates([{ role: "system", content: arr }], 8, byteLen);
  assert.equal(cmp.arraysCompared, 0);
});
