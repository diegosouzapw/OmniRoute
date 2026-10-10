import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-social-oauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = "bootstrap-secret";
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

async function patch(body: Record<string, unknown>) {
  return settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { currentPassword: "bootstrap-secret", ...body },
    })
  );
}

test("social login keys are persistable through PATCH /api/settings (schema is strict)", async () => {
  const res = await patch({
    googleClientId: "g-client",
    googleClientSecret: "g-secret-value",
    googleAuthEnabled: true,
    githubClientId: "gh-client",
    githubClientSecret: "gh-secret-value",
    githubAuthEnabled: true,
    authAllowedEmails: ["admin@company.com", "octocat"],
    disablePasswordLogin: false,
  });
  assert.equal(res.status, 200);

  const stored = await settingsDb.getSettings();
  assert.equal(stored.googleClientId, "g-client");
  assert.equal(stored.googleClientSecret, "g-secret-value");
  assert.equal(stored.githubClientSecret, "gh-secret-value");
  assert.deepEqual(stored.authAllowedEmails, ["admin@company.com", "octocat"]);
});

test("GET and PATCH responses never carry the Google/GitHub client secrets", async () => {
  const patchRes = await patch({
    googleClientSecret: "g-secret-value",
    githubClientSecret: "gh-secret-value",
  });
  const patchText = await patchRes.text();
  assert.equal(patchRes.status, 200);
  assert.ok(!patchText.includes("g-secret-value"), "PATCH response leaked the Google secret");
  assert.ok(!patchText.includes("gh-secret-value"), "PATCH response leaked the GitHub secret");

  const getRes = await settingsRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings")
  );
  const getText = await getRes.text();
  assert.equal(getRes.status, 200);
  assert.ok(!getText.includes("g-secret-value"), "GET leaked the Google secret");
  assert.ok(!getText.includes("gh-secret-value"), "GET leaked the GitHub secret");
  const body = JSON.parse(getText);
  assert.equal(body.googleClientSecretConfigured, true);
  assert.equal(body.githubClientSecretConfigured, true);
  assert.equal("googleClientSecret" in body, false);
  assert.equal("githubClientSecret" in body, false);
});

test("social login settings are security-impacting: changing them needs the current password", async () => {
  const res = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { authAllowedEmails: ["intruder@evil.test"], currentPassword: "wrong" },
    })
  );
  assert.ok(res.status === 401 || res.status === 403, `status ${res.status}`);
  const stored = await settingsDb.getSettings();
  assert.deepEqual(stored.authAllowedEmails, []);
});

test("redirect paths that could rewrite the redirect_uri host are rejected", async () => {
  for (const bad of ["//evil.example.net/cb", "@evil.example.net", "https://evil.example.net"]) {
    const res = await patch({ googleRedirectPath: bad });
    assert.equal(res.status, 400, bad);
  }
  assert.equal((await patch({ googleRedirectPath: "/api/auth/google/callback" })).status, 200);
});

test("the OIDC redirect path default survives (#15153 regression)", async () => {
  const stored = await settingsDb.getSettings();
  assert.equal(stored.oidcRedirectPath, "/api/auth/oidc/callback");
});
