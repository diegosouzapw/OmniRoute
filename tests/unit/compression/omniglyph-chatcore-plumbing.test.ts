import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveOmniGlyphTransport } from "../../../open-sse/services/compression/imageTransportPolicy.ts";

test("chatCore uses the measured Anthropic byte-preserving transport policy", () => {
  const chatCore = readFileSync("open-sse/handlers/chatCore.ts", "utf8");

  assert.match(chatCore, /resolveOmniGlyphTransport\(provider\)/);
  const translationIndex = chatCore.indexOf("translatedBody = translateRequest(");
  const postCompressionIndex = chatCore.indexOf("if (runPostTranslationCompression");
  assert.ok(translationIndex >= 0, "chatCore deve manter a tradução explícita");
  assert.ok(postCompressionIndex > translationIndex, "OmniGlyph target-wire roda após tradução");
  assert.match(chatCore, /compressionStage: "post-translation"/);
  assert.deepEqual(resolveOmniGlyphTransport("anthropic"), {
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
  });
  assert.deepEqual(resolveOmniGlyphTransport("claude"), {
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
  });
  assert.deepEqual(resolveOmniGlyphTransport("openai"), {
    providerTransport: "aggregator",
    imageTransportFidelity: "unknown",
  });
});
