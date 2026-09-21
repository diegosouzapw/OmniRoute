/**
 * #12594 — Cline 401 "re-authenticate your Cline account" was classified
 * UNAUTHORIZED → resolveTerminalConnectionStatus → expired, then the cooling
 * panel hardcoded that cooldown as a 429. Token refresh (cline.ts) never ran.
 *
 * Reporter body (issue):
 *   [401]: Unauthorized: Please make sure you're using the latest version of
 *   Cline and re-authenticate your Cline account.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CLINE_401 =
  "[401]: Unauthorized: Please make sure you're using the latest version of Cline and re-authenticate your Cline account.";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12594-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "12594-test-secret";

const { isOAuthInvalidToken } = await import("../../open-sse/services/accountFallback.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12594 isOAuthInvalidToken matches Cline re-authenticate phrasing", () => {
  assert.equal(isOAuthInvalidToken(CLINE_401), true);
  assert.equal(isOAuthInvalidToken("plain rate limit"), false);
  // Must not swallow unrelated 401s that only say "re-authenticate" without Cline.
  assert.equal(isOAuthInvalidToken("Please re-authenticate the connection."), false);
});

test("#12594 classifyProviderError maps Cline 401 to OAUTH_INVALID_TOKEN", () => {
  assert.equal(
    classifyProviderError(401, CLINE_401, "cline"),
    PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN
  );
});

test("#12594 Cline 401 is not a terminal expired/banned status", () => {
  const classified = classifyProviderError(401, CLINE_401, "cline");
  assert.equal(
    resolveTerminalConnectionStatus(401, {}, classified, "cline", false, CLINE_401),
    null
  );
});

test("#12594 markAccountUnavailable keeps Cline 401 refreshable (not expired)", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  const conn = await providersDb.createProviderConnection({
    provider: "cline",
    authType: "oauth",
    accessToken: "cline-access",
    refreshToken: "cline-refresh",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    401,
    CLINE_401,
    "cline",
    "sonnet4.6-500k"
  );
  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(after.testStatus, "active");
  assert.equal(after.lastErrorType, "oauth_invalid_token");
  assert.notEqual(after.testStatus, "expired");
});
