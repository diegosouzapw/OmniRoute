import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Bun evaluates test files in one process. Set DATA_DIR before importing the
// route so its import-time dependencies never probe the developer's real DB.
const TEST_DATA_DIR =
  process.env.DATA_DIR ?? mkdtempSync(join(tmpdir(), "issue-agent-runs-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";

const { GET, POST } = await import("../../src/app/api/issue-agent/runs/route.ts");

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

test("issue-agent run rejects invalid request field types", async () => {
  const response = await POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({ mode: 42 }),
    })
  );

  assert.equal(response.status, 400);
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

test("issue-agent run rejects invalid recorded-triage field types", async () => {
  const response = await POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({ mode: "recorded-triage", dryRun: "true" }),
    })
  );
  const body = await json(response);
  const error = body.error as Record<string, unknown>;
  const details = error.details as Array<Record<string, unknown>>;

  assert.equal(response.status, 400);
  assert.equal(error.message, "Invalid request");
  assert.deepEqual(details, [
    { field: "dryRun", message: "Invalid input: expected boolean, received string" },
  ]);
});

test("issue-agent run is disabled by default", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          issueUrl: "https://github.com/x/y/issues/1",
        }),
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

test("issue-agent run accepts recorded GitHub export payloads", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  const previousDataDir = process.env.DATA_DIR;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "issue-agent-export-route-"));
  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          githubExport: {
            issue: {
              title: "Fix GitHub export importer",
              body: "bug in recorded context path",
              html_url: "https://github.com/KooshaPari/OmniRoute/issues/88",
            },
            comments: [{ user: { login: "maintainer", type: "User" }, body: "please patch" }],
          },
        }),
      })
    );
    const body = await json(response);
    const context = body.context as Record<string, unknown>;

    assert.equal(response.status, 200);
    assert.equal(body.issueUrl, "https://github.com/KooshaPari/OmniRoute/issues/88");
    assert.equal(body.issueNumber, 88);
    assert.equal(context.issueTitle, "Fix GitHub export importer");
    assert.equal(context.intent, "bugfix");
    assert.equal(body.auditPath, join(process.env.DATA_DIR, "issue-agent", "audit.jsonl"));
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
  }
});

test("issue-agent run sanitizes a forced audit-write failure instead of leaking its absolute path", async () => {
  const previous = process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
  const previousDataDir = process.env.DATA_DIR;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  const auditBlockerDir = mkdtempSync(join(tmpdir(), "issue-agent-audit-blocker-"));
  // appendIssueAgentAuditRecord() (src/lib/issueAgent/audit.ts) does
  // `mkdir(join(DATA_DIR, "issue-agent"), { recursive: true })`. Pre-creating a
  // FILE at that exact path forces a real Node fs error (EEXIST) whose raw
  // `.message` embeds this directory's absolute path -- the same leak shape a
  // permission-denied or disk-full failure would produce (Hard Rule #12).
  writeFileSync(join(auditBlockerDir, "issue-agent"), "blocking file, not a directory");
  process.env.DATA_DIR = auditBlockerDir;

  try {
    const response = await POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/1",
        }),
      })
    );
    const body = await json(response);

    assert.equal(response.status, 400);
    assert.equal(typeof body.error, "string");
    const errorMessage = String(body.error);
    assert.doesNotMatch(errorMessage, /EEXIST|ENOENT|EACCES/, "must not leak the raw errno code");
    assert.ok(
      !errorMessage.includes(auditBlockerDir),
      "must not leak the DATA_DIR absolute path"
    );
    assert.ok(
      !errorMessage.includes("/issue-agent/"),
      "must not leak the audit subdirectory path"
    );
    assert.equal(errorMessage, "Issue Agent request failed due to an internal error");
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
    else process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = previous;
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
  }
});
