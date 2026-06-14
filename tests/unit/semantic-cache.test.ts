import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateSignature,
  isCacheableForRead,
  isCacheableForWrite,
} from "../../src/lib/semanticCache.ts";

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

    it("generates different signatures for different responses input payloads", () => {
      const input1 = [{ role: "user", content: [{ type: "input_text", text: "hello" }] }];
      const input2 = [{ role: "user", content: [{ type: "input_text", text: "goodbye" }] }];
      const sig1 = generateSignature("gpt-5", input1, 0, 1);
      const sig2 = generateSignature("gpt-5", input2, 0, 1);
      assert.notEqual(sig1, sig2);
    });

    it("normalizes missing role in responses input payloads", () => {
      const input1 = [{ content: [{ type: "input_text", text: "hello" }] }];
      const input2 = [{ role: "user", content: [{ type: "input_text", text: "hello" }] }];
      const sig1 = generateSignature("gpt-5", input1, 0, 1);
      const sig2 = generateSignature("gpt-5", input2, 0, 1);
      assert.equal(sig1, sig2);
    });

    // #3740: cross-user cache isolation — different API keys must not share cached responses
    it("generates different signatures for different API key IDs (#3740)", () => {
      const messages = [{ role: "user", content: "what is 2+2?" }];
      const sigKeyA = generateSignature("gpt-4o", messages, 0, 1, "key-id-alice");
      const sigKeyB = generateSignature("gpt-4o", messages, 0, 1, "key-id-bob");
      assert.notEqual(sigKeyA, sigKeyB, "different API keys must produce different cache signatures");
    });

    it("generates consistent signatures for same API key ID (#3740)", () => {
      const messages = [{ role: "user", content: "what is 2+2?" }];
      const sig1 = generateSignature("gpt-4o", messages, 0, 1, "key-id-alice");
      const sig2 = generateSignature("gpt-4o", messages, 0, 1, "key-id-alice");
      assert.equal(sig1, sig2);
    });

    it("matches keyless signature when apiKeyId is undefined (#3740)", () => {
      const messages = [{ role: "user", content: "hello" }];
      // Unauthenticated requests (apiKeyId=undefined) must not collide with keyed requests
      const sigKeyed = generateSignature("gpt-4o", messages, 0, 1, "some-key-id");
      const sigKeyless = generateSignature("gpt-4o", messages, 0, 1, undefined);
      assert.notEqual(sigKeyed, sigKeyless);
    });
  });

  describe("isCacheableForRead", () => {
    // #2536 superseded isCacheable with read/write variants that cache both
    // streaming and non-streaming requests and require an explicit numeric
    // temperature: 0 (omitted temperature is treated as non-deterministic).
    it("returns true for temperature=0 (streaming or not)", () => {
      assert.equal(isCacheableForRead({ stream: false, temperature: 0 }, null), true);
      assert.equal(isCacheableForRead({ stream: true, temperature: 0 }, null), true);
    });

    it("returns false when temperature is omitted (provider default may be non-deterministic)", () => {
      assert.equal(isCacheableForRead({ stream: false }, null), false);
    });

    it("returns false for non-zero temperature", () => {
      assert.equal(isCacheableForRead({ temperature: 0.7 }, null), false);
    });

    it("returns false when no-cache header is set", () => {
      const headers = new Headers({ "x-omniroute-no-cache": "true" });
      assert.equal(isCacheableForRead({ temperature: 0 }, headers), false);
    });

    it("returns true when no-cache header is absent", () => {
      const headers = new Headers({});
      assert.equal(isCacheableForRead({ temperature: 0 }, headers), true);
    });
  });

  describe("isCacheableForWrite", () => {
    it("returns true for temperature=0 responses", () => {
      assert.equal(isCacheableForWrite({ temperature: 0 }, null), true);
    });

    it("returns false when temperature is omitted", () => {
      assert.equal(isCacheableForWrite({ stream: false }, null), false);
    });

    it("returns false for non-zero temperature", () => {
      assert.equal(isCacheableForWrite({ temperature: 0.7 }, null), false);
    });

    it("returns false when no-cache header is set", () => {
      const headers = new Headers({ "x-omniroute-no-cache": "true" });
      assert.equal(isCacheableForWrite({ temperature: 0 }, headers), false);
    });
  });
});
