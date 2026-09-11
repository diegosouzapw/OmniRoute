import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);

// #12867 split the send: chatCore keeps the per-attempt admission loop and the
// account/model recovery loop moved to providerExecutionPipeline.ts, which
// re-enters chatCore through sendProviderAttempt on every rotation.
const pipeline = readFileSync(
  new URL("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts", import.meta.url),
  "utf8"
);

test("chatCore acquires cumulative gates immediately before withRateLimit", () => {
  const acquire = source.indexOf("await acquireConcurrencyGates(");
  const rateLimit = source.indexOf("await withRateLimit(", acquire);
  assert.ok(acquire >= 0, "hierarchical admission must be present");
  assert.ok(rateLimit > acquire, "hierarchical admission must precede withRateLimit");

  const admission = source.slice(acquire, rateLimit);
  assert.match(admission, /key: "global"/);
  assert.match(admission, /key: `provider:\$\{canonicalProviderKey\}`/);
  assert.match(admission, /key: accountSemaphoreKey/);
  assert.match(admission, /globalConcurrentRequests/);
  assert.match(admission, /providerConcurrency/);
  assert.match(admission, /maxWaitMs/);
  assert.match(admission, /maxQueueDepth/);
});

// Invariant: a rotated account NEVER reuses the failed account's composite slot.
// Every attempt acquires its own global+provider+account slot and gives it back
// before the next attempt starts, so one wedged account cannot pin the gates of
// the sibling it rotated to. Before #12867 both loops lived in chatCore.ts and a
// single index check covered it; the loop is now split across two files, so the
// guard checks both halves of the same invariant.
test("each rotated account attempt acquires and releases a fresh composite slot", () => {
  // ── chatCore half: one acquisition per attempt, released on every exit ──
  const attemptLoop = source.indexOf("while (attempts < maxAttempts)");
  const acquire = source.indexOf("await acquireConcurrencyGates(", attemptLoop);
  const release = source.indexOf("releaseAccountSemaphore();", acquire);
  const retryContinue = source.indexOf("continue;", acquire);

  assert.ok(attemptLoop >= 0, "chatCore must keep the per-attempt admission loop");
  assert.ok(acquire > attemptLoop, "the composite slot is acquired inside the attempt loop");
  assert.ok(release > acquire, "each attempt must release the composite slot");
  assert.ok(retryContinue > release, "an in-loop retry releases the slot before continuing");
  assert.match(
    source.slice(acquire),
    /catch \(error\) \{\s*releaseAccountSemaphore\(\);\s*throw error;/,
    "a throwing attempt must release the composite slot"
  );

  // ── pipeline half: rotation re-enters the acquisition, never sends in place ──
  const rotationLoop = pipeline.search(/while \(\s*attempts < maxAttempts\b/);
  assert.ok(rotationLoop >= 0, "the account/model recovery loop must exist");
  assert.ok(
    pipeline.indexOf("await sendProviderAttempt(") > rotationLoop,
    "the wire send lives inside the recovery loop, so every attempt re-acquires"
  );
  assert.equal(
    pipeline.includes("acquireConcurrencyGates"),
    false,
    "the recovery loop must not hold a composite slot across rotations"
  );
  assert.match(
    pipeline.slice(rotationLoop),
    /(?:antigravityByopRotationPending|authRefreshPending|modelFallbackPending)\s*=\s*true;\s*continue;/,
    "a rotation hands control back to the loop head instead of re-sending in place"
  );
  assert.match(
    pipeline.slice(rotationLoop),
    /attempts \+= 1;\s*continue;/,
    "account rotation hands control back to the loop head instead of re-sending in place"
  );
});
