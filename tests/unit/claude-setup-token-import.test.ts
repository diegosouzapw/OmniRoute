// `claude setup-token` import through POST /api/oauth/claude/import-token.
//
// The token is a 1-year OAuth access token scoped to `user:inference` only: no
// refresh token, and bootstrap/profile answer 403, so the connection has no email.
// The route must verify it with one live request before storing it, and must
// match a re-import on the token itself. Anthropic is stubbed at globalThis.fetch.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-setup-token-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const { shouldMarkRefreshCapableExpired } = await import("../../src/lib/tokenHealthCheckExpiry.ts");

const SETUP_TOKEN = "sk-ant-oat01-unit-test-setup-token-aaaaaaaaaaaaaaaaaaaaaaaa";
const originalFetch = globalThis.fetch;

type Probe = { url: string; authorization: string | null };

function stubAnthropic(status: number): Probe[] {
  const probes: Probe[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    const headers = new Headers(init.headers);
    probes.push({ url, authorization: headers.get("authorization") });
    const body =
      status === 200
        ? { id: "msg_test", type: "message", role: "assistant", content: [], usage: {} }
        : { type: "error", error: { type: "authentication_error", message: "invalid" } };
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  return probes;
}

async function importToken(body: Record<string, unknown>) {
  const request = new Request("http://localhost:20128/api/oauth/claude/import-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await route.POST(request, {
    params: Promise.resolve({ provider: "claude", action: "import-token" }),
  });
  return { status: response.status, body: await response.json() };
}

async function claudeRows() {
  return providersDb.getProviderConnections({ provider: "claude" });
}

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  for (const row of await claudeRows()) {
    await providersDb.deleteProviderConnection(row.id);
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("importToken_ValidSetupToken_CreatesRefreshLessOAuthConnection", async () => {
  const probes = stubAnthropic(200);

  const { status, body } = await importToken({ token: `  ${SETUP_TOKEN}\n` });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  const rows = await claudeRows();
  assert.equal(rows.length, 1);
  const row = rows[0];
  assert.equal(row.authType, "oauth");
  assert.equal(row.accessToken, SETUP_TOKEN);
  assert.ok(!row.refreshToken);
  assert.ok(!row.expiresAt);
  assert.equal(row.name, "Setup token");
  assert.match(String(row.providerSpecificData?.cliUserID), /^[a-f0-9]{64}$/);
  const inference = probes.filter((p) => p.url.startsWith("https://api.anthropic.com/v1/messages"));
  assert.equal(inference.length, 1);
  assert.equal(inference[0].authorization, `Bearer ${SETUP_TOKEN}`);
});

test("importToken_ImportedSetupToken_IsNotCondemnedByHealthSweep", async () => {
  stubAnthropic(200);

  await importToken({ token: SETUP_TOKEN });

  const [row] = await claudeRows();
  assert.equal(shouldMarkRefreshCapableExpired(row, true), false);
});

test("importToken_TokenWithoutSetupTokenPrefix_Returns400WithoutProbing", async () => {
  const probes = stubAnthropic(200);

  const { status, body } = await importToken({ token: "sk-ant-api03-not-an-oauth-token" });

  assert.equal(status, 400);
  assert.equal(body.success, false);
  assert.match(body.error, /claude setup-token/);
  assert.equal(probes.length, 0);
  assert.equal((await claudeRows()).length, 0);
});

test("importToken_NonStringToken_Returns400", async () => {
  stubAnthropic(200);

  const { status } = await importToken({ token: { accessToken: SETUP_TOKEN } });

  assert.equal(status, 400);
  assert.equal((await claudeRows()).length, 0);
});

test("importToken_AnthropicRejectsToken_Returns400AndStoresNothing", async () => {
  stubAnthropic(401);

  const { status, body } = await importToken({ token: SETUP_TOKEN });

  assert.equal(status, 400);
  assert.match(
    body.error,
    /Could not verify this setup token with Anthropic \(Invalid OAuth token\)/
  );
  assert.equal((await claudeRows()).length, 0);
});

test("importToken_SameTokenTwice_UpdatesOneConnectionAndKeepsDeviceIdentity", async () => {
  stubAnthropic(200);

  const first = await importToken({ token: SETUP_TOKEN });
  const [before] = await claudeRows();
  const second = await importToken({ token: SETUP_TOKEN });

  const rows = await claudeRows();
  assert.equal(rows.length, 1);
  assert.equal(second.body.connection.id, first.body.connection.id);
  assert.equal(rows[0].providerSpecificData?.cliUserID, before.providerSpecificData?.cliUserID);
});

test("importToken_ReauthWithConnectionId_ReplacesThatConnectionsToken", async () => {
  stubAnthropic(200);
  const first = await importToken({ token: SETUP_TOKEN });
  const rotated = `${SETUP_TOKEN}-rotated`;

  const second = await importToken({ token: rotated, connectionId: first.body.connection.id });

  const rows = await claudeRows();
  assert.equal(rows.length, 1);
  assert.equal(second.body.connection.id, first.body.connection.id);
  assert.equal(rows[0].accessToken, rotated);
});

test("importToken_DifferentTokenWithoutConnectionId_CreatesSecondConnection", async () => {
  stubAnthropic(200);

  await importToken({ token: SETUP_TOKEN });
  await importToken({ token: `${SETUP_TOKEN}-other-account` });

  assert.equal((await claudeRows()).length, 2);
});
