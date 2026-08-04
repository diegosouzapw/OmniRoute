// Characterization of the validation.ts web-cookie + bytez split (god-file decomposition):
// validateWebCookieProvider, bytezValidationResultFromStatus, and validateBytezProvider moved
// into validation/webCookie.ts. Behavior-preserving move — the locks here are module surface +
// the pure status→result mapping; the runtime behavior stays covered by the
// provider-validation-web-cookie-auth007 / web-cookie-validation-fallback / bytez-validation-5422
// suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/providers/validation/webCookie.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("webCookie exposes validateWebCookieProvider, bytezValidationResultFromStatus, validateBytezProvider", () => {
  for (const name of [
    "validateWebCookieProvider",
    "bytezValidationResultFromStatus",
    "validateBytezProvider",
  ]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host re-exports validateWebCookieProvider + bytezValidationResultFromStatus (historical public surface)", () => {
  assert.equal(
    (HOST as Record<string, unknown>).validateWebCookieProvider,
    (M as Record<string, unknown>).validateWebCookieProvider
  );
  assert.equal(
    (HOST as Record<string, unknown>).bytezValidationResultFromStatus,
    (M as Record<string, unknown>).bytezValidationResultFromStatus
  );
});

test("bytezValidationResultFromStatus: 200 valid, 401/403 invalid key, other generic failure", () => {
  assert.deepEqual(M.bytezValidationResultFromStatus(200), { valid: true, error: null });
  assert.deepEqual(M.bytezValidationResultFromStatus(401), {
    valid: false,
    error: "Invalid API key",
  });
  assert.deepEqual(M.bytezValidationResultFromStatus(403), {
    valid: false,
    error: "Invalid API key",
  });
  assert.deepEqual(M.bytezValidationResultFromStatus(500), {
    valid: false,
    error: "Validation failed: 500",
  });
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
});
