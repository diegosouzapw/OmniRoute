// Unit tests for API key self-service sessions endpoints:
// GET /v1/me/sessions and GET /v1/me/sessions/[id].
// Verifies filtering, pagination, sorting, privacy (connection stripping), and tenant isolation.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const agentSessionsDb = await import("../../src/lib/db/agentSessions.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { buildApiKeySelfServiceSessions, buildApiKeySelfServiceSessionDetail } =
  await import("../../src/lib/usage/apiKeySelfService.ts");
const { GET: getSessionsRoute } = await import("../../src/app/api/v1/me/sessions/route.ts");
const { GET: getSessionDetailRoute } =
  await import("../../src/app/api/v1/me/sessions/[id]/route.ts");
const { SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE } =
  await import("../../src/shared/constants/selfServiceScopes.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let keyAliceToken = "";
let keyAliceId = "";
let _keyBobToken = "";
let keyBobId = "";
let keyNoScopeToken = "";
let sessionAlice1 = "";
let _sessionAlice2 = "";
let sessionBob = "";

test.before(async () => {
  // Create API keys
  const aliceKey = await apiKeysDb.createApiKey("Alice Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyAliceToken = aliceKey.key;
  keyAliceId = aliceKey.id;

  const bobKey = await apiKeysDb.createApiKey("Bob Key", "test-machine", [SELF_USAGE_SCOPE]);
  _keyBobToken = bobKey.key;
  keyBobId = bobKey.id;

  const noScopeKey = await apiKeysDb.createApiKey("No Scope Key", "test-machine", []);
  keyNoScopeToken = noScopeKey.key;

  // Record sessions for Alice
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 100,
    timestamp: "2026-09-25T10:00:00.000Z",
    connectionId: "conn-secret-1",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
  });

  await usageHistory.saveRequestUsage({
    provider: "anthropic",
    model: "claude-sonnet-5",
    tokens: { input: 500, output: 200 },
    success: true,
    latencyMs: 200,
    timestamp: "2026-09-25T11:00:00.000Z",
    connectionId: "conn-secret-2",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "codex",
      clientSessionId: "alice-sess-2",
      projectName: "frontend",
      projectRepo: "github.com/acme/frontend",
      projectPath: "/home/alice/frontend",
      projectSource: "path",
      gitBranch: "feat/ui",
    },
  });

  // Record session for Bob
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 50, output: 25 },
    success: true,
    latencyMs: 50,
    timestamp: "2026-09-25T12:00:00.000Z",
    connectionId: "conn-secret-bob",
    apiKeyId: keyBobId,
    apiKeyName: "Bob Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "bob-sess-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/bob/billing",
      projectSource: "path",
      gitBranch: "fix/bug",
    },
  });

  const db = core.getDbInstance();
  const aliceSessions = agentSessionsDb.listAgentSessions(db, { apiKeyId: keyAliceId });
  sessionAlice1 = aliceSessions.sessions.find((s) => s.clientSessionId === "alice-sess-1")!.id;
  _sessionAlice2 = aliceSessions.sessions.find((s) => s.clientSessionId === "alice-sess-2")!.id;
  const bobSessions = agentSessionsDb.listAgentSessions(db, { apiKeyId: keyBobId });
  sessionBob = bobSessions.sessions[0].id;
});

test("buildApiKeySelfServiceSessions lists only calling key's sessions and strips connection IDs", async () => {
  const result = await buildApiKeySelfServiceSessions({
    id: keyAliceId,
    scopes: [SELF_USAGE_SCOPE],
  });

  assert.equal(result.total, 2);
  assert.equal(result.sessions.length, 2);
  assert.ok(result.sessions.every((s) => s.apiKeyId === keyAliceId));

  // Connection ID stripped without self:account-quota scope
  for (const s of result.sessions) {
    assert.equal("lastConnectionId" in s, false);
  }
});

