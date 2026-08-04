// Route-wiring tests for /api/oauth/codex/import-token (#1290).
//
// Imports a Codex connection from a bare ChatGPT access token — no refresh
// token required. Auth is disabled via settings (requireLogin:false) so we
// reach the schema/decode logic rather than a 401. DB handles are released
// in test.after (CLAUDE.md learning: unreleased SQLite handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-import-token-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/codex/import-token/route.ts");

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function makeJwt(payload: Record<string, unknown>): string {
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const body = b64url(payload);
  return `${header}.${body}.signature`;
}

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function postImportToken(body: unknown) {
  const request = new Request("http://localhost:20128/api/oauth/codex/import-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await route.POST(request);
  return { status: response.status, body: await response.json() };
}

test("import-token: decodes email + workspace claims from the access token and creates a connection", async () => {
  const accessToken = makeJwt({
    email: "bare-token@example.com",
    "https://api.openai.com/auth": {
      chatgpt_account_id: "acct-bare",
      chatgpt_plan_type: "plus",
    },
  });

  const { status, body } = await postImportToken({ accessToken });
  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.equal(body.connection.provider, "codex");
  assert.equal(body.connection.email, "bare-token@example.com");

  const rows = await providersDb.getProviderConnections({ provider: "codex" });
  const created = rows.find((r) => r.id === body.connection.id);
  assert.equal(created?.authType, "access_token");
  assert.equal(created?.accessToken, accessToken);
  assert.ok(!created?.refreshToken, "no refresh token should be persisted");
  assert.deepEqual(created?.providerSpecificData, {
    chatgptAccountId: "acct-bare",
    chatgptPlanType: "plus",
  });
});

test("import-token: falls back to the explicit `name` when the JWT carries no email", async () => {
  const accessToken = makeJwt({
    "https://api.openai.com/auth": { chatgpt_account_id: "acct-noemail" },
  });

  const { status, body } = await postImportToken({ accessToken, name: "My Bare Token" });
  assert.equal(status, 200);
  assert.equal(body.connection.name, "My Bare Token");
});

test("import-token: missing accessToken fails schema validation with 400", async () => {
  const { status, body } = await postImportToken({});
  assert.equal(status, 400);
  assert.ok(typeof body.error.message === "string" && body.error.message.length > 0);
});

test("import-token: empty-string accessToken fails schema validation with 400", async () => {
  const { status } = await postImportToken({ accessToken: "   " });
  assert.equal(status, 400);
});

test("import-token: undecodable token with no name and no claims is rejected with 400", async () => {
  const { status, body } = await postImportToken({ accessToken: "not-a-jwt" });
  assert.equal(status, 400);
  assert.match(body.error.message, /decode|account info/i);
});

test("import-token: undecodable token IS accepted when an explicit name is supplied", async () => {
  const { status, body } = await postImportToken({
    accessToken: "not-a-jwt-but-thats-ok",
    name: "Manually Labeled",
  });
  assert.equal(status, 200);
  assert.equal(body.connection.name, "Manually Labeled");
});

test("import-token: malformed JSON body is rejected with 400", async () => {
  const request = new Request("http://localhost:20128/api/oauth/codex/import-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not json",
  });
  const response = await route.POST(request);
  assert.equal(response.status, 400);
});

test("import-token: repeated imports for the same email never dedup (each is a new connection)", async () => {
  const tokenA = makeJwt({ email: "repeat@example.com" });
  const tokenB = makeJwt({ email: "repeat@example.com" });

  const first = await postImportToken({ accessToken: tokenA });
  const second = await postImportToken({ accessToken: tokenB });

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.notEqual(first.body.connection.id, second.body.connection.id);
});

test("import-token: error responses never leak a stack trace", async () => {
  const { body } = await postImportToken({});
  assert.ok(!JSON.stringify(body).includes("at /"), "must not leak a stack trace");
  assert.ok(!JSON.stringify(body).includes(".ts:"), "must not leak a source location");
});

// #6636 — defense-in-depth: the route also accepts the full session JSON
// object copied from chatgpt.com/api/auth/session under `{ session: {...} }`.
test("import-token: accepts a full session-JSON body and creates a connection identical to the bare-accessToken path", async () => {
  const accessToken = makeJwt({
    email: "session-json@example.com",
    "https://api.openai.com/auth": { chatgpt_account_id: "acct-session" },
  });

  const { status, body } = await postImportToken({
    session: {
      user: { email: "session-json@example.com" },
      accessToken,
      expires: new Date(Date.now() + 60_000).toISOString(),
    },
  });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.equal(body.connection.provider, "codex");
  assert.equal(body.connection.email, "session-json@example.com");

  const rows = await providersDb.getProviderConnections({ provider: "codex" });
  const created = rows.find((r) => r.id === body.connection.id);
  assert.equal(created?.authType, "access_token");
  assert.equal(created?.accessToken, accessToken);
});

test("import-token: session-JSON body with an expired session is rejected with an actionable 400", async () => {
  const accessToken = makeJwt({ email: "expired@example.com" });
  const { status, body } = await postImportToken({
    session: {
      accessToken,
      expires: new Date(Date.now() - 60_000).toISOString(),
    },
  });
  assert.equal(status, 400);
  assert.match(body.error.message, /expired/i);
});
