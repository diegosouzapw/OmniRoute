/**
 * GET/POST /api/providers/deprecated leftover list and purge (#13067).
 *
 * Real isolated SQLite plus source-scan. Namespace mocks are not
 * configurable under the tsx loader, so delete counts come from the
 * live helper already covered in the by-provider cleanup test.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13067-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "deprecated-provider-route-secret";
delete process.env.INITIAL_PASSWORD;

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const routePath = path.join(repoRoot, "src/app/api/providers/deprecated/route.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readRouteSource() {
  assert.ok(fs.existsSync(routePath), "deprecated provider route must exist");
  return fs.readFileSync(routePath, "utf8");
}

function extractHandler(source: string, name: "GET" | "POST") {
  const start = source.indexOf(`export async function ${name}`);
  assert.ok(start >= 0, `${name} handler must exist`);
  const next = source.indexOf("\nexport ", start + 1);
  return next >= 0 ? source.slice(start, next) : source.slice(start);
}

async function loadRoute() {
  return import("../../src/app/api/providers/deprecated/route.ts");
}

function makeGetRequest() {
  return new Request("http://localhost/api/providers/deprecated", { method: "GET" });
}

function makePostRequest(body: unknown) {
  return new Request("http://localhost/api/providers/deprecated", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function seedConnection(provider: string, name: string) {
  const created = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-test-${Math.random().toString(36).slice(2, 10)}`,
  });
  assert.ok(created?.id, `connection ${name} must be created`);
  return created as { id: string; provider: string; name: string };
}

test("source-scan: GET and POST require management auth before data access", () => {
  const source = readRouteSource();
  assert.match(source, /from ["']@\/lib\/api\/requireManagementAuth["']/);

  const getBody = extractHandler(source, "GET");
  const postBody = extractHandler(source, "POST");
  const getAuth = getBody.indexOf("requireManagementAuth(request)");
  const postAuth = postBody.indexOf("requireManagementAuth(request)");
  assert.ok(getAuth >= 0, "GET must call requireManagementAuth");
  assert.ok(postAuth >= 0, "POST must call requireManagementAuth");
  assert.ok(getBody.includes("if (authError) return authError"));
  assert.ok(postBody.includes("if (authError) return authError"));
  assert.ok(
    getAuth < getBody.indexOf("getRawProviderConnections"),
    "GET must authorize before listing leftovers"
  );
  assert.ok(
    postAuth < postBody.indexOf("request.json()"),
    "POST must authorize before parsing the body"
  );
});

test("source-scan: GET projects id/provider/name via getRawProviderConnections", () => {
  const source = readRouteSource();
  const getBody = extractHandler(source, "GET");
  assert.equal(getBody.includes("getProviderConnections("), false);
  assert.equal(getBody.includes("createLazyRowProxy"), false);
  assert.match(getBody, /getRawProviderConnections\(/);
  assert.match(getBody, /undefined\s*,\s*undefined\s*,/);
  for (const col of ['"id"', '"provider"', '"name"']) {
    assert.ok(getBody.includes(col), `GET projection must include ${col}`);
  }
  assert.equal(
    /decryptConnectionFields|decryptQuiet/.test(source),
    false,
    "must not decrypt leftover rows"
  );
});

test("source-scan: POST latches isDeprecatedProvider before delete", () => {
  const source = readRouteSource();
  const postBody = extractHandler(source, "POST");
  assert.match(postBody, /isDeprecatedProvider\(/);
  const latch = postBody.indexOf("isDeprecatedProvider(");
  const deleteCall = postBody.indexOf("deleteProviderConnectionsByProvider");
  assert.ok(latch >= 0, "POST must call isDeprecatedProvider");
  assert.ok(deleteCall >= 0, "POST must call by-provider delete");
  assert.ok(latch < deleteCall, "latch must reject before delete");
  assert.match(postBody, /deprecated_provider_purge/);
});

test("GET groups only gemini-cli leftovers from mixed connections", async () => {
  await seedConnection("gemini", "live gemini");
  await seedConnection("gemini-cli", "old cli");
  await seedConnection("gemini-cli", "old cli 2");
  await seedConnection("openai-compatible-foo", "custom node");

  const route = await loadRoute();
  const res = await route.GET(makeGetRequest());
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    leftovers: Array<{ provider: string; migrateTo: string; connectionIds: string[] }>;
  };
  assert.equal(body.leftovers.length, 1);
  assert.equal(body.leftovers[0]?.provider, "gemini-cli");
  assert.equal(body.leftovers[0]?.migrateTo, "gemini");
  assert.equal(body.leftovers[0]?.connectionIds.length, 2);
});

test("POST rejects custom nodes, case variants, empty, missing, and non-string", async () => {
  const route = await loadRoute();
  const before = await providersDb.getRawProviderConnections();
  const payloads = [
    { provider: "openai-compatible-x" },
    { provider: "Gemini-CLI" },
    { provider: "" },
    {},
    { provider: 12 },
  ];

  for (const payload of payloads) {
    const res = await route.POST(makePostRequest(payload));
    assert.equal(res.status, 400, JSON.stringify(payload));
  }

  const after = await providersDb.getRawProviderConnections();
  assert.equal(after.length, before.length, "invalid POST must not delete rows");
});

test("POST gemini-cli with two leftover rows returns deleted:2", async () => {
  await seedConnection("gemini-cli", "old cli");
  await seedConnection("gemini-cli", "old cli 2");
  await seedConnection("gemini", "live gemini");

  const route = await loadRoute();
  const res = await route.POST(makePostRequest({ provider: "gemini-cli" }));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { deleted: number };
  assert.equal(body.deleted, 2);

  const remaining = await providersDb.getRawProviderConnections();
  assert.equal(remaining.length, 1);
  assert.equal(remaining[0]?.provider, "gemini");

  const audits = compliance.getAuditLog({ action: "provider.credentials.revoked" });
  assert.ok(audits.length >= 1);
  const details = JSON.stringify(audits[0]?.details ?? audits[0]?.metadata ?? {});
  assert.match(details, /deprecated_provider_purge/);
});

test("POST gemini-cli with zero rows returns deleted:0", async () => {
  const route = await loadRoute();
  const res = await route.POST(makePostRequest({ provider: "gemini-cli" }));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { deleted: number };
  assert.equal(body.deleted, 0);
});

test("unauthenticated GET and POST return 401/403 and do not delete", async () => {
  await seedConnection("gemini-cli", "old cli");
  await settingsDb.updateSettings({ requireLogin: true });
  process.env.INITIAL_PASSWORD = "test-password-deprecated-provider";

  const route = await loadRoute();
  const getRes = await route.GET(makeGetRequest());
  const postRes = await route.POST(makePostRequest({ provider: "gemini-cli" }));
  assert.ok(getRes.status === 401 || getRes.status === 403, `GET status ${getRes.status}`);
  assert.ok(postRes.status === 401 || postRes.status === 403, `POST status ${postRes.status}`);

  const remaining = await providersDb.getRawProviderConnections();
  assert.equal(remaining.length, 1);
});
