// Hard Rule #12 / CodeQL js/stack-trace-exposure + js/xss-through-exception on
// scripts/dev/responses-ws-proxy.mjs (shipped as dist/responses-ws-proxy.mjs, a
// server-ws.mjs dependency): an exception during the WebSocket upgrade was written
// verbatim into the 500 body. The client gets a fixed message and the code only.
import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");

function fakeSocket() {
  const socket = {
    writable: true,
    destroyed: false,
    written: "",
    write(chunk) {
      socket.written += String(chunk);
      return true;
    },
    end(chunk) {
      if (chunk) socket.written += String(chunk);
      socket.writable = false;
    },
    destroy() {
      socket.destroyed = true;
    },
    on() {},
  };
  return socket;
}

test("an upgrade failure never echoes the exception text to the client", async () => {
  const leak =
    "ENOENT: open '/home/operator/.omniroute/secret.json'\n    at Object.<anonymous> (/app/x.js:1:1)";
  const proxy = createResponsesWsProxy({
    baseUrl: "http://127.0.0.1:1",
    bridgeSecret: "bridge-secret",
    wsFactory: () => {
      throw new Error("not reached");
    },
    fetchImpl: async () => {
      throw new Error(leak);
    },
  });
  const socket = fakeSocket();
  const handled = await proxy.handleUpgrade(
    {
      url: "/v1/responses",
      headers: { upgrade: "websocket", "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==" },
      socket: { remoteAddress: "127.0.0.1" },
    },
    socket,
    Buffer.alloc(0)
  );

  assert.equal(handled, true);
  assert.match(socket.written, /^HTTP\/1\.1 500 /);
  const body = JSON.parse(socket.written.slice(socket.written.indexOf("\r\n\r\n") + 4));
  assert.equal(body.error.code, "responses_websocket_proxy_failed");
  assert.equal(body.error.message, "Responses WebSocket proxy failed");
  assert.ok(!socket.written.includes("/home/operator"), "no filesystem path in the response");
  assert.ok(!socket.written.includes("at Object."), "no stack frame in the response");
});

test(
  "an upstream connect failure reaches the client as a fixed message",
  { timeout: 20000 },
  async () => {
    const http = await import("node:http");
    const leak = "connect ECONNREFUSED via http://user:s3cret@10.0.0.9:3128";
    const downstream = [];
    const server = http.createServer(async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      res.writeHead(200, { "content-type": "application/json" });
      if (body.action === "authenticate") {
        res.end(JSON.stringify({ ok: true, authenticated: true, authType: "api_key" }));
      } else if (body.action === "prepare") {
        res.end(
          JSON.stringify({
            ok: true,
            upstreamUrl: "wss://chatgpt.com/backend-api/codex/responses",
            headers: {},
            connectionId: "conn_1",
            provider: "codex",
            model: "gpt-5.5",
            response: { ...body.response, model: "gpt-5.5" },
          })
        );
      } else {
        res.end(JSON.stringify({ ok: true }));
      }
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const port = server.address().port;
    const proxy = createResponsesWsProxy({
      baseUrl: `http://127.0.0.1:${port}`,
      bridgeSecret: "bridge-secret",
      pingIntervalMs: 1000,
      idleTimeoutMs: 10000,
      wsFactory: async () => {
        throw new Error(leak);
      },
    });
    const sockets = [];
    server.on("upgrade", async (req, socket, head) => {
      sockets.push(socket);
      const handled = await proxy.handleUpgrade(req, socket, head);
      if (!handled && !socket.destroyed) socket.destroy();
    });

    const ws = new WebSocket(`ws://127.0.0.1:${port}/api/v1/responses?api_key=local-token`);
    ws.addEventListener("message", (event) => downstream.push(JSON.parse(String(event.data))));
    await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
    ws.send(JSON.stringify({ type: "response.create", model: "gpt-5.5", input: "hi" }));

    const started = Date.now();
    while (!downstream.some((m) => m.type === "response.failed") && Date.now() - started < 3000) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const failed = downstream.find((m) => m.type === "response.failed");
    assert.ok(failed, "the client is told the response failed");
    assert.equal(failed.response.error.message, "Upstream WebSocket connection failed");
    assert.ok(!JSON.stringify(downstream).includes("s3cret"), "no proxy credentials in the frame");
    assert.ok(!JSON.stringify(downstream).includes("10.0.0.9"), "no internal address in the frame");
    ws.close();
    for (const socket of sockets) socket.destroy();
    await new Promise((resolve) => server.close(resolve));
  }
);
