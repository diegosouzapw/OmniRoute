/**
 * xiaomi-mimo-cookie-field.test.ts — the Xiaomi MiMo Token Plan quota fetcher is
 * cookie-authenticated (the `tp-`/`mk-` inference key cannot read the console
 * Token Plan API), so the connection modal MUST expose a field to paste that
 * cookie. Without it the live quota is unconfigurable from the dashboard.
 *
 * Mirrors the qwen / volcengine console-cookie fields (qwen-token-plan-cookie-field.test.ts,
 * volcengine-plan-cookie-field.test.ts) and guards the new
 * `providerSpecificData.monthlyTokenLimit` fallback-budget override (#15753).
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

test("xiaomi-mimo providers persist the MiMo console cookie", () => {
  for (const provider of ["xiaomi-mimo", "xiaomi-mimo-token-plan"]) {
    const target: Record<string, unknown> = {};

    assignQuotaScrapingProviderData(
      provider,
      {
        ...EMPTY_QUOTA_SCRAPING_FIELDS,
        xiaomiMimoConsoleCookie: "  api-platform_serviceToken=tok; userId=42  ",
      },
      target
    );

    assert.equal(
      target.xiaomiMimoConsoleCookie,
      "api-platform_serviceToken=tok; userId=42",
      `${provider}: cookie must be stored trimmed`
    );
  }
});

test("a blank cookie does not overwrite the stored one", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "xiaomi-mimo",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, xiaomiMimoConsoleCookie: "   " },
    target
  );

  assert.equal(
    Object.hasOwn(target, "xiaomiMimoConsoleCookie"),
    false,
    "blank input must leave the stored cookie untouched"
  );
});

test("a form object without the cookie field does not throw", () => {
  const target: Record<string, unknown> = {};
  const partial = { ...EMPTY_QUOTA_SCRAPING_FIELDS } as Record<string, string>;
  delete partial.xiaomiMimoConsoleCookie;

  assert.doesNotThrow(() =>
    assignQuotaScrapingProviderData(
      "xiaomi-mimo",
      partial as unknown as typeof EMPTY_QUOTA_SCRAPING_FIELDS,
      target
    )
  );
  assert.equal(Object.hasOwn(target, "xiaomiMimoConsoleCookie"), false);
});

test("providerSpecificData validation guards the MiMo cookie field", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { xiaomiMimoConsoleCookie: "api-platform_serviceToken=tok" },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  const wrongType = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { xiaomiMimoConsoleCookie: 42 },
  });
  assert.equal(wrongType.success, false, "non-string cookie must be rejected");

  const tooLong = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { xiaomiMimoConsoleCookie: "x".repeat(10_001) },
  });
  assert.equal(tooLong.success, false, "oversized cookie must be rejected");
});

test("providerSpecificData validation guards monthlyTokenLimit as a positive number", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { monthlyTokenLimit: 38_000_000_000 },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  for (const bad of [0, -1, "8000000000", Number.NaN]) {
    const result = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { monthlyTokenLimit: bad },
    });
    assert.equal(result.success, false, `monthlyTokenLimit=${String(bad)} must be rejected`);
  }
});
