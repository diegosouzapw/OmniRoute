import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const { createResponsesWsProxy } = await import("../../scripts/responses-ws-proxy.mjs");

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve(address.port);
    });
  });
}

function close(server) {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function waitFor(predicate, { timeoutMs = 3000, intervalMs = 10 } = {}) {
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

test("responses ws proxy prepares and forwards OpenAI Responses websocket events", async () => {
  const internalRequests = [];
  const upstreamSends = [];
  const downstreamMessages = [];

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
            response: {
              ...body.response,
              model: "gpt-5.5",
              stream: undefined,
            },
          })
        );
        return;
      }
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });

  const fakeUpstream = {
    send(data) {
      upstreamSends.push(JSON.parse(data));
      setTimeout(() => {
        fakeUpstream.onmessage?.({
          data: JSON.stringify({
            type: "response.completed",
            response: { id: "resp_1", status: "completed" },
          }),
        });
      }, 10);
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  };

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const proxy = createResponsesWsProxy({
    baseUrl,
    bridgeSecret: "bridge-secret",
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
    wsFactory: async (url, options) => {
      assert.equal(url, "wss://chatgpt.com/backend-api/codex/responses");
      assert.equal(options.headers.Authorization, "Bearer upstream-token");
      return fakeUpstream;
    },
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

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  ws.send(
    JSON.stringify({
      type: "response.create",
      model: "gpt-5.5",
      input: [{ role: "user", content: "hello" }],
      reasoning: { effort: "xhigh" },
    })
  );

  await waitFor(() => downstreamMessages.find((entry) => entry.type === "response.completed"));

  assert.equal(internalRequests[0].action, "authenticate");
  assert.equal(internalRequests[1].action, "prepare");
  assert.equal(upstreamSends.length, 1);
  assert.equal(upstreamSends[0].type, "response.create");
  assert.equal(upstreamSends[0].model, "gpt-5.5");
  assert.equal(upstreamSends[0].reasoning.effort, "xhigh");
  assert.equal("stream" in upstreamSends[0], false);

  ws.close();
  await close(server);
});

test("responses ws proxy serializes client frames while upstream prepare is pending", async () => {
  const internalRequests = [];
  const upstreamSends = [];

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
        await new Promise((resolve) => setTimeout(resolve, 50));
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            ok: true,
            upstreamUrl: "wss://chatgpt.com/backend-api/codex/responses",
            headers: { Authorization: "Bearer upstream-token" },
            response: { ...body.response, model: "gpt-5.5", stream: undefined },
          })
        );
        return;
      }
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });

  const fakeUpstream = {
    send(data) {
      upstreamSends.push(JSON.parse(data));
    },
    close() {},
    onmessage: null,
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
  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

  ws.send(
    JSON.stringify({
      type: "response.create",
      model: "gpt-5.5",
      input: [{ role: "user", content: "first" }],
    })
  );
  ws.send(JSON.stringify({ type: "response.cancel", response_id: "resp_1" }));

  await waitFor(() => upstreamSends.length === 2);

  assert.equal(internalRequests.filter((entry) => entry.action === "prepare").length, 1);
  assert.equal(upstreamSends[0].type, "response.create");
  assert.equal(upstreamSends[0].input[0].content, "first");
  assert.equal(upstreamSends[1].type, "response.cancel");
  assert.equal(upstreamSends[1].response_id, "resp_1");

  ws.close();
  await close(server);
});

test("responses ws proxy closes oversized client messages with 1009", async () => {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    if (url.pathname === "/api/internal/codex-responses-ws") {
      const body = JSON.parse((await readRequestBody(req)) || "{}");
      if (body.action === "authenticate") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true, authenticated: true, authType: "api_key" }));
        return;
      }
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });

  const port = await listen(server);
  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${port}`,
    bridgeSecret: "bridge-secret",
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
    maxMessageBytes: 64,
    wsFactory: async () => {
      throw new Error("oversized input should close before upstream connect");
    },
  });

  server.on("upgrade", async (req, socket, head) => {
    const handled = await proxy.handleUpgrade(req, socket, head);
    if (!handled && !socket.destroyed) {
      socket.destroy();
    }
  });

  const ws = new WebSocket(`ws://127.0.0.1:${port}/api/v1/responses?api_key=local-token`);
  const closed = new Promise((resolve) => ws.addEventListener("close", resolve, { once: true }));
  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

  ws.send(
    JSON.stringify({
      type: "response.create",
      model: "gpt-5.5",
      input: [{ role: "user", content: "x".repeat(128) }],
    })
  );

  const event = await closed;
  assert.equal(event.code, 1009);

  await close(server);
});
