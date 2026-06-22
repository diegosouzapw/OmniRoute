import test from "node:test";
import assert from "node:assert/strict";

import { KimiExecutor } from "../../open-sse/executors/kimi.ts";
import { CLAUDE_CLI_USER_AGENT } from "../../open-sse/config/anthropicHeaders.ts";

// 9router#1985: "Kimi For Coding is currently only available for Coding Agents such as
// Kimi CLI, Claude Code, Roo Code, Kilo Code, etc." The Kimi upstream gates on the
// User-Agent. OmniRoute's DefaultExecutor forwards the calling client's User-Agent
// verbatim (added in v3.8.2 for OpenCode), so a request originating from GitHub Copilot
// leaks Copilot's UA to Kimi and gets rejected. The kimi-coding executor must pin an
// approved coding-agent UA regardless of which IDE/client made the request.

function readUserAgent(headers: Record<string, unknown>): string | undefined {
  return (headers["User-Agent"] ?? headers["user-agent"]) as string | undefined;
}

test("KimiExecutor pins an approved coding-agent UA and never forwards the client UA", () => {
  const executor = new KimiExecutor();
  const copilotUA = "GitHubCopilotChat/0.20.0";

  const headers = executor.buildHeaders({ apiKey: "sk-kimi-test" }, true, {
    "user-agent": copilotUA,
  }) as Record<string, unknown>;

  const ua = readUserAgent(headers);
  assert.ok(ua, "expected a User-Agent header to be set for kimi-coding");
  assert.ok(!/copilot/i.test(ua), `client Copilot UA leaked to Kimi upstream: ${ua}`);
  assert.equal(ua, CLAUDE_CLI_USER_AGENT);
});

test("KimiExecutor still pins the coding-agent UA when no client UA is provided", () => {
  const executor = new KimiExecutor();

  const headers = executor.buildHeaders({ apiKey: "sk-kimi-test" }, true, null) as Record<
    string,
    unknown
  >;

  assert.equal(readUserAgent(headers), CLAUDE_CLI_USER_AGENT);
});

test("KimiExecutor honors the KIMI_CODING_USER_AGENT env override over the pinned default", () => {
  const prev = process.env.KIMI_CODING_USER_AGENT;
  process.env.KIMI_CODING_USER_AGENT = "Kimi-CLI/9.9.9";
  try {
    const executor = new KimiExecutor();
    const headers = executor.buildHeaders({ apiKey: "sk-kimi-test" }, true, {
      "user-agent": "GitHubCopilotChat/0.20.0",
    }) as Record<string, unknown>;

    assert.equal(readUserAgent(headers), "Kimi-CLI/9.9.9");
  } finally {
    if (prev === undefined) delete process.env.KIMI_CODING_USER_AGENT;
    else process.env.KIMI_CODING_USER_AGENT = prev;
  }
});
