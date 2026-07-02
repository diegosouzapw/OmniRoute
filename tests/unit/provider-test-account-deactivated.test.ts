import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1444: a Codex connection whose OAuth refresh is
// fully healthy but whose ChatGPT account has been deactivated by OpenAI returns a
// 401 from the Codex API. The connection test labeled that the same as a revoked
// token ("Token invalid or revoked" → upstream_auth_error), so the operator couldn't
// tell a deactivated account from a bad token. A deactivation message now classifies
// as `account_deactivated`, which the dashboard already renders as "Account Deactivated".
const { classifyFailure } = await import("../../src/app/api/providers/[id]/test/route.ts");

test("#1444: a deactivation message classifies as account_deactivated", () => {
  const d = classifyFailure({
    error: "Your account has been deactivated. Please contact support.",
    statusCode: 401,
  });
  assert.equal(d.type, "account_deactivated");
});

test("#1444: a plain 401 still classifies as upstream_auth_error", () => {
  const d = classifyFailure({ error: "Token invalid or revoked", statusCode: 401 });
  assert.equal(d.type, "upstream_auth_error");
});
