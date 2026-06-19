import test from "node:test";
import assert from "node:assert/strict";
import { loadTranslationFixtures, loadSseSequences } from "../../helpers/translationFixtures.ts";

test("fixtures: each pair file has at least one well-formed case", () => {
  const cases = loadTranslationFixtures();
  assert.ok(cases.length >= 4);
  for (const c of cases) {
    assert.ok(c.name && c.sourceFormat && c.targetFormat && c.input);
  }
});
test("fixtures: sse sequences have chunks and expectedText", () => {
  const seqs = loadSseSequences();
  assert.ok(seqs.length >= 1);
  for (const s of seqs) {
    assert.ok(Array.isArray(s.chunks) && typeof s.expectedText === "string");
  }
});
