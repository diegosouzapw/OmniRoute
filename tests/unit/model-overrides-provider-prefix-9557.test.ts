import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-model-overrides-prefix-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const models = await import("../../src/lib/db/models.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const pricingRoute = await import("../../src/app/api/pricing/models/route.ts");
const overrideRoute = await import("../../src/app/api/model-capability-overrides/route.ts");
const targets = await import("../../src/lib/modelCapabilityOverrideTargets.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");
const prefixIndex = await import("../../src/lib/providerNodePrefixes.ts");
// Runtime prefix→node resolution (same path the request pipeline uses).
const sseModel = await import("../../src/sse/services/model.ts");

beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(moduleDataDir, { recursive: true });
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const NODE_ID = "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441";
const NODE_PREFIX = "vibeproxy";
const NODE_TYPE = "openai-compatible";

async function seedNodeWithSyncedModel(modelId = "gpt-4o", opts: { prefix?: string | null } = {}) {
  await nodes.createProviderNode({
    id: NODE_ID,
    type: NODE_TYPE,
    prefix: opts.prefix === undefined ? NODE_PREFIX : opts.prefix,
    name: "VibeProxy",
    apiType: "chat",
    baseUrl: "https://example.com/v1",
  });
  await models.replaceSyncedAvailableModelsForConnection(NODE_ID, NODE_ID, [
    { id: modelId, name: modelId },
  ]);
}

describe("issue #9557: model overrides expose configured provider prefix, not node UUID", () => {
  it("pricing/models returns public displayPrefix while retaining internal node id", async () => {
    await seedNodeWithSyncedModel();
    const response = await pricingRoute.GET();
    assert.equal(response.status, 200);
    const catalog = (await response.json()) as Record<
      string,
      { id: string; alias: string; displayPrefix?: string; models: Array<{ id: string }> }
    >;

    const entry = Object.values(catalog).find((provider) => provider.id === NODE_ID);
    assert.ok(entry, "compatible node must appear in the pricing catalog");
    assert.equal(entry.id, NODE_ID, "internal node id must be preserved for PricingTab");
    assert.equal(entry.displayPrefix, NODE_PREFIX, "public display prefix must be exposed");
    assert.ok(
      entry.models.some((model) => model.id === "gpt-4o"),
      "synced model must be listed under the compatible node"
    );
  });

  it("toModelOverrideTargets labels/selects with the public prefix, never the node UUID", () => {
    const catalog = {
      [NODE_ID]: {
        id: NODE_ID,
        alias: NODE_ID,
        displayPrefix: NODE_PREFIX,
        models: [{ id: "gpt-4o", name: "gpt-4o" }],
      },
      openai: {
        id: "openai",
        alias: "openai",
        models: [{ id: "gpt-4o", name: "gpt-4o" }],
      },
      // A losing/reserved compatible node explicitly marked ineligible must be
      // skipped entirely — never surfaced under a node UUID.
      "openai-compatible-chat-loser": {
        id: "openai-compatible-chat-loser",
        alias: "openai-compatible-chat-loser",
        displayPrefix: NODE_PREFIX,
        modelOverrideEligible: false,
        models: [{ id: "lost-model", name: "lost-model" }],
      },
    };
    const result = targets.toModelOverrideTargets(catalog);
    const [compatible, builtin] = result;

    assert.equal(result.length, 2, "ineligible compatible node is skipped");
    assert.equal(compatible.target, `${NODE_PREFIX}/gpt-4o`);
    assert.equal(compatible.provider, NODE_PREFIX);
    assert.equal(compatible.label, `${NODE_PREFIX}/gpt-4o`);
    assert.ok(!compatible.target.includes(NODE_ID), "public target must not leak the node UUID");
    assert.ok(!result.some((t) => t.target.includes("lost-model")), "lost node not a target");
    assert.equal(builtin.target, "openai/gpt-4o");
    assert.equal(
      targets.isModelOverrideEligible(catalog[NODE_ID]),
      true,
      "unflagged compatible winner is eligible"
    );
    assert.equal(
      targets.isModelOverrideEligible(catalog["openai-compatible-chat-loser"]),
      false,
      "explicitly ineligible node is excluded"
    );
    assert.equal(targets.isModelOverrideEligible(catalog.openai), true, "built-in is eligible");
  });

  it("PATCH canonicalizes a configured prefix to the internal node id and runtime lookup applies it", async () => {
    await seedNodeWithSyncedModel("gpt-4o");

    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_output_tokens",
          value: 123456,
        }),
      })
    );
    assert.equal(patch.status, 200);

    // Persisted under the internal node id (where runtime lookup reads it).
    const stored = overrides.listModelCapabilityOverrides();
    assert.equal(stored.length, 1);
    assert.equal(stored[0].provider, NODE_ID);
    assert.equal(stored[0].modelId, "gpt-4o");

    // Runtime capability lookup resolves provider/model and applies the override.
    const resolved = caps.getResolvedModelCapabilities({
      provider: NODE_ID,
      model: "gpt-4o",
    });
    assert.equal(resolved.maxOutputTokens, 123456);
    const explicit = caps.getExplicitModelOutputCap({ provider: NODE_ID, model: "gpt-4o" });
    assert.equal(explicit, 123456);
  });

  it("runtime getModelInfo resolves prefix/model back to the node id (routing seam)", async () => {
    await seedNodeWithSyncedModel("gpt-4o");

    const info = await sseModel.getModelInfo(`${NODE_PREFIX}/gpt-4o`);
    assert.ok(info, "getModelInfo must resolve");
    assert.equal(info.provider, NODE_ID, "prefix must route to the internal node id at runtime");
  });

  it("index winner matches runtime getModelInfo for a duplicated prefix", async () => {
    // Two nodes share the prefix. Runtime resolves the FIRST openai-compatible
    // node by id order. The prefix index must select that same winner so the
    // UI and PATCH agree with the routing seam.
    const nodeAId = NODE_ID;
    const nodeBId = "openai-compatible-chat-22222222-2222-4333-8444-555555555555";
    await nodes.createProviderNode({
      id: nodeBId,
      type: NODE_TYPE,
      prefix: NODE_PREFIX,
      name: "VibeProxy B",
      apiType: "chat",
      baseUrl: "https://example.com/b/v1",
    });
    await nodes.createProviderNode({
      id: nodeAId,
      type: NODE_TYPE,
      prefix: NODE_PREFIX,
      name: "VibeProxy A",
      apiType: "chat",
      baseUrl: "https://example.com/a/v1",
    });
    await models.replaceSyncedAvailableModelsForConnection(nodeAId, nodeAId, [
      { id: "gpt-4o", name: "gpt-4o" },
    ]);

    const info = await sseModel.getModelInfo(`${NODE_PREFIX}/gpt-4o`);
    assert.equal(info.provider, nodeAId, "runtime resolves the first node by id");

    const index = await prefixIndex.getProviderPrefixIndex();
    assert.equal(
      index.prefixToNode.get(NODE_PREFIX),
      info.provider,
      "index prefix→node must match the runtime winner"
    );
    assert.equal(index.entries.get(NODE_PREFIX)?.nodeId, info.provider);
    assert.ok(index.eligibleNodeIds.has(info.provider));
    assert.ok(!index.eligibleNodeIds.has(nodeBId));

    // And PATCH persists to the same winner runtime resolves to.
    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_input_tokens",
          value: 77777,
        }),
      })
    );
    assert.equal(patch.status, 200);
    assert.equal(overrides.listModelCapabilityOverrides()[0].provider, info.provider);
  });

  it("GET surfaces stored overrides under the public prefix and old raw rows still list/apply", async () => {
    await seedNodeWithSyncedModel("gpt-4o");

    // New-style row saved via the API (canonicalized to node id).
    await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_input_tokens",
          value: 99999,
        }),
      })
    );

    // Old raw-UUID-keyed row inserted directly (legacy pre-#9557 data).
    assert.equal(
      overrides.setModelCapabilityOverride(`${NODE_ID}/gpt-4o`, "max_output_tokens", 55555),
      true
    );

    const get = await overrideRoute.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    assert.equal(get.status, 200);
    const payload = (await get.json()) as {
      overrides: Array<{ target: string; key: string; value: number }>;
    };
    const targetsFound = payload.overrides.map((entry) => entry.target).sort();
    assert.deepEqual(targetsFound, [`${NODE_PREFIX}/gpt-4o`, `${NODE_PREFIX}/gpt-4o`]);
    assert.ok(
      payload.overrides.every((entry) => !entry.target.includes(NODE_ID)),
      "public override list must not leak the node UUID"
    );

    // Old raw row still applies at runtime.
    assert.equal(
      caps.getResolvedModelCapabilities({ provider: NODE_ID, model: "gpt-4o" }).maxOutputTokens,
      55555
    );
  });

  it("GET/PATCH/DELETE JSON responses never leak the node UUID for a prefixed node", async () => {
    await seedNodeWithSyncedModel("gpt-4o");
    await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_output_tokens",
          value: 333,
        }),
      })
    );

    const get = await overrideRoute.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    assert.ok(!(await get.text()).includes(NODE_ID), "GET body must not contain node UUID");

    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_input_tokens",
          value: 444,
        }),
      })
    );
    assert.ok(!(await patch.text()).includes(NODE_ID), "PATCH body must not contain node UUID");

    const del = await overrideRoute.DELETE(
      new Request(
        `http://localhost/api/model-capability-overrides?target=${NODE_PREFIX}/gpt-4o&key=max_output_tokens`,
        { method: "DELETE" }
      )
    );
    assert.equal(del.status, 200);
    const delBody = await del.text();
    assert.ok(!delBody.includes(NODE_ID), "DELETE body must not contain node UUID");
    // DELETE still returns the updated override list for the UI.
    const delPayload = JSON.parse(delBody) as { overrides: unknown[] };
    assert.ok(Array.isArray(delPayload.overrides), "DELETE returns { overrides }");
    assert.equal(delPayload.overrides.length, 1, "remaining override still present");
  });

  it("duplicate prefix selects the same runtime winner; losing node never falls back to UUID", async () => {
    // Two nodes share the same prefix → the runtime winner is the FIRST
    // openai-compatible node by id order. The index and PATCH must choose that
    // same winner; the losing node must NOT be targetable/displayed under the
    // prefix and must NOT fall back to a node-UUID target.
    const nodeAId = NODE_ID;
    const nodeBId = "openai-compatible-chat-11111111-2222-4333-8444-555555555555";
    await nodes.createProviderNode({
      id: nodeBId,
      type: NODE_TYPE,
      prefix: NODE_PREFIX,
      name: "VibeProxy B",
      apiType: "chat",
      baseUrl: "https://example.com/b/v1",
    });
    await nodes.createProviderNode({
      id: nodeAId,
      type: NODE_TYPE,
      prefix: NODE_PREFIX,
      name: "VibeProxy A",
      apiType: "chat",
      baseUrl: "https://example.com/a/v1",
    });
    await models.replaceSyncedAvailableModelsForConnection(nodeAId, nodeAId, [
      { id: "gpt-4o", name: "gpt-4o" },
    ]);

    const index = await prefixIndex.getProviderPrefixIndex();
    // Runtime resolves the first openai-compatible node by id order → nodeAId.
    assert.equal(index.entries.get(NODE_PREFIX)?.status, "unique");
    assert.equal(index.entries.get(NODE_PREFIX)?.nodeId, nodeAId, "winner is first by id");
    assert.equal(index.prefixToNode.get(NODE_PREFIX), nodeAId);
    assert.equal(index.nodeToPrefix.get(nodeAId), NODE_PREFIX);
    // Losing node is ineligible — no node-UUID target, no prefix→node mapping.
    assert.ok(!index.eligibleNodeIds.has(nodeBId), "losing node is ineligible");
    assert.ok(!index.prefixToNode.has(nodeBId), "losing node id must not be a prefix target");
    assert.ok(!index.nodeToPrefix.has(nodeBId), "losing node must not map to the shared prefix");

    // Catalog advertises only the winner under the public prefix.
    const catalogRes = await pricingRoute.GET();
    const catalog = (await catalogRes.json()) as Record<
      string,
      { id: string; displayPrefix?: string }
    >;
    const winner = Object.values(catalog).find((p) => p.id === nodeAId);
    assert.equal(winner?.displayPrefix, NODE_PREFIX, "winner advertised under prefix");
    assert.ok(
      !Object.values(catalog).some((p) => p.id === nodeBId && p.displayPrefix === NODE_PREFIX),
      "losing node must not be advertised under the shared prefix"
    );

    // PATCH via the prefix canonicalizes to the winner (first by id) and the
    // losing node is not targetable.
    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${NODE_PREFIX}/gpt-4o`,
          key: "max_output_tokens",
          value: 123456,
        }),
      })
    );
    assert.equal(patch.status, 200);
    const stored = overrides.listModelCapabilityOverrides();
    assert.equal(stored.length, 1);
    assert.equal(stored[0].provider, nodeAId, "PATCH must persist to the runtime winner");

    // Raw compatible-node UUIDs are not public Model Overrides targets. The
    // losing node remains routable internally, but stale/direct clients must
    // use the configured public prefix rather than create an unmanageable row.
    const losePatch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${nodeBId}/gpt-4o`,
          key: "max_input_tokens",
          value: 7,
        }),
      })
    );
    assert.equal(losePatch.status, 400);
    const loseDelete = await overrideRoute.DELETE(
      new Request(
        `http://localhost/api/model-capability-overrides?target=${encodeURIComponent(`${nodeBId}/gpt-4o`)}&key=max_input_tokens`,
        { method: "DELETE" }
      )
    );
    assert.equal(loseDelete.status, 400);
    assert.equal(overrides.listModelCapabilityOverrides().length, 1);
  });

  it("reserved prefix (cx → codex) is not advertised and not canonicalized to any node", async () => {
    const RESERVED = "cx";
    const reservedNodeId = "openai-compatible-chat-99999999-2222-4333-8444-555555555555";
    await nodes.createProviderNode({
      id: reservedNodeId,
      type: NODE_TYPE,
      prefix: RESERVED,
      name: "Reserved Hijack",
      apiType: "chat",
      baseUrl: "https://example.com/cx/v1",
    });

    const index = await prefixIndex.getProviderPrefixIndex();
    assert.equal(index.entries.get(RESERVED)?.status, "reserved");
    assert.ok(
      !index.nodeToPrefix.has(reservedNodeId),
      "reserved-prefix node must not be exposed as a compatible target"
    );
    assert.ok(!index.prefixToNode.has(RESERVED), "reserved prefix must not map to any node");

    // Catalog: reserved prefix must not surface as a displayPrefix on any entry.
    const catalogRes = await pricingRoute.GET();
    const catalog = (await catalogRes.json()) as Record<
      string,
      { displayPrefix?: string; id?: string }
    >;
    assert.ok(
      !Object.values(catalog).some((provider) => provider.displayPrefix === RESERVED),
      "reserved prefix must not be advertised as a compatible public target"
    );

    // PATCH using `cx/<model>` must route via resolveProviderAlias to the
    // built-in codex provider (runtime routes `cx/` to codex) — never 400, and
    // never persisted under the reserved-hijack node.
    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${RESERVED}/gpt-4o`,
          key: "max_output_tokens",
          value: 1,
        }),
      })
    );
    assert.equal(patch.status, 200, "PATCH must route reserved prefix via resolveProviderAlias");

    const stored = overrides.listModelCapabilityOverrides();
    assert.equal(
      stored.length,
      1,
      "reserved prefix override is persisted to the built-in provider"
    );
    assert.notEqual(stored[0].provider, reservedNodeId, "must never persist to the hijack node");
    assert.equal(stored[0].provider, "codex", "reserved prefix must resolve to built-in codex");

    const rawPatch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${reservedNodeId}/gpt-4o`,
          key: "max_input_tokens",
          value: 2,
        }),
      })
    );
    assert.equal(rawPatch.status, 400, "reserved node UUID must not be writable directly");
  });

  it("pricing-only compatible-provider model entry carries displayPrefix + pricingKey", async () => {
    // Node exists but has NO synced/custom models; pricing is keyed by the
    // public prefix and must be reconciled onto the unique node without
    // duplicating entries, while preserving the original pricing namespace.
    await nodes.createProviderNode({
      id: NODE_ID,
      type: NODE_TYPE,
      prefix: NODE_PREFIX,
      name: "VibeProxy",
      apiType: "chat",
      baseUrl: "https://example.com/v1",
    });
    const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
    // Seed a user pricing row keyed by the node's public prefix.
    await updatePricing({
      [NODE_PREFIX]: { "priced-model": { input_cost_per_million: 1, output_cost_per_million: 2 } },
    });

    const catalogRes = await pricingRoute.GET();
    const catalog = (await catalogRes.json()) as Record<
      string,
      { id: string; displayPrefix?: string; pricingKey?: string; models: Array<{ id: string }> }
    >;
    const entry = Object.values(catalog).find((provider) => provider.id === NODE_ID);
    assert.ok(entry, "pricing-only model must reconcile onto the compatible node");
    assert.equal(entry.displayPrefix, NODE_PREFIX);
    assert.equal(
      entry.pricingKey,
      NODE_PREFIX,
      "pricingKey must preserve the original pricing namespace"
    );
    assert.deepEqual(
      entry.models.map((model) => model.id),
      ["priced-model"],
      "pricing-only entry must be created without relying on synced/custom models"
    );
    // No duplicate entry keyed by the public prefix alone.
    assert.ok(
      !Object.values(catalog).some(
        (provider) => provider.id === NODE_PREFIX && provider.displayPrefix !== NODE_PREFIX
      ),
      "pricing must not create a duplicate node-keyed entry"
    );
  });

  it("no-prefix fallback and built-in providers keep raw internal id / unchanged behavior", async () => {
    // Node with no prefix → target falls back to internal node id.
    const noPrefixNodeId = "openai-compatible-chat-aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
    await nodes.createProviderNode({
      id: noPrefixNodeId,
      type: NODE_TYPE,
      prefix: null,
      name: "NoPrefix",
      apiType: "chat",
      baseUrl: "https://example.com/np/v1",
    });
    await models.replaceSyncedAvailableModelsForConnection(noPrefixNodeId, noPrefixNodeId, [
      { id: "np-model", name: "np-model" },
    ]);

    const patch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: `${noPrefixNodeId}/np-model`,
          key: "max_output_tokens",
          value: 777,
        }),
      })
    );
    assert.equal(patch.status, 400, "no-prefix compatible node UUID must not be writable");
    assert.equal(overrides.listModelCapabilityOverrides().length, 0);

    const rawDelete = await overrideRoute.DELETE(
      new Request(
        `http://localhost/api/model-capability-overrides?target=${encodeURIComponent(`${noPrefixNodeId}/np-model`)}&key=max_output_tokens`,
        { method: "DELETE" }
      )
    );
    assert.equal(rawDelete.status, 400);

    // Model-Overrides eligibility seam: a compatible node with NO public prefix
    // is skipped from the public override list — it is never surfaced under a
    // generated node UUID. Built-in / no-compatible entries remain targetable.
    const get = await overrideRoute.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    const payload = (await get.json()) as { overrides: Array<{ target: string }> };
    assert.ok(
      !payload.overrides.some((entry) => entry.target === `${noPrefixNodeId}/np-model`),
      "no-public-prefix compatible node must be skipped from the override list"
    );

    // Built-in provider (openai) unchanged.
    const openaiPatch = await overrideRoute.PATCH(
      new Request("http://localhost/api/model-capability-overrides", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target: "openai/gpt-4o",
          key: "max_input_tokens",
          value: 888,
        }),
      })
    );
    assert.equal(openaiPatch.status, 200);
    const openaiGet = await overrideRoute.GET(
      new Request("http://localhost/api/model-capability-overrides")
    );
    const openaiPayload = (await openaiGet.json()) as { overrides: Array<{ target: string }> };
    assert.ok(
      openaiPayload.overrides.some((entry) => entry.target === "openai/gpt-4o"),
      "built-in provider target must remain openai/gpt-4o"
    );
  });
});
