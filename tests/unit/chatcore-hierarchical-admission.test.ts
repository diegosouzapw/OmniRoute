import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);

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
  const sendFn = source.indexOf("const executeProviderRequest = async (");
  const attemptLoop = source.indexOf("while (attempts < maxAttempts)", sendFn);
  const acquire = source.indexOf("await acquireConcurrencyGates(", attemptLoop);
  const release = source.indexOf("releaseAccountSemaphore();", acquire);
  const retryContinue = source.indexOf("continue;", acquire);

  assert.ok(sendFn >= 0, "chatCore must keep the single wire-send function");
  assert.ok(attemptLoop > sendFn, "the per-attempt admission loop lives in the wire send");
  assert.ok(acquire > attemptLoop, "the composite slot is acquired inside the attempt loop");
  assert.ok(release > acquire, "each attempt must release the composite slot");
  assert.ok(retryContinue > release, "an in-loop retry releases the slot before continuing");
  assert.match(
    source.slice(acquire),
    /catch \(error\) \{\s*releaseAccountSemaphore\(\);\s*throw error;/,
    "a throwing attempt must release the composite slot"
  );

  const sendWirings =
    source.match(
      /sendProviderAttempt: \(modelToCall, allowDedup\) =>\s*executeProviderRequest\(modelToCall, allowDedup\)/g
    ) ?? [];
  assert.equal(sendWirings.length, 2, "both legs send every pipeline attempt through the gate");

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
    /antigravityByopRotationPending = true;\s*continue;/,
    "a BYOP rotation hands control back to the loop head instead of re-sending in place"
  );
  assert.match(
    pipeline.slice(rotationLoop),
    /attempts \+= 1;\s*continue;/,
    "account rotation hands control back to the loop head instead of re-sending in place"
  );
});
