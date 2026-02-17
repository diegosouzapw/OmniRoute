/**
 * Batch A — Domain Layer + Infrastructure Tests
 *
 * Tests for: modelAvailability, costRules, fallbackPolicy,
 * errorCodes, requestId, fetchTimeout
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// ──────────────── T-19: Model Availability ────────────────

import {
  isModelAvailable,
  setModelUnavailable,
  clearModelUnavailability,
  getAvailabilityReport,
  getUnavailableCount,
  resetAllAvailability,
} from "../../src/domain/modelAvailability.ts";

describe("modelAvailability", () => {
  before(() => resetAllAvailability());
  after(() => resetAllAvailability());

  it("should report model as available by default", () => {
    assert.equal(isModelAvailable("openai", "gpt-4o"), true);
  });

  it("should mark model as unavailable", () => {
    setModelUnavailable("openai", "gpt-4o", 60000, "rate limited");
    assert.equal(isModelAvailable("openai", "gpt-4o"), false);
  });

  it("should report unavailable models", () => {
    const report = getAvailabilityReport();
    assert.equal(report.length, 1);
    assert.equal(report[0].provider, "openai");
    assert.equal(report[0].model, "gpt-4o");
    assert.equal(report[0].reason, "rate limited");
    assert.ok(report[0].remainingMs > 0);
  });

  it("should count unavailable models", () => {
    assert.equal(getUnavailableCount(), 1);
  });

  it("should clear model unavailability", () => {
    clearModelUnavailability("openai", "gpt-4o");
    assert.equal(isModelAvailable("openai", "gpt-4o"), true);
    assert.equal(getUnavailableCount(), 0);
  });

  it("should auto-expire after cooldown", () => {
    setModelUnavailable("anthropic", "claude-sonnet-4-20250514", 1, "test");
    // Wait 2ms for expiry
    const start = Date.now();
    while (Date.now() - start < 5) {} // spin wait
    assert.equal(isModelAvailable("anthropic", "claude-sonnet-4-20250514"), true);
  });
});

// ──────────────── T-19: Cost Rules ────────────────

import {
  setBudget,
  getBudget,
  recordCost,
  checkBudget,
  getDailyTotal,
  getCostSummary,
  resetCostData,
} from "../../src/domain/costRules.ts";

describe("costRules", () => {
  before(() => resetCostData());
  after(() => resetCostData());

  it("should allow when no budget set", () => {
    const result = checkBudget("key-1");
    assert.equal(result.allowed, true);
  });

  it("should set and get budget", () => {
    setBudget("key-1", { dailyLimitUsd: 10.0, warningThreshold: 0.8 });
    const budget = getBudget("key-1");
    assert.equal(budget.dailyLimitUsd, 10.0);
    assert.equal(budget.warningThreshold, 0.8);
  });

  it("should record costs and check budget", () => {
    recordCost("key-1", 5.0);
    const result = checkBudget("key-1");
    assert.equal(result.allowed, true);
    assert.equal(result.dailyUsed, 5.0);
  });

  it("should detect warning threshold", () => {
    recordCost("key-1", 4.0); // total = 9.0 / 10.0 = 90% > 80%
    const result = checkBudget("key-1");
    assert.equal(result.allowed, true);
    assert.equal(result.warningReached, true);
  });

  it("should block when budget exceeded", () => {
    const result = checkBudget("key-1", 2.0); // 9.0 + 2.0 = 11.0 > 10.0
    assert.equal(result.allowed, false);
    assert.ok(result.reason.includes("exceeded"));
  });

  it("should get cost summary", () => {
    const summary = getCostSummary("key-1");
    assert.ok(summary.dailyTotal >= 9.0);
    assert.equal(summary.totalEntries, 2);
  });
});

// ──────────────── T-19: Fallback Policy ────────────────

import {
  registerFallback,
  resolveFallbackChain,
  getNextFallback,
  hasFallback,
  removeFallback,
  getAllFallbackChains,
  resetAllFallbacks,
} from "../../src/domain/fallbackPolicy.ts";

describe("fallbackPolicy", () => {
  before(() => resetAllFallbacks());
  after(() => resetAllFallbacks());

  it("should return empty chain for unknown model", () => {
    assert.deepEqual(resolveFallbackChain("unknown"), []);
    assert.equal(hasFallback("unknown"), false);
  });

  it("should register fallback chain sorted by priority", () => {
    registerFallback("gpt-4o", [
      { provider: "azure", priority: 2 },
      { provider: "openai", priority: 0 },
      { provider: "github", priority: 1 },
    ]);
    const chain = resolveFallbackChain("gpt-4o");
    assert.equal(chain[0].provider, "openai");
    assert.equal(chain[1].provider, "github");
    assert.equal(chain[2].provider, "azure");
  });

  it("should exclude specified providers", () => {
    const chain = resolveFallbackChain("gpt-4o", ["openai"]);
    assert.equal(chain.length, 2);
    assert.equal(chain[0].provider, "github");
  });

  it("should get next fallback", () => {
    assert.equal(getNextFallback("gpt-4o"), "openai");
    assert.equal(getNextFallback("gpt-4o", ["openai"]), "github");
    assert.equal(getNextFallback("gpt-4o", ["openai", "github", "azure"]), null);
  });

  it("should respect enabled flag", () => {
    registerFallback("test-model", [
      { provider: "a", enabled: false },
      { provider: "b", enabled: true },
    ]);
    const chain = resolveFallbackChain("test-model");
    assert.equal(chain.length, 1);
    assert.equal(chain[0].provider, "b");
  });

  it("should remove fallback chain", () => {
    removeFallback("test-model");
    assert.equal(hasFallback("test-model"), false);
  });

  it("should list all chains", () => {
    const all = getAllFallbackChains();
    assert.ok("gpt-4o" in all);
  });
});

// ──────────────── T-22: Error Codes ────────────────

import {
  ERROR_CODES,
  createErrorResponse,
  getErrorsByCategory,
} from "../../src/shared/constants/errorCodes.ts";

describe("errorCodes", () => {
  it("should have at least 20 error codes", () => {
    assert.ok(Object.keys(ERROR_CODES).length >= 20);
  });

  it("should create error response for known code", () => {
    const res = createErrorResponse("AUTH_001", { detail: "missing token" });
    assert.equal(res.error.code, "AUTH_001");
    assert.equal(res.error.message, "Authentication required");
    assert.equal(res.status, 401);
    assert.equal(res.error.detail, "missing token");
  });

  it("should create error response with requestId", () => {
    const res = createErrorResponse("PROXY_002", { requestId: "abc-123" });
    assert.equal(res.error.requestId, "abc-123");
    assert.equal(res.status, 504);
  });

  it("should handle unknown code gracefully", () => {
    const res = createErrorResponse("UNKNOWN_999");
    assert.equal(res.status, 500);
    assert.ok(res.error.message.includes("Unknown"));
  });

  it("should filter by category", () => {
    const authErrors = getErrorsByCategory("AUTH");
    assert.ok(authErrors.length >= 4);
    assert.ok(authErrors.every((e) => e.category === "AUTH"));
  });
});

// ──────────────── T-23: Request ID ────────────────

import {
  getRequestId,
  withRequestId,
  addRequestIdHeader,
  generateRequestId,
} from "../../src/shared/utils/requestId.ts";

describe("requestId", () => {
  it("should return null outside context", () => {
    assert.equal(getRequestId(), null);
  });

  it("should generate UUID format", () => {
    const id = generateRequestId();
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("should propagate request ID through context", async () => {
    const mockRequest = { headers: { get: (h) => (h === "x-request-id" ? "test-id-123" : null) } };
    let captured = null;
    await withRequestId(mockRequest, () => {
      captured = getRequestId();
    });
    assert.equal(captured, "test-id-123");
  });

  it("should generate new ID when none provided", async () => {
    const mockRequest = { headers: { get: () => null } };
    let captured = null;
    await withRequestId(mockRequest, () => {
      captured = getRequestId();
    });
    assert.ok(captured);
    assert.match(captured, /^[0-9a-f-]{36}$/);
  });

  it("should add request ID to headers", async () => {
    const mockRequest = { headers: { get: (h) => (h === "x-request-id" ? "header-id" : null) } };
    await withRequestId(mockRequest, () => {
      const headers = addRequestIdHeader({ "content-type": "application/json" });
      assert.equal(headers["x-request-id"], "header-id");
      assert.equal(headers["content-type"], "application/json");
    });
  });
});

// ──────────────── T-25: Fetch Timeout ────────────────

import { getConfiguredTimeout, FetchTimeoutError } from "../../src/shared/utils/fetchTimeout.ts";

describe("fetchTimeout", () => {
  it("should have default timeout of 120000ms", () => {
    assert.equal(getConfiguredTimeout(), 120000);
  });

  it("should export FetchTimeoutError", () => {
    const err = new FetchTimeoutError("test", 5000, "http://test.com");
    assert.equal(err.name, "FetchTimeoutError");
    assert.equal(err.timeoutMs, 5000);
    assert.equal(err.url, "http://test.com");
    assert.ok(err instanceof Error);
  });
});
