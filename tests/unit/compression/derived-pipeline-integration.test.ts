import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyCompressionAsync } from "../../../open-sse/services/compression/index.ts";
import { selectCompressionPlan } from "../../../open-sse/services/compression/strategySelector.ts";
import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";
import type {
  CompressionConfig,
  CompressionPipelineStep,
} from "../../../open-sse/services/compression/types.ts";

/**
 * End-to-end coverage for the derived stacked pipeline (Task 12).
 *
 * Proves that the per-engine toggle map (`config.engines`) drives a derived
 * `stacked` plan whose pipeline, when fed back to {@link applyCompressionAsync},
 * runs the real rtk → caveman engines — and that the derived run is equivalent to
 * an explicit `stackedPipeline` config. i.e. "derived == explicit".
 */
describe("compression derived-pipeline integration (Task 12)", () => {
  // A realistic body: a noisy tool result (rtk dedupes) plus a prose user turn.
  function makeBody(): Record<string, unknown> {
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

  // Engines map: only rtk + caveman(full) on. rtk has no level → no intensity in the
  // derived step; caveman level "full" → intensity "full".
  function deriveConfig(): CompressionConfig {
    return {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      // Clear the seeded default stackedPipeline so the derived plan is the only source.
      stackedPipeline: [],
      // Panel-configured: the engines map drives dispatch (a stored engines row exists).
      enginesExplicit: true,
      engines: {
        ...DEFAULT_COMPRESSION_CONFIG.engines,
        rtk: { enabled: true },
        caveman: { enabled: true, level: "full" },
      },
    };
  }

  const EXPLICIT_PIPELINE: CompressionPipelineStep[] = [
    { engine: "rtk" },
    { engine: "caveman", intensity: "full" },
  ] as unknown as CompressionPipelineStep[];

  it("derives a stacked plan with rtk → caveman(full) in stackPriority order", () => {
    const config = deriveConfig();
    // Enough tokens that auto-trigger is irrelevant (autoTriggerTokens is 0 by default,
    // so the derived default path is what we want — pass a real estimate anyway).
    const plan = selectCompressionPlan(config, null, 5000);

    assert.equal(plan.mode, "stacked");
    assert.deepEqual(plan.stackedPipeline, [
      { engine: "rtk" },
      { engine: "caveman", intensity: "full" },
    ]);
  });

  it("runs BOTH rtk and caveman when applying the derived pipeline", async () => {
    const config = deriveConfig();
    const plan = selectCompressionPlan(config, null, 5000);
    assert.equal(plan.mode, "stacked");

    // Feed the derived pipeline back through the real async apply path.
    const runConfig: CompressionConfig = {
      ...config,
      stackedPipeline: plan.stackedPipeline as CompressionPipelineStep[],
    };
    const result = await applyCompressionAsync(makeBody(), "stacked", { config: runConfig });

    assert.equal(result.stats?.engine, "stacked");
    const ran = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    assert.deepEqual(ran, ["rtk", "caveman"], "both engines must run, rtk before caveman");
  });

  it("derived pipeline is equivalent to an explicit stackedPipeline (derived == explicit)", async () => {
    const derivedConfig = deriveConfig();
    const derivedPlan = selectCompressionPlan(derivedConfig, null, 5000);
    assert.deepEqual(derivedPlan.stackedPipeline, EXPLICIT_PIPELINE);

    const derivedResult = await applyCompressionAsync(makeBody(), "stacked", {
      config: {
        ...derivedConfig,
        stackedPipeline: derivedPlan.stackedPipeline as CompressionPipelineStep[],
      },
    });

    // Second config: NO engines map driving the plan — an explicit stackedPipeline only.
    const explicitConfig: CompressionConfig = {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      stackedPipeline: EXPLICIT_PIPELINE,
      engines: {}, // explicit-only: the engines map plays no part here
    };
    const explicitResult = await applyCompressionAsync(makeBody(), "stacked", {
      config: explicitConfig,
    });

    // Same engines ran, in the same order.
    assert.deepEqual(
      derivedResult.stats?.engineBreakdown?.map((e) => e.engine),
      explicitResult.stats?.engineBreakdown?.map((e) => e.engine),
      "derived and explicit must run the same engine set in the same order"
    );

    // Same compressed output text for the prose user turn.
    const userText = (r: typeof derivedResult): string => {
      const messages = r.body.messages as Array<{ role: string; content: unknown }>;
      const user = messages.find((m) => m.role === "user");
      return typeof user?.content === "string" ? user.content : JSON.stringify(user?.content);
    };
    assert.equal(
      userText(derivedResult),
      userText(explicitResult),
      "derived and explicit must produce identical compressed text"
    );
  });
});
