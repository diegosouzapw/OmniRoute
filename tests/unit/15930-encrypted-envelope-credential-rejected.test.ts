import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");

// Foreign ciphertext envelope: right prefix, wrong (3-segment) shape — exactly what
// another tool's credential store produces and what #15930 let slip into the DB.
const ENVELOPE = "enc:v1:" + "a1b2c3d4e5f60718293a4b5c6d7e8f90".repeat(2);

type SafeParseResult =
  | { success: true }
  | {
      success: false;
      error: { issues: Array<{ path: Array<string | number | symbol>; message: string }> };
    };

function apiKeyIssues(
  schema: { safeParse: (d: unknown) => SafeParseResult },
  data: unknown
): string[] {
  const result = schema.safeParse(data);
  if (result.success) return [];
  return result.error.issues.filter((i) => i.path.includes("apiKey")).map((i) => i.message);
}

test("create rejects an apiKey that is an encrypted envelope", () => {
  const issues = apiKeyIssues(createProviderSchema, {
    provider: "serper-search",
    apiKey: ENVELOPE,
    name: "andy+github@savage.hk",
  });
  assert.ok(
    issues.some((m) => /encrypted envelope/i.test(m)),
    `expected an encrypted-envelope issue on apiKey, got: ${JSON.stringify(issues)}`
  );
});

test("create still accepts plaintext keys, including values that merely contain the prefix mid-string", () => {
  for (const apiKey of ["767321c822493d35e9e4683d902fd0a9e5da51fd", "sk-enc:v1:not-an-envelope"]) {
    const result = createProviderSchema.safeParse({
      provider: "serper-search",
      apiKey,
      name: "andy+github@savage.hk",
    });
    assert.equal(result.success, true, `plaintext key rejected: ${apiKey}`);
  }
});

test("update rejects an encrypted-envelope apiKey", () => {
  const issues = apiKeyIssues(updateProviderConnectionSchema, { apiKey: ENVELOPE });
  assert.ok(
    issues.some((m) => /encrypted envelope/i.test(m)),
    `expected an encrypted-envelope issue on apiKey, got: ${JSON.stringify(issues)}`
  );
});

test("update still accepts plaintext keys and unrelated patches", () => {
  assert.equal(
    updateProviderConnectionSchema.safeParse({ apiKey: "sk-live-abc123" }).success,
    true
  );
  assert.equal(updateProviderConnectionSchema.safeParse({ isActive: true }).success, true);
  assert.equal(updateProviderConnectionSchema.safeParse({}).success, false); // "No valid fields to update" preserved
});
