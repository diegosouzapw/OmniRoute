import test from "node:test";
import assert from "node:assert/strict";
import {
  createProviderSchema,
  createKeySchema,
  loginSchema,
} from "../../src/shared/validation/schemas.ts";

test("modular schemas: createProviderSchema validates correctly", () => {
  const valid = createProviderSchema.safeParse({
    name: "openai",
    provider: "openai",
    apiKey: "sk-1234",
  });
  assert.equal(valid.success, true);
});

test("modular schemas: createKeySchema validates correctly", () => {
  const valid = createKeySchema.safeParse({
    name: "test-key",
  });
  assert.equal(valid.success, true);
});

test("modular schemas: loginSchema validates correctly", () => {
  const valid = loginSchema.safeParse({
    password: "securepassword",
  });
  assert.equal(valid.success, true);

  const invalid = loginSchema.safeParse({
    password: "",
  });
  assert.equal(invalid.success, false);
});

test("validation helpers only export request-body helper APIs", async () => {
  const helpers = await import("../../src/shared/validation/helpers.ts");
  assert.equal("loginSchema" in helpers, false);
  assert.equal(typeof helpers.validateBody, "function");
  assert.equal(typeof helpers.isValidationFailure, "function");
});
