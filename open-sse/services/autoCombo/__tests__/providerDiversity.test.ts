import { describe, it, beforeEach, expect } from "vitest";
import {
  recordProviderUsage,
  calculateDiversityScore,
  getProviderDiversityBoost,
  getDiversityReport,
  resetDiversity,
  configureDiversity,
} from "../providerDiversity";

describe("providerDiversity", () => {
  beforeEach(() => {
    resetDiversity();
  });

  describe("calculateDiversityScore", () => {
    it("returns 1.0 when no data is recorded", () => {
      expect(calculateDiversityScore()).toBe(1.0);
    });

    it("returns 0.0 when all requests go to one provider", () => {
      for (let i = 0; i < 20; i++) {
        recordProviderUsage("claude");
      }
      expect(calculateDiversityScore()).toBe(0.0);
    });

    it("returns 1.0 for perfectly even distribution across 2 providers", () => {
      for (let i = 0; i < 10; i++) {
        recordProviderUsage("claude");
        recordProviderUsage("openai");
      }
      expect(calculateDiversityScore()).toBe(1.0);
    });

    it("returns value between 0 and 1 for uneven distribution", () => {
      for (let i = 0; i < 15; i++) recordProviderUsage("claude");
      for (let i = 0; i < 5; i++) recordProviderUsage("openai");

      const score = calculateDiversityScore();
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThan(1);
    });

    it("higher entropy with more providers", () => {
      // 2 providers
      resetDiversity();
      for (let i = 0; i < 10; i++) {
        recordProviderUsage("claude");
        recordProviderUsage("openai");
      }
      const score2 = calculateDiversityScore();

      // 4 providers (same total requests)
      resetDiversity();
      for (let i = 0; i < 5; i++) {
        recordProviderUsage("claude");
        recordProviderUsage("openai");
        recordProviderUsage("google");
        recordProviderUsage("together");
      }
      const score4 = calculateDiversityScore();

      // Both should be 1.0 (perfectly distributed within their pool)
      expect(score2).toBe(1.0);
      expect(score4).toBe(1.0);
    });
  });

  describe("getProviderDiversityBoost", () => {
    it("returns 0.5 when no data is recorded", () => {
      expect(getProviderDiversityBoost("claude")).toBe(0.5);
    });

    it("returns low boost for heavily used provider", () => {
      for (let i = 0; i < 18; i++) recordProviderUsage("claude");
      for (let i = 0; i < 2; i++) recordProviderUsage("openai");

      const claudeBoost = getProviderDiversityBoost("claude");
      const openaiBoost = getProviderDiversityBoost("openai");

      expect(claudeBoost).toBeLessThan(openaiBoost);
      expect(claudeBoost).toBeLessThan(0.2);
      expect(openaiBoost).toBeGreaterThan(0.8);
    });

    it("returns 1.0 for never-used provider", () => {
      for (let i = 0; i < 10; i++) recordProviderUsage("claude");

      const boost = getProviderDiversityBoost("google");
      expect(boost).toBe(1.0);
    });
  });

  describe("getDiversityReport", () => {
    it("returns structured report", () => {
      recordProviderUsage("claude");
      recordProviderUsage("claude");
      recordProviderUsage("openai");

      const report = getDiversityReport();

      expect(report.totalRequests).toBe(3);
      expect(report.score).toBeGreaterThan(0);
      expect(report.score).toBeLessThan(1);
      expect(report.providers["claude"].count).toBe(2);
      expect(report.providers["openai"].count).toBe(1);
      expect(Math.abs(report.providers["claude"].share - 2 / 3)).toBeLessThan(0.01);
    });
  });

  describe("window management", () => {
    it("respects windowSize limit", () => {
      configureDiversity({ windowSize: 10, ttlMs: 3_600_000 });

      for (let i = 0; i < 20; i++) {
        recordProviderUsage("claude");
      }

      const report = getDiversityReport();
      expect(report.totalRequests).toBeLessThanOrEqual(10);
    });
  });
});
