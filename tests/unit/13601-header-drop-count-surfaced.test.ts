// #13601.2: when upstream response headers exceed the forwarding budget, the
// drop must be counted/surfaced to the caller — and diagnostic headers
// (request IDs, retry-after, rate-limit) must win the budget.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildStreamingResponseHeaders, resetDroppedHeaderWarnFingerprints } =
  await import("../../open-sse/handlers/chatCore/responseHeaders.ts");

const meta = {} as Parameters<typeof buildStreamingResponseHeaders>[1];
const silentLog = { warn: () => {}, debug: () => {} };

function budgetBustingHeaders(): Headers {
  return new Headers({
    "x-request-id": "req-123",
    "retry-after": "30",
    "x-ratelimit-remaining": "10",
    "x-drop-alpha": "a".repeat(600),
    "x-drop-beta": "b".repeat(600),
  });
}

test("#13601.2: a drop count header surfaces silent header drops to the caller", () => {
  resetDroppedHeaderWarnFingerprints();
  const headers = buildStreamingResponseHeaders(budgetBustingHeaders(), meta, silentLog);
  const countHeader = headers["X-OmniRoute-Dropped-Upstream-Headers"];
  assert.ok(countHeader !== undefined, "expected a dropped-headers count header");
  assert.ok(Number.parseInt(countHeader, 10) >= 1, `expected count >= 1, got ${countHeader}`);
});

test("#13601.2: diagnostic headers survive budget pressure", () => {
  resetDroppedHeaderWarnFingerprints();
  const headers = buildStreamingResponseHeaders(budgetBustingHeaders(), meta, silentLog);
  assert.equal(headers["x-request-id"], "req-123");
  assert.equal(headers["retry-after"], "30");
  assert.equal(headers["x-ratelimit-remaining"], "10");
});

test("#13601.2: no drops means no count header", () => {
  resetDroppedHeaderWarnFingerprints();
  const headers = buildStreamingResponseHeaders(
    new Headers({ "x-request-id": "req-1" }),
    meta,
    silentLog
  );
  assert.equal(headers["X-OmniRoute-Dropped-Upstream-Headers"], undefined);
});
