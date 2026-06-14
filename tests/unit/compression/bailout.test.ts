/**
 * TV1 — Transversal compression bail-out discipline (OPT-IN).
 *
 * Proves:
 *  1. An engine that THROWS in apply() → step skipped (no throw, original body kept).
 *  2. An engine whose gain is < minGainPercent (10%) → step skipped.
 *  3. An engine with gain ≥ 10% → applied normally.
 *  4. With bail-out DISABLED (default) → a <10%-gain engine IS applied
 *     (proving that opt-in default never changes existing behaviour).
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import {
  applyStackedCompression,
  applyStackedCompressionAsync,
} from "../../../open-sse/services/compression/index.ts";
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "../../../open-sse/services/compression/engines/registry.ts";
import type {
  CompressionEngine,
  CompressionEngineTarget,
} from "../../../open-sse/services/compression/engines/types.ts";
import type {
  CompressionPipelineStep,
  CompressionResult,
} from "../../../open-sse/services/compression/types.ts";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Base skeleton shared by all fake engines. */
function makeBaseEngine(id: string): Omit<CompressionEngine, "apply"> {
  return {
    id,
    name: id,
    description: id,
    icon: "x",
    targets: ["messages"] as CompressionEngineTarget[],
    stackable: true,
    stackPriority: 0,
    metadata: {
      id,
      name: id,
      description: id,
      inputScope: "messages",
      targetLatencyMs: 1,
      supportsPreview: false,
      stable: true,
    },
    compress: (body) => ({ body, compressed: false, stats: null }),
    getConfigSchema: () => [],
    validateConfig: () => ({ valid: true, errors: [] }),
  };
}

/** Engine that always throws during apply(). */
const THROW_ENGINE_ID = "bailout-throw-engine";
const throwEngine: CompressionEngine = {
  ...makeBaseEngine(THROW_ENGINE_ID),
  apply: (_body) => {
    throw new Error("simulated engine failure");
  },
};

/** Engine that returns a low gain (5% < 10% threshold). */
const LOW_GAIN_ENGINE_ID = "bailout-low-gain-engine";
function makeLowGainEngine(id = LOW_GAIN_ENGINE_ID): CompressionEngine {
  return {
    ...makeBaseEngine(id),
    apply: (body) => {
      const messages = (body.messages as Array<{ role: string; content: string }>) ?? [];
      const next = messages.map((m) =>
        m.role === "user" ? { ...m, content: m.content + "|low" } : m
      );
      return {
        body: { ...body, messages: next },
        compressed: true,
        stats: {
          originalTokens: 100,
          compressedTokens: 95,
          savingsPercent: 5, // 5% < 10% threshold
          techniquesUsed: [id],
          mode: "stacked",
          timestamp: 0,
          durationMs: 0.1,
        },
      };
    },
  };
}

/** Engine that returns a high gain (20% ≥ 10% threshold). */
const HIGH_GAIN_ENGINE_ID = "bailout-high-gain-engine";
const highGainEngine: CompressionEngine = {
  ...makeBaseEngine(HIGH_GAIN_ENGINE_ID),
  apply: (body) => {
    const messages = (body.messages as Array<{ role: string; content: string }>) ?? [];
    const next = messages.map((m) =>
      m.role === "user" ? { ...m, content: m.content + "|high" } : m
    );
    return {
      body: { ...body, messages: next },
      compressed: true,
      stats: {
        originalTokens: 100,
        compressedTokens: 80,
        savingsPercent: 20, // 20% ≥ 10% threshold
        techniquesUsed: [HIGH_GAIN_ENGINE_ID],
        mode: "stacked",
        timestamp: 0,
        durationMs: 0.1,
      },
    };
  },
};

/** Async variant of the low-gain engine. */
const LOW_GAIN_ASYNC_ID = "bailout-low-gain-async";
const lowGainAsyncEngine: CompressionEngine = {
  ...makeLowGainEngine(LOW_GAIN_ASYNC_ID),
  apply: (body) => ({ body, compressed: false, stats: null }), // sync pass-through (async-only pattern)
  applyAsync: async (body) => makeLowGainEngine(LOW_GAIN_ASYNC_ID).apply(body),
};

/** Async variant of the throw engine. */
const THROW_ASYNC_ID = "bailout-throw-async";
const throwAsyncEngine: CompressionEngine = {
  ...makeBaseEngine(THROW_ASYNC_ID),
  apply: (body) => ({ body, compressed: false, stats: null }), // sync pass-through
  applyAsync: async (_body) => {
    throw new Error("simulated async engine failure");
  },
};

function pipeline(...ids: string[]): CompressionPipelineStep[] {
  return ids.map((engine) => ({ engine })) as unknown as CompressionPipelineStep[];
}

function userContent(result: CompressionResult): string {
  const messages = result.body.messages as Array<{ role: string; content: string }>;
  return messages.find((m) => m.role === "user")!.content;
}

const BAILOUT_ON = { bailout: { enabled: true, minGainPercent: 10 } };
const BAILOUT_OFF = {}; // default — no bailout field

