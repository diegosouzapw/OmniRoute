/**
 * Tests for the #13461 "fake success" 2xx-body classifier.
 *
 * A free/web-session provider (Pollinations, Perplexity web) can answer a
 * genuine failure (expired session, exhausted free-tier credits) with HTTP
 * 200 and a structurally normal completion whose message content is just
 * the provider's own error prose. Neither classifyProviderError (gated on
 * 400/401/402/403/429 before it ever looks at the body) nor
 * detectMalformedNonStream (checks structural emptiness only) used to catch
 * this — the text was forwarded to the client as if the model had genuinely
 * answered with that sentence, and combo/auto-fallback never kicked in.
 *
 * Covers:
 * (a) classifyFakeSuccessBody (open-sse/services/errorClassifier.ts) — new
 *     sibling classifier, allowlist-gated, reusing CREDITS_EXHAUSTED_SIGNALS
 *     / ACCOUNT_DEACTIVATED_SIGNALS with a short-content + signal-coverage
 *     guard.
 * (b) detectMalformedNonStream (open-sse/utils/diagnostics.ts) — wired to
 *     consult the classifier for allowlisted providers so the existing
 *     malformed-200 / combo-failover path in chatCore.ts picks it up.
 * (c) False-positive guards: non-allowlisted provider, long legitimate
 *     answer that merely mentions the topic, short reply without a
 *     recognized signal phrase.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";
import { classifyFakeSuccessBody } from "../../open-sse/services/errorClassifier.ts";

function chatCompletion(content: string) {
  return {
    id: "chatcmpl-repro",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content },
        finish_reason: "stop",
      },
    ],
  };
}

// ── (a) classifyFakeSuccessBody ──────────────────────────────────────────────

test("issue #13461: classifyFakeSuccessBody flags a short credits-exhausted body for an allowlisted provider", () => {
  const content =
    "You have run out of credits. Please sign up at https://enter.pollinations.ai to continue.";
  assert.equal(classifyFakeSuccessBody(content, "pollinations"), "quota_exhausted");
});

test("issue #13461: classifyFakeSuccessBody flags an account-deactivated body for an allowlisted provider", () => {
  const content = "Sorry, your account has been suspended. Please contact support.";
  assert.equal(classifyFakeSuccessBody(content, "perplexity-web"), "account_deactivated");
});

test("issue #13461: classifyFakeSuccessBody ignores an unrecognized provider (allowlist guard)", () => {
  const content = "Sorry, out of credits. Please sign up to continue.";
  // Same identical phrase that IS recognized for an allowlisted provider —
  // must stay untouched for a provider outside the initial allowlist so the
  // blast radius of this fix stays controlled (#13461 owner decision).
  assert.equal(classifyFakeSuccessBody(content, "openai"), null);
  assert.equal(classifyFakeSuccessBody(content, "anthropic"), null);
});

test("issue #13461: classifyFakeSuccessBody ignores a long legitimate answer that merely mentions credits", () => {
  const longAnswer =
    "Managing your cloud spend well means watching a few things closely: set a monthly budget " +
    "alert, review your invoice line items weekly, and make sure you never run out of credits " +
    "mid-project by topping up before the low-balance warning fires. A lot of teams also sign up " +
    "for a committed-use discount once their usage is predictable, which can meaningfully lower " +
    "the effective per-unit cost over a full year of steady traffic.";
  assert.ok(
    longAnswer.length > 400,
    "fixture must exceed the short-content guard to be meaningful"
  );
  assert.equal(classifyFakeSuccessBody(longAnswer, "pollinations"), null);
});

test("issue #13461: classifyFakeSuccessBody ignores short content with no recognized signal phrase", () => {
  const content = "Please go to perplexity.ai and sign up to continue using this feature.";
  assert.equal(classifyFakeSuccessBody(content, "perplexity-web"), null);
});

// ── (b) detectMalformedNonStream wiring ──────────────────────────────────────

test("issue #13461: detectMalformedNonStream flags HTTP 200 credits-exhausted text for an allowlisted provider", () => {
  const translated = chatCompletion(
    "You have run out of credits. Please sign up at https://enter.pollinations.ai to continue."
  );
  assert.equal(detectMalformedNonStream(translated, "pollinations"), "content_is_upstream_error");
});

test("issue #13461: detectMalformedNonStream leaves the identical body untouched without a provider", () => {
  const translated = chatCompletion(
    "You have run out of credits. Please sign up at https://enter.pollinations.ai to continue."
  );
  assert.equal(detectMalformedNonStream(translated), null);
});

test("issue #13461: detectMalformedNonStream leaves the identical body untouched for a non-allowlisted provider", () => {
  const translated = chatCompletion(
    "You have run out of credits. Please sign up at https://enter.pollinations.ai to continue."
  );
  assert.equal(detectMalformedNonStream(translated, "openai"), null);
});

test("issue #13461: detectMalformedNonStream never flags a normal completion for an allowlisted provider", () => {
  const translated = chatCompletion("The capital of France is Paris.");
  assert.equal(detectMalformedNonStream(translated, "pollinations"), null);
});
