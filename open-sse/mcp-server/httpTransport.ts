/**
 * MCP HTTP Transport Layer — session-aware handlers for SSE and Streamable HTTP.
 *
 * Runs the MCP server **inside** the Next.js process so it can be toggled
 * from the dashboard without requiring `omniroute --mcp`.
 *
 * Transport modes:
 *   - SSE:             GET /api/mcp/sse (event stream)  +  POST /api/mcp/sse (messages)
 *   - Streamable HTTP: POST /api/mcp/stream (messages)  +  GET /api/mcp/stream (SSE stream)  +  DELETE /api/mcp/stream (session end)
 */

import { randomUUID } from "node:crypto";
import { createMcpServer } from "./server.ts";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

let _sseServer: McpServer | null = null;
let _sseTransport: WebStandardStreamableHTTPServerTransport | null = null;
let _sseStartedAt: number | null = null;

type StreamableSession = {
  sessionId: string;
  server: McpServer;
  transport: WebStandardStreamableHTTPServerTransport;
  startedAt: number;
};

const _streamableSessions = new Map<string, StreamableSession>();

function closeSseTransport(): void {
  if (_sseTransport) {
    try {
      _sseTransport.close();
    } catch {
      // ignore shutdown errors
    }
  }
  _sseServer = null;
  _sseTransport = null;
  _sseStartedAt = null;
}

function closeStreamableSession(sessionId: string): void {
  const session = _streamableSessions.get(sessionId);
  if (!session) {
    return;
  }

  try {
    session.transport.close();
  } catch {
    // ignore shutdown errors
  }
  _streamableSessions.delete(sessionId);
}

function closeAllStreamableSessions(): void {
  for (const sessionId of _streamableSessions.keys()) {
    closeStreamableSession(sessionId);
  }
}

function ensureSseServer(): {
  server: McpServer;
  transport: WebStandardStreamableHTTPServerTransport;
} {
  if (_sseServer && _sseTransport) {
    return { server: _sseServer, transport: _sseTransport };
  }

  closeAllStreamableSessions();

  _sseServer = createMcpServer();
  _sseTransport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });
  _sseStartedAt = Date.now();

  void _sseServer.connect(_sseTransport);

  console.log("[MCP] HTTP transport started (sse)");
  return { server: _sseServer, transport: _sseTransport };
}

function createStreamableSession(): StreamableSession {
  closeSseTransport();

  const sessionId = randomUUID();
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sessionId,
  });
  const session = {
    sessionId,
    server,
    transport,
    startedAt: Date.now(),
  };

  void server.connect(transport);
  _streamableSessions.set(sessionId, session);
  console.log(`[MCP] HTTP transport started (streamable-http:${sessionId})`);
  return session;
}

async function isInitializeRequest(request: Request): Promise<boolean> {
  if (request.method !== "POST") {
    return false;
  }

  try {
    const body = await request.clone().json() as { method?: unknown };
    return body?.method === "initialize";
  } catch {
    return false;
  }
}

function errorResponse(message: string, code: number, status = 400): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code, message },
      id: null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function withSessionHeader(response: Response, sessionId: string): Response {
  if (response.headers.get("mcp-session-id")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("mcp-session-id", sessionId);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleStreamableRequest(request: Request): Promise<Response> {
  const sessionId = request.headers.get("mcp-session-id");

  if (sessionId) {
    const session = _streamableSessions.get(sessionId);
    if (!session) {
      return errorResponse("Bad Request: Unknown Mcp-Session-Id header", -32000);
    }

    try {
      const response = await session.transport.handleRequest(request);
      if (request.method === "DELETE") {
        closeStreamableSession(sessionId);
      }
      return withSessionHeader(response, sessionId);
    } catch (err) {
      console.error("[MCP] Streamable HTTP error:", err);
      if (request.method === "DELETE") {
        closeStreamableSession(sessionId);
      }
      return new Response(
        JSON.stringify({ error: "MCP transport error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  if (!(await isInitializeRequest(request))) {
    return errorResponse("Bad Request: Mcp-Session-Id header is required", -32000);
  }

  const session = createStreamableSession();

  try {
    const response = await session.transport.handleRequest(request);
    return withSessionHeader(response, session.sessionId);
  } catch (err) {
    closeStreamableSession(session.sessionId);
    console.error("[MCP] Streamable HTTP error:", err);
    return new Response(
      JSON.stringify({ error: "MCP transport error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

/**
 * Handle Streamable HTTP requests (POST / GET / DELETE).
 * Used by the Next.js route at /api/mcp/stream.
 */
export async function handleMcpStreamableHTTP(request: Request): Promise<Response> {
  return handleStreamableRequest(request);
}

/**
 * Handle SSE requests.
 * SSE transport is implemented via Streamable HTTP transport with GET for SSE stream
 * and POST for messages (the Streamable HTTP transport supports both patterns).
 */
export async function handleMcpSSE(request: Request): Promise<Response> {
  const { transport } = ensureSseServer();

  try {
    return await transport.handleRequest(request);
  } catch (err) {
    console.error("[MCP] SSE error:", err);
    return new Response(
      JSON.stringify({ error: "MCP SSE transport error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export function getMcpHttpStatus(): {
  online: boolean;
  transport: string | null;
  startedAt: number | null;
  uptime: string | null;
} {
  const streamableStartedAt =
    _streamableSessions.size > 0
      ? Math.min(...Array.from(_streamableSessions.values(), (session) => session.startedAt))
      : null;
  const startedAt = streamableStartedAt ?? _sseStartedAt;
  const transport = _streamableSessions.size > 0 ? "streamable-http" : _sseTransport ? "sse" : null;
  const online = transport !== null;

  return {
    online,
    transport,
    startedAt,
    uptime: startedAt ? `${Math.floor((Date.now() - startedAt) / 1000)}s` : null,
  };
}

export function shutdownMcpHttp(): void {
  closeSseTransport();
  closeAllStreamableSessions();
  console.log("[MCP] HTTP transport shutdown");
}

export function isMcpHttpActive(): boolean {
  return _sseTransport !== null || _streamableSessions.size > 0;
}
