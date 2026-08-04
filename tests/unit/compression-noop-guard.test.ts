import test from "node:test";
import assert from "node:assert/strict";
import { guardPipelineInflation } from "../../open-sse/services/compression/pipelineGuards.ts";
import { applyStackedCompression } from "../../open-sse/services/compression/strategySelector.ts";
import {
  registerCompressionEngine,
  setEngineEnabled,
} from "../../open-sse/services/compression/engines/registry.ts";
import type { CompressionEngine } from "../../open-sse/services/compression/engines/types.ts";
import type { CompressionPipelineStep } from "../../open-sse/services/compression/types.ts";

// Regression suite for the three compression NO-OP defects: a structural engine (ccr /
// session-dedup) that finds nothing to compress must be treated as ZERO SAVINGS, never as an
// inflation revert (A), never a silent skip (B), and never lose its identity in the breakdown (C).

// A test-only engine that mimics a structural no-op: body unchanged, compressed:false, stats:null.
function makeNoopEngine(id: string): CompressionEngine {
  return {
    id,
    name: "Test Noop",
    description: "test-only engine that finds nothing to compress",
    icon: "bug_report",
    targets: ["messages"],
    stackable: true,
    stackPriority: 0,
    metadata: {
      id,
      name: "Test Noop",
      description: "test-only",
      inputScope: "messages",
      targetLatencyMs: 0,
      supportsPreview: false,
      stable: true,
    },
    apply(body) {
      return { body, compressed: false, stats: null };
    },
    compress(body) {
      return this.apply(body);
    },
    getConfigSchema() {
      return [];
    },
    validateConfig() {
      return { valid: true, errors: [] };
    },
  };
}

// --- Defect A: a net-zero (equal-token) no-op is NOT inflation ---

test("guardPipelineInflation: equal tokens (no-op) is NOT flagged as inflation", () => {
  const original = { a: 1 };
  const compressed = { a: 1 };
  const r = guardPipelineInflation({
    originalBody: original,
    compressedBody: compressed,
    originalTokens: 100,
    compressedTokens: 100,
  });
  assert.equal(r.inflated, false);
  assert.equal(r.body, compressed);
});

test("guardPipelineInflation: strictly larger output still reverts as inflation", () => {
  const original = { a: 1 };
  const compressed = { a: 1, pad: "xxxx" };
  const r = guardPipelineInflation({
    originalBody: original,
    compressedBody: compressed,
    originalTokens: 100,
    compressedTokens: 101,
  });
  assert.equal(r.inflated, true);
  assert.equal(r.body, original);
});

// --- Defect B: a disabled engine skip records a validationWarning (symmetric with breaker skip) ---

const DISABLED_ID = "test-noop-disabled-guard";

test("applyStackedCompression: a disabled engine skip surfaces a 'disabled' validationWarning", () => {
  registerCompressionEngine(makeNoopEngine(DISABLED_ID));
  setEngineEnabled(DISABLED_ID, false);

  const body = { messages: [{ role: "user", content: "hello world" }] };
  const result = applyStackedCompression(body, [{ engine: DISABLED_ID } as CompressionPipelineStep]);

  const warnings = result.stats?.validationWarnings ?? [];
  assert.ok(
    warnings.some((w) => w.includes("disabled")),
    `expected a 'disabled' validationWarning, got: ${JSON.stringify(warnings)}`
  );
  assert.ok(
    warnings.some((w) => w.includes(DISABLED_ID)),
    "the warning should name the disabled engine"
  );
});

// --- Defect C: a no-op engine keeps its identity in engineBreakdown (not a generic "stacked") ---

const NOOP_ID = "test-noop-breakdown-guard";

test("applyStackedCompression: a no-op engine records its own identity in engineBreakdown", () => {
  registerCompressionEngine(makeNoopEngine(NOOP_ID));
  setEngineEnabled(NOOP_ID, true);

  const body = { messages: [{ role: "user", content: "hello world this is a message" }] };
  const result = applyStackedCompression(body, [{ engine: NOOP_ID } as CompressionPipelineStep]);

  const breakdown = result.stats?.engineBreakdown ?? [];
  const entry = breakdown.find((e) => e.engine === NOOP_ID);
  assert.ok(entry, `expected a breakdown entry keyed on "${NOOP_ID}", got: ${JSON.stringify(breakdown)}`);
  assert.equal(entry?.savingsPercent, 0);
  // The requested engine's identity must be preserved — never collapsed into a generic "stacked".
  assert.notEqual(entry?.engine, "stacked");
});
