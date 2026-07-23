/**
 * tests/unit/minimax-m3-maxtokens.test.ts
 *
 * Regression for issue #3141 — "Omniroute sets max_tokens = 8192 for
 * minimax/MiniMax-M3" (reporter @totaltube).
 *
 * minimax-coding / minimax route through the Claude translator, which calls
 * fitThinkingToMaxTokens(model, callerMaxTokens, …) → capMaxOutputTokens().
 * The caller's larger max_tokens was silently capped to the 8192
 * MODEL_SPECS.__default__ ceiling because:
 *   (a) MiniMax-M3 had no MODEL_SPECS entry at all, and the registry models
 *       declare no maxOutputTokens, so resolution fell through to __default__;
 *   (b) MiniMax-M2.7 (the upstream, capitalized id) never matched its existing
 *       lowercase "minimax-m2.7" spec because getModelSpec was case-SENSITIVE.
 *
 * Both lookups must now resolve to the real family ceiling (well above 8192).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-minimax-m3-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const DEFAULT_CAP = 8192;

test("#3141 MiniMax-M3 max_tokens is not capped to the 8192 default", () => {
  const cap = modelCapabilities.capMaxOutputTokens({ provider: "minimax", model: "MiniMax-M3" });
  assert.ok(
    cap > DEFAULT_CAP,
    `expected MiniMax-M3 maxOutputTokens > ${DEFAULT_CAP}, got ${cap}`
  );
});

test("#3141 MiniMaxAI/MiniMax-M3 (prefixed id) resolves above the 8192 default", () => {
  const cap = modelCapabilities.capMaxOutputTokens({
    provider: "minimax",
    model: "MiniMaxAI/MiniMax-M3",
  });
  assert.ok(
    cap > DEFAULT_CAP,
    `expected MiniMaxAI/MiniMax-M3 maxOutputTokens > ${DEFAULT_CAP}, got ${cap}`
  );
});

test("#3141 capitalized MiniMax-M2.7 resolves to its lowercase spec (case-insensitive)", () => {
  const cap = modelCapabilities.capMaxOutputTokens({ provider: "minimax", model: "MiniMax-M2.7" });
  assert.ok(
    cap > DEFAULT_CAP,
    `expected MiniMax-M2.7 maxOutputTokens > ${DEFAULT_CAP}, got ${cap}`
  );
});

test("#3141 lowercase minimax-m2.7 spec is unchanged", () => {
  const cap = modelCapabilities.capMaxOutputTokens({ provider: "minimax", model: "minimax-m2.7" });
  assert.ok(
    cap > DEFAULT_CAP,
    `expected minimax-m2.7 maxOutputTokens > ${DEFAULT_CAP}, got ${cap}`
  );
});

test("#3141 getModelSpec resolves MiniMax-M3 and capitalized M2.7 to family specs", () => {
  assert.ok(getModelSpec("MiniMax-M3"), "MiniMax-M3 should have a spec");
  assert.ok(
    getModelSpec("MiniMax-M2.7"),
    "capitalized MiniMax-M2.7 should resolve to the minimax-m2.7 spec"
  );
});
