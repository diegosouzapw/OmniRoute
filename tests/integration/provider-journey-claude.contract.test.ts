/**
 * Provider-journey CONTRACT — Claude (Anthropic Messages) format. Rail 3.8.55, Task 13.
 *
 * `provider-journey.contract.test.ts` (#8330) walks the journey for ONE OpenAI-compatible
 * provider and stops at /v1/models. This suite extends the gate to a second wire format
 * and adds the two legs that only break across module boundaries: the REAL model sync
 * (sync route -> /models route -> upstream /models) and a translated chat call.
 *
 *   create anthropic-compatible node -> add connection -> sync models from the upstream
 *   -> /v1/models publishes `<prefix>/<model>` with owned_by = prefix (#8327 residue)
 *   -> POST /v1/messages (Claude client) -> upstream receives an Anthropic Messages call
 *      for the RAW model id with the connection credential -> client gets a Claude message
 *
 * The upstream is a local HTTP server on an ephemeral port (no external network). The
 * route handlers and DB run in-process against an isolated DATA_DIR, so this runs under
 * `test:integration` (top-level `tests/integration/*.test.ts` glob) with no live server.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";
import {
  asArray,
  headerValue,
  installLoopbackModelsFetch,
  readJsonObject,
  startFakeUpstream,
  type FakeUpstream,
  type JsonObject,
  type RecordedRequest,
} from "./_providerJourneyHarness.ts";

// ---------------------------------------------------------------------------
// Isolated storage + env — must be set BEFORE importing any DB-backed module.
// ---------------------------------------------------------------------------
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-journey-claude-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "provider-journey-claude-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.INITIAL_PASSWORD = "provider-journey-claude-bootstrap";
// The fake upstream lives on 127.0.0.1 — local provider URLs are the documented default,
// pinned here so an operator env that turns them off cannot make the suite flaky.
process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "true";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const v1ModelsRoute = await import("../../src/app/api/v1/models/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const { getModelSyncInternalBaseUrl } =
  await import("../../src/shared/services/modelSyncScheduler.ts");

// ---------------------------------------------------------------------------
// Contract identity.
// ---------------------------------------------------------------------------
const CONFIGURED_PREFIX = "journey-claude";
const CONFIGURED_NAME = "Journey Anthropic Provider";
const UPSTREAM_MODEL_ID = "journey-sonnet-1";
const PUBLISHED_MODEL_ID = `${CONFIGURED_PREFIX}/${UPSTREAM_MODEL_ID}`;
const CONNECTION_KEY = "sk-ant-journey-credential";
const UPSTREAM_REPLY = "pong from the fake anthropic upstream";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

type CatalogModel = { id?: string; owned_by?: unknown };

function anthropicSse(model: string): string {
  const events: Array<[string, JsonObject]> = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id: "msg_journey",
          type: "message",
          role: "assistant",
          model,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 5, output_tokens: 0 },
        },
      },
    ],
    [
      "content_block_start",
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    ],
    [
      "content_block_delta",
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: UPSTREAM_REPLY },
      },
    ],
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    [
      "message_delta",
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 6 },
      },
    ],
    ["message_stop", { type: "message_stop" }],
  ];
  return events
    .map(([event, data]) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    .join("");
}

/** Anthropic Messages API, as far as the journey needs it. */
function anthropicUpstream(request: RecordedRequest) {
  if (request.method === "GET" && /\/models(\?|$)/.test(request.path)) {
    return {
      body: {
        data: [
          {
            type: "model",
            id: UPSTREAM_MODEL_ID,
            display_name: "Journey Sonnet 1",
            created_at: "2026-01-01T00:00:00Z",
          },
        ],
        has_more: false,
        first_id: UPSTREAM_MODEL_ID,
        last_id: UPSTREAM_MODEL_ID,
      },
    };
  }
  if (request.method === "POST" && /\/messages(\?|$)/.test(request.path)) {
    const model = typeof request.body?.model === "string" ? request.body.model : "";
    if (request.body?.stream === true) return { body: anthropicSse(model) };
    return {
      body: {
        id: "msg_journey",
        type: "message",
        role: "assistant",
        model,
        content: [{ type: "text", text: UPSTREAM_REPLY }],
        stop_reason: "end_turn",
        stop_sequence: null,
        usage: { input_tokens: 5, output_tokens: 6 },
      },
    };
  }
  return { status: 404, body: { type: "error", error: { type: "not_found_error" } } };
}

