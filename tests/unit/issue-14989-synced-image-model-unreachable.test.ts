/**
 * #14989 repro — a user-defined openai-compatible connection whose image model was
 * discovered via /v1/models sync (synced_available_models, populated at sync time with
 * supportedEndpoints: ["images"] for an auto-detected image model — see
 * detectModelModality() in src/lib/providerModels/modelDiscovery.ts) is advertised by
 * GET /v1/models (src/app/api/v1/models/catalog.ts reads getAllActiveSyncedModels() for
 * ANY provider node) but POST /v1/images/generations can never route to it.
 *
 * Root cause: the ONLY bridge from a synced (non-customModels) image model to the
 * POST /v1/images/generations custom-model path is
 * resolveLocalSyncedEndpointRoute() (src/lib/providerModels/syncedEndpointRouting.ts),
 * which is gated by isSelfHostedChatProvider() — a small fixed allowlist (ollama-local,
 * lm-studio, vllm, llama-cpp, ...). A user-defined `openai-compatible` provider node
 * (arbitrary operator-chosen prefix, e.g. "proxyapi") is never in that allowlist, so
 * resolveLocalSyncedEndpointRoute() returns null even though the exact synced row with
 * `supportedEndpoints: ["images"]` exists for that connection. The only other bridge,
 * the images/generations route's `getAllCustomModels()` loop, only sees models added
 * manually through the "Add Custom Model" UI (a different DB table) — never
 * auto-discovered/synced ones. So a synced-only image model on a custom
 * openai-compatible connection has NO path to POST /v1/images/generations at all,
 * despite being listed by GET /v1/models. This is a fast, DB-only reproduction that
 * avoids the full route/catalog stack (which currently hangs under devbox load — see
 * the sibling full-route repro attempt in this PR's evidence).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14989-synced-image-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { resolveLocalSyncedEndpointRoute } =
  await import("../../src/lib/providerModels/syncedEndpointRouting.ts");

const NODE_ID = "openai-compatible-chat-14989aaa-0000-4000-8000-000000000000";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedUserDefinedOpenAICompatibleImageConnection() {
  await nodesDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Proxy API",
    prefix: "proxyapi",
    apiType: "chat",
    baseUrl: "https://upstream.example.test/v1",
  });

  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    apiKey: "sk-proxyapi-test-key",
    name: "proxyapi-connection",
    isActive: true,
    testStatus: "active",
    priority: 1,
    providerSpecificData: { baseUrl: "https://upstream.example.test/v1" },
  });

  // This is exactly what a `/v1/models` sync on this connection persists for an
  // auto-detected image model (detectModelModality() -> normalizeDiscoveredModels() in
  // src/lib/providerModels/modelDiscovery.ts) -- NOT a customModels row.
  await modelsDb.replaceSyncedAvailableModelsForConnection(NODE_ID, String(connection.id), [
    {
      id: "gpt-image-1.5",
      name: "GPT Image 1.5",
      supportedEndpoints: ["images"],
      apiFormat: "images-generations",
    },
  ]);

  return connection;
}

test("control: the synced row itself carries supportedEndpoints: ['images'] for the connection", async () => {
  await resetStorage();
  await seedUserDefinedOpenAICompatibleImageConnection();

  const byConnection = await modelsDb.getSyncedAvailableModelsByConnection(NODE_ID);
  const rows = Object.values(byConnection).flat() as Array<{
    id: string;
    supportedEndpoints?: string[];
  }>;

  assert.ok(
    rows.some((m) => m.id === "gpt-image-1.5" && m.supportedEndpoints?.includes("images")),
    `expected a synced "gpt-image-1.5" row with supportedEndpoints including "images"; got: ${JSON.stringify(byConnection)}`
  );
});

test("#14989: resolveLocalSyncedEndpointRoute cannot find a synced image model on a user-defined openai-compatible connection", async () => {
  await resetStorage();
  await seedUserDefinedOpenAICompatibleImageConnection();

  // This is the exact model string the images/generations route hands to
  // resolveLocalSyncedEndpointRoute after resolveImageRouteModel() has already
  // rewritten the operator prefix "proxyapi/gpt-image-1.5" to its internal
  // "<nodeId>/<model>" form (src/lib/images/imageRouteModel.ts).
  const route = await resolveLocalSyncedEndpointRoute(`${NODE_ID}/gpt-image-1.5`, "images");

  assert.notEqual(
    route,
    null,
    "resolveLocalSyncedEndpointRoute() returned null for a synced image model that DOES " +
      "exist on this connection (confirmed by the control test above). This is the gap " +
      "behind #14989: it only recognizes the fixed isSelfHostedChatProvider() allowlist " +
      "(ollama-local, lm-studio, vllm, ...), never a user-defined `openai-compatible` " +
      "connection with an operator-chosen prefix — so POST /v1/images/generations falls " +
      'through to "Invalid image model: <internal-id>/<model>" for a model GET /v1/models ' +
      "already advertises."
  );
  assert.equal(route?.provider, NODE_ID);
  assert.equal(route?.model, "gpt-image-1.5");
});
