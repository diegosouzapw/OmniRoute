import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-managed-lease-routing");
const {
  apiKeysDb,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;
const leaseDb = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const accountSemaphores = await import("../../open-sse/services/accountSemaphore.ts");
const { POST: handleCompletions } = await import("../../src/app/api/v1/completions/route.ts");

const OWNER = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const OWNER_B = "vlo_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

async function seedManagedKey(connectionIds: string[]) {
  return apiKeysDb.createApiKey("managed-chat", "test", ["lease:exclusive"], {
    allowedConnections: connectionIds,
  });
}

function managedRequest(
  key: string,
  generation: number,
  extraHeaders = {},
  bodyOverrides: Record<string, unknown> = {},
  owner = OWNER,
  url = "http://localhost/v1/chat/completions"
) {
  return buildRequest({
    url,
    authKey: key,
    headers: {
      "X-OmniRoute-Lease-Owner": owner,
      "X-OmniRoute-Lease-Generation": String(generation),
      ...extraHeaders,
    },
    body: {
      model: "openai/gpt-4.1",
      stream: false,
      messages: [{ role: "user", content: "synthetic managed lease test" }],
      ...bodyOverrides,
    },
  });
}

function buildOpenAIStreamResponse(text: string): Response {
  const frames = [
    `data: ${JSON.stringify({
      id: "chatcmpl_stream",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
    })}\n\n`,
    `data: ${JSON.stringify({
      id: "chatcmpl_stream",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n\n`,
    "data: [DONE]\n\n",
  ];
  return new Response(frames.join(""), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

test.beforeEach(async () => {
  process.env.REQUIRE_API_KEY = "false";
  await resetStorage();
});
test.after(async () => harness.cleanup());

test("managed chat requires explicit owner and generation before provider dispatch", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };

  const missingOwner = await handleChat(
    buildRequest({
      authKey: key.key,
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "missing owner" }],
      },
    })
  );
  assert.equal(missingOwner.status, 400);
  assert.equal((await missingOwner.json()).error.code, "LEASE_CONTEXT_REQUIRED");

  const missingGeneration = await handleChat(
    buildRequest({
      authKey: key.key,
      headers: { "X-OmniRoute-Lease-Owner": OWNER },
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "missing generation" }],
      },
    })
  );
  assert.equal(missingGeneration.status, 400);
  assert.equal((await missingGeneration.json()).error.code, "LEASE_CONTEXT_INVALID");
  assert.equal(dispatches, 0);
});

test("managed chat blocks missing and stale leases with zero provider dispatch", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };

  const missing = await handleChat(managedRequest(key.key, 1));
  assert.equal(missing.status, 409);
  assert.equal((await missing.json()).error.code, "LEASE_REQUIRED");

  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const stale = await handleChat(managedRequest(key.key, acquired.lease.generation + 1));
  assert.equal(stale.status, 409);
  assert.equal((await stale.json()).error.code, "LEASE_FENCE_STALE");
  assert.equal(dispatches, 0);
});

test("managed chat blocks cross-key owner-generation replay before provider dispatch", async () => {
  const connection = await seedConnection("openai");
  const ownerKey = await seedManagedKey([connection.id]);
  const replayKey = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: ownerKey.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };
  const replay = await handleChat(managedRequest(replayKey.key, acquired.lease.generation));

  assert.equal(replay.status, 409);
  assert.equal((await replay.json()).error.code, "LEASE_FENCE_STALE");
  assert.equal(dispatches, 0);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNER)?.apiKeyId, ownerKey.id);
});

test("managed chat dispatches only the fenced active binding", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIResponse("managed success");
  };
  const response = await handleChat(managedRequest(key.key, acquired.lease.generation));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).choices[0].message.content, "managed success");
  assert.equal(dispatches, 1);
});

