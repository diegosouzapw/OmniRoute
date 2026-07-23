import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProviderDetailsHref } from "../../src/app/(dashboard)/dashboard/providers/components/onboarding/providerOnboardingHref";

test("buildProviderDetailsHref uses the server-assigned connection UUID", () => {
  const href = buildProviderDetailsHref({
    id: "9f3c1a4d-1c2b-4a3c-8def-0123456789ab",
  });
  assert.equal(
    href,
    "/dashboard/providers/9f3c1a4d-1c2b-4a3c-8def-0123456789ab"
  );
});

test("buildProviderDetailsHref does not leak the provider category into the URL", () => {
  // Regression for issue #6144: previously the wizard used
  // `connection.provider` ("openai-compatible") as the URL slug, which 404'd
  // on /dashboard/providers/[id] because that route is keyed by UUID.
  const href = buildProviderDetailsHref({
    id: "9f3c1a4d-1c2b-4a3c-8def-0123456789ab",
    provider: "openai-compatible",
  });
  assert.notEqual(href, "/dashboard/providers/openai-compatible");
  assert.match(href ?? "", /\/dashboard\/providers\/[0-9a-f-]+$/);
});

test("buildProviderDetailsHref returns null when no id is available", () => {
  assert.equal(buildProviderDetailsHref(null), null);
  assert.equal(buildProviderDetailsHref(undefined), null);
  assert.equal(buildProviderDetailsHref({ id: "" }), null);
  assert.equal(buildProviderDetailsHref({ id: "   " }), null);
});

test("buildProviderDetailsHref percent-encodes unusual ids", () => {
  const href = buildProviderDetailsHref({ id: "abc/123 def" });
  assert.equal(href, "/dashboard/providers/abc%2F123%20def");
});