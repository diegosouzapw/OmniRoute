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

import { describe, test, expect, beforeAll, afterEach } from "vitest";
import {
  normalizeQdrantConfig,
  buildQuantizationConfig,
  searchQuantizationParams,
} from "../qdrant";

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
    expect(cfg.vectorSize).toBe(1536);
    expect(cfg.hnswEfConstruct).toBe(128);
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

describe("Qdrant scalar quantization wiring (Q1 / F4.4)", () => {
  test("defaults quantization to 'none' when the setting is missing", () => {
    expect(normalizeQdrantConfig({}).quantization).toBe("none");
  });

  test("reads valid int8 / binary modes; invalid or non-string values fall back to none", () => {
    expect(normalizeQdrantConfig({ qdrantQuantization: "int8" }).quantization).toBe("int8");
    expect(normalizeQdrantConfig({ qdrantQuantization: "binary" }).quantization).toBe("binary");
    expect(normalizeQdrantConfig({ qdrantQuantization: "none" }).quantization).toBe("none");
    expect(normalizeQdrantConfig({ qdrantQuantization: "bogus" }).quantization).toBe("none");
    expect(normalizeQdrantConfig({ qdrantQuantization: 5 as unknown }).quantization).toBe("none");
  });

  test("buildQuantizationConfig: none → undefined (body unchanged), int8 → scalar, binary → binary", () => {
    // none must stay undefined so the create body is byte-identical to today (no behavioral change).
    expect(buildQuantizationConfig("none")).toBeUndefined();
    expect(buildQuantizationConfig("int8")).toEqual({
      scalar: { type: "int8", always_ram: true, quantile: 0.99 },
    });
    expect(buildQuantizationConfig("binary")).toEqual({ binary: { always_ram: true } });
  });

  test("searchQuantizationParams: rescore enabled only for a quantized collection", () => {
    expect(searchQuantizationParams("none")).toBeUndefined();
    expect(searchQuantizationParams("int8")).toEqual({ quantization: { rescore: true } });
    expect(searchQuantizationParams("binary")).toEqual({ quantization: { rescore: true } });
  });
});

describe("normalizeQdrantConfig — env-var fallbacks (cluster profile: --profile memory)", () => {
  const KEYS = [
    "QDRANT_HOST",
    "QDRANT_PORT",
    "QDRANT_API_KEY",
    "QDRANT_COLLECTION",
  ] as const;
  const savedEnv: Record<string, string | undefined> = {};

  beforeAll(() => {
    for (const k of KEYS) savedEnv[k] = process.env[k];
  });

  afterEach(() => {
    for (const k of KEYS) {
      if (savedEnv[k] === undefined) delete process.env[k];
      else process.env[k] = savedEnv[k];
    }
  });

  test("settings.qdrantHost takes precedence over QDRANT_HOST env", () => {
    process.env.QDRANT_HOST = "env-host";
    const cfg = normalizeQdrantConfig({ qdrantHost: "settings-host" });
    expect(cfg.host).toBe("settings-host");
  });

  test("QDRANT_HOST fills host when settings.qdrantHost is missing", () => {
    process.env.QDRANT_HOST = "qdrant";
    const cfg = normalizeQdrantConfig({});
    expect(cfg.host).toBe("qdrant");
  });

  test("QDRANT_PORT is parsed when no port in settings", () => {
    process.env.QDRANT_PORT = "6334";
    const cfg = normalizeQdrantConfig({});
    expect(cfg.port).toBe(6334);
  });

  test("QDRANT_API_KEY is read when settings.qdrantApiKey is whitespace", () => {
    process.env.QDRANT_API_KEY = "secret";
    const cfg = normalizeQdrantConfig({ qdrantApiKey: "   " });
    expect(cfg.apiKey).toBe("secret");
  });

  test("QDRANT_COLLECTION falls back to env when default would otherwise be used", () => {
    process.env.QDRANT_COLLECTION = "external-mem";
    const cfg = normalizeQdrantConfig({});
    expect(cfg.collection).toBe("external-mem");
  });

  test("all 4 env vars consumed correctly together", () => {
    process.env.QDRANT_HOST = "qdrant.example.com";
    process.env.QDRANT_PORT = "7777";
    process.env.QDRANT_API_KEY = "env-key";
    process.env.QDRANT_COLLECTION = "env-coll";
    process.env.QDRANT_VECTOR_SIZE = "768";
    process.env.QDRANT_HNSW_EF_CONSTRUCT = "256";
    const cfg = normalizeQdrantConfig({});
    expect(cfg.host).toBe("qdrant.example.com");
    expect(cfg.port).toBe(7777);
    expect(cfg.apiKey).toBe("env-key");
    expect(cfg.collection).toBe("env-coll");
    expect(cfg.vectorSize).toBe(768);
    expect(cfg.hnswEfConstruct).toBe(256);
  });

  test("settings.qdrantVectorSize / hnswEfConstruct take precedence over env", () => {
    process.env.QDRANT_VECTOR_SIZE = "768";
    process.env.QDRANT_HNSW_EF_CONSTRUCT = "256";
    const cfg = normalizeQdrantConfig({
      qdrantVectorSize: 1024,
      qdrantHnswEfConstruct: 200,
    });
    expect(cfg.vectorSize).toBe(1024);
    expect(cfg.hnswEfConstruct).toBe(200);
  });

  test("invalid QDRANT_VECTOR_SIZE / HNSW_EF_CONSTRUCT fall back to defaults", () => {
    process.env.QDRANT_VECTOR_SIZE = "not-a-number";
    process.env.QDRANT_HNSW_EF_CONSTRUCT = "0";
    const cfg = normalizeQdrantConfig({});
    expect(cfg.vectorSize).toBe(1536);
    expect(cfg.hnswEfConstruct).toBe(128);
  });
});
