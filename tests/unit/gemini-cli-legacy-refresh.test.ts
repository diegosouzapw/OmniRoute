import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { OAUTH_ENDPOINTS, PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import {
  getAccessToken,
  REFRESH_LEAD_MS,
  supportsTokenRefresh,
} from "../../open-sse/services/tokenRefresh.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

// #8232 set out to repair OAuth refresh for legacy stored connections, but
// exceeded that compatibility goal by restoring a complete routable and
// UI-visible Gemini CLI provider. Preserve only the legacy refresh path while
// keeping the discontinued provider out of public registries and routing.

test("Gemini CLI stays out of the chat and OAuth provider registries", () => {
  assert.equal(REGISTRY["gemini-cli"], undefined);
  assert.equal(LEGACY_PROVIDERS["gemini-cli"], undefined);
  assert.equal((OAUTH_PROVIDERS as Record<string, unknown>)["gemini-cli"], undefined);
  assert.ok(REGISTRY.gemini);
  assert.ok(REGISTRY.antigravity);
});

test("legacy Gemini CLI connections retain proactive token refresh", () => {
  assert.equal(REFRESH_LEAD_MS["gemini-cli"], REFRESH_LEAD_MS.antigravity);
  assert.equal(supportsTokenRefresh("gemini-cli"), true);
});

test("Gemini CLI stays out of the provider translation snapshot", () => {
  const snapshotPath = new URL("../snapshots/provider/translate-path.json", import.meta.url);
  const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8")) as Record<string, unknown>;
  assert.equal(snapshot["gemini-cli"], undefined);
});

test("legacy Gemini CLI refresh reuses Gemini OAuth credentials without a provider entry", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; options: RequestInit }> = [];

  globalThis.fetch = (async (url, options: RequestInit = {}) => {
    calls.push({ url: String(url), options });
    return new Response(
      JSON.stringify({
        access_token: "legacy-gemini-cli-access-new",
        expires_in: 3600,
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  }) as typeof fetch;

  try {
    const result = await getAccessToken(
      "gemini-cli",
      { refreshToken: "legacy-gemini-cli-refresh-old" },
      {}
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, OAUTH_ENDPOINTS.google.token);

    const body = new URLSearchParams(String(calls[0].options.body));
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("refresh_token"), "legacy-gemini-cli-refresh-old");
    assert.equal(body.get("client_id"), LEGACY_PROVIDERS.gemini.clientId);
    assert.equal(body.get("client_secret"), LEGACY_PROVIDERS.gemini.clientSecret);
    assert.deepEqual(result, {
      accessToken: "legacy-gemini-cli-access-new",
      refreshToken: "legacy-gemini-cli-refresh-old",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("legacy Gemini CLI refresh surfaces revoked tokens as unrecoverable", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "invalid_grant" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const result = await getAccessToken(
      "gemini-cli",
      { refreshToken: "legacy-gemini-cli-refresh-revoked" },
      {}
    );
    assert.deepEqual(result, {
      error: "unrecoverable_refresh_error",
      code: "invalid_grant",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
