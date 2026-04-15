import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.mjs";

const harness = await createChatPipelineHarness("chat-context-relay");
const { BaseExecutor, buildRequest, combosDb, handleChat, resetStorage, waitFor } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const handoffDb = await import("../../src/lib/db/contextHandoffs.ts");

function buildResponsesResponse(text = "ok", model = "gpt-5.4") {
  return new Response(
    JSON.stringify({
      id: "resp_context_relay",
      object: "response",
      model,
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text }],
        },
      ],
      usage: {
        input_tokens: 4,
        output_tokens: 2,
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

async function seedCodexOAuthConnection({
  name,
  email,
  accessToken,
  refreshToken,
  workspaceId,
  priority,
}) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email,
    accessToken,
    refreshToken,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: { workspaceId },
  });
}

function buildQuotaResponse(usedPercent, resetAfterSeconds = 3600) {
  return new Response(
    JSON.stringify({
      rate_limit: {
        primary_window: {
          used_percent: usedPercent,
          reset_after_seconds: resetAfterSeconds,
        },
        secondary_window: {
          used_percent: 0,
          reset_after_seconds: 86400,
        },
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("handleChat generates and injects context-relay handoffs across Codex account switches", async () => {
  const primary = await seedCodexOAuthConnection({
    name: "codex-a",
    email: "relay-a@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
    workspaceId: "ws-a",
    priority: 1,
  });
  await seedCodexOAuthConnection({
    name: "codex-b",
    email: "relay-b@example.com",
    accessToken: "token-b",
    refreshToken: "refresh-b",
    workspaceId: "ws-b",
    priority: 2,
  });

  await combosDb.createCombo({
    name: "relay-combo",
    strategy: "context-relay",
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      handoffThreshold: 0.85,
      maxMessagesForSummary: 12,
    },
    models: ["codex/gpt-5.4"],
  });

  const upstreamBodies = [];
  const summaryBodies = [];

  globalThis.fetch = async (url, init = {}) => {
    const urlStr = String(url);
    const headers = Object.fromEntries(new Headers(init.headers || {}).entries());

    if (urlStr.includes("/backend-api/wham/usage")) {
      const authHeader = headers.authorization || headers.Authorization || "";
      return authHeader === "Bearer token-a" ? buildQuotaResponse(87) : buildQuotaResponse(20);
    }

    const body = init.body ? JSON.parse(String(init.body)) : {};
    const serializedBody = JSON.stringify(body);
    const isSummaryRequest =
      body._omnirouteInternalRequest === "context-handoff" ||
      serializedBody.includes("You are a context summarizer");

    if (isSummaryRequest) {
      summaryBodies.push({ body, serializedBody });
      return buildResponsesResponse(
        JSON.stringify({
          summary: "Carry over the router implementation state",
          keyDecisions: ["Use global combo defaults", "Inject handoff on account switch"],
          taskProgress: "Runtime and UI are wired; tests are next",
          activeEntities: ["open-sse/services/combo.ts", "src/sse/handlers/chat.ts"],
        }),
        "gpt-5.4"
      );
    }

    upstreamBodies.push({ body, serializedBody });
    return buildResponsesResponse("relay-success", "gpt-5.4");
  };

  const firstResponse = await handleChat(
    buildRequest({
      headers: { "X-Session-Id": "relay-session" },
      body: {
        model: "relay-combo",
        stream: false,
        messages: [{ role: "user", content: "Keep implementing the new combo" }],
      },
    })
  );
  const firstJson = await firstResponse.json();

  assert.equal(firstResponse.status, 200);
  assert.equal(firstJson.choices[0].message.content, "relay-success");

  const sessionId = "ext:relay-session";
  const savedHandoff = await waitFor(() => handoffDb.getHandoff(sessionId, "relay-combo"), 2000);
  assert.ok(savedHandoff);
  assert.equal(savedHandoff.fromAccount, primary.id);
  assert.equal(summaryBodies.length, 1);
  assert.match(summaryBodies[0].serializedBody, /You are a context summarizer/);

  await providersDb.updateProviderConnection(primary.id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const secondResponse = await handleChat(
    buildRequest({
      headers: { "X-Session-Id": "relay-session" },
      body: {
        model: "relay-combo",
        stream: false,
        messages: [{ role: "user", content: "Continue from where you left off" }],
      },
    })
  );
  const secondJson = await secondResponse.json();

  assert.equal(secondResponse.status, 200);
  assert.equal(secondJson.choices[0].message.content, "relay-success");
  assert.equal(upstreamBodies.length >= 2, true);
  assert.match(upstreamBodies[1].serializedBody, /<context_handoff>/);
  assert.match(upstreamBodies[1].serializedBody, /Carry over the router implementation state/);
  assert.equal(handoffDb.getHandoff(sessionId, "relay-combo"), null);
  await new Promise((resolve) => setTimeout(resolve, 50));
});

test("handleChat injects context-relay handoffs during live failover for Responses-native Codex requests", async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 1;

  const primary = await seedCodexOAuthConnection({
    name: "codex-live-a",
    email: "relay-live-a@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
    workspaceId: "ws-a",
    priority: 1,
  });
  await seedCodexOAuthConnection({
    name: "codex-live-b",
    email: "relay-live-b@example.com",
    accessToken: "token-b",
    refreshToken: "refresh-b",
    workspaceId: "ws-b",
    priority: 2,
  });

  await combosDb.createCombo({
    name: "relay-live-combo",
    strategy: "context-relay",
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      handoffThreshold: 0.85,
      maxMessagesForSummary: 12,
    },
    models: ["codex/gpt-5.4"],
  });

  const upstreamBodies = [];
  let primaryRequestCount = 0;

  globalThis.fetch = async (url, init = {}) => {
    const urlStr = String(url);
    const headers = Object.fromEntries(new Headers(init.headers || {}).entries());
    const authHeader = headers.authorization || headers.Authorization || "";

    if (urlStr.includes("/backend-api/wham/usage")) {
      return authHeader === "Bearer token-a" ? buildQuotaResponse(87) : buildQuotaResponse(20);
    }

    const body = init.body ? JSON.parse(String(init.body)) : {};
    const serializedBody = JSON.stringify(body);
    const isSummaryRequest =
      body._omnirouteInternalRequest === "context-handoff" ||
      serializedBody.includes("You are a context summarizer");

    if (isSummaryRequest) {
      return buildResponsesResponse(
        JSON.stringify({
          summary: "Carry over the Responses-native Codex session",
          keyDecisions: ["Keep the request in /responses format"],
          taskProgress: "Continue after the first account is exhausted",
          activeEntities: ["src/sse/handlers/chat.ts", "open-sse/services/contextHandoff.ts"],
        }),
        "gpt-5.4"
      );
    }

    upstreamBodies.push({ authHeader, body, serializedBody });

    if (authHeader === "Bearer token-a") {
      primaryRequestCount += 1;
      if (primaryRequestCount >= 2) {
        return new Response(JSON.stringify({ error: { message: "quota exceeded" } }), {
          status: 429,
          headers: { "content-type": "application/json" },
        });
      }
    }

    return buildResponsesResponse("relay-success", "gpt-5.4");
  };

  const firstResponse = await handleChat(
    buildRequest({
      headers: {
        "X-Session-Id": "relay-live-session",
        "X-OmniRoute-No-Cache": "true",
      },
      body: {
        model: "relay-live-combo",
        stream: false,
        instructions: "Preserve the original Responses instructions",
        input: [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text: "Keep implementing the new combo" }],
          },
        ],
      },
    })
  );

  assert.equal(firstResponse.status, 200);

  const sessionId = "ext:relay-live-session";
  const savedHandoff = await waitFor(
    () => handoffDb.getHandoff(sessionId, "relay-live-combo"),
    2000
  );
  assert.ok(savedHandoff);
  assert.equal(savedHandoff.fromAccount, primary.id);

  const secondResponse = await handleChat(
    buildRequest({
      headers: {
        "X-Session-Id": "relay-live-session",
        "X-OmniRoute-No-Cache": "true",
      },
      body: {
        model: "relay-live-combo",
        stream: false,
        instructions: "Continue with the current task",
        input: [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text: "Continue from where you left off" }],
          },
        ],
      },
    })
  );

  assert.equal(secondResponse.status, 200);

  const relayedSecondaryCall = upstreamBodies.find(
    (call) =>
      call.authHeader === "Bearer token-b" &&
      typeof call.body.instructions === "string" &&
      call.body.instructions.includes("<context_handoff>")
  );

  assert.ok(relayedSecondaryCall);
  assert.equal("messages" in relayedSecondaryCall.body, false);
  assert.deepEqual(
    relayedSecondaryCall.body.input[0].content[0].text,
    "Continue from where you left off"
  );
  assert.match(
    relayedSecondaryCall.body.instructions,
    /Carry over the Responses-native Codex session/
  );
  assert.match(relayedSecondaryCall.body.instructions, /Continue with the current task/);
  assert.equal(handoffDb.getHandoff(sessionId, "relay-live-combo"), null);
});
