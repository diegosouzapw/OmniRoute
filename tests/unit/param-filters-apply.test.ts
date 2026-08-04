import { test } from "node:test";
import assert from "node:assert/strict";

// Static import — this module does NOT depend on the DB (tests applyConfigFilters
// directly, which is a pure function; the DB-backed parent function stripUnsupportedParams
// is only tested for its non-DB code paths here).
import {
  stripUnsupportedParams,
  applyConfigFilters,
} from "../../open-sse/translator/paramSupport.ts";

// ---------------------------------------------------------------------------
// stripUnsupportedParams — hardcoded STRIP_RULES (regression guard)
// ---------------------------------------------------------------------------

test("stripUnsupportedParams strips known hardcoded fields from body", () => {
  const body = { model: "claude-opus-4", temperature: 0.7, max_tokens: 100 };
  const result = stripUnsupportedParams("anthropic", "claude-opus-4-20250514", body);
  assert.equal((result as Record<string, unknown>).temperature, undefined);
  assert.equal((result as Record<string, unknown>).max_tokens, 100);
});

test("stripUnsupportedParams leaves unrelated models alone", () => {
  const body = { model: "gpt-4", temperature: 0.7 };
  const result = stripUnsupportedParams("openai", "gpt-4", body);
  assert.equal((result as Record<string, unknown>).temperature, 0.7);
});

test("stripUnsupportedParams returns body unchanged for null/undefined args", () => {
  const body = { model: "gpt-4" };
  assert.equal(stripUnsupportedParams(null, null, body), body);
  assert.equal(stripUnsupportedParams("test", null, body), body);
  assert.equal(stripUnsupportedParams("test", "", body), body);
});

// ---------------------------------------------------------------------------
// applyConfigFilters — config-driven denylist + allowlist (direct, no DB)
// ---------------------------------------------------------------------------

test("applyConfigFilters no-op when provider undefined or null", () => {
  const body1 = { thinking: "enabled", max_tokens: 100 };
  applyConfigFilters("nonexistent-provider", "my-model", body1, { ...body1 });
  assert.deepEqual(body1, { thinking: "enabled", max_tokens: 100 });

  const body2 = { thinking: "enabled" };
  applyConfigFilters(null, "my-model", body2, { ...body2 });
  assert.deepEqual(body2, { thinking: "enabled" });
});
