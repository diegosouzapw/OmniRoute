import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";

/**
 * Regression tests for #8016 — specialty catalog rows inherit synthetic chat capabilities.
 *
 * Non-chat specialty models (audio, video, moderation, music) must not have
 * tool_calling: true or reasoning: true written by enrichCatalogModelEntry
 * unless an authoritative source explicitly says so.
 *
 * The enrichment code checks `entry.type`: if it's set to a non-chat specialty
 * surface, tool_calling and reasoning are suppressed (not emitted) instead of
 * being optimistically set to true by heuristics.
 */

describe("#8016 — specialty surfaces must not inherit chat capabilities", () => {
  it("does not emit tool_calling for an audio transcription model", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/whisper-1",
      owned_by: "openai",
      type: "audio",
      subtype: "transcription",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    // tool_calling should be absent (or explicitly false), never true
    assert.ok(
      !caps || caps.tool_calling !== true,
      "audio model must not advertise tool_calling: true"
    );
  });

  it("does not emit reasoning for an audio speech model", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/tts-1",
      owned_by: "openai",
      type: "audio",
      subtype: "speech",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    assert.ok(
      !caps || caps.reasoning !== true,
      "audio model must not advertise reasoning: true"
    );
  });

  it("does not emit tool_calling for a video model", () => {
    const entry = enrichCatalogModelEntry({
      id: "veo-free/veo",
      owned_by: "veo-free",
      type: "video",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    assert.ok(
      !caps || caps.tool_calling !== true,
      "video model must not advertise tool_calling: true"
    );
  });

  it("does not emit reasoning for a moderation model", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/omni-moderation-latest",
      owned_by: "openai",
      type: "moderation",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    assert.ok(
      !caps || caps.reasoning !== true,
      "moderation model must not advertise reasoning: true"
    );
  });

  it("does not emit tool_calling for a music model", () => {
    const entry = enrichCatalogModelEntry({
      id: "sunoto/suno-b01",
      owned_by: "sunoto",
      type: "music",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    assert.ok(
      !caps || caps.tool_calling !== true,
      "music model must not advertise tool_calling: true"
    );
  });

  it("preserves tool_calling for chat models (no type or type=chat)", () => {
    const chatEntry = enrichCatalogModelEntry({
      id: "openai/gpt-4o",
      owned_by: "openai",
    });
    const chatCaps = chatEntry.capabilities as Record<string, unknown> | undefined;
    // Chat models SHOULD have tool_calling (either true or false from heuristics)
    assert.ok(
      chatCaps && typeof chatCaps.tool_calling === "boolean",
      "chat model should have tool_calling as a boolean"
    );
  });

  it("preserves tool_calling for chat models with type=chat", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/gpt-4o",
      owned_by: "openai",
      type: "chat",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    assert.ok(
      caps && typeof caps.tool_calling === "boolean",
      "type=chat model should have tool_calling"
    );
  });

  it("does not emit thinking/supportsThinking for specialty models", () => {
    const entry = enrichCatalogModelEntry({
      id: "openai/whisper-1",
      owned_by: "openai",
      type: "audio",
      subtype: "transcription",
    });
    const caps = entry.capabilities as Record<string, unknown> | undefined;
    // thinking/effort_tiers should not be emitted for non-chat models
    // unless an authoritative source sets supportsThinking
    if (caps) {
      assert.notEqual(caps.thinking, true, "audio model must not advertise thinking: true");
      assert.equal(
        (caps as any).effort_tiers,
        undefined,
        "effort_tiers should not appear for audio models"
      );
    }
  });

  it("handles multiple specialty types in a batch", () => {
    const types = ["audio", "video", "moderation", "music"];
    for (const type of types) {
      const entry = enrichCatalogModelEntry({
        id: `test/${type}-model`,
        owned_by: "test",
        type,
      });
      const caps = entry.capabilities as Record<string, unknown> | undefined;
      assert.ok(
        !caps || caps.tool_calling !== true,
        `${type} model must not advertise tool_calling: true`
      );
      assert.ok(
        !caps || caps.reasoning !== true,
        `${type} model must not advertise reasoning: true`
      );
    }
  });
});
