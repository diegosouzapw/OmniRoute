// Regression tests for the #11954 follow-up: since bulk imports mirror
// workspaceId (commit 8180b3213), a re-import of an already-connected account
// flows into createProviderConnection()'s Codex oauth upsert (matched on
// email + providerSpecificData.workspaceId). That upsert replaces the columns
// supplied by the payload wholesale, so the import used to:
//   (a) clobber providerSpecificData — losing chatgptUserId / organizations /
//       workspacePlanType (written by the OAuth login flow), runtime quota
//       state (codexExhaustedWindowByScope / codexScopeRateLimitedUntil) and
//       the operator-set codexFingerprintMode;
//   (b) leave the row's stale tokenExpiresAt behind (the payload only carried
//       expiresAt), so the dashboard badge — which prefers tokenExpiresAt —
//       kept showing "Token Expired" for freshly imported tokens;
//   (c) overwrite the matched row's priority with the forwarded 9router
//       priority WITHOUT reordering siblings, creating duplicate priorities.
//
// global.fetch is mocked to throw so the pre-persist refresh_token validation
// (#7522) is inconclusive and the originally supplied tokens are imported.
//
// DB handles are released in test.after (CLAUDE.md learning: unreleased
// SQLite handles hang node:test).

import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-import-11954-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/codex/import/route.ts");

beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PAST_ISO = "2026-01-01T00:00:00.000Z";
const FUTURE_ISO = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

const WORKSPACE_ID = "ws-acct-11954";
const EMAIL = "operator@example.com";

/** Unsigned JWT with a base64url payload — enough for the import's decode. */
function makeJwt(payload: Record<string, unknown>): string {
  const seg = (obj: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `${seg({ alg: "none", typ: "JWT" })}.${seg(payload)}.sig`;
}

const IMPORT_ID_TOKEN = makeJwt({
  email: EMAIL,
  "https://api.openai.com/auth": {
    chatgpt_account_id: WORKSPACE_ID,
    chatgpt_plan_type: "pro",
  },
});

/** The operator/runtime state a re-import can never know about. */
const EXISTING_PSD = {
  workspaceId: WORKSPACE_ID,
  chatgptAccountId: WORKSPACE_ID,
  chatgptUserId: "user-11954",
  organizations: [{ id: "org-1", title: "Team WS", role: "member" }],
  workspacePlanType: "team",
  codexFingerprintMode: "full",
  codexExhaustedWindowByScope: { primary: "2026-08-30T00:00:00.000Z" },
  codexScopeRateLimitedUntil: { primary: "2026-08-30T01:00:00.000Z" },
};

async function createExistingConnection() {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Operator Codex",
    email: EMAIL,
    accessToken: "old-access",
    refreshToken: "old-refresh",
    expiresAt: PAST_ISO,
    tokenExpiresAt: PAST_ISO,
    providerSpecificData: { ...EXISTING_PSD },
  });
  assert.ok(connection && typeof connection.id === "string");
  return connection as Record<string, unknown>;
}

