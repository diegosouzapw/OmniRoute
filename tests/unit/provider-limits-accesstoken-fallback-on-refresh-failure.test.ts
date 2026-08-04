/**
 * Graceful-degradation fallback when `refreshCredentials` returns null but the
 * connection still holds a usable `accessToken`.
 *
 * Previously this fallback was qualified to `connection.provider === "github"`:
 * every OTHER OAuth provider whose refresh momentarily failed was hard-failed
 * with "Failed to refresh credentials. Please re-authorize the connection.",
 * even though a still-valid access token was on hand. The fix drops the
 * github-specific qualifier so the fallback applies to ANY provider that still
 * has an accessToken.
 *
 * Before the fix this test fails: a non-github provider would throw the 401
 * re-authorize error. After the fix it returns `{ refreshed: false }`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-accesstoken-fallback-")
);

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { refreshAndUpdateCredentials } = await import("../../src/lib/usage/providerLimits.ts");

// `gemini` is a non-rotating (no rotation lock group), non-github OAuth provider,
// so `shouldAttemptRotatingRefresh` is true and the refresh path is reached.
function geminiConnection() {
  return {
    id: "gemini-fallback-1",
    provider: "gemini",
    accessToken: "still-valid-access-token",
    refreshToken: "some-refresh-token",
    tokenExpiresAt: new Date(Date.now() - 60_000).toISOString(), // expired → needsRefresh fires
    providerSpecificData: {},
  };
}

test("falls back to the existing accessToken for a non-github provider when refreshCredentials returns null", async () => {
  const exec = getExecutor("gemini");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  exec.needsRefresh = () => true; // force the refresh attempt
  exec.refreshCredentials = async () => null; // upstream refresh failed
  try {
    const result = await refreshAndUpdateCredentials(geminiConnection(), {
      allowRotatingRefresh: true,
    });
    assert.equal(
      result.refreshed,
      false,
      "a non-github provider with an accessToken must fall back, not throw"
    );
    assert.equal(
      result.connection.accessToken,
      "still-valid-access-token",
      "the existing access token must be preserved"
    );
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});

test("still throws when refresh fails AND there is no accessToken to fall back on", async () => {
  const exec = getExecutor("gemini");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  exec.needsRefresh = () => true;
  exec.refreshCredentials = async () => null;
  try {
    const conn = geminiConnection();
    conn.accessToken = ""; // no usable token → must not silently degrade
    await assert.rejects(
      () => refreshAndUpdateCredentials(conn, { allowRotatingRefresh: true }),
      /Failed to refresh credentials/,
      "without an accessToken the refresh failure must surface as an error"
    );
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});
