import test from "node:test";
import assert from "node:assert/strict";
import { cliMitmStartSchema } from "../../src/shared/validation/schemas.ts";
import { validateBody } from "../../src/shared/validation/helpers.ts";

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
