/**
 * Regression #8775: Cloudflare error 1010 (`browser_signature_banned`) carries
 * `"retryable": false` / "Do not retry", but checkFallbackError classified the
 * apikey 403 as a short AUTH_ERROR cooldown (3s). That made the chat loop enter
 * COOLDOWN_RETRY 3× and burn 21–33s before falling through to the next tier.
 *
 * Expected: shouldFallback=true with cooldownMs=0 so the connection is excluded
 * for this request without arming rateLimitedUntil / cooldown-aware waits.
 * Must NOT set permanent=true (TLS/fingerprint ban is not an account ban).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { RateLimitReason } from "../../open-sse/config/constants.ts";
import { isNonRetryableCloudflareError } from "../../open-sse/services/accountFallback/nonRetryableUpstream.ts";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

const CF_1010_BODY = JSON.stringify({
  type: "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1010/",
  title: "Error 1010: Access denied",
  status: 403,
  detail: "The site owner has blocked access based on your browser's signature.",
  error_code: 1010,
  error_name: "browser_signature_banned",
  error_category: "access_denied",
  zone: "api.groq.com",
  cloudflare_error: true,
  retryable: false,
  owner_action_required: true,
  what_you_should_do: "**Do not retry.** Your user-agent has been banned by the site owner.",
});

test("isNonRetryableCloudflareError: detects verbatim CF 1010 JSON", () => {
  assert.equal(isNonRetryableCloudflareError(CF_1010_BODY), true);
});

test("isNonRetryableCloudflareError: ignores ordinary api-key 403 text", () => {
  assert.equal(isNonRetryableCloudflareError("invalid api key"), false);
  assert.equal(isNonRetryableCloudflareError('{"error":"forbidden"}'), false);
});

test("#8775: CF 1010 on groq returns fallback with zero cooldown (no COOLDOWN_RETRY fuel)", () => {
  const result = checkFallbackError(403, CF_1010_BODY, 0, null, "groq");
  assert.equal(result.shouldFallback, true);
  assert.equal(
    result.cooldownMs,
    0,
    "must not arm a short connection cooldown that triggers COOLDOWN_RETRY waits"
  );
  assert.notEqual(
    (result as { permanent?: boolean }).permanent,
    true,
    "fingerprint ban must not permanently ban the account"
  );
  assert.equal(result.reason, RateLimitReason.AUTH_ERROR);
});

test("#8775: same for cerebras and together (Cloudflare-fronted apikey providers)", () => {
  for (const provider of ["cerebras", "together"] as const) {
    const result = checkFallbackError(403, CF_1010_BODY, 0, null, provider);
    assert.equal(result.cooldownMs, 0, `${provider} must get zero cooldown`);
    assert.equal(result.shouldFallback, true, `${provider} must still fall through`);
  }
});

test("#8775: ordinary apikey 403 still gets a short retryable cooldown (no over-broadening)", () => {
  const result = checkFallbackError(403, "invalid api key", 0, null, "groq");
  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs > 0,
    "genuine auth 403 must keep the short cooldown path so bad keys back off"
  );
});

test("#8775: retryable:false + cloudflare_error string body (non-pretty JSON) is detected", () => {
  const compact =
    '{"cloudflare_error":true,"retryable":false,"error_code":1010,"error_name":"browser_signature_banned"}';
  assert.equal(isNonRetryableCloudflareError(compact), true);
  const result = checkFallbackError(403, compact, 0, null, "groq");
  assert.equal(result.cooldownMs, 0);
});
