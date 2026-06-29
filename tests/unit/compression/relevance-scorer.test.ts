import test from "node:test";
import assert from "node:assert/strict";
import { scoreSentences } from "../../../open-sse/services/compression/engines/relevance/scorer.ts";

const DEFAULT_CFG = {
  enabled: false,
  overlapThreshold: 0.1,
  budgetPercent: 0.5,
  boilerplateWeight: 0.5,
};

test("relevant sentence scores higher than irrelevant sentence", () => {
  const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "How do I configure the database connection?",
  ];
  const query = "configure database connection settings";
  const scores = scoreSentences(sentences, query, DEFAULT_CFG);
  assert.equal(scores.length, 2);
  assert.ok(scores[1] > scores[0], `expected scores[1]=${scores[1]} > scores[0]=${scores[0]}`);
});

test("boilerplate sentences are penalized relative to content sentences", () => {
  const sentences = [
    "Please note that this is very important information.",
    "Use db.connect() with host and port parameters.",
  ];
  const query = "connect database host port";
  const scores = scoreSentences(sentences, query, DEFAULT_CFG);
  assert.equal(scores.length, 2);
  assert.ok(
    scores[1] > scores[0],
    `content sentence (${scores[1]}) should score higher than boilerplate (${scores[0]})`
  );
});

test("ReDoS-safe: query with special regex characters does not throw", () => {
  const sentences = ["Some normal sentence here.", "Another sentence with content."];
  const maliciousQuery = "((a+)+)$ [.*+?^=!:${}()|[\\]/\\\\] test+++";
  assert.doesNotThrow(() => {
    const scores = scoreSentences(sentences, maliciousQuery, DEFAULT_CFG);
    assert.equal(scores.length, 2);
  });
});

test("empty query returns array of zeros with same length as sentences", () => {
  const sentences = ["First sentence.", "Second sentence.", "Third sentence."];
  const scores = scoreSentences(sentences, "", DEFAULT_CFG);
  assert.equal(scores.length, 3);
  assert.ok(scores.every((s) => s === 0), `all scores should be 0, got: ${scores}`);
});

test("empty sentences array returns empty array", () => {
  const scores = scoreSentences([], "some query", DEFAULT_CFG);
  assert.deepEqual(scores, []);
});

test("single sentence returns array of length 1", () => {
  const scores = scoreSentences(["Only one sentence."], "query text", DEFAULT_CFG);
  assert.equal(scores.length, 1);
  assert.ok(typeof scores[0] === "number");
});

test("identical query and sentence tokens produce high score", () => {
  const sentences = ["configure database connection", "unrelated random words"];
  const query = "configure database connection";
  const scores = scoreSentences(sentences, query, DEFAULT_CFG);
  assert.ok(scores[0] > 0.5, `exact match should score above 0.5, got ${scores[0]}`);
  assert.ok(scores[0] > scores[1]);
});
