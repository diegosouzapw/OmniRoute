import test from "node:test";
import assert from "node:assert/strict";

import {
  shouldCoolDownSearchConnection,
  SEARCH_COOLDOWN_STATUSES,
} from "../../open-sse/handlers/search/searchProxy.ts";
import { HTTP_STATUS } from "../../open-sse/config/constants.ts";
import { isSubscriptionQuotaText } from "../../open-sse/services/quotaTextCooldowns.ts";

test("shouldCoolDownSearchConnection recognizes 402 PAYMENT_REQUIRED", () => {
  assert.equal(
    shouldCoolDownSearchConnection(HTTP_STATUS.PAYMENT_REQUIRED, "Insufficient credits"),
    true
  );
  assert.equal(shouldCoolDownSearchConnection(402, "You have exceeded your current quota"), true);
});

test("shouldCoolDownSearchConnection detects subscription and quota exhaustion text phrases", () => {
  assert.equal(
    shouldCoolDownSearchConnection(
      400,
      "Exa error: Insufficient credits. Please add funds in dashboard."
    ),
    true
  );
  assert.equal(
    shouldCoolDownSearchConnection(400, "Account has run out of credits for search requests"),
    true
  );
  assert.equal(shouldCoolDownSearchConnection(400, "Syntax error: invalid query parameter"), false);
});

test("SEARCH_COOLDOWN_STATUSES includes 402, 408, 429, 432, 500, and 503", () => {
  assert.ok(SEARCH_COOLDOWN_STATUSES.has(402));
  assert.ok(SEARCH_COOLDOWN_STATUSES.has(429));
  assert.ok(SEARCH_COOLDOWN_STATUSES.has(432));
  assert.ok(SEARCH_COOLDOWN_STATUSES.has(500));
  assert.ok(SEARCH_COOLDOWN_STATUSES.has(503));
  assert.equal(SEARCH_COOLDOWN_STATUSES.has(200), false);
  assert.equal(SEARCH_COOLDOWN_STATUSES.has(404), false);
});

test("credit-exhaustion phrases stay search-scoped: shared LLM quota classifier is unchanged", () => {
  // isSubscriptionQuotaText() also feeds the chat fallback path (chat.ts, accountFallback.ts,
  // errorClassifier.ts); the search-only phrases must not widen it for every LLM provider.
  assert.equal(isSubscriptionQuotaText("insufficient credits for this request"), false);
  assert.equal(isSubscriptionQuotaText("account has run out of credits"), false);
  assert.equal(shouldCoolDownSearchConnection(400, "Insufficient credits"), true);
});
