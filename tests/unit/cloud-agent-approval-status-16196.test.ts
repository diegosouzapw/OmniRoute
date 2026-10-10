import assert from "node:assert/strict";
import test from "node:test";

import { CodexCloudAgent } from "../../src/lib/cloudAgent/agents/codex.ts";
import { CursorCloudAgent } from "../../src/lib/cloudAgent/agents/cursor.ts";
import { DevinAgent } from "../../src/lib/cloudAgent/agents/devin.ts";

const credentials = { apiKey: "synthetic-cloud-approval-key-16196" };

for (const [raw, expected] of [
  ["pending approval", "awaiting_approval"],
  ["completed", "completed"],
]) {
  test(`Devin getStatus maps ${raw} to ${expected}`, async (t) => {
    const upstream = t.mock.method(globalThis, "fetch", async (input, init) => {
      assert.equal(String(input), "https://api.devin.ai/v1/sessions/task-16196");
      assert.equal(init?.method ?? "GET", "GET");
      assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${credentials.apiKey}`);
      return Response.json({ status: raw });
    });

    const result = await new DevinAgent().getStatus("task-16196", credentials);
    assert.equal(result.status, expected);
    assert.equal(result.externalId, "task-16196");
    assert.deepEqual(result.activities, []);
    assert.equal(upstream.mock.callCount(), 1);
  });
}

const params = {
  prompt: "Inspect the synthetic repository",
  source: { repoName: "test/repo", repoUrl: "https://example.invalid/test/repo", branch: "main" },
  options: { planApprovalRequired: true },
};

for (const [agent, endpoint, body] of [
  [
    new DevinAgent(),
    "https://api.devin.ai/v1/sessions",
    { prompt: params.prompt, repo_url: params.source.repoUrl, branch: "main" },
  ],
  [
    new CodexCloudAgent(),
    "https://api.openai.com/v1/codex/cloud/tasks",
    { prompt: params.prompt, repository_context: params.source.repoUrl, branch: "main" },
  ],
  [
    new CursorCloudAgent(),
    "https://api.cursor.com/v0/agents",
    { prompt: { text: params.prompt }, source: { repository: params.source.repoUrl, ref: "main" } },
  ],
] as const) {
  test(`${agent.providerId} createTask preserves the request and approval status`, async (t) => {
    const upstream = t.mock.method(globalThis, "fetch", async (input, init) => {
      assert.equal(String(input), endpoint);
      assert.equal(init?.method, "POST");
      assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${credentials.apiKey}`);
      assert.deepEqual(JSON.parse(String(init?.body)), body);
      return Response.json({ id: "created-16196", status: "queued for plan approval" });
    });
    const result = await agent.createTask(params, credentials);
    assert.equal(result.status, "awaiting_approval");
    assert.equal(result.externalId, "created-16196");
    assert.equal(result.prompt, params.prompt);
    assert.deepEqual(result.source, params.source);
    assert.deepEqual(result.options, params.options);
    assert.deepEqual(result.activities, []);
    assert.equal(upstream.mock.callCount(), 1);
  });

  test(`${agent.providerId} getStatus uses approval precedence`, async (t) => {
    const upstream = t.mock.method(globalThis, "fetch", async (input, init) => {
      assert.equal(String(input), `${endpoint}/status-16196`);
      assert.equal(init?.method ?? "GET", "GET");
      assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${credentials.apiKey}`);
      return Response.json({ status: "waiting_for_plan_approval" });
    });
    const result = await agent.getStatus("status-16196", credentials);
    assert.equal(result.status, "awaiting_approval");
    assert.equal(result.externalId, "status-16196");
    assert.equal(upstream.mock.callCount(), 1);
  });

  test(`${agent.providerId} still rejects unsupported plan approval without dispatch`, async (t) => {
    const upstream = t.mock.method(globalThis, "fetch", async () => {
      assert.fail("approvePlan must not dispatch an unsupported action");
    });
    await assert.rejects(
      agent.approvePlan("task-16196", credentials),
      /does not support plan approval|do not support plan approval/
    );
    assert.equal(upstream.mock.callCount(), 0);
  });
}

for (const [raw, expected] of [
  ["FINISHED", "completed"],
  ["EXPIRED", "failed"],
  ["PENDING", "queued"],
] as const) {
  test(`Cursor keeps its explicit ${raw} status mapping`, async (t) => {
    t.mock.method(globalThis, "fetch", async (input) => {
      assert.equal(String(input), "https://api.cursor.com/v0/agents/cursor-16196");
      return Response.json({ status: raw });
    });
    assert.equal(
      (await new CursorCloudAgent().getStatus("cursor-16196", credentials)).status,
      expected
    );
  });
}

test("Devin completed output, activities and errors retain their existing projection", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => {
    assert.equal(String(input), "https://api.devin.ai/v1/sessions/output-16196");
    return Response.json({
      status: "completed pending approval",
      output: "Synthetic summary",
      pr_url: "https://example.invalid/pr/16196",
      duration: 12,
      error: "Synthetic warning",
      messages: [{ content: "Synthetic activity", created_at: "2026-01-01T00:00:00Z" }],
    });
  });
  const result = await new DevinAgent().getStatus("output-16196", credentials);
  assert.equal(result.status, "completed");
  assert.deepEqual(result.result, {
    summary: "Synthetic summary",
    prUrl: "https://example.invalid/pr/16196",
    duration: 12,
  });
  assert.equal(result.activities.length, 1);
  assert.equal(result.activities[0].type, "message");
  assert.equal(result.activities[0].content, "Synthetic activity");
  assert.equal(result.activities[0].timestamp, "2026-01-01T00:00:00Z");
  assert.equal(result.error, "Synthetic warning");
});

test("Codex completed output and subagent activities retain their existing projection", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => {
    assert.equal(String(input), "https://api.openai.com/v1/codex/cloud/tasks/output-16196");
    return Response.json({
      status: "done waiting for approval",
      result: {
        pr_url: "https://example.invalid/pr/16196",
        commit_message: "Synthetic commit",
        summary: "Synthetic summary",
      },
      elapsed_time: 12,
      subagents: [{ name: "reviewer", status: "completed" }],
    });
  });
  const result = await new CodexCloudAgent().getStatus("output-16196", credentials);
  assert.equal(result.status, "completed");
  assert.deepEqual(result.result, {
    prUrl: "https://example.invalid/pr/16196",
    commitMessage: "Synthetic commit",
    summary: "Synthetic summary",
    duration: 12,
  });
  assert.equal(result.activities.length, 1);
  assert.equal(result.activities[0].type, "command");
  assert.equal(result.activities[0].content, "Subagent: reviewer - completed");
});

test("Devin upstream HTTP failure remains an error instead of a task status", async (t) => {
  t.mock.method(globalThis, "fetch", async (input) => {
    assert.equal(String(input), "https://api.devin.ai/v1/sessions/failed-16196");
    return new Response("Synthetic unavailable", { status: 503 });
  });
  await assert.rejects(new DevinAgent().getStatus("failed-16196", credentials), {
    message: "Devin get status failed: 503 Synthetic unavailable",
  });
});

const approvalCases = [
  ["waiting_for_plan_approval", "awaiting_approval"],
  ["queued for plan approval", "awaiting_approval"],
  ["PENDING APPROVAL", "awaiting_approval"],
  ["needs plan review", "awaiting_approval"],
  ["pending", "queued"],
  ["queued", "queued"],
  ["waiting", "queued"],
  ["unknown-state", "queued"],
  [undefined, "queued"],
  ["completed pending approval", "completed"],
  ["done waiting for approval", "completed"],
  ["failed pending approval", "failed"],
  ["error waiting for approval", "failed"],
  ["cancelled pending approval", "cancelled"],
  ["canceled waiting for approval", "cancelled"],
  ["running pending approval", "running"],
  ["active waiting for approval", "running"],
  ["executing queued plan approval", "running"],
  ["completed failed cancelled running pending approval", "completed"],
  ["failed cancelled running pending approval", "failed"],
  ["cancelled running pending approval", "cancelled"],
] as const;

for (const [raw, expected] of approvalCases) {
  test(`public status precedence: ${String(raw)} yields ${expected}`, async (t) => {
    t.mock.method(globalThis, "fetch", async (input) => {
      assert.equal(String(input), "https://api.devin.ai/v1/sessions/precedence");
      return Response.json({ status: raw });
    });
    assert.equal((await new DevinAgent().getStatus("precedence", credentials)).status, expected);
  });
}
