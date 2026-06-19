/**
 * Regression guard for B-RTK-INTENSITY: the intensity knob used to be nearly inert
 * (it only set smartTruncate's preserveHead/Tail 16↔24). It must now scale the effective
 * line budget so minimal / standard / aggressive differ on truncation-based filters,
 * WITHOUT ever dropping error/failure lines (priorityPatterns protect them at every
 * intensity). Include/collapse filters (e.g. docker-logs) compress by content and are
 * intensity-independent by nature — so the deterministic proof is on effectiveMaxLines.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyRtkCompression,
  effectiveMaxLines,
} from "@omniroute/open-sse/services/compression/engines/rtk/index.ts";

test("effectiveMaxLines scales the line budget by intensity (minimal > standard > aggressive)", () => {
  const min = effectiveMaxLines(120, "minimal");
  const std = effectiveMaxLines(120, "standard");
  const agg = effectiveMaxLines(120, "aggressive");
  assert.equal(std, 120, "standard is the baseline");
  assert.ok(min > std, `minimal (${min}) keeps more than standard (${std})`);
  assert.ok(agg < std, `aggressive (${agg}) keeps fewer than standard (${std})`);
  assert.ok(min > agg, "minimal keeps strictly more than aggressive");
  assert.ok(effectiveMaxLines(1, "aggressive") >= 1, "never below 1 line");
  assert.equal(effectiveMaxLines(120, undefined), 120, "unknown intensity = baseline");
});

test("rtk preserves error/failure lines at EVERY intensity", () => {
  const lines: string[] = [];
  for (let i = 0; i < 400; i++) {
    if (i === 120) lines.push("ERROR: connection refused at step 120");
    else if (i === 300) lines.push("FAILED: assertion mismatch at step 300");
    else lines.push(`line ${String(i).padStart(4, "0")} routine output text here`);
  }
  const content = lines.join("\n");
  for (const intensity of ["minimal", "standard", "aggressive"] as const) {
    const res = applyRtkCompression({ messages: [{ role: "tool", content }] }, {
      enabled: true,
      intensity,
      applyToToolResults: true,
    } as Record<string, unknown>);
    const out =
      typeof res.body.messages?.[0]?.content === "string"
        ? (res.body.messages[0].content as string)
        : "";
    assert.ok(out.includes("ERROR: connection refused"), `${intensity}: ERROR line must survive`);
    assert.ok(out.includes("FAILED: assertion mismatch"), `${intensity}: FAILED line must survive`);
  }
});
