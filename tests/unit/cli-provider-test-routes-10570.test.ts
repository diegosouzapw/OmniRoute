// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_API_KEY = process.env.OMNIROUTE_API_KEY;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function withCliEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-routes-10570-"));
  process.env.DATA_DIR = dataDir;
  process.env.OMNIROUTE_API_KEY = "test-management-key";
  delete process.env.STORAGE_ENCRYPTION_KEY;
  try {
    await fn(dataDir);
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    if (ORIGINAL_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = ORIGINAL_API_KEY;
  }
}

async function createConnection(
  dataDir: string,
  input: { provider?: string; name?: string; apiKey?: string } = {}
) {
  const { ensureProviderSchema, upsertApiKeyProviderConnection } =
    await import("../../bin/cli/provider-store.mjs");
  const db = new Database(path.join(dataDir, "storage.sqlite"));
  ensureProviderSchema(db);
  const connection = upsertApiKeyProviderConnection(db, {
    provider: input.provider ?? "custom-openai-compatible",
    name: input.name ?? "Custom Connection",
    apiKey: input.apiKey ?? "test-key",
  });
  db.close();
  return connection;
}

test("omniroute test resolves a connection and calls its server-owned test route", async () => {
  await withCliEnv(async () => {
    const requests: Array<{ path: string; method: string }> = [];
    globalThis.fetch = (async (input, init) => {
      const url = new URL(String(input));
      const method = String(init?.method ?? "GET").toUpperCase();
      requests.push({ path: `${url.pathname}${url.search}`, method });
      if (url.pathname === "/api/health") return jsonResponse({ status: "ok" });
      if (url.pathname === "/api/providers") {
        return jsonResponse({
          connections: [
            {
              id: "conn/custom 1",
              provider: "custom-openai-compatible",
              name: "Custom Connection",
              authType: "apikey",
              isActive: true,
              defaultModel: "custom-model",
            },
          ],
          total: 1,
        });
      }
      if (url.pathname === "/api/providers/conn%2Fcustom%201/test" && method === "POST") {
        return jsonResponse({ valid: true, error: null, latencyMs: 7 });
      }
      return jsonResponse({ error: "unexpected route" }, 404);
    }) as typeof fetch;

    const { runTestProviderCommand } = await import("../../bin/cli/commands/test-provider.mjs");
    const exitCode = await runTestProviderCommand("custom-openai-compatible", undefined, {
      json: true,
    });

    assert.equal(exitCode, 0);
    assert.deepEqual(requests, [
      { path: "/api/health", method: "GET" },
      { path: "/api/providers?limit=200", method: "GET" },
      { path: "/api/providers/conn%2Fcustom%201/test", method: "POST" },
    ]);
  });
});

test("omniroute test --all-providers consumes the current connections response shape", async () => {
  await withCliEnv(async () => {
    const requests: Array<{ path: string; method: string }> = [];
    globalThis.fetch = (async (input, init) => {
      const url = new URL(String(input));
      const method = String(init?.method ?? "GET").toUpperCase();
      requests.push({ path: `${url.pathname}${url.search}`, method });
      if (url.pathname === "/api/health") return jsonResponse({ status: "ok" });
      if (url.pathname === "/api/providers") {
        return jsonResponse({
          connections: [
            {
              id: "conn-all-1",
              provider: "custom-openai-compatible",
              name: "Custom Connection",
              authType: "apikey",
              isActive: true,
              defaultModel: "custom-model",
            },
          ],
          total: 1,
        });
      }
      if (url.pathname === "/api/providers/conn-all-1/test" && method === "POST") {
        return jsonResponse({ valid: true, error: null });
      }
      return jsonResponse({ error: "unexpected route" }, 404);
    }) as typeof fetch;

    const { runTestProviderCommand } = await import("../../bin/cli/commands/test-provider.mjs");
    const exitCode = await runTestProviderCommand(undefined, undefined, {
      allProviders: true,
      json: true,
    });

    assert.equal(exitCode, 0);
    assert.deepEqual(requests, [
      { path: "/api/health", method: "GET" },
      { path: "/api/providers?limit=200", method: "GET" },
      { path: "/api/providers/conn-all-1/test", method: "POST" },
    ]);
  });
});

test("the interactive all-provider view uses the same connection-owned test route", async () => {
  const source = await fs.promises.readFile(
    new URL("../../bin/cli/tui/ProvidersTestAll.jsx", import.meta.url),
    "utf8"
  );
  assert.match(source, /import \{ apiFetch \} from "\.\.\/api\.mjs"/);
  assert.match(source, /connectionId: p\.connectionId \?\? p\.id/);
  assert.match(source, /apiFetch\(/);
  assert.match(source, /\/api\/providers\/\$\{encodeURIComponent\(connectionId\)\}\/test/);
  assert.match(source, /data\.valid/);
  assert.doesNotMatch(source, /api\/v1\/providers\/test/);
});

test("providers test-all falls back to the server for unsupported custom API-key providers", async () => {
  await withCliEnv(async (dataDir) => {
    const connection = await createConnection(dataDir);
    const requests: Array<{ path: string; method: string }> = [];
    globalThis.fetch = (async (input, init) => {
      const url = new URL(String(input));
      const method = String(init?.method ?? "GET").toUpperCase();
      requests.push({ path: url.pathname, method });
      if (url.pathname === "/api/health") return jsonResponse({ status: "ok" });
      if (url.pathname === `/api/providers/${connection.id}/test` && method === "POST") {
        return jsonResponse({ valid: true, error: null, latencyMs: 9 });
      }
      return jsonResponse({ error: "unexpected route" }, 404);
    }) as typeof fetch;

    const { runTestAllCommand } = await import("../../bin/cli/commands/providers.mjs");
    const exitCode = await runTestAllCommand({ json: true });

    assert.equal(exitCode, 0);
    assert.deepEqual(requests, [
      { path: "/api/health", method: "GET" },
      { path: `/api/providers/${connection.id}/test`, method: "POST" },
    ]);
  });
});
