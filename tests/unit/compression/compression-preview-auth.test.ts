import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-preview-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const previewRoute = await import("../../../src/app/api/compression/preview/route.ts");
const languagePacksRoute = await import("../../../src/app/api/compression/language-packs/route.ts");
const rulesRoute = await import("../../../src/app/api/compression/rules/route.ts");

type ErrorResponseBody = {
  error: string | { message?: string };
};

async function resetAuthRequiredStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "test-password-hash",
  });
}

test.beforeEach(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  await resetAuthRequiredStorage();
});

test.after(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("compression preview requires management auth before reading preview input", async () => {
  const response = await previewRoute.POST(
    new Request("http://localhost/api/compression/preview", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "tool", content: "same\nsame\nsame" }],
        mode: "rtk",
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Authentication required"
  );
});

test("compression preview rejects bearer tokens without a dashboard session", async () => {
  const response = await previewRoute.POST(
    new Request("http://localhost/api/compression/preview", {
      method: "POST",
      headers: { authorization: "Bearer invalid-management-token" },
      body: JSON.stringify({
        messages: [{ role: "tool", content: "same\nsame\nsame" }],
        mode: "rtk",
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 403);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Invalid management token"
  );
});

test("compression preview still runs for authenticated management sessions", async () => {
  const request = await makeManagementSessionRequest("http://localhost/api/compression/preview", {
    method: "POST",
    body: {
      messages: [{ role: "tool", content: "same\nsame\nsame" }],
      mode: "rtk",
      config: {
        rtkConfig: {
          intensity: "standard",
        },
      },
    },
  });

  const response = await previewRoute.POST(request);
  const body = (await response.json()) as { mode?: string; original?: string };

  assert.equal(response.status, 200);
  assert.equal(body.mode, "rtk");
  assert.match(body.original || "", /same/);
});

test("compression language pack metadata requires management auth", async () => {
  const response = await languagePacksRoute.GET(
    new Request("http://localhost/api/compression/language-packs")
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Authentication required"
  );
});

test("compression rules metadata rejects bearer tokens without a dashboard session", async () => {
  const response = await rulesRoute.GET(
    new Request("http://localhost/api/compression/rules", {
      headers: { authorization: "Bearer invalid-management-token" },
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 403);
  assert.equal(
    typeof body.error === "object" ? body.error.message : null,
    "Invalid management token"
  );
});

test("compression metadata routes return data for authenticated management sessions", async () => {
  const languageRequest = await makeManagementSessionRequest(
    "http://localhost/api/compression/language-packs"
  );
  const rulesRequest = await makeManagementSessionRequest("http://localhost/api/compression/rules");

  const languageResponse = await languagePacksRoute.GET(languageRequest);
  const rulesResponse = await rulesRoute.GET(rulesRequest);
  const languageBody = (await languageResponse.json()) as { languages?: unknown; packs?: unknown };
  const rulesBody = (await rulesResponse.json()) as { rules?: unknown };

  assert.equal(languageResponse.status, 200);
  assert.ok(Array.isArray(languageBody.languages));
  assert.ok(Array.isArray(languageBody.packs));
  assert.equal(rulesResponse.status, 200);
  assert.ok(Array.isArray(rulesBody.rules));
});
