import test from "node:test";
import assert from "node:assert/strict";

import { GET, POST } from "../../src/app/api/issue-agent/runs/route.ts";

async function json(response: Response): Promise<Record<string, unknown>> {
  return (await response.json()) as Record<string, unknown>;
}

test("issue-agent status reports default-off recorded triage support", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  try {
    const response = await GET();
    const body = await json(response);

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.enabled, false);
    assert.deepEqual(body.supportedModes, ["recorded-triage"]);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
  }
});

test("issue-agent run rejects invalid JSON", async () => {
  const response = await POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: "{",
    })
  );
  const body = await json(response);

  assert.equal(response.status, 400);
  assert.equal(body.error, "Invalid JSON body");
});

test("issue-agent run accepts only recorded-triage mode", async () => {
  const response = await POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({ mode: "live-shell" }),
    })
  );
  const body = await json(response);

  assert.equal(response.status, 400);
  assert.equal(body.error, "Unsupported issue-agent mode");
});

test("issue-agent run is disabled by default", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({ mode: "recorded-triage", issueUrl: "https://github.com/x/y/issues/1" }),
      })
    );
    const body = await json(response);

    assert.equal(response.status, 403);
    assert.equal(body.enabled, false);
    assert.equal(body.requiredEnv, "OMNIROUTE_ISSUE_AGENT_ENABLED=true");
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
  }
});
