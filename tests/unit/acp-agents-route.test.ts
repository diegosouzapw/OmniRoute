import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-acp-agents-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "acp-agents-route-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
const routeModule = await import("../../src/app/api/acp/agents/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
  delete process.env.JWT_SECRET;
}

async function createSessionToken() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

function makeRequest(method: string, body?: unknown, token?: string) {
  return new Request("http://localhost/api/acp/agents", {
    method,
    headers: {
      ...(body ? { "content-type": "application/json" } : {}),
      ...(token ? { cookie: `auth_token=${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }

  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

test("GET /api/acp/agents requires authentication when login is enabled", async () => {
  process.env.INITIAL_PASSWORD = "route-auth-required";

  const response = await routeModule.GET(makeRequest("GET"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(body.error, "Unauthorized");
});

test("POST /api/acp/agents rejects unsafe version commands for authenticated sessions", async () => {
  process.env.JWT_SECRET = "acp-agents-jwt-secret";
  await localDb.updateSettings({ requireLogin: true, password: "hashed-password" });
  const token = await createSessionToken();

  const response = await routeModule.POST(
    makeRequest(
      "POST",
      {
        id: "custom-agent",
        name: "Custom Agent",
        binary: "/usr/local/bin/custom-agent",
        versionCommand: "/usr/local/bin/custom-agent --version; touch /tmp/pwned",
        providerAlias: "custom-agent",
        spawnArgs: [],
        protocol: "stdio",
      },
      token
    )
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(body.error, /Invalid versionCommand/i);
});

test("POST /api/acp/agents rejects an interpreter eval payload (GHSA-jphr-2gw7-xrwp)", async () => {
  // Exact shape of the advisory PoC: binary + versionCommand both name `node`,
  // so the binary-match check passes, but the `-e` eval argument must still be
  // refused before it can reach execFileSync("node", ["-e", ...]).
  process.env.JWT_SECRET = "acp-agents-jwt-secret";
  await localDb.updateSettings({ requireLogin: true, password: "hashed-password" });
  const token = await createSessionToken();

  const response = await routeModule.POST(
    makeRequest(
      "POST",
      {
        id: "anonrce",
        name: "anonrce",
        binary: "node",
        versionCommand: 'node -e "process.exit(1)"',
        providerAlias: "anonrce",
        spawnArgs: [],
        protocol: "stdio",
      },
      token
    )
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 400);
  assert.match(body.error ?? "", /Invalid versionCommand/i);
});
