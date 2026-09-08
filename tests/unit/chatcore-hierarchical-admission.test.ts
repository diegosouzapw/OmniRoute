import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";

const chatCoreSource = readFileSync(
  new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);
const pipelinePath = new URL(
  "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts",
  import.meta.url
);
const pipelineSource = existsSync(pipelinePath) ? readFileSync(pipelinePath, "utf8") : "";
const source = chatCoreSource + "\n" + pipelineSource;

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
  const acquire = source.indexOf("await acquireConcurrencyGates(");
  const finallyRelease = source.indexOf("releaseAccountSemaphore();", acquire);
  const retryContinue = source.indexOf("continue;", acquire);

  assert.ok(acquire >= 0, "concurrency gates must be acquired");
  assert.ok(finallyRelease > acquire, "each attempt must release the composite slot");
  assert.ok(retryContinue > acquire, "rotation remains inside the per-attempt acquisition loop");
});
