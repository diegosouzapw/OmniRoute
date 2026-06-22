import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  maskKey,
  toggleKeyVisibility,
} from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.js";

describe("maskKey", () => {
  it("returns empty string when key is missing or empty", () => {
    assert.equal(maskKey(""), "");
    assert.equal(maskKey(null), "");
    assert.equal(maskKey(undefined), "");
  });

  it("returns the key untouched when it fits the visible budget (<=8 chars)", () => {
    assert.equal(maskKey("sk"), "sk");
    assert.equal(maskKey("sk-12345"), "sk-12345");
  });

  it("keeps the first 8 chars and appends an ellipsis when the key is longer", () => {
    const full = "sk-or-1234567890abcdef";
    const masked = maskKey(full);
    assert.equal(masked.startsWith("sk-or-12"), true);
    assert.equal(masked.endsWith("..."), true);
    // Must not leak the tail
    assert.equal(masked.includes("90abcdef"), false);
  });
});

describe("toggleKeyVisibility", () => {
  it("adds an id when it is not present", () => {
    const next = toggleKeyVisibility(new Set<string>(), "k1");
    assert.equal(next.has("k1"), true);
    assert.equal(next.size, 1);
  });

  it("removes an id when it is already present", () => {
    const next = toggleKeyVisibility(new Set<string>(["k1", "k2"]), "k1");
    assert.equal(next.has("k1"), false);
    assert.equal(next.has("k2"), true);
    assert.equal(next.size, 1);
  });

  it("returns a NEW Set (does not mutate the input — React state safety)", () => {
    const input = new Set<string>(["k1"]);
    const output = toggleKeyVisibility(input, "k2");
    assert.notEqual(output, input);
    assert.equal(input.has("k2"), false);
    assert.equal(output.has("k2"), true);
  });
});
