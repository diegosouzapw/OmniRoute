import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("antigravity-missing-project-chat");
const { BaseExecutor, buildRequest, handleChat, resetStorage, settingsDb } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const { clearAntigravityProjectCache } =
  await import("../../open-sse/services/antigravityProjectBootstrap.ts");
const { seedAntigravityIdeVersionCache, seedAntigravityCliVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");

const BOOTSTRAP_URL = "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist";

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  process.env.ANTIGRAVITY_CREDITS = "off";
  await resetStorage();
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  clearAntigravityProjectCache();
  seedAntigravityIdeVersionCache("2026.04.17-missing-project-test");
  seedAntigravityCliVersionCache("2026.04.17-missing-project-test");
});

test.afterEach(() => {
  clearAntigravityProjectCache();
  delete process.env.ANTIGRAVITY_CREDITS;
});

test.after(async () => {
  await harness.cleanup();
});

test("Antigravity missing-project 422 stays fail-closed without account cooldown or retry", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-missing-project",
    email: "antigravity-missing-project@example.test",
    accessToken: "fake-antigravity-missing-project-token",
    refreshToken: "fake-antigravity-missing-project-refresh",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    providerSpecificData: {},
    isActive: true,
    testStatus: "active",
  });
  assert(connection && typeof connection.id === "string");

  let bootstrapCalls = 0;
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    if (request.url !== BOOTSTRAP_URL) {
      throw new Error(`Unexpected external fetch: ${request.url}`);
    }
    bootstrapCalls += 1;
    return new Response("{}", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "antigravity/gemini-2.5-flash",
        stream: false,
        messages: [{ role: "user", content: "Missing project must fail closed" }],
      },
    })
  );
  const payload = (await response.json()) as {
    error?: { code?: string; type?: string; message?: string };
  };
  const persisted = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(response.status, 422);
  assert.equal(payload.error?.code, "missing_project_id");
  assert.equal(payload.error?.type, "oauth_missing_project_id");
  assert.equal(bootstrapCalls, 1);
  // #11284: a CONFIRMED missing project disables the account (recoverable,
  // not terminal) so selection rotates to healthy siblings — and
  // persistDiscoveredAntigravityProjectId re-enables it on recovery.
  assert.equal(persisted?.isActive, false);
  assert.equal(persisted?.testStatus, "unavailable");
  assert.equal(persisted?.rateLimitedUntil, undefined);
  assert.equal(persisted?.errorCode, "missing_project_id");
  assert.equal(persisted?.lastErrorType, "oauth_missing_project_id");
  assert.match(String(persisted?.lastError), /Missing Google projectId/);
});

test("Antigravity BYOP account (onboardUser done, no project) returns fast 422 GCP_PROJECT_REQUIRED", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-byop",
    email: "antigravity-byop@example.test",
    accessToken: "fake-antigravity-byop-token",
    refreshToken: "fake-antigravity-byop-refresh",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    providerSpecificData: {},
    isActive: true,
    testStatus: "active",
  });
  assert(connection && typeof connection.id === "string");

  let onboardCalls = 0;
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    if (request.url.startsWith("https://oauth2.googleapis.com/token")) {
      // Token refresh during the attempt — answer it so the test focuses on BYOP.
      return new Response(
        JSON.stringify({ access_token: "fake-antigravity-byop-token", expires_in: 3600 }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (request.url.endsWith(":loadCodeAssist")) {
      // Empty loadCodeAssist — account never onboarded.
      return new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (request.url.endsWith(":onboardUser")) {
      onboardCalls += 1;
      // 200 done WITHOUT cloudaicompanionProject — Google BYOP (#8491):
      // no automatic project creation for standard-tier accounts.
      return new Response(JSON.stringify({ done: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected external fetch: ${request.url}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "antigravity/gemini-2.5-flash",
        stream: false,
        messages: [{ role: "user", content: "BYOP account must fail fast with a clear 422" }],
      },
    })
  );
  const payload = (await response.json()) as {
    error?: { code?: string; type?: string; message?: string };
  };

  assert.equal(response.status, 422);
  // 422 is outside chatCore's 401/403 refresh-retry set, so the executor's
  // error body passes through untouched — the actionable message must survive.
  assert.match(String(payload.error?.message), /GCP_PROJECT_REQUIRED/);
  assert.match(String(payload.error?.message), /console\.cloud\.google\.com/);
  assert.equal(onboardCalls, 1, "onboardUser must be attempted exactly once (BYOP is cached)");
});