test("identical prompts with different owners never share a managed connection", async () => {
  const firstConnection = await seedConnection("openai", {
    name: "managed-owner-a",
    apiKey: "sk-managed-owner-a",
    priority: 1,
  });
  const secondConnection = await seedConnection("openai", {
    name: "managed-owner-b",
    apiKey: "sk-managed-owner-b",
    priority: 2,
  });
  const key = await seedManagedKey([firstConnection.id, secondConnection.id]);
  const firstLease = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: firstConnection.id,
  });
  const secondLease = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: secondConnection.id,
  });
  assert.equal(firstLease.kind, "ACQUIRED");
  assert.equal(secondLease.kind, "ACQUIRED");
  if (firstLease.kind !== "ACQUIRED" || secondLease.kind !== "ACQUIRED") return;

  const usedApiKeys: string[] = [];
  globalThis.fetch = async (_url, init) => {
    usedApiKeys.push(new Headers(init?.headers).get("authorization") ?? "");
    return buildOpenAIResponse("isolated owner success");
  };
  const sharedBody = {
    model: "openai/gpt-4.1",
    stream: false,
    messages: [{ role: "user", content: "byte-identical prompt and tools" }],
    tools: [{ type: "function", function: { name: "noop", parameters: { type: "object" } } }],
  };
  const firstResponse = await handleChat(
    managedRequest(
      key.key,
      firstLease.lease.generation,
      { "X-Session-Id": "same-routing-session" },
      sharedBody,
      OWNER
    )
  );
  const secondResponse = await handleChat(
    managedRequest(
      key.key,
      secondLease.lease.generation,
      { "X-Session-Id": "same-routing-session" },
      sharedBody,
      OWNER_B
    )
  );

  assert.equal(firstResponse.status, 200);
  assert.equal(secondResponse.status, 200);
  assert.equal(usedApiKeys.length, 2);
  assert.notEqual(usedApiKeys[0], usedApiKeys[1]);
  assert.notEqual(
    leaseDb.getActiveExclusiveConnectionLease(OWNER)?.connectionId,
    leaseDb.getActiveExclusiveConnectionLease(OWNER_B)?.connectionId
  );
});

test("changing prompt, tools, and request model does not change the owner binding", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIResponse("identity stable");
  };
  for (const body of [
    { messages: [{ role: "user", content: "prompt one" }] },
    {
      messages: [{ role: "user", content: "prompt two" }],
      tools: [{ type: "function", function: { name: "other", parameters: { type: "object" } } }],
    },
    { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "model changed" }] },
  ]) {
    const response = await handleChat(managedRequest(key.key, acquired.lease.generation, {}, body));
    assert.equal(response.status, 200);
    assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNER)?.connectionId, connection.id);
  }
  assert.equal(dispatches, 3);
});

test("legacy completions and messages-compatible paths use the managed lease handler", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIResponse("legacy fenced");
  };
  const completions = await handleCompletions(
    managedRequest(
      key.key,
      acquired.lease.generation,
      {},
      { prompt: "legacy completion", messages: undefined },
      OWNER,
      "http://localhost/v1/completions"
    )
  );
  const messages = await handleChat(
    managedRequest(
      key.key,
      acquired.lease.generation,
      {},
      { messages: [{ role: "user", content: "messages compatible" }] },
      OWNER,
      "http://localhost/v1/messages"
    )
  );

  assert.equal(completions.status, 200);
  assert.equal(messages.status, 200);
  assert.equal(dispatches, 2);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNER)?.connectionId, connection.id);
});

test("managed chat fences after an admission wait and before main executor dispatch", async () => {
  const connection = await seedConnection("openai");
  await providersDb.updateProviderConnection(connection.id, { maxConcurrent: 1 });
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const semaphoreKey = accountSemaphores.buildAccountSemaphoreKey({
    provider: "openai",
    accountKey: connection.id,
  });
  const releaseBlocker = await accountSemaphores.acquire(semaphoreKey, { maxConcurrency: 1 });
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch after stale fence");
  };

  const pending = handleChat(managedRequest(key.key, acquired.lease.generation));
  for (let i = 0; i < 40; i += 1) {
    if ((accountSemaphores.getStats()[semaphoreKey]?.queued ?? 0) === 1) break;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.equal(accountSemaphores.getStats()[semaphoreKey]?.queued, 1);

  assert.equal(
    leaseDb.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER,
      generation: acquired.lease.generation,
      apiKeyId: key.id,
    }).kind,
    "RELEASED"
  );
  releaseBlocker();
  const response = await pending;

  assert.equal(response.status, 409);
  assert.equal((await response.json()).error.code, "LEASE_REQUIRED");
  assert.equal(dispatches, 0);
});

test("managed streaming chat preserves the lifecycle lease after completion", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIStreamResponse("managed stream success");
  };
  const response = await handleChat(
    managedRequest(
      key.key,
      acquired.lease.generation,
      { Accept: "text/event-stream" },
      {
        stream: true,
      }
    )
  );
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type") || "", /text\/event-stream/);
  assert.match(body, /managed stream success/);
  assert.equal(dispatches, 1);
  assert.equal(
    leaseDb.getActiveExclusiveConnectionLease(OWNER)?.generation,
    acquired.lease.generation
  );
});

