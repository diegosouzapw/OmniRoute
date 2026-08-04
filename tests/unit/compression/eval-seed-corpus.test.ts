import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SEED_CORPUS } from "../../../open-sse/services/compression/eval/seedCorpus.ts";
import { loadCorpus } from "../../../open-sse/services/compression/eval/corpus.ts";
import type { ContentKind } from "../../../open-sse/services/compression/eval/types.ts";

describe("eval seed corpus", () => {
  it("loads cleanly through loadCorpus (no malformed/PII cases)", () => {
    assert.doesNotThrow(() => loadCorpus(SEED_CORPUS));
  });

  it("covers every content kind", () => {
    const kinds = new Set<ContentKind>(SEED_CORPUS.map((c) => c.kind));
    for (const k of ["tool-output-json", "logs", "code", "prose", "multi-turn"] as ContentKind[]) {
      assert.ok(kinds.has(k), `missing kind ${k}`);
    }
  });

  it("has unique ids and at least one gold-bearing case", () => {
    const ids = SEED_CORPUS.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(SEED_CORPUS.some((c) => typeof c.gold === "string"));
  });
});
