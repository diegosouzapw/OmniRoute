/**
 * Vision Bridge Auto-Router Tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

const { getProviderConnectionsMock } = vi.hoisted(() => ({
  getProviderConnectionsMock: vi.fn(),
}));

vi.mock("@/lib/db/providers", () => ({
  getProviderConnections: getProviderConnectionsMock,
}));

import {
  getBestVisionModel,
  getFallbackModels,
  recordLatency,
  clearSelectionCache,
  getLatencyStats,
} from "@/lib/guardrails/visionBridgeRouter";

describe("Vision Bridge Auto-Router", () => {
  beforeEach(() => {
    clearSelectionCache();
    // Default: credential store unreadable (indeterminate) — matches the
    // fail-open behavior used elsewhere so pre-existing tests keep passing.
    getProviderConnectionsMock.mockReset();
    getProviderConnectionsMock.mockRejectedValue(new Error("no db in this test"));
  });

  describe("getBestVisionModel", () => {
    it("should return a vision-capable model", async () => {
      const model = await getBestVisionModel();
      expect(model).toBeTruthy();
      expect(typeof model).toBe("string");
    });

    it("should respect fixed model override", async () => {
      const fixedModel = "openai/gpt-4o-mini";
      const model = await getBestVisionModel({ fixedModel });
      expect(model).toBe(fixedModel);
    });

    it("should exclude specified models", async () => {
      const model = await getBestVisionModel({
        excludedModels: ["openai/gpt-4o-mini", "openai/gpt-4o"],
      });
      expect(model).not.toBe("openai/gpt-4o-mini");
      expect(model).not.toBe("openai/gpt-4o");
    });

    it("excludes a candidate with no usable active connection", async () => {
      // Every provider has zero active connections -> hasUsableCredentialsForModel
      // resolves `false` for every candidate -> no candidate survives -> the
      // hardcoded last-resort default is returned instead of an unreachable pick.
      getProviderConnectionsMock.mockReset();
      getProviderConnectionsMock.mockResolvedValue([]);

      const model = await getBestVisionModel();
      expect(model).toBe("openai/gpt-4o-mini");
    });

    it("selects a credentialed candidate over an uncredentialed higher-priority one", async () => {
      getProviderConnectionsMock.mockReset();
      getProviderConnectionsMock.mockImplementation(async ({ provider }: { provider: string }) => {
        // openai (priority 50, would normally win) has no usable connection;
        // some other vision-capable provider does.
        if (provider === "openai") return [];
        return [{ authType: "apikey", apiKey: "sk-test", testStatus: "active" }];
      });

      const model = await getBestVisionModel();
      expect(model.startsWith("openai/")).toBe(false);
    });
  });

  describe("getFallbackModels", () => {
    it("should return fallback models excluding the primary", async () => {
      const primary = "openai/gpt-4o-mini";
      const fallbacks = await getFallbackModels(primary);
      expect(fallbacks).not.toContain(primary);
      expect(fallbacks.length).toBeGreaterThan(0);
    });

    it("should respect max fallback attempts", async () => {
      const fallbacks = await getFallbackModels("openai/gpt-4o-mini", {
        maxFallbackAttempts: 2,
      });
      expect(fallbacks.length).toBeLessThanOrEqual(2);
    });

    it("does not include candidates with a confirmed-unusable connection", async () => {
      getProviderConnectionsMock.mockReset();
      getProviderConnectionsMock.mockImplementation(async ({ provider }: { provider: string }) => {
        if (provider === "anthropic") return [];
        return [{ authType: "apikey", apiKey: "sk-test", testStatus: "active" }];
      });

      const fallbacks = await getFallbackModels("openai/gpt-4o-mini");
      expect(fallbacks.some((m) => m.startsWith("anthropic/"))).toBe(false);
    });
  });

  describe("recordLatency", () => {
    it("should record latency measurements", () => {
      recordLatency("test-model", 100, true);
      recordLatency("test-model", 150, true);
      recordLatency("test-model", 200, false);

      const stats = getLatencyStats();
      expect(stats["test-model"]).toBeTruthy();
      expect(stats["test-model"].samples).toBe(3);
    });
  });

  describe("getLatencyStats", () => {
    it("should return latency statistics", () => {
      recordLatency("model-a", 100, true);
      recordLatency("model-a", 120, true);
      recordLatency("model-b", 200, true);

      const stats = getLatencyStats();
      expect(stats["model-a"]).toBeTruthy();
      expect(stats["model-b"]).toBeTruthy();
      expect(stats["model-a"].avg).toBe(110);
      expect(stats["model-a"].successRate).toBe(1);
    });
  });
});
