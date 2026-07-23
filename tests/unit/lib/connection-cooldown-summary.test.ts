/**
 * TDD for F5.1 (Combo U1b Slice 2) — summarizeConnectionCooldown: aggregates the
 * per-connection cooldown state (`rateLimitedUntil`) into a per-provider summary the
 * cascade can badge, exposed by GET /api/monitoring/health as `connectionHealth`.
 *
 * Parsing of rateLimitedUntil is delegated to cooldownUntilMs (#3954) — it accepts
 * ISO strings, Date objects, AND numeric epoch strings (the SQLite TEXT-affinity case).
 *
 * Run: node --import tsx/esm --test tests/unit/monitoring/connection-cooldown-summary.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { summarizeConnectionCooldown } from "../../../src/lib/monitoring/observability.ts";

const NOW = 1_000_000_000_000;

describe("summarizeConnectionCooldown", () => {
  it("returns an empty map for no connections", () => {
    assert.deepEqual(summarizeConnectionCooldown([], NOW), {});
  });

  it("omits providers whose connections are all available (no future rateLimitedUntil)", () => {
    const out = summarizeConnectionCooldown(
      [
        { provider: "openai", rateLimitedUntil: null },
        { provider: "openai", rateLimitedUntil: new Date(NOW - 5000).toISOString() }, // past → expired
      ],
      NOW
    );
    assert.deepEqual(out, {});
  });

  it("reports coolingDown / total / soonestRetryAfterMs for a provider with cooling connections", () => {
    const out = summarizeConnectionCooldown(
      [
        { provider: "anthropic", rateLimitedUntil: new Date(NOW + 28_000).toISOString() },
        { provider: "anthropic", rateLimitedUntil: new Date(NOW + 60_000).toISOString() },
        { provider: "anthropic", rateLimitedUntil: null }, // available
      ],
      NOW
    );
    assert.ok(out.anthropic);
    assert.equal(out.anthropic.coolingDown, 2);
    assert.equal(out.anthropic.total, 3);
    assert.equal(
      out.anthropic.soonestRetryAfterMs,
      28_000,
      "soonest = the connection that recovers first"
    );
  });

  it("parses numeric-epoch-string rateLimitedUntil (SQLite TEXT-affinity, #3954)", () => {
    const out = summarizeConnectionCooldown(
      [{ provider: "glm", rateLimitedUntil: String(NOW + 15_000) }],
      NOW
    );
    assert.ok(out.glm);
    assert.equal(out.glm.coolingDown, 1);
    assert.equal(out.glm.soonestRetryAfterMs, 15_000);
  });

  it("accepts a raw epoch number too", () => {
    const out = summarizeConnectionCooldown(
      [{ provider: "glm", rateLimitedUntil: NOW + 9000 }],
      NOW
    );
    assert.equal(out.glm?.soonestRetryAfterMs, 9000);
  });

  it("groups connections per provider independently", () => {
    const out = summarizeConnectionCooldown(
      [
        { provider: "openai", rateLimitedUntil: new Date(NOW + 10_000).toISOString() },
        { provider: "anthropic", rateLimitedUntil: new Date(NOW + 40_000).toISOString() },
        { provider: "openai", rateLimitedUntil: null },
      ],
      NOW
    );
    assert.equal(out.openai.coolingDown, 1);
    assert.equal(out.openai.total, 2);
    assert.equal(out.anthropic.coolingDown, 1);
    assert.equal(out.anthropic.total, 1);
  });

  it("ignores connections without a provider and never returns negative retry", () => {
    const out = summarizeConnectionCooldown(
      [
        { rateLimitedUntil: new Date(NOW + 5000).toISOString() }, // no provider
        { provider: "x", rateLimitedUntil: new Date(NOW + 1).toISOString() },
      ],
      NOW
    );
    assert.equal(Object.keys(out).length, 1);
    assert.ok(out.x.soonestRetryAfterMs >= 0);
  });
});
