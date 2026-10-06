/**
 * Regression test for issue #6524.
 *
 * Reporter observed: for `ollama-cloud/deepseek-v4-flash`, a synced capability row
 * with `limit_output=1048576` (wrongly equal to `limit_context`, while the real
 * upstream output cap is `65536`) caused the reasoning-token-buffer heuristic to
 * expand `max_tokens` 64000 -> 96000, which upstream rejected with
 * "exceeds model's maximum output tokens (65536)".
 *
 * Root cause (confirmed by reading `resolveReasoningBufferedMaxTokens` and its
 * `getExplicitModelOutputCap` clamp source): the clamp math itself is correct, but
 * `getExplicitModelOutputCap()` only ever read the unvalidated synced
 * `limit_output` (or registry/static fallbacks) — it ignored the operator-settable
 * `max_output_tokens` capability override (`src/lib/db/modelCapabilityOverrides.ts`,
 * `/api/model-capability-overrides`) that `getResolvedModelCapabilities()` already
 * consulted. That inconsistency meant an operator manually correcting a bad synced
 * output cap (the existing, already-shipped remediation path for wrong catalog
 * data) had no effect on the reasoning buffer, which kept inflating past the real
 * cap regardless.
 *
 * Fix: `getExplicitModelOutputCap()` now checks the same `max_output_tokens` override
 * before falling back to synced/registry/static data, via a helper shared with
 * `getResolvedModelCapabilities()`.
 */
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-6524-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { setModelCapabilityOverride, removeModelCapabilityOverride } =
  await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { resolveReasoningBufferedMaxTokens } =
  await import("../../open-sse/services/reasoningTokenBuffer.ts");

const PROVIDER = "ollama-cloud";
const MODEL = "deepseek-v4-flash";
const TARGET = `${PROVIDER}/${MODEL}`;
const REAL_UPSTREAM_OUTPUT_CAP = 65536; // per reporter's boundary test table

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    reasoning: false,
    tool_call: true,
    attachment: false,
    temperature: true,
    structured_output: true,
    limit: { context: limitContext, output: limitContext },
    ...overrides,
  };
}

test.before(() => {
  clearModelsDevCapabilities();
  // Mirrors the exact production row from the issue: limit_context and limit_output
  // both wrongly synced to 1048576 for ollama-cloud/deepseek-v4-flash, while the real
  // upstream output cap (per the reporter's boundary test) is 65536.
  saveModelsDevCapabilities({
    [PROVIDER]: {
      [MODEL]: capabilityEntry(1048576, { reasoning: true, limit_output: 1048576 }),
    },
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#6524: with only the (wrong) synced catalog data, the buffer no longer inflates (#9507)", () => {
  // #9507: the reasoning-token buffer never enlarges an explicit client
  // max_tokens, so even with a wrong synced output cap (1048576) the client's
  // 64000 is forwarded verbatim — which already stays under the real upstream
  // cap (65536), fully resolving the reporter's symptom without needing an
  // operator override. (Previously this asserted 96000, the inflation past the
  // real cap; that inflation is the defect #9507 removes.)
  const result = resolveReasoningBufferedMaxTokens(TARGET, 64000);
  assert.equal(result, 64000);
});

test("#6524: an operator-set max_output_tokens override clamps the reasoning buffer", () => {
  assert.ok(
    setModelCapabilityOverride(TARGET, "max_output_tokens", REAL_UPSTREAM_OUTPUT_CAP),
    "expected the max_output_tokens override to be written"
  );
  try {
    const result = resolveReasoningBufferedMaxTokens(TARGET, 64000);
    assert.ok(
      result === null || result <= REAL_UPSTREAM_OUTPUT_CAP,
      `expected max_tokens to stay <= ${REAL_UPSTREAM_OUTPUT_CAP}, got ${result} ` +
        `(reproduces reported 64000 -> 96000 inflation, upstream then 400s)`
    );
  } finally {
    removeModelCapabilityOverride(TARGET, "max_output_tokens");
  }
});
