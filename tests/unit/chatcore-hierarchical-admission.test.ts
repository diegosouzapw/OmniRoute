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

test("each rotated account attempt acquires and releases a fresh composite slot", () => {
  const whileLoop = pipeline.indexOf(
    "while (\n    attempts < maxAttempts ||\n    antigravityByopRotationPending"
  );
  assert.ok(whileLoop >= 0, "rotation lives in the pipeline loop");
  assert.ok(
    pipeline.includes("antigravityByopRotationPending = true"),
    "422 gcp_project_required must re-enter the pipeline loop"
  );
  const acquire = source.indexOf("await acquireConcurrencyGates(");
  const finallyRelease = source.indexOf("releaseAccountSemaphore();", acquire);
  assert.ok(acquire >= 0, "chatCore still acquires the composite slot");
  assert.ok(finallyRelease > acquire, "each attempt must release the composite slot");
});
