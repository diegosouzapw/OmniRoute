import test from "node:test";
import assert from "node:assert/strict";

import { classifyKiroSocialPoll, getNextKiroSocialPollInterval } from "@/lib/oauth/kiroSocialPoll";

test("slow_down permanently increases the polling interval for this authorization flow", () => {
  const slowed = getNextKiroSocialPollInterval(5_000, "slow_down");
  assert.equal(slowed, 10_000);
  assert.equal(getNextKiroSocialPollInterval(slowed, "authorization_pending"), 10_000);
  assert.equal(getNextKiroSocialPollInterval(slowed, "network_error"), 10_000);
});

test("classifyKiroSocialPoll keeps only documented pending states retryable", () => {
  assert.deepEqual(classifyKiroSocialPoll(false, 400, { error: "authorization_pending" }), {
    kind: "pending",
    error: "authorization_pending",
  });
  assert.deepEqual(classifyKiroSocialPoll(false, 429, { error: "slow_down" }), {
    kind: "pending",
    error: "slow_down",
  });
});

test("classifyKiroSocialPoll stops on denied, expired and malformed responses", () => {
  assert.deepEqual(classifyKiroSocialPoll(false, 403, { error: "access_denied" }), {
    kind: "error",
    error: "access_denied",
    status: 403,
  });
  assert.deepEqual(classifyKiroSocialPoll(true, 200, { error: "expired_token" }), {
    kind: "error",
    error: "expired_token",
    status: 400,
  });
  assert.deepEqual(classifyKiroSocialPoll(true, 200, {}), {
    kind: "error",
    error: "invalid_token_response",
    status: 502,
  });
});

test("classifyKiroSocialPoll accepts a token response", () => {
  assert.deepEqual(classifyKiroSocialPoll(true, 200, { accessToken: "token" }), {
    kind: "success",
  });
});
