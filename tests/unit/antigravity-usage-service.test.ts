/**
 * Tests for open-sse/services/usage.ts — Antigravity quota parsing.
 *
 * Verifies that remainingFraction is correctly parsed:
 * - undefined → 0% remaining (exhausted quota)
 * - 0 → 0% remaining (exhausted quota, explicit)
 * - 1.0 → 100% remaining (full quota)
 * - 1.0 without resetTime → unlimited (tab-completion models)
 * - 0.5 → 50% remaining (partial quota)
 */

import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("getUsageForProvider (antigravity in usage.ts)", () => {
  const connectionBase = {
    id: "test-conn",
    provider: "antigravity",
    accessToken: "fake-token",
    providerSpecificData: {},
    projectId: undefined,
  };

  it("defaults to 0% remaining when remainingFraction is undefined", async () => {
    const usageModule = await import("../../open-sse/services/usage.ts");
    const { getUsageForProvider } = usageModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: undefined,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remainingPercentage, 0, "remaining should be 0%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
        assert.equal(quota.used > 0, true, "used should be > 0 when quota is exhausted");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=0 as exhausted quota", async () => {
    const usageModule = await import("../../open-sse/services/usage.ts");
    const { getUsageForProvider } = usageModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: 0,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remainingPercentage, 0, "remaining should be 0%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=1.0 with resetTime as full quota", async () => {
    const usageModule = await import("../../open-sse/services/usage.ts");
    const { getUsageForProvider } = usageModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: 1.0,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remainingPercentage, 100, "remaining should be 100%");
        assert.equal(quota.unlimited, false, "should not be unlimited (has resetTime)");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=1.0 without resetTime as unlimited", async () => {
    const usageModule = await import("../../open-sse/services/usage.ts");
    const { getUsageForProvider } = usageModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "tab-completion-model": {
            quotaInfo: {
              remainingFraction: 1.0,
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["tab-completion-model"];
        assert.ok(quota, "should have quota for tab-completion-model");
        assert.equal(quota.remainingPercentage, 100, "remaining should be 100%");
        assert.equal(quota.unlimited, true, "should be unlimited (no resetTime)");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=0.5 as partial quota", async () => {
    const usageModule = await import("../../open-sse/services/usage.ts");
    const { getUsageForProvider } = usageModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: 0.5,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remainingPercentage, 50, "remaining should be 50%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });
});
