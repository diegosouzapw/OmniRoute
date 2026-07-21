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
  const expectedConnectionIds = [first.id, second.id].sort();

  assert.equal(
    new Set(modelStrings).size,
    modelStrings.length,
    "provider/model candidates must not be duplicated per connection"
  );
  for (const model of [
    "antigravity/claude-sonnet-5",
    "antigravity/gemini-3.5-flash-low",
    "antigravity/gemini-3.5-flash-medium",
    "antigravity/gemini-3.5-flash-high",
  ]) {
    assert.ok(modelStrings.includes(model), `${model} should be eligible for auto routing`);
  }

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

  const result = await candidateHandler.getAutoComboCandidates("auto", null);
  const sonnetRows = result.candidates.filter(
    (candidate) =>
      candidate.provider === "antigravity" && candidate.model === "antigravity/claude-sonnet-5"
  );

  assert.deepEqual(
    new Set(sonnetRows.map((candidate) => candidate.connectionId)),
    new Set([first.id, second.id]),
    "the management view should retain one row per account fallback"
  );
});

test("connection model exclusions narrow only that model's account allowlist", async () => {
  const { first, second } = await seedConnections(["gemini-3.5-*"]);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const candidates = antigravityCandidates(combo);
  const geminiCandidates = candidates.filter((candidate) =>
    candidate.model.startsWith("antigravity/gemini-3.5-")
  );

  assert.ok(geminiCandidates.length >= 3, "Gemini 3.5 candidates should remain available");
  for (const candidate of geminiCandidates) {
    assert.deepEqual(candidate.allowedConnectionIds, [second.id]);
  }

  const sonnet = candidates.find((candidate) => candidate.model === "antigravity/claude-sonnet-5");
  assert.ok(sonnet, "Claude Sonnet 5 should remain in the candidate pool");
  assert.deepEqual([...(sonnet.allowedConnectionIds ?? [])].sort(), [first.id, second.id].sort());
});

test("hiding the first registry model does not drop the credentialed provider", async () => {
  await seedConnections();
  modelsDb.setModelIsHidden("antigravity", "claude-sonnet-5", true);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const modelStrings = antigravityCandidates(combo).map((candidate) => candidate.model);

  assert.equal(modelStrings.includes("antigravity/claude-sonnet-5"), false);
  for (const model of [
    "antigravity/gemini-3.5-flash-low",
    "antigravity/gemini-3.5-flash-medium",
    "antigravity/gemini-3.5-flash-high",
  ]) {
    assert.ok(modelStrings.includes(model), `${model} should remain after Sonnet is hidden`);
  }
});
