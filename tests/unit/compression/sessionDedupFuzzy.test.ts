// tests/unit/compression/sessionDedupFuzzy.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";
import { retrieveBlock, resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";

const A = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho";
const Aprime = A + " sigma"; // ≥0.85 similar, not identical

test("fuzzy enabled: a near-duplicate message becomes a recoverable CCR marker", () => {
  resetCcrStore();
  const body = { messages: [{ role: "user", content: A }, { role: "user", content: Aprime }] };
  const res = sessionDedupEngine.apply(body, { stepConfig: { fuzzy: { enabled: true } }, principalId: "p1" });
  assert.equal(res.compressed, true);
  const msgs = (res.body.messages as Array<{ content: string }>);
  assert.equal(msgs[0].content, A); // first occurrence intact
  assert.match(msgs[1].content, /^\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
  const hash = msgs[1].content.match(/hash=([0-9a-f]{24})/)![1];
  assert.equal(retrieveBlock(hash, "p1"), Aprime); // recoverable
});

test("fuzzy ABSENT: byte-identical legacy (near-dup untouched, only exact dedup runs)", () => {
  resetCcrStore();
  const body = { messages: [{ role: "user", content: A }, { role: "user", content: Aprime }] };
  const res = sessionDedupEngine.apply(body, { stepConfig: {}, principalId: "p1" });
  // no exact-identical blocks here → no-op
  assert.equal(res.compressed, false);
});

test("fuzzy enabled but below threshold → untouched", () => {
  resetCcrStore();
  const body = { messages: [
    { role: "user", content: A },
    { role: "user", content: "completely unrelated content with no shared three word windows whatsoever here ok" },
  ] };
  const res = sessionDedupEngine.apply(body, { stepConfig: { fuzzy: { enabled: true, minJaccard: 0.85 } }, principalId: "p1" });
  assert.equal(res.compressed, false);
});