let upstream: FakeUpstream;
let restoreFetch: () => void = () => {};
let nodeId = "";
let connectionId = "";
let apiKeyValue = "";

async function fetchCatalog(headers?: HeadersInit) {
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsRoute.GET(
    new Request("http://localhost/api/v1/models", { headers })
  );
  const body = await readJsonObject(response);
  return { status: response.status, models: asArray<CatalogModel>(body.data) };
}

test.before(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await updateSettings({ requireLogin: true, requireAuthForModels: true, password: "" });
  upstream = await startFakeUpstream(anthropicUpstream);
  assert.notEqual(
    new URL(getModelSyncInternalBaseUrl()).port,
    String(upstream.port),
    "fake upstream must not collide with the loopback dashboard port"
  );
  restoreFetch = installLoopbackModelsFetch(getModelSyncInternalBaseUrl(), providerModelsRoute.GET);
});

test.after(async () => {
  restoreFetch();
  await upstream?.close();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.describe("provider journey — Claude format (anthropic-compatible upstream)", () => {
  test("STEP 1: create an anthropic-compatible provider node pointed at the fake upstream", async () => {
    const response = await providerNodesRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/provider-nodes", {
        method: "POST",
        body: {
          type: "anthropic-compatible",
          name: CONFIGURED_NAME,
          prefix: CONFIGURED_PREFIX,
          baseUrl: `${upstream.origin}/v1`,
        },
      })
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 201, `create provider-node failed: ${JSON.stringify(body)}`);
    const node = body.node as { id?: string; prefix?: string; type?: string };
    nodeId = node.id ?? "";
    assert.match(nodeId, /^anthropic-compatible-/);
    assert.equal(node.type, "anthropic-compatible");
    assert.equal(node.prefix, CONFIGURED_PREFIX);
  });

  test("STEP 2: add a connection with the upstream credential", async () => {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: { provider: nodeId, apiKey: CONNECTION_KEY, name: "Journey Claude Connection" },
      })
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 201, `add connection failed: ${JSON.stringify(body)}`);
    const connection = body.connection as { id?: string; provider?: string };
    connectionId = connection.id ?? "";
    assert.ok(connectionId);
    assert.equal(connection.provider, nodeId);
    // #11446: new connections start inactive until a connection test passes; the
    // fire-and-forget test is not part of this contract (see provider-journey.contract).
    await updateProviderConnection(connectionId, { isActive: true, testStatus: "active" });
  });

  test("STEP 3: sync models — the real sync route discovers the upstream catalog", async () => {
    const before = upstream.requests.length;
    const response = await syncModelsRoute.POST(
      await makeManagementSessionRequest(
        `http://localhost/api/providers/${connectionId}/sync-models?quiet=1`,
        { method: "POST" }
      ),
      { params: Promise.resolve({ id: connectionId }) }
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 200, `sync-models failed: ${JSON.stringify(body)}`);

    const modelCalls = upstream.requests
      .slice(before)
      .filter((r) => r.method === "GET" && /\/models(\?|$)/.test(r.path));
    assert.ok(modelCalls.length > 0, "sync must hit the upstream /models endpoint");
    assert.equal(headerValue(modelCalls[0].headers, "x-api-key"), CONNECTION_KEY);

    const synced = await modelsDb.getSyncedAvailableModelsForConnection(nodeId, connectionId);
    assert.deepEqual(
      synced.map((m) => m.id),
      [UPSTREAM_MODEL_ID],
      "the synced catalog must be exactly what the upstream advertised"
    );
  });

  test("STEP 4: /v1/models publishes <prefix>/<model> owned by the prefix, never the UUID (#8327)", async () => {
    const keyResponse = await keysRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "journey-claude-key" },
      })
    );
    const keyBody = await readJsonObject(keyResponse);
    assert.equal(keyResponse.status, 201, `create key failed: ${JSON.stringify(keyBody)}`);
    apiKeyValue = typeof keyBody.key === "string" ? keyBody.key : "";
    assert.match(apiKeyValue, /^sk-/);

    const { status, models } = await fetchCatalog({ Authorization: `Bearer ${apiKeyValue}` });
    assert.equal(status, 200);
    const entry = models.find((m) => m.id === PUBLISHED_MODEL_ID);
    assert.ok(entry, `/v1/models must expose "${PUBLISHED_MODEL_ID}"`);
    assert.equal(entry?.owned_by, CONFIGURED_PREFIX);
    for (const model of models) {
      assert.notEqual(model.owned_by, nodeId, `owned_by leaked the node id on "${model.id}"`);
      assert.equal(
        typeof model.owned_by === "string" && UUID_SHAPE_RE.test(model.owned_by),
        false,
        `owned_by "${String(model.owned_by)}" (id "${String(model.id)}") must not be a raw UUID`
      );
    }
  });

  test("STEP 5: POST /v1/messages reaches the upstream as an Anthropic call for the raw model id", async () => {
    const before = upstream.requests.length;
    const response = await messagesRoute.POST(
      new Request("http://localhost/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKeyValue,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: PUBLISHED_MODEL_ID,
          max_tokens: 64,
          stream: false,
          system: "You are the journey contract.",
          messages: [{ role: "user", content: "ping from the claude journey" }],
        }),
      }),
      {}
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 200, `/v1/messages failed: ${JSON.stringify(body)}`);

    const chatCalls = upstream.requests
      .slice(before)
      .filter((r) => r.method === "POST" && /\/messages(\?|$)/.test(r.path));
    assert.equal(chatCalls.length, 1, "exactly one upstream Messages call");
    const sent = chatCalls[0];
    assert.match(sent.path, /^\/v1\/messages(\?|$)/);
    assert.equal(headerValue(sent.headers, "x-api-key"), CONNECTION_KEY);
    assert.equal(sent.body?.model, UPSTREAM_MODEL_ID, "the prefix must be stripped upstream");
    const sentMessages = asArray<{ role?: string; content?: unknown }>(sent.body?.messages);
    assert.equal(sentMessages.at(-1)?.role, "user");
    assert.match(JSON.stringify(sentMessages.at(-1)?.content), /ping from the claude journey/);
    assert.match(JSON.stringify(sent.body?.system), /You are the journey contract\./);

    // Client-side contract: a Claude message, not an OpenAI completion.
    assert.equal(body.type, "message");
    assert.equal(body.role, "assistant");
    const content = asArray<{ type?: string; text?: string }>(body.content);
    assert.equal(content[0]?.type, "text");
    assert.equal(content[0]?.text, UPSTREAM_REPLY);
    assert.equal(body.choices, undefined, "an OpenAI-shaped body must not leak to a Claude client");
  });

  test("STEP 6: streaming /v1/messages relays the Anthropic SSE event sequence", async () => {
    const before = upstream.requests.length;
    const response = await messagesRoute.POST(
      new Request("http://localhost/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKeyValue,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: PUBLISHED_MODEL_ID,
          max_tokens: 64,
          stream: true,
          messages: [{ role: "user", content: "stream ping from the claude journey" }],
        }),
      }),
      {}
    );
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);
    const transcript = await response.text();

    const sent = upstream.requests
      .slice(before)
      .filter((r) => r.method === "POST" && /\/messages(\?|$)/.test(r.path));
    assert.equal(sent.length, 1, "exactly one upstream Messages call");
    assert.equal(sent[0].body?.model, UPSTREAM_MODEL_ID);
    assert.equal(sent[0].body?.stream, true, "a streaming client must stream upstream");

    const events = [...transcript.matchAll(/^event: (\w+)$/gm)].map((m) => m[1]);
    const required = ["message_start", "content_block_delta", "message_stop"];
    for (const name of required) {
      assert.ok(events.includes(name), `missing "${name}" in ${JSON.stringify(events)}`);
    }
    assert.ok(
      events.indexOf("message_start") < events.indexOf("message_stop"),
      "message_start must precede message_stop"
    );
    assert.match(transcript, new RegExp(UPSTREAM_REPLY));
    assert.doesNotMatch(
      transcript,
      /chat\.completion\.chunk/,
      "no OpenAI chunks to a Claude client"
    );
  });
});
