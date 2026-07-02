import test from "node:test";
import assert from "node:assert/strict";

import {
  findCallers,
  getCodeGraphStats,
  isCodeGraphAvailable,
  searchSymbols,
} from "../../src/lib/copilot/codegraphKnowledge.ts";

test("CodeGraph knowledge helpers fail closed when the index is unavailable", () => {
  assert.equal(isCodeGraphAvailable(), false);

  assert.deepEqual(searchSymbols("handleChatCore"), {
    success: false,
    data: null,
    error: "CodeGraph DB not found",
    engine: "none",
  });

  assert.deepEqual(findCallers("handleChatCore"), {
    success: false,
    data: null,
    error: "CodeGraph DB not found",
    engine: "none",
  });

  assert.deepEqual(getCodeGraphStats(), {
    success: false,
    data: null,
    error: "CodeGraph DB not found",
    engine: "none",
  });
});
