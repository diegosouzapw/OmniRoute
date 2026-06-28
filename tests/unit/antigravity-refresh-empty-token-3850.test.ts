/**
 * Issue #3850 — Antigravity refresh nulls the stored refresh_token.
 *
 * Google's OAuth token endpoint normally OMITS `refresh_token` on a refresh
 * (its refresh tokens are non-rotating), and occasionally returns it as an
 * EMPTY STRING. The canonical `refreshGoogleToken` preserves the existing token
 * via `tokens.refresh_token || refreshToken` (treats "" as absent), but the
 * Antigravity executor's `refreshCredentials` used
 * `typeof tokens.refresh_token === "string" ? tokens.refresh_token : credentials.refreshToken`
 * — and `typeof "" === "string"` is true, so an empty-string response
 * OVERWROTE the good token with "", effectively nulling it on first refresh.
 *
 * This regression guard asserts the executor preserves the existing refresh
 * token when the upstream returns it empty or omits it.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

const OLD_REFRESH = "1//old-non-rotating-refresh-token";

async function withStubbedFetch<T>(
  jsonBody: Record<string, unknown>,
  fn: () => Promise<T>
): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(jsonBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  try {
    return await fn();
  } finally {
    globalThis.fetch = original;
  }
}

test("#3850 empty-string refresh_token from Google preserves the existing token", async () => {
  const executor = new AntigravityExecutor();
  const refreshed = await withStubbedFetch(
    { access_token: "new-access", refresh_token: "", expires_in: 3600 },
    () => executor.refreshCredentials({ refreshToken: OLD_REFRESH, accessToken: "stale" })
  );

  assert.ok(refreshed, "refreshCredentials should return credentials, not null");
  assert.equal(refreshed.accessToken, "new-access");
  assert.equal(
    refreshed.refreshToken,
    OLD_REFRESH,
    "empty-string refresh_token must NOT overwrite the stored token"
  );
});

test("#3850 omitted refresh_token from Google preserves the existing token", async () => {
  const executor = new AntigravityExecutor();
  const refreshed = await withStubbedFetch({ access_token: "new-access", expires_in: 3600 }, () =>
    executor.refreshCredentials({ refreshToken: OLD_REFRESH, accessToken: "stale" })
  );

  assert.ok(refreshed);
  assert.equal(refreshed.refreshToken, OLD_REFRESH);
});

test("#3850 a real rotated refresh_token still replaces the stored token", async () => {
  const executor = new AntigravityExecutor();
  const refreshed = await withStubbedFetch(
    { access_token: "new-access", refresh_token: "1//brand-new-token", expires_in: 3600 },
    () => executor.refreshCredentials({ refreshToken: OLD_REFRESH, accessToken: "stale" })
  );

  assert.ok(refreshed);
  assert.equal(refreshed.refreshToken, "1//brand-new-token");
});
