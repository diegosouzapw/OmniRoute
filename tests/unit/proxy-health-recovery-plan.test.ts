/**
 * Recovery planning is motive-filtered, not status-filtered: only an
 * `ip_quota_429` entry is ever planned. A `proxy_unreachable` entry is
 * excluded even when a 429 was observed for the same key, and null keys
 * (opaque entries) are never tested. Oldest set-aside first, hard volume cap.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { planRecoveryProbes } = await import("../../src/lib/proxyHealth/scheduler.ts");

const LIMITS = { maxCandidates: 10, durationMs: 60_000, concurrency: 2 };

test("only ip_quota_429 entries are planned", () => {
  const planned = planRecoveryProbes(
    [
      { key: "http://u@h1:8080", kind: "ip_quota_429", setAsideAt: 1000 },
      { key: "http://u@h2:8080", kind: "proxy_unreachable", setAsideAt: 500 },
    ],
    LIMITS
  );
  assert.deepEqual(planned.map((c) => c.key), ["http://u@h1:8080"]);
});

test("proxy_unreachable is excluded even with a 429 observed for the same key", () => {
  const planned = planRecoveryProbes(
    [{ key: "http://u@h:8080", kind: "proxy_unreachable", setAsideAt: 1000 }],
    LIMITS
  );
  assert.deepEqual(planned, []);
});

test("null keys are never planned", () => {
  const planned = planRecoveryProbes(
    [
      { key: null, kind: "ip_quota_429", setAsideAt: 1000 },
      { key: "http://u@h:8080", kind: "ip_quota_429", setAsideAt: 2000 },
    ],
    LIMITS
  );
  assert.deepEqual(planned.map((c) => c.key), ["http://u@h:8080"]);
});

test("oldest set-aside first, cut at maxCandidates", () => {
  const planned = planRecoveryProbes(
    [
      { key: "http://u@c:8080", kind: "ip_quota_429", setAsideAt: 3000 },
      { key: "http://u@a:8080", kind: "ip_quota_429", setAsideAt: 1000 },
      { key: "http://u@b:8080", kind: "ip_quota_429", setAsideAt: 2000 },
    ],
    { ...LIMITS, maxCandidates: 2 }
  );
  assert.deepEqual(planned.map((c) => c.key), ["http://u@a:8080", "http://u@b:8080"]);
});
