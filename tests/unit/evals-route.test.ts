import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-evals-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

interface EvalsRoutePayload {
  suites: unknown[];
  targets: Array<{ type: string }>;
  apiKeys: Array<{ id: string; name: string; key?: string }>;
  recentRuns: Array<{ target: { key: string } }>;
  scorecard: { overallPassRate: number } | null;
}

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const evalsRoute = await import("../../src/app/api/evals/route.ts");
const evalSuitesRoute = await import("../../src/app/api/evals/suites/route.ts");
const evalSuiteByIdRoute = await import("../../src/app/api/evals/suites/[suiteId]/route.ts");

function resetDb() {
  core.resetDbInstance();
  localDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  localDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("evals GET returns suites, target options, api key metadata, and persisted history", async () => {
  const apiKey = await localDb.createApiKey("Dashboard Key", "machine-test");
  const customSuite = localDb.saveCustomEvalSuite({
    name: "Support Regression",
    description: "Checks support answers",
    cases: [
      {
        name: "Refund policy",
        model: "gpt-4o-mini",
        input: {
          messages: [{ role: "user", content: "Explain the refund policy" }],
        },
        expected: {
          strategy: "contains",
          value: "refund",
        },
        tags: ["support"],
      },
    ],
  });
  localDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "combo", id: "cost-optimized", label: "Combo: cost-optimized" },
    apiKeyId: apiKey.id,
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 180,
    results: [],
    createdAt: "2026-04-23T12:00:00.000Z",
  });

  const response = await evalsRoute.GET(new Request("http://localhost/api/evals"));
  assert.equal(response.status, 200);

  const payload = (await response.json()) as EvalsRoutePayload;
  assert.ok(Array.isArray(payload.suites));
  assert.ok(Array.isArray(payload.targets));
  assert.ok(Array.isArray(payload.apiKeys));
  assert.ok(Array.isArray(payload.recentRuns));
  assert.equal(payload.apiKeys[0].id, apiKey.id);
  assert.equal(payload.apiKeys[0].name, "Dashboard Key");
  assert.equal(payload.apiKeys[0].key, undefined);
  assert.equal(payload.recentRuns[0].target.key, "combo:cost-optimized");
  assert.equal(
    payload.suites.some(
      (entry: { id?: string; source?: string; cases?: unknown[] }) =>
        entry.id === customSuite.id && entry.source === "custom" && entry.cases?.length === 1
    ),
    true
  );
  assert.equal(
    payload.targets.some((entry) => entry.type === "suite-default"),
    true
  );
});

test("evals GET exposes stored runs and aggregated pass rate inline", async () => {
  localDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden Set",
    target: { type: "model", id: "gpt-4o", label: "Model: gpt-4o" },
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    avgLatencyMs: 120,
    results: [],
    createdAt: "2026-04-23T12:00:00.000Z",
  });

  const response = await evalsRoute.GET(new Request("http://localhost/api/evals"));
  assert.equal(response.status, 200);

  const payload = (await response.json()) as EvalsRoutePayload;
  assert.ok(payload.scorecard);
  assert.equal(payload.scorecard.overallPassRate, 100);
  assert.equal(Array.isArray(payload.recentRuns), true);
  assert.equal(payload.recentRuns.length, 1);
});

test("eval suite routes create, update, fetch, and delete custom suites", async () => {
  const createResponse = await evalSuitesRoute.POST(
    new Request("http://localhost/api/evals/suites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Support Regression",
        description: "Checks support responses",
        cases: [
          {
            name: "Refund policy",
            model: "gpt-4o-mini",
            input: {
              messages: [{ role: "user", content: "Explain the refund policy" }],
            },
            expected: {
              strategy: "contains",
              value: "refund",
            },
            tags: ["support"],
          },
        ],
      }),
    })
  );

  assert.equal(createResponse.status, 201);
  const createPayload = (await createResponse.json()) as { suite: { id: string; source: string } };
  assert.equal(createPayload.suite.source, "custom");
  const suiteId = createPayload.suite.id;

  const getResponse = await evalSuiteByIdRoute.GET(
    new Request(`http://localhost/api/evals/suites/${suiteId}`),
    { params: Promise.resolve({ suiteId }) }
  );
  assert.equal(getResponse.status, 200);

  const updateResponse = await evalSuiteByIdRoute.PUT(
    new Request(`http://localhost/api/evals/suites/${suiteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Support Regression v2",
        description: "Checks refund and escalation responses",
        cases: [
          {
            name: "Refund policy",
            model: "gpt-4o-mini",
            input: {
              messages: [{ role: "user", content: "Explain the refund policy" }],
            },
            expected: {
              strategy: "contains",
              value: "refund",
            },
            tags: ["support"],
          },
          {
            name: "Escalation path",
            model: "gpt-4o-mini",
            input: {
              messages: [{ role: "user", content: "How do I escalate a billing issue?" }],
            },
            expected: {
              strategy: "regex",
              value: "support|billing",
            },
            tags: ["billing"],
          },
        ],
      }),
    }),
    { params: Promise.resolve({ suiteId }) }
  );

  assert.equal(updateResponse.status, 200);
  const updatePayload = (await updateResponse.json()) as {
    suite: { id: string; name: string; cases: unknown[] };
  };
  assert.equal(updatePayload.suite.id, suiteId);
  assert.equal(updatePayload.suite.name, "Support Regression v2");
  assert.equal(updatePayload.suite.cases.length, 2);

  const deleteResponse = await evalSuiteByIdRoute.DELETE(
    new Request(`http://localhost/api/evals/suites/${suiteId}`, { method: "DELETE" }),
    { params: Promise.resolve({ suiteId }) }
  );
  assert.equal(deleteResponse.status, 200);

  const missingResponse = await evalSuiteByIdRoute.GET(
    new Request(`http://localhost/api/evals/suites/${suiteId}`),
    { params: Promise.resolve({ suiteId }) }
  );
  assert.equal(missingResponse.status, 404);
});
