/**
 * volcengine-plan-cookie-field.test.ts — Volcano Ark Coding/Agent Plan
 * quota fetchers are cookie-authenticated (API keys cannot query the console
 * quota API). Expose volcConsoleCookie in QuotaScrapingFields so users can
 * paste their console cookie from the dashboard without needing local browser automation.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  EMPTY_QUOTA_SCRAPING_FIELDS,
  assignQuotaScrapingProviderData,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues.ts";
import { extractErrorMessage } from "../../src/shared/utils/upstreamError.ts";
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

test("volcengine-coding-plan and volcengine-agent-plan persist the console cookie", () => {
  for (const provider of ["volcengine-coding-plan", "volcengine-agent-plan"]) {
    const target: Record<string, unknown> = {};

    assignQuotaScrapingProviderData(
      provider,
      {
        ...EMPTY_QUOTA_SCRAPING_FIELDS,
        volcConsoleCookie: "  session=volc-123; AccountID=acc-456  ",
      },
      target
    );

    assert.equal(
      target.volcConsoleCookie,
      "session=volc-123; AccountID=acc-456",
      `cookie must be stored trimmed for ${provider}`
    );
  }
});

test("a blank volcConsoleCookie does not overwrite the stored one", () => {
  for (const provider of ["volcengine-coding-plan", "volcengine-agent-plan"]) {
    const target: Record<string, unknown> = {};

    assignQuotaScrapingProviderData(
      provider,
      { ...EMPTY_QUOTA_SCRAPING_FIELDS, volcConsoleCookie: "   " },
      target
    );

    assert.equal(
      Object.hasOwn(target, "volcConsoleCookie"),
      false,
      "blank input must leave the stored cookie untouched"
    );
  }
});

test("a form object without volcConsoleCookie does not throw", () => {
  const target: Record<string, unknown> = {};
  const partial = { ...EMPTY_QUOTA_SCRAPING_FIELDS } as Record<string, string>;
  delete partial.volcConsoleCookie;

  for (const provider of ["volcengine-coding-plan", "volcengine-agent-plan"]) {
    assert.doesNotThrow(() =>
      assignQuotaScrapingProviderData(
        provider,
        partial as unknown as typeof EMPTY_QUOTA_SCRAPING_FIELDS,
        target
      )
    );
  }
  assert.equal(Object.hasOwn(target, "volcConsoleCookie"), false);
});

test("providerSpecificData validation guards the volcConsoleCookie field", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { volcConsoleCookie: "session=volc-abc" },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  const wrongType = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { volcConsoleCookie: 42 },
  });
  assert.equal(wrongType.success, false, "non-string cookie must be rejected");

  const tooLong = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { volcConsoleCookie: "x".repeat(10_001) },
  });
  assert.equal(tooLong.success, false, "oversized cookie must be rejected");
});

test("extractErrorMessage extracts message from structured error objects instead of [object Object]", () => {
  const localOnlyError = {
    code: "LOCAL_ONLY",
    message: "This endpoint requires localhost access",
  };
  const extracted = extractErrorMessage(localOnlyError);
  assert.equal(extracted, "This endpoint requires localhost access");

  const stringError = "Failed to start Volcano login";
  assert.equal(extractErrorMessage(stringError), null);
});
