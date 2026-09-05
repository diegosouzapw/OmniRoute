import assert from "node:assert/strict";
import { test } from "node:test";
import { getAntigravitySessionId } from "../../../open-sse/services/antigravityIdentity.ts";

test("getAntigravitySessionId yields dynamic random session IDs per request to avoid session pinning", () => {
  const credentials = { email: "user@example.com", connectionId: "conn_123" };

  const id1 = getAntigravitySessionId(credentials);
  const id2 = getAntigravitySessionId(credentials);

  assert.notEqual(id1, id2, "getAntigravitySessionId should not pin to a static account email hash");
  assert.equal(typeof id1, "string");
  assert.equal(typeof id2, "string");

  const explicitFallback = "custom-session-456";
  const idWithFallback = getAntigravitySessionId(credentials, explicitFallback);
  assert.equal(idWithFallback, explicitFallback, "explicit fallback session ID should take precedence");
});
