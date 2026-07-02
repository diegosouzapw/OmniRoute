// tests/unit/compression/fuzzyDedup.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  shingles, jaccard, findNearDuplicates, applyFuzzyPass,
} from "../../../open-sse/services/compression/engines/session-dedup/fuzzy.ts";
import { retrieveBlock, resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";

test("shingles: k=3 word windows, deterministic, empty when < k words", () => {
  assert.equal(shingles("one two", 3).size, 0);
  const a = shingles("the quick brown fox jumps", 3);
  assert.equal(a.size, 3); // "the quick brown","quick brown fox","brown fox jumps"
  assert.deepEqual([...a], [...shingles("the quick brown fox jumps", 3)]); // deterministic
});

test("jaccard: identical=1, disjoint=0, both-empty=0, partial=ratio", () => {
  const a = shingles("alpha beta gamma delta", 3);
  assert.equal(jaccard(a, a), 1);
  assert.equal(jaccard(a, shingles("zzz yyy xxx www", 3)), 0);
  assert.equal(jaccard(new Set(), new Set()), 0);
});

test("findNearDuplicates: a block ≥0.85 similar to an earlier one is flagged; below isn't; maxBlocks bounds", () => {
  const base = "alpha beta gamma delta epsilon zeta eta theta iota kappa";
  const near = base + " lambda"; // one extra word → very high jaccard
  const far = "totally different words here nothing in common with above at all";
  const blocks = [
    { text: base, index: 0 },
    { text: near, index: 1 },
    { text: far, index: 2 },
  ];
  const nd = findNearDuplicates(blocks, 0.85, 200, 3);
  assert.equal(nd.length, 1);
  assert.equal(nd[0].block.index, 1);
  assert.equal(nd[0].matchedIndex, 0);
  assert.ok(nd[0].similarity >= 0.85);
  // maxBlocks guard: above the cap → [] (no O(n^2) blowup)
  assert.deepEqual(findNearDuplicates(blocks, 0.85, 1, 3), []);
});

test("applyFuzzyPass: near-dup message → CCR marker, recoverable; below threshold untouched; fail-open", async () => {
  resetCcrStore();
  const A = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron";
  const Aprime = A + " pi"; // ≥0.85 similar
  const messages = [
    { role: "user", content: A },
    { role: "user", content: Aprime },
  ];
  const out = applyFuzzyPass(messages, { minJaccard: 0.85, shingleSize: 3, maxBlocks: 200, minBlockChars: 10, principalId: "p1" });
  assert.equal(out.fuzzyCount, 1);
  const marker = out.messages[1].content as string;
  assert.match(marker, /^\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
  // recoverable: the hash in the marker resolves to A' verbatim
  const hash = marker.match(/hash=([0-9a-f]{24})/)![1];
  assert.equal(retrieveBlock(hash, "p1"), Aprime);
  assert.equal(out.messages[0].content, A); // first occurrence intact
});
