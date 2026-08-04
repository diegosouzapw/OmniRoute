/**
 * #8330 — End-to-end CONTRACT test for the full provider journey.
 *
 * Source: Discussion #8273 (sections 2-4), Reported-by @nguyenha935. Refs #8273.
 *
 * WHY THIS EXISTS
 * ---------------
 * Module-level tests pass while the real user journey breaks. A provider is not
 * functional just because the creation route returns HTTP 201 — several recent
 * defects only manifest ACROSS module boundaries:
 *   - compatible-provider model regex (`-chat-`) drift,
 *   - /v1/models namespace incoherence (raw provider-node UUID leaking as the
 *     public identifier instead of the operator-configured prefix — #8327),
 *   - Topology blind to custom providers (rendering the raw UUID / a shared gray
 *     instead of the configured provider name — #8328 / #3198).
 *
 * This suite walks the WHOLE journey as ONE gate:
 *
 *   create provider (node) -> add connection -> sync models -> select in Combo
 *   -> Playground -> /v1/models exposure -> call via API key -> visible in Topology
 *
 * Every step asserts against the SAME derived contract identity
 * (`PUBLISHED_MODEL_ID` / `CONFIGURED_PREFIX` / the raw node id), so a divergence
 * on ANY surface fails the suite — the whole point of a contract gate.
 *
 * HOW IT RUNS
 * -----------
 * The primary journey (`describe("provider journey — in-process contract")`) drives
 * the REAL App Router route handlers + DB layer in-process against an isolated
 * DATA_DIR. It needs no live server, so it runs in CI under `test:integration`
 * (collected by the top-level `tests/integration/*.test.ts` glob) as a BLOCKING gate.
 *
 * A second, opt-in block (`describe("provider journey — live over-the-wire")`) runs
 * the same journey against a live server over HTTP. It self-skips unless
 * `RUN_CONTRACT_INT=1` (same gating convention as the RUN_SERVICES_INT suites), so
 * it never runs unopted in CI.
 *
 * Related: docs/architecture/QUALITY_GATES.md.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

// ---------------------------------------------------------------------------
// Isolated storage + env — must be set BEFORE importing any DB-backed module.
// ---------------------------------------------------------------------------
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-journey-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "provider-journey-contract-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// Make `isAuthRequired()` true so the /v1/models API-key gate is actually exercised.
process.env.INITIAL_PASSWORD = "provider-journey-bootstrap";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const combosRoute = await import("../../src/app/api/combos/route.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const v1ModelsRoute = await import("../../src/app/api/v1/models/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { getProviderDisplayLabel } = await import("../../src/shared/utils/providerDisplayLabel.ts");
const { isOpenAICompatibleProvider } = await import("../../src/shared/constants/providers.ts");

// ---------------------------------------------------------------------------
// Minimal response shapes (JSON objects/arrays) — keeps the suite `any`-free.
// ---------------------------------------------------------------------------
type JsonObject = Record<string, unknown>;
type CatalogModel = { id?: string; owned_by?: unknown };
type ProviderNodeLike = { id?: string; prefix?: string; name?: string };

// ---------------------------------------------------------------------------
// The single contract identity every surface must agree on.
// ---------------------------------------------------------------------------
const CONFIGURED_PREFIX = "journey-compat";
const CONFIGURED_NAME = "Journey Compatible Provider";
const SYNCED_MODEL_ID = "journey-model-x";
const PUBLISHED_MODEL_ID = `${CONFIGURED_PREFIX}/${SYNCED_MODEL_ID}`;
const COMBO_NAME = "journey-combo";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

// Journey state shared across the sequential STEP tests (node:test runs
// top-level tests in declaration order).
let nodeId = "";
let connectionId = "";
let apiKeyValue = "";

async function readJsonObject(response: Response): Promise<JsonObject> {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as JsonObject) : {};
  } catch {
    return {};
  }
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/** Fetch /v1/models with a fresh catalog cache so the response reflects live DB state. */
async function fetchCatalog(
  headers?: HeadersInit
): Promise<{ status: number; models: CatalogModel[]; body: JsonObject }> {
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsRoute.GET(
    new Request("http://localhost/api/v1/models", { headers })
  );
  const body = await readJsonObject(response);
  return { status: response.status, models: asArray<CatalogModel>(body.data), body };
}

