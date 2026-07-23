/**
 * TDD repro/regression test for issue #7387 — combo-level session stickiness
 * (open-sse/services/combo/sessionStickiness.ts) never checks per-window
 * quota exhaustion (src/domain/quotaCache.ts::isAccountQuotaExhausted) before
 * re-promoting a bound connection back to position 0 of the target list.
 *
 * The provider-level session-affinity pin (src/sse/services/sessionAffinityPin.ts)
 * already gates on isAccountQuotaExhausted() correctly — sessionStickiness.ts
 * is the one place that forgot it, only checking testStatus
 * (credits_exhausted/banned/expired) and rateLimitedUntil.
 *
 * Expected (correct) behavior: once a sticky-bound connection's quota is
 * exhausted (per quotaCache, independent of testStatus/rateLimitedUntil), the
 * pin must release and the healthy target takes position 0.
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { HeadroomSaturation } from "../../open-sse/services/combo/headroomRanking.ts";
import type { StickyConnectionHealth } from "../../open-sse/services/combo/sessionStickiness.ts";

const stickinessMod = await import("../../open-sse/services/combo/sessionStickiness.ts");
const {
  deriveMessageHash,
  applySessionStickiness,
  recordStickyBinding,
  clearAllStickyBindings,
  __setStickinessHeadroomFetcherForTests,
  __setStickinessConnectionFetcherForTests,
} = stickinessMod;

const quotaCacheMod = await import("../../src/domain/quotaCache.ts");
const { setQuotaCache, isAccountQuotaExhausted, __clearForTests } = quotaCacheMod;

function makeTarget(connectionId: string) {
  return {
    kind: "model",
    stepId: `step-${connectionId}`,
    executionKey: `key-${connectionId}`,
    modelStr: `codex/gpt-5-codex/${connectionId}`,
    provider: "codex",
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
  };
}

function injectSat(sat: HeadroomSaturation | undefined) {
  __setStickinessHeadroomFetcherForTests(async (_id: string) => sat);
}

function injectConnectionHealth(byId: Record<string, StickyConnectionHealth | undefined>) {
  __setStickinessConnectionFetcherForTests(async (connectionId: string) => byId[connectionId]);
}

test.beforeEach(() => {
  clearAllStickyBindings();
  __clearForTests();
});

test.after(() => {
  __setStickinessHeadroomFetcherForTests(null);
  __setStickinessConnectionFetcherForTests(null);
  __clearForTests();
});

test("#7387: sticky pin releases a QUOTA-EXHAUSTED account whose testStatus/rateLimitedUntil are still healthy", async () => {
  injectSat({ util5h: 0.05, util7d: 0.05 }); // headroom well above threshold
  injectConnectionHealth({
    "conn-codex-exhausted": { testStatus: "active", rateLimitedUntil: null },
  });

  setQuotaCache("conn-codex-exhausted", "codex", {
    session: { remainingPercentage: 0, resetAt: null },
    weekly: { remainingPercentage: 0, resetAt: null },
  });
  assert.equal(isAccountQuotaExhausted("conn-codex-exhausted"), true);

  const targets = [makeTarget("conn-healthy"), makeTarget("conn-codex-exhausted")];
  const messages = [{ role: "user", content: "Multi-turn Codex conversation, turn 1" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-codex-exhausted"); // turn 1: served successfully

  const result = await applySessionStickiness(targets, messages); // turn 2+: quota now exhausted

  assert.equal(result.stuck, false, "sticky pin must release once quota is exhausted (#7387)");
  assert.equal(result.targets[0].connectionId, "conn-healthy");
});

test("#7387: sticky pin stays bound when the connection is healthy and NOT quota-exhausted", async () => {
  injectSat({ util5h: 0.05, util7d: 0.05 });
  injectConnectionHealth({
    "conn-codex-ok": { testStatus: "active", rateLimitedUntil: null },
  });

  const targets = [makeTarget("conn-other"), makeTarget("conn-codex-ok")];
  const messages = [{ role: "user", content: "Multi-turn Codex conversation, turn 1 (healthy)" }];
  const hash = deriveMessageHash(messages)!;

  recordStickyBinding(hash, "conn-codex-ok");

  const result = await applySessionStickiness(targets, messages);

  assert.equal(result.stuck, true);
  assert.equal(result.targets[0].connectionId, "conn-codex-ok");
});
