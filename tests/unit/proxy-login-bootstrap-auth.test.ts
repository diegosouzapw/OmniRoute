import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-bootstrap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

async function importFreshProxy() {
  const url = pathToFileURL(path.resolve("src/proxy.ts")).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(pathname, method = "GET", headers) {
  return {
    nextUrl: {
      pathname,
      protocol: "http:",
    },
    method,
    cookies: {
      get() {
        return undefined;
      },
    },
    headers: new Headers(headers),
    url: `http://localhost:20128${pathname}`,
  };
}

test.beforeEach(async () => {
  delete process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE;
  delete process.env.INITIAL_PASSWORD;
  await resetStorage();
});

test.after(() => {
  delete process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE;
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("proxy keeps GET /api/settings/require-login public after setup", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    setupComplete: true,
  });

  const { proxy } = await importFreshProxy();
  const response = await proxy(makeRequest("/api/settings/require-login"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.ok(response.headers.get("x-request-id"));
});

test("proxy requires auth for POST /api/settings/require-login after setup", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    setupComplete: true,
  });

  const { proxy } = await importFreshProxy();
  const response = await proxy(makeRequest("/api/settings/require-login", "POST"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(body.error.code, "AUTH_001");
});

test("proxy rejects bearer tokens for POST /api/settings/require-login after setup", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    setupComplete: true,
  });

  const { proxy } = await importFreshProxy();
  const response = await proxy(
    makeRequest("/api/settings/require-login", "POST", {
      authorization: "Bearer sk-invalid",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 403);
  assert.equal(body.error.code, "AUTH_001");
});

test("proxy still allows POST /api/settings/require-login during bootstrap", async () => {
  const { proxy } = await importFreshProxy();
  const response = await proxy(makeRequest("/api/settings/require-login", "POST"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.ok(response.headers.get("x-request-id"));
});
