import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/batchProcessor.ts");

describe("batchProcessor helpers", () => {
  describe("parseBatchItems", () => {
    const endpoint = "/v1/chat/completions";

    it("parses valid JSONL input", () => {
      const input = Buffer.from(
        JSON.stringify({ url: endpoint, body: { model: "gpt-4", messages: [] }, custom_id: "r1" }) +
          "\n" +
          JSON.stringify({ url: endpoint, body: { model: "gpt-4", messages: [] }, custom_id: "r2" })
      );
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items!.length, 2);
      assert.equal(result.items![0].customId, "r1");
      assert.equal(result.items![1].customId, "r2");
    });

    it("returns error for invalid JSON", () => {
      const input = Buffer.from("not json");
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /not valid JSON/);
    });

    it("returns error for non-POST method", () => {
      const input = Buffer.from(JSON.stringify({ method: "GET", url: endpoint, body: {} }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /unsupported method/);
    });

    it("returns error for mismatched URL", () => {
      const input = Buffer.from(
        JSON.stringify({ url: "/v1/embeddings", body: { model: "text-embedding" } })
      );
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /does not match/);
    });

    it("returns error for missing body", () => {
      const input = Buffer.from(JSON.stringify({ url: endpoint }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.items, null);
      assert.match(result.error!, /must include a JSON object body/);
    });

    it("defaults method to POST", () => {
      const input = Buffer.from(JSON.stringify({ url: endpoint, body: { model: "gpt-4" } }));
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items![0].method, "POST");
    });

    it("handles empty input", () => {
      const input = Buffer.from("");
      const result = mod.parseBatchItems(input, endpoint);
      assert.equal(result.error, null);
      assert.equal(result.items!.length, 0);
    });
  });

  describe("buildRequestBody", () => {
    it("adds stream:false for chat endpoint", () => {
      const result = mod.buildRequestBody({
        body: { model: "gpt-4", messages: [] },
        url: "/v1/chat/completions",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, false);
      assert.equal(result.model, "gpt-4");
    });

    it("does not add stream for embeddings endpoint", () => {
      const result = mod.buildRequestBody({
        body: { model: "text-embedding-3-small", input: "hello" },
        url: "/v1/embeddings",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, undefined);
    });

    it("does not add stream for images endpoint", () => {
      const result = mod.buildRequestBody({
        body: { prompt: "a cat" },
        url: "/v1/images/generations",
        customId: null,
        lineNumber: 1,
        method: "POST",
      });
      assert.equal(result.stream, undefined);
    });
  });

  describe("maybeThrottle", () => {
    it("returns null when no rate-limit headers present", () => {
      const headers = new Headers();
      assert.equal(mod.maybeThrottle(headers), null);
    });
  });
});
