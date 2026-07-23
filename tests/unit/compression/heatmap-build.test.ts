import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCompressionPreviewDiff } from "../../../open-sse/services/compression/diffHelper.ts";

describe("buildCompressionPreviewDiff — heatmap", () => {
  it("returns no heatmap field when flag is absent", () => {
    const result = buildCompressionPreviewDiff("hello world the", "hello world", null);
    assert.ok(!("heatmap" in result), "should not include heatmap when not requested");
  });

  it("ultra mode: per-token scores 0–1, stopword scores low, number/URL score 1.0", () => {
    const original = "the quick 42 https://example.com";
    const compressed = "quick 42 https://example.com";
    const result = buildCompressionPreviewDiff(original, compressed, null, {}, "ultra");

    assert.ok(result.heatmap, "heatmap should be present when mode is ultra");
    assert.equal(result.heatmap!.mode, "ultra");

    const tokens = result.heatmap!.tokens;
    assert.ok(tokens.length > 0, "tokens array should not be empty");

    // All scores 0–1
    for (const t of tokens) {
      assert.ok(t.score >= 0 && t.score <= 1, `score ${t.score} out of [0,1] for token "${t.text}"`);
    }

    // "the" is a stopword — should score low (0.1)
    const theToken = tokens.find((t) => t.text.trim() === "the");
    assert.ok(theToken, 'should have a token for "the"');
    assert.ok(theToken!.score <= 0.2, `stopword "the" expected score ≤0.2, got ${theToken!.score}`);

    // "42" matches \d — should score 1.0
    const numToken = tokens.find((t) => t.text.trim() === "42");
    assert.ok(numToken, 'should have a token for "42"');
    assert.equal(numToken!.score, 1.0);

    // URL should score 1.0
    const urlToken = tokens.find((t) => t.text.includes("https://"));
    assert.ok(urlToken, "should have a URL token");
    assert.equal(urlToken!.score, 1.0);
  });

  it("ultra mode: kept flag reflects whether token survived into compressed", () => {
    const original = "the quick brown fox";
    const compressed = "quick brown fox";
    const result = buildCompressionPreviewDiff(original, compressed, null, {}, "ultra");

    assert.ok(result.heatmap, "heatmap should be present");
    const tokens = result.heatmap!.tokens;

    // "the" was removed — kept should be false
    const theToken = tokens.find((t) => t.text.trim() === "the");
    assert.ok(theToken, 'should have a token for "the"');
    assert.equal(theToken!.kept, false, '"the" should not be kept');

    // "quick", "brown", "fox" should be kept
    for (const word of ["quick", "brown", "fox"]) {
      const tok = tokens.find((t) => t.text.trim() === word);
      assert.ok(tok, `should have a token for "${word}"`);
      assert.equal(tok!.kept, true, `"${word}" should be kept`);
    }
  });

  it("universal mode: kept/removed consistent with diff segments", () => {
    const original = "the quick brown fox";
    const compressed = "quick brown fox";
    const result = buildCompressionPreviewDiff(original, compressed, null, {}, "universal");

    assert.ok(result.heatmap, "heatmap should be present");
    assert.equal(result.heatmap!.mode, "universal");

    const tokens = result.heatmap!.tokens;
    assert.ok(tokens.length > 0);

    // "the" was removed → kept:false, score 0
    const theToken = tokens.find((t) => t.text.trim() === "the");
    assert.ok(theToken, 'should have a token for "the"');
    assert.equal(theToken!.kept, false);
    assert.equal(theToken!.score, 0);

    // "quick" is kept → score 1
    const quickToken = tokens.find((t) => t.text.trim() === "quick");
    assert.ok(quickToken, 'should have a token for "quick"');
    assert.equal(quickToken!.kept, true);
    assert.equal(quickToken!.score, 1);
  });

  it("universal mode: whitespace tokens included with kept status", () => {
    const original = "hello world";
    const compressed = "hello world";
    const result = buildCompressionPreviewDiff(original, compressed, null, {}, "universal");

    assert.ok(result.heatmap, "heatmap should be present");
    // All tokens kept since compressed === original
    for (const t of result.heatmap!.tokens) {
      assert.equal(t.kept, true, `token "${t.text}" should be kept`);
    }
  });
});
