import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { toFts5MatchQuery } from "../../../src/lib/memory/retrieval";

describe("memory retrieval toFts5MatchQuery", () => {
  it("keeps plain terms and joins with AND", () => {
    assert.strictEqual(toFts5MatchQuery("hello world"), '"hello" AND "world"');
  });

  it("strips FTS5 syntax characters", () => {
    assert.strictEqual(
      toFts5MatchQuery("Чем занимается пользователь?"),
      '"Чем" AND "занимается" AND "пользователь"'
    );
  });

  it("strips quotes, colons, parentheses and dashes", () => {
    assert.strictEqual(
      toFts5MatchQuery('model "gpt-4o": (fast) OR NOT [x]'),
      '"model" AND "gpt4o" AND "fast" AND "OR" AND "NOT" AND "x"'
    );
  });

  it("keeps punctuation-only input as a non-matching quoted phrase", () => {
    assert.strictEqual(toFts5MatchQuery("???! ..."), '""');
  });

  it("returns non-matching quoted phrase for empty input", () => {
    assert.strictEqual(toFts5MatchQuery(""), '""');
  });
});
