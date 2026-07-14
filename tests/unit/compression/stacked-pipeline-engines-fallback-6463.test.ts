import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyCompressionAsync } from "../../../open-sse/services/compression/index.ts";
import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

/**
 * Regression guard for #6463 (and the 30 downstream engine-substitution reports).
 *
 * When a caller dispatches mode="stacked" with a config that carries the operator's
 * `engines` toggle map but no pre-derived `stackedPipeline` (e.g. /api/compression/preview,
 * ad-hoc integrations that only forward the persisted config), the stacked loop must
 * derive the pipeline from `engines` — not silently fall back to [rtk, caveman].
 */
describe("stacked pipeline honors engines map when stackedPipeline is missing (#6463)", () => {
  function body(): Record<string, unknown> {
    return {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 8 }, () => "same noisy tool output line").join("\n"),
        },
        {
          role: "user",
          content:
            "Please provide a detailed explanation of the authentication configuration and how it works",
        },
      ],
    };
  }

  it("derives rtk + caveman from engines map when stackedPipeline is empty", async () => {
    const config: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      stackedPipeline: [],
      engines: {
        ...DEFAULT_COMPRESSION_CONFIG.engines,
        rtk: { enabled: true },
        caveman: { enabled: true, level: "full" },
      },
    };

    const result = await applyCompressionAsync(body(), "stacked", { config });

    const ran = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    assert.deepEqual(ran, ["rtk", "caveman"], "engines map must drive the derived pipeline");
  });

  it("prefers explicit pipeline over engines-derived when both are present", async () => {
    const config: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      stackedPipeline: [{ engine: "caveman", intensity: "full" }],
      engines: {
        ...DEFAULT_COMPRESSION_CONFIG.engines,
        rtk: { enabled: true },
        caveman: { enabled: true, level: "full" },
      },
    };

    const result = await applyCompressionAsync(body(), "stacked", { config });
    const ran = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    assert.deepEqual(ran, ["caveman"], "explicit stackedPipeline must win over engines map");
  });

  it("falls back to [rtk, caveman] default only when BOTH pipeline and engines are empty", async () => {
    const config: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      stackedPipeline: [],
      engines: {},
    };

    const result = await applyCompressionAsync(body(), "stacked", { config });
    const ran = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    assert.deepEqual(ran, ["rtk", "caveman"], "historical fallback preserved");
  });
});
