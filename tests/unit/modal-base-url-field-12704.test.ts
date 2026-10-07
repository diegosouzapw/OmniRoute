// #12704 — Modal is bring-your-own-deploy: the server-side validator
// (src/lib/providers/validation.ts) requires a providerSpecificData.baseUrl
// pointing at the operator's OpenAI-compatible Modal app, but the add/edit
// connection modals only rendered Token ID / Token Secret, so every Modal
// connection failed validation with no way to fill the required field. Fix:
// add "modal" to CONFIGURABLE_BASE_URL_PROVIDERS so the modals expose the
// Base URL field (same mechanism as kimi/moonshot, #7447).
import test from "node:test";
import assert from "node:assert/strict";

import {
  getProviderBaseUrlPlaceholder,
  isBaseUrlConfigurableProvider,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

test("modal is base-URL configurable at Add-connection time (regression guard for #12704)", () => {
  assert.equal(
    isBaseUrlConfigurableProvider("modal"),
    true,
    "expected 'modal' to expose the Base URL field so a connection can point at the user's Modal app"
  );
});

test("modal placeholder surfaces the Modal app URL shape", () => {
  assert.equal(getProviderBaseUrlPlaceholder("modal"), "https://<workspace>--<app>.modal.run/v1");
});

test("server-side validation still requires a Base URL for modal (no regression)", async () => {
  const result = await validateProviderApiKey({
    provider: "modal",
    apiKey: "test-id:test-secret",
    providerSpecificData: {},
  });
  assert.equal(result.valid, false);
  assert.match(result.error, /Modal requires a Base URL/);
});
