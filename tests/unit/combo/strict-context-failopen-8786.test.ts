/**
 * Regression #8786: strict contextFilterMode must not empty an otherwise-
 * executable combo pool when every target has an unknown context limit.
 *
 * Repro: combo with minContextWindow + contextFilterMode:"strict" whose
 * targets are missing from the runtime capability catalog → filtered to []
 * → 404 "Combo has no executable targets", even though dashboard test and
 * direct model calls succeed. Lenient mode already keeps unknowns.
 *
 * Fix: when strict filtering would leave zero targets and at least one
 * unknown-context target remains, fail open to those unknowns (same spirit
 * as the request-compat context fail-open path).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8786-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getModelContextLimit } = await import("../../../src/lib/modelCapabilities.ts");
const { applyContextRequirements } =
  await import("../../../open-sse/services/combo/contextRequirements.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function target(provider: string, modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: `${provider}/${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

const UNKNOWN_TARGETS = [
  target("custom-unknown-8786", "codex-proxy-model"),
  target("custom-unknown-8786", "glm-proxy-model"),
  target("custom-unknown-8786", "minimax-proxy-model"),
  target("custom-unknown-8786", "deepseek-proxy-model"),
];

test("catalog sanity: fixture models have unknown context limits", () => {
  for (const t of UNKNOWN_TARGETS) {
    assert.equal(
      getModelContextLimit(t.provider, t.modelStr),
      null,
      `${t.provider}/${t.modelStr} must be unknown in the catalog for this regression`
    );
  }
});

test("#8786: strict mode with ALL-unknown targets fails open instead of emptying the pool", () => {
  const warnings: string[] = [];
  const log = {
    ...noopLog,
    warn(_tag: string, msg: string) {
      warnings.push(msg);
    },
  };

  const result = applyContextRequirements(
    UNKNOWN_TARGETS,
    {
      minContextWindow: 372000,
      preferLargeContext: true,
      contextFilterMode: "strict",
    },
    log
  );

  assert.equal(
    result.length,
    UNKNOWN_TARGETS.length,
    "strict+all-unknown must fail open to the original unknown targets, not return []"
  );
  assert.deepEqual(
    result.map((t) => t.modelStr),
    UNKNOWN_TARGETS.map((t) => t.modelStr)
  );
  assert.ok(
    warnings.some((w) => /failing open|unknown-context/i.test(w)),
    "must log a fail-open warning so operators can see strict degraded to unknowns"
  );
});

test("#8786: strict mode still drops unknowns when at least one known-good target remains", () => {
  // gpt-4o ships in the static capability catalog (~128k); keep threshold below that.
  const knownOk = target("openai", "gpt-4o");
  const unknown = target("custom-unknown-8786", "ghost-model");

  assert.ok(
    (getModelContextLimit(knownOk.provider, knownOk.modelStr) ?? 0) >= 32000,
    "known fixture must clear minContextWindow"
  );
  assert.equal(getModelContextLimit(unknown.provider, unknown.modelStr), null);

  const result = applyContextRequirements(
    [knownOk, unknown],
    {
      minContextWindow: 32000,
      contextFilterMode: "strict",
    },
    noopLog
  );

  assert.deepEqual(
    result.map((t) => t.modelStr),
    [knownOk.modelStr],
    "unknowns stay excluded in strict mode when a known-good target exists"
  );
});

test("#8786: strict mode with only known-below-threshold targets stays empty (no false fail-open)", () => {
  const small = target("openai", "gpt-4o"); // 128k
  const result = applyContextRequirements(
    [small],
    {
      minContextWindow: 500000,
      contextFilterMode: "strict",
    },
    noopLog
  );
  assert.equal(result.length, 0, "known-too-small must not be resurrected");
});

test("#8786: strict mode with known-below + unknowns fails open to unknowns only", () => {
  const small = target("openai", "gpt-4o"); // 128k < 372k
  const unknown = target("custom-unknown-8786", "maybe-large-model");

  const result = applyContextRequirements(
    [small, unknown],
    {
      minContextWindow: 372000,
      contextFilterMode: "strict",
    },
    noopLog
  );

  assert.equal(result.length, 1);
  assert.equal(result[0].modelStr, unknown.modelStr);
});

test("#8786: lenient mode still includes unknowns (unchanged)", () => {
  const result = applyContextRequirements(
    UNKNOWN_TARGETS.slice(0, 2),
    {
      minContextWindow: 372000,
      contextFilterMode: "lenient",
    },
    noopLog
  );
  assert.equal(result.length, 2);
});
