// Regression guard for #6715 — the provider connection `apiKey` field was
// hard-capped at 10,000 chars in the Zod save schemas:
//   src/shared/validation/schemas/provider.ts
//     createProviderSchema            (add connection)
//     bulkCreateProviderSchema        (bulk import)
//     updateProviderConnectionSchema  (edit connection)
//
// That `apiKey` field is reused as the raw `Cookie:` header value for cookie-
// based web providers (Gemini Business, Copilot M365, ChatGPT Web, Claude Web,
// …). Real multi-cookie session headers (many `__Secure-*` entries, large
// session tokens) legitimately exceed 10,000 chars. The provider's own
// `validate` schema (validateProviderApiKeySchema) has NO cap, so the cookie
// validated as OK — then `save` rejected it with HTTP 400
// "Too big: expected string to have <=10000 characters".
//
// Fix: raise the ceiling to MAX_PROVIDER_CREDENTIAL_LENGTH (100_000) — still a
// sane anti-abuse bound (well under the 10 MB default request-body limit and
// unconstrained SQLite TEXT storage), just wide enough for real cookie headers.
// Same fix shape as #6562 (priority cap raised to 100_000).
import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, bulkCreateProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas.ts");

// A realistic large cookie-header value: > 10_000 chars, < the new 100_000 cap.
const LARGE_COOKIE = "__Secure-session=" + "a".repeat(20_000);
// Beyond the new ceiling — must still be rejected (anti-abuse bound preserved).
const OVERSIZE_COOKIE = "x".repeat(100_001);

test("createProviderSchema accepts a >10000-char cookie apiKey (#6715)", () => {
  const result = createProviderSchema.safeParse({
    provider: "gemini-business",
    name: "Gemini Business (cookie)",
    apiKey: LARGE_COOKIE,
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("bulkCreateProviderSchema accepts a >10000-char cookie apiKey (#6715)", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "gemini-business",
    entries: [{ name: "cookie-1", apiKey: LARGE_COOKIE }],
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("updateProviderConnectionSchema accepts a >10000-char cookie apiKey (#6715)", () => {
  const result = updateProviderConnectionSchema.safeParse({ apiKey: LARGE_COOKIE });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("createProviderSchema still rejects an oversize apiKey past the new ceiling (control)", () => {
  const result = createProviderSchema.safeParse({
    provider: "gemini-business",
    name: "too big",
    apiKey: OVERSIZE_COOKIE,
  });
  assert.equal(result.success, false);
});

test("updateProviderConnectionSchema still rejects an oversize apiKey past the new ceiling (control)", () => {
  const result = updateProviderConnectionSchema.safeParse({ apiKey: OVERSIZE_COOKIE });
  assert.equal(result.success, false);
});