test("buildApiKeySelfServiceSessions preserves connection IDs with self:account-quota scope", async () => {
  const result = await buildApiKeySelfServiceSessions({
    id: keyAliceId,
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
  });

  assert.equal(result.total, 2);
  const s1 = result.sessions.find((s) => s.clientSessionId === "alice-sess-1");
  assert.ok(s1);
  assert.equal(s1.lastConnectionId, "conn-secret-1");
});

test("buildApiKeySelfServiceSessions filters by project and client", async () => {
  const byProject = await buildApiKeySelfServiceSessions(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    { project: "billing-api" }
  );
  assert.equal(byProject.total, 1);
  assert.equal(byProject.sessions[0].projectName, "billing-api");

  const byClient = await buildApiKeySelfServiceSessions(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    { client: "codex" }
  );
  assert.equal(byClient.total, 1);
  assert.equal(byClient.sessions[0].client, "codex");
});

test("buildApiKeySelfServiceSessions throws without self:usage scope", async () => {
  await assert.rejects(
    () => buildApiKeySelfServiceSessions({ id: keyAliceId, scopes: [] }),
    /missing_self_usage_scope/
  );
});

test("buildApiKeySelfServiceSessionDetail returns session with recent requests", async () => {
  const detail = await buildApiKeySelfServiceSessionDetail(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    sessionAlice1
  );

  assert.ok(detail);
  assert.equal(detail.session.id, sessionAlice1);
  assert.equal(detail.session.projectName, "billing-api");
  assert.equal("lastConnectionId" in detail.session, false);
  assert.ok(detail.recentRequests.length >= 1);
  assert.equal(detail.recentRequests[0].model, "gpt-4o");
  assert.equal("connectionId" in detail.recentRequests[0], false);
});

test("buildApiKeySelfServiceSessionDetail refuses access to another key's session", async () => {
  const detail = await buildApiKeySelfServiceSessionDetail(
    { id: keyAliceId, scopes: [SELF_USAGE_SCOPE] },
    sessionBob
  );
  assert.equal(detail, null);
});

test("route GET /v1/me/sessions requires authentication and self:usage scope", async () => {
  // No auth header -> 401
  const resNoAuth = await getSessionsRoute(new Request("http://localhost/api/v1/me/sessions"));
  assert.equal(resNoAuth.status, 401);

  // Missing scope -> 403
  const resNoScope = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions", {
      headers: { Authorization: `Bearer ${keyNoScopeToken}` },
    })
  );
  assert.equal(resNoScope.status, 403);
});

test("route GET /v1/me/sessions validates query params and returns session list", async () => {
  // Bad limit -> 400
  const resBadLimit = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions?limit=500", {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    })
  );
  assert.equal(resBadLimit.status, 400);

  // Valid query -> 200
  const resValid = await getSessionsRoute(
    new Request("http://localhost/api/v1/me/sessions?project=billing-api&limit=10", {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    })
  );
  assert.equal(resValid.status, 200);
  const data = await resValid.json();
  assert.equal(data.total, 1);
  assert.equal(data.sessions[0].projectName, "billing-api");
});

test("route GET /v1/me/sessions/[id] returns detail or 404 for foreign session", async () => {
  // Valid own session -> 200
  const resOwn = await getSessionDetailRoute(
    new Request(`http://localhost/api/v1/me/sessions/${sessionAlice1}`, {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    }),
    { params: Promise.resolve({ id: sessionAlice1 }) }
  );
  assert.equal(resOwn.status, 200);
  const data = await resOwn.json();
  assert.equal(data.session.id, sessionAlice1);
  assert.equal(data.recentRequests.length, 1);

  // Foreign session -> 404
  const resForeign = await getSessionDetailRoute(
    new Request(`http://localhost/api/v1/me/sessions/${sessionBob}`, {
      headers: { Authorization: `Bearer ${keyAliceToken}` },
    }),
    { params: Promise.resolve({ id: sessionBob }) }
  );
  assert.equal(resForeign.status, 404);
});