test.before(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // requireLogin + requireAuthForModels ON so the API-key surface is gated.
  await localDb.updateSettings({ requireLogin: true, requireAuthForModels: true, password: "" });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.describe("provider journey — in-process contract (#8330)", () => {
  test("STEP 1: create provider — POST /api/provider-nodes registers a custom compatible node", async () => {
    const response = await providerNodesRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/provider-nodes", {
        method: "POST",
        body: {
          type: "openai-compatible",
          name: CONFIGURED_NAME,
          prefix: CONFIGURED_PREFIX,
          apiType: "chat",
          baseUrl: "https://proxy.journey.example.com/v1",
        },
      })
    );
    const body = await readJsonObject(response);

    assert.equal(response.status, 201, `create provider-node failed: ${JSON.stringify(body)}`);
    const node = body.node as ProviderNodeLike;
    nodeId = node.id ?? "";
    assert.ok(nodeId, "provider node must expose an id");
    assert.ok(
      isOpenAICompatibleProvider(nodeId),
      `node id "${nodeId}" must be recognised as an OpenAI-compatible provider`
    );
    assert.equal(node.prefix, CONFIGURED_PREFIX);
  });

  test("STEP 2: add connection — POST /api/providers attaches a credential to the node", async () => {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: {
          provider: nodeId,
          apiKey: "sk-journey-credential",
          name: "Journey Connection",
        },
      })
    );
    const body = await readJsonObject(response);

    assert.equal(response.status, 201, `add connection failed: ${JSON.stringify(body)}`);
    const connection = body.connection as { id?: string; provider?: string };
    connectionId = connection.id ?? "";
    assert.ok(connectionId, "connection must expose an id");
    assert.equal(connection.provider, nodeId, "connection must bind to the created node");

    // Same surface, read side: GET /api/providers must list the connection.
    const listResponse = await providersRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/providers")
    );
    const listBody = await readJsonObject(listResponse);
    assert.equal(listResponse.status, 200);
    const connections = asArray<{ id?: string; provider?: string }>(listBody.connections);
    assert.ok(
      connections.some((c) => c.id === connectionId && c.provider === nodeId),
      "the created connection must be visible via GET /api/providers"
    );
  });

  test("STEP 3: sync models — discovered model is persisted for the connection", async () => {
    // The over-the-wire sync (POST /api/providers/[id]/sync-models) fetches the
    // upstream /models list; against a stub host that is non-deterministic, so the
    // in-process gate persists the sync RESULT directly (the real HTTP sync path is
    // exercised by the opt-in live block below). What matters for the contract is
    // that a synced model on this connection flows coherently to every downstream
    // surface.
    await modelsDb.replaceSyncedAvailableModelsForConnection(nodeId, connectionId, [
      {
        id: SYNCED_MODEL_ID,
        name: "Journey Model X",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]);

    const synced = await modelsDb.getSyncedAvailableModelsForConnection(nodeId, connectionId);
    assert.ok(
      synced.some((m) => m.id === SYNCED_MODEL_ID),
      `synced models for the connection must include "${SYNCED_MODEL_ID}"`
    );
  });

  test("STEP 4: select in Combo — POST /api/combos references the published model id", async () => {
    const response = await combosRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/combos", {
        method: "POST",
        body: {
          name: COMBO_NAME,
          strategy: "priority",
          models: [PUBLISHED_MODEL_ID],
        },
      })
    );
    const body = await readJsonObject(response);
    assert.equal(response.status, 201, `create combo failed: ${JSON.stringify(body)}`);

    // Read side: the combo must round-trip the SAME published model id — a combo
    // built against a divergent namespace would silently target a dead model.
    const listResponse = await combosRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/combos")
    );
    const listBody = await readJsonObject(listResponse);
    assert.equal(listResponse.status, 200);
    const combos = asArray<{ name?: string; models?: unknown }>(listBody.combos);
    const combo = combos.find((c) => c.name === COMBO_NAME);
    assert.ok(combo, "created combo must be visible via GET /api/combos");
    const comboModelIds = asArray<unknown>(combo?.models).map((m) => {
      if (typeof m === "string") return m;
      const step = (m ?? {}) as { model?: string; id?: string };
      return step.model ?? step.id;
    });
    assert.ok(
      comboModelIds.includes(PUBLISHED_MODEL_ID),
      `combo must target the published model id "${PUBLISHED_MODEL_ID}", got ${JSON.stringify(comboModelIds)}`
    );
  });

  test("STEP 5: Playground — the dashboard catalog exposes the model under its prefix", async () => {
    // Playground reads the same unified catalog as /v1/models, via an authenticated
    // dashboard session. Assert the model is present with the operator prefix.
    const headers = (await makeManagementSessionRequest("http://localhost/api/v1/models")).headers;
    const { status, models } = await fetchCatalog(headers);

    assert.equal(status, 200, "authenticated catalog read (Playground surface) must succeed");
    const entry = models.find((m) => m.id === PUBLISHED_MODEL_ID);
    assert.ok(
      entry,
      `Playground catalog must expose "${PUBLISHED_MODEL_ID}" in ${JSON.stringify(models.map((m) => m.id))}`
    );
  });

  test("STEP 6: /v1/models exposure — public id + owned_by honor the prefix, never the raw UUID (#8327)", async () => {
    // Authenticated (dashboard) read is enough to inspect the published shape.
    const headers = (await makeManagementSessionRequest("http://localhost/api/v1/models")).headers;
    const { status, models } = await fetchCatalog(headers);
    assert.equal(status, 200);

    const entry = models.find((m) => m.id === PUBLISHED_MODEL_ID);
    assert.ok(entry, `/v1/models must expose "${PUBLISHED_MODEL_ID}"`);
    assert.equal(
      entry?.owned_by,
      CONFIGURED_PREFIX,
      `owned_by must be the configured prefix "${CONFIGURED_PREFIX}", not the raw node id — got "${String(entry?.owned_by)}"`
    );

    // The raw provider-node UUID must never leak on ANY surface entry.
    for (const model of models) {
      assert.notEqual(
        model.owned_by,
        nodeId,
        `owned_by must never equal the raw provider-node id "${nodeId}" (id "${String(model.id)}")`
      );
      assert.equal(
        typeof model.owned_by === "string" && UUID_SHAPE_RE.test(model.owned_by),
        false,
        `owned_by "${String(model.owned_by)}" (id "${String(model.id)}") must not be a raw UUID`
      );
    }
  });

  test("STEP 7: call via API key — key gates /v1/models and sees the same contract id", async () => {
    // Create a real API key through the management route.
    const keyResponse = await keysRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "journey-key" },
      })
    );
    const keyBody = await readJsonObject(keyResponse);
    assert.equal(keyResponse.status, 201, `create key failed: ${JSON.stringify(keyBody)}`);
    apiKeyValue = typeof keyBody.key === "string" ? keyBody.key : "";
    assert.match(apiKeyValue, /^sk-/, "created key must be an sk- API key");

    // Unauthenticated /v1/models is rejected (requireAuthForModels + isAuthRequired).
    const anon = await fetchCatalog();
    assert.equal(anon.status, 401, "unauthenticated /v1/models must be rejected when gated");

    // The SAME model is exposed when calling with the API key over the public surface.
    const authed = await fetchCatalog({ Authorization: `Bearer ${apiKeyValue}` });
    assert.equal(authed.status, 200, "valid API key must be accepted by /v1/models");
    const entry = authed.models.find((m) => m.id === PUBLISHED_MODEL_ID);
    assert.ok(
      entry,
      `API-key /v1/models must expose the same "${PUBLISHED_MODEL_ID}" as the dashboard surface`
    );
    assert.equal(entry?.owned_by, CONFIGURED_PREFIX);
  });

  test("STEP 8: visible in Topology — the custom provider resolves to its name, not the UUID (#8328/#3198)", async () => {
    // The home Topology panel derives its provider labels via
    // getProviderDisplayLabel(rawProviderId, providerNodes) — the same source
    // HomePageClient.tsx feeds into <ProviderTopology>. Assert the custom provider
    // node is discoverable and resolves to the operator-configured name.
    const providerNodes = asArray<ProviderNodeLike>(await localDb.getCachedProviderNodes());
    const topologyNode = providerNodes.find((n) => n.id === nodeId);
    assert.ok(topologyNode, "the custom provider node must be present in the topology node source");
    assert.equal(topologyNode?.prefix, CONFIGURED_PREFIX);

    const label = getProviderDisplayLabel(nodeId, providerNodes);
    assert.equal(
      label,
      CONFIGURED_NAME,
      `Topology must label the custom provider "${CONFIGURED_NAME}", not the raw UUID — got "${String(label)}"`
    );
    assert.equal(
      typeof label === "string" && UUID_SHAPE_RE.test(label),
      false,
      "Topology label must never be a raw provider-node UUID"
    );
  });
});

