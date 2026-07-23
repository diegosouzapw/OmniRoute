/**
 * Vision Bridge Auto-Router Tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
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
  });

  describe("getBestVisionModel", () => {
    it("should return a vision-capable model", () => {
      const model = getBestVisionModel();
      expect(model).toBeTruthy();
      expect(typeof model).toBe("string");
    });

    it("should respect fixed model override", () => {
      const fixedModel = "openai/gpt-4o-mini";
      const model = getBestVisionModel({ fixedModel });
      expect(model).toBe(fixedModel);
    });

    it("should exclude specified models", () => {
      const model = getBestVisionModel({
        excludedModels: ["openai/gpt-4o-mini", "openai/gpt-4o"],
      });
      expect(model).not.toBe("openai/gpt-4o-mini");
      expect(model).not.toBe("openai/gpt-4o");
    });
  });

  describe("getFallbackModels", () => {
    it("should return fallback models excluding the primary", () => {
      const primary = "openai/gpt-4o-mini";
      const fallbacks = getFallbackModels(primary);
      expect(fallbacks).not.toContain(primary);
      expect(fallbacks.length).toBeGreaterThan(0);
    });

    it("should respect max fallback attempts", () => {
      const fallbacks = getFallbackModels("openai/gpt-4o-mini", {
        maxFallbackAttempts: 2,
      });
      expect(fallbacks.length).toBeLessThanOrEqual(2);
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
