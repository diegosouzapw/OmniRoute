import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-public-url-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_PUBLIC_URL = process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-live-ws-public-url-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const localDb = await import("../../src/lib/localDb.ts");
const wsRoute = await import("../../src/app/api/v1/ws/route.ts");

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  await localDb.updateSettings({
    wsAuth: false,
    requireLogin: true,
    password: "hashed-password",
  });
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }

  if (ORIGINAL_PUBLIC_URL === undefined) {
    delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  } else {
    process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = ORIGINAL_PUBLIC_URL;
  }
});

test("handshake response includes publicUrl when NEXT_PUBLIC_LIVE_WS_PUBLIC_URL is set", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "wss://ws.my-ai.com/live-ws";

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;
  assert.equal(body.live.publicUrl, "wss://ws.my-ai.com/live-ws");
});

test("handshake response includes null publicUrl when NEXT_PUBLIC_LIVE_WS_PUBLIC_URL is unset", async () => {
  delete process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;

  const response = await wsRoute.GET(
    new Request("http://localhost/api/v1/ws?handshake=1", {
      headers: { origin: "http://localhost" },
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;
  assert.equal(body.live.publicUrl, null);
});

test("WS_PROTOCOL.live includes publicUrl field", async () => {
  process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL = "wss://custom.example.com/ws";

  const response = await wsRoute.GET(new Request("http://localhost/api/v1/ws"));

  const body = (await response.json()) as any;
  assert.equal(body.protocol.live.publicUrl, "wss://custom.example.com/ws");
});
