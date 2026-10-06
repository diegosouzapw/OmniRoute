import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-unsupported-probe-neutral-")
);

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const originalFetch = globalThis.fetch;

const core = await import("../../src/lib/db/core.ts");

const { validateOpenAILikeProvider } =
  await import("../../src/lib/providers/validation/openaiFormat.ts");

const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

const credentialHealthScheduler = await import("../../src/lib/credentialHealth/scheduler.ts");

function mockUnsupportedValidationSurface() {
  let calls = 0;

  globalThis.fetch = (async (url: string | URL | Request) => {
    calls += 1;

    const href = typeof url === "string" ? url : url instanceof URL ? url.href : url.url;

    if (href.includes("/models")) {
      return new Response("not found", {
        status: 404,
      });
    }

    return new Response("method not allowed", {
      status: 405,
    });
  }) as typeof fetch;

  return () => calls;
}

test.after(() => {
  credentialHealthScheduler.stopCredentialHealthCheck();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();

  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,

    maxRetries: 5,
    retryDelay: 100,
  });
});

test("404/405 OpenAI-like probe surface is explicitly unsupported, not an auth failure", async () => {
  const getCalls = mockUnsupportedValidationSurface();

  const result = (await validateOpenAILikeProvider({
    provider: "openai",
    apiKey: "synthetic-test-key",
    baseUrl: "https://api.openai.com/v1",
    modelId: "gpt-4.1-mini",
    providerSpecificData: {},
  })) as {
    valid: boolean;
    error: string | null;
    unsupported?: boolean;
  };

  assert.equal(getCalls(), 2, "expected /models then chat/completions validation probes");

  assert.equal(result.valid, false);

  assert.equal(result.unsupported, true, "404/405 validation surface must carry unsupported:true");

  assert.match(String(result.error), /validation endpoint not supported/i);
});

test("unsupported provider verification is neutral and does not poison stored connection health", async () => {
  const getCalls = mockUnsupportedValidationSurface();

  const db = core.getDbInstance();

  db.prepare(
    `INSERT INTO provider_connections
       (
         id,
         provider,
         auth_type,
         name,
         api_key,
         is_active,
         test_status,
         health_check_interval,
         created_at,
         updated_at
       )
     VALUES
       (?, ?, 'apikey', ?, ?, 1, 'active', 60, ?, ?)`
  ).run(
    "unsupported-probe-test",
    "openai",
    "unsupported probe test",
    "synthetic-test-key",
    new Date().toISOString(),
    new Date().toISOString()
  );

  const before = db
    .prepare(
      `SELECT
         test_status,
         last_tested,
         last_error,
         last_error_at,
         error_code
       FROM provider_connections
       WHERE id = ?`
    )
    .get("unsupported-probe-test") as {
    test_status: string;
    last_tested: string | null;
    last_error: string | null;
    last_error_at: string | null;
    error_code: string | null;
  };

  assert.equal(before.test_status, "active");
  assert.equal(before.last_tested, null);
  assert.equal(before.last_error, null);
  assert.equal(before.last_error_at, null);
  assert.equal(before.error_code, null);

  const result = await testSingleConnection("unsupported-probe-test");

  assert.equal(
    getCalls(),
    2,
    "expected actual validator execution before capability was classified unsupported"
  );

  assert.equal(result.valid, false);

  assert.equal(result.skipped, true, "unsupported verification must be returned as a neutral skip");

  assert.equal(result.diagnosis?.code, "unsupported");

  const after = db
    .prepare(
      `SELECT
         test_status,
         last_tested,
         last_error,
         last_error_at,
         error_code
       FROM provider_connections
       WHERE id = ?`
    )
    .get("unsupported-probe-test") as {
    test_status: string;
    last_tested: string | null;
    last_error: string | null;
    last_error_at: string | null;
    error_code: string | null;
  };

  assert.deepEqual(
    after,
    before,
    "unsupported capability detection must not mutate persisted credential health"
  );

  await credentialHealthScheduler.forceSweep();

  const timing = globalThis.__omnirouteCredentialHC?.perConnTiming.get("unsupported-probe-test");

  assert.ok(timing, "unsupported scheduler skip must still establish per-connection pacing");

  assert.equal(
    timing.nextAttemptAt - timing.lastAttemptAt,
    60 * 60_000,
    "unsupported validation must honor the connection's 60-minute health-check interval"
  );

  const afterSweep = db
    .prepare(
      `SELECT
         test_status,
         last_tested,
         last_error,
         last_error_at,
         error_code
       FROM provider_connections
       WHERE id = ?`
    )
    .get("unsupported-probe-test");

  assert.deepEqual(
    afterSweep,
    before,
    "scheduler handling of unsupported validation must remain health-state neutral"
  );

  credentialHealthScheduler.stopCredentialHealthCheck();
});