async function postImport(body: unknown) {
  const originalFetch = globalThis.fetch;
  // Transient validation failure → import proceeds with the supplied tokens.
  globalThis.fetch = (async () => {
    throw new Error("ECONNRESET");
  }) as unknown as typeof fetch;
  try {
    const request = new Request("http://localhost:20128/api/oauth/codex/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await route.POST(request);
    return { status: response.status, body: await response.json() };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function importRecord(extra: Record<string, unknown> = {}) {
  return {
    access_token: "imported-access",
    refresh_token: "imported-refresh",
    id_token: IMPORT_ID_TOKEN,
    expired: FUTURE_ISO,
    ...extra,
  };
}

async function getCodexRows() {
  return (await providersDb.getProviderConnections({
    provider: "codex",
    authType: "oauth",
  })) as Array<Record<string, unknown>>;
}

test("(a) re-import keeps the existing row's providerSpecificData while updating the import's own keys", async () => {
  const existing = await createExistingConnection();

  const { status, body } = await postImport({ accounts: importRecord() });
  assert.equal(status, 200);
  assert.equal(body.success, true, JSON.stringify(body));

  const rows = await getCodexRows();
  assert.equal(rows.length, 1, "matching re-import must upsert, not add a row");
  const row = rows[0];
  assert.equal(row.id, existing.id);
  assert.equal(row.accessToken, "imported-access", "fresh credentials must apply");

  const psd = row.providerSpecificData as Record<string, unknown>;
  // State only the OAuth login / runtime / operator writes — must survive.
  assert.equal(psd.chatgptUserId, EXISTING_PSD.chatgptUserId);
  assert.deepEqual(psd.organizations, EXISTING_PSD.organizations);
  assert.equal(psd.workspacePlanType, EXISTING_PSD.workspacePlanType);
  assert.equal(psd.codexFingerprintMode, EXISTING_PSD.codexFingerprintMode);
  assert.deepEqual(psd.codexExhaustedWindowByScope, EXISTING_PSD.codexExhaustedWindowByScope);
  assert.deepEqual(psd.codexScopeRateLimitedUntil, EXISTING_PSD.codexScopeRateLimitedUntil);
  // The import's own keys must still update.
  assert.equal(psd.chatgptPlanType, "pro");
  assert.equal(psd.workspaceId, WORKSPACE_ID);
  assert.equal(psd.chatgptAccountId, WORKSPACE_ID);
});

test("(b) re-import refreshes tokenExpiresAt alongside expiresAt", async () => {
  await createExistingConnection();

  const { body } = await postImport({ accounts: importRecord() });
  assert.equal(body.success, true, JSON.stringify(body));

  const rows = await getCodexRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].expiresAt, FUTURE_ISO);
  assert.equal(
    rows[0].tokenExpiresAt,
    FUTURE_ISO,
    "the dashboard badge prefers tokenExpiresAt — a stale value shows 'Token Expired'"
  );
});

test("(c) re-import keeps the operator's priority and never duplicates a sibling's", async () => {
  const existing = await createExistingConnection(); // auto priority 1
  const sibling = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Other Codex",
    email: "other@example.com",
    accessToken: "other-access",
    refreshToken: "other-refresh",
    providerSpecificData: { workspaceId: "ws-other" },
  }); // auto priority 2
  assert.ok(sibling);

  // 9router exports forward a priority; here it collides with the sibling's.
  const { body } = await postImport({ accounts: importRecord({ priority: 2 }) });
  assert.equal(body.success, true, JSON.stringify(body));

  const rows = await getCodexRows();
  assert.equal(rows.length, 2);
  const matched = rows.find((r) => r.id === existing.id);
  assert.ok(matched);
  assert.equal(matched?.priority, 1, "matched row must keep the operator's priority");
  const priorities = rows.map((r) => Number(r.priority)).sort();
  assert.deepEqual(priorities, [1, 2], "priorities must stay unique");
});

test("import with no existing match creates a row with tokenExpiresAt and a unique priority", async () => {
  const sibling = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Other Codex",
    email: "other@example.com",
    accessToken: "other-access",
    refreshToken: "other-refresh",
    providerSpecificData: { workspaceId: "ws-other" },
  }); // auto priority 1
  assert.ok(sibling);

  const { body } = await postImport({ accounts: importRecord({ priority: 5 }) });
  assert.equal(body.success, true, JSON.stringify(body));

  const rows = await getCodexRows();
  assert.equal(rows.length, 2, "no existing email+workspaceId match — a new row is created");
  const created = rows.find((r) => r.id !== sibling.id);
  assert.equal(created?.tokenExpiresAt, FUTURE_ISO);
  // The create path runs reorderConnections, which compacts priorities to 1..N.
  const priorities = rows.map((r) => Number(r.priority)).sort();
  assert.deepEqual(priorities, [1, 2], "priorities stay unique after a brand-new import");
});
