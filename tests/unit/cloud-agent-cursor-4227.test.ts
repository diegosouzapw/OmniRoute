/**
 * #4227 — Cursor Cloud Agent (REST adapter).
 *
 * Validates the adapter mapping between Cursor's Background/Cloud Agents REST API and
 * OmniRoute's CloudAgentBase contract (status mapping, request shape, result extraction)
 * with a mocked fetch. NOTE: this proves the adapter's internal mapping, NOT the live
 * Cursor API shapes — those need a live validation run with a real Cursor API key before
 * merge (Rule #18, external-API integration; see the PR description).
 */
import test from "node:test";
import assert from "node:assert/strict";

const cursorMod = await import("../../src/lib/cloudAgent/agents/cursor.ts");
const registry = await import("../../src/lib/cloudAgent/registry.ts");

const CREDS = { apiKey: "key_test_123" };
const SOURCE = { repoName: "org/repo", repoUrl: "https://github.com/org/repo", branch: "main" };
const OPTIONS = { autoCreatePr: true };

function mockFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  const original = globalThis.fetch;
  // @ts-expect-error test shim
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) =>
    handler(String(url), init);
  return () => {
    globalThis.fetch = original;
  };
}

test("#4227 registry exposes cursor-cloud as a cloud-agent provider", () => {
  assert.equal(registry.isCloudAgentProvider("cursor-cloud"), true);
  const agent = registry.getAgent("cursor-cloud");
  assert.ok(agent, "getAgent('cursor-cloud') returns an instance");
  assert.equal(agent?.providerId, "cursor-cloud");
  assert.ok(registry.getAvailableAgents().includes("cursor-cloud"));
});

test("#4227 createTask posts the prompt+repo and maps CREATING → queued", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  let captured: { url: string; body: any } | null = null;
  const restore = mockFetch((url, init) => {
    captured = { url, body: init?.body ? JSON.parse(String(init.body)) : null };
    return Response.json({ id: "bc-abc123", status: "CREATING", name: "agent-1" });
  });
  try {
    const task = await agent.createTask({ prompt: "fix the bug", source: SOURCE, options: OPTIONS }, CREDS);
    assert.equal(task.providerId, "cursor-cloud");
    assert.equal(task.externalId, "bc-abc123");
    assert.equal(task.status, "queued");
    assert.equal(task.prompt, "fix the bug");
    // request shape
    assert.ok(captured, "fetch was called");
    assert.match(captured!.url, /\/agents$/);
    assert.equal(captured!.body.prompt.text, "fix the bug");
    assert.equal(captured!.body.source.repository, "https://github.com/org/repo");
    assert.equal(captured!.body.source.ref, "main");
    assert.equal(captured!.body.autoCreatePr, true);
  } finally {
    restore();
  }
});

test("#4227 createTask surfaces an upstream error instead of swallowing it", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  const restore = mockFetch(() => new Response("nope", { status: 401 }));
  try {
    await assert.rejects(
      agent.createTask({ prompt: "x", source: SOURCE, options: {} }, CREDS),
      /Cursor create agent failed: 401/
    );
  } finally {
    restore();
  }
});

test("#4227 getStatus maps FINISHED → completed and extracts the PR url + conversation", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  const restore = mockFetch(() =>
    Response.json({
      id: "bc-abc123",
      status: "FINISHED",
      target: { prUrl: "https://github.com/org/repo/pull/7", branchName: "cursor/fix" },
      summary: "Fixed it",
      conversation: [{ type: "assistant_message", text: "done", createdAt: "2026-06-19T00:00:00Z" }],
    })
  );
  try {
    const result = await agent.getStatus("bc-abc123", CREDS);
    assert.equal(result.status, "completed");
    assert.equal(result.result?.prUrl, "https://github.com/org/repo/pull/7");
    assert.equal(result.result?.summary, "Fixed it");
    assert.equal(result.activities.length, 1);
    assert.equal(result.activities[0].content, "done");
  } finally {
    restore();
  }
});

test("#4227 getStatus maps Cursor enums (RUNNING→running, ERROR→failed)", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  let restore = mockFetch(() => Response.json({ status: "RUNNING" }));
  try {
    assert.equal((await agent.getStatus("id", CREDS)).status, "running");
  } finally {
    restore();
  }
  restore = mockFetch(() => Response.json({ status: "ERROR", error: "boom" }));
  try {
    const r = await agent.getStatus("id", CREDS);
    assert.equal(r.status, "failed");
    assert.equal(r.error, "boom");
  } finally {
    restore();
  }
});

test("#4227 sendMessage posts a followup; approvePlan is unsupported", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  let captured: { url: string; body: any } | null = null;
  const restore = mockFetch((url, init) => {
    captured = { url, body: init?.body ? JSON.parse(String(init.body)) : null };
    return Response.json({ ok: true });
  });
  try {
    const activity = await agent.sendMessage("bc-1", "also add tests", CREDS);
    assert.equal(activity.type, "message");
    assert.equal(activity.content, "also add tests");
    assert.match(captured!.url, /\/agents\/bc-1\/followup$/);
    assert.equal(captured!.body.prompt.text, "also add tests");
  } finally {
    restore();
  }
  await assert.rejects(agent.approvePlan("bc-1", CREDS), /do not support plan approval/);
});

test("#4227 listSources normalizes the repositories list", async () => {
  const agent = new cursorMod.CursorCloudAgent();
  const restore = mockFetch(() =>
    Response.json({ repositories: [{ url: "https://github.com/org/repo", name: "org/repo" }] })
  );
  try {
    const sources = await agent.listSources(CREDS);
    assert.equal(sources.length, 1);
    assert.equal(sources[0].url, "https://github.com/org/repo");
    assert.equal(sources[0].name, "org/repo");
  } finally {
    restore();
  }
});
