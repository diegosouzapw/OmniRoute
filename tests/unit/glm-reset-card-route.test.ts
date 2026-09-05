import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-glm-reset-card-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-glm-reset-card-route-secret";
process.env.INITIAL_PASSWORD = "route-test-password";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/lib/api/requireManagementAuth.ts");
const authHeaders = await import("../../src/server/authz/headers.ts");
const route = await import("../../src/app/api/usage/glm-reset-card/route.ts");

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function request(pathname: string, init: RequestInit = {}) {
  return new Request(`http://localhost:20128${pathname}`, init);
}

function managementRequest(pathname: string, init: RequestInit = {}) {
  return request(pathname, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      [authHeaders.AUTHZ_HEADER_AUTH_KIND]: "management_key",
      [authHeaders.AUTHZ_HEADER_AUTH_LABEL]: "local-cli-token",
    },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET and POST authorize before parsing any payload", () => {
  const source = fs.readFileSync("src/app/api/usage/glm-reset-card/route.ts", "utf8");
  const getIndex = source.indexOf("export async function GET");
  const postIndex = source.indexOf("export async function POST");
  assert.ok(getIndex >= 0 && postIndex > getIndex);

  const getBody = source.slice(getIndex, postIndex);
  const postBody = source.slice(postIndex);
  for (const [label, body, parseMarker] of [
    ["GET", getBody, "new URL(request.url)"],
    ["POST", postBody, "request.json()"],
  ] as const) {
    assert.match(body, /const authError = await requireManagementAuth\(request\);/);
    assert.ok(
      body.indexOf("requireManagementAuth(request)") < body.indexOf(parseMarker),
      `${label} must authorize before parsing`
    );
  }
});

test("unauthenticated requests never reach the upstream connection", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  const getResponse = await route.GET(request("/api/usage/glm-reset-card"));
  assert.equal(getResponse.status, 401);

  const postResponse = await route.POST(
    request("/api/usage/glm-reset-card", {
      method: "POST",
      body: JSON.stringify({ connectionId: "c1", idempotencyKey: "k1" }),
    })
  );
  assert.equal(postResponse.status, 401);
  assert.equal(called, false);
});

test("GET rejects an invalid connectionId with 400", async () => {
  const response = await route.GET(managementRequest("/api/usage/glm-reset-card"));
  assert.equal(response.status, 400);
  const body = (await response.json()) as { ok: boolean; code: string };
  assert.equal(body.ok, false);
  assert.equal(body.code, "invalid_connection_id");
});

test("POST rejects a malformed body with 400 and no upstream call", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  for (const payload of [
    {},
    { connectionId: "" },
    { idempotencyKey: "k1" },
    { connectionId: "c1" },
    { connectionId: "c1", idempotencyKey: 5 },
  ]) {
    const response = await route.POST(
      managementRequest("/api/usage/glm-reset-card", {
        method: "POST",
        body: JSON.stringify(payload),
      })
    );
    assert.equal(response.status, 400);
    const body = (await response.json()) as { ok: boolean; code: string };
    assert.equal(body.code, "invalid_request_body");
  }
  assert.equal(called, false);
});

test("GET maps a z.ai auth failure to a typed 401 without leaking upstream detail", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Route 401 ${Date.now()}`,
    apiKey: "glm-route-key",
  })) as { id: string };

  globalThis.fetch = async () =>
    json({ code: 1001, msg: "Authentication parameter not received in Header" });

  const errors: unknown[] = [];
  console.error = (...args: unknown[]) => errors.push(args);

  const response = await route.GET(
    managementRequest(`/api/usage/glm-reset-card?connectionId=${connection.id}`)
  );

  console.error = originalConsoleError;
  assert.equal(response.status, 401);
  const body = (await response.json()) as { ok: boolean; code: string; error: string };
  assert.equal(body.ok, false);
  assert.ok(!body.error.includes("at /"), "no stack trace may leak into responses");
  assert.ok(!body.error.toLowerCase().includes("bearer"), "no credential detail may leak");
});

test("GET maps a malformed upstream envelope to a sanitized 502", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Route 502 ${Date.now()}`,
    apiKey: "glm-route-key",
  })) as { id: string };

  globalThis.fetch = async () => new Response("<html>gateway</html>", { status: 200 });

  console.error = () => {};
  const response = await route.GET(
    managementRequest(`/api/usage/glm-reset-card?connectionId=${connection.id}`)
  );
  console.error = originalConsoleError;

  assert.equal(response.status, 502);
  const body = (await response.json()) as { ok: boolean; error: string };
  assert.ok(!body.error.includes("<html>"), "raw upstream payload may not leak");
});

test("POST returns the committed redemption shape", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Route OK ${Date.now()}`,
    apiKey: "glm-route-key",
  })) as { id: string };

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      return json({
        code: 200,
        success: true,
        data: {
          fiveHourResets: [],
          weekResets: [{ recordId: 124140, expireTime: "2099-01-01 00:00:00" }],
        },
      });
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({ code: 200, msg: "Operation successful", data: 124140, success: true });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  const response = await route.POST(
    managementRequest("/api/usage/glm-reset-card", {
      method: "POST",
      body: JSON.stringify({ connectionId: connection.id, idempotencyKey: "route-key-1" }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as { ok: boolean; outcome: string };
  assert.equal(body.ok, true);
  assert.equal(body.outcome, "reset");
});

test("error logging stays bounded and sanitized", async () => {
  const source = fs.readFileSync("src/app/api/usage/glm-reset-card/route.ts", "utf8");
  assert.doesNotMatch(
    source,
    /console\.error\([^\n]*error\)/,
    "raw error objects (with stacks) must not be logged"
  );
});

test("auth helper refuses a wrong management password", async () => {
  const response = await route.GET(
    request("/api/usage/glm-reset-card?connectionId=c1", {
      headers: { "x-omniroute-admin": "wrong-password" },
    })
  );
  assert.equal(response.status, 401);
  assert.ok(auth.requireManagementAuth);
});
