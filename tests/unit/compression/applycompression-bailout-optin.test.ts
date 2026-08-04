import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerCompressionEngine } from "../../../open-sse/services/compression/index.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

// The combo proactive-fallback path calls applyCompression(stacked); a throwing engine there
// propagates and is swallowed as a "Speculative task error", silently dropping the target. The
// fix lets that caller opt into the TV1 bail-out (enabled, minGainPercent 0 = skip-on-throw
// without changing the min-gain advance behavior). This documents the opt-in contract.
const THROWING_ENGINE: CompressionEngine = {
  id: "applycompress-bailout-throw",
  name: "Throwing Test Engine",
  description: "test fixture",
  icon: "",
  targets: ["messages"],
  stackable: true,
  stackPriority: 999,
  metadata: {
    id: "applycompress-bailout-throw",
    name: "Throwing Test Engine",
    description: "test",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: false,
    stable: false,
  },
  apply() {
    throw new Error("boom from fallback engine");
  },
  compress() {
    throw new Error("boom from fallback engine");
  },
  getConfigSchema() {
    return [];
  },
  validateConfig() {
    return { valid: true, errors: [] };
  },
};

function stackedConfig(): CompressionConfig {
  return {
    stackedPipeline: [{ engine: "applycompress-bailout-throw" }],
  } as unknown as CompressionConfig;
}

describe("applyCompression — combo fallback bail-out opt-in", () => {
  it("opting into bail-out skips a throwing engine instead of propagating (no silent drop)", () => {
    registerCompressionEngine(THROWING_ENGINE);
    const body = { messages: [{ role: "user", content: "hello world" }] };

    let result: ReturnType<typeof applyCompression> | undefined;
    assert.doesNotThrow(() => {
      result = applyCompression(body, "stacked", {
        config: stackedConfig(),
        bailout: { enabled: true, minGainPercent: 0 },
      });
    });
    assert.ok(result, "returns a result instead of throwing");
    assert.equal(result!.compressed, false, "a crashing engine compresses nothing");
  });

  it("without bail-out, a throwing engine still propagates (TV1 default unchanged)", () => {
    registerCompressionEngine(THROWING_ENGINE);
    const body = { messages: [{ role: "user", content: "hello world" }] };

    assert.throws(
      () => applyCompression(body, "stacked", { config: stackedConfig() }),
      /boom from fallback engine/,
      "the default (opt-out) path is unchanged — bail-out is strictly opt-in"
    );
  });
});
