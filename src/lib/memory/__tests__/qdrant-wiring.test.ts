/**
 * Tests for the Qdrant wiring contract used by createMemory.
 *
 * createMemory in store.ts performs a best-effort fire-and-forget call to
 * upsertSemanticMemoryPoint after every successful SQLite write. This test
 * pins the behaviour the wiring relies on:
 *   1. normalizeQdrantConfig handles the disabled / unconfigured case
 *      (which makes upsertSemanticMemoryPoint short-circuit with
 *      { ok: false, error: "not_configured" } instead of throwing).
 *   2. normalizeQdrantConfig applies the documented defaults when keys
 *      are missing or malformed.
 *
 * These pure-logic checks avoid the need for a live DB / Qdrant server in CI.
 */

import { describe, test, expect } from "vitest";
import { normalizeQdrantConfig } from "../qdrant";

describe("normalizeQdrantConfig — defaults & disabled state", () => {
  test("returns disabled config when settings are empty (no Qdrant configured)", () => {
    const cfg = normalizeQdrantConfig({});
    expect(cfg.enabled).toBe(false);
    expect(cfg.host).toBe("");
    expect(cfg.apiKey).toBeNull();
    // Defaults still applied for non-toggle fields:
    expect(cfg.port).toBe(6333);
    expect(cfg.collection).toBe("omniroute_memory");
    expect(cfg.embeddingModel).toBe("openai/text-embedding-3-small");
  });

  test("disabled flag wins even when host is set", () => {
    const cfg = normalizeQdrantConfig({
      qdrantHost: "qdrant.example.com",
      qdrantEnabled: false,
    });
    expect(cfg.enabled).toBe(false);
    expect(cfg.host).toBe("qdrant.example.com");
  });

  test("enabled=true + host set yields an active config", () => {
    const cfg = normalizeQdrantConfig({
      qdrantEnabled: true,
      qdrantHost: "qdrant.example.com",
      qdrantPort: 6334,
      qdrantApiKey: "secret-key",
      qdrantCollection: "my_memory",
      qdrantEmbeddingModel: "voyage/voyage-3",
    });
    expect(cfg.enabled).toBe(true);
    expect(cfg.host).toBe("qdrant.example.com");
    expect(cfg.port).toBe(6334);
    expect(cfg.apiKey).toBe("secret-key");
    expect(cfg.collection).toBe("my_memory");
    expect(cfg.embeddingModel).toBe("voyage/voyage-3");
  });

  test("string port is coerced; whitespace-only apiKey is treated as missing", () => {
    const cfg = normalizeQdrantConfig({
      qdrantEnabled: true,
      qdrantHost: "host",
      qdrantPort: "6335",
      qdrantApiKey: "   ",
    });
    expect(cfg.port).toBe(6335);
    expect(cfg.apiKey).toBeNull();
  });

  test("falsy / non-true qdrantEnabled values leave the config disabled", () => {
    for (const value of [undefined, null, 0, "", "true", 1]) {
      const cfg = normalizeQdrantConfig({
        qdrantEnabled: value as unknown,
        qdrantHost: "host",
      });
      expect(cfg.enabled).toBe(false);
    }
  });
});
