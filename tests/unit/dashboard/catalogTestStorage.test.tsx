import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  CATALOG_TEST_RESULTS_KEY,
  classifyError,
  clearCatalogTestResults,
  getComboTestKey,
  getModelTestKey,
  loadCatalogTestResults,
  MAX_TEST_RESULTS_CAP,
  normalizeTestStatus,
  saveBatchTestResults,
  saveCatalogTestResults,
  saveSingleTestResult,
  type CatalogTestResult,
} from "@/app/(dashboard)/dashboard/models/catalogTestStorage";

describe("catalogTestStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("loads empty results when localStorage is empty", () => {
    const results = loadCatalogTestResults();
    expect(results).toEqual({});
  });

  it("handles corrupt JSON in localStorage gracefully without throwing", () => {
    localStorage.setItem(CATALOG_TEST_RESULTS_KEY, "this is not valid json {{{");
    const results = loadCatalogTestResults();
    expect(results).toEqual({});
  });

  it("handles non-object JSON gracefully", () => {
    localStorage.setItem(CATALOG_TEST_RESULTS_KEY, JSON.stringify(["item1", "item2"]));
    const results = loadCatalogTestResults();
    expect(results).toEqual({});
  });

  it("saves and loads single and batch test results", () => {
    const modelResult: CatalogTestResult = {
      id: getModelTestKey("alpha", "chat-1"),
      targetType: "model",
      providerId: "alpha",
      modelId: "chat-1",
      status: "ok",
      latencyMs: 250,
      testedAt: 1000,
    };

    saveSingleTestResult(modelResult);
    let loaded = loadCatalogTestResults();
    expect(loaded[modelResult.id]).toEqual(modelResult);

    const comboResult: CatalogTestResult = {
      id: getComboTestKey("fast-combo"),
      targetType: "combo",
      comboName: "fast-combo",
      status: "slow",
      latencyMs: 5100,
      testedAt: 2000,
    };

    saveBatchTestResults([comboResult]);
    loaded = loadCatalogTestResults();
    expect(loaded[modelResult.id]).toEqual(modelResult);
    expect(loaded[comboResult.id]).toEqual(comboResult);
  });

  it("clears test results from localStorage", () => {
    const modelResult: CatalogTestResult = {
      id: getModelTestKey("alpha", "chat-1"),
      targetType: "model",
      providerId: "alpha",
      modelId: "chat-1",
      status: "ok",
      latencyMs: 150,
      testedAt: 1000,
    };

    saveSingleTestResult(modelResult);
    expect(loadCatalogTestResults()[modelResult.id]).toBeDefined();

    clearCatalogTestResults();
    expect(loadCatalogTestResults()).toEqual({});
    expect(localStorage.getItem(CATALOG_TEST_RESULTS_KEY)).toBeNull();
  });

  it("caps results to MAX_TEST_RESULTS_CAP by dropping the oldest entries", () => {
    const entries: Record<string, CatalogTestResult> = {};
    const totalEntries = MAX_TEST_RESULTS_CAP + 10;

    for (let index = 0; index < totalEntries; index++) {
      const id = `model:provider:${index}`;
      entries[id] = {
        id,
        targetType: "model",
        providerId: "provider",
        modelId: String(index),
        status: "ok",
        latencyMs: 100,
        testedAt: index * 10,
      };
    }

    saveCatalogTestResults(entries);
    const loaded = loadCatalogTestResults();
    const loadedKeys = Object.keys(loaded);
    expect(loadedKeys.length).toBe(MAX_TEST_RESULTS_CAP);

    // Oldest items (index 0 to 9) should have been pruned
    expect(loaded["model:provider:0"]).toBeUndefined();
    expect(loaded["model:provider:9"]).toBeUndefined();
    // Newest items should be kept
    expect(loaded[`model:provider:${totalEntries - 1}`]).toBeDefined();
  });

  describe("classifyError", () => {
    it("classifies rate limit errors", () => {
      expect(classifyError("Rate limit exceeded", 429)).toBe("rate-limited");
      expect(classifyError(undefined, 429)).toBe("rate-limited");
      expect(classifyError("too many requests", 500, { rateLimited: true })).toBe("rate-limited");
      expect(classifyError("Rate limit reached for requests per minute")).toBe("rate-limited");
    });

    it("classifies quota errors", () => {
      expect(classifyError("Insufficient balance or quota", 403)).toBe("quota");
      expect(classifyError("credit limit reached", 400, { isQuota: true })).toBe("quota");
      expect(classifyError(undefined, 403, { isQuota: true })).toBe("quota");
    });

    it("classifies timeout errors", () => {
      expect(classifyError("Gateway Timeout", 504)).toBe("timeout");
      expect(classifyError("Request timed out", 408)).toBe("timeout");
      expect(classifyError("Connection timed out", 500, { isTimeout: true })).toBe("timeout");
    });

    it("classifies other errors as other", () => {
      expect(classifyError("Internal Server Error", 500)).toBe("other");
      expect(classifyError("Invalid authorization token", 401)).toBe("other");
    });

    it("returns undefined when no error is present", () => {
      expect(classifyError()).toBeUndefined();
    });
  });

  describe("normalizeTestStatus", () => {
    it("returns ok for ok status with reasonable latency", () => {
      expect(normalizeTestStatus("ok", 300)).toBe("ok");
    });

    it("returns slow if status is ok but latency is >= 5000ms", () => {
      expect(normalizeTestStatus("ok", 5000)).toBe("slow");
      expect(normalizeTestStatus("ok", 7500)).toBe("slow");
    });

    it("returns slow if status is slow", () => {
      expect(normalizeTestStatus("slow", 1000)).toBe("slow");
    });

    it("returns error for failed statuses", () => {
      expect(normalizeTestStatus("error")).toBe("error");
      expect(normalizeTestStatus("rate_limited")).toBe("error");
      expect(normalizeTestStatus("unknown")).toBe("error");
    });
  });
});
