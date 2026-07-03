import assert from "node:assert/strict";
import test from "node:test";
import { setupSettingsFixture } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const fixture = setupSettingsFixture("issue-agent-routes");
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const settingsDb = await import("../../../src/lib/db/settings.ts");
const core = await import("../../../src/lib/db/core.ts");
const managementPassword = await import("../../../src/lib/auth/managementPassword.ts");
const runsRoute = await import("../../../src/app/api/issue-agent/runs/route.ts");
const runRoute = await import("../../../src/app/api/issue-agent/runs/[runId]/route.ts");
const runCancelRoute =
  await import("../../../src/app/api/issue-agent/runs/[runId]/cancel/route.ts");
const issueAgentRuns = await import("../../../src/lib/issueAgent/runs.ts");

async function requireAuth() {
  process.env.JWT_SECRET = "test-jwt-secret-issue-agent-routes";
  process.env.INITIAL_PASSWORD = "initial-pass-issue-agent-routes";
  await settingsDb.updateSettings({ requireLogin: true });
  await managementPassword.ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });
}

test.beforeEach(async () => {
  await fixture.resetStorage();
  issueAgentRuns.resetIssueAgentRunsForTests();
  await requireAuth();
});

test.after(() => {
  core.resetDbInstance();
  fixture.cleanup();
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("GET /api/issue-agent/runs rejects anonymous requests", async () => {
  const response = await runsRoute.GET(
    new Request("https://dashboard.example/api/issue-agent/runs", { method: "GET" })
  );
  assert.equal(response.status, 401);
});

test("POST /api/issue-agent/runs rejects invalid bodies without leaking stacks", async () => {
  const request = await makeManagementSessionRequest("http://localhost/api/issue-agent/runs", {
    method: "POST",
    body: { mode: "not-a-mode", stack: "Error: should-not-leak" },
  });
  const response = await runsRoute.POST(request);
  assert.equal(response.status, 400);
  const bodyText = await response.text();
  assert.match(bodyText, /Invalid issue-agent run request/);
  assert.doesNotMatch(bodyText, /should-not-leak|at .*\.ts|stack/i);
});

test("GET /api/issue-agent/runs/:runId returns 404 for missing runs", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/issue-agent/runs/missing",
    { method: "GET" }
  );
  const response = await runRoute.GET(request, { params: Promise.resolve({ runId: "missing" }) });
  assert.equal(response.status, 404);
});

test("POST /api/issue-agent/runs/:runId/cancel returns 404 for missing runs", async () => {
  const request = await makeManagementSessionRequest(
    "http://localhost/api/issue-agent/runs/missing/cancel",
    { method: "POST" }
  );
  const response = await runCancelRoute.POST(request, {
    params: Promise.resolve({ runId: "missing" }),
  });
  assert.equal(response.status, 404);
});
