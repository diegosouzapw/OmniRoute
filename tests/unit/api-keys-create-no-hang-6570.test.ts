// Regression test for #6570 — POST /api/keys hung 20-90s+ on a fresh install.
//
// Root cause: `cloudEnabled` defaults to `true` (src/lib/db/settings.ts) for any
// install that has never persisted a settings row (i.e. a fresh install). The
// POST /api/keys handler unconditionally `await`ed `syncKeysToCloudIfEnabled()`
// after creating the key, which — when cloud sync is enabled — calls
// `syncToCloud()` and performs a real outbound `fetch()` to `CLOUD_URL`. On a
// fresh/offline install (or any environment where the Cloud endpoint is slow or
// unreachable), that fetch call blocks the HTTP response until it resolves or
// times out, unlike sibling routes such as `POST /api/keys/:id/regenerate` and
// `GET /api/combos`, which never touch this cloud-sync side effect at all.
//
// This test stubs `globalThis.fetch` to hang forever (never settles) and
// asserts the route still responds promptly — i.e. the handler must not await
// the cloud-sync side effect in the request path.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-keys-nohang-6570-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-6570";
process.env.CLOUD_URL = "http://cloud.example";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const localDb = await import("../../src/lib/localDb.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  core.resetDbInstance();
});

test("POST /api/keys responds promptly even when the Cloud-sync fetch hangs forever (#6570)", async () => {
  await enableManagementAuth();
  // cloudEnabled defaults to true on a fresh install (no settings row yet) —
  // simulate that "fresh install" condition explicitly for clarity/documentation.
  const settings = await localDb.getSettings();
  assert.equal(settings.cloudEnabled, true, "cloudEnabled should default to true pre-fix");

  const originalFetch = globalThis.fetch;
  // Simulate a slow/unreachable Cloud endpoint: a fetch() that never settles.
  let fetchWasCalled = false;
  globalThis.fetch = (() => {
    fetchWasCalled = true;
    return new Promise(() => {
      /* never resolves — simulates a hung/unreachable outbound network call */
    });
  }) as typeof fetch;

  try {
    const start = Date.now();
    const response = await Promise.race([
      listRoute.POST(
        await makeManagementSessionRequest("http://localhost/api/keys", {
          method: "POST",
          body: { name: "Fresh Install Key" },
        })
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("POST /api/keys did not respond within 2s")), 2000)
      ),
    ]);
    const elapsedMs = Date.now() - start;

    const body = (await (response as Response).json()) as { key: string };
    assert.equal((response as Response).status, 201);
    assert.match(body.key, /^sk-[a-z0-9-]+/i);
    assert.ok(
      elapsedMs < 2000,
      `expected POST /api/keys to resolve well under 2s even with a hung Cloud fetch, took ${elapsedMs}ms`
    );

    // The cloud-sync side effect is fire-and-forget: give the still-pending
    // background task a chance to start (it never resolves, by design) before
    // asserting it was actually invoked — this proves the fix didn't just
    // remove the sync call outright.
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.ok(fetchWasCalled, "expected the stubbed Cloud-sync fetch to have been invoked");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
