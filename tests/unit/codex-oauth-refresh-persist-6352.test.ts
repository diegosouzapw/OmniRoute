/**
 * #6352 — Codex/ChatGPT OAuth refresh: reuse + persist + rotate + clear stale
 * "auth failed" state.
 *
 * Reported symptom: a ChatGPT Plus account added via Codex OAuth stops working
 * after ~2 days and the dashboard's manual "Refresh token" button is reported
 * as "not enough" — after clicking it the connection still shows `auth failed`.
 *
 * Root cause traced in this PR: `updateProviderCredentials()`
 * (src/sse/services/tokenRefresh.ts) is the shared onPersist callback for every
 * refresh entry point (the manual refresh route, the reactive per-request
 * refresh in chat.ts's `checkAndRefreshToken`, the Codex auth-file importer).
 * It correctly persists the new accessToken/refreshToken/expiresAt — but it
 * NEVER cleared the stale auth-failure metadata (`testStatus`, `lastError`,
 * `lastErrorType`, `lastErrorSource`, `errorCode`) left over from a prior
 * expired/invalid refresh or upstream 401/403. Only the separate background
 * health-check sweep (tokenHealthCheck.ts::checkConnection) did this clearing
 * inline in its own onPersist callback. So a refresh that ACTUALLY succeeded
 * — reusing the stored refresh_token, obtaining a fresh access_token, and even
 * rotating in a new refresh_token — still left the connection displaying
 * "Auth Failed" forever, because nothing ever reset the error columns.
 *
 * This test drives `checkAndRefreshToken("codex", ...)` — the exact function
 * the real per-request refresh path (src/sse/handlers/chat.ts) calls — against
 * a connection pre-seeded in a stale "auth failed" state, with a mocked Codex
 * token endpoint. It asserts:
 *   (a) the refresh REUSES the stored refresh_token (request body assertion),
 *   (b) the refreshed access_token is PERSISTED back to the connection row,
 *   (c) a ROTATED refresh_token REPLACES the previously stored one,
 *   (d) the stale testStatus/lastError* auth-failure fields are CLEARED so the
 *       dashboard stops showing "Auth Failed" after a refresh that worked.
 *
 * (d) is the part that reproduces the reported bug: before the fix in
 * src/sse/services/tokenRefresh.ts, this assertion fails (RED) because
 * updateProviderCredentials left testStatus/lastError untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-refresh-6352-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-6352";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");
const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

type ConnectionRecord = {
  id: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  testStatus?: string | null;
  lastError?: string | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
  errorCode?: string | null;
};

type FetchOptions = { body?: string };

async function withMockedFetch<T>(
  fetchImpl: (url: unknown, options?: FetchOptions) => Promise<Response>,
  fn: () => Promise<T>
): Promise<T> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl as typeof fetch;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("checkAndRefreshToken reuses the stored Codex refresh_token, persists the new access_token, rotates the refresh_token, and clears stale auth-failure state (#6352)", async () => {
  const now = Date.now();

  // Seed a connection in the exact "auth failed" state the issue describes:
  // a prior refresh/request failure left testStatus/lastError* populated.
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "ChatGPT Plus (Codex OAuth)",
    accessToken: "codex-stale-access",
    refreshToken: "codex-stored-refresh-token",
    // Already past the 5-minute Codex refresh lead → checkAndRefreshToken refreshes.
    expiresAt: new Date(now - 60_000).toISOString(),
    testStatus: "invalid",
    lastError: "Refresh token expired. Please re-authenticate this account.",
    lastErrorAt: new Date(now - 120_000).toISOString(),
    lastErrorType: "upstream_auth_error",
    lastErrorSource: "oauth",
    errorCode: "401",
  } as unknown as Record<string, unknown>);
  const connectionId = (connection as ConnectionRecord).id;

  const capturedRequests: Array<{ url: string; body: string }> = [];

  await withMockedFetch(
    async (url, options: FetchOptions = {}) => {
      const body = String(options?.body ?? "");
      capturedRequests.push({ url: String(url), body });
      assert.equal(String(url), OAUTH_ENDPOINTS.openai.token);

      // (a) REUSE assertion: the refresh request must present the refresh_token
      // that was actually stored on the connection — not a re-run of the full
      // authorization_code flow, and not a stale/blank token.
      const params = new URLSearchParams(body);
      assert.equal(params.get("grant_type"), "refresh_token");
      assert.equal(
        params.get("refresh_token"),
        "codex-stored-refresh-token",
        "must reuse the connection's stored refresh_token"
      );

      // Simulate OpenAI rotating in a brand-new refresh_token on this refresh.
      return jsonResponse({
        access_token: "codex-fresh-access-token",
        refresh_token: "codex-rotated-refresh-token",
        expires_in: 3600,
      });
    },
    async () => {
      const connSnapshot = connection as ConnectionRecord;
      const refreshed = await tokenRefresh.checkAndRefreshToken("codex", {
        connectionId,
        accessToken: connSnapshot.accessToken,
        refreshToken: connSnapshot.refreshToken,
        expiresAt: (connection as Record<string, unknown>).expiresAt,
      });

      assert.equal(capturedRequests.length, 1, "the Codex token endpoint must be hit exactly once");

      // The in-memory result returned to the caller carries the fresh tokens.
      assert.equal(refreshed.accessToken, "codex-fresh-access-token");
      assert.equal(refreshed.refreshToken, "codex-rotated-refresh-token");

      const stored = (await providersDb.getProviderConnectionById(
        connectionId
      )) as ConnectionRecord;

      // (b) PERSIST assertion: the refreshed access_token must be saved to the row.
      assert.equal(
        stored.accessToken,
        "codex-fresh-access-token",
        "the refreshed access_token must be persisted back to the connection"
      );

      // (c) ROTATION assertion: the new refresh_token must REPLACE the old one.
      assert.equal(
        stored.refreshToken,
        "codex-rotated-refresh-token",
        "a rotated refresh_token must replace the previously stored one"
      );
      assert.notEqual(
        stored.refreshToken,
        "codex-stored-refresh-token",
        "the stale, already-consumed refresh_token must not remain stored"
      );

      // (d) CLEAR-STALE-STATE assertion: a successful refresh must clear the
      // auth-failure fields that drive the dashboard's "Auth Failed" badge.
      // Before the fix these remained "invalid" / "upstream_auth_error" / "401"
      // even though the token had genuinely refreshed.
      assert.equal(
        stored.testStatus,
        "active",
        "testStatus must clear to active after a successful refresh"
      );
      // The read path (getProviderConnectionById) strips null-valued columns via
      // cleanNulls(), so a cleared column surfaces as `undefined`, not `null` —
      // both mean "cleared" here.
      assert.equal(stored.lastError ?? null, null, "lastError must be cleared");
      assert.equal(stored.lastErrorType ?? null, null, "lastErrorType must be cleared");
      assert.equal(stored.lastErrorSource ?? null, null, "lastErrorSource must be cleared");
      assert.equal(stored.errorCode ?? null, null, "errorCode must be cleared");
    }
  );
});
