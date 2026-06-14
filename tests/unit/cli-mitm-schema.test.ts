import test from "node:test";
import assert from "node:assert/strict";
import { cliMitmStartSchema } from "../../src/shared/validation/schemas.ts";
import { validateBody } from "../../src/shared/validation/helpers.ts";
import { resolveApiKey } from "../../src/shared/services/apiKeyResolver.ts";

test("cliMitmStartSchema accepts a non-empty string apiKey", () => {
  const result = validateBody(cliMitmStartSchema, {
    apiKey: "sk-test-key-value",
    sudoPassword: "password123",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.apiKey, "sk-test-key-value");
    assert.equal(result.data.sudoPassword, "password123");
  }
});

test("cliMitmStartSchema accepts a null apiKey", () => {
  const result = validateBody(cliMitmStartSchema, {
    apiKey: null,
    sudoPassword: "",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.apiKey, null);
    assert.equal(result.data.sudoPassword, "");
  }
});

test("cliMitmStartSchema accepts an omitted apiKey", () => {
  const result = validateBody(cliMitmStartSchema, {
    sudoPassword: "",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.apiKey, undefined);
  }
});

test("cliMitmStartSchema accepts and parses keyId correctly", () => {
  const result = validateBody(cliMitmStartSchema, {
    keyId: "api-key-id-123",
    sudoPassword: "password",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.keyId, "api-key-id-123");
    assert.equal(result.data.apiKey, undefined);
  }
});

test("cliMitmStartSchema accepts null keyId", () => {
  const result = validateBody(cliMitmStartSchema, {
    keyId: null,
    sudoPassword: "",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.keyId, null);
  }
});

// Regression test: null apiKey + unresolvable keyId must yield the sentinel 'sk_omniroute',
// which the route guard must reject with a 400 rather than letting it pass to startMitm.
test("resolveApiKey returns sentinel when apiKey is null and keyId is null", async () => {
  const result = await resolveApiKey(null, null);
  assert.equal(
    result,
    "sk_omniroute",
    "resolveApiKey should return the sentinel when no real key is available"
  );
});

test("sentinel guard condition catches sk_omniroute and null", () => {
  const SENTINEL = "sk_omniroute";
  // Simulate what the route guard checks: (!apiKey || apiKey === 'sk_omniroute')
  const shouldReject = (apiKey: string | null | undefined): boolean =>
    !apiKey || apiKey === SENTINEL;

  assert.equal(shouldReject(null), true, "null apiKey must be rejected");
  assert.equal(shouldReject(undefined), true, "undefined apiKey must be rejected");
  assert.equal(shouldReject("sk_omniroute"), true, "sentinel must be rejected");
  assert.equal(shouldReject("sk-real-key-abc"), false, "real key must be allowed");
});
