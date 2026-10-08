const SESSION_ID = "sess-test";

// Minimal fetch mock responses that satisfy what apiFetch needs.
export function makeMcpResp(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function makeMcpError(message: string, status: number) {
  return makeMcpResp({ jsonrpc: "2.0", error: { code: -32000, message }, id: null }, status);
}

function makeMcpSseResp(data: unknown, headers: Record<string, string> = {}) {
  return new Response(`event: message\ndata: ${JSON.stringify(data)}\n\n`, {
    headers: { "content-type": "text/event-stream", ...headers },
  });
}

export function makeMcpStreamFetch({
  toolResult = { content: [{ type: "text", text: "ok" }] },
} = {}) {
  const fetchMock: typeof globalThis.fetch = async (url, init) => {
    const u = String(url);
    if (!u.includes("/api/mcp/stream")) {
      return makeMcpResp({ error: "not found" }, 404);
    }
    const headers = new Headers(init?.headers);
    const accept = headers.get("accept") ?? "";
    if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
      return makeMcpError(
        "Not Acceptable: Client must accept both application/json and text/event-stream",
        406
      );
    }
    const body = JSON.parse(String(init?.body ?? "{}"));
    if (body.method === "initialize") {
      return makeMcpSseResp(
        {
          jsonrpc: "2.0",
          id: body.id,
          result: { protocolVersion: "2024-11-05", capabilities: {} },
        },
        { "mcp-session-id": SESSION_ID }
      );
    }
    if (headers.get("mcp-session-id") !== SESSION_ID) {
      return makeMcpError("Bad Request: Mcp-Session-Id header is required", 400);
    }
    if (body.method === "tools/call") {
      return makeMcpSseResp({ jsonrpc: "2.0", id: body.id, result: toolResult });
    }
    return makeMcpResp({ error: "unknown method" }, 400);
  };
  return fetchMock;
}
