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

test("supportsProviderQuota is true for moonshot-native shaped connection", () => {
  assert.equal(
    supportsProviderQuota("openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf", {
      providerSpecificData: { baseUrl: "https://api.moonshot.cn/v1" },
    }),
    true,
  );
  assert.equal(supportsProviderQuota("moonshot"), true);
  assert.equal(supportsProviderQuota("kimi"), true);
  assert.equal(supportsProviderQuota("openai"), false);
});