// ── suite ────────────────────────────────────────────────────────────────────

describe("TV1 — stacked pipeline bail-out discipline (OPT-IN)", () => {
  before(() => {
    registerCompressionEngine(throwEngine);
    registerCompressionEngine(makeLowGainEngine());
    registerCompressionEngine(highGainEngine);
    registerCompressionEngine(lowGainAsyncEngine);
    registerCompressionEngine(throwAsyncEngine);
  });

  after(() => {
    unregisterCompressionEngine(THROW_ENGINE_ID);
    unregisterCompressionEngine(LOW_GAIN_ENGINE_ID);
    unregisterCompressionEngine(HIGH_GAIN_ENGINE_ID);
    unregisterCompressionEngine(LOW_GAIN_ASYNC_ID);
    unregisterCompressionEngine(THROW_ASYNC_ID);
  });

  // ── SYNC tests ────────────────────────────────────────────────────────────

  describe("sync — applyStackedCompression", () => {
    it("bail-out ON: throwing engine → step skipped, pipeline does NOT throw", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      // Must not throw and original body is kept (throw engine was the only step)
      const result = applyStackedCompression(body, pipeline(THROW_ENGINE_ID), BAILOUT_ON);

      assert.equal(result.compressed, false);
      assert.equal(userContent(result), "hello"); // body unchanged

      // TV1 fix: a crashing engine must be RECORDED in telemetry, not silently gone.
      assert.equal(result.stats?.fallbackApplied, true, "throw must set fallbackApplied");
      assert.ok(
        result.stats?.validationErrors?.some((e) => e.includes(THROW_ENGINE_ID)),
        "throwing engine must be recorded in validationErrors"
      );
    });

    it("bail-out ON: throwing engine before a good engine → good engine still runs", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      // throw engine first, then high-gain engine — the high-gain must still run
      const result = applyStackedCompression(
        body,
        pipeline(THROW_ENGINE_ID, HIGH_GAIN_ENGINE_ID),
        BAILOUT_ON
      );

      // high-gain engine appends "|high"
      assert.equal(userContent(result), "hello|high");
      assert.equal(result.compressed, true);
    });

    it("bail-out ON: low-gain engine (5%) → body NOT advanced (step skipped)", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = applyStackedCompression(body, pipeline(LOW_GAIN_ENGINE_ID), BAILOUT_ON);

      // low-gain would append "|low" but it should be skipped
      assert.equal(userContent(result), "hello");
      // compressed is false because the only step was skipped
      assert.equal(result.compressed, false);
    });

    it("bail-out ON: high-gain engine (20%) → body IS advanced normally", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = applyStackedCompression(body, pipeline(HIGH_GAIN_ENGINE_ID), BAILOUT_ON);

      assert.equal(userContent(result), "hello|high");
      assert.equal(result.compressed, true);
    });

    it("bail-out ON: low-gain then high-gain → only high-gain advances body", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = applyStackedCompression(
        body,
        pipeline(LOW_GAIN_ENGINE_ID, HIGH_GAIN_ENGINE_ID),
        BAILOUT_ON
      );

      // "|low" should be absent; "|high" should be present
      assert.equal(userContent(result), "hello|high");
    });

    it("bail-out OFF (default): low-gain engine IS applied (opt-in guard)", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      // No bailout config at all — original behavior
      const result = applyStackedCompression(body, pipeline(LOW_GAIN_ENGINE_ID), BAILOUT_OFF);

      // Without bail-out, the step is always applied
      assert.equal(userContent(result), "hello|low");
      assert.equal(result.compressed, true);
    });

    it("bail-out OFF (default): throwing engine propagates — unchanged existing behavior", () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      // Without bail-out, a throw is NOT caught → pipeline throws
      assert.throws(() => {
        applyStackedCompression(body, pipeline(THROW_ENGINE_ID), BAILOUT_OFF);
      }, /simulated engine failure/);
    });
  });

  // ── ASYNC tests ───────────────────────────────────────────────────────────

  describe("async — applyStackedCompressionAsync", () => {
    it("bail-out ON: async throwing engine → step skipped, no throw", async () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = await applyStackedCompressionAsync(body, pipeline(THROW_ASYNC_ID), BAILOUT_ON);

      assert.equal(userContent(result), "hello");
      assert.equal(result.compressed, false);
    });

    it("bail-out ON: async low-gain engine (5%) → step skipped", async () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = await applyStackedCompressionAsync(
        body,
        pipeline(LOW_GAIN_ASYNC_ID),
        BAILOUT_ON
      );

      assert.equal(userContent(result), "hello");
      assert.equal(result.compressed, false);
    });

    it("bail-out OFF (default): async low-gain engine IS applied", async () => {
      const body = { messages: [{ role: "user", content: "hello" }] };

      const result = await applyStackedCompressionAsync(
        body,
        pipeline(LOW_GAIN_ASYNC_ID),
        BAILOUT_OFF
      );

      assert.equal(userContent(result), "hello|low");
      assert.equal(result.compressed, true);
    });
  });
});
