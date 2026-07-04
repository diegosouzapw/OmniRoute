import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

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

test("issue-agent run returns deterministic recorded-triage plan when enabled", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/6059",
          dryRun: true,
        }),
      })
    );
    const body = await json(response);

    assert.equal(response.status, 200);
    assert.equal(body.accepted, true);
    assert.equal(body.mode, "recorded-triage");
    assert.equal(body.repository, "KooshaPari/OmniRoute");
    assert.equal(body.issueNumber, 6059);
    assert.match(String(body.runId), /^issue-agent-recorded-triage-[a-f0-9]{16}$/);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
  }
});

test("issue-agent run rejects invalid enabled recorded-triage URL", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({ mode: "recorded-triage", issueUrl: "https://example.com/nope" }),
      })
    );
    const body = await json(response);

    assert.equal(response.status, 400);
    assert.equal(body.error, "Expected a GitHub issue or pull request URL");
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
  }
});

test("issue-agent run returns recorded context summary with redaction", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  const previousDataDir = process.env.DATA_DIR;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "issue-agent-route-"));
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/7",
          recordedContext: {
            title: "Review PR mention",
            body: "Authorization: Bearer sk-routeSecret1234567890",
            comments: [{ author: "maintainer", body: "please review", isBot: false }],
          },
        }),
      })
    );
    const body = await json(response);
    const context = body.context as Record<string, unknown>;

    assert.equal(response.status, 200);
    assert.equal(body.auditPath, join(process.env.DATA_DIR, "issue-agent", "audit.jsonl"));
    assert.equal(context.issueTitle, "Review PR mention");
    assert.equal(context.intent, "review");
    assert.equal(context.humanCommentCount, 1);
    assert.doesNotMatch(String(context.redactedDigestSource), /sk-routeSecret/);
    assert.match(String(context.redactedDigestSource), /\[REDACTED\]/);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
  }
});
