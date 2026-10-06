import test from "node:test";
import assert from "node:assert/strict";

const { classifyFailure } = await import("../../src/app/api/providers/[id]/test/route.ts");

// The OAuth probe's own abort message is "Test timed out after Xs" (route.ts's
// AbortSignal.timeout handling), which contains "timed out" but not "timeout" —
// classifyFailure must classify it as network_error, not the generic upstream_error
// fallback, so a transient probe timeout doesn't paint the connection permanently red.
test("classifyFailure maps an OAuth-probe 'timed out' message to network_error", () => {
  const diagnosis = classifyFailure({
    error: "Test timed out after 30s",
    statusCode: null,
    provider: "some-oauth-provider",
  });

  assert.equal(diagnosis.type, "network_error");
  assert.equal(diagnosis.code, "network_error");
});

test("classifyFailure still maps the existing 'timeout' substring to network_error", () => {
  const diagnosis = classifyFailure({
    error: "connect ETIMEDOUT — timeout while probing upstream",
    statusCode: null,
    provider: "some-oauth-provider",
  });

  assert.equal(diagnosis.type, "network_error");
});
