import type { Response as Resp } from "undici";

// Minimal fetch mock responses that satisfy what apiFetch needs.
export function makeMcpResp(data: unknown, status = 200, headers: Record<string, string> = {}) {
  const hdrs = new Headers({ "content-type": "application/json", ...headers });
  const obj = {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(typeof data === "string" ? data : JSON.stringify(data)),
    headers: hdrs,
  } as unknown as Resp;
  return obj;
}

/**
 * The two transport-level preconditions `/api/mcp/stream` enforces before a
 * JSON-RPC body is ever looked at. They are reproduced here because a mock that
 * answers every POST is how #14435 shipped: the CLI advertised a single Accept
 * type and never echoed the session id, five CLI suites stayed green, and every
 * MCP-backed command 406'd against a real server.
 */
export const MCP_SESSION_HEADER = "mcp-session-id";
const REQUIRED_ACCEPT = ["application/json", "text/event-stream"] as const;

/**
 * MCP Streamable HTTP requires the client to advertise BOTH media types on a
 * POST — the server chooses which one the reply uses. Mirrors the SDK's
 * `validateAcceptHeader` 406, surfaced to users as
 * `Not Acceptable: Client must accept both …`.
 */
function acceptsBothMediaTypes(init?: { headers?: HeadersInit }): boolean {
  const accept = (new Headers(init?.headers ?? {}).get("accept") ?? "").toLowerCase();
  return REQUIRED_ACCEPT.every((type) => accept.includes(type));
}

export function makeMcpStreamFetch({
  toolResult = { content: [{ type: "text", text: "ok" }] },
  initStatus = 200,
  callStatus = 200,
  callError = false,
  sessionId = "sess-test",
} = {}) {
  let issuedSession: string | null = null;

  return (async (url: string | URL, init?: { headers?: HeadersInit; body?: string }) => {
    const u = String(url);
    if (!u.includes("/api/mcp/stream")) {
      return makeMcpResp({ error: "not found" }, 404);
    }
    if (!acceptsBothMediaTypes(init)) {
      return makeMcpResp(
        {
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message:
              "Not Acceptable: Client must accept both application/json and text/event-stream",
          },
          id: null,
        },
        406
      );
    }
    const rawBody = init && typeof init.body === "string" ? init.body : "";
    const body = rawBody ? JSON.parse(rawBody) : {};
    if (body.method === "initialize") {
      if (initStatus < 400) issuedSession = sessionId;
      return makeMcpResp(
        {
          jsonrpc: "2.0",
          id: body.id,
          result: { protocolVersion: "2024-11-05", capabilities: {} },
        },
        initStatus,
        initStatus < 400 ? { [MCP_SESSION_HEADER]: sessionId } : {}
      );
    }
    // Everything after `initialize` must carry the session the server issued;
    // httpTransport.ts answers 400 otherwise.
    const sent = new Headers(init?.headers ?? {}).get(MCP_SESSION_HEADER);
    if (!sent || sent !== issuedSession) {
      return makeMcpResp(
        {
          jsonrpc: "2.0",
          error: { code: -32000, message: "Bad Request: Mcp-Session-Id header is required" },
          id: null,
        },
        400
      );
    }
    if (body.method === "tools/call") {
      if (callStatus !== 200) return makeMcpResp({ error: "tool failure" }, callStatus);
      if (callError) {
        return makeMcpResp({
          jsonrpc: "2.0",
          id: body.id,
          result: { content: [{ type: "text", text: "tool error" }], isError: true },
        });
      }
      return makeMcpResp({ jsonrpc: "2.0", id: body.id, result: toolResult });
    }
    return makeMcpResp({ error: "unknown method" }, 400);
  }) as unknown as typeof globalThis.fetch;
}
