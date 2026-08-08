import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  estimateAdmissionCost,
  DEFAULT_ADMISSION_COST_CONFIG,
  MAX_ADMISSION_COST_OR_LIMIT,
  normalizeRequestCost,
  resolveCostConfig,
  type AdmissionCostConfig,
  type AdmissionCostFeatures,
} from "../../open-sse/services/admission/index.ts";

function features(overrides: Partial<AdmissionCostFeatures> = {}): AdmissionCostFeatures {
  return {
    bodyBytes: 0,
    estimatedInputTokens: 0,
    messageCount: 0,
    toolCount: 0,
    requestedFanout: 1,
    streaming: true,
    ...overrides,
  };
}

describe("estimateAdmissionCost", () => {
  it("returns a positive integer at least the base cost", () => {
    const cost = estimateAdmissionCost(features());
    assert.equal(Number.isSafeInteger(cost), true);
    assert.ok(cost >= DEFAULT_ADMISSION_COST_CONFIG.baseCost);
    assert.ok(cost > 0);
  });

  it("is monotonic in body bytes, tokens, messages, tools, and fanout", () => {
    const base = estimateAdmissionCost(features());
    assert.ok(estimateAdmissionCost(features({ bodyBytes: 50_000 })) >= base);
    assert.ok(estimateAdmissionCost(features({ estimatedInputTokens: 8_000 })) >= base);
    assert.ok(estimateAdmissionCost(features({ messageCount: 40 })) >= base);
    assert.ok(estimateAdmissionCost(features({ toolCount: 20 })) >= base);
    assert.ok(estimateAdmissionCost(features({ requestedFanout: 8 })) >= base);
  });

  it("rejects fractional, infinite, and unsafe cost configuration", () => {
    for (const invalid of [0.5, Number.POSITIVE_INFINITY, Number.MAX_VALUE]) {
      assert.throws(
        () => resolveCostConfig({ bodyBytesPerUnit: invalid }),
        /positive safe integer/
      );
      assert.throws(() => resolveCostConfig({ maxRequestCost: invalid }), /positive safe integer/);
      assert.throws(
        () => resolveCostConfig({ streamingClassCost: invalid }),
        /positive safe integer/
      );
    }
  });

  it("normalizes caller costs only when they are positive safe integers", () => {
    assert.equal(normalizeRequestCost(7, 10), 7);
    for (const invalid of [0, -1, 0.5, Number.POSITIVE_INFINITY, Number.MAX_VALUE]) {
      assert.throws(() => normalizeRequestCost(invalid, 10), /positive safe integer/);
    }
    assert.throws(() => normalizeRequestCost(1, Number.MAX_VALUE), /positive safe integer/);
    assert.throws(
      () => normalizeRequestCost(1, MAX_ADMISSION_COST_OR_LIMIT + 1),
      /maxRequestCost|must be <=/
    );
    assert.equal(
      normalizeRequestCost(MAX_ADMISSION_COST_OR_LIMIT, MAX_ADMISSION_COST_OR_LIMIT),
      MAX_ADMISSION_COST_OR_LIMIT
    );
  });

  it("clamps multiple overflowing feature contributions without unsafe arithmetic", () => {
    const config: AdmissionCostConfig = {
      ...DEFAULT_ADMISSION_COST_CONFIG,
      maxRequestCost: 25,
    };
    const cost = estimateAdmissionCost(
      features({
        bodyBytes: Number.MAX_SAFE_INTEGER,
        estimatedInputTokens: Number.MAX_SAFE_INTEGER,
        messageCount: Number.MAX_SAFE_INTEGER,
        toolCount: Number.MAX_SAFE_INTEGER,
        requestedFanout: Number.MAX_SAFE_INTEGER,
      }),
      config
    );
    assert.equal(cost, 25);
  });

  it("normalizes invalid, negative, and NaN inputs safely", () => {
    const cost = estimateAdmissionCost({
      bodyBytes: Number.NaN,
      estimatedInputTokens: -12,
      messageCount: Number.POSITIVE_INFINITY,
      toolCount: undefined,
      requestedFanout: 0,
      streaming: undefined,
    } as AdmissionCostFeatures);
    assert.equal(Number.isSafeInteger(cost), true);
    assert.ok(cost >= 1);
    assert.ok(cost <= DEFAULT_ADMISSION_COST_CONFIG.maxRequestCost);
  });

  it("uses transparent configurable quanta without a fixed-MB claim", () => {
    const config: AdmissionCostConfig = {
      baseCost: 1,
      bodyBytesPerUnit: 1000,
      tokensPerUnit: 100,
      messagesPerUnit: 10,
      toolsPerUnit: 5,
      fanoutPerUnit: 1,
      streamingClassCost: 1,
      nonStreamingClassCost: 3,
      maxRequestCost: 1000,
    };
    // 2500 bytes → 3 units (ceil), 250 tokens → 3 units, 1 message → 1, 0 tools, fanout 1 → 1, streaming class 1
    const cost = estimateAdmissionCost(
      features({
        bodyBytes: 2500,
        estimatedInputTokens: 250,
        messageCount: 1,
        toolCount: 0,
        requestedFanout: 1,
        streaming: true,
      }),
      config
    );
    assert.equal(cost, 1 + 3 + 3 + 1 + 0 + 1 + 1);

    const nonStream = estimateAdmissionCost(
      features({
        bodyBytes: 0,
        estimatedInputTokens: 0,
        messageCount: 0,
        toolCount: 0,
        requestedFanout: 1,
        streaming: false,
      }),
      config
    );
    assert.equal(nonStream, 1 + 0 + 0 + 0 + 0 + 1 + 3);
  });
});
