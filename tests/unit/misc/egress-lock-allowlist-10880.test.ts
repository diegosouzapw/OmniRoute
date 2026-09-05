import test from "node:test";
import assert from "node:assert/strict";

const { isEgressBucketedLockScope } = await import(
  "../../../open-sse/config/providerErrorRules.ts"
);

test("allowlist matches the three opencode provider ids", () => {
  assert.equal(isEgressBucketedLockScope("opencode"), true);
  assert.equal(isEgressBucketedLockScope("opencode-go"), true);
  assert.equal(isEgressBucketedLockScope("opencode-cli"), true);
  assert.equal(isEgressBucketedLockScope("OPENCODE"), true, "case-insensitive");
});

test("exclusive: providers outside the allowlist are NOT egress-locked", () => {
  assert.equal(isEgressBucketedLockScope("agentrouter"), false);
  assert.equal(isEgressBucketedLockScope("ollama-cloud"), false);
  assert.equal(isEgressBucketedLockScope("vertex"), false);
  assert.equal(isEgressBucketedLockScope("openrouter"), false);
  assert.equal(isEgressBucketedLockScope(null), false);
  assert.equal(isEgressBucketedLockScope(undefined), false);
});
