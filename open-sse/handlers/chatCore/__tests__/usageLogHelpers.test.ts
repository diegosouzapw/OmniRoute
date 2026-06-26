import { describe, it, expect } from "vitest";
import {
  toPositiveNumber,
  buildCacheUsageLogMeta,
  attachLogMeta,
  buildExecutorClientHeaders,
} from "../usageLogHelpers";

describe("toPositiveNumber", () => {
  it("returns positive number as-is", () => {
    expect(toPositiveNumber(42)).toBe(42);
    expect(toPositiveNumber(0.5)).toBe(0.5);
  });
  it("returns 0 for zero", () => {
    expect(toPositiveNumber(0)).toBe(0);
  });
  it("returns 0 for negative", () => {
    expect(toPositiveNumber(-1)).toBe(0);
    expect(toPositiveNumber(-Infinity)).toBe(0);
  });
  it("returns 0 for NaN", () => {
    expect(toPositiveNumber(NaN)).toBe(0);
  });
  it("returns 0 for Infinity", () => {
    expect(toPositiveNumber(Infinity)).toBe(0);
  });
  it("returns 0 for strings", () => {
    expect(toPositiveNumber("42" as unknown as number)).toBe(0);
  });
  it("returns 0 for null/undefined", () => {
    expect(toPositiveNumber(null as unknown as number)).toBe(0);
    expect(toPositiveNumber(undefined as unknown as number)).toBe(0);
  });
  it("returns 0 for objects/arrays/booleans", () => {
    expect(toPositiveNumber({} as unknown as number)).toBe(0);
    expect(toPositiveNumber([1] as unknown as number)).toBe(0);
    expect(toPositiveNumber(true as unknown as number)).toBe(0);
  });
});

describe("buildCacheUsageLogMeta", () => {
  it("returns null for null/undefined", () => {
    expect(buildCacheUsageLogMeta(null)).toBeNull();
    expect(buildCacheUsageLogMeta(undefined)).toBeNull();
  });
  it("returns null for non-object", () => {
    expect(buildCacheUsageLogMeta("x" as unknown as Record<string, unknown>)).toBeNull();
  });
  it("returns null when no cache fields", () => {
    expect(buildCacheUsageLogMeta({ prompt_tokens: 100 })).toBeNull();
    expect(buildCacheUsageLogMeta({})).toBeNull();
  });
  it("extracts Anthropic cache_read + creation", () => {
    expect(
      buildCacheUsageLogMeta({
        cache_read_input_tokens: 500,
        cache_creation_input_tokens: 100,
      })
    ).toEqual({ cacheReadTokens: 500, cacheCreationTokens: 100 });
  });
  it("extracts Anthropic cache_read only", () => {
    expect(buildCacheUsageLogMeta({ cache_read_input_tokens: 300 })).toEqual({
      cacheReadTokens: 300,
      cacheCreationTokens: 0,
    });
  });
  it("extracts Gemini cachedTokens", () => {
    expect(buildCacheUsageLogMeta({ cachedTokens: 750 })).toEqual({
      cacheReadTokens: 750,
      cacheCreationTokens: 0,
    });
  });
  it("extracts OpenAI prompt_tokens_details cached", () => {
    expect(
      buildCacheUsageLogMeta({
        prompt_tokens_details: { cached_tokens: 400 },
      })
    ).toEqual({ cacheReadTokens: 400, cacheCreationTokens: 0 });
  });
  it("treats invalid cache values as 0", () => {
    expect(
      buildCacheUsageLogMeta({
        cache_read_input_tokens: "abc",
        cache_creation_input_tokens: -5,
      })
    ).toEqual({ cacheReadTokens: 0, cacheCreationTokens: 0 });
  });
});

describe("attachLogMeta", () => {
  it("returns target when usage is null/undefined", () => {
    const target = { existing: 1 };
    expect(attachLogMeta(target, null)).toBe(target);
    expect(attachLogMeta(target, undefined)).toBe(target);
  });
  it("returns target when usage is not an object", () => {
    const target = { existing: 1 };
    expect(attachLogMeta(target, "x" as unknown as Record<string, unknown>)).toBe(target);
  });
  it("copies standard prompt/completion/total tokens", () => {
    const target: Record<string, unknown> = {};
    attachLogMeta(target, {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30,
    });
    expect(target.promptTokens).toBe(10);
    expect(target.completionTokens).toBe(20);
    expect(target.totalTokens).toBe(30);
  });
  it("copies reasoning_tokens under completionDetails", () => {
    const target: Record<string, unknown> = {};
    attachLogMeta(target, {
      completion_tokens_details: { reasoning_tokens: 7 },
    });
    expect(target.completionTokensDetails).toEqual({ reasoningTokens: 7 });
  });
  it("attaches cache meta when present", () => {
    const target: Record<string, unknown> = {};
    attachLogMeta(target, { cache_read_input_tokens: 100 });
    expect(target.cacheReadTokens).toBe(100);
    expect(target.cacheCreationTokens).toBe(0);
  });
  it("does not set undefined keys on target", () => {
    const target: Record<string, unknown> = {};
    attachLogMeta(target, { unrelated: true });
    expect(Object.keys(target)).toHaveLength(0);
  });
});

describe("buildExecutorClientHeaders", () => {
  it("merges client headers on top of base headers", () => {
    const result = buildExecutorClientHeaders({ "x-base": "1" }, { "x-client": "2" });
    expect(result["x-base"]).toBe("1");
    expect(result["x-client"]).toBe("2");
  });
  it("client headers override base headers", () => {
    const result = buildExecutorClientHeaders({ "x-key": "base" }, { "x-key": "client" });
    expect(result["x-key"]).toBe("client");
  });
  it("returns base headers when client is null/undefined", () => {
    expect(buildExecutorClientHeaders({ "x-a": "1" }, null)).toEqual({ "x-a": "1" });
    expect(buildExecutorClientHeaders({ "x-a": "1" }, undefined)).toEqual({ "x-a": "1" });
  });
  it("returns client headers when base is null/undefined", () => {
    expect(buildExecutorClientHeaders(null, { "x-a": "1" })).toEqual({ "x-a": "1" });
    expect(buildExecutorClientHeaders(undefined, { "x-a": "1" })).toEqual({ "x-a": "1" });
  });
  it("returns empty object when both null", () => {
    expect(buildExecutorClientHeaders(null, null)).toEqual({});
  });
  it("lowercases header keys", () => {
    const result = buildExecutorClientHeaders({ "X-Upper": "v" }, { "Y-Upper": "w" });
    expect(result["x-upper"]).toBe("v");
    expect(result["y-upper"]).toBe("w");
  });
});
