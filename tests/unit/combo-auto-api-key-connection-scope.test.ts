import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-key-scope-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { buildAutoCandidates, expandAutoComboCandidatePool } =
  await import("../../open-sse/services/combo.ts");
const { resolveAutoStrategyOrder } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

async function seedConnection(
  provider: string,
  name: string,
  isActive = true
): Promise<{ id: string; provider: string }> {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive,
  }) as Promise<{ id: string; provider: string }>;
}

function target(provider: string, model: string, connectionId: string | null = null) {
  const modelStr = `${provider}/${model}`;
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: connectionId ? `${modelStr}@${connectionId}` : modelStr,
    modelStr,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  };
}

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

test("restricted catalog expansion uses only active allowed connections and preserves endpoint, visibility, and retirement filters", async () => {
  const openaiAllowed = await seedConnection("openai", "openai-allowed");
  const openaiAllowedSibling = await seedConnection("openai", "openai-allowed-sibling");
  const openaiDenied = await seedConnection("openai", "openai-denied");
  const anthropicAllowed = await seedConnection("anthropic", "anthropic-allowed");
  const inactiveAllowed = await seedConnection("groq", "groq-inactive", false);

  const db = core.getDbInstance();
  db.exec("DROP TRIGGER IF EXISTS trg_retire_microsoft_designer_web_provider_insert");
  db.exec("DROP TRIGGER IF EXISTS trg_retire_microsoft_designer_web_provider_update");
  const retiredAllowed = await seedConnection("microsoft-designer-web", "retired-designer-allowed");

  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", openaiAllowed.id, [
    { id: "chat-visible", name: "Chat Visible", supportedEndpoints: ["chat"] },
    { id: "embed-only", name: "Embedding Only", supportedEndpoints: ["embeddings"] },
    { id: "chat-hidden", name: "Chat Hidden", supportedEndpoints: ["chat"] },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("anthropic", anthropicAllowed.id, [
    { id: "claude-visible", name: "Claude Visible", supportedEndpoints: ["messages"] },
  ]);
  await modelsDb.addCustomModel("microsoft-designer-web", "retired-chat", "Retired Chat");
  modelsDb.setModelIsHidden("openai", "chat-hidden", true);

  const scope = [
    openaiAllowed.id,
    openaiAllowedSibling.id,
    anthropicAllowed.id,
    inactiveAllowed.id,
    retiredAllowed.id,
  ];
  const expanded = await expandAutoComboCandidatePool([], { config: {} }, scope);

  assert.ok(expanded.some((entry) => entry.modelStr === "openai/chat-visible"));
  assert.ok(expanded.some((entry) => entry.modelStr === "anthropic/claude-visible"));
  assert.equal(
    expanded.some((entry) => entry.modelStr === "openai/embed-only"),
    false
  );
  assert.equal(
    expanded.some((entry) => entry.modelStr === "openai/chat-hidden"),
    false
  );
  assert.equal(
    expanded.some((entry) => entry.provider === "microsoft-designer-web"),
    false
  );
  assert.equal(
    expanded.some((entry) => entry.provider === "groq"),
    false
  );
  assert.equal(
    expanded.some((entry) => entry.connectionId === openaiDenied.id),
    false
  );
  assert.ok(expanded.some((entry) => entry.connectionId === openaiAllowed.id));
  assert.ok(expanded.some((entry) => entry.connectionId === openaiAllowedSibling.id));
  assert.ok(expanded.length > 0);
  assert.ok(expanded.every((entry) => entry.connectionId !== null));
  assert.ok(
    expanded.every((entry) =>
      [openaiAllowed.id, openaiAllowedSibling.id, anthropicAllowed.id].includes(
        entry.connectionId as string
      )
    )
  );
});

test("null and empty API-key connection scopes preserve broad expansion exactly", async () => {
  const connection = await seedConnection("openai", "openai-broad");
  const unrestricted = await expandAutoComboCandidatePool([], { config: {} }, null);
  const emptyArray = await expandAutoComboCandidatePool([], { config: {} }, []);

  const project = (items: typeof unrestricted) =>
    items.map((entry) => ({
      modelStr: entry.modelStr,
      provider: entry.provider,
      connectionId: entry.connectionId,
      executionKey: entry.executionKey,
    }));
  assert.deepEqual(project(emptyArray), project(unrestricted));
  assert.ok(unrestricted.length > 0);
  assert.ok(unrestricted.every((entry) => entry.connectionId === null));

  const baseTarget = target("openai", "gpt-4o-mini");
  const builtWithNull = await buildAutoCandidates(
    [baseTarget],
    "broad-null",
    null,
    undefined,
    null,
    null
  );
  const builtWithEmpty = await buildAutoCandidates(
    [baseTarget],
    "broad-empty",
    null,
    undefined,
    null,
    []
  );
  const candidateIdentity = (candidate: (typeof builtWithNull)[number]) => ({
    modelStr: candidate.modelStr,
    provider: candidate.provider,
    connectionId: candidate.connectionId,
    executionKey: candidate.executionKey,
    connectionPoolSize: candidate.connectionPoolSize,
  });
  assert.deepEqual(builtWithEmpty.map(candidateIdentity), builtWithNull.map(candidateIdentity));
  assert.deepEqual(
    builtWithNull.map((candidate) => candidate.connectionId),
    [connection.id]
  );
});

