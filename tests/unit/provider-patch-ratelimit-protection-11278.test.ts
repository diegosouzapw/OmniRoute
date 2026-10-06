// Regression guard for #11278 — PATCH/PUT /api/providers/[id] silently enabled
// runtime rate-limit protection (Bottleneck queuing) for ANY connection whose
// request body included the `rateLimitOverrides` key, even `null`, regardless
// of whether `rate_limit_protection` was actually persisted as on for that
// connection in the DB.
//
// Root cause: src/app/api/providers/[id]/route.ts unconditionally called
// enableRateLimitProtection(id) whenever `rateLimitOverrides !== undefined`
// in the validated body. `EditConnectionModal.tsx` sends `rateLimitOverrides`
// on every save regardless of whether the operator touched that section, so
// saving ANY connection silently started queuing its requests through
// Bottleneck — with the DB (`rate_limit_protection` column) and the dashboard
// toggle both still showing the feature as off.
//
// Fix: only (re)enable the in-memory limiter when the persisted connection
// (`updated.rateLimitProtection`, mapped from the DB row) is actually `true`;
// otherwise explicitly disable it so runtime state can't drift ahead of the
// DB. `rateLimitProtection` is never itself part of updateProviderConnectionSchema,
// so this route can only read it from the persisted row — never set it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11278-ratelimit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-11278-ratelimit";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createConnection(rateLimitProtection: boolean) {
  return createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI key",
    apiKey: "sk-test-key-value",
    priority: 1,
    isActive: true,
    testStatus: "active",
    rateLimitProtection,
  });
}

test(
  "PUT /api/providers/[id] does NOT enable rate-limit protection just because " +
    "rateLimitOverrides is present, when protection is off in the DB (#11278 RED->GREEN)",
  async () => {
    const connection = (await createConnection(false)) as Record<string, unknown>;
    assert.equal(connection.rateLimitProtection, false);
    assert.equal(rateLimitManager.isRateLimitEnabled(connection.id as string), false);

    // Mirrors EditConnectionModal.tsx's handleSubmit(): it always sends
    // `rateLimitOverrides` on every save, even when the operator never
    // touched that section of the form.
    const payload = {
      name: connection.name,
      priority: connection.priority,
      rateLimitOverrides: null,
    };

    const request = await makeManagementSessionRequest(
      `http://localhost/api/providers/${connection.id}`,
      { method: "PUT", body: payload }
    );
    const response = await providerByIdRoute.PUT(request, {
      params: Promise.resolve({ id: connection.id as string }),
    });
    assert.equal(response.status, 200, `expected the save to succeed, got ${response.status}`);

    const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
      string,
      unknown
    >;
    assert.equal(
      persisted.rateLimitProtection,
      false,
      "DB row must still show protection off — this route never sets rateLimitProtection"
    );
    assert.equal(
      rateLimitManager.isRateLimitEnabled(connection.id as string),
      false,
      "in-memory limiter must not silently diverge from the persisted DB state"
    );
  }
);

test(
  "PUT /api/providers/[id] keeps rate-limit protection ENABLED when it is " +
    "actually persisted as on in the DB",
  async () => {
    const connection = (await createConnection(true)) as Record<string, unknown>;
    assert.equal(connection.rateLimitProtection, true);

    const payload = {
      name: connection.name,
      priority: connection.priority,
      rateLimitOverrides: { rpm: 30 },
    };

    const request = await makeManagementSessionRequest(
      `http://localhost/api/providers/${connection.id}`,
      { method: "PUT", body: payload }
    );
    const response = await providerByIdRoute.PUT(request, {
      params: Promise.resolve({ id: connection.id as string }),
    });
    assert.equal(response.status, 200, `expected the save to succeed, got ${response.status}`);

    const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
      string,
      unknown
    >;
    assert.equal(persisted.rateLimitProtection, true);
    assert.equal(rateLimitManager.isRateLimitEnabled(connection.id as string), true);
  }
);
