import test from "node:test";
import assert from "node:assert/strict";
import {
  nextRoutingTransition,
  summarizeAccountRouting,
} from "../../open-sse/services/combo/routingInstrumentation.ts";

test("routing instrumentation emits only eight-character account prefixes", () => {
  const firstAccountId = "abcdefgh-secret-account-id";
  const secondAccountId = "ijklmnop-secret-account-id";
  const summary = summarizeAccountRouting({
    correlationId: "server-generated-correlation",
    provider: "antigravity",
    model: "gemini-image",
    candidateConnectionIds: [firstAccountId, secondAccountId],
    attemptedConnectionIds: new Set([firstAccountId]),
    excludedConnectionIds: [firstAccountId],
  });

  const rendered = JSON.stringify(summary);
  assert.deepEqual(summary.candidateAccountPrefixes, ["abcdefgh", "ijklmnop"]);
  assert.deepEqual(summary.attemptedAccountPrefixes, ["abcdefgh"]);
  assert.deepEqual(summary.excludedAccountPrefixes, ["abcdefgh"]);
  assert.equal(summary.eligibleUnattemptedCount, 1);
  assert.ok(!rendered.includes(firstAccountId));
  assert.ok(!rendered.includes(secondAccountId));
});

test("routing warns when a retryable failure advances before same-model accounts are exhausted", () => {
  assert.deepEqual(
    nextRoutingTransition({
      sameProvider: false,
      sameModel: false,
      retryableAccountFailure: true,
      eligibleUnattemptedCount: 1,
    }),
    {
      transition: "next_combo_target",
      event: "routing_account_scope",
      invariantViolation: true,
    }
  );
  assert.deepEqual(
    nextRoutingTransition({
      sameProvider: true,
      sameModel: true,
      retryableAccountFailure: true,
      eligibleUnattemptedCount: 0,
    }),
    {
      transition: "next_account_same_model",
      event: "routing_account_scope",
      invariantViolation: false,
    }
  );
});
