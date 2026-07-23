/**
 * Codex multi-account cascade — defense-in-depth refresh spacing (Fix #2).
 *
 * Serialization (concurrency=1 per Auth0 family) already stops OVERLAPPING
 * refreshes. Spacing adds a settle gap BETWEEN two consecutive sibling refreshes
 * so the second account never presents a refresh_token that Auth0 is still
 * rotating for the family (the `refresh_token_reused` race, openai/codex#9648).
 *
 * Two invariants:
 *  - The gap is only paid when a sibling is already queued behind us. A lone
 *    refresh — the common reactive case during a real request — is released
 *    immediately, so we add ZERO latency to user traffic.
 *  - The gap has a protective non-zero default, is tunable via
 *    CODEX_REFRESH_SPACING_MS, and can be disabled with "0".
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeRefresh,
  getRefreshSpacingMs,
  __resetRefreshSerializerForTest,
} from "../../open-sse/services/refreshSerializer.ts";

const ENV = "CODEX_REFRESH_SPACING_MS";

function withEnv(value: string | undefined, fn: () => void | Promise<void>) {
  const prev = process.env[ENV];
  if (value === undefined) delete process.env[ENV];
  else process.env[ENV] = value;
  __resetRefreshSerializerForTest();
  const restore = () => {
    if (prev === undefined) delete process.env[ENV];
    else process.env[ENV] = prev;
    __resetRefreshSerializerForTest();
  };
  return Promise.resolve()
    .then(fn)
    .finally(restore);
}

test("getRefreshSpacingMs defaults to a protective non-zero gap, honors overrides and explicit opt-out", () => {
  const prev = process.env[ENV];
  try {
    delete process.env[ENV];
    assert.equal(getRefreshSpacingMs(), 2000, "unset -> protective default");
    process.env[ENV] = "0";
    assert.equal(getRefreshSpacingMs(), 0, "explicit 0 -> opt out");
    process.env[ENV] = "750";
    assert.equal(getRefreshSpacingMs(), 750, "explicit value honored");
    process.env[ENV] = "not-a-number";
    assert.equal(getRefreshSpacingMs(), 2000, "garbage -> protective default");
  } finally {
    if (prev === undefined) delete process.env[ENV];
    else process.env[ENV] = prev;
  }
});

test("a lone rotating refresh is released immediately (no added latency on the reactive request path)", async () => {
  await withEnv("1000", async () => {
    const start = Date.now();
    await serializeRefresh("codex", async () => "ok");
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 400, `a lone refresh must not pay the spacing gap; took ${elapsed}ms`);
  });
});

test("queued sibling refreshes in the same group are spaced apart by the configured gap", async () => {
  await withEnv("120", async () => {
    const starts: number[] = [];
    const run = () =>
      serializeRefresh("codex", async () => {
        starts.push(Date.now());
      });
    await Promise.all([run(), run()]);
    assert.equal(starts.length, 2, "both refreshes ran");
    const gap = starts[1] - starts[0];
    assert.ok(gap >= 100, `the second sibling must start after the gap; gap was ${gap}ms`);
  });
});
