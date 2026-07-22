import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dedupeExactCatalogIds } from "../../src/app/api/v1/models/catalogDedupe.ts";

/**
 * Regression tests for #8015 — specialty models appear twice in GET /v1/models.
 *
 * A generic/untyped chat-like row and a typed specialty row for the same public id
 * both survive the old (id, type, subtype) guard because the generic row has empty
 * type/subtype, making it a distinct listing identity.
 *
 * The fix: Pass 2 suppresses generic rows when a specialty sibling exists.
 */

describe("#8015 — generic-vs-specialty duplicate suppression", () => {
  it("drops generic sibling when a typed audio specialty exists", () => {
    const input = [
      { id: "openai/whisper-1", owned_by: "openai", context_length: 128000, capabilities: { tool_calling: true } },
      { id: "openai/whisper-1", owned_by: "openai", type: "audio", subtype: "transcription" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 1);
    assert.equal(result[0].type, "audio");
    assert.equal(result[0].subtype, "transcription");
  });

  it("drops generic sibling when a typed video specialty exists", () => {
    const input = [
      { id: "veo-free/veo", owned_by: "veo-free" },
      { id: "veo-free/veo", owned_by: "veo-free", type: "video" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 1);
    assert.equal(result[0].type, "video");
  });

  it("drops generic sibling when a typed moderation specialty exists", () => {
    const input = [
      { id: "openai/omni-moderation-latest", owned_by: "openai" },
      { id: "openai/omni-moderation-latest", owned_by: "openai", type: "moderation" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 1);
    assert.equal(result[0].type, "moderation");
  });

  it("drops generic sibling when a typed music specialty exists", () => {
    const input = [
      { id: "sunoto/suno-b01", owned_by: "sunoto" },
      { id: "sunoto/suno-b01", owned_by: "sunoto", type: "music" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 1);
    assert.equal(result[0].type, "music");
  });

  it("preserves distinct transcription and speech subtypes under same id", () => {
    const input = [
      { id: "openai/tts-1", owned_by: "openai", type: "audio", subtype: "speech" },
      { id: "openai/tts-1", owned_by: "openai", type: "audio", subtype: "transcription" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 2);
    const subtypes = result.map((m) => m.subtype).sort();
    assert.deepEqual(subtypes, ["speech", "transcription"]);
  });

  it("drops generic sibling but preserves distinct typed subtypes", () => {
    const input = [
      { id: "openai/tts-1", owned_by: "openai", context_length: 128000 }, // generic
      { id: "openai/tts-1", owned_by: "openai", type: "audio", subtype: "speech" },
      { id: "openai/tts-1", owned_by: "openai", type: "audio", subtype: "transcription" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 2);
    assert.ok(result.every((m) => m.type === "audio"));
  });

  it("does NOT suppress generic row when no specialty sibling exists", () => {
    const input = [
      { id: "openai/gpt-4o", owned_by: "openai" },
      { id: "anthropic/claude-4", owned_by: "anthropic" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 2);
  });

  it("does NOT suppress embedding/rerank/image typed rows (not specialty types)", () => {
    // Only audio/video/moderation/music are specialty types for #8015.
    // Embedding/rerank/image have their own dedup via hasEquivalentSpecialtyModel.
    const input = [
      { id: "openai/text-embedding-3-small", owned_by: "openai" },
      { id: "openai/text-embedding-3-small", owned_by: "openai", type: "embedding" },
    ];
    const result = dedupeExactCatalogIds(input);
    // Both survive Pass 2 because "embedding" is not in SPECIALTY_TYPES.
    assert.equal(result.length, 2);
  });

  it("still dedupes exact duplicates (same id+type+subtype)", () => {
    const input = [
      { id: "openai/whisper-1", type: "audio", subtype: "transcription" },
      { id: "openai/whisper-1", type: "audio", subtype: "transcription" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 1);
  });

  it("handles arrays with no specialty rows (no-op)", () => {
    const input = [
      { id: "openai/gpt-4o", owned_by: "openai" },
      { id: "anthropic/claude-4", owned_by: "anthropic" },
      { id: "google/gemini-2.5-pro", owned_by: "google" },
    ];
    const result = dedupeExactCatalogIds(input);
    assert.equal(result.length, 3);
  });

  it("handles empty and single-element arrays", () => {
    assert.deepEqual(dedupeExactCatalogIds([]), []);
    const single = [{ id: "openai/gpt-4o" }];
    assert.deepEqual(dedupeExactCatalogIds(single), single);
  });

  it("preserves entries without string id (passthrough)", () => {
    const input = [
      { id: "openai/whisper-1", type: "audio" },
      { owned_by: "unknown" }, // no id
      { id: "openai/whisper-1" }, // generic sibling — should be suppressed
    ];
    const result = dedupeExactCatalogIds(input as any);
    // The no-id entry passes through, the generic is suppressed
    assert.equal(result.length, 2);
    assert.ok(result.some((m) => m.type === "audio"));
    assert.ok(result.some((m) => m.id === undefined));
  });

  it("production scenario: 12 duplicate IDs from #8015", () => {
    // Simulates the exact production scenario from the issue
    const input = [
      // whisper-1
      { id: "openai/whisper-1", context_length: 128000, capabilities: { tool_calling: true, reasoning: true } },
      { id: "openai/whisper-1", type: "audio", subtype: "transcription" },
      // tts-1
      { id: "openai/tts-1" },
      { id: "openai/tts-1", type: "audio", subtype: "speech" },
      // veo
      { id: "veo-free/veo" },
      { id: "veo-free/veo", type: "video" },
      // codex (duplicate, not specialty — should NOT be suppressed by pass 2)
      { id: "codex/gpt-5.6-luna" },
      { id: "codex/gpt-5.6-luna" },
    ];
    const result = dedupeExactCatalogIds(input);
    // whisper-1: 1 (audio only), tts-1: 1 (audio only), veo: 1 (video only), codex: 1 (exact dup)
    const ids = result.map((m) => m.id);
    assert.equal(ids.filter((id) => id === "openai/whisper-1").length, 1);
    assert.equal(ids.filter((id) => id === "openai/tts-1").length, 1);
    assert.equal(ids.filter((id) => id === "veo-free/veo").length, 1);
    assert.equal(ids.filter((id) => id === "codex/gpt-5.6-luna").length, 1);
    assert.equal(result.length, 4);
  });
});
