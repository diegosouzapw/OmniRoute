import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { analyzePrefix, generatePromptCacheKey } from "../../src/lib/promptCache";

describe("prompt cache prefix analyzer", () => {
  it("captures stable system prefixes and derives a cache key", () => {
    const messages = [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Hello" },
    ];

    const analysis = analyzePrefix(messages);

    assert.equal(analysis.prefixEndIdx, 0);
    assert.equal(analysis.prefixType, "system_only");
    assert.equal(analysis.confidence, 0.9);
    assert.ok(analysis.prefixTokens > 0);
    assert.match(generatePromptCacheKey(messages), /^omni-[a-f0-9]{32}$/);
  });

  it("keeps the legacy empty-content key when there is no prefix", () => {
    const messages = [{ role: "user", content: "Hello" }];

    const analysis = analyzePrefix(messages);

    assert.equal(analysis.prefixEndIdx, -1);
    assert.equal(generatePromptCacheKey(messages), "omni-e3b0c44298fc1c149afbf4c8996fb924");
  });
});
