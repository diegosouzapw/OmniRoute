import test from "node:test";
import assert from "node:assert/strict";
import {
  addBufferToUsage,
  invalidateBufferTokensCache,
  setBufferTokensCache,
} from "../../open-sse/utils/usageTracking.ts";

// ─── Helpers ──────────────────────────────────────────────────────────────

function resetEnv(saved: string | undefined) {
  if (saved === undefined) {
    delete process.env.USAGE_TOKEN_BUFFER;
  } else {
    process.env.USAGE_TOKEN_BUFFER = saved;
  }
}

// ─── addBufferToUsage — baseline / env-var path ───────────────────────────

test("addBufferToUsage — #8331: keeps DEFAULT 2000 out of client-visible prompt_tokens, exposes it via context_budget_prompt_tokens", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  const result = addBufferToUsage({ prompt_tokens: 25, completion_tokens: 24, total_tokens: 49 });

  // Metering/client-visible fields stay the real upstream values (#8331 fix).
  assert.equal(result.prompt_tokens, 25);
  assert.equal(result.completion_tokens, 24);
  assert.equal(result.total_tokens, 49);
  // The safety margin is still computed, just decoupled from client metering.
  assert.equal(result.context_budget_prompt_tokens, 2025);
  assert.equal(result.context_budget_total_tokens, 2049);

  resetEnv(saved);
});

test("addBufferToUsage — respects USAGE_TOKEN_BUFFER=0 env override (no context_budget_* fields added)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "0";
  invalidateBufferTokensCache();

  const result = addBufferToUsage({ prompt_tokens: 25, completion_tokens: 24, total_tokens: 49 });

  assert.equal(result.prompt_tokens, 25);
  assert.equal(result.total_tokens, 49);
  assert.equal("context_budget_prompt_tokens" in result, false);

  resetEnv(saved);
});

test("addBufferToUsage — respects USAGE_TOKEN_BUFFER=500 env override via context_budget_* fields", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "500";
  invalidateBufferTokensCache();

  const result = addBufferToUsage({ prompt_tokens: 86, completion_tokens: 52, total_tokens: 138 });

  assert.equal(result.prompt_tokens, 86);
  assert.equal(result.total_tokens, 138);
  assert.equal(result.context_budget_prompt_tokens, 586);
  assert.equal(result.context_budget_total_tokens, 638);

  resetEnv(saved);
});

test("addBufferToUsage — also computes context_budget_input_tokens for Claude-format input_tokens", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "100";
  invalidateBufferTokensCache();

  const result = addBufferToUsage({ input_tokens: 40, output_tokens: 20 });

  assert.equal(result.input_tokens, 40);
  assert.equal(result.context_budget_input_tokens, 140);

  resetEnv(saved);
});

test("addBufferToUsage — returns usage unchanged when buffer is 0 via env", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "0";
  invalidateBufferTokensCache();

  const usage = { prompt_tokens: 86, completion_tokens: 52, total_tokens: 138 };
  const result = addBufferToUsage(usage);

  assert.equal(result.prompt_tokens, 86);
  assert.equal(result.completion_tokens, 52);
  assert.equal(result.total_tokens, 138);

  resetEnv(saved);
});

test("addBufferToUsage — skips safety buffer for estimated usage (web/heuristic)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;
  invalidateBufferTokensCache();

  const result = addBufferToUsage({
    prompt_tokens: 6,
    completion_tokens: 1,
    total_tokens: 7,
    estimated: true,
  });

  // Must NOT inflate heuristics to DEFAULT 2000 — that made every Notion
  // request report a flat 2000 tokens.
  assert.equal(result.prompt_tokens, 6);
  assert.equal(result.completion_tokens, 1);
  assert.equal(result.total_tokens, 7);
  assert.equal(result.estimated, true);

  resetEnv(saved);
});

// ─── setBufferTokensCache — the fix for the race condition ────────────────
//
// The race: invalidateBufferTokensCache() sets _cachedBuffer=null; the next
// synchronous call to getBufferTokens() falls back to DEFAULT=2000 before
// _loadBufferFromDb() (async) completes.
//
// The fix: runtimeSettings.ts calls setBufferTokensCache(newValue) instead of
// invalidateBufferTokensCache() so the correct value is available synchronously.

test("setBufferTokensCache(0) — immediately prevents context_budget_* addition (no race window)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;

  // Simulates what runtimeSettings does after saving usageTokenBuffer=0 in DB
  setBufferTokensCache(0);

  const result = addBufferToUsage({ prompt_tokens: 25, completion_tokens: 24, total_tokens: 49 });

  // With the fix: 0 is applied synchronously — no context_budget_* fields at all
  assert.equal(result.prompt_tokens, 25);
  assert.equal(result.completion_tokens, 24);
  assert.equal(result.total_tokens, 49);
  assert.equal("context_budget_prompt_tokens" in result, false);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("setBufferTokensCache(500) — immediately sets custom buffer value in context_budget_* fields", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;

  setBufferTokensCache(500);

  const result = addBufferToUsage({ prompt_tokens: 86, completion_tokens: 52, total_tokens: 138 });

  assert.equal(result.prompt_tokens, 86);
  assert.equal(result.total_tokens, 138);
  assert.equal(result.context_budget_prompt_tokens, 586);
  assert.equal(result.context_budget_total_tokens, 638);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("setBufferTokensCache(0) — works for Claude-format (input_tokens), no context_budget_input_tokens", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;

  setBufferTokensCache(0);

  const result = addBufferToUsage({ input_tokens: 40, output_tokens: 20 });

  assert.equal(result.input_tokens, 40);
  assert.equal("context_budget_input_tokens" in result, false);

  resetEnv(saved);
  invalidateBufferTokensCache();
});

test("invalidateBufferTokensCache — still resets to null (returns DEFAULT on next sync call)", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  delete process.env.USAGE_TOKEN_BUFFER;

  // First prime the cache with a custom value
  setBufferTokensCache(0);
  const afterSet = addBufferToUsage({ prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 });
  assert.equal(afterSet.prompt_tokens, 10); // 0 buffer, real value either way

  // Then invalidate — next sync call reverts to DEFAULT (2000) while async reload happens.
  // Client-visible prompt_tokens stays real (#8331); only the internal context_budget_*
  // field carries the DEFAULT=2000 margin during the race window.
  invalidateBufferTokensCache();
  const afterInvalidate = addBufferToUsage({ prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 });
  assert.equal(afterInvalidate.prompt_tokens, 10);
  assert.equal(afterInvalidate.context_budget_prompt_tokens, 2010); // DEFAULT=2000 applied (race window)

  resetEnv(saved);
});
