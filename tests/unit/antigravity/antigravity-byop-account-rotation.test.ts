import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

// Regression guard for the Antigravity BYOP account-rotation follow-up:
// a GCP_PROJECT_REQUIRED 422 is account-specific (that Google account lacks
// a GCP Project ID), so chatCore must mark the account excluded and rotate
// to a sibling antigravity account instead of surfacing the error. When no
// sibling exists, the actionable 422 fast-fail is surfaced and the connection
// is excluded so selection prefers any other account.
const harness = await createChatPipelineHarness("antigravity-byop-rotation");
const { BaseExecutor, buildRequest, handleChat, resetStorage, settingsDb } = harness;
const providersDb = await import("../../../src/lib/db/providers.ts");
const { clearAntigravityProjectCache } =
  await import("../../../open-sse/services/antigravityProjectBootstrap.ts");
const { seedAntigravityIdeVersionCache, seedAntigravityCliVersionCache } =
  await import("../../../open-sse/services/antigravityVersion.ts");

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  process.env.ANTIGRAVITY_CREDITS = "off";
  await resetStorage();
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  clearAntigravityProjectCache();
  seedAntigravityIdeVersionCache("2026.04.17-byop-rotation-test");
  seedAntigravityCliVersionCache("2026.04.17-byop-rotation-test");
});

test.afterEach(() => {
  clearAntigravityProjectCache();
  delete process.env.ANTIGRAVITY_CREDITS;
});

test.after(async () => {
  await harness.cleanup();
});

async function createAntigravityAccount(options: {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  priority?: number;
}) {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: options.name,
    email: options.email,
    accessToken: options.accessToken,
    refreshToken: options.refreshToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    providerSpecificData: {},
    isActive: true,
    testStatus: "active",
    priority: options.priority,
  });
  assert(connection && typeof connection.id === "string");
  return connection;
}

test("Antigravity BYOP 422 rotates to a sibling account and the request succeeds", async () => {
  const byopAccount = await createAntigravityAccount({
    name: "antigravity-byop-a",
    email: "byop-a@example.test",
    accessToken: "fake-byop-account-a-token",
    refreshToken: "fake-byop-account-a-refresh",
    priority: 1, // selected first — forces the rotation path
  });
  const healthyAccount = await createAntigravityAccount({
    name: "antigravity-healthy-b",
    email: "byop-b@example.test",
    accessToken: "fake-healthy-account-b-token",
    refreshToken: "fake-healthy-account-b-refresh",
    priority: 2,
  });

  let onboardCallsForA = 0;
  const modelCalls: Array<{ token: string }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    if (request.url.startsWith("https://oauth2.googleapis.com/token")) {
      // Antigravity OAuth refreshes mid-flow; echo each account's own token so
      // the executor keeps using the per-account identity below.
      const form = await request.text().catch(() => "");
      const refreshMatch = form.match(/refresh_token=([^&]+)/);
      const refreshToken = refreshMatch ? decodeURIComponent(refreshMatch[1]) : "";
      const accessToken =
        refreshToken === "fake-byop-account-a-refresh"
          ? "fake-byop-account-a-token"
          : "fake-healthy-account-b-token";
      return new Response(JSON.stringify({ access_token: accessToken, expires_in: 3600 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (request.url.endsWith(":loadCodeAssist")) {
      const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
      if (token === "fake-healthy-account-b-token") {
        // Sibling account owns a Cloud Code project — discovery succeeds.
        return new Response(
          JSON.stringify({ cloudaicompanionProject: "projects/healthy-b-project" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      // BYOP account: empty discovery — forces the onboardUser path.
      return new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (request.url.endsWith(":onboardUser")) {
      const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
      if (token === "fake-byop-account-a-token") {
        onboardCallsForA += 1;
        // 200 done WITHOUT cloudaicompanionProject → Google BYOP (tracked #8491).
        return new Response(JSON.stringify({ done: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Healthy account: onboarding creates the project.
      return new Response(
        JSON.stringify({
          done: true,
          cloudaicompanionProject: { name: "projects/healthy-b-project" },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (new URL(request.url).hostname === "cloudcode-pa.googleapis.com") {
      modelCalls.push({
        token: (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, ""),
      });
      // The executor always uses the SSE endpoint (streamGenerateContent?alt=sse),
      // even for non-streaming requests.
      return new Response(
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok from account B"}]},"finishReason":"STOP"}]}}\n\n',
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      );
    }
    throw new Error(`Unexpected external fetch: ${request.url}`);
  };

  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "antigravity/gemini-2.5-flash",
          stream: false,
          messages: [{ role: "user", content: "hello" }],
        },
      })
    );

    assert.equal(response.status, 200);
    const bodyText = await response.text().catch(() => "");
    assert.match(bodyText, /ok from account B/);

    // The model call must have gone out with the SIBLING account's token.
    assert.ok(modelCalls.length >= 1, "model call should have been made");
    assert.equal(modelCalls[0].token, "fake-healthy-account-b-token");

    // BYOP detection ran exactly once for account A (cached per token).
    assert.equal(onboardCallsForA, 1);

    // Account A is excluded (rateLimitedUntil set in the future).
    const updatedA = await providersDb.getProviderConnectionById(byopAccount.id);
    assert.ok(
      updatedA && Number(updatedA.rateLimitedUntil) > Date.now(),
      "BYOP account should be excluded from selection"
    );
    // Account B must NOT be excluded.
    const updatedB = await providersDb.getProviderConnectionById(healthyAccount.id);
    assert.ok(
      !updatedB ||
        !Number(updatedB.rateLimitedUntil) ||
        Number(updatedB.rateLimitedUntil) <= Date.now(),
      "healthy sibling account must not be excluded"
    );
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});

test("Antigravity BYOP with no sibling account surfaces the actionable 422 and excludes the connection", async () => {
  const byopAccount = await createAntigravityAccount({
    name: "antigravity-byop-only",
    email: "byop-only@example.test",
    accessToken: "fake-byop-only-token",
    refreshToken: "fake-byop-only-refresh",
    priority: 1,
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    if (request.url.startsWith("https://oauth2.googleapis.com/token")) {
      return new Response(
        JSON.stringify({ access_token: "fake-byop-only-token", expires_in: 3600 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (request.url.endsWith(":loadCodeAssist")) {
      return new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (request.url.endsWith(":onboardUser")) {
      // BYOP: 200 done WITHOUT cloudaicompanionProject.
      return new Response(JSON.stringify({ done: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected external fetch: ${request.url}`);
  };

  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "antigravity/gemini-2.5-flash",
          stream: false,
          messages: [{ role: "user", content: "hello" }],
        },
      })
    );
    const payload = (await response.json()) as {
      error?: { code?: string; message?: string };
    };

    assert.equal(response.status, 422);
    // chatCore's error formatter rebuilds the body, so the code may be
    // generic — the actionable message must survive (same assertion as the
    // existing BYOP chat test).
    assert.match(String(payload.error?.message), /GCP_PROJECT_REQUIRED/);

    // No sibling exists, so the connection is excluded for future requests.
    const updated = await providersDb.getProviderConnectionById(byopAccount.id);
    assert.ok(
      updated && Number(updated.rateLimitedUntil) > Date.now(),
      "BYOP account should be excluded from selection"
    );
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});
