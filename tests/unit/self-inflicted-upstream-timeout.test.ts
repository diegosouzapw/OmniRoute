import test from "node:test";
import assert from "node:assert/strict";

const { isSelfInflictedUpstreamTimeout } = await import(
  "../../open-sse/handlers/chatCore/cooldownClassification.ts"
);

test("504 + upstream_timeout on a non-antigravity provider is self-inflicted (skip cooldown)", () => {
  assert.equal(isSelfInflictedUpstreamTimeout(504, "upstream_timeout", "claude"), true);
  assert.equal(isSelfInflictedUpstreamTimeout(504, "upstream_timeout", "openai"), true);
});

test("antigravity keeps its own pre-response-timeout cooldown policy", () => {
  assert.equal(isSelfInflictedUpstreamTimeout(504, "upstream_timeout", "antigravity"), false);
});

test("a real provider 5xx / 429 is NOT a self-inflicted timeout", () => {
  assert.equal(isSelfInflictedUpstreamTimeout(502, "server_error", "claude"), false);
  assert.equal(isSelfInflictedUpstreamTimeout(500, undefined, "claude"), false);
  assert.equal(isSelfInflictedUpstreamTimeout(429, "rate_limit", "claude"), false);
});

test("a 504 without the upstream_timeout tag is NOT self-inflicted", () => {
  assert.equal(isSelfInflictedUpstreamTimeout(504, undefined, "claude"), false);
  assert.equal(isSelfInflictedUpstreamTimeout(504, null, "claude"), false);
  assert.equal(isSelfInflictedUpstreamTimeout(504, "authentication_error", "claude"), false);
});
