import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-command-code-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-command-code-auth-encryption-key";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const startRoute = await import("../../src/app/api/providers/command-code/auth/start/route.ts");
const callbackRoute =
  await import("../../src/app/api/providers/command-code/auth/callback/route.ts");
const statusRoute = await import("../../src/app/api/providers/command-code/auth/status/route.ts");
const applyRoute = await import("../../src/app/api/providers/command-code/auth/apply/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function jsonRequest(url: string, body: unknown, headers: HeadersInit = {}) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test.beforeEach(() => {
  delete process.env.OMNIROUTE_PUBLIC_BASE_URL;
  delete process.env.OMNIROUTE_BASE_URL;
  delete process.env.BASE_URL;
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.COMMAND_CODE_CALLBACK_PORT;
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Command Code auth assist start/callback/status/apply keeps state hash and key private", async () => {
  const startResponse = await startRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/start", {
      method: "POST",
      headers: { origin: "http://localhost:20128" },
    })
  );
  assert.equal(startResponse.status, 200);
  assert.equal(startResponse.headers.get("cache-control"), "no-store");
  const startBody = await startResponse.json();
  assert.equal(typeof startBody.state, "string");
  assert.ok(startBody.authUrl.startsWith("https://commandcode.ai/studio/auth/cli?"));
  assert.ok(!("stateHash" in startBody));

  const authUrl = new URL(startBody.authUrl);
  const callbackUrl = authUrl.searchParams.get("callback");
  assert.ok(callbackUrl);
  assert.equal(callbackUrl, startBody.callbackUrl);
  assert.equal(callbackUrl, "http://localhost:5959/callback");
  assert.equal(startBody.mode, "manual");

  const optionsResponse = await callbackRoute.OPTIONS(
    new Request("http://localhost:20128/api/providers/command-code/auth/callback", {
      method: "OPTIONS",
      headers: {
        origin: "https://commandcode.ai",
        "access-control-request-headers": "content-type, x-command-code",
      },
    })
  );
  assert.equal(optionsResponse.status, 204);
  assert.equal(
    optionsResponse.headers.get("access-control-allow-origin"),
    "https://commandcode.ai"
  );
  assert.equal(optionsResponse.headers.get("access-control-allow-methods"), "POST, OPTIONS");
  assert.equal(optionsResponse.headers.get("access-control-allow-private-network"), "true");
  assert.equal(
    optionsResponse.headers.get("access-control-allow-headers"),
    "content-type, x-command-code"
  );

  const callbackResponse = await callbackRoute.POST(
    jsonRequest(
      "http://localhost:20128/api/providers/command-code/auth/callback",
      {
        apiKey: "cc_test_secret",
        state: startBody.state,
        userId: "user-1",
        userName: "Ada",
        keyName: "Studio Key",
      },
      { origin: "https://commandcode.ai" }
    )
  );
  assert.equal(callbackResponse.status, 200);
  const callbackBody = await callbackResponse.json();
  assert.equal(callbackBody.success, true);

  const statusResponse = await statusRoute.GET(
    new Request(
      `http://localhost:20128/api/providers/command-code/auth/status?state=${encodeURIComponent(
        startBody.state
      )}`
    )
  );
  assert.equal(statusResponse.status, 200);
  const statusBody = await statusResponse.json();
  assert.equal(statusBody.status, "received");
  assert.equal(statusBody.metadata.userName, "Ada");
  assert.ok(!JSON.stringify(statusBody).includes("cc_test_secret"));
  assert.ok(!("stateHash" in statusBody));

  const applyResponse = await applyRoute.POST(
    jsonRequest("http://localhost:20128/api/providers/command-code/auth/apply", {
      state: startBody.state,
      name: "Command Code Studio",
      setDefault: true,
    })
  );
  assert.equal(applyResponse.status, 200);
  const applyBody = await applyResponse.json();
  assert.equal(applyBody.status, "applied");
  assert.equal(applyBody.connection.provider, "command-code");
  assert.equal(applyBody.connection.authType, "apikey");
  assert.ok(!JSON.stringify(applyBody).includes("cc_test_secret"));
  assert.ok(!("apiKey" in applyBody.connection));
  assert.ok(!("stateHash" in applyBody));

  const connections = await providersDb.getProviderConnections({ provider: "command-code" });
  assert.equal(connections.length, 1);
  assert.equal(connections[0].apiKey, "cc_test_secret");

  const secondApplyResponse = await applyRoute.POST(
    jsonRequest("http://localhost:20128/api/providers/command-code/auth/apply", {
      state: startBody.state,
    })
  );
  assert.equal(secondApplyResponse.status, 409);
});

test("Command Code auth assist keeps auth URL callback on CLI localhost contract", async () => {
  process.env.OMNIROUTE_PUBLIC_BASE_URL = "https://omniroute.example.com/base-path";

  const startResponse = await startRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/start", {
      method: "POST",
      headers: { origin: "http://localhost:20128" },
    })
  );
  assert.equal(startResponse.status, 200);
  const startBody = await startResponse.json();
  const authUrl = new URL(startBody.authUrl);

  assert.equal(authUrl.searchParams.get("callback"), "http://localhost:5959/callback");
  assert.equal(startBody.callbackUrl, authUrl.searchParams.get("callback"));
});

test("Command Code auth assist allows only configured CLI callback port range", async () => {
  process.env.COMMAND_CODE_CALLBACK_PORT = "5962";
  const configuredPortResponse = await startRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/start", {
      method: "POST",
      headers: { origin: "http://localhost:20128" },
    })
  );
  const configuredPortBody = await configuredPortResponse.json();
  assert.equal(
    new URL(configuredPortBody.authUrl).searchParams.get("callback"),
    "http://localhost:5962/callback"
  );

  resetDb();
  process.env.COMMAND_CODE_CALLBACK_PORT = "20128";
  const invalidPortResponse = await startRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/start", {
      method: "POST",
      headers: { origin: "http://localhost:20128" },
    })
  );
  const invalidPortBody = await invalidPortResponse.json();
  assert.equal(
    new URL(invalidPortBody.authUrl).searchParams.get("callback"),
    "http://localhost:5959/callback"
  );

  resetDb();
  process.env.COMMAND_CODE_CALLBACK_PORT = "5962abc";
  const partialPortResponse = await startRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/start", {
      method: "POST",
      headers: { origin: "http://localhost:20128" },
    })
  );
  const partialPortBody = await partialPortResponse.json();
  assert.equal(
    new URL(partialPortBody.authUrl).searchParams.get("callback"),
    "http://localhost:5959/callback"
  );
});

test("Command Code callback rejects disallowed origins and oversized bodies", async () => {
  const disallowed = await callbackRoute.POST(
    jsonRequest(
      "http://localhost:20128/api/providers/command-code/auth/callback",
      { apiKey: "secret", state: "x".repeat(32) },
      { origin: "https://evil.example" }
    )
  );
  assert.equal(disallowed.status, 403);
  assert.equal((await disallowed.json()).success, false);
  assert.equal(disallowed.headers.get("access-control-allow-origin"), null);

  const tooLarge = await callbackRoute.POST(
    new Request("http://localhost:20128/api/providers/command-code/auth/callback", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://commandcode.ai" },
      body: JSON.stringify({ apiKey: "x".repeat(11 * 1024), state: "s".repeat(64) }),
    })
  );
  assert.equal(tooLarge.status, 413);
  assert.equal((await tooLarge.json()).success, false);
  assert.equal(tooLarge.headers.get("access-control-allow-origin"), "https://commandcode.ai");
});
