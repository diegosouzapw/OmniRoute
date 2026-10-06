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

const ROOT_DIR = path.resolve(".");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PORT = process.env.PORT;
const ORIGINAL_API_PORT = process.env.API_PORT;
const ORIGINAL_DASHBOARD_PORT = process.env.DASHBOARD_PORT;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;

interface DoctorCheck {
  name: string;
  status: string;
  message?: string;
  details?: Record<string, unknown>;
}

interface DoctorResult {
  checks: DoctorCheck[];
}

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-doctor-"));
}

async function withDoctorEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  delete process.env.PORT;
  delete process.env.API_PORT;
  delete process.env.DASHBOARD_PORT;
  delete process.env.STORAGE_ENCRYPTION_KEY;

  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

    if (ORIGINAL_PORT === undefined) delete process.env.PORT;
    else process.env.PORT = ORIGINAL_PORT;

    if (ORIGINAL_API_PORT === undefined) delete process.env.API_PORT;
    else process.env.API_PORT = ORIGINAL_API_PORT;

    if (ORIGINAL_DASHBOARD_PORT === undefined) delete process.env.DASHBOARD_PORT;
    else process.env.DASHBOARD_PORT = ORIGINAL_DASHBOARD_PORT;

    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
}

function getCheck(result: DoctorResult, name: string) {
  return result.checks.find((check) => check.name === name);
}

test("doctor reports warnings but no failures when database is not initialized", async () => {
  await withDoctorEnv(async () => {
    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");

    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(result.summary.fail, 0);
    assert.equal(getCheck(result, "Database")?.status, "warn");
  });
});

test("doctor fails invalid configured ports", async () => {
  await withDoctorEnv(async () => {
    process.env.PORT = "99999";
    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");

    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(getCheck(result, "Config")?.status, "fail");
    assert.ok(result.summary.fail >= 1);
  });
});

test("doctor fails when encrypted credentials exist without storage key", async () => {
  await withDoctorEnv(async (dataDir) => {
    const dbPath = path.join(dataDir, "storage.sqlite");
    const db = new Database(dbPath);
    db.prepare(
      `CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        api_key TEXT,
        access_token TEXT,
        refresh_token TEXT,
        id_token TEXT
      )`
    ).run();
    db.prepare("INSERT INTO provider_connections (id, provider, api_key) VALUES (?, ?, ?)").run(
      "conn-1",
      "openai",
      "enc:v1:00112233445566778899aabbccddeeff:00:00112233445566778899aabbccddeeff"
    );
    db.close();

    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");
    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(getCheck(result, "Storage/encryption")?.status, "fail");
  });
});

test("doctor probes the real machine-token endpoint without exposing the token", async () => {
  await withDoctorEnv(async () => {
    const originalFetch = globalThis.fetch;
    let observedToken = "";
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      assert.match(url, /\/api\/cli\/whoami$/);
      assert.equal(init?.redirect, "error");
      observedToken = new Headers(init?.headers).get("x-omniroute-cli-token") || "";
      return new Response(JSON.stringify({ authenticated: true }), {
        status: observedToken ? 200 : 401,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    try {
      const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
      const check = await checkMachineTokenAuth({
        livenessUrl: "http://127.0.0.1:21999/api/health/degradation",
      });

      assert.equal(check.status, "ok");
      assert.match(observedToken, /^[0-9a-f]{64}$/);
      assert.ok(
        !JSON.stringify(check).includes(observedToken),
        "doctor output must never expose token"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test("doctor only sends the machine token to supported loopback URL shapes", async () => {
  const originalFetch = globalThis.fetch;
  const observedUrls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    observedUrls.push(String(input));
    assert.equal(init?.redirect, "error");
    assert.match(new Headers(init?.headers).get("x-omniroute-cli-token") || "", /^[0-9a-f]{64}$/);
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
    const loopbackUrls = [
      "http://localhost:21999/health",
      "http://127.0.0.42:21999/health",
      "http://[::1]:21999/health",
      "http://[::ffff:127.0.0.1]:21999/health",
    ];

    for (const livenessUrl of loopbackUrls) {
      const check = await checkMachineTokenAuth({ livenessUrl });
      assert.equal(check.status, "ok", livenessUrl);
    }
    assert.equal(observedUrls.length, loopbackUrls.length);
    assert.ok(observedUrls.every((url) => url.endsWith("/api/cli/whoami")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("doctor refuses remote, deceptive, credential-bearing, and unsupported probe URLs", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
    const rejectedUrls = [
      "https://remote.example.test/health",
      "http://localhost.example.test/health",
      "http://127.0.0.1.example.test/health",
      "http://localhost@remote.example.test/health",
      "http://token-user:credential-sentinel@127.0.0.1:21999/health",
      "ftp://localhost:21999/health",
      "http://0.0.0.0:21999/health",
      "http://[::2]:21999/health",
    ];

    for (const livenessUrl of rejectedUrls) {
      const check = await checkMachineTokenAuth({ livenessUrl });
      assert.equal(check.status, "warn", livenessUrl);
      assert.equal(check.details?.accepted, false);
      assert.equal(check.details?.tokenExposed, false);
      assert.ok(!JSON.stringify(check).includes("credential-sentinel"));
    }
    assert.equal(fetchCalls, 0, "rejected targets must never receive a fetch call");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("doctor never follows a machine-token redirect to another origin", async () => {
  const originalFetch = globalThis.fetch;
  let crossOriginRequests = 0;
  let crossOriginTokenObserved = false;
  globalThis.fetch = (async (_input: string | URL | Request, init?: RequestInit) => {
    if (init?.redirect !== "error") {
      crossOriginRequests += 1;
      crossOriginTokenObserved = new Headers(init?.headers).has("x-omniroute-cli-token");
      return new Response(null, { status: 200 });
    }
    throw new TypeError("redirect blocked");
  }) as typeof fetch;

  try {
    const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
    const check = await checkMachineTokenAuth({
      livenessUrl: "http://127.0.0.1:21999/redirect-to-other-origin",
    });

    assert.equal(check.status, "warn");
    assert.equal(crossOriginRequests, 0);
    assert.equal(crossOriginTokenObserved, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("doctor gives connect guidance when the server rejects a machine token", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response(null, { status: 401 })) as typeof fetch;
  try {
    const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
    const check = await checkMachineTokenAuth({
      livenessUrl: "http://127.0.0.1:21999/api/health/degradation",
    });
    assert.equal(check.status, "warn");
    assert.match(check.message || "", /omniroute connect/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("doctor reports explicitly disabled machine-token auth without probing", async () => {
  const previous = process.env.OMNIROUTE_DISABLE_CLI_TOKEN;
  const originalFetch = globalThis.fetch;
  process.env.OMNIROUTE_DISABLE_CLI_TOKEN = "true";
  globalThis.fetch = (async () => {
    throw new Error("fetch should not run");
  }) as typeof fetch;
  try {
    const { checkMachineTokenAuth } = await import("../../bin/cli/commands/doctor.mjs");
    const check = await checkMachineTokenAuth();
    assert.equal(check.status, "warn");
    assert.equal(check.details?.disabled, true);
    assert.match(check.message || "", /disabled/i);
  } finally {
    globalThis.fetch = originalFetch;
    if (previous === undefined) delete process.env.OMNIROUTE_DISABLE_CLI_TOKEN;
    else process.env.OMNIROUTE_DISABLE_CLI_TOKEN = previous;
  }
});
