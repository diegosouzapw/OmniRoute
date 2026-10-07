import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { hasPayloadFreeEvidence } from "../../src/shared/utils/payloadFreeEvidence.ts";

// Entry shapes are trimmed from real public /models payloads (2026-09-27).
describe("hasPayloadFreeEvidence", () => {
  it("accepts OpenRouter-shaped zero prompt/completion pricing", () => {
    assert.equal(
      hasPayloadFreeEvidence({ id: "a/b", pricing: { prompt: "0", completion: "0" } }),
      true
    );
  });

  it("accepts input/output pricing (Vercel AI Gateway, xKiro)", () => {
    assert.equal(
      hasPayloadFreeEvidence({ id: "stealth/pixel-canary", pricing: { input: "0", output: "0" } }),
      true
    );
    assert.equal(
      hasPayloadFreeEvidence({
        id: "cohere/command-a",
        pricing: { currency: "USD", unit: "per_1m_tokens", input: 0, output: 0 },
      }),
      true
    );
  });

  it("accepts a free tag when no price is published", () => {
    assert.equal(hasPayloadFreeEvidence({ id: "p/m", tags: ["tool-use", "Free"] }), true);
  });

  it("accepts the :free suffix", () => {
    assert.equal(hasPayloadFreeEvidence({ id: "q/m:free" }), true);
  });

  it("lets an explicit flag win in both directions", () => {
    // Kilo: isFree:false on a 0/0-priced model (billed per generation elsewhere).
    assert.equal(
      hasPayloadFreeEvidence({
        id: "google/lyria-3-pro-preview",
        isFree: false,
        pricing: { prompt: "0", completion: "0" },
      }),
      false
    );
    // LLM Gateway: free:false on routers whose token price is 0.
    assert.equal(
      hasPayloadFreeEvidence({
        id: "auto",
        free: false,
        pricing: { prompt: "0", completion: "0" },
      }),
      false
    );
    // Kenari: pricing.free:true with null token prices.
    assert.equal(
      hasPayloadFreeEvidence({
        id: "agnes-3-0-flash:free",
        pricing: { free: true, input: null, output: null },
      }),
      true
    );
    // g4f: top-level free:true, no pricing at all.
    assert.equal(hasPayloadFreeEvidence({ id: "sana", free: true }), true);
    assert.equal(hasPayloadFreeEvidence({ id: "x:free", isFree: false }), false);
  });

  it("rejects zero token prices when another unit is billed", () => {
    // EUrouter: per-request price.
    assert.equal(
      hasPayloadFreeEvidence({
        id: "deepseek-ocr-2",
        pricing: { prompt: "0", completion: "0", request: "0.02", discount: 1 },
      }),
      false
    );
    // MegaNova: per-minute audio.
    assert.equal(
      hasPayloadFreeEvidence({
        id: "whisper",
        pricing: { prompt: "0.00", completion: "0.00", audio_per_minute: "0.0060" },
      }),
      false
    );
    // FastRouter: nested per-resolution video cost.
    assert.equal(
      hasPayloadFreeEvidence({
        id: "v",
        pricing: { prompt: "0", completion: "0", videoCost: [{ "720p": 0.1 }] },
      }),
      false
    );
    assert.equal(
      hasPayloadFreeEvidence({ id: "t", tags: ["free"], pricing: { input: "0.1", output: "0" } }),
      false
    );
  });

  it("ignores ratio fields that are not prices", () => {
    assert.equal(
      hasPayloadFreeEvidence({ id: "k", pricing: { prompt: "0", completion: "0", discount: 0.5 } }),
      true
    );
  });

  it("rejects missing, partial, or malformed evidence", () => {
    assert.equal(hasPayloadFreeEvidence(null), false);
    assert.equal(hasPayloadFreeEvidence({ id: "m" }), false);
    assert.equal(hasPayloadFreeEvidence({ id: "m", pricing: { input: "0" } }), false);
    assert.equal(hasPayloadFreeEvidence({ id: "m", pricing: { input: "", output: "" } }), false);
    assert.equal(hasPayloadFreeEvidence({ id: "m", isFree: "true" }), false);
    assert.equal(
      hasPayloadFreeEvidence({ id: "m", pricing: { input: "0", output: "0.000001" } }),
      false
    );
  });
});
