import test from "node:test";
import assert from "node:assert/strict";

const { isCloudflareChallenge, looksLikeSse, TlsClientUnavailableError } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

// Regression for #2459: a Cloudflare 403 challenge page must be distinguishable from a
// genuine auth failure so the executor/validator can surface an actionable error.

test("#2459 isCloudflareChallenge detects 'Just a moment' interstitial", () => {
  assert.equal(isCloudflareChallenge("<html><title>Just a moment...</title></html>"), true);
});

test("#2459 isCloudflareChallenge detects window._cf_chl_opt", () => {
  assert.equal(isCloudflareChallenge("<script>window._cf_chl_opt={};</script>"), true);
});

test("#2459 isCloudflareChallenge detects challenges.cloudflare.com", () => {
  assert.equal(isCloudflareChallenge('src="https://challenges.cloudflare.com/turnstile"'), true);
});

test("#2459 isCloudflareChallenge returns false for normal JSON / SSE / empty", () => {
  assert.equal(isCloudflareChallenge('{"status":"ok"}'), false);
  assert.equal(isCloudflareChallenge('data: {"text":"hi"}\n\n'), false);
  assert.equal(isCloudflareChallenge(""), false);
  assert.equal(isCloudflareChallenge(null), false);
  assert.equal(isCloudflareChallenge(undefined), false);
});

test("#2459 looksLikeSse positive for data/event markers, negative for HTML", () => {
  assert.equal(looksLikeSse("data: {}\n\n"), true);
  assert.equal(looksLikeSse("event: message\n"), true);
  assert.equal(looksLikeSse(": comment"), true);
  assert.equal(looksLikeSse("<html>Just a moment</html>"), false);
  assert.equal(looksLikeSse('{"json":true}'), false);
});

test("#2459 TlsClientUnavailableError has the expected name", () => {
  const err = new TlsClientUnavailableError("native binary missing");
  assert.equal(err.name, "TlsClientUnavailableError");
  assert.ok(err instanceof Error);
});
