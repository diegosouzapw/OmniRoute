import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../../open-sse/mcp-server/httpTransport.ts");

function initializeRequest(id: number): Request {
  return new Request("http://localhost/api/mcp/sse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });
}

function batchedInitializeRequest(id: number): Request {
  return new Request("http://localhost/api/mcp/sse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify([
      {
        jsonrpc: "2.0",
        method: "initialize",
        id,
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "test-client", version: "1.0.0" },
        },
      },
    ]),
  });
}

// ── Regression #10690 / PR #10772: a second `initialize` POST must reset the
// SSE singleton instead of failing with 400 ("already initialized"). ─────────

test("handleMcpSSE: a second POST initialize after a successful first one does not return 400", async () => {
  mod.shutdownMcpHttp();

  const firstRes = await mod.handleMcpSSE(initializeRequest(1));
  assert.notEqual(firstRes.status, 400, "first initialize should not fail");

  const secondRes = await mod.handleMcpSSE(initializeRequest(2));
  assert.notEqual(
    secondRes.status,
    400,
    "a second client initialize must reset the SSE singleton instead of returning 400"
  );

  mod.shutdownMcpHttp();
});

test("handleMcpSSE: a batched (array) JSON-RPC body containing initialize also resets the singleton", async () => {
  mod.shutdownMcpHttp();

  const firstRes = await mod.handleMcpSSE(initializeRequest(1));
  assert.notEqual(firstRes.status, 400, "first initialize should not fail");

  const batchedRes = await mod.handleMcpSSE(batchedInitializeRequest(2));
  assert.notEqual(
    batchedRes.status,
    400,
    "a batched initialize entry must also trigger the SSE singleton reset"
  );

  mod.shutdownMcpHttp();
});
