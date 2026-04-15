import test from "node:test";
import assert from "node:assert/strict";
import {
  createProviderSchema,
  updateProviderConnectionSchema,
} from "../../src/shared/validation/schemas.ts";

test("createProviderSchema accepts valid provider without consoleApiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "bcp",
    apiKey: "sk-test",
    name: "test",
  });
  assert.equal(result.success, true, "Should accept valid provider without consoleApiKey");
});

test("createProviderSchema accepts valid provider with consoleApiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "bcp",
    apiKey: "sk-test",
    name: "test",
    providerSpecificData: { consoleApiKey: "ck-valid" },
  });
  assert.equal(result.success, true, "Should accept valid provider with consoleApiKey");
});

test("createProviderSchema rejects non-string consoleApiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "bcp",
    apiKey: "sk-test",
    name: "test",
    providerSpecificData: { consoleApiKey: 123 },
  });
  assert.equal(result.success, false, "Should reject non-string consoleApiKey");
  if (!result.success) {
    const hasConsoleApiKeyError = result.error.issues.some((issue) =>
      issue.path.includes("consoleApiKey")
    );
    assert.equal(hasConsoleApiKeyError, true, "Error should target consoleApiKey path");
  }
});

test("createProviderSchema accepts empty string consoleApiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "bcp",
    apiKey: "sk-test",
    name: "test",
    providerSpecificData: { consoleApiKey: "" },
  });
  assert.equal(result.success, true, "Should accept empty string consoleApiKey");
});

test("createProviderSchema rejects consoleApiKey exceeding max length", () => {
  const longConsoleApiKey = "x".repeat(10001);
  const result = createProviderSchema.safeParse({
    provider: "bcp",
    apiKey: "sk-test",
    name: "test",
    providerSpecificData: { consoleApiKey: longConsoleApiKey },
  });
  assert.equal(result.success, false, "Should reject consoleApiKey exceeding max length");
  if (!result.success) {
    const hasConsoleApiKeyError = result.error.issues.some((issue) =>
      issue.path.includes("consoleApiKey")
    );
    assert.equal(hasConsoleApiKeyError, true, "Error should target consoleApiKey path");
  }
});

test("updateProviderConnectionSchema accepts valid provider without consoleApiKey", () => {
  const result = updateProviderConnectionSchema.safeParse({
    name: "test-provider",
  });
  assert.equal(result.success, true, "Should accept valid provider without consoleApiKey");
});

test("updateProviderConnectionSchema accepts valid provider with consoleApiKey", () => {
  const result = updateProviderConnectionSchema.safeParse({
    name: "test-provider",
    providerSpecificData: { consoleApiKey: "ck-valid" },
  });
  assert.equal(result.success, true, "Should accept valid provider with consoleApiKey");
});

test("updateProviderConnectionSchema rejects non-string consoleApiKey", () => {
  const result = updateProviderConnectionSchema.safeParse({
    name: "test-provider",
    providerSpecificData: { consoleApiKey: 123 },
  });
  assert.equal(result.success, false, "Should reject non-string consoleApiKey");
  if (!result.success) {
    const hasConsoleApiKeyError = result.error.issues.some((issue) =>
      issue.path.includes("consoleApiKey")
    );
    assert.equal(hasConsoleApiKeyError, true, "Error should target consoleApiKey path");
  }
});

test("updateProviderConnectionSchema accepts empty string consoleApiKey", () => {
  const result = updateProviderConnectionSchema.safeParse({
    name: "test-provider",
    providerSpecificData: { consoleApiKey: "" },
  });
  assert.equal(result.success, true, "Should accept empty string consoleApiKey");
});

test("updateProviderConnectionSchema rejects consoleApiKey exceeding max length", () => {
  const longConsoleApiKey = "x".repeat(10001);
  const result = updateProviderConnectionSchema.safeParse({
    name: "test-provider",
    providerSpecificData: { consoleApiKey: longConsoleApiKey },
  });
  assert.equal(result.success, false, "Should reject consoleApiKey exceeding max length");
  if (!result.success) {
    const hasConsoleApiKeyError = result.error.issues.some((issue) =>
      issue.path.includes("consoleApiKey")
    );
    assert.equal(hasConsoleApiKeyError, true, "Error should target consoleApiKey path");
  }
});
