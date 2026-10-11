/**
 * Provider-journey CONTRACT — Gemini client format. Rail 3.8.55, Task 13.
 *
 * Companion of `provider-journey.contract.test.ts` (#8330, OpenAI-compatible, catalog
 * only) and `provider-journey-claude.contract.test.ts` (Anthropic Messages). Here the
 * CLIENT speaks Gemini (`/v1beta/models/<prefix>/<model>:generateContent`) and the
 * provider is an OpenAI-compatible node, so the call crosses two translations:
 * Gemini request -> internal/OpenAI -> upstream, and OpenAI response -> Gemini response.
 *
 *   create openai-compatible node -> add connection -> sync models from the upstream
 *   -> /v1/models publishes `<prefix>/<model>` with owned_by = prefix (#8327 residue)
 *   -> Gemini generateContent -> upstream receives an OpenAI Chat Completions call for
 *      the RAW model id with the connection credential -> client gets candidates[]
 *
 * Why not a Gemini-format UPSTREAM: provider nodes are only openai-/anthropic-compatible,
 * and the native `gemini` executor builds its URL from the registry base URL
 * (open-sse/executors/default.ts, `case "gemini"`), ignoring a per-connection base URL, so
 * a local fake cannot stand in for it without mocking fetch.
 *
 * The upstream is a local HTTP server on an ephemeral port (no external network); route
 * handlers + DB run in-process on an isolated DATA_DIR (collected by `test:integration`).
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
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-journey-gemini-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "provider-journey-gemini-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.INITIAL_PASSWORD = "provider-journey-gemini-bootstrap";
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
const v1betaModelsRoute = await import("../../src/app/api/v1beta/models/route.ts");
const v1betaGenerateRoute = await import("../../src/app/api/v1beta/models/[...path]/route.ts");
const { getModelSyncInternalBaseUrl } =
  await import("../../src/shared/services/modelSyncScheduler.ts");

// ---------------------------------------------------------------------------
// Contract identity.
// ---------------------------------------------------------------------------
const CONFIGURED_PREFIX = "journey-gemini";
const CONFIGURED_NAME = "Journey Gemini-Client Provider";
const UPSTREAM_MODEL_ID = "journey-flash-1";
const PUBLISHED_MODEL_ID = `${CONFIGURED_PREFIX}/${UPSTREAM_MODEL_ID}`;
const CONNECTION_KEY = "sk-journey-gemini-credential";
const UPSTREAM_REPLY = "pong from the fake openai upstream";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

type CatalogModel = { id?: string; owned_by?: unknown };

function openAiSse(model: string): string {
  const chunks: JsonObject[] = [
    {
      id: "chatcmpl-journey",
      object: "chat.completion.chunk",
      created: 1_760_000_000,
      model,
      choices: [
        { index: 0, delta: { role: "assistant", content: UPSTREAM_REPLY }, finish_reason: null },
      ],
    },
    {
      id: "chatcmpl-journey",
      object: "chat.completion.chunk",
      created: 1_760_000_000,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 7, completion_tokens: 6, total_tokens: 13 },
    },
  ];
  return `${chunks.map((c) => `data: ${JSON.stringify(c)}\n\n`).join("")}data: [DONE]\n\n`;
}

/** OpenAI Chat Completions API, as far as the journey needs it. */
function openAiUpstream(request: RecordedRequest) {
  if (request.method === "GET" && /\/models(\?|$)/.test(request.path)) {
    return {
      body: {
        object: "list",
        data: [{ id: UPSTREAM_MODEL_ID, object: "model", created: 0, owned_by: "upstream" }],
      },
    };
  }
  if (request.method === "POST" && /\/chat\/completions(\?|$)/.test(request.path)) {
    const model = typeof request.body?.model === "string" ? request.body.model : "";
    if (request.body?.stream === true) return { body: openAiSse(model) };
    return {
      body: {
        id: "chatcmpl-journey",
        object: "chat.completion",
        created: 1_760_000_000,
        model,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: UPSTREAM_REPLY },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 7, completion_tokens: 6, total_tokens: 13 },
      },
    };
  }
  return { status: 404, body: { error: { message: "not found", type: "invalid_request_error" } } };
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
  upstream = await startFakeUpstream(openAiUpstream);
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

