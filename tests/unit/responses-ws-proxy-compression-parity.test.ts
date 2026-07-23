// Regression test for issue #8052: the Codex Responses-over-WebSocket bridge bypassed the
// whole prompt-compression pipeline (and its analytics writes).
//
// Two distinct gaps made this happen:
//   1. `prepare()` in src/app/api/internal/codex-responses-ws/route.ts never called anything
//      from open-sse/services/compression/* — unlike the HTTP/SSE path (chatCore.ts), which
//      runs every request through applyCompressionAsync + writes compression_analytics.
//   2. scripts/dev/responses-ws-proxy.mjs memoized the upstream connection in
//      `ensureUpstream()` — it only called the internal "prepare" action on the FIRST
//      `response.create` of a WS session. `forwardClientMessage()` forwarded every
//      subsequent turn on a reused connection straight to the upstream socket, so even if
//      compression were wired into `prepare()`, only the first logical turn of a multi-turn
//      WS session would ever see it.
//
// This test proves gap #2 by execution: it opens ONE WebSocket via createResponsesWsProxy(),
// sends two `response.create` messages sequentially on the SAME connection (mirroring the
// issue's "Codex clients may reuse one WebSocket connection for multiple logical turns" repro
// step), and asserts each logical turn triggers its own internal "prepare" call — the only
// place a per-turn compression pass can run.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");

function listen(server: http.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve((address as { port: number }).port);
    });
  });
}

function close(server: http.Server): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

function readRequestBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function waitFor<T>(
  predicate: () => T | undefined | null | false,
  { timeoutMs = 3000, intervalMs = 10 }: { timeoutMs?: number; intervalMs?: number } = {}
): Promise<T> {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      try {
        const value = predicate();
        if (value) {
          clearInterval(timer);
          resolve(value);
          return;
        }
        if (Date.now() - startedAt >= timeoutMs) {
          clearInterval(timer);
          reject(new Error("Timed out waiting for condition"));
        }
      } catch (error) {
        clearInterval(timer);
        reject(error);
      }
    }, intervalMs);
  });
}

test("#8052: every logical response.create turn on a reused WS should hit the internal prepare/compression path", async () => {
  const internalRequests: Array<Record<string, unknown>> = [];
  const downstreamMessages: Array<Record<string, unknown>> = [];
  const upstreamSends: Array<Record<string, unknown>> = [];

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    if (url.pathname === "/api/internal/codex-responses-ws") {
      const body = JSON.parse((await readRequestBody(req)) || "{}");
      internalRequests.push(body);

      if (body.action === "authenticate") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true, authenticated: true, authType: "api_key" }));
        return;
      }

      if (body.action === "prepare") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            ok: true,
            upstreamUrl: "wss://chatgpt.com/backend-api/codex/responses",
            headers: { Authorization: "Bearer upstream-token" },
            connectionId: "conn_1",
            provider: "codex",
            account: "codex@example.com",
            model: "gpt-5.4-mini",
            response: { ...body.response, model: "gpt-5.4-mini", stream: undefined },
          })
        );
        return;
      }

      if (body.action === "log") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true, logged: true }));
        return;
      }
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });

  let turn = 0;
  const fakeUpstream = {
    send(data: string) {
      const parsed = JSON.parse(data);
      upstreamSends.push(parsed);
      if (parsed.type !== "response.create") return;
      turn += 1;
      const currentTurn = turn;
      setTimeout(() => {
        fakeUpstream.onmessage?.({
          data: JSON.stringify({
            type: "response.completed",
            response: {
              id: `resp_${currentTurn}`,
              model: "gpt-5.4-mini",
              status: "completed",
              usage: {
                input_tokens: 10 * currentTurn,
                output_tokens: 20 * currentTurn,
                total_tokens: 30 * currentTurn,
              },
            },
          }),
        });
      }, 10);
    },
    close() {},
    onmessage: null as ((event: { data: string }) => void) | null,
    onerror: null,
    onclose: null,
  };

  const port = await listen(server);
  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${port}`,
    bridgeSecret: "bridge-secret",
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
    wsFactory: async () => fakeUpstream,
  });

  server.on("upgrade", async (req, socket, head) => {
    const handled = await proxy.handleUpgrade(req, socket, head);
    if (!handled && !socket.destroyed) {
      socket.destroy();
    }
  });

  const ws = new WebSocket(`ws://127.0.0.1:${port}/api/v1/responses?api_key=local-token`);
  ws.addEventListener("message", (event) => {
    downstreamMessages.push(JSON.parse(String(event.data)));
  });

  try {
    await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

    // Turn 1 on this single, reused WebSocket connection.
    ws.send(
      JSON.stringify({
        type: "response.create",
        model: "gpt-5.4-mini",
        input: [{ role: "user", content: "Reply with exactly: pong1" }],
        stream: true,
      })
    );

    await waitFor(
      () => downstreamMessages.filter((entry) => entry.type === "response.completed").length === 1
    );

    // Turn 2 on the SAME WebSocket connection (client reuse), per the issue's repro:
    // "Codex clients may reuse one WebSocket connection for multiple logical turns."
    ws.send(
      JSON.stringify({
        type: "response.create",
        model: "gpt-5.4-mini",
        input: [{ role: "user", content: "Reply with exactly: pong2" }],
        stream: true,
      })
    );

    await waitFor(
      () => downstreamMessages.filter((entry) => entry.type === "response.completed").length === 2
    );

    const prepareRequests = internalRequests.filter((entry) => entry.action === "prepare");

    assert.equal(
      prepareRequests.length,
      2,
      `expected 2 internal "prepare" calls (one per logical response.create turn), got ${prepareRequests.length} — ` +
        "the second turn on a reused WebSocket connection bypasses prepare()/compression entirely (#8052)"
    );
  } finally {
    ws.close();
    await close(server);
  }
});
