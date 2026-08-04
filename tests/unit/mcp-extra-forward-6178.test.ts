import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #6178: the static MCP tool-registration loops in
// open-sse/mcp-server/server.ts wrapped handlers as `async (args) => { … }`,
// dropping the MCP request `extra` argument that `withScopeEnforcement`
// forwards. On the stdio transport `omniroute_ccr_retrieve` therefore fell back
// to an anonymous caller (`resolveMcpCallerApiKeyId()` AsyncLocalStorage is
// undefined off the HTTP path, and `extra` was gone), so its principal-scoped
// CCR store lookup used the `__anon__` bucket and never matched the block the
// real caller stored. The fix threads `extra` through every static loop:
// `async (args, extra) => await toolDef.handler(parsedArgs, extra)`.
//
// This drives the REAL registration loop: it builds the live MCP server via
// createMcpServer(), stores a CCR block under a concrete principal, then invokes
// the registered omniroute_ccr_retrieve handler with an `extra` carrying that
// principal as the caller id (clientId) — exactly what the SDK passes on a tool
// call. If `extra` is dropped, the caller resolves to "anonymous", the store key
// misses, and retrieval errors out.

const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
const { storeBlock, resetCcrStore } = await import(
  "../../open-sse/services/compression/engines/ccr/index.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type RegisteredTool = {
  handler: (args: unknown, extra?: unknown) => Promise<{
    content?: Array<{ type: string; text: string }>;
    isError?: boolean;
  }>;
};

function getRegisteredHandler(server: unknown, toolName: string) {
  const registry = (server as { _registeredTools?: Record<string, RegisteredTool> })
    ._registeredTools;
  assert.ok(registry, "McpServer should expose _registeredTools");
  const tool = registry[toolName];
  assert.ok(tool, `${toolName} must be registered on the live MCP server`);
  return tool.handler;
}

test("static tool loops forward `extra` so stdio callers keep their scope/identity (#6178)", async () => {
  resetCcrStore();

  const principal = "apikey-6178";
  const verbatim = "VERBATIM-CCR-BLOCK-6178: the original content the caller stored.";
  const hash = storeBlock(verbatim, principal);

  const server = createMcpServer();
  const retrieve = getRegisteredHandler(server, "omniroute_ccr_retrieve");

  // Simulate a stdio tool call: no HTTP AsyncLocalStorage principal, but the MCP
  // `extra` carries the caller identity (clientId) + granted scopes.
  const extra = {
    authInfo: { clientId: principal, scopes: ["read:compression"] },
  };

  const result = await retrieve({ hash }, extra);
  const text = result.content?.[0]?.text ?? "";
  const payload = JSON.parse(text) as { content?: string; error?: string };

  // With `extra` forwarded, the handler resolves the real principal, the CCR
  // store key matches, and the verbatim block comes back. If the loop dropped
  // `extra` (the #6178 bug), the caller resolves to "anonymous" and this fails
  // with a "CCR block not found" error.
  assert.equal(
    result.isError,
    undefined,
    `retrieve must not error; got: ${payload.error ?? "(no error)"}`
  );
  assert.equal(
    payload.content,
    verbatim,
    "the forwarded `extra` principal must match the stored block and return it verbatim"
  );
});

test.after(() => {
  resetCcrStore();
  resetDbInstance();
});
