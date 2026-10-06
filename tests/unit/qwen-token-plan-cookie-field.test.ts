/**
 * qwen-token-plan-cookie-field.test.ts — the Qwen Token Plan quota fetcher is
 * cookie-authenticated (the inference API key cannot read the console gateway),
 * so the connection modal MUST expose a field to paste that cookie. Without it
 * the quota is unconfigurable from the dashboard.
 *
 * Mirrors the existing ollama-cloud / alibaba console-cookie fields.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Imports the UI-free module on purpose: pulling the .tsx would drag in
// `@/shared/components` → untranspiled ESM (@lobehub/icons) that node:test
// cannot parse ("SyntaxError: Unexpected token 'export'").
import {
  EMPTY_QUOTA_SCRAPING_FIELDS,
  assignQuotaScrapingProviderData,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues.ts";
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

test("qwen-cloud-token-plan persists the console cookie and optional sec_token", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "qwen-cloud-token-plan",
    {
      ...EMPTY_QUOTA_SCRAPING_FIELDS,
      qwenCloudCookie: "  token=abc123; aux=1  ",
      qwenCloudSecToken: "  sec-tok  ",
    },
    target
  );

  assert.equal(target.qwenCloudCookie, "token=abc123; aux=1", "cookie must be stored trimmed");
  assert.equal(target.qwenCloudSecToken, "sec-tok", "sec_token must be stored trimmed");
});

test("bailian-coding-plan reuses the same console cookie field", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "bailian-coding-plan",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, qwenCloudCookie: "token=xyz" },
    target
  );

  assert.equal(target.qwenCloudCookie, "token=xyz");
});

test("a blank cookie does not overwrite the stored one", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "qwen-cloud-token-plan",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, qwenCloudCookie: "   " },
    target
  );

  assert.equal(
    Object.hasOwn(target, "qwenCloudCookie"),
    false,
    "blank input must leave the stored cookie untouched"
  );
});

test("a form object without the newer cookie fields does not throw", () => {
  // Regression: adding bailian-coding-plan to the qwen branch made older callers
  // (which build a partial form object) reach code that assumed the fields exist.
  const target: Record<string, unknown> = {};
  const partial = { ...EMPTY_QUOTA_SCRAPING_FIELDS } as Record<string, string>;
  delete partial.qwenCloudCookie;
  delete partial.qwenCloudSecToken;

  for (const provider of ["bailian-coding-plan", "qwen-cloud-token-plan"]) {
    assert.doesNotThrow(() =>
      assignQuotaScrapingProviderData(
        provider,
        partial as unknown as typeof EMPTY_QUOTA_SCRAPING_FIELDS,
        target
      )
    );
  }
  assert.equal(Object.hasOwn(target, "qwenCloudCookie"), false);
});

test("providerSpecificData validation guards the qwen cookie fields", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { qwenCloudCookie: "token=abc", qwenCloudSecToken: "sec-tok" },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  const wrongType = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { qwenCloudCookie: 42 },
  });
  assert.equal(wrongType.success, false, "non-string cookie must be rejected");

  const tooLong = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { qwenCloudCookie: "x".repeat(10_001) },
  });
  assert.equal(tooLong.success, false, "oversized cookie must be rejected");
});
