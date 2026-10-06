import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Three update routes merged the parsed body over the stored row, and zod 4 filled every
// omitted field with its creation default: a rename re-enabled a disabled reasoning rule,
// wiped a playground preset's params and reset a proxy's address family. A partial update
// must only change what the client sent.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-update-omitted-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const ruleRoute = await import("../../src/app/api/settings/reasoning-routing-rules/[id]/route.ts");
const presetsDb = await import("../../src/lib/db/playgroundPresets.ts");
const presetRoute = await import("../../src/app/api/playground/presets/[id]/route.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { handleProxyUpdate } = await import("../../src/lib/api/proxyRegistryRouteHandlers.ts");
const bulkImportRoute = await import("../../src/app/api/settings/proxies/bulk-import/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonRequest(method: string, body: unknown) {
  return new Request("http://localhost/api/test", {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("renaming a disabled reasoning rule keeps it disabled and keeps its settings", async () => {
  rulesDb.invalidateReasoningRoutingRuleCache();
  const rule = await rulesDb.createReasoningRoutingRule({
    name: "before",
    description: "keep me",
    scope: "global",
    sourceEffort: "any",
    requestTags: ["coding"],
    tagMatchMode: "all",
    effortMode: "inherit",
    targetKind: "keep",
    budgetAction: "preserve",
    priority: 7,
    enabled: false,
  });

  const response = await ruleRoute.PATCH(jsonRequest("PATCH", { name: "after" }), {
    params: Promise.resolve({ id: rule.id }),
  });

  assert.equal(response.status, 200);
  const stored = await rulesDb.getReasoningRoutingRuleById(rule.id);
  assert.equal(stored?.name, "after");
  assert.equal(stored?.enabled, false);
  assert.equal(stored?.priority, 7);
  assert.equal(stored?.description, "keep me");
  assert.deepEqual(stored?.requestTags, ["coding"]);
  assert.equal(stored?.tagMatchMode, "all");
});

test("renaming a playground preset keeps its params", async () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "before",
    endpoint: "chat",
    model: "m",
    system: null,
    params: { temperature: 0.2 },
  });

  const response = await presetRoute.PUT(jsonRequest("PUT", { name: "after" }), {
    params: Promise.resolve({ id: preset.id }),
  });

  assert.equal(response.status, 200);
  const body = (await response.json()) as { name: string; params: Record<string, unknown> };
  assert.equal(body.name, "after");
  assert.deepEqual(body.params, { temperature: 0.2 });
});

test("renaming a proxy keeps its address family", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "before",
    type: "http",
    host: "10.2.0.1",
    port: 8080,
    family: "ipv6",
  });

  const response = await handleProxyUpdate(jsonRequest("PATCH", { id: proxy.id, name: "after" }));

  assert.equal(response.status, 200);
  const stored = await proxiesDb.getProxyById(proxy.id);
  assert.equal(stored?.name, "after");
  assert.equal(stored?.family, "ipv6");
});

test("re-importing a proxy without a family keeps its family", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "imported",
    type: "http",
    host: "10.2.0.2",
    port: 8080,
    family: "ipv4",
  });

  const response = await bulkImportRoute.POST(
    jsonRequest("POST", { items: [{ name: "imported again", host: "10.2.0.2", port: 8080 }] })
  );

  assert.equal(response.status, 200);
  const stored = await proxiesDb.getProxyById(proxy.id);
  assert.equal(stored?.name, "imported again");
  assert.equal(stored?.family, "ipv4");
});

test("creating a proxy without a family still stores auto", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "fresh",
    type: "http",
    host: "10.2.0.3",
    port: 8080,
  });
  assert.equal((await proxiesDb.getProxyById(proxy.id))?.family, "auto");
});
