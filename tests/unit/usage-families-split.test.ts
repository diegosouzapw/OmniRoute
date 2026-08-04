// Characterization of the services/usage.ts family split (god-file decomposition): the Cursor,
// Kimi, Codex, Claude, and Kiro usage families moved out of services/usage.ts into
// services/usage/<family>.ts leaves (mirroring the earlier glm/minimax/antigravity leaves).
// Behavior-preserving move; the locks pin each leaf's exported surface, the Claude plan-label
// helper's pure logic, that usage.ts re-exports buildKiroUsageResult + discoverKiroProfileArn
// (the kiro-* tests import them from services/usage), and that __testing stays wired to the leaves.
import { test } from "node:test";
import assert from "node:assert/strict";

const CURSOR = await import("../../open-sse/services/usage/cursor.ts");
const KIMI = await import("../../open-sse/services/usage/kimi.ts");
const CODEX = await import("../../open-sse/services/usage/codex.ts");
const CLAUDE = await import("../../open-sse/services/usage/claude.ts");
const KIRO = await import("../../open-sse/services/usage/kiro.ts");
const HOST = await import("../../open-sse/services/usage.ts");

const kind = (m: unknown, k: string) => typeof (m as Record<string, unknown>)[k];

test("each family leaf exposes its usage fetcher(s)", () => {
  assert.equal(kind(CURSOR, "getCursorUsage"), "function");
  assert.equal(kind(KIMI, "getKimiUsage"), "function");
  assert.equal(kind(CODEX, "getCodexUsage"), "function");
  assert.equal(kind(CLAUDE, "getClaudeUsage"), "function");
  assert.equal(kind(CLAUDE, "getClaudePlanLabel"), "function");
  assert.equal(kind(KIRO, "getKiroUsage"), "function");
  assert.equal(kind(KIRO, "buildKiroUsageResult"), "function");
  assert.equal(kind(KIRO, "discoverKiroProfileArn"), "function");
});

test("host re-exports the kiro symbols the kiro-* tests import, with the same identity", () => {
  assert.equal(
    (HOST as Record<string, unknown>).buildKiroUsageResult,
    (KIRO as Record<string, unknown>).buildKiroUsageResult
  );
  assert.equal(
    (HOST as Record<string, unknown>).discoverKiroProfileArn,
    (KIRO as Record<string, unknown>).discoverKiroProfileArn
  );
});

test("host __testing stays wired to the moved claude/kiro internals", () => {
  const testing = (HOST as Record<string, Record<string, unknown>>).__testing;
  assert.equal(testing.getClaudePlanLabel, (CLAUDE as Record<string, unknown>).getClaudePlanLabel);
  assert.equal(testing.getKiroUsage, (KIRO as Record<string, unknown>).getKiroUsage);
});

test("claude getClaudePlanLabel picks the first meaningful candidate, skipping placeholders", () => {
  assert.equal(CLAUDE.getClaudePlanLabel("Pro"), "Pro");
  assert.equal(CLAUDE.getClaudePlanLabel("  Max  "), "Max");
  assert.equal(CLAUDE.getClaudePlanLabel("claude code", "Team"), "Team");
  assert.equal(CLAUDE.getClaudePlanLabel("unknown", null, "Enterprise"), "Enterprise");
  assert.equal(CLAUDE.getClaudePlanLabel(null, undefined, ""), null);
  assert.equal(CLAUDE.getClaudePlanLabel(), null);
});

test("host dispatcher + USAGE_FETCHER_PROVIDERS still cover the moved families", () => {
  assert.equal(kind(HOST, "getUsageForProvider"), "function");
  const providers = (HOST as Record<string, unknown>).USAGE_FETCHER_PROVIDERS as readonly string[];
  for (const p of ["cursor", "codex", "claude", "kiro", "kimi-coding"]) {
    assert.ok(providers.includes(p), `${p} must remain a usage-fetcher provider`);
  }
});
