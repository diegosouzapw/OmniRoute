/**
 * Deprecation of the `gemini-cli` UPSTREAM provider (not the client identity).
 *
 * Why this is a deprecation and not a deletion — measured on 2026-07-30:
 *
 *  - `gemini-cli` is NOT routable: absent from PROVIDERS (open-sse/config/constants),
 *    REGISTRY (providerRegistry), OAUTH_PROVIDERS, and no executor references it. A
 *    stored connection can therefore never serve a request, no matter how fresh its
 *    token is.
 *  - The legacy refresh path DID work: it redeemed the token with
 *    `PROVIDERS.gemini.clientId`, which is the same public Gemini CLI / Code Assist
 *    OAuth client. So refreshing kept a credential alive that had nowhere to go.
 *  - Removing it from `supportsTokenRefresh` alone would produce a SILENT skip
 *    (`Skipping … (refresh unsupported)` in tokenHealthCheck) — the connection would
 *    sit at `active` forever while doing nothing.
 *
 * So the deprecation has to be *legible*: the connection becomes terminal with a
 * reason that names the migration. `gemini` uses the very same OAuth client, so
 * re-adding the account there is a real, working path — not advice to nowhere.
 *
 * NOT touched, and asserted here so a future edit cannot conflate them: the
 * `gemini-cli` CLIENT identity (issue #7034) — requests ARRIVING from the Gemini CLI
 * or any @google/genai-based client, where OmniRoute is the server.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDERS } from "../../open-sse/config/constants.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import {
  DEPRECATED_PROVIDERS,
  getAccessToken,
  getDeprecationNotice,
  getRefreshLeadMs,
  isDeprecatedProvider,
  REFRESH_LEAD_MS,
  supportsTokenRefresh,
  TOKEN_EXPIRY_BUFFER_MS,
} from "../../open-sse/services/tokenRefresh.ts";
import { CLIENT_IDENTITY_PROFILES } from "../../src/shared/constants/clientIdentityProfiles.ts";

test("gemini-cli is registered as deprecated, with a migration target that is routable", () => {
  assert.equal(isDeprecatedProvider("gemini-cli"), true);
  assert.equal(isDeprecatedProvider("gemini"), false);
  assert.equal(isDeprecatedProvider("antigravity"), false);
  assert.equal(isDeprecatedProvider(""), false);

  const notice = getDeprecationNotice("gemini-cli");
  assert.ok(notice, "a deprecated provider must carry a notice");
  assert.equal(notice.migrateTo, "gemini");
  assert.match(notice.reason, /gemini/i);

  // The migration target must actually be usable — otherwise the notice sends the
  // operator nowhere. This is the assertion that makes the advice honest.
  assert.ok(REGISTRY[notice.migrateTo], "the migration target must be a routable provider");
  assert.ok(PROVIDERS[notice.migrateTo], "the migration target must have OAuth config");
});

test("a deprecated provider is no longer refresh-capable and carries no refresh lead", () => {
  assert.equal(supportsTokenRefresh("gemini-cli"), false);
  // The TTL entry existed only to pace a refresh that no longer happens. Dropping it
  // means the generic fallback applies, which is the honest answer for a provider the
  // scheduler no longer refreshes.
  assert.equal(REFRESH_LEAD_MS["gemini-cli"], undefined);
  assert.equal(getRefreshLeadMs("gemini-cli"), TOKEN_EXPIRY_BUFFER_MS);
});

test("refreshing a stored gemini-cli connection fails with a CLASSIFIED code, not silence", async () => {
  const originalFetch = globalThis.fetch;
  let upstreamCalls = 0;
  globalThis.fetch = (async () => {
    upstreamCalls++;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const result = await getAccessToken(
      "gemini-cli",
      { refreshToken: "legacy-gemini-cli-refresh" },
      {}
    );

    assert.equal(upstreamCalls, 0, "a deprecated provider must not touch the upstream at all");
    assert.equal(
      result.error,
      "unrecoverable_refresh_error",
      "reuse the established unrecoverable contract so every existing caller stops retrying"
    );
    assert.equal(result.code, "provider_deprecated", "…but with a code that says WHY");
    assert.equal(result.migrateTo, "gemini", "and the migration target, for a legible message");
    assert.equal(result.accessToken, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("the gemini-cli CLIENT identity is untouched (issue #7034)", () => {
  // Category A. Requests ARRIVING from the Gemini CLI — OmniRoute is the server here.
  // Deleting this is the failure mode the deprecation must never cause.
  assert.ok(
    CLIENT_IDENTITY_PROFILES["gemini-cli"],
    "the gemini-cli client-identity profile must survive the provider deprecation"
  );
  assert.equal(CLIENT_IDENTITY_PROFILES["gemini-cli"].id, "gemini-cli");
});

test("deprecation does not resurrect the provider into any routable registry", () => {
  assert.equal(REGISTRY["gemini-cli"], undefined);
  assert.equal(PROVIDERS["gemini-cli"], undefined);
  assert.ok(Object.prototype.hasOwnProperty.call(DEPRECATED_PROVIDERS, "gemini-cli"));
});
