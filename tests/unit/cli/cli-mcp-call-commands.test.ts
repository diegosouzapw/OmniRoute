import test from "node:test";
import assert from "node:assert/strict";

// ---- helpers ----

function makeResp(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  const headers = new Headers({ "content-type": "application/json", ...extraHeaders });
  const obj = {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers,
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

// Simulate a /api/mcp/stream endpoint that speaks JSON-RPC 2.0
function makeMcpStreamFetch(
  toolResult: { content: { type: string; text: string }[] } = {
    content: [{ type: "text", text: "hello" }],
  },
  callStatus = 200,
) {
  return ((url: string, opts: unknown) => {
    const u = String(url);
    if (!u.includes("/api/mcp/stream")) {
      return Promise.resolve(makeResp({ error: "not found" }, 404));
    }

    const body = opts?.body ? JSON.parse(opts.body) : null;

    // initialize
    if (body && body.method === "initialize") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2024-11-05", capabilities: {} } },
          200,
          { "mcp-session-id": "test-session-123" },
        ),
      );
    }

    // tools/call
    if (body && body.method === "tools/call") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 2, result: toolResult },
          callStatus,
        ),
      );
    }

    return Promise.resolve(makeResp({ error: "unknown method" }, 400));
  }) as any;
}

// ---- tests ----

test("mcp call sends JSON-RPC initialize then tools/call", async () => {
  const calls: Array<{ url: string; body: unknown }> = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: unknown) => {
    const u = String(url);
    const body = opts?.body ? JSON.parse(opts.body) : null;
    calls.push({ url: u, body });

    if (body && body.method === "initialize") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2024-11-05", capabilities: {} } },
          200,
          { "mcp-session-id": "sess-1" },
        ),
      );
    }
    if (body && body.method === "tools/call") {
      return Promise.resolve(
        makeResp({
          jsonrpc: "2.0",
          id: 2,
          result: { content: [{ type: "text", text: "ok" }] },
        }),
      );
    }
    return Promise.resolve(makeResp({ error: "unknown" }, 400));
  }) as any;

  try {
    const { runMcpCallCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    const exitCode = await runMcpCallCommand(
      "omniroute_get_health",
      {},
      { stream: false },
      { baseUrl: "http://localhost:20128" },
    );
    assert.equal(exitCode, 0);

    assert.equal(calls.length, 2);
    assert.equal(calls[0].body.method, "initialize");
    assert.equal(calls[1].body.method, "tools/call");
    assert.equal(calls[1].body.params.name, "omniroute_get_health");
    assert.deepEqual(calls[1].body.params.arguments, {});
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("mcp call passes session-id header on tools/call", async () => {
  let callHeaders: Record<string, string> = {};
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: unknown) => {
    const body = opts?.body ? JSON.parse(opts.body) : null;
    if (body && body.method === "initialize") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2024-11-05", capabilities: {} } },
          200,
          { "mcp-session-id": "sess-abc" },
        ),
      );
    }
    if (body && body.method === "tools/call") {
      callHeaders = opts.headers || {};
      return Promise.resolve(
        makeResp({
          jsonrpc: "2.0",
          id: 2,
          result: { content: [{ type: "text", text: "ok" }] },
        }),
      );
    }
    return Promise.resolve(makeResp({ error: "unknown" }, 400));
  }) as any;

  try {
    const { runMcpCallCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    const exitCode = await runMcpCallCommand(
      "test_tool",
      { key: "val" },
      { stream: false },
      { baseUrl: "http://localhost:20128" },
    );
    assert.equal(exitCode, 0);
    assert.equal(callHeaders["mcp-session-id"], "sess-abc");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("mcp call prints result content to stdout", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({
    content: [{ type: "text", text: "hello world" }],
  });

  const output = await captureStdout(async () => {
    const { runMcpCallCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    await runMcpCallCommand(
      "test",
      {},
      { stream: false },
      { baseUrl: "http://localhost:20128" },
    );
  });

  globalThis.fetch = origFetch;
  assert.ok(output.includes("hello world"));
});

test("mcp call prints error on non-ok response", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: unknown) => {
    const body = opts?.body ? JSON.parse(opts.body) : null;
    if (body && body.method === "initialize") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2024-11-05", capabilities: {} } },
          200,
          { "mcp-session-id": "sess-1" },
        ),
      );
    }
    if (body && body.method === "tools/call") {
      return Promise.resolve(makeResp({ error: "tool not found" }, 500));
    }
    return Promise.resolve(makeResp({ error: "unknown" }, 400));
  }) as any;

  try {
    const { runMcpCallCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    const exitCode = await runMcpCallCommand(
      "bad_tool",
      {},
      { stream: false },
      { baseUrl: "http://localhost:20128" },
    );
    assert.equal(exitCode, 1);
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("mcp call with stream reads SSE data", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: unknown) => {
    const body = opts?.body ? JSON.parse(opts.body) : null;
    if (body && body.method === "initialize") {
      return Promise.resolve(
        makeResp(
          { jsonrpc: "2.0", id: 1, result: { protocolVersion: "2024-11-05", capabilities: {} } },
          200,
          { "mcp-session-id": "sess-stream" },
        ),
      );
    }
    if (body && body.method === "tools/call") {
      // Simulate an SSE stream via a ReadableStream body
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode("data: stream-chunk-1\n\ndata: stream-chunk-2\n\n"));
          controller.close();
        },
      });
      return Promise.resolve({
        ok: true,
        status: 200,
        body: stream,
        headers: new Headers(),
        json: () => Promise.reject(new Error("not json")),
        text: () => Promise.reject(new Error("not text")),
      });
    }
    return Promise.resolve(makeResp({ error: "unknown" }, 400));
  }) as any;

  const output = await captureStdout(async () => {
    const { runMcpCallCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    await runMcpCallCommand(
      "test",
      {},
      { stream: true },
      { baseUrl: "http://localhost:20128" },
    );
  });

  globalThis.fetch = origFetch;
  assert.ok(output.includes("stream-chunk-1"));
  assert.ok(output.includes("stream-chunk-2"));
});

