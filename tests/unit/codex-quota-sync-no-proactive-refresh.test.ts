/**
 * Codex multi-account family-revocation cascade — quota-sync trigger.
 *
 * The Quota / Providers dashboard (POST /api/usage/provider-limits ->
 * syncAllProviderLimits, and GET /api/usage/[connectionId]) calls
 * refreshAndUpdateCredentials() for each connection, in chunks of N CONCURRENT.
 * For rotating-refresh providers (Codex/OpenAI share one Auth0 client_id) a
 * single-use refresh_token is rotated on every refresh; refreshing several
 * sibling accounts concurrently makes Auth0 revoke the WHOLE token family
 * (openai/codex#9648) -> every account but the last dies with `[403] <!DOCTYPE`.
 *
 * On the affected VM expires_at is persisted as ~0, so needsRefresh() is
 * effectively always true -> every codex account gets refreshed on every page
 * visit -> guaranteed cascade.
 *
 * Fix: refreshAndUpdateCredentials must NEVER proactively rotate the
 * refresh_token of a rotating-refresh provider. The quota fetch reuses the
 * current access_token (multi-day) and genuine expiry is handled by the
 * reactive, serialized 401 path during real requests. Non-rotating providers
 * must keep refreshing proactively (no over-broadening).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-quota-"));

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { refreshAndUpdateCredentials } = await import("../../src/lib/usage/providerLimits.ts");

test("codex: quota-sync must NOT proactively rotate the refresh_token (Auth0 family-revocation cascade guard)", async () => {
  const exec = getExecutor("codex");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  let refreshCalls = 0;
  // Simulate the VM state: expires_at ~0 makes needsRefresh always-true.
  exec.needsRefresh = () => true;
  exec.refreshCredentials = async () => {
    refreshCalls++;
    return null;
  };
  try {
    const result = await refreshAndUpdateCredentials({
      id: "codex-1",
      provider: "codex",
      accessToken: "existing-access-token",
      refreshToken: "rotating-refresh-token",
      tokenExpiresAt: new Date(2000).toISOString(),
      providerSpecificData: {},
    });
    assert.equal(
      refreshCalls,
      0,
      "the rotating refresh_token must NOT be exercised from the quota-sync path"
    );
    assert.equal(result.refreshed, false, "no proactive refresh happened");
    assert.equal(
      result.connection.accessToken,
      "existing-access-token",
      "the current access_token is reused for the quota fetch"
    );
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});

test("non-rotating OAuth provider is still refreshed proactively from quota-sync (gate is not over-broad)", async () => {
  const exec = getExecutor("cursor");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  let refreshCalls = 0;
  exec.needsRefresh = () => true;
  // null -> non-github -> surfaces a 401; proves the refresh was actually attempted.
  exec.refreshCredentials = async () => {
    refreshCalls++;
    return null;
  };
  try {
    await assert.rejects(
      refreshAndUpdateCredentials({
        id: "cursor-1",
        provider: "cursor",
        accessToken: "a",
        refreshToken: "r",
        tokenExpiresAt: new Date(2000).toISOString(),
        providerSpecificData: {},
      }),
      "a non-rotating provider with a failed refresh should surface the 401"
    );
    assert.equal(
      refreshCalls,
      1,
      "non-rotating provider must still attempt the proactive refresh"
    );
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});
