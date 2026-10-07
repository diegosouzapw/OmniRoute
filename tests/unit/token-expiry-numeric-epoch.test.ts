import { describe, it } from "node:test";
import assert from "node:assert/strict";

// We import the exported helper directly. The module auto-starts the
// health-check timer on import, so we stop it immediately.
import { parseTokenExpiryMs, stopTokenHealthCheck } from "../../src/lib/tokenHealthCheck.ts";

stopTokenHealthCheck();

/**
 * Regression guard: `provider_connections.expires_at` is a TEXT column, so an
 * epoch timestamp always reads back as a string. `new Date("1789012345678")`
 * is an Invalid Date, and an epoch-seconds *number* parsed as milliseconds
 * lands in 1970 — both break the expiry-driven refresh in checkConnection():
 *
 *   - NaN  -> getEffectiveTokenExpiryMs() returns 0 -> hasKnownExpiry false.
 *     For a ROTATING_REFRESH_PROVIDERS entry (codex, claude, kiro, openai, …)
 *     shouldRefreshByInterval is false too, so the connection is never
 *     refreshed at all.
 *   - 1970 -> isAboutToExpire is permanently true, so every sweep refreshes
 *     the connection, burning refresh-token rotations.
 *
 * The sibling Copilot helper already handled both shapes; this asserts the
 * single shared parser does the same for every connection.
 */
describe("parseTokenExpiryMs", () => {
  const MS = Date.parse("2026-09-12T12:00:00.000Z");
  const SECONDS = Math.floor(MS / 1000);

  it("parses epoch milliseconds as a number", () => {
    assert.equal(parseTokenExpiryMs(MS), MS);
  });

  it("parses epoch seconds as a number", () => {
    assert.equal(parseTokenExpiryMs(SECONDS), SECONDS * 1000);
  });

  it("parses epoch milliseconds given as a string", () => {
    assert.equal(parseTokenExpiryMs(String(MS)), MS);
  });

  it("parses epoch seconds given as a string", () => {
    assert.equal(parseTokenExpiryMs(String(SECONDS)), SECONDS * 1000);
  });

  it("parses an ISO 8601 string", () => {
    assert.equal(parseTokenExpiryMs("2026-09-12T12:00:00.000Z"), MS);
  });

  it("returns 0 for values that carry no usable time", () => {
    assert.equal(parseTokenExpiryMs(null), 0);
    assert.equal(parseTokenExpiryMs(undefined), 0);
    assert.equal(parseTokenExpiryMs(""), 0);
    assert.equal(parseTokenExpiryMs("   "), 0);
    assert.equal(parseTokenExpiryMs("not-a-date"), 0);
    assert.equal(parseTokenExpiryMs(0), 0);
    assert.equal(parseTokenExpiryMs(Number.NaN), 0);
    assert.equal(parseTokenExpiryMs({}), 0);
  });
});
