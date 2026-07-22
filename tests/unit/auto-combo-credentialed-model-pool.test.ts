import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-model-pool-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerRegistry = await import("../../open-sse/config/providerRegistry.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const candidateHandler = await import("../../open-sse/handlers/autoComboCandidates.ts");

type VirtualComboResult = Awaited<ReturnType<typeof virtualFactory.createVirtualAutoCombo>>;
type LogicalCandidate = {
  providerId: string;
  model: string;
  connectionId: string | null;
  allowedConnectionIds?: string[];
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function antigravityCandidates(combo: VirtualComboResult): LogicalCandidate[] {
  return (combo.models as unknown as LogicalCandidate[]).filter(
    (candidate) => candidate.providerId === "antigravity"
  );
}

function antigravityRegistryModelIds(): string[] {
  return (providerRegistry.REGISTRY.antigravity.models ?? []).map((model) => model.id);
}

async function seedConnections(firstExcludedModels?: string[]) {
  const tokenExpiresAt = new Date(Date.now() + 60_000).toISOString();
  const first = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-one@example.com",
    accessToken: "fake-antigravity-access-token-one",
    tokenExpiresAt,
    ...(firstExcludedModels
      ? { providerSpecificData: { excludedModels: firstExcludedModels } }
      : {}),
  });
  const second = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-two@example.com",
    accessToken: "fake-antigravity-access-token-two",
    tokenExpiresAt,
  });
  return { first, second };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("credentialed providers expose one logical candidate per visible registry model", async () => {
  const { first, second } = await seedConnections();

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const candidates = antigravityCandidates(combo);
  const modelStrings = candidates.map((candidate) => candidate.model);
  const expectedModelStrings = antigravityRegistryModelIds().map(
    (modelId) => `antigravity/${modelId}`
  );
  const expectedConnectionIds = [first.id, second.id].sort();

  assert.deepEqual(
    new Set(modelStrings),
    new Set(expectedModelStrings),
    "the candidate pool must contain every current registry model exactly once"
  );

  for (const candidate of candidates) {
    assert.equal(candidate.connectionId, null, "logical candidates must not pin one account");
    assert.deepEqual(
      [...(candidate.allowedConnectionIds ?? [])].sort(),
      expectedConnectionIds,
      `${candidate.model} should share the provider's eligible account pool`
    );
  }
});

test("candidate transparency expands a logical model into per-account rows", async () => {
  const { first, second } = await seedConnections();
  const [firstModelId] = antigravityRegistryModelIds();
  assert.ok(firstModelId, "antigravity must expose at least one registry model");

  const result = await candidateHandler.getAutoComboCandidates("auto", null);
  const modelRows = result.candidates.filter(
    (candidate) =>
      candidate.provider === "antigravity" && candidate.model === `antigravity/${firstModelId}`
  );

  assert.deepEqual(
    new Set(modelRows.map((candidate) => candidate.connectionId)),
    new Set([first.id, second.id]),
    "the management view should retain one row per account fallback"
  );
});

test("connection model exclusions narrow only the selected model's account allowlist", async () => {
  const [excludedModelId, unaffectedModelId] = antigravityRegistryModelIds();
  assert.ok(excludedModelId && unaffectedModelId, "antigravity must expose at least two models");
  const { first, second } = await seedConnections([excludedModelId]);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const candidates = antigravityCandidates(combo);
  const excludedCandidate = candidates.find(
    (candidate) => candidate.model === `antigravity/${excludedModelId}`
  );
  const unaffectedCandidate = candidates.find(
    (candidate) => candidate.model === `antigravity/${unaffectedModelId}`
  );

  assert.ok(
    excludedCandidate,
    "the excluded model must remain available through the other account"
  );
  assert.deepEqual(excludedCandidate.allowedConnectionIds, [second.id]);
  assert.ok(unaffectedCandidate, "another registry model must remain in the candidate pool");
  assert.deepEqual(
    [...(unaffectedCandidate.allowedConnectionIds ?? [])].sort(),
    [first.id, second.id].sort()
  );
});

test("hiding the first registry model does not drop the credentialed provider", async () => {
  await seedConnections();
  const [hiddenModelId, ...remainingModelIds] = antigravityRegistryModelIds();
  assert.ok(
    hiddenModelId && remainingModelIds.length > 0,
    "antigravity must expose multiple models"
  );
  modelsDb.setModelIsHidden("antigravity", hiddenModelId, true);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const modelStrings = antigravityCandidates(combo).map((candidate) => candidate.model);

  assert.equal(modelStrings.includes(`antigravity/${hiddenModelId}`), false);
  for (const modelId of remainingModelIds) {
    assert.ok(
      modelStrings.includes(`antigravity/${modelId}`),
      `${modelId} should remain after ${hiddenModelId} is hidden`
    );
  }
});
