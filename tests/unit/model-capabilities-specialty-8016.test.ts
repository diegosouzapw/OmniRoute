import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getResolvedModelCapabilities,
  isNonChatCatalogSurface,
} from "../../src/lib/modelCapabilities.ts";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";

describe("specialty catalog surfaces (#8016)", () => {
  it("recognizes non-chat catalog types", () => {
    assert.equal(isNonChatCatalogSurface("audio"), true);
    assert.equal(isNonChatCatalogSurface("video"), true);
    assert.equal(isNonChatCatalogSurface("moderation"), true);
    assert.equal(isNonChatCatalogSurface("chat"), false);
    assert.equal(isNonChatCatalogSurface(undefined), false);
  });

  it("does not optimistically enable tools/reasoning for specialty model ids", () => {
    const whisper = getResolvedModelCapabilities({ provider: "openai", model: "whisper-1" });
    assert.equal(whisper.toolCalling, false);
    assert.equal(whisper.reasoning, false);

    const tts = getResolvedModelCapabilities({ provider: "openai", model: "tts-1" });
    assert.equal(tts.toolCalling, false);
    assert.equal(tts.reasoning, false);

    const veo = getResolvedModelCapabilities({ provider: "veo-free", model: "veo" });
    assert.equal(veo.toolCalling, false);
    assert.equal(veo.reasoning, false);
  });

  it("enrichment does not invent chat tool/reasoning on typed specialty rows", () => {
    const enriched = enrichCatalogModelEntry({
      id: "openai/whisper-1",
      owned_by: "openai",
      root: "whisper-1",
      type: "audio",
      subtype: "transcription",
    });
    const caps = (enriched.capabilities || {}) as Record<string, unknown>;
    assert.equal(caps.tool_calling, false);
    assert.equal(caps.reasoning, false);
  });
});
