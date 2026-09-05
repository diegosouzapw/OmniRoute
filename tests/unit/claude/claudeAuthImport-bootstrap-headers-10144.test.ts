import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The production import helper reaches the real SQLite provider module. Give
// this file its own database even when it is run without the package harness.
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-import-10144-"));
process.env.DATA_DIR = testDataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

// Import the implementation under test. In particular, do not copy any of
// these helpers here: the regression must fail if claudeAuthImport.ts loses a
// required header or stops persisting the device identity.
const { createConnectionFromAuthFile, enrichWithBootstrap, parseAndValidateClaudeAuth } =
  await import("../../../src/lib/oauth/utils/claudeAuthImport.ts");
import { getClaudeCodeUserAgent } from "../../../src/shared/constants/claudeCodeClient.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("real enrichWithBootstrap sends the required CLI headers", async () => {
  const captured: { url: string; headers: Headers } = {
    url: "",
    headers: new Headers(),
  };

  globalThis.fetch = (async (input, init) => {
    captured.url = String(input);
    captured.headers = new Headers(init?.headers);
    return new Response(
      JSON.stringify({
        account_uuid: "unit-account-10144",
        organization_uuid: "unit-org-10144",
        organization_name: "Unit Test Organization",
        organization_type: "team",
        rate_limit_tier: "default",
        account_email: "unit-10144@example.invalid",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const parsed = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "unit-test-access-token",
      refreshToken: "unit-test-refresh-token",
      scopes: ["user:inference"],
    },
  });
  const enriched = await enrichWithBootstrap(parsed);

  assert.equal(captured.url, "https://api.anthropic.com/api/claude_cli/bootstrap");
  assert.equal(captured.headers.get("authorization"), "Bearer unit-test-access-token");
  assert.equal(captured.headers.get("anthropic-version"), "2023-06-01");
  assert.equal(captured.headers.get("content-type"), "application/json");
  assert.equal(captured.headers.get("user-agent"), getClaudeCodeUserAgent("cli"));
  assert.equal(captured.headers.get("anthropic-beta"), "oauth-2025-04-20");
  assert.equal(enriched.accountUUID, "unit-account-10144");
  assert.equal(enriched.email, "unit-10144@example.invalid");
});

test("real createConnectionFromAuthFile persists and preserves cliUserID", async () => {
  const parsed = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "unit-test-access-token",
      refreshToken: "unit-test-refresh-token",
    },
  });
  const enriched = {
    ...parsed,
    email: "unit-10144@example.invalid",
    accountUUID: "unit-account-10144-persistent",
    organizationUUID: null,
    organizationName: null,
    organizationType: null,
  };

  const created = await createConnectionFromAuthFile(enriched, {});
  assert.equal(created.created, true);

  const createdProviderSpecificData = created.connection.providerSpecificData as Record<
    string,
    unknown
  >;
  const cliUserID = createdProviderSpecificData.cliUserID;
  assert.equal(typeof cliUserID, "string");
  assert.match(cliUserID as string, /^[a-f0-9]{64}$/);

  const overwritten = await createConnectionFromAuthFile(
    { ...enriched, accessToken: "unit-test-access-token-rotated" },
    { overwriteExisting: true }
  );

  assert.equal(overwritten.created, false);
  assert.equal(overwritten.connection.id, created.connection.id);
  assert.equal(
    (overwritten.connection.providerSpecificData as Record<string, unknown>).cliUserID,
    cliUserID,
    "re-import must preserve the persisted device identity"
  );
});
