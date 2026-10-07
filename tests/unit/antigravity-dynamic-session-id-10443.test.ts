import assert from "node:assert/strict";
import { test } from "node:test";
import { getAntigravitySessionId } from "../../open-sse/services/antigravityIdentity.ts";

test("getAntigravitySessionId derives a stable session ID from credentials for prompt-cache reuse", () => {
  const credentials = { email: "user@example.com", connectionId: "conn_123" };

  const id1 = getAntigravitySessionId(credentials);
  const id2 = getAntigravitySessionId(credentials);

  assert.equal(id1, id2, "same credentials must produce the same session ID for cache reuse");
  assert.equal(typeof id1, "string");
  assert.ok(id1.length > 0, "session ID must be non-empty");

  const explicitFallback = "custom-session-456";
  const idWithFallback = getAntigravitySessionId(credentials, explicitFallback);
  assert.equal(idWithFallback, explicitFallback, "explicit fallback session ID should take precedence");
});

test("getAntigravitySessionId falls back to random ID when no credentials are available", () => {
  const id1 = getAntigravitySessionId();
  const id2 = getAntigravitySessionId();

  assert.equal(typeof id1, "string");
  assert.ok(id1.length > 0, "random session ID must be non-empty");

  // Without credentials, each call should produce a different random ID
  // (this is acceptable since there's no account to pin cache to)
  assert.notEqual(id1, id2, "without credentials, IDs should be random per call");
});

test("getAntigravitySessionId produces different IDs for different accounts", () => {
  const credsA = { email: "alice@example.com" };
  const credsB = { email: "bob@example.com" };

  const idA = getAntigravitySessionId(credsA);
  const idB = getAntigravitySessionId(credsB);

  assert.notEqual(idA, idB, "different accounts must produce different session IDs");
});
