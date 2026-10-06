import assert from "node:assert/strict";
import { test } from "node:test";
import { formatQuotaLabel } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

test("formatQuotaLabel formats custom quota keys with proper title-casing", () => {
  assert.equal(formatQuotaLabel("session"), "Session");
  assert.equal(formatQuotaLabel("weekly"), "Weekly");
  assert.equal(formatQuotaLabel("custom_quota_limit"), "Custom Quota Limit");
});