test("mcp status reads online field", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL, _init?: unknown) => {
    const u = String(_url);
    if (u.includes("/api/health")) {
      return makeResp({ status: "ok" }) as any;
    }
    if (u.includes("/api/mcp/status")) {
      return makeResp({
        status: "online",
        online: true,
        transport: "stdio",
        enabled: true,
        toolsCount: 107,
      }) as any;
    }
    return makeResp({ error: "not found" }, 404) as any;
  }) as any;

  const output = await captureStdout(async () => {
    const { runMcpStatusCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    const exitCode = await runMcpStatusCommand({});
    assert.equal(exitCode, 0);
  });

  globalThis.fetch = origFetch;
  assert.ok(output.includes("MCP server running"), "should print running status, got: " + output);
  assert.ok(output.includes("107"), "should print toolsCount");
});

test("mcp status json mode prints full object", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    const u = String(url);
    if (u.includes("/api/health")) {
      return Promise.resolve(makeResp({ status: "ok" }, 200));
    }
    if (u.includes("/api/mcp/status")) {
      return Promise.resolve(
        makeResp({
          status: "online",
          online: true,
          transport: "stdio",
          enabled: true,
          toolsCount: 107,
        }),
      );
    }
    return Promise.resolve(makeResp({ error: "not found" }, 404));
  }) as any;

  const output = await captureStdout(async () => {
    const { runMcpStatusCommand } = await import(
      "../../../bin/cli/commands/mcp.mjs"
    );
    const exitCode = await runMcpStatusCommand({ json: true });
    assert.equal(exitCode, 0);
  });

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(output.trim());
  assert.equal(parsed.online, true);
  assert.equal(parsed.toolsCount, 107);
});
