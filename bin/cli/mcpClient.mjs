/**
 * Shared MCP JSON-RPC client for CLI commands.
 *
 * The server exposes MCP through /api/mcp/stream (Streamable HTTP transport).
 * Calling a tool requires:
 *   1. POST initialize → get Mcp-Session-Id response header
 *   2. POST tools/call with that session header
 *
 * Older CLI paths POSTed { name, arguments } to /api/mcp/tools/call, which is
 * not a registered route, so every MCP-backed command was broken.
 *
 * These functions route through apiFetch so CLI auth, remote contexts and
 * timeouts are handled the same way as every other management API call.
 */
import { apiFetch } from "./api.mjs";

// Required by MCP Streamable HTTP for every POST.
export const MCP_ACCEPT = "application/json, text/event-stream";

function mcpError(message, status) {
  const err = new Error(message);
  if (status) err.status = status;
  return err;
}

export async function readJsonRpcResponse(res) {
  if (!res.headers.get("content-type")?.toLowerCase().includes("text/event-stream")) {
    return res.json();
  }

  for (const line of (await res.text()).split("\n")) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    return JSON.parse(data);
  }
  throw mcpError("MCP response contained no JSON-RPC data frame", 502);
}

async function callMcpEndpoint(payload, { timeout, sessionId }) {
  const res = await apiFetch("/api/mcp/stream", {
    method: "POST",
    body: payload,
    timeout,
    acceptNotOk: true,
    headers: {
      Accept: MCP_ACCEPT,
      ...(sessionId ? { "Mcp-Session-Id": sessionId } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw mcpError(
      `${payload.method} ${payload.id}: HTTP ${res.status}${text ? ` — ${text}` : ""}`,
      res.status
    );
  }
  return res;
}

/**
 * Call an MCP tool over /api/mcp/stream.
 *
 * Non-stream: returns the JSON-RPC result payload.
 * Stream: writes SSE `data:` chunks to stdout and returns null on success.
 */
export async function mcpCallTool(name, args = {}, options = {}) {
  const { timeout, scope } = options;
  const scopeHeader = scope?.length ? { "X-MCP-Scopes": scope.join(",") } : {};

  const initRes = await callMcpEndpoint(
    {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "omniroute-cli", version: "1.0" },
      },
    },
    { timeout }
  );

  const sessionId = initRes.headers.get("mcp-session-id");
  if (!sessionId) {
    throw mcpError("MCP initialize failed: no Mcp-Session-Id in response", 500);
  }

  const callRes = await callMcpEndpoint(
    {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name, arguments: args },
    },
    { timeout, sessionId }
  );

  if (options.stream) {
    return consumeSse(callRes.body, options.onChunk);
  }

  const data = await readJsonRpcResponse(callRes);
  if (data.error) {
    const err = mcpError(`MCP error: ${data.error.message || JSON.stringify(data.error)}`);
    err.code = data.error.code;
    throw err;
  }
  if (data.result?.isError) {
    const msg = data.result?.content?.[0]?.text || "unknown tool error";
    throw mcpError(`MCP error: ${msg}`, 500);
  }
  return data.result;
}

async function consumeSse(body, onChunk) {
  if (!body) throw mcpError("MCP stream returned no body", 500);
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  const flushLines = () => {
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.startsWith("data: ")) {
        const raw = line.slice(6).trim();
        if (raw && raw !== "[DONE]") (onChunk ?? writeStdout)(raw);
      }
    }
  };
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    flushLines();
  }
  buf += decoder.decode();
  flushLines();
  return null;
}

function writeStdout(raw) {
  process.stdout.write(raw + "\n");
}
