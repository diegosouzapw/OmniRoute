/**
 * Unit tests for MiniMax M3 model registration (#3110)
 *
 * Verifies that MiniMax-M3 is present in the provider registry across
 * all relevant provider entries (minimax, minimax-cn, opencode, opencode-go,
 * opencode-zen, kiro, ollama, nvidia).
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

describe("MiniMax M3 model registration (#3110)", () => {
  it("minimax provider has MiniMax-M3 with 1M context", () => {
    const entry = REGISTRY.minimax;
    assert.ok(entry, "minimax registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "MiniMax-M3");
    assert.ok(m3, "MiniMax-M3 must be in minimax models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("minimax-cn provider has MiniMax-M3 with 1M context", () => {
    const entry = REGISTRY["minimax-cn"];
    assert.ok(entry, "minimax-cn registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "MiniMax-M3");
    assert.ok(m3, "MiniMax-M3 must be in minimax-cn models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("opencode provider does NOT list minimax-m3-free (#6998 — delisted upstream, 401)", () => {
    const entry = REGISTRY.opencode;
    assert.ok(entry, "opencode registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimax-m3-free");
    assert.equal(m3, undefined, "minimax-m3-free was delisted from OpenCode Zen's free tier (#6998)");
  });

  it("opencode-go provider has minimax-m3 with Claude targetFormat", () => {
    const entry = REGISTRY["opencode-go"];
    assert.ok(entry, "opencode-go registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimax-m3");
    assert.ok(m3, "minimax-m3 must be in opencode-go models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.targetFormat, "claude");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("opencode-zen provider has minimax-m3 with 1M context", () => {
    const entry = REGISTRY["opencode-zen"];
    assert.ok(entry, "opencode-zen registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimax-m3");
    assert.ok(m3, "minimax-m3 must be in opencode-zen models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("trae provider has minimax-m3 with 1M context", () => {
    const entry = REGISTRY.trae;
    assert.ok(entry, "trae registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimax-m3");
    assert.ok(m3, "minimax-m3 must be in trae models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("ollama-cloud provider has minimax-m3 with 1M context", () => {
    const entry = REGISTRY["ollama-cloud"];
    assert.ok(entry, "ollama-cloud registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimax-m3");
    assert.ok(m3, "minimax-m3 must be in ollama-cloud models");
    assert.equal(m3.name, "MiniMax M3");
    assert.equal(m3.contextLength, 1_048_576);
  });

  it("nvidia provider does NOT list minimaxai/minimax-m3 (removed in #3329 — 404 upstream)", () => {
    const entry = REGISTRY.nvidia;
    assert.ok(entry, "nvidia registry entry must exist");
    const m3 = entry.models.find((m) => m.id === "minimaxai/minimax-m3");
    assert.equal(m3, undefined, "NVIDIA NIM does not host minimaxai/minimax-m3 (see #3329)");
  });
});
