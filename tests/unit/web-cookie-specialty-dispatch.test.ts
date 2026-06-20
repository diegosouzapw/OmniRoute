// Regression guard for the dispatch order in validateProviderApiKey:
// PR #4023 added a generic web-cookie /models probe that silently took
// precedence over per-provider specialty validators, regressing the qwen-web
// body-check fix from #3958 (and the equivalent guards for every other
// specialty web-cookie provider). The fix gates the generic probe on a Set
// of providers that have a specialty validator. This test enforces the
// invariant: every key in that Set must really be served by the specialty
// dispatch, never the generic probe.
//
// Drift mode (e.g. someone adds a new specialty web-cookie validator):
//  → the new key must also be added to
//    WEB_COOKIE_PROVIDERS_WITH_SPECIALTY_VALIDATOR — this test will fail
//    until it is, surfacing the regression at PR review time.

import test from "node:test";
import assert from "node:assert/strict";

import {
  __testing__WEB_COOKIE_PROVIDERS_WITH_SPECIALTY_VALIDATOR as SPECIALTY_OVERRIDES,
  validateProviderApiKey,
} from "../../src/lib/providers/validation.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("every override is actually a registered web-cookie provider", () => {
  for (const provider of SPECIALTY_OVERRIDES) {
    assert.ok(
      Object.hasOwn(WEB_COOKIE_PROVIDERS, provider),
      `override "${provider}" is not in WEB_COOKIE_PROVIDERS — drop it or fix the typo`
    );
  }
});

test("a specialty web-cookie provider does NOT fall into the generic /models probe", async () => {
  // The generic probe hits "<baseUrl>/models" and accepts any non-401/403 as
  // valid. For qwen-web specifically the specialty validator hits
  // /api/v2/user and inspects the body for a real `user` object. We assert
  // the fetch URL: if dispatch lands on the generic probe, the path ends in
  // /models; the specialty path ends in /api/v2/user.
  const seenUrls: string[] = [];
  globalThis.fetch = (async (url: any) => {
    seenUrls.push(String(url));
    return new Response("{}", {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  await validateProviderApiKey({ provider: "qwen-web", apiKey: "qwen-token-abc" });

  assert.ok(
    seenUrls.some((u) => u.endsWith("/api/v2/user")),
    `expected specialty validator to call /api/v2/user, got: ${seenUrls.join(", ")}`
  );
  assert.ok(
    !seenUrls.some((u) => u.endsWith("/models")),
    `specialty dispatch leaked into the generic /models probe: ${seenUrls.join(", ")}`
  );
});
