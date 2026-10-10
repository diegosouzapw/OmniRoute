// #13330 mandatory item 2 — `forceEnforceScopes` in `withScopeEnforcement()`
// (open-sse/mcp-server/server.ts) closes a gap where OMNIROUTE_MCP_ENFORCE_SCOPES is opt-in
// (defaults to false) for the documented local/stdio single-operator flow, but that default
// must not extend to a caller resolved from a real per-key HTTP Authorization header unless
// that key already holds full `manage`/`admin` scope — otherwise a key granted only the
// narrow `mcp:connect` bypass scope could invoke every MCP tool once an operator enables
// remote/non-loopback MCP access. `withScopeEnforcement` itself is not exported, so these
// tests drive it through the real registered tool handlers on a live `createMcpServer()`
// instance (mirroring tests/unit/mcp-extra-forward-6178.test.ts), asserting the scope-denial
// short-circuit fires (or doesn't) exactly as the module-level `MCP_ENFORCE_SCOPES` constant
// and the `authInfo`/manage-scope combination dictate.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-force-enforce-"));
// The module-level MCP_ENFORCE_SCOPES constant is captured once at import time — must be
// unset (default-off) BEFORE createMcpServer.ts is imported so this test actually exercises
// the "opt-in enforcement is off, but forceEnforceScopes turns it on anyway" gap.
delete process.env.OMNIROUTE_MCP_ENFORCE_SCOPES;
delete process.env.OMNIROUTE_MCP_SCOPES;

const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");

type RegisteredTool = {
  handler: (
    args: unknown,
    extra?: unknown
  ) => Promise<{ content?: Array<{ type: string; text: string }>; isError?: boolean }>;
};

function getRegisteredHandler(server: unknown, toolName: string) {
  const registry = (server as { _registeredTools?: Record<string, RegisteredTool> })
    ._registeredTools;
  assert.ok(registry, "McpServer should expose _registeredTools");
  const tool = registry[toolName];
  assert.ok(tool, `${toolName} must be registered on the live MCP server`);
  return tool.handler;
}

function resultText(result: { content?: Array<{ type: string; text: string }> }) {
  return result.content?.[0]?.text ?? "";
}

test("forceEnforceScopes denies an HTTP authInfo caller with a narrow (non-manage) scope even though OMNIROUTE_MCP_ENFORCE_SCOPES is off", async () => {
  const server = createMcpServer();
  const getHealth = getRegisteredHandler(server, "omniroute_get_health");

  // Real per-key HTTP Authorization scope resolution — resolveCallerScopeContext gives this
  // source "authInfo" (see httpTransport.ts). The key holds a scope narrower than what
  // omniroute_get_health requires (`read:health`) and holds neither manage nor admin.
  const extra = { authInfo: { clientId: "http-narrow-caller", scopes: ["mcp:connect"] } };

  const result = await getHealth({}, extra);

  assert.equal(
    result.isError,
    true,
    "an authInfo caller without manage/admin must be scope-checked even with enforcement off by default"
  );
  assert.match(resultText(result), /Insufficient MCP scopes/);
  assert.match(resultText(result), /omniroute_get_health/);
});

test("forceEnforceScopes does not block an HTTP authInfo caller that already holds manage scope", async () => {
  const server = createMcpServer();
  const getHealth = getRegisteredHandler(server, "omniroute_get_health");

  const extra = { authInfo: { clientId: "http-manage-caller", scopes: ["manage"] } };

  const result = await getHealth({}, extra);

  // manage scope satisfies hasManageScope(), so forceEnforceScopes stays false and (with
  // MCP_ENFORCE_SCOPES also false) the scope gate never runs — the handler executes and
  // returns its normal health payload (its own upstream-fetch failures are caught and
  // reported as `degraded`, not as a scope error).
  assert.notEqual(
    result.isError,
    true,
    `expected the manage-scoped caller to pass the scope gate; got: ${resultText(result)}`
  );
  assert.doesNotMatch(resultText(result), /Insufficient MCP scopes/);
});

test("forceEnforceScopes leaves the stdio path (no authInfo) unaffected — env-fallback scope resolution, not force-enforced", async () => {
  const server = createMcpServer();
  const getHealth = getRegisteredHandler(server, "omniroute_get_health");

  // stdio tool calls never populate extra.authInfo (see httpTransport.ts / scopeEnforcement.ts
  // resolveCallerScopeContext) — this is the source==="env"/"none" path forceEnforceScopes must
  // leave alone, so opt-in-off local/stdio usage keeps working exactly as before this PR.
  const extra = { sessionId: "stdio-session-13330" };

  const result = await getHealth({}, extra);

  assert.notEqual(
    result.isError,
    true,
    `expected the stdio-style caller to pass unaffected; got: ${resultText(result)}`
  );
  assert.doesNotMatch(resultText(result), /Insufficient MCP scopes/);
});

test.after(() => {
  fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
});
