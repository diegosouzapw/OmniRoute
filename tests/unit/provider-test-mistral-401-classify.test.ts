import test from "node:test";
import assert from "node:assert/strict";

const { classifyFailure } = await import("../../src/app/api/providers/[id]/test/route.ts");

test("#7638: a Mistral ambiguous 401 (contentless body) should not be asserted as a hard auth_failed", () => {
  const d = classifyFailure({
    error: '{"detail":"Unauthorized"}',
    statusCode: 401,
    provider: "mistral",
  });
  assert.notEqual(d.type, "upstream_auth_error");
});

test("#7638 baseline: a non-Mistral bare 401 still correctly classifies as upstream_auth_error", () => {
  const d = classifyFailure({ error: '{"detail":"Unauthorized"}', statusCode: 401 });
  assert.equal(d.type, "upstream_auth_error");
});

test("#7638: a Mistral 401 with an explicit auth-signal message still classifies as upstream_auth_error", () => {
  const d = classifyFailure({
    error: "Invalid API key",
    statusCode: 401,
    provider: "mistral",
  });
  assert.equal(d.type, "upstream_auth_error");
});
