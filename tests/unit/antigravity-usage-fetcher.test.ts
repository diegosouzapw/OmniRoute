/**
 * Tests for src/lib/usage/fetcher.ts — Antigravity quota parsing.
 *
 * Verifies that remainingFraction is correctly parsed:
 * - undefined → 0% remaining (exhausted quota)
 * - 0 → 0% remaining (exhausted quota, explicit)
 * - 1.0 → 100% remaining (full quota)
 * - 0.5 → 50% remaining (partial quota)
 */

import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("getUsageForProvider (antigravity in fetcher.ts)", () => {
  const connectionBase = {
    provider: "antigravity",
    accessToken: "fake-token",
    providerSpecificData: {},
    projectId: undefined,
    id: "test-conn",
  };

  it("defaults to 0% remaining when remainingFraction is undefined", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

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

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 0, "remaining should be 0%");
        assert.equal(quota.limited, true, "should be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("defaults to 0% remaining when remainingFraction key is absent (exhausted quota)", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              // remainingFraction key is omitted (exhausted quota)
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 0, "remaining should be 0% when key is absent");
        assert.equal(quota.limited, true, "should be marked as limited");
        assert.equal(quota.resetAt, "2026-05-26T00:00:00Z", "should preserve resetTime");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=0 as exhausted quota", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

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

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 0, "remaining should be 0%");
        assert.equal(quota.limited, true, "should be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=1.0 with resetTime as full quota", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

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

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 100, "remaining should be 100%");
        assert.equal(quota.limited, false, "should not be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("parses remainingFraction=0.5 as partial quota", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

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

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 50, "remaining should be 50%");
        assert.equal(quota.limited, false, "should not be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("skips credit-based models without remainingFraction", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {},
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");

      if ("modelQuotas" in result) {
        assert.equal(
          Object.keys(result.modelQuotas).length,
          0,
          "should not include credit-based models"
        );
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("clamps remainingFraction > 1 to 100%", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: 1.5,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 100, "remaining should be clamped to 100%");
        assert.equal(quota.limited, false, "should not be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });

  it("clamps negative remainingFraction to 0%", async () => {
    const fetcherModule = await import("../../src/lib/usage/fetcher.ts");
    const { getUsageForProvider } = fetcherModule;

    const mockFetch = mock.method(global, "fetch", async () => ({
      ok: true,
      json: async () => ({
        models: {
          "gemini-2.5-pro": {
            quotaInfo: {
              remainingFraction: -0.5,
              resetTime: "2026-05-26T00:00:00Z",
            },
          },
        },
      }),
    }));

    try {
      const result = await getUsageForProvider(connectionBase);
      assert.ok(result, "should return a result");

      if ("modelQuotas" in result) {
        const quota = result.modelQuotas["gemini-2.5-pro"];
        assert.ok(quota, "should have quota for gemini-2.5-pro");
        assert.equal(quota.remaining, 0, "remaining should be clamped to 0%");
        assert.equal(quota.limited, true, "should be marked as limited");
      }
    } finally {
      mockFetch.mock.restore();
    }
  });
});