test.describe("provider journey — Gemini client format (openai-compatible upstream)", () => {
  test("STEP 1: create an openai-compatible provider node pointed at the fake upstream", async () => {
    const response = await providerNodesRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/provider-nodes", {
        method: "POST",
        body: {
          type: "openai-compatible",
          name: CONFIGURED_NAME,
          prefix: CONFIGURED_PREFIX,
          apiType: "chat",
          baseUrl: `${upstream.origin}/v1`,
        },
      })
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 201, `create provider-node failed: ${JSON.stringify(body)}`);
    const node = body.node as { id?: string; prefix?: string };
    nodeId = node.id ?? "";
    assert.match(nodeId, /^openai-compatible-chat-/);
    assert.equal(node.prefix, CONFIGURED_PREFIX);
  });

  test("STEP 2: add a connection with the upstream credential", async () => {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: { provider: nodeId, apiKey: CONNECTION_KEY, name: "Journey Gemini Connection" },
      })
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 201, `add connection failed: ${JSON.stringify(body)}`);
    const connection = body.connection as { id?: string; provider?: string };
    connectionId = connection.id ?? "";
    assert.ok(connectionId);
    assert.equal(connection.provider, nodeId);
    // #11446: new connections start inactive until a connection test passes.
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
    assert.equal(headerValue(modelCalls[0].headers, "authorization"), `Bearer ${CONNECTION_KEY}`);

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
        body: { name: "journey-gemini-key" },
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

  test("STEP 5: Gemini generateContent is translated to an OpenAI upstream call and back", async () => {
    const before = upstream.requests.length;
    const url = `http://localhost/v1beta/models/${PUBLISHED_MODEL_ID}:generateContent`;
    const response = await v1betaGenerateRoute.POST(
      new Request(url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKeyValue },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: "You are the journey contract." }] },
          contents: [{ role: "user", parts: [{ text: "ping from the gemini journey" }] }],
          generationConfig: { maxOutputTokens: 64, temperature: 0.2 },
        }),
      }),
      {
        params: Promise.resolve({
          path: [CONFIGURED_PREFIX, `${UPSTREAM_MODEL_ID}:generateContent`],
        }),
      }
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 200, `generateContent failed: ${JSON.stringify(body)}`);

    const chatCalls = upstream.requests
      .slice(before)
      .filter((r) => r.method === "POST" && /\/chat\/completions(\?|$)/.test(r.path));
    assert.equal(chatCalls.length, 1, "exactly one upstream Chat Completions call");
    const sent = chatCalls[0];
    assert.equal(sent.path, "/v1/chat/completions");
    assert.equal(headerValue(sent.headers, "authorization"), `Bearer ${CONNECTION_KEY}`);
    assert.equal(sent.body?.model, UPSTREAM_MODEL_ID, "the prefix must be stripped upstream");
    const sentMessages = asArray<{ role?: string; content?: unknown }>(sent.body?.messages);
    const system = sentMessages.find((m) => m.role === "system");
    assert.match(JSON.stringify(system?.content), /You are the journey contract\./);
    assert.equal(sentMessages.at(-1)?.role, "user");
    assert.match(JSON.stringify(sentMessages.at(-1)?.content), /ping from the gemini journey/);
    assert.equal(sent.body?.contents, undefined, "Gemini `contents` must not leak upstream");

    // Client-side contract: a Gemini GenerateContentResponse, not an OpenAI completion.
    const candidates = asArray<{
      content?: { role?: string; parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>(body.candidates);
    assert.equal(candidates.length, 1, `expected one candidate: ${JSON.stringify(body)}`);
    assert.equal(candidates[0].content?.role, "model");
    assert.equal(candidates[0].content?.parts?.[0]?.text, UPSTREAM_REPLY);
    assert.equal(candidates[0].finishReason, "STOP");
    assert.equal(body.choices, undefined, "an OpenAI-shaped body must not leak to a Gemini client");
  });

  test("STEP 6: /v1beta/models lists the synced model for Gemini clients", async () => {
    const response = await v1betaModelsRoute.GET();
    const body = await readJsonObject(response);
    assert.equal(response.status, 200);
    const names = asArray<{ name?: string }>(body.models).map((m) => m.name ?? "");
    assert.ok(
      names.some((n) => n.endsWith(`/${UPSTREAM_MODEL_ID}`)),
      `/v1beta/models must list "${UPSTREAM_MODEL_ID}"`
    );
  });

  // Known gap, recorded as TODO so it is visible in every run without turning CI red:
  // /v1beta/models names custom-provider models `models/<raw node id>/<model>`, i.e. the
  // provider-node UUID that #8327 removed from /v1/models still leaks on the Gemini
  // catalog (src/app/api/v1beta/models/route.ts, synced-models loop).
  test(
    "STEP 7: /v1beta/models names the model under the configured prefix, never the UUID",
    { todo: "#8327 residue on the Gemini catalog surface (rail 3.8.55 Task 13 finding)" },
    async () => {
      const response = await v1betaModelsRoute.GET();
      const body = await readJsonObject(response);
      const names = asArray<{ name?: string }>(body.models).map((m) => m.name ?? "");
      assert.ok(names.includes(`models/${PUBLISHED_MODEL_ID}`), JSON.stringify(names));
      for (const name of names) {
        assert.equal(UUID_SHAPE_RE.test(name), false, `raw UUID in /v1beta/models: ${name}`);
      }
    }
  );
});
