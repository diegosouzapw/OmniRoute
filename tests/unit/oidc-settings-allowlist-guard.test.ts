import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-settings-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function patch(body: Record<string, unknown>) {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body,
    })
  );
  return { status: response.status, body: (await response.json()) as any };
}

async function seedEnabled(subjects: string[]) {
  await settingsDb.updateSettings({
    oidcEnabled: true,
    oidcIssuer: "https://idp.test",
    oidcClientId: "client",
    oidcClientSecret: "secret",
    oidcAllowedSubjects: subjects,
  });
}

test("emptying the allowlist while OIDC stays enabled is rejected", async () => {
  await seedEnabled(["admin@example.com"]);

  const result = await patch({ oidcAllowedSubjects: [] });

  assert.equal(result.status, 400);
  assert.equal(result.body.error.code, "OIDC_ALLOWED_SUBJECTS_REQUIRED");
  assert.deepEqual((await settingsDb.getSettings()).oidcAllowedSubjects, ["admin@example.com"]);
});

test("an allowlist of blank entries is rejected while OIDC is enabled", async () => {
  await seedEnabled(["admin@example.com"]);

  const result = await patch({ oidcAllowedSubjects: ["", "  "] });

  assert.equal(result.status, 400);
  assert.equal(result.body.error.code, "OIDC_ALLOWED_SUBJECTS_REQUIRED");
});

test("enabling OIDC without any allowed subject is rejected", async () => {
  const result = await patch({ oidcEnabled: true });

  assert.equal(result.status, 400);
  assert.equal(result.body.error.code, "OIDC_ALLOWED_SUBJECTS_REQUIRED");
});

test("replacing the allowlist with another non-empty one is accepted", async () => {
  await seedEnabled(["admin@example.com"]);

  const result = await patch({ oidcAllowedSubjects: ["other@example.com"] });

  assert.equal(result.status, 200);
  assert.deepEqual((await settingsDb.getSettings()).oidcAllowedSubjects, ["other@example.com"]);
});

test("the allowlist can be emptied when OIDC is off", async () => {
  await settingsDb.updateSettings({ oidcEnabled: false, oidcAllowedSubjects: ["a@example.com"] });

  const result = await patch({ oidcAllowedSubjects: [] });

  assert.equal(result.status, 200);
});
