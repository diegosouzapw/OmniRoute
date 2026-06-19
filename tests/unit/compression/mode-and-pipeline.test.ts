/**
 * Guards for B-MODE-ENGINE-DECOUPLE and B-PIPELINE-DIVERGENCE.
 *
 * B-MODE-ENGINE-DECOUPLE: selecting a single MODE must run its engine even if the
 * per-engine `enabled` flag is off — the mode selection IS the enable signal (the
 * per-engine flag still gates STACKED pipeline steps). Previously standard/rtk silently
 * no-op'd when cavemanConfig.enabled / rtkConfig.enabled was false.
 *
 * B-PIPELINE-DIVERGENCE: the global stackedPipeline normalizer stripped
 * session-dedup/ccr/headroom/llmlingua (engines the combo path allows), so those engines
 * could never run via the global setting. The allowlists must agree.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { applyCompression } from "@omniroute/open-sse/services/compression/strategySelector.ts";
import { normalizeStackedPipeline } from "../../../src/lib/db/compression.ts";

test("standard mode compresses even when cavemanConfig.enabled is false (B-MODE-ENGINE-DECOUPLE)", () => {
  const body = {
    messages: [
      {
        role: "user",
        content:
          "Please could you kindly review the configuration of the file. ".repeat(8) +
          "I would really appreciate it, thank you so much for your help here.",
      },
    ],
  };
  const res = applyCompression(body, "standard", {
    config: {
      cavemanConfig: { enabled: false, compressRoles: ["user"], intensity: "full", minMessageLength: 0 },
    },
  } as Record<string, unknown>);
  assert.ok(res.compressed, "standard mode must run caveman regardless of cavemanConfig.enabled");
});

test("rtk mode compresses even when rtkConfig.enabled is false (B-MODE-ENGINE-DECOUPLE)", () => {
  const content =
    Array.from({ length: 60 }, (_, i) => `line ${String(i).padStart(3, "0")} routine output`).join(
      "\n"
    ) + "\nERROR: boom";
  const res = applyCompression({ messages: [{ role: "tool", content }] }, "rtk", {
    config: { rtkConfig: { enabled: false, intensity: "standard", applyToToolResults: true } },
  } as Record<string, unknown>);
  assert.ok(res.compressed, "rtk mode must run regardless of rtkConfig.enabled");
});

test("normalizeStackedPipeline keeps headroom/ccr/session-dedup/llmlingua (B-PIPELINE-DIVERGENCE)", () => {
  const pipe = normalizeStackedPipeline([
    { engine: "session-dedup" },
    { engine: "ccr" },
    { engine: "headroom" },
    { engine: "llmlingua" },
    { engine: "rtk", intensity: "standard" },
    { engine: "bogus-engine" }, // unknown ids still dropped
  ]);
  const engines = pipe.map((s) => s.engine);
  for (const e of ["session-dedup", "ccr", "headroom", "llmlingua", "rtk"]) {
    assert.ok(engines.includes(e), `${e} must survive normalize`);
  }
  assert.ok(!engines.includes("bogus-engine"), "unknown engine ids are still dropped");
});
