// Route-wiring tests for the paste-credentials OAuth action.
//
// These exercise the rejection paths only — they all return 400 BEFORE the
// route touches finalizeTokens (Google APIs) or persistOAuthConnection (DB), so
// no network is hit. The happy path's finalize+persist is the same IO as the
// already-covered `device-complete` action; the new, security-relevant logic
// (allowlist + provider match + blob validation) is unit-tested in
// oauth-paste-credentials.test.ts and re-asserted through the HTTP boundary here.
//
// Auth is disabled via settings (requireLogin:false) so we reach the action
// dispatch rather than a 401. DB handles are released in test.after (CLAUDE.md
// learning: unreleased SQLite handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-paste-creds-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/oauth/[provider]/paste-credentials/route.ts");
const { encodeCredentialBlob } = await import("../../src/lib/oauth/credentialBlob.ts");

const tokens = { access_token: "ya29.x", refresh_token: "1//r", expires_in: 3599 };

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function postPaste(provider: string, body: unknown) {
  const request = new Request(`http://localhost:20128/api/oauth/${provider}/paste-credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await route.POST(request, {
    params: Promise.resolve({ provider, action: "paste-credentials" }),
  } as never);
  return { status: response.status, body: await response.json() };
}

test("paste-credentials: non-allowlisted provider is rejected with 400", async () => {
  const blob = encodeCredentialBlob({ provider: "openai", tokens });
  const { status, body } = await postPaste("openai", { blob });
  assert.equal(status, 400);
  assert.match(body.error, /not supported|supported/i);
});

test("paste-credentials: malformed blob is rejected with 400", async () => {
  const { status, body } = await postPaste("antigravity", { blob: "totally-not-a-blob" });
  assert.equal(status, 400);
  assert.match(body.error, /invalid|format|prefix/i);
});

test("paste-credentials: provider mismatch (blob for antigravity, route agy) → 400", async () => {
  const blob = encodeCredentialBlob({ provider: "antigravity", tokens });
  const { status, body } = await postPaste("agy", { blob });
  assert.equal(status, 400);
  assert.match(body.error, /match|mismatch|provider/i);
});

test("paste-credentials: empty body fails schema validation with 400", async () => {
  const { status } = await postPaste("antigravity", {});
  assert.equal(status, 400);
});

test("paste-credentials: error responses never leak a stack trace", async () => {
  const { body } = await postPaste("antigravity", { blob: "totally-not-a-blob" });
  assert.ok(!String(body.error).includes("at /"), "must not leak a stack trace");
});
