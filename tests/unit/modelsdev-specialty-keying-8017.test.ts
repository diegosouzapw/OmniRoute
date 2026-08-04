import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import {
  saveModelsDevCapabilities,
  clearModelsDevCapabilities,
  type CapabilitiesByProvider,
} from "../../src/lib/modelsDevSync.ts";

describe("models.dev specialty key resolution (#8017)", () => {
  before(() => {
    // Store specialty rows the way production models.dev currently does:
    // under provider=vercel with qualified openai/* model ids.
    const capabilities: CapabilitiesByProvider = {
      vercel: {
        "openai/whisper-1": {
          tool_call: false,
          reasoning: false,
          attachment: false,
          structured_output: null,
          temperature: true,
          modalities_input: '["audio"]',
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: null,
          limit_context: 0,
          limit_input: null,
          limit_output: 0,
          interleaved_field: null,
          last_synced: new Date().toISOString(),
        },
        "openai/tts-1": {
          tool_call: false,
          reasoning: false,
          attachment: false,
          structured_output: null,
          temperature: true,
          modalities_input: '["text"]',
          modalities_output: '["audio"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: null,
          limit_context: 0,
          limit_input: null,
          limit_output: 0,
          interleaved_field: null,
          last_synced: new Date().toISOString(),
        },
      },
      openai: {
        "gpt-4o": {
          tool_call: true,
          reasoning: false,
          attachment: true,
          structured_output: true,
          temperature: true,
          modalities_input: '["text","image","pdf"]',
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: null,
          limit_context: 128000,
          limit_input: null,
          limit_output: 16384,
          interleaved_field: null,
          last_synced: new Date().toISOString(),
        },
      },
    };
    saveModelsDevCapabilities(capabilities);
  });

  after(() => {
    try {
      clearModelsDevCapabilities();
    } catch {
      // ignore cleanup failures in unit isolation
    }
  });

  it("resolves openai/whisper-1 against vercel/openai/whisper-1", () => {
    const md = getResolvedModelCapabilities({ provider: "openai", model: "whisper-1" });
    assert.deepEqual(md.modalitiesInput, ["audio"]);
    assert.deepEqual(md.modalitiesOutput, ["text"]);
    assert.equal(md.toolCalling, false);
    assert.equal(md.reasoning, false);
  });

  it("resolves openai/tts-1 against vercel/openai/tts-1", () => {
    const md = getResolvedModelCapabilities({ provider: "openai", model: "tts-1" });
    assert.deepEqual(md.modalitiesInput, ["text"]);
    assert.deepEqual(md.modalitiesOutput, ["audio"]);
    assert.equal(md.toolCalling, false);
  });

  it("still resolves direct openai/gpt-4o keys", () => {
    const md = getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" });
    assert.equal(md.toolCalling, true);
    assert.equal(md.contextWindow, 128000);
    assert.deepEqual(md.modalitiesInput, ["text", "image", "pdf"]);
  });
});
