import assert from "node:assert/strict";
import test from "node:test";
import { updateAutoDisableAccountsSchema } from "../../../src/shared/validation/schemas/settings.ts";
import {
  isSubscriptionStyleConnection,
  normalizeAutoDisableBannedScope,
  shouldAutoDisableBannedConnection,
} from "../../../src/shared/utils/autoDisableBanned.ts";

test("normalizeAutoDisableBannedScope defaults unknown values to all", () => {
  assert.equal(normalizeAutoDisableBannedScope(undefined), "all");
  assert.equal(normalizeAutoDisableBannedScope("all"), "all");
  assert.equal(normalizeAutoDisableBannedScope("subscription"), "subscription");
  assert.equal(normalizeAutoDisableBannedScope("nope"), "all");
});

test("shouldAutoDisableBannedConnection is off when the feature is disabled", () => {
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: false,
      scope: "all",
      authType: "oauth",
    }),
    false
  );
});

test("scope=all deactivates API keys and OAuth connections", () => {
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "all",
      authType: "apikey",
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      authType: "oauth",
    }),
    true
  );
});

test("scope=subscription skips prepaid API keys", () => {
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "apikey",
      providerId: "jina-ai",
    }),
    false
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "api_key",
    }),
    false
  );
});

test("scope=subscription still deactivates OAuth and cookie accounts", () => {
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "oauth",
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "cookie",
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "access_token",
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "session",
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "web",
    }),
    true
  );
});

test("scope=subscription treats web-cookie providers as subscriptions even when authType is apikey", () => {
  assert.equal(
    isSubscriptionStyleConnection({
      authType: "apikey",
      providerId: "grok-web",
      webCookieProviderIds: { "grok-web": {} },
    }),
    true
  );
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "apikey",
      providerId: "grok-web",
      webCookieProviderIds: { "grok-web": {} },
    }),
    true
  );
});

test("auto-disable settings schema accepts scope and rejects unknown values", () => {
  assert.equal(
    updateAutoDisableAccountsSchema.safeParse({
      enabled: true,
      threshold: 2,
      scope: "subscription",
    }).success,
    true
  );
  assert.equal(
    updateAutoDisableAccountsSchema.safeParse({
      enabled: true,
      scope: "all",
    }).success,
    true
  );
  assert.equal(
    updateAutoDisableAccountsSchema.safeParse({
      enabled: true,
      scope: "provider",
    }).success,
    false
  );
});

test("unknown auth types stay conservative and still auto-disable", () => {
  assert.equal(
    shouldAutoDisableBannedConnection({
      enabled: true,
      scope: "subscription",
      authType: "mystery",
    }),
    true
  );
});
