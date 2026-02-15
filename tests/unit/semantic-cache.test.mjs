import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateSignature, isCacheable } from "../../src/lib/semanticCache.js";

describe("Semantic Cache", () => {
  describe("generateSignature", () => {
    it("generates consistent signatures for same inputs", () => {
      const messages = [{ role: "user", content: "hello" }];
      const sig1 = generateSignature("gpt-4", messages, 0, 1);
      const sig2 = generateSignature("gpt-4", messages, 0, 1);
      assert.equal(sig1, sig2);
    });

    it("generates different signatures for different models", () => {
      const messages = [{ role: "user", content: "hello" }];
      const sig1 = generateSignature("gpt-4", messages, 0, 1);
      const sig2 = generateSignature("gpt-3.5", messages, 0, 1);
      assert.notEqual(sig1, sig2);
    });

    it("generates different signatures for different messages", () => {
      const msg1 = [{ role: "user", content: "hello" }];
      const msg2 = [{ role: "user", content: "goodbye" }];
      const sig1 = generateSignature("gpt-4", msg1, 0, 1);
      const sig2 = generateSignature("gpt-4", msg2, 0, 1);
      assert.notEqual(sig1, sig2);
    });

    it("generates different signatures for different temperatures", () => {
      const messages = [{ role: "user", content: "hello" }];
      const sig1 = generateSignature("gpt-4", messages, 0, 1);
      const sig2 = generateSignature("gpt-4", messages, 0.7, 1);
      assert.notEqual(sig1, sig2);
    });

    it("normalizes messages (strips extra fields)", () => {
      const msg1 = [{ role: "user", content: "hello", extra: true }];
      const msg2 = [{ role: "user", content: "hello" }];
      const sig1 = generateSignature("gpt-4", msg1, 0, 1);
      const sig2 = generateSignature("gpt-4", msg2, 0, 1);
      assert.equal(sig1, sig2);
    });

    it("handles non-string content", () => {
      const messages = [{ role: "user", content: [{ type: "text", text: "hi" }] }];
      const sig = generateSignature("gpt-4", messages, 0, 1);
      assert.ok(sig.length > 0);
    });

    it("handles empty messages", () => {
      const sig = generateSignature("gpt-4", [], 0, 1);
      assert.ok(sig.length > 0);
    });
  });

  describe("isCacheable", () => {
    it("returns true for non-streaming temp=0 requests", () => {
      assert.equal(isCacheable({ stream: false, temperature: 0 }, null), true);
    });

    it("returns true when temperature is undefined (defaults to 0)", () => {
      assert.equal(isCacheable({ stream: false }, null), true);
    });

    it("returns false for streaming requests", () => {
      assert.equal(isCacheable({ stream: true, temperature: 0 }, null), false);
    });

    it("returns false when stream is not explicitly false", () => {
      assert.equal(isCacheable({ temperature: 0 }, null), false);
    });

    it("returns false for non-zero temperature", () => {
      assert.equal(isCacheable({ stream: false, temperature: 0.7 }, null), false);
    });

    it("returns false when no-cache header is set", () => {
      const headers = new Headers({ "x-omniroute-no-cache": "true" });
      assert.equal(isCacheable({ stream: false, temperature: 0 }, headers), false);
    });

    it("returns true when no-cache header is absent", () => {
      const headers = new Headers({});
      assert.equal(isCacheable({ stream: false, temperature: 0 }, headers), true);
    });
  });
});
