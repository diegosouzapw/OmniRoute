/**
 * ccp pin health gate — drop a context-cache pin when its provider is DURABLY
 * down so the session fails over instead of pounding a dead account, while
 * tolerating transient cooldowns so an unstable provider does not churn the pin.
 *
 * Incident 2026-06-22: a session pinned to a throttled/credits-exhausted account
 * stayed pinned forever (strategy bypassed, no failover) because the pin was only
 * dropped when the model LEFT the combo, never on connection health.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { pinIsDurablyUnhealthy } from "../../open-sse/services/combo.ts";

const NOW = 1_900_000_000_000;
const opts = { backoffLevel: 2, graceMs: 20_000 };
const healthy = { testStatus: "active", backoffLevel: 0, rateLimitedUntil: null };

test("keeps pin when a healthy connection exists", () => {
  assert.equal(pinIsDurablyUnhealthy("CLOSED", [healthy], NOW, opts), false);
});

test("drops pin when circuit is OPEN", () => {
  assert.equal(pinIsDurablyUnhealthy("OPEN", [healthy], NOW, opts), true);
});

test("drops pin when there are no active connections", () => {
  assert.equal(pinIsDurablyUnhealthy("CLOSED", [], NOW, opts), true);
});

test("drops pin when the only connection has credits exhausted (terminal)", () => {
  const conn = { testStatus: "credits_exhausted", backoffLevel: 0, rateLimitedUntil: null };
  assert.equal(pinIsDurablyUnhealthy("CLOSED", [conn], NOW, opts), true);
});

test("drops pin on banned/expired terminal status", () => {
  assert.equal(
    pinIsDurablyUnhealthy("CLOSED", [{ testStatus: "banned", backoffLevel: 0 }], NOW, opts),
    true
  );
  assert.equal(
    pinIsDurablyUnhealthy("CLOSED", [{ testStatus: "expired", backoffLevel: 0 }], NOW, opts),
    true
  );
});

test("drops pin once backoffLevel reaches the threshold (repeated failures)", () => {
  assert.equal(
    pinIsDurablyUnhealthy("CLOSED", [{ testStatus: "active", backoffLevel: 2 }], NOW, opts),
    true
  );
});

test("anti-flap: keeps pin on a brief transient cooldown (low backoff, short rate-limit)", () => {
  const conn = {
    testStatus: "active",
    backoffLevel: 1,
    rateLimitedUntil: new Date(NOW + 4_000).toISOString(), // 4s out — within grace
  };
  assert.equal(pinIsDurablyUnhealthy("CLOSED", [conn], NOW, opts), false);
});

test("drops pin on a long rate-limit window (beyond grace)", () => {
  const conn = {
    testStatus: "active",
    backoffLevel: 0,
    rateLimitedUntil: new Date(NOW + 60_000).toISOString(), // 60s out — durable
  };
  assert.equal(pinIsDurablyUnhealthy("CLOSED", [conn], NOW, opts), true);
});

test("keeps pin if ANY connection is usable (terminal + healthy mix)", () => {
  const conns = [
    { testStatus: "credits_exhausted", backoffLevel: 0 },
    healthy,
  ];
  assert.equal(pinIsDurablyUnhealthy("CLOSED", conns, NOW, opts), false);
});
