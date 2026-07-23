import test from "node:test";
import assert from "node:assert/strict";

const { parseRetryFromErrorText } = await import("../../open-sse/services/accountFallback.ts");

test("parseRetryFromErrorText reads nested ISO retryAfter from a 429 JSON body", () => {
  const futureIso = new Date(Date.now() + 120_000).toISOString();
  const waitMs = parseRetryFromErrorText(JSON.stringify({ error: { retryAfter: futureIso } }));
  assert.ok(waitMs !== null, "expected a parsed wait time, got null");
  assert.ok(Math.abs((waitMs as number) - 120_000) <= 2_000, `expected ~120000ms, got ${waitMs}`);
});

test("parseRetryFromErrorText reads top-level retryAfter when nested field is absent", () => {
  const futureIso = new Date(Date.now() + 60_000).toISOString();
  const waitMs = parseRetryFromErrorText(JSON.stringify({ retryAfter: futureIso }));
  assert.ok(waitMs !== null, "expected a parsed wait time, got null");
  assert.ok(Math.abs((waitMs as number) - 60_000) <= 2_000, `expected ~60000ms, got ${waitMs}`);
});

test("parseRetryFromErrorText reads millisecond retry hints from 429 JSON bodies", () => {
  assert.equal(parseRetryFromErrorText(JSON.stringify({ retry_after_ms: 45_000 })), 45_000);
  assert.equal(
    parseRetryFromErrorText(JSON.stringify({ error: { retry_after_ms: 12_000 } })),
    12_000
  );
  assert.equal(parseRetryFromErrorText(JSON.stringify({ retryAfterMs: 8_000 })), 8_000);
});

test("parseRetryFromErrorText ignores past ISO retryAfter values in JSON bodies", () => {
  const pastIso = new Date(Date.now() - 60_000).toISOString();
  assert.equal(parseRetryFromErrorText(JSON.stringify({ error: { retryAfter: pastIso } })), null);
});
