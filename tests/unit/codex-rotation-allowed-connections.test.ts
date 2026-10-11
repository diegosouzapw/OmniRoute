import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Regression guard: when a Codex account returns 429 mid-request, chatCore's
// provider execution pipeline rotates to another Codex account. That rotation
// must stay inside the connection allowlist the request was routed under (the
// API key's allowed_connections, intersected with any combo-step allowlist).
// It used to call getProviderCredentials with a null allowlist, so a key
// restricted to accounts A and C silently got served by account B.
const h = await createChatPipelineHarness("codex-rotation-allowlist");
const providersDb = await import("../../src/lib/db/providers.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");

type UpstreamCall = { token: string };
let upstreamCalls: UpstreamCall[] = [];

const TOKENS = {
  limited: "fixture-token-limited-a",
  outside: "fixture-token-outside-b",
  allowed: "fixture-token-allowed-c",
} as const;

function completedSse(text: string): Response {
  const completed = {
    type: "response.completed",
    response: {
      id: "resp_fixture",
      object: "response",
      status: "completed",
      model: "gpt-5.6-luna",
      output: [
        {
          id: "msg_fixture",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  };
  const delta = { type: "response.output_text.delta", item_id: "msg_fixture", delta: text };
  return new Response(
    `data: ${JSON.stringify(delta)}\n\ndata: ${JSON.stringify(completed)}\n\ndata: [DONE]\n\n`,
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function createCodexAccount(name: string, accessToken: string, priority: number) {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    accessToken,
    refreshToken: `${accessToken}-refresh`,
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
  });
  assert(connection && typeof connection.id === "string");
  return String(connection.id);
}

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  upstreamCalls = [];
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!/chatgpt\.com\/backend-api\/codex\/responses/.test(url)) {
      return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    }
    const headers = new Headers(init.headers);
    const token = (headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    upstreamCalls.push({ token });
    if (token === TOKENS.limited) {
      return new Response(
        JSON.stringify({ error: { type: "usage_limit_reached", message: "limit reached" } }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    }
    return completedSse(token === TOKENS.outside ? "from outside account" : "from allowed account");
  };
});

test.afterEach(async () => {
  flushProxyLogsSync();
  h.BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.resetStorage();
});

test.after(() => {
  flushProxyLogsSync();
  return h.cleanup();
});

async function sendCodex(authKey: string, stream: boolean) {
  const response = await h.handleChat(
    h.buildRequest({
      authKey,
      body: {
        model: "codex/gpt-5.6-luna",
        stream,
        messages: [{ role: "user", content: `Reply ok ${crypto.randomUUID()}` }],
      },
    })
  );
  return { status: response.status, text: await response.text() };
}

for (const [provider, failure] of [
  ["codex", { status: 429, body: { error: { message: "rate limited" } } }],
  ["antigravity", { status: 422, body: { error: { message: "gcp_project_required" } } }],
] as const) {
  test(`pipeline: ${provider} rotation passes the routing allowlist to the resolver`, async () => {
    const resolverAllowlists: Array<string[] | null> = [];
    let sends = 0;
    let currentId = "conn-a";
    const outcome = await runProviderExecutionPipeline({
      policy: { allowAccountRotation: true, allowModelFallback: false },
      target: {
        provider,
        requestedModel: "model-x",
        sourceFormat: "openai",
        targetFormat: "openai",
        stream: false,
      },
      connection: {
        initialConnectionId: "conn-a",
        getCurrentConnectionId: () => currentId,
        getCredentials: () => ({ connectionId: currentId }),
        replaceCredentials: (next) => {
          currentId = String(next.connectionId);
        },
        onCredentialsRefreshed: () => {},
        assertManagedLeaseFence: () => {},
        allowedConnections: ["conn-a", "conn-c"],
        getProviderCredentials: (async (_provider, _exclude, allowed) => {
          resolverAllowlists.push(allowed ?? null);
          return { connectionId: "conn-c", allRateLimited: false };
        }) as never,
      },
      wire: {
        body: { model: "model-x" },
        currentModel: "model-x",
        triedModels: new Set(["model-x"]),
        setBodyAndModel: () => {},
      },
      state: {
        updatePendingStage: () => {},
        recordRateLimitHeaders: () => {},
        recordRateLimitBody: () => {},
        writeTerminalStatus: async () => {},
        persistConnectionPatch: () => {},
        setConnectionRateLimitedUntil: () => {},
        lockModel: () => {},
        recordAntigravityQuotaState: async () => {},
        markAccountSemaphoreBlocked: () => {},
        isolateProbeFailures: () => false,
      } as never,
      sendProviderAttempt: async () => {
        sends += 1;
        const [status, body] =
          sends === 1 ? [failure.status, failure.body] : [200, { choices: [{ message: {} }] }];
        return {
          response: new Response(JSON.stringify(body), {
            status,
            headers: { "content-type": "application/json" },
          }),
          url: "https://upstream.test",
          headers: {},
          transformedBody: {},
        };
      },
    });

    assert.deepEqual(resolverAllowlists, [["conn-a", "conn-c"]]);
    assert.equal(outcome.kind, "response");
    assert.equal(outcome.connectionId, "conn-c");
  });
}

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";

  test(`${mode}: Codex 429 rotation skips an account outside the key allowlist`, async () => {
    const limited = await createCodexAccount("codex-limited", TOKENS.limited, 1);
    await createCodexAccount("codex-outside", TOKENS.outside, 2);
    const allowed = await createCodexAccount("codex-allowed", TOKENS.allowed, 3);
    const key = await h.seedApiKey({ allowedConnections: [limited, allowed] });

    const result = await sendCodex(key.key, stream);

    assert.equal(result.status, 200, result.text);
    assert.match(result.text, /from allowed account/);
    assert.deepEqual(
      upstreamCalls.map((call) => call.token),
      [TOKENS.limited, TOKENS.allowed],
      "rotation must go from the limited account straight to the allowed one"
    );
  });

  test(`${mode}: Codex 429 does not rotate when the allowlist has no other account`, async () => {
    const limited = await createCodexAccount("codex-limited", TOKENS.limited, 1);
    await createCodexAccount("codex-outside", TOKENS.outside, 2);
    const key = await h.seedApiKey({ allowedConnections: [limited] });

    const result = await sendCodex(key.key, stream);

    assert.notEqual(result.status, 200, result.text);
    assert.ok(
      upstreamCalls.every((call) => call.token !== TOKENS.outside),
      "an account outside the key allowlist must never be called"
    );
  });
}