test("managed Responses-shaped request uses the same fenced chat path", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIResponse("responses fenced success");
  };
  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      authKey: key.key,
      headers: {
        "X-OmniRoute-Lease-Owner": OWNER,
        "X-OmniRoute-Lease-Generation": String(acquired.lease.generation),
      },
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        input: "synthetic Responses request",
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(dispatches, 1);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNER)?.connectionId, connection.id);
});

test("a direct foreign connection pin cannot override the active binding", async () => {
  const bound = await seedConnection("openai", { name: "managed-bound", priority: 1 });
  const other = await seedConnection("openai", { name: "managed-other", priority: 2 });
  const key = await seedManagedKey([bound.id, other.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: bound.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };

  assert.notEqual(bound.id, other.id);
  assert.equal(leaseDb.getActiveExclusiveConnectionLease(OWNER)?.connectionId, bound.id);

  const pinnedRequest = managedRequest(key.key, acquired.lease.generation, {
    "X-OmniRoute-Connection": other.id,
  });
  assert.equal(pinnedRequest.headers.get("x-omniroute-connection"), other.id);
  const response = await handleChat(pinnedRequest);
  assert.equal(response.status, 409);
  assert.equal((await response.json()).error.code, "LEASE_CONNECTION_MISMATCH");
  assert.equal(dispatches, 0);
  assert.equal((await providersDb.getProviderConnectionById(bound.id))?.testStatus, "active");
});

test("managed chat retains ordinary cooldown semantics instead of reporting lease capacity", async () => {
  const connection = await seedConnection("openai", {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
  const key = await seedManagedKey([connection.id]);
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };

  const response = await handleChat(managedRequest(key.key, 1));
  assert.notEqual(response.status, 429);
  assert.notEqual((await response.json()).state, "WAITING_FOR_CAPACITY");
  assert.equal(dispatches, 0);
});

test("empty ordinary eligibility is not reported as lease capacity contention", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  await providersDb.updateProviderConnection(connection.id, { testStatus: "banned" });
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };

  const response = await handleChat(managedRequest(key.key, 1));
  const body = await response.json();
  assert.notEqual(body.state, "WAITING_FOR_CAPACITY");
  assert.notEqual(body.error?.code, "LEASE_CAPACITY_UNAVAILABLE");
  assert.equal(dispatches, 0);
});

