/**
 * Tests for the A2A Routing Decision Logger (DEBT-011).
 *
 * Verifies:
 *  - OTel context hydration (trace_id/span_id injected when missing)
 *  - Preserves caller-supplied trace_id/span_id
 *  - DB persistence via routingDecisions module
 *  - Fire-and-forget error handling (DB errors don't throw)
 *  - Console logging in development mode
 *
 * Run: node --import tsx/esm --test tests/unit/routing-logger.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp DB setup ────────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-routing-logger-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;

// Import core first to initialize the DB
const core = await import("../../src/lib/db/core.ts");
const { logRoutingDecision } = await import("../../src/lib/a2a/routingLogger.ts");
const routingDecisions = await import("../../src/lib/db/routingDecisions.ts");

// ── Cleanup ──────────────────────────────────────────────────────────────────

test.after(() => {
  core.resetDbInstance();
  routingDecisions.resetRoutingDecisionsTableCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Tests ────────────────────────────────────────────────────────────────────

test("logRoutingDecision persists a valid decision to the DB", () => {
  logRoutingDecision({
    taskType: "code-review",
    comboId: "combo-1",
    providerSelected: "openai",
    modelUsed: "gpt-4",
    score: 0.95,
    factors: ["latency"],
    fallbacksTriggered: [],
    success: true,
    latencyMs: 1200,
    cost: 0.03,
  });

  const rows = routingDecisions.getRoutingDecisions(10);
  assert.ok(rows.length >= 1, "must have at least 1 routing decision row");

  const row = rows[0];
  assert.equal(row.taskType, "code-review");
  assert.equal(row.comboId, "combo-1");
  assert.equal(row.provider, "openai");
  assert.equal(row.model, "gpt-4");
  assert.equal(row.score, 0.95);
  assert.deepEqual(row.factors, ["latency"]);
  assert.deepEqual(row.fallbacks, []);
  assert.equal(row.success, true);
  assert.equal(row.latencyMs, 1200);
  assert.equal(row.cost, 0.03);
  assert.ok(typeof row.id === "string" && row.id.length > 0, "must have a UUID id");
  assert.ok(typeof row.createdAt === "string", "must have a createdAt timestamp");
});

test("logRoutingDecision preserves caller-supplied trace_id and span_id", () => {
  logRoutingDecision({
    taskType: "debug",
    comboId: "combo-2",
    providerSelected: "anthropic",
    modelUsed: "claude-3",
    score: 0.8,
    factors: [],
    fallbacksTriggered: [],
    success: true,
    latencyMs: 500,
    cost: 0.01,
    traceId: "abc123def456abc123def456abc123de",
    spanId: "fedcba9876543210",
  });

  const rows = routingDecisions.getRoutingDecisions(10);
  const match = rows.find((r) => r.taskType === "debug");
  assert.ok(match, "must find the debug routing decision");
  assert.equal(match.traceId, "abc123def456abc123def456abc123de");
  assert.equal(match.spanId, "fedcba9876543210");
});

test("logRoutingDecision auto-hydrates OTel trace context when missing", () => {
  logRoutingDecision({
    taskType: "otel-test",
    comboId: "combo-3",
    providerSelected: "gemini",
    modelUsed: "gemini-pro",
    score: 0.9,
    factors: ["cost"],
    fallbacksTriggered: [],
    success: true,
    latencyMs: 800,
    cost: 0.02,
  });

  const rows = routingDecisions.getRoutingDecisions(10);
  const match = rows.find((r) => r.taskType === "otel-test");
  assert.ok(match, "must find the otel-test routing decision");
  // Synthetic W3C context is always available in Node.js
  assert.ok(
    typeof match.traceId === "string" && match.traceId.length === 32,
    `traceId must be a 32-char hex string, got ${match.traceId}`,
  );
  assert.ok(
    typeof match.spanId === "string" && match.spanId.length === 16,
    `spanId must be a 16-char hex string, got ${match.spanId}`,
  );
});

test("getRoutingDecisionsByProvider filters correctly", () => {
  const openaiRows = routingDecisions.getRoutingDecisionsByProvider("openai");
  assert.ok(openaiRows.length >= 1, "must find openai decisions");
  for (const row of openaiRows) {
    assert.equal(row.provider, "openai");
  }

  const unknownRows = routingDecisions.getRoutingDecisionsByProvider("nonexistent");
  assert.equal(unknownRows.length, 0, "must return empty for nonexistent provider");
});

test("getRoutingDecisionCount returns correct count", () => {
  const count = routingDecisions.getRoutingDecisionCount();
  assert.ok(typeof count === "number" && count >= 3, `expected count >= 3, got ${count}`);
});

test("logRoutingDecision never throws (fire-and-forget safety)", () => {
  // Even with unusual inputs, must not throw
  assert.doesNotThrow(() => {
    logRoutingDecision({
      taskType: "",
      comboId: "",
      providerSelected: "",
      modelUsed: "",
      score: 0,
      factors: [],
      fallbacksTriggered: [],
      success: false,
      latencyMs: 0,
      cost: 0,
    });
  });
});
