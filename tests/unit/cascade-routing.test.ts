/**
 * cascade-routing.test — WP-S7.
 *
 * Verifies the per-combo cascade:
 *  - happy path: first candidate succeeds → returns success + that candidate
 *  - fallback: first fails, second succeeds → returns second
 *  - all fail: returns all_failed with no selection
 *  - monthly quota: skips candidates that would exceed cap
 *  - per-request cap: skips candidates that exceed per-request limit
 *  - quota exceeded (all skipped): returns quota_exceeded outcome
 *  - error from execute is caught and counted as failed
 */

import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  cascadeRoute,
  type CascadeCandidate,
  type CascadeContext,
  type ExecuteFn,
} from "../../src/lib/routing/cascade.ts";

function mkCandidate(provider: string, model: string, estCostUsd: number): CascadeCandidate {
  return { provider, model, estCostUsd };
}

const noCaps: CascadeContext = {
  requestId: "r1",
  monthlyUsdSpent: 0,
  monthlyUsdCap: null,
  perRequestUsdCap: null,
};

test("happy path: first candidate succeeds", async () => {
  const candidates = [mkCandidate("openai", "gpt-4o", 0.01), mkCandidate("anthropic", "claude-3-5", 0.02)];
  const execute: ExecuteFn = async (c) => c.provider === "openai" ? { ok: true } : { ok: false };
  const r = await cascadeRoute(candidates, noCaps, execute);
  assert.equal(r.outcome, "success");
  assert.equal(r.selected?.provider, "openai");
  assert.equal(r.attempts.length, 1);
  assert.equal(r.attempts[0].status, "succeeded");
  assert.equal(r.totalEstCostUsd, 0.01);
});

test("fallback: first fails, second succeeds", async () => {
  const candidates = [mkCandidate("openai", "gpt-4o", 0.01), mkCandidate("anthropic", "claude-3-5", 0.02)];
  const execute: ExecuteFn = async (c) => c.provider === "anthropic" ? { ok: true } : { ok: false, error: "rate limited" };
  const r = await cascadeRoute(candidates, noCaps, execute);
  assert.equal(r.outcome, "success");
  assert.equal(r.selected?.provider, "anthropic");
  assert.equal(r.attempts.length, 2);
  assert.equal(r.attempts[0].status, "failed");
  assert.equal(r.attempts[1].status, "succeeded");
});

test("all fail: returns all_failed", async () => {
  const candidates = [mkCandidate("a", "m1", 0.01), mkCandidate("b", "m2", 0.02)];
  const execute: ExecuteFn = async () => ({ ok: false, error: "down" });
  const r = await cascadeRoute(candidates, noCaps, execute);
  assert.equal(r.outcome, "all_failed");
  assert.equal(r.selected, undefined);
  assert.equal(r.attempts.length, 2);
  for (const a of r.attempts) assert.equal(a.status, "failed");
});

test("monthly quota: skip candidates that exceed cap", async () => {
  const candidates = [mkCandidate("a", "m1", 0.05), mkCandidate("b", "m2", 0.10)];
  const ctx: CascadeContext = {
    requestId: "r1",
    monthlyUsdSpent: 0.95,
    monthlyUsdCap: 1.00, // a: 0.95+0.05=1.00 ok; b: 0.95+0.10=1.05 over
    perRequestUsdCap: null,
  };
  const execute: ExecuteFn = async () => ({ ok: true });
  const r = await cascadeRoute(candidates, ctx, execute);
  assert.equal(r.outcome, "success");
  assert.equal(r.selected?.provider, "a");
  assert.equal(r.attempts[0].status, "succeeded");
});

test("quota exceeded (all skipped): returns quota_exceeded", async () => {
  const candidates = [mkCandidate("a", "m1", 0.20), mkCandidate("b", "m2", 0.30)];
  const ctx: CascadeContext = {
    requestId: "r1",
    monthlyUsdSpent: 0.90,
    monthlyUsdCap: 1.00,
    perRequestUsdCap: null,
  };
  const execute: ExecuteFn = async () => ({ ok: true });
  const r = await cascadeRoute(candidates, ctx, execute);
  assert.equal(r.outcome, "quota_exceeded");
  for (const a of r.attempts) assert.equal(a.status, "skipped_quota");
});

test("per-request cost ceiling: skip candidates over the limit", async () => {
  const candidates = [mkCandidate("a", "m1", 0.10), mkCandidate("b", "m2", 0.05)];
  const ctx: CascadeContext = {
    requestId: "r1",
    monthlyUsdSpent: 0,
    monthlyUsdCap: null,
    perRequestUsdCap: 0.07, // a: 0.10 over; b: 0.05 ok
  };
  const execute: ExecuteFn = async (c) => c.provider === "b" ? { ok: true } : { ok: false };
  const r = await cascadeRoute(candidates, ctx, execute);
  assert.equal(r.outcome, "success");
  assert.equal(r.selected?.provider, "b");
  assert.equal(r.attempts[0].status, "skipped_cost_ceiling");
  assert.equal(r.attempts[1].status, "succeeded");
});

test("execute throwing is caught and counted as failed", async () => {
  const candidates = [mkCandidate("a", "m1", 0.01), mkCandidate("b", "m2", 0.01)];
  const execute: ExecuteFn = async (c) => {
    if (c.provider === "a") throw new Error("boom");
    return { ok: true };
  };
  const r = await cascadeRoute(candidates, noCaps, execute);
  assert.equal(r.outcome, "success");
  assert.equal(r.selected?.provider, "b");
  assert.equal(r.attempts[0].status, "failed");
  assert.equal(r.attempts[0].error, "boom");
});

test("empty candidate list returns all_failed with no attempts", async () => {
  const r = await cascadeRoute([], noCaps, async () => ({ ok: true }));
  assert.equal(r.outcome, "all_failed");
  assert.equal(r.attempts.length, 0);
});
