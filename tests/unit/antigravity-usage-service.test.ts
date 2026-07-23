/**
 * Tests for open-sse/services/usage.ts — Antigravity quota parsing.
 *
 * Verifies that remainingFraction is correctly parsed:
 * - undefined → 0% remaining (exhausted quota)
 * - 0 → 0% remaining (exhausted quota, explicit)
 * - 1.0 → 100% remaining (full quota)
 * - 1.0 without resetTime → unlimited (e.g. tab-completion)
 * - 0.5 → 50% remaining (partial quota)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// IMPORTANT: load usage.ts up-front so the proxyFetch patch in
// `open-sse/index.ts` (which runs at module evaluation) finishes BEFORE we
// install fetch mocks. Otherwise the first test races the patch and ends up
// hitting the real network instead of the mock.
const usageModule = await import("../../open-sse/services/usage.ts");
const { getUsageForProvider } = usageModule;

describe("getUsageForProvider (antigravity in usage.ts)", () => {
  const connectionBase = {
    id: "test-conn",
    provider: "antigravity",
    accessToken: "fake-token",
    providerSpecificData: {},
    projectId: undefined,
  };

  it("defaults to 0% remaining when remainingFraction is undefined", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: undefined,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 0, "remaining should be 0%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
        assert.equal(quota.used > 0, true, "used should be > 0 when quota is exhausted");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("parses remainingFraction=0 as exhausted quota", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: 0,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 0, "remaining should be 0%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("parses remainingFraction=1.0 with resetTime as full quota", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: 1.0,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 100, "remaining should be 100%");
        assert.equal(quota.unlimited, false, "should not be unlimited (has resetTime)");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("parses remainingFraction=1.0 without resetTime as unlimited (e.g. tab-completion)", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3.1-flash-lite": {
              quotaInfo: {
                remainingFraction: 1.0,
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3.1-flash-lite"];
        assert.ok(quota, "should have quota for gemini-3.1-flash-lite");
        assert.equal(quota.remainingPercentage, 100, "remaining should be 100%");
        assert.equal(quota.unlimited, true, "should be unlimited (no resetTime)");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("parses remainingFraction=0.5 as partial quota", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: 0.5,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 50, "remaining should be 50%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("clamps remainingFraction > 1 to 100%", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: 1.5,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 100, "remaining should be clamped to 100%");
        assert.equal(quota.unlimited, false, "should not be unlimited (has resetTime)");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("clamps negative remainingFraction to 0%", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          models: {
            "gemini-3-flash-agent": {
              quotaInfo: {
                remainingFraction: -0.5,
                resetTime: "2026-05-26T00:00:00Z",
              },
            },
          },
        }),
      }) as Response;

    try {
      const usageModule = await import("../../open-sse/services/usage.ts");
      const { getUsageForProvider } = usageModule;

      const result = await getUsageForProvider(connectionBase, { forceRefresh: true });
      assert.ok(result, "should return a result");
      assert.ok("quotas" in result, "should have quotas");

      if ("quotas" in result) {
        const quota = result.quotas["gemini-3-flash-agent"];
        assert.ok(quota, "should have quota for gemini-3-flash-agent");
        assert.equal(quota.remainingPercentage, 0, "remaining should be clamped to 0%");
        assert.equal(quota.unlimited, false, "should not be unlimited");
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
