// Agent context extraction: which coding-agent session a request belongs to and which project
// it works on. Payload shapes mirror real captured traffic (Claude Code 2.1.282 sends its
// working directory in a role:"system" message; Codex sends <environment_context><cwd>).
import test from "node:test";
import assert from "node:assert/strict";

const { extractAgentContext, hasAgentIdentity, projectNameFromPath, resolveUsageAgentContext } =
  await import("../../open-sse/handlers/chatCore/agentContext.ts");
const { forwardOpencodeClientHeaders } = await import("../../open-sse/utils/opencodeHeaders.ts");

const CLAUDE_SESSION = "fedc860f-461d-4b8b-866d-77477e1d4872";

function claudeCodeBody(workingDirectory: string) {
  return {
    model: "claude-opus-5.5",
    metadata: {
      user_id: JSON.stringify({
        device_id: "d".repeat(64),
        account_uuid: "",
        session_id: CLAUDE_SESSION,
      }),
    },
    system: [{ type: "text", text: "You are an interactive agent." }],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "<system-reminder>\n# gitStatus\nCurrent branch: fix/token-limits\n</system-reminder>",
          },
          { type: "text", text: "Run pwd" },
        ],
      },
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `# Environment\n - Primary working directory: ${workingDirectory}\n - Platform: darwin`,
          },
        ],
      },
    ],
  };
}

const claudeHeaders = {
  "user-agent": "claude-cli/2.1.282 (external, cli)",
  "x-claude-code-session-id": CLAUDE_SESSION,
};

test("Claude Code request yields client, session, worktree-safe project and branch", () => {
  const context = extractAgentContext(
    claudeCodeBody("/Users/dev/work/acme/.claude/worktrees/token-limits"),
    new Headers(claudeHeaders)
  );
  assert.deepEqual(context, {
    client: "claude-code",
    clientSessionId: CLAUDE_SESSION,
    projectName: "acme",
    projectRepo: null,
    projectPath: "/Users/dev/work/acme/.claude/worktrees/token-limits",
    projectSource: "path",
    gitBranch: "fix/token-limits",
  });
});

test("explicit project headers win over the prompt-derived project", () => {
  const context = extractAgentContext(claudeCodeBody("/Users/dev/work/acme"), {
    ...claudeHeaders,
    "x-omniroute-project": "omniroute",
    "X-OmniRoute-Project-Repo": "github.com/diegosouzapw/OmniRoute",
  });
  assert.equal(context.projectName, "omniroute");
  assert.equal(context.projectSource, "header");
  assert.equal(context.projectRepo, "github.com/diegosouzapw/OmniRoute");
  assert.equal(context.projectPath, "/Users/dev/work/acme");
});

test("session id falls back to metadata.user_id JSON when the header is absent", () => {
  const context = extractAgentContext(claudeCodeBody("/srv/app"), {});
  assert.equal(context.clientSessionId, CLAUDE_SESSION);
});

test("Codex environment_context in a Responses input yields project and session", () => {
  const body = {
    input: [
      { role: "developer", content: [{ type: "input_text", text: "You are Codex." }] },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "<environment_context>\n  <cwd>/home/dev/billing</cwd>\n  <shell>zsh</shell>\n</environment_context>",
          },
        ],
      },
    ],
  };
  const context = extractAgentContext(body, {
    "user-agent": "codex_cli_rs/0.40.0 (Mac OS 15.1; arm64)",
    "x-codex-session-id": "codex-123",
  });
  assert.equal(context.client, "codex");
  assert.equal(context.clientSessionId, "codex-123");
  assert.equal(context.projectName, "billing");
  assert.equal(context.projectPath, "/home/dev/billing");
});

test("working directory is read from the top-level system field of older builds", () => {
  const context = extractAgentContext(
    { system: "<env>\nWorking directory: C:\\Users\\dev\\payments-api\n</env>", messages: [] },
    {}
  );
  assert.equal(context.projectName, "payments-api");
});

test("prompt text that is not an announced working directory never becomes a project", () => {
  const cases = [
    // A user file (e.g. CLAUDE.md) that happens to contain the marker is not trusted.
    { messages: [{ role: "user", content: "Docs say:\nWorking directory: /etc/secret" }] },
    // Prose after the marker is not a path.
    { system: "Working directory: the repository root", messages: [] },
    // A bare <cwd> outside Codex's environment envelope is ignored.
    { messages: [{ role: "user", content: "<cwd>/tmp/x</cwd>" }] },
  ];
  for (const body of cases) {
    const context = extractAgentContext(body, {});
    assert.equal(context.projectName, null, JSON.stringify(body));
    assert.equal(context.projectPath, null, JSON.stringify(body));
  }
});

test("header values are single-line, control-free and length-capped", () => {
  const context = extractAgentContext(
    {},
    { "x-omniroute-project": `  evil\r\nx-injected: 1${"a".repeat(300)}` }
  );
  assert.ok(context.projectName);
  assert.ok(!/[\r\n]/.test(context.projectName));
  assert.equal(context.projectName.length, 120);
});

test("scanning stops at the bound, so a marker buried past it is ignored", () => {
  const huge = `${"x".repeat(200_000)}\nPrimary working directory: /far/away\n`;
  const context = extractAgentContext({ messages: [{ role: "system", content: huge }] }, {});
  assert.equal(context.projectPath, null);
});

test("plain API traffic carries no agent identity", () => {
  const context = extractAgentContext(
    { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
    { "user-agent": "curl/8.7.1" }
  );
  assert.equal(hasAgentIdentity(context), false);
  assert.equal(context.client, "curl");
});

test("noLog keys keep header identifiers but drop everything read from the prompt", () => {
  const body = claudeCodeBody("/Users/dev/work/acme");
  const withoutHeader = resolveUsageAgentContext(body, claudeHeaders, { noLog: true });
  assert.equal(withoutHeader.projectName, null);
  assert.equal(withoutHeader.projectPath, null);
  assert.equal(withoutHeader.gitBranch, null);
  assert.equal(withoutHeader.clientSessionId, CLAUDE_SESSION);

  const withHeader = resolveUsageAgentContext(
    body,
    { ...claudeHeaders, "x-omniroute-project": "acme" },
    { noLog: true }
  );
  assert.equal(withHeader.projectName, "acme");
  assert.equal(withHeader.projectPath, null);
});

test("projectNameFromPath strips worktree folders and trailing slashes", () => {
  const cases: Array<[string, string]> = [
    ["/Users/dev/acme/", "acme"],
    ["/Users/dev/acme/.worktrees/feature-x", "acme"],
    ["C:\\work\\acme\\.claude\\worktrees\\fix", "acme"],
  ];
  for (const [path, expected] of cases) assert.equal(projectNameFromPath(path), expected, path);
});

test("project headers are never forwarded to the upstream provider", () => {
  const upstream: Record<string, string> = {};
  forwardOpencodeClientHeaders(upstream, {
    "x-omniroute-project": "acme",
    "x-omniroute-project-repo": "github.com/org/acme",
  });
  const names = Object.keys(upstream).map((name) => name.toLowerCase());
  assert.ok(!names.includes("x-omniroute-project"));
  assert.ok(!names.includes("x-omniroute-project-repo"));
});
