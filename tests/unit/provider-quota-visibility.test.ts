import test from "node:test";
import assert from "node:assert/strict";

import {
  isProviderQuotaVisible,
  supportsProviderQuota,
} from "../../src/shared/utils/providerQuotaVisibility.ts";

test("provider quota visibility is opt-out so existing connections stay visible", () => {
  assert.equal(isProviderQuotaVisible({}), true);
  assert.equal(isProviderQuotaVisible({ quotaVisible: true }), true);
  assert.equal(isProviderQuotaVisible({ quotaVisible: false }), false);
});

test("quota visibility controls are limited to providers with quota support", () => {
  assert.equal(supportsProviderQuota("codex"), true);
  assert.equal(supportsProviderQuota("openai"), false);
});
