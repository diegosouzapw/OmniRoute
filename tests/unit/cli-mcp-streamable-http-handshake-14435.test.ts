import test from "node:test";
import assert from "node:assert/strict";
import { MCP_SESSION_HEADER, makeMcpStreamFetch } from "./helpers/mcpStreamMock.ts";

/**
 * Regression guard for #14435 — "every MCP-backed CLI command 406s".
 *
 * `/api/mcp/stream` is MCP Streamable HTTP, and the transport rejects a POST on
 * two grounds before any JSON-RPC handler runs:
 *
 *   1. the client must advertise BOTH `application/json` and
 *      `text/event-stream` (the server picks which one the reply uses), else
 *      `406 Not Acceptable: Client must accept both …`;
 *   2. every request after `initialize` must echo the `Mcp-Session-Id` the
 *      server issued, else `400 Bad Request: Mcp-Session-Id header is required`
 *      (open-sse/mcp-server/httpTransport.ts).
 *
 * Both CLI MCP clients violated (1) — `bin/cli/mcpClient.mjs` sent one type or
 * the other, and `bin/cli/commands/mcp.mjs` did the same — and mcpClient.mjs
 * additionally never forwarded the session id, so it would have failed (2) as
 * soon as (1) was fixed. The mocks in helpers/mcpStreamMock.ts now enforce both
 * rules, which is what turns the five existing CLI suites into real guards.
 */

type SeenRequest = { accept: string; session: string | null; method: string };

function recordingFetch(
  inner: typeof globalThis.fetch,
  seen: SeenRequest[]
): typeof globalThis.fetch {
  return (async (url: Parameters<typeof globalThis.fetch>[0], init?: RequestInit) => {
    const headers = new Headers(init?.headers ?? {});
    const rawBody = init && typeof init.body === "string" ? init.body : "";
    const body = rawBody ? JSON.parse(rawBody) : {};
    seen.push({
      accept: headers.get("accept") ?? "",
      session: headers.get(MCP_SESSION_HEADER),
      method: String(body.method ?? ""),
    });
    return inner(url, init);
  }) as typeof globalThis.fetch;
}

async function withStubbedFetch<T>(
  stub: typeof globalThis.fetch,
  fn: () => Promise<T>
): Promise<T> {
  const origFetch = globalThis.fetch;
  const origBaseUrl = process.env.OMNIROUTE_BASE_URL;
  globalThis.fetch = stub;
  process.env.OMNIROUTE_BASE_URL = "http://localhost:20128";
  try {
    return await fn();
  } finally {
    globalThis.fetch = origFetch;
    if (origBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = origBaseUrl;
  }
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  }) as typeof process.stdout.write;
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

test("mcpCallTool completes the Streamable HTTP handshake instead of 406ing", async () => {
  const seen: SeenRequest[] = [];
  const result = await withStubbedFetch(
    recordingFetch(
      makeMcpStreamFetch({ toolResult: { content: [{ type: "text", text: "ok" }] } }),
      seen
    ),
    async () => {
      const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
      return mcpCallTool("omniroute_get_health", {});
    }
  );

  assert.deepEqual(result, { content: [{ type: "text", text: "ok" }] });
  assert.deepEqual(
    seen.map((r) => r.method),
    ["initialize", "tools/call"],
    "the client must initialize once and then call the tool"
  );
  for (const req of seen) {
    assert.match(req.accept, /application\/json/, `${req.method} must accept application/json`);
    assert.match(req.accept, /text\/event-stream/, `${req.method} must accept text/event-stream`);
  }
  assert.equal(seen[0].session, null, "initialize opens the session, so it carries no session id");
  assert.equal(seen[1].session, "sess-test", "tools/call must echo the issued Mcp-Session-Id");
});

test("mcpCallTool surfaces a 406 from the transport instead of masking it", async () => {
  // A server that still refuses the (now correct) Accept header must produce the
  // transport's own message, so the next report is diagnosable rather than a
  // bare "MCP error".
  const alwaysNotAcceptable = (async () =>
    ({
      ok: false,
      status: 406,
      headers: new Headers({ "content-type": "application/json" }),
      json: () => Promise.resolve({}),
      text: () => Promise.resolve("Not Acceptable"),
    }) as unknown as Response) as typeof globalThis.fetch;

  await withStubbedFetch(alwaysNotAcceptable, async () => {
    const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
    await assert.rejects(
      () => mcpCallTool("omniroute_get_health", {}),
      (err: Error & { status?: number }) => {
        assert.equal(err.status, 406);
        assert.match(err.message, /initialize 1: HTTP 406/);
        return true;
      }
    );
  });
});

test("omniroute mcp call sends both Accept types on every POST", async () => {
  const seen: SeenRequest[] = [];
  let exitCode = -1;
  const out = await captureStdout(async () => {
    await withStubbedFetch(
      recordingFetch(
        makeMcpStreamFetch({ toolResult: { content: [{ type: "text", text: "healthy" }] } }),
        seen
      ),
      async () => {
        const { runMcpCallCommand } = await import("../../bin/cli/commands/mcp.mjs");
        exitCode = await runMcpCallCommand("omniroute_get_health", {}, {}, {});
      }
    );
  });

  assert.equal(exitCode, 0, `mcp call should succeed (stdout: ${out})`);
  assert.equal(out.trim(), "healthy");
  assert.deepEqual(
    seen.map((r) => r.method),
    ["initialize", "tools/call"]
  );
  for (const req of seen) {
    assert.match(req.accept, /application\/json/);
    assert.match(req.accept, /text\/event-stream/);
  }
  assert.equal(seen[1].session, "sess-test");
});
