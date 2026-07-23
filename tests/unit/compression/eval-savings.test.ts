import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computeSavings } from "../../../open-sse/services/compression/eval/savings.ts";

describe("eval savings", () => {
  it("computes tokensBefore/after + ratio from the bodies", () => {
    const full = { messages: [{ role: "user", content: "a".repeat(400) }] };
    const compressed = { messages: [{ role: "user", content: "a".repeat(100) }] };
    const s = computeSavings(full, compressed);
    assert.ok(s.tokensBefore > s.tokensAfter);
    assert.ok(s.ratio < 1 && s.ratio > 0);
    assert.equal(s.costDelta, undefined);
  });

  it("computes a positive costDelta when a per-1k input price is supplied", () => {
    const full = { messages: [{ role: "user", content: "a".repeat(4000) }] };
    const compressed = { messages: [{ role: "user", content: "a".repeat(1000) }] };
    const s = computeSavings(full, compressed, 0.003); // $0.003 / 1k input tokens
    assert.ok((s.costDelta ?? 0) > 0);
  });

  it("ratio is 1 (no savings) when bodies are identical", () => {
    const body = { messages: [{ role: "user", content: "x" }] };
    const s = computeSavings(body, body);
    assert.equal(s.ratio, 1);
  });
});
