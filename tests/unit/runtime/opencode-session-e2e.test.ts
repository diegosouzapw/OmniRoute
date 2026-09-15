import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

// #audit-x-opencode-session — execute()-level end-to-end proof.
//
// The unit tests (opencode-session-headers.audit.test.ts) call buildHeaders
// directly. This file drives the REAL execute() path — OpencodeExecutor.execute →
// BaseExecutor.execute → buildUrl + buildHeaders(with body) → fetch — against a
// local echo upstream, so the base.ts call-site wiring (body reaching
// forwardOpencodeClientHeaders) is proven, not assumed. No upstream traffic.

const { OpencodeExecutor } = await import("../../../open-sse/executors/opencode.ts");

type Captured = { headers: Record<string, string>; body: unknown };

async function withEchoServer(
  fn: (port: number, captured: Captured[]) => Promise<void>
): Promise<void> {
  const captured: Captured[] = [];
  const server: Server = createServer((req, res) => {
    const headers: Record<string, string> = {};
    for (const [k, v] of Object.entries(req.headers)) headers[k] = String(v);
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      captured.push({ headers, body: raw ? JSON.parse(raw) : null });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          id: "chatcmpl-echo",
          object: "chat.completion",
          choices: [
            { index: 0, finish_reason: "stop", message: { role: "assistant", content: "ok" } },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as AddressInfo).port;
  try {
    await fn(port, captured);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

const AGENT_BODY = {
  model: "kimi-k2.6",
  messages: [{ role: "user", content: "echo turn one" }],
  system: "You are a helpful agent.",
};

test("execute(): synthesized x-opencode-session reaches the outbound request (09/06 safe)", async () => {
  await withEchoServer(async (port, captured) => {
    const executor = new OpencodeExecutor("opencode-go");
    (executor as unknown as { config: { baseUrl: string } }).config.baseUrl =
      `http://127.0.0.1:${port}/v1`;

    await executor
      .execute({
        model: "kimi-k2.6",
        body: AGENT_BODY,
        stream: false,
        credentials: { apiKey: "test-key-0001" } as any,
        clientHeaders: {},
      } as any)
      .catch(() => undefined); // response parsing details irrelevant — headers already sent

    assert.equal(captured.length, 1, "echo server must receive exactly one request");
    const sent = captured[0].headers;
    assert.ok(sent["x-opencode-session"], "outbound request missing x-opencode-session");
    // body present → conversation fingerprint (generateSessionId, 16 hex)
    assert.match(sent["x-opencode-session"], /^[0-9a-f]{16}$/);
    assert.ok(sent["x-opencode-request"], "outbound request missing x-opencode-request");
    assert.equal(sent["authorization"], "Bearer test-key-0001");
  });
});

test("execute(): client session is forwarded, not replaced (cache affinity)", async () => {
  await withEchoServer(async (port, captured) => {
    const executor = new OpencodeExecutor("opencode-go");
    (executor as unknown as { config: { baseUrl: string } }).config.baseUrl =
      `http://127.0.0.1:${port}/v1`;

    await executor
      .execute({
        model: "kimi-k2.6",
        body: AGENT_BODY,
        stream: false,
        credentials: { apiKey: "test-key-0001" } as any,
        clientHeaders: { "x-opencode-session": "client-session-xyz" },
      } as any)
      .catch(() => undefined);

    assert.equal(captured.length, 1);
    assert.equal(captured[0].headers["x-opencode-session"], "client-session-xyz");
  });
});

test("execute(): same conversation prefix → same synthesized session across turns (prompt caching)", async () => {
  await withEchoServer(async (port, captured) => {
    const executor = new OpencodeExecutor("opencode-go");
    (executor as unknown as { config: { baseUrl: string } }).config.baseUrl =
      `http://127.0.0.1:${port}/v1`;

    // Turn 1: user message. Turn 2: same conversation grown by an assistant
    // reply + a new user message (first user message unchanged → same
    // fingerprint, exactly how a real agent loop drives consecutive turns).
    await executor
      .execute({
        model: "kimi-k2.6",
        body: { ...AGENT_BODY, messages: [{ role: "user", content: "echo turn one" }] },
        stream: false,
        credentials: { apiKey: "test-key-0001" } as any,
        clientHeaders: {},
      } as any)
      .catch(() => undefined);
    await executor
      .execute({
        model: "kimi-k2.6",
        body: {
          ...AGENT_BODY,
          messages: [
            { role: "user", content: "echo turn one" },
            { role: "assistant", content: "ok" },
            { role: "user", content: "echo turn two" },
          ],
        },
        stream: false,
        credentials: { apiKey: "test-key-0001" } as any,
        clientHeaders: {},
      } as any)
      .catch(() => undefined);

    assert.equal(captured.length, 2);
    // Same conversation → SAME session upstream (prompt-cache affinity)
    assert.equal(
      captured[0].headers["x-opencode-session"],
      captured[1].headers["x-opencode-session"]
    );

    // Different conversation (different first user message) → different session
    await executor
      .execute({
        model: "kimi-k2.6",
        body: { ...AGENT_BODY, messages: [{ role: "user", content: "a different chat" }] },
        stream: false,
        credentials: { apiKey: "test-key-0001" } as any,
        clientHeaders: {},
      } as any)
      .catch(() => undefined);
    assert.equal(captured.length, 3);
    assert.notEqual(
      captured[0].headers["x-opencode-session"],
      captured[2].headers["x-opencode-session"]
    );
  });
});
