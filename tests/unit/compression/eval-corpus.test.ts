import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadCorpus, hashCorpus } from "../../../open-sse/services/compression/eval/corpus.ts";
import type { EvalCase } from "../../../open-sse/services/compression/eval/types.ts";

const cases: EvalCase[] = [
  { id: "a", kind: "prose", context: "hello world", question: "what is it?" },
  { id: "b", kind: "code", context: "function f(){return 1}", question: "what does f return?", gold: "1" },
];

describe("eval corpus loader", () => {
  it("loads valid cases unchanged", () => {
    const loaded = loadCorpus(cases);
    assert.equal(loaded.length, 2);
    assert.equal(loaded[1].gold, "1");
  });

  it("rejects a case missing required fields", () => {
    assert.throws(() => loadCorpus([{ id: "x", kind: "prose", context: "", question: "q" } as EvalCase]));
  });

  it("rejects a captured case with an obvious PII marker (email)", () => {
    assert.throws(() =>
      loadCorpus([{ id: "p", kind: "logs", context: "user alice@example.com failed", question: "who?", captured: true }])
    );
  });

  it("allows a curated seed case even if it contains an email-like token (curated is vetted)", () => {
    const loaded = loadCorpus([{ id: "s", kind: "logs", context: "noreply@x.test sent", question: "who?", captured: false }]);
    assert.equal(loaded.length, 1);
  });

  it("hashCorpus is stable and order-independent over case ids", () => {
    const h1 = hashCorpus(cases);
    const h2 = hashCorpus([cases[1], cases[0]]);
    assert.equal(h1, h2);
    assert.match(h1, /^[0-9a-f]{64}$/);
  });
});
