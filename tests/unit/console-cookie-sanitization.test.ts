/**
 * Console-session cookies are credentials: the Qwen/Alibaba Token Plan cookie grants
 * access to the operator's cloud-console account. Every sibling secret in
 * providerSpecificData (apiKey, ollamaCloudUsageCookie, opencodeGoAuthCookie, …) is
 * stripped from API responses by sanitizeProviderSpecificDataForResponse — but the
 * qwen/alibaba console fields were forgotten, so GET /api/providers returned the
 * operator's console session in the clear to any dashboard session (found in the
 * 2026-09-01 audit of the Token Plan quota feature).
 *
 * The edit round-trip stays safe after stripping because it was designed for exactly
 * this shape: the client-side assign only writes a cookie field when the form holds a
 * non-empty value, and the PUT handler merges partially ({...existing, ...incoming}),
 * preserving DB keys the client no longer echoes. The second test pins that contract.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeProviderSpecificDataForResponse } from "../../src/lib/providers/requestDefaults.ts";
import {
  assignQuotaScrapingProviderData,
  EMPTY_QUOTA_SCRAPING_FIELDS,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues.ts";

const SECRET_FIELD_PATTERN = /(?:Cookie|SecToken)$/;

test("every quota-scraping credential field is stripped from API responses", () => {
  const secretFields = Object.keys(EMPTY_QUOTA_SCRAPING_FIELDS).filter((key) =>
    SECRET_FIELD_PATTERN.test(key)
  );
  // The guard must actually cover the known credential fields (catches a rename).
  for (const expected of [
    "qwenCloudCookie",
    "qwenCloudSecToken",
    "alibabaConsoleCookie",
    "alibabaConsoleSecToken",
    "ollamaCloudUsageCookie",
  ]) {
    assert.ok(secretFields.includes(expected), `${expected} missing from the field inventory`);
  }

  const record: Record<string, string> = { region: "global-sg", tag: "primary" };
  for (const key of secretFields) record[key] = `secret-value-${key}`;

  const sanitized = sanitizeProviderSpecificDataForResponse(record) ?? {};

  for (const key of secretFields) {
    assert.ok(!(key in sanitized), `${key} leaked through sanitizeProviderSpecificDataForResponse`);
  }
  // Non-secret keys survive.
  assert.equal(sanitized.region, "global-sg");
  assert.equal(sanitized.tag, "primary");
});

test("edit round-trip with a blank form keeps the stored console cookie", () => {
  // After sanitization the edit form initializes these fields empty. Saving the
  // connection must not clobber the stored cookie: the client assign skips empty
  // values, so the PUT payload carries no cookie key, and the server-side partial
  // merge keeps the DB value.
  const stored = {
    qwenCloudCookie: "cna=abc; login_aliyunid_ticket=xyz",
    qwenCloudSecToken: "sec-1",
    region: "global-sg",
  };

  // Client: what the edit modal sends (existing psd is the SANITIZED view).
  const sanitizedView = sanitizeProviderSpecificDataForResponse(stored) ?? {};
  const incoming: Record<string, unknown> = { ...sanitizedView };
  assignQuotaScrapingProviderData(
    "bailian-coding-plan",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS },
    incoming
  );
  assert.ok(!("qwenCloudCookie" in incoming), "blank form must not echo a cookie key");

  // Server: the PUT handler's partial merge (route.ts — {...existingPsd, ...incomingPsd}).
  const merged = { ...stored, ...incoming };
  assert.equal(merged.qwenCloudCookie, stored.qwenCloudCookie);
  assert.equal(merged.qwenCloudSecToken, stored.qwenCloudSecToken);
  assert.equal(merged.region, "global-sg");
});

test("a re-pasted cookie still replaces the stored one", () => {
  const incoming: Record<string, unknown> = {};
  assignQuotaScrapingProviderData(
    "qwen-cloud-token-plan",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, qwenCloudCookie: "  fresh-cookie  " },
    incoming
  );
  assert.equal(incoming.qwenCloudCookie, "fresh-cookie");
});