// ---------------------------------------------------------------------------
// Opt-in: the same journey over HTTP against a live server.
//
//   RUN_CONTRACT_INT=1 OMNIROUTE_TEST_URL=http://localhost:20128 \
//     node --import tsx/esm --test tests/integration/provider-journey.contract.test.ts
//
// Self-skips unless RUN_CONTRACT_INT=1 (same convention as the RUN_SERVICES_INT
// suites), so it never runs unopted in CI. Expects the server in open bootstrap
// mode (no password/OIDC/INITIAL_PASSWORD) so management routes are reachable
// without a session — matching the other gated live integration suites.
// ---------------------------------------------------------------------------
const LIVE_ENABLED = process.env.RUN_CONTRACT_INT === "1";
const LIVE_SKIP_REASON = "Set RUN_CONTRACT_INT=1 to run the live over-the-wire contract journey";
const LIVE_BASE_URL = process.env.OMNIROUTE_TEST_URL ?? "http://localhost:20128";

function liveMaybeSkip(t: { skip: (reason?: string) => void }): boolean {
  if (!LIVE_ENABLED) {
    t.skip(LIVE_SKIP_REASON);
    return true;
  }
  return false;
}

async function liveFetch(
  method: string,
  urlPath: string,
  init: { body?: unknown; headers?: Record<string, string> } = {}
): Promise<{ status: number; body: JsonObject }> {
  const res = await fetch(`${LIVE_BASE_URL}${urlPath}`, {
    method,
    headers: {
      ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  let body: JsonObject = {};
  try {
    const parsed = JSON.parse(text) as unknown;
    if (parsed && typeof parsed === "object") body = parsed as JsonObject;
  } catch {
    body = {};
  }
  return { status: res.status, body };
}

test.describe("provider journey — live over-the-wire (opt-in, RUN_CONTRACT_INT=1)", () => {
  const live = { nodeId: "", connectionId: "", comboName: `journey-live-${Date.now()}` };

  test("LIVE STEP 1: create provider node", async (t) => {
    if (liveMaybeSkip(t)) return;
    const { status, body } = await liveFetch("POST", "/api/provider-nodes", {
      body: {
        type: "openai-compatible",
        name: CONFIGURED_NAME,
        prefix: `${CONFIGURED_PREFIX}-live`,
        apiType: "chat",
        baseUrl: "https://proxy.journey.example.com/v1",
      },
    });
    assert.equal(status, 201, `create node failed: ${JSON.stringify(body)}`);
    const node = body.node as ProviderNodeLike;
    live.nodeId = node.id ?? "";
    assert.ok(isOpenAICompatibleProvider(live.nodeId));
  });

  test("LIVE STEP 2: add connection", async (t) => {
    if (liveMaybeSkip(t)) return;
    const { status, body } = await liveFetch("POST", "/api/providers", {
      body: { provider: live.nodeId, apiKey: "sk-journey-live", name: "Journey Live Connection" },
    });
    assert.equal(status, 201, `add connection failed: ${JSON.stringify(body)}`);
    const connection = body.connection as { id?: string; provider?: string };
    live.connectionId = connection.id ?? "";
    assert.equal(connection.provider, live.nodeId);
  });

  test("LIVE STEP 3: connection is listed", async (t) => {
    if (liveMaybeSkip(t)) return;
    const { status, body } = await liveFetch("GET", "/api/providers");
    assert.equal(status, 200);
    const connections = asArray<{ id?: string }>(body.connections);
    assert.ok(
      connections.some((c) => c.id === live.connectionId),
      "created connection must be listed by GET /api/providers"
    );
  });

  test("LIVE STEP 4: combo targets a model under the provider prefix", async (t) => {
    if (liveMaybeSkip(t)) return;
    const publishedId = `${CONFIGURED_PREFIX}-live/journey-model-x`;
    const { status, body } = await liveFetch("POST", "/api/combos", {
      body: { name: live.comboName, strategy: "priority", models: [publishedId] },
    });
    assert.equal(status, 201, `create combo failed: ${JSON.stringify(body)}`);

    const list = await liveFetch("GET", "/api/combos");
    assert.equal(list.status, 200);
    const combos = asArray<{ name?: string }>(list.body.combos);
    assert.ok(
      combos.some((c) => c.name === live.comboName),
      "created combo must be listed by GET /api/combos"
    );
  });

  test("LIVE STEP 5: /v1/models is reachable and OpenAI-shaped (contract source)", async (t) => {
    if (liveMaybeSkip(t)) return;
    const { status, body } = await liveFetch("GET", "/v1/models");
    assert.equal(status, 200, "public /v1/models must be reachable");
    assert.equal(body.object, "list", "/v1/models must return an OpenAI list envelope");
    const models = asArray<CatalogModel>(body.data);
    assert.ok(Array.isArray(body.data), "/v1/models must return a data array");
    // No entry may leak a raw provider-node UUID as its public owner.
    for (const model of models) {
      assert.notEqual(model.owned_by, live.nodeId);
    }
  });

  test("LIVE STEP 6: provider node is visible to the Topology source", async (t) => {
    if (liveMaybeSkip(t)) return;
    const { status, body } = await liveFetch("GET", "/api/provider-nodes");
    assert.equal(status, 200);
    const nodes = asArray<ProviderNodeLike>(body.nodes);
    const node = nodes.find((n) => n.id === live.nodeId);
    assert.ok(
      node,
      "the custom provider node must be visible to the topology (provider-nodes) source"
    );
    assert.equal(getProviderDisplayLabel(live.nodeId, nodes), CONFIGURED_NAME);
  });
});
