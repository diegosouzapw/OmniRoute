import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "alias-combo-12844-"));
process.env.DATA_DIR = dataDir;
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { buildAutoCandidates, handleComboChat } = await import("../../open-sse/services/combo.ts");
const { expandPromptCacheAffinityTargets } =
  await import("../../open-sse/services/combo/promptCacheAffinity.ts");
const { expandTargetsByQuotaAwareConnections } =
  await import("../../open-sse/services/combo/quotaStrategies.ts");
const { applyRequestTagRouting } = await import("../../open-sse/services/combo/autoStrategy.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const noOpLog = { info() {}, debug() {}, warn() {}, error() {} };

// Quota is deterministic and never contacts an upstream in these routing tests.
for (const provider of ["antigravity", "agy", "gemini"])
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function seed(provider: string, name: string) {
  return createProviderConnection({
    provider,
    name,
    authType: "oauth",
    accessToken: "fixture-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { projectId: "fixture-project", tags: ["fixture"] },
  });
}
function target(provider: string, allowedConnectionIds?: string[]): ResolvedComboTarget {
  const modelStr = `${provider}/gemini-3-pro`;
  return {
    kind: "model",
    provider,
    providerId: provider,
    modelStr,
    stepId: modelStr,
    executionKey: modelStr,
    connectionId: null,
    weight: 1,
    label: null,
    allowedConnectionIds,
  };
}

for (const [stored, requested] of [
  ["agy", "antigravity"],
  ["antigravity", "agy"],
]) {
  test(`#12844 ${stored} account is visible to ${requested} direct, auto and affinity routing`, async () => {
    const connection = await seed(stored, `${stored}-only`);
    const step = target(requested, [connection.id]);
    const direct = await getProviderCredentials(requested, null, [connection.id]);
    assert.equal(direct?.connectionId, connection.id, "direct routing control already works");
    const candidates = await buildAutoCandidates([step], `alias-${stored}`);
    assert.deepEqual(
      candidates.map((entry) => entry.connectionId),
      [connection.id]
    );
    const affinity = await expandPromptCacheAffinityTargets([step]);
    assert.deepEqual(
      affinity.map((entry) => entry.connectionId),
      [connection.id]
    );
  });
}

test("#12844 quota expansion intersects aliases with step/API-key restrictions and rejects foreign pins", async () => {
  const allowed = await seed("agy", "allowed");
  const denied = await seed("antigravity", "denied");
  const foreign = await seed("gemini", "foreign");
  const result = await expandTargetsByQuotaAwareConnections(
    [target("antigravity", [allowed.id, denied.id])],
    "alias-quota",
    noOpLog,
    [allowed.id]
  );
  assert.deepEqual(
    result.expandedTargets.map((entry) => entry.connectionId),
    [allowed.id]
  );
  const wrongPin = { ...target("antigravity"), connectionId: foreign.id };
  const foreignResult = await expandTargetsByQuotaAwareConnections(
    [wrongPin, { ...target("gemini"), connectionId: foreign.id }],
    "alias-foreign-pin",
    noOpLog
  );
  assert.deepEqual(
    foreignResult.expandedTargets.map((entry) => entry.provider),
    ["gemini"]
  );
  const blocked = await getProviderCredentials("antigravity", null, [foreign.id]);
  assert.equal(blocked?.blockedByKeyPolicy, true);
});

test("#12844 alias pool deduplicates accounts and tag routing preserves the step allowlist", async () => {
  const first = await seed("agy", "first");
  const second = await seed("antigravity", "second");
  const step = target("antigravity", [first.id, second.id]);
  const candidates = await buildAutoCandidates([step], "alias-dedup");
  assert.deepEqual(
    candidates.map((entry) => entry.connectionId).sort(),
    [first.id, second.id].sort()
  );
  const tagged = await applyRequestTagRouting(
    [target("antigravity", [first.id])],
    { metadata: { tags: ["fixture"] } },
    noOpLog
  );
  assert.deepEqual(tagged[0]?.allowedConnectionIds, [first.id]);
});

test("#12844 round-robin dispatch selects an aliased account within API-key and step restrictions", async () => {
  const allowed = await seed("agy", "rr-allowed");
  await seed("antigravity", "rr-denied");
  const seen: string[] = [];
  for (let i = 0; i < 3; i++) {
    const response = await handleComboChat({
      body: { model: "alias-rr", messages: [{ role: "user", content: "hello" }] },
      combo: {
        name: "alias-rr",
        strategy: "round-robin",
        models: [
          { kind: "model", model: "antigravity/gemini-3-pro", allowedConnectionIds: [allowed.id] },
        ],
      },
      apiKeyAllowedConnections: [allowed.id],
      log: noOpLog,
      handleSingleModel: async (_body, _model, resolved) => {
        const credentials = await getProviderCredentials(
          "antigravity",
          null,
          resolved.allowedConnectionIds,
          "gemini-3-pro",
          { forcedConnectionId: resolved.connectionId }
        );
        assert.equal(credentials?.connectionId, allowed.id);
        seen.push(credentials.connectionId);
        return Response.json({ choices: [{ message: { content: "fixture" } }] });
      },
    });
    assert.equal(response.status, 200);
  }
  assert.deepEqual(seen, [allowed.id, allowed.id, allowed.id]);
});

test("#12844 sticky health sees a banned alias account and drops its pin", async () => {
  const sticky = await import("../../open-sse/services/combo/sessionStickiness.ts");
  const healthy = await seed("antigravity", "sticky-healthy");
  const banned = await seed("agy", "sticky-banned");
  await updateProviderConnection(banned.id, { testStatus: "banned" });
  const targets = [healthy, banned].map((connection) => ({
    ...target("antigravity"),
    connectionId: connection.id,
  }));
  const messages = [{ role: "user", content: "alias sticky fixture" }];
  sticky.__setStickinessHeadroomFetcherForTests(async () => ({ util5h: 0, util7d: 0 }));
  try {
    const initial = await sticky.applySessionStickiness(targets, messages, "alias-health");
    assert.ok(initial.messageHash);
    sticky.recordStickyBinding(initial.messageHash, banned.id, "alias-health");
    const result = await sticky.applySessionStickiness(targets, messages, "alias-health");
    assert.equal(result.stuck, false);
    assert.equal(result.targets[0].connectionId, healthy.id);
    assert.equal(sticky.peekStickyConnectionId(initial.messageHash), null);
  } finally {
    sticky.clearAllStickyBindings();
    sticky.__setStickinessHeadroomFetcherForTests(null);
  }
});
