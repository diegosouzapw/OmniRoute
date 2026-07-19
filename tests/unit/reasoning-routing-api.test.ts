import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-reasoning-api-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const collectionRoute = await import("../../src/app/api/settings/reasoning-routing-rules/route.ts");
const itemRoute = await import("../../src/app/api/settings/reasoning-routing-rules/[id]/route.ts");
const simulateRoute =
  await import("../../src/app/api/settings/reasoning-routing-rules/simulate/route.ts");

type RuleResponse = {
  rule: rulesDb.ReasoningRoutingRule;
};

type RuleListResponse = {
  rules: rulesDb.ReasoningRoutingRule[];
};

type SimulationResponse = {
  matched: boolean;
  decision: {
    targetModel: string;
    targetEffort: string | null;
    capability: "supported" | "unsupported" | "unknown";
  };
  errors: string[];
};

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  rulesDb.invalidateReasoningRoutingRuleCache();
}

function request(pathname: string, method = "GET", body?: unknown) {
  return new Request(`http://localhost${pathname}`, {
    method,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function rulePayload() {
  return {
    name: "API rule",
    description: "Created through management API",
    scope: "global",
    sourceEffort: "missing",
    requestTags: ["coding"],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "model",
    targetModel: "custom/unknown-reasoning-model",
    budgetAction: "preserve",
    priority: 5,
    enabled: true,
  };
}

test.beforeEach(resetStorage);

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("management API CRUD validates and persists reasoning routing rules", async () => {
  const createdResponse = await collectionRoute.POST(
    request("/api/settings/reasoning-routing-rules", "POST", rulePayload())
  );
  assert.equal(createdResponse.status, 201);
  const created = (await createdResponse.json()) as RuleResponse;
  assert.equal(created.rule.name, "API rule");

  const listedResponse = await collectionRoute.GET(
    request("/api/settings/reasoning-routing-rules")
  );
  const listed = (await listedResponse.json()) as RuleListResponse;
  assert.equal(listed.rules.length, 1);

  const patchedResponse = await itemRoute.PATCH(
    request(`/api/settings/reasoning-routing-rules/${created.rule.id}`, "PATCH", {
      priority: 50,
    }),
    { params: Promise.resolve({ id: created.rule.id }) }
  );
  const patched = (await patchedResponse.json()) as RuleResponse;
  assert.equal(patched.rule.priority, 50);

  const deletedResponse = await itemRoute.DELETE(
    request(`/api/settings/reasoning-routing-rules/${created.rule.id}`, "DELETE"),
    { params: Promise.resolve({ id: created.rule.id }) }
  );
  assert.equal(deletedResponse.status, 200);
  assert.equal((await rulesDb.getReasoningRoutingRules()).length, 0);
});

test("management API rejects invalid references and invalid none/budget conflicts", async () => {
  const missingKey = await collectionRoute.POST(
    request("/api/settings/reasoning-routing-rules", "POST", {
      ...rulePayload(),
      scope: "apiKey",
      apiKeyId: "missing-api-key",
    })
  );
  assert.equal(missingKey.status, 400);

  const conflict = await collectionRoute.POST(
    request("/api/settings/reasoning-routing-rules", "POST", {
      ...rulePayload(),
      targetEffort: "none",
      budgetAction: "set",
      budgetTokens: 1024,
    })
  );
  assert.equal(conflict.status, 400);
});

test("simulator returns the same winning target and capability warning without upstream", async () => {
  await collectionRoute.POST(
    request("/api/settings/reasoning-routing-rules", "POST", rulePayload())
  );

  const response = await simulateRoute.POST(
    request("/api/settings/reasoning-routing-rules/simulate", "POST", {
      model: "openai/gpt-4o-mini",
      effort: "missing",
      requestTags: ["coding"],
      transport: "http",
    })
  );
  const body = (await response.json()) as SimulationResponse;
  assert.equal(response.status, 200);
  assert.equal(body.matched, true);
  assert.equal(body.decision.targetModel, "custom/unknown-reasoning-model");
  assert.equal(body.decision.targetEffort, "high");
  assert.equal(body.decision.capability, "unknown");
  assert.equal(body.errors.length, 0);
});