test("managed combos reject every fan-out route before provider dispatch", async () => {
  const firstConnection = await seedConnection("openai", {
    name: "managed-combo-first",
    apiKey: "sk-managed-combo-first",
  });
  const secondConnection = await seedConnection("openai", {
    name: "managed-combo-second",
    apiKey: "sk-managed-combo-second",
  });
  const key = await seedManagedKey([firstConnection.id, secondConnection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: firstConnection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const cases = [
    { name: "managed-fusion", strategy: "fusion", models: ["openai/gpt-4.1"] },
    { name: "managed-relay", strategy: "context-relay", models: ["openai/gpt-4.1"] },
    {
      name: "managed-pipeline-multi",
      strategy: "pipeline",
      models: ["openai/gpt-4.1", "openai/gpt-4o-mini"],
    },
    {
      name: "managed-chaos",
      strategy: "priority",
      config: { chaos: { enabled: true } },
      models: ["openai/gpt-4.1", "openai/gpt-4o-mini"],
    },
    {
      name: "managed-shadow",
      strategy: "priority",
      config: { shadowRouting: { enabled: true, targets: ["openai/gpt-4o-mini"] } },
      models: ["openai/gpt-4.1"],
    },
    {
      name: "managed-speculative",
      strategy: "priority",
      config: { zeroLatencyOptimizationsEnabled: true, hedging: true },
      models: ["openai/gpt-4.1", "openai/gpt-4o-mini"],
    },
    {
      name: "managed-fixed-multi-account",
      strategy: "priority",
      models: [
        { model: "openai/gpt-4.1", connectionId: firstConnection.id },
        { model: "openai/gpt-4o-mini", connectionId: secondConnection.id },
      ],
    },
  ];
  for (const combo of cases) await combosDb.createCombo(combo);
  await combosDb.createCombo({
    name: "managed-nested-fusion",
    strategy: "priority",
    config: { nestedComboMode: "execute" },
    models: [{ kind: "combo-ref", comboName: "managed-fusion" }],
  });

  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    throw new Error("unexpected provider dispatch");
  };
  for (const model of [...cases.map((combo) => combo.name), "managed-nested-fusion"]) {
    const response = await handleChat(
      managedRequest(key.key, acquired.lease.generation, {}, { model })
    );
    assert.equal(response.status, 409, model);
    assert.equal((await response.json()).error.code, "LEASE_UNSUPPORTED_ROUTE", model);
  }
  assert.equal(dispatches, 0);
});

test("one-step managed pipeline uses the ordinary fenced lease path", async () => {
  const connection = await seedConnection("openai");
  const key = await seedManagedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: key.id,
    provider: "openai",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  await combosDb.createCombo({
    name: "managed-pipeline-one",
    strategy: "pipeline",
    config: { maxRetries: 0 },
    models: ["openai/gpt-4.1"],
  });
  let dispatches = 0;
  globalThis.fetch = async () => {
    dispatches += 1;
    return buildOpenAIResponse("one-step success");
  };

  const response = await handleChat(
    managedRequest(key.key, acquired.lease.generation, {}, { model: "managed-pipeline-one" })
  );
  assert.equal(response.status, 200);
  assert.equal(dispatches, 1);
});

test("normal API key can dispatch through a connection listed by an idle lease-capable key", async () => {
  const connection = await seedConnection("openai", { name: "idle-conn", apiKey: "sk-idle-conn" });
  await seedManagedKey([connection.id]);
  const normalKey = await apiKeysDb.createApiKey("normal-key", "test");

  const dispatchedKeys: string[] = [];
  globalThis.fetch = async (_url, init) => {
    dispatchedKeys.push(new Headers(init?.headers).get("authorization") ?? "");
    return buildOpenAIResponse("normal key success");
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/chat/completions",
      authKey: normalKey.key,
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "hello from normal key" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(dispatchedKeys.length, 1);
  assert.equal(dispatchedKeys[0], "Bearer sk-idle-conn");
});

test("normal API key routes to alternative eligible connection when primary is actively leased", async () => {
  const connectionX = await seedConnection("openai", {
    name: "leased-x",
    apiKey: "sk-leased-x",
    priority: 1,
  });
  const _connectionY = await seedConnection("openai", {
    name: "free-y",
    apiKey: "sk-free-y",
    priority: 2,
  });
  const managedKey = await seedManagedKey([connectionX.id]);
  const normalKey = await apiKeysDb.createApiKey("normal-key", "test");

  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: managedKey.id,
    provider: "openai",
    connectionId: connectionX.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const dispatchedKeys: string[] = [];
  globalThis.fetch = async (_url, init) => {
    dispatchedKeys.push(new Headers(init?.headers).get("authorization") ?? "");
    return buildOpenAIResponse("routed to y");
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/chat/completions",
      authKey: normalKey.key,
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "hello from normal key" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(dispatchedKeys.length, 1);
  assert.equal(dispatchedKeys[0], "Bearer sk-free-y");
});

test("normal API key recovers connection after expired lease reconciliation without sleep", async () => {
  const connection = await seedConnection("openai", {
    name: "expiring-conn",
    apiKey: "sk-expiring-conn",
  });
  const managedKey = await seedManagedKey([connection.id]);
  const normalKey = await apiKeysDb.createApiKey("normal-key", "test");

  const baseTime = "2026-01-01T00:00:00.000Z";
  const afterExpiry = "2026-01-01T00:00:05.000Z";

  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: managedKey.id,
    provider: "openai",
    connectionId: connection.id,
    now: baseTime,
    ttlMs: 1000,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const expiredCount = leaseDb.reconcileExpiredExclusiveConnectionLeases(afterExpiry);
  assert.equal(expiredCount, 1);

  const dispatchedKeys: string[] = [];
  globalThis.fetch = async (_url, init) => {
    dispatchedKeys.push(new Headers(init?.headers).get("authorization") ?? "");
    return buildOpenAIResponse("reconciled after expiry");
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/chat/completions",
      authKey: normalKey.key,
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "hello after expiry" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(dispatchedKeys.length, 1);
  assert.equal(dispatchedKeys[0], "Bearer sk-expiring-conn");
});
