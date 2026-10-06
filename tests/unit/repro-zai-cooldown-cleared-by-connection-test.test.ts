/**
 * Regression: the connection TEST path cleared a still-active cooldown.
 *
 * Sibling of repro-zai-cooldown-cleared-by-quota-poll.test.ts — same symptom,
 * a different writer. testSingleConnection() (src/app/api/providers/[id]/test/
 * route.ts) built its update payload as:
 *
 *   testStatus:       result.valid ? "active" : "error",
 *   rateLimitedUntil: result.valid ? null : connection.rateLimitedUntil || null,
 *
 * so ANY successful probe wiped the persisted cooldown. That probe is not a
 * chat call — it is a cheap auth/models validation that never touches the chat
 * quota a weekly cap applies to, so it succeeds even while the weekly window is
 * exhausted. The credential-health scheduler (src/lib/credentialHealth/
 * scheduler.ts) runs it against every connection 30s after startup and every
 * 300s thereafter.
 *
 * Observed in production (2026-08-23) right after deploying the ISO-reset /
 * pre-skip / crash-clear patch: the GLM connection carried a valid future
 * rate_limited_until, "[CredentialHealth] Testing 10/10 connections..." ran,
 * and the row came back testStatus="active", rate_limited_until=NULL — so combo
 * dispatched zai/glm-5.3 straight back into the same weekly 429. This writer
 * alone defeats every other cooldown fix.
 *
 * The gate is shouldClearErrorStateOnValidProbe(): a future rateLimitedUntil is
 * the 429 handler's hard statement and a credential probe may not overrule it.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  hasActiveCooldown,
  shouldClearErrorStateOnValidProbe,
} from "../../src/lib/usage/providerLimits.ts";

const HOUR_MS = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 7, 23, 21, 47, 0); // 2026-08-23 21:47 UTC

/** The production row: zai/glm-5.3 held until the weekly reset on 2026-08-29. */
const GLM_COOLDOWN = { rateLimitedUntil: "2026-08-29T21:01:21.000Z" };

describe("connection test must not clear an active cooldown", () => {
  it("keeps the GLM weekly cooldown when the credential probe succeeds", () => {
    assert.equal(hasActiveCooldown(GLM_COOLDOWN, NOW), true);
    assert.equal(shouldClearErrorStateOnValidProbe(GLM_COOLDOWN, true, NOW), false);
  });

  it("keeps a cooldown that is only one second away from elapsing", () => {
    const conn = { rateLimitedUntil: new Date(NOW + 1000).toISOString() };
    assert.equal(shouldClearErrorStateOnValidProbe(conn, true, NOW), false);
  });

  it("clears the error state once the cooldown has elapsed", () => {
    const conn = { rateLimitedUntil: new Date(NOW - 1000).toISOString() };
    assert.equal(shouldClearErrorStateOnValidProbe(conn, true, NOW), true);
  });

  it("clears the error state at the exact reset instant", () => {
    const conn = { rateLimitedUntil: new Date(NOW).toISOString() };
    assert.equal(shouldClearErrorStateOnValidProbe(conn, true, NOW), true);
  });

  it("clears the error state for a connection with no cooldown", () => {
    assert.equal(shouldClearErrorStateOnValidProbe({ rateLimitedUntil: null }, true, NOW), true);
    assert.equal(
      shouldClearErrorStateOnValidProbe({ rateLimitedUntil: undefined }, true, NOW),
      true
    );
  });

  it("never clears on a FAILED probe, cooldown or not", () => {
    assert.equal(shouldClearErrorStateOnValidProbe(GLM_COOLDOWN, false, NOW), false);
    assert.equal(shouldClearErrorStateOnValidProbe({ rateLimitedUntil: null }, false, NOW), false);
  });

  it("fails open on an unparseable timestamp so a broken value cannot strand a connection", () => {
    const conn = { rateLimitedUntil: "not-a-date" };
    assert.equal(hasActiveCooldown(conn, NOW), false);
    assert.equal(shouldClearErrorStateOnValidProbe(conn, true, NOW), true);
  });

  it("honours a numeric-epoch timestamp (the chat path writes epoch ms)", () => {
    const conn = { rateLimitedUntil: String(NOW + 146 * HOUR_MS) };
    assert.equal(shouldClearErrorStateOnValidProbe(conn, true, NOW), false);
  });
});