test("restricted explicit pools drop forbidden pins and bind every fallback to an allowed active connection", async () => {
  const openaiAllowed = await seedConnection("openai", "openai-explicit-allowed");
  const openaiDenied = await seedConnection("openai", "openai-explicit-denied");
  const anthropicAllowed = await seedConnection("anthropic", "anthropic-explicit-allowed");

  const expanded = await expandAutoComboCandidatePool(
    [
      target("openai", "model-a"),
      target("openai", "model-b", openaiDenied.id),
      target("anthropic", "model-c"),
    ],
    { autoConfig: { candidatePool: ["openai", "anthropic"] } },
    [openaiAllowed.id, anthropicAllowed.id]
  );

  assert.deepEqual(
    new Set(expanded.map((entry) => entry.connectionId)),
    new Set([openaiAllowed.id, anthropicAllowed.id])
  );
  assert.equal(
    expanded.some((entry) => entry.connectionId === openaiDenied.id),
    false
  );
  assert.equal(
    expanded.some((entry) => entry.connectionId === null),
    false
  );
});

test("buildAutoCandidates filters before account and cache-affinity expansion", async () => {
  const openaiAllowed = await seedConnection("openai", "openai-build-allowed");
  const openaiDenied = await seedConnection("openai", "openai-build-denied");
  const anthropicAllowed = await seedConnection("anthropic", "anthropic-build-allowed");

  const candidates = await buildAutoCandidates(
    [
      target("openai", "gpt-4o-mini"),
      target("openai", "gpt-4o", openaiDenied.id),
      target("anthropic", "claude-3-5-sonnet"),
    ],
    "restricted-build",
    null,
    undefined,
    null,
    [openaiAllowed.id, anthropicAllowed.id]
  );

  assert.deepEqual(
    new Set(candidates.map((candidate) => candidate.connectionId)),
    new Set([openaiAllowed.id, anthropicAllowed.id])
  );
  assert.equal(
    candidates.some((candidate) => candidate.connectionId === openaiDenied.id),
    false
  );
  assert.equal(
    candidates.some((candidate) => !candidate.connectionId),
    false
  );
});

test("resolveAutoStrategyOrder threads the key scope and keeps the entire fallback order contained", async () => {
  const openaiAllowed = await seedConnection("openai", "openai-order-allowed");
  const openaiDenied = await seedConnection("openai", "openai-order-denied");
  const anthropicAllowed = await seedConnection("anthropic", "anthropic-order-allowed");
  const scope = [openaiAllowed.id, anthropicAllowed.id];
  let receivedScope: string[] | null | undefined;

  const result = await resolveAutoStrategyOrder({
    orderedTargets: [
      target("openai", "model-a"),
      target("openai", "model-forbidden", openaiDenied.id),
      target("anthropic", "model-b"),
    ],
    body: { messages: [{ role: "user", content: "scope every fallback" }] },
    combo: {
      id: "restricted-order",
      name: "restricted-order",
      models: [],
      autoConfig: { candidatePool: ["openai", "anthropic"], explorationRate: 0 },
    },
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: noopLog,
    apiKeyAllowedConnections: scope,
    buildAutoCandidates: async (targetsToBuild, _name, _session, _reset, _resilience, keyScope) => {
      receivedScope = keyScope;
      return targetsToBuild.map((entry) => ({
        stepId: entry.stepId,
        executionKey: entry.executionKey,
        modelStr: entry.modelStr,
        provider: entry.provider,
        model: entry.modelStr.split("/").slice(1).join("/"),
        connectionId: entry.connectionId ?? undefined,
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED" as const,
        costPer1MTokens: 1,
        p95LatencyMs: 100,
        latencyStdDev: 10,
        errorRate: 0,
      }));
    },
  });

  assert.deepEqual(receivedScope, scope);
  assert.ok("orderedTargets" in result);
  if (!("orderedTargets" in result)) return;
  assert.ok(result.orderedTargets.length >= 2);
  assert.ok(
    result.orderedTargets.every(
      (entry) => entry.connectionId !== null && scope.includes(entry.connectionId)
    )
  );
  assert.equal(
    result.orderedTargets.some((entry) => entry.connectionId === openaiDenied.id),
    false
  );
});
