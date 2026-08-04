/**
 * TDD repro probe for issue #6692 — "Combo session stickiness never releases a
 * credits-exhausted account (failover stops working)".
 *
 * Root cause (verified by code read): applySessionStickiness's ONLY eligibility
 * gate for keeping a sticky pin was a 5h/weekly usage-PERCENTAGE headroom check
 * (open-sse/services/combo/sessionStickiness.ts). It never inspected connection
 * testStatus / rateLimitedUntil / terminal state. clearStickyBinding()
 * (sessionStickiness.ts) had zero call sites anywhere in combo.ts's failure/
 * retry path (confirmed via repo-wide grep) — only the two internal branches
 * inside applySessionStickiness itself (connection missing from pool, or low
 * headroom) ever cleared a binding.
 *
 * This test reproduces the reported symptom using ONLY the real, exported
 * sessionStickiness.ts API, driven exactly the way combo.ts drives it in
 * production:
 *   - recordStickyBinding() is called after a SUCCESSFUL turn (mirrors
 *     combo.ts:1879 / combo.ts:2830).
 *   - The bound connection's 5h/weekly utilization is healthy (fresh windows),
 *     exactly as it would be for an account that is durably dead for a reason
 *     ORTHOGONAL to 5h/weekly utilization (credits_exhausted / banned / a
 *     per-day soft cap — reporter #2's exact scenario).
 *   - The connection-health fetcher (the fix's new injectable seam, mirroring
 *     __setStickinessHeadroomFetcherForTests) reports the bound connection as
 *     credits_exhausted — exactly what a real provider_connections row would
 *     report once markAccountUnavailable() has classified the terminal error.
 *
 * Expected (correct) behavior: once a sticky-bound connection is known
 * terminally unhealthy, the pin must release and failover must move to the
 * next healthy target.
 *
 * Actual (BEFORE the fix): applySessionStickiness re-promoted the dead
 * connection anyway, because headroom was the only gate it consulted — this
 * test failed RED on the pre-fix code (result.stuck === true, dead connection
 * stayed at position 0).
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { HeadroomSaturation } from "../../open-sse/services/combo/headroomRanking.ts";
import type { StickyConnectionHealth } from "../../open-sse/services/combo/sessionStickiness.ts";

const mod = await import("../../open-sse/services/combo/sessionStickiness.ts");
const {
  deriveMessageHash,
  applySessionStickiness,
  recordStickyBinding,
  clearAllStickyBindings,
  __setStickinessHeadroomFetcherForTests,
  __setStickinessConnectionFetcherForTests,
} = mod;

function makeTarget(
  connectionId: string
): import("../../open-sse/services/combo/types.ts").ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${connectionId}`,
    executionKey: `key-${connectionId}`,
    modelStr: `gpt-4/${connectionId}`,
    provider: "openai",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };
}

function injectSat(sat: HeadroomSaturation | undefined): void {
  __setStickinessHeadroomFetcherForTests(async (_id: string) => sat);
}

function injectConnectionHealth(byId: Record<string, StickyConnectionHealth | undefined>): void {
  __setStickinessConnectionFetcherForTests(async (connectionId: string) => byId[connectionId]);
}

test.beforeEach(() => {
  clearAllStickyBindings();
});

test.after(() => {
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
});

test("BUG #6692: sticky pin survives a terminal (credits_exhausted) account — headroom-only gate keeps re-promoting the dead connection instead of failing over", async () => {
  // Healthy 5h/weekly utilization (fresh windows) — exactly what a
  // credits_exhausted / banned / daily-soft-capped account reports on THESE
  // axes, since the terminal state is orthogonal to 5h/weekly percentage
  // utilization (issue #6692, both reporters).
  injectSat({ util5h: 0.05, util7d: 0.05 }); // headroom = 0.95, well above threshold

  // The bound connection is durably dead (credits_exhausted); the fallback
  // connection is unknown to the health fetcher (fail-open → healthy).
  injectConnectionHealth({ "conn-exhausted": { testStatus: "credits_exhausted" } });

  // Upstream strategy ordering already ranks conn-healthy first (a terminally
  // dead account naturally scores worse on the normal ordering signals too) —
  // conn-exhausted is only ever tried first because the sticky pin FORCE-
  // PROMOTES it. That force-promotion, not the base ordering, is the bug.
  const targets = [makeTarget("conn-healthy"), makeTarget("conn-exhausted")];
  const messages = [{ role: "user", content: "Multi-turn conversation, turn 1" }];
  const hash = deriveMessageHash(messages)!;
  assert.ok(hash, "hash must be derivable");

  // Turn 1 (production: combo.ts success branch, e.g. combo.ts:1879):
  // conn-exhausted served the first turn successfully → sticky-bound.
  recordStickyBinding(hash, "conn-exhausted");

  // Turn 2 (production): conn-exhausted now returns credits_exhausted /
  // banned / a masked daily-cap refusal — the provider_connections row is
  // updated by markAccountUnavailable() with testStatus=credits_exhausted,
  // which the injected connection-health fetcher above simulates.

  // Turn 3 (production): the next request in the same conversation calls
  // applySessionStickiness() again. Desired behavior: the terminally dead
  // connection must NOT be re-promoted over the naturally-better ordering.
  const result = await applySessionStickiness(targets, messages);

  assert.equal(
    result.stuck,
    false,
    "sticky pin must release once the bound connection is terminally exhausted, " +
      "not only when 5h/weekly headroom is low (issue #6692)"
  );
  assert.equal(
    result.targets[0].connectionId,
    "conn-healthy",
    "the terminally dead sticky pin must NOT be force-promoted over the naturally-ordered healthy target"
  );
});

test("BUG #6692 (rate-limited variant): sticky pin releases while the bound connection is still inside its rateLimitedUntil window", async () => {
  injectSat({ util5h: 0.05, util7d: 0.05 });
  const future = new Date(Date.now() + 60_000).toISOString();
  injectConnectionHealth({ "conn-cooling": { rateLimitedUntil: future } });

  const targets = [makeTarget("conn-healthy"), makeTarget("conn-cooling")];
  const messages = [{ role: "user", content: "Another conversation" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-cooling");

  const result = await applySessionStickiness(targets, messages);

  assert.equal(result.stuck, false, "pin must release while the connection is still cooling down");
  assert.equal(result.targets[0].connectionId, "conn-healthy");
});

test("healthy sticky connection (unknown to the connection-health fetcher) still stays pinned — fail-open preserved", async () => {
  injectSat({ util5h: 0.05, util7d: 0.05 });
  injectConnectionHealth({}); // unknown connection → fail-open → not terminal

  const targets = [makeTarget("conn-a"), makeTarget("conn-b")];
  const messages = [{ role: "user", content: "Healthy conversation" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-a");

  const result = await applySessionStickiness(targets, messages);

  assert.equal(result.stuck, true, "a healthy/unknown connection must remain pinned");
  assert.equal(result.targets[0].connectionId, "conn-a");
});
