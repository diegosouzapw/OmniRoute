import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "nvidia-cli-12849-"));
process.env.NODE_ENV = "test";
process.env.OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED = "1";
process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20128";
process.env.OMNIROUTE_API_KEY = "synthetic-management-key";
process.env.OMNIROUTE_CLI_TOKEN = "synthetic-cli-token";
delete process.env.STORAGE_ENCRYPTION_KEY;
const { ensureProviderSchema, upsertApiKeyProviderConnection } =
  await import("../../bin/cli/provider-store.mjs");
const { runTestCommand, runProvidersStatusCommand } =
  await import("../../bin/cli/commands/providers.mjs");
const db = new Database(join(process.env.DATA_DIR, "storage.sqlite"));
ensureProviderSchema(db);
const connection = upsertApiKeyProviderConnection(db, {
  provider: "nvidia",
  name: "main",
  apiKey: "synthetic-nvidia-secret",
});
db.prepare("UPDATE provider_connections SET test_status='active' WHERE id=?").run(connection.id);
db.close();
const originalFetch = globalThis.fetch;
const originalLog = console.log;
const originalError = console.error;
const logs: string[] = [];
const requests: { path: string; method: string }[] = [];
beforeEach(() => {
  logs.length = 0;
  requests.length = 0;
  console.log = (...args: unknown[]) => logs.push(args.join(" "));
  console.error = (...args: unknown[]) => logs.push(args.join(" "));
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  console.log = originalLog;
  console.error = originalError;
});
function mockServer(
  options: {
    testStatus?: number;
    online?: boolean;
    catalogStatus?: number;
    expirationStatus?: number;
    malformedExpiration?: boolean;
    connections?: unknown[];
    list?: unknown[];
  } = {}
) {
  globalThis.fetch = async (url, init) => {
    const path = new URL(String(url)).pathname;
    requests.push({ path, method: init?.method || "GET" });
    if (options.online === false) throw new Error("offline");
    if (path === "/api/health") return Response.json({ status: "ok" });
    if (path === `/api/providers/${connection.id}/test`) {
      const status = options.testStatus || 200;
      return Response.json({
        valid: status === 200,
        error: status === 200 ? null : "Invalid API key",
        statusCode: status,
      });
    }
    if (path === "/api/providers/expiration" && options.malformedExpiration) {
      return new Response("invalid JSON", { status: 200 });
    }
    if (path === "/api/providers/expiration")
      return Response.json(
        { list: options.list || [] },
        { status: options.expirationStatus || 200 }
      );
    if (path === "/api/providers")
      return Response.json(
        { connections: options.connections || [] },
        { status: options.catalogStatus || 200 }
      );
    throw new Error(`Unexpected request ${path}`);
  };
}
const nvidia = {
  id: connection.id,
  provider: "nvidia",
  name: "main",
  authType: "apikey",
  isActive: true,
  testStatus: "active",
  rateLimitedUntil: "2026-10-08T19:00:00Z",
  expiresAt: null,
  apiKey: "synthetic-nvidia-secret",
  accessToken: "synthetic-access-secret",
  providerSpecificData: { sensitive: "synthetic-private-metadata" },
};
test("single NVIDIA test delegates to the online server like test-all", async () => {
  mockServer();
  assert.equal(await runTestCommand("nvidia", { json: true }), 0);
  assert.ok(
    requests.some((r) => r.path === `/api/providers/${connection.id}/test` && r.method === "POST")
  );
  const result = JSON.parse(logs.join("\n"));
  assert.equal(result.valid, true);
  assert.equal(result.connection.provider, "nvidia");
});
test("a real failed server probe remains a failure", async () => {
  mockServer({ testStatus: 401 });
  assert.equal(await runTestCommand("nvidia", { json: true }), 1);
  const result = JSON.parse(logs.join("\n"));
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});
test("an unsupported offline probe is reported as skipped, preserving stored health", async () => {
  mockServer({ online: false });
  assert.equal(await runTestCommand("nvidia"), 3);
  assert.match(logs.join("\n"), /SKIP/);
  assert.doesNotMatch(logs.join("\n"), /FAIL/);
  const check = new Database(join(process.env.DATA_DIR!, "storage.sqlite"));
  try {
    assert.equal(
      check
        .prepare("SELECT test_status FROM provider_connections WHERE id=?")
        .pluck()
        .get(connection.id),
      "active"
    );
  } finally {
    check.close();
  }
});
test("status lists NVIDIA connections even without expiration entries and excludes credentials", async () => {
  mockServer({ connections: [nvidia] });
  assert.equal(await runProvidersStatusCommand({ json: true }), 0);
  const result = JSON.parse(logs.join("\n"));
  assert.equal(result.count, 1);
  assert.equal(result.connections[0].provider, "nvidia");
  assert.equal(result.connections[0].testStatus, "active");
  assert.equal(result.connections[0].rateLimitedUntil, nvidia.rateLimitedUntil);
  assert.doesNotMatch(
    logs.join("\n"),
    /synthetic-nvidia-secret|synthetic-access-secret|synthetic-private-metadata/
  );
});
test("status merges expiration details and filters the complete connection list", async () => {
  mockServer({
    connections: [nvidia, { id: "oauth", provider: "codex", name: "OAuth", testStatus: "active" }],
    list: [
      {
        connectionId: "oauth",
        provider: "codex",
        connectionName: "OAuth",
        expiresAt: "2026-10-09T00:00:00Z",
        status: "expiring_soon",
        expiryType: "oauth_token",
        alertDays: 7,
        lastChecked: "2026-10-08T12:00:00Z",
        note: "Renew soon",
      },
    ],
  });
  assert.equal(await runProvidersStatusCommand({ json: true, provider: "codex" }), 0);
  const result = JSON.parse(logs.join("\n"));
  assert.equal(result.count, 1);
  assert.equal(result.connections[0].name, "OAuth");
  assert.equal(result.connections[0].connectionName, "OAuth");
  assert.equal(result.connections[0].expiryType, "oauth_token");
  assert.equal(result.connections[0].alertDays, 7);
  assert.equal(result.connections[0].lastChecked, "2026-10-08T12:00:00Z");
  assert.equal(result.connections[0].note, "Renew soon");
  assert.equal(result.connections[0].status, "expiring_soon");
  assert.equal(result.connections[0].testStatus, "active");
});
test("status still lists connections if optional expiration metadata is unavailable", async () => {
  mockServer({ connections: [nvidia], expirationStatus: 500 });
  assert.equal(await runProvidersStatusCommand({ json: true }), 0);
  assert.equal(JSON.parse(logs.join("\n")).count, 1);
});
test("status does not hide a management-auth failure behind an empty list", async () => {
  mockServer({ catalogStatus: 403 });
  assert.equal(await runProvidersStatusCommand({ json: true }), 1);
  assert.match(logs.join("\n"), /403/);
});

test("status tolerates malformed optional expiration JSON", async () => {
  mockServer({ connections: [nvidia], malformedExpiration: true });
  assert.equal(await runProvidersStatusCommand({ json: true }), 0);
  assert.equal(JSON.parse(logs.join("\n")).count, 1);
});
