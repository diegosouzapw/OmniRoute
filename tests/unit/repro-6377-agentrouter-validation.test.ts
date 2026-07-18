// Repro for GitHub issue #6377: AgentRouter "Check" (validate API key) returns
// "Invalid API key" for a genuinely valid token.
//
// Root cause: PR #6255 (#6056) routed the REAL chat-request path for the
// built-in `agentrouter` provider through the dynamic Claude-Code wire image
// (buildProviderHeaders/buildProviderUrl -> CC fingerprint headers + the
// `?beta=true` chat path) specifically because AgentRouter's WAF rejects
// requests that don't look like the official Claude Code client
// ("unauthorized client detected" — see the comment in
// open-sse/config/providers/registry/agentrouter/index.ts).
//
// validation.ts's generic `entry.format === "claude"` branch (used for the
// dashboard "Check" button) was NOT updated by that PR: it still builds a
// bare request (Content-Type + x-api-key + anthropic-version only, no
// `?beta=true`, no CC fingerprint headers) straight to entry.baseUrl. A WAF
// that gates on the CC wire image will legitimately 403 this validation
// probe even though the same key works for real chat traffic — the exact
// mismatch the reporter describes.
//
// This test simulates that WAF: accept only requests that carry the CC wire
// image markers (User-Agent: claude-cli/... and the `?beta=true` chat path);
// reject everything else with 403 "unauthorized client detected", mapped by
// the validator to { valid: false, error: "Invalid API key" }.

import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("agentrouter key validation must not false-negative behind the CC-wire-image WAF gate (#6377)", async () => {
  const calls: { url: string; headers: Record<string, string> }[] = [];

  globalThis.fetch = async (url: string | URL, init: RequestInit = {}) => {
    const u = String(url);
    const headers: Record<string, string> = {};
    if (init?.headers) {
      for (const [k, v] of Object.entries(init.headers)) {
        headers[k.toLowerCase()] = String(v);
      }
    }
    calls.push({ url: u, headers });

    // Emulate AgentRouter's real-world WAF: only requests that look like the
    // official Claude Code client (CC wire image: `?beta=true` chat path +
    // a claude-cli User-Agent) are let through with a valid key. Anything
    // else — even with the SAME valid key — is rejected as an
    // "unauthorized client".
    const looksLikeClaudeCode =
      u.includes("beta=true") && /claude-cli/i.test(headers["user-agent"] || "");

    if (!looksLikeClaudeCode) {
      return new Response(JSON.stringify({ error: "unauthorized client detected" }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify({ id: "msg_ok" }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "agentrouter",
    apiKey: "sk-genuinely-valid-agentrouter-key",
    providerSpecificData: {},
  });

  // BEFORE the fix: validation.ts's generic `entry.format === "claude"`
  // branch sends a bare request (no `?beta=true`, no CC User-Agent) and gets
  // 403'd by the WAF -> false "Invalid API key" for a key that actually works.
  assert.equal(
    result.valid,
    true,
    `expected the valid key to validate, got: ${JSON.stringify(result)} — ` +
      `requests made: ${JSON.stringify(calls.map((c) => ({ url: c.url, ua: c.headers["user-agent"] })))}`
  );
});
