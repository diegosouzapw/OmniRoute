// On a reused Responses WebSocket connection, each turn's history row measured
// latency from when the CONNECTION opened, and stored that duration as TTFT too. A later
// turn therefore reported the connection's age. Each turn now reports its own duration
// (from its response.create) and the time to its first output event.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");

const FIRST_OUTPUT_MS = 150;
const TAIL_MS = 150;
const IDLE_BETWEEN_TURNS_MS = 700;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function waitFor(predicate, timeoutMs = 4000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = predicate();
    if (value) return value;
    await sleep(10);
  }
  throw new Error("Timed out waiting for condition");
}

test("each turn on a reused connection reports its own duration and first-output time", async () => {
  const logs = [];
  const downstream = [];
  let turn = 0;

  const server = http.createServer(async (req, res) => {
    const body = JSON.parse((await readRequestBody(req)) || "{}");
    res.writeHead(200, { "content-type": "application/json" });
    if (body.action === "log") logs.push(body);
    if (body.action === "prepare") {
      res.end(
        JSON.stringify({
          ok: true,
          upstreamUrl: "wss://chatgpt.com/backend-api/codex/responses",
          headers: {},
          connectionId: "conn_1",
          provider: "codex",
          model: "gpt-5.5",
          response: { ...body.response, model: "gpt-5.5", stream: undefined },
        })
      );
      return;
    }
    res.end(JSON.stringify({ ok: true, authenticated: true, authType: "api_key", logged: true }));
  });

  const fakeUpstream = {
    send() {
      turn += 1;
      const id = `resp_${turn}`;
      const emit = (event) => fakeUpstream.onmessage?.({ data: JSON.stringify(event) });
      emit({ type: "response.created", response: { id, status: "in_progress" } });
      setTimeout(() => emit({ type: "response.output_text.delta", delta: "Hi" }), FIRST_OUTPUT_MS);
      setTimeout(
        () =>
          emit({
            type: "response.completed",
            response: { id, status: "completed", usage: { input_tokens: 3, output_tokens: 1 } },
          }),
        FIRST_OUTPUT_MS + TAIL_MS
      );
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  };

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${port}`,
    bridgeSecret: "bridge-secret",
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
    wsFactory: async () => fakeUpstream,
  });
  server.on("upgrade", async (req, socket, head) => {
    if (!(await proxy.handleUpgrade(req, socket, head)) && !socket.destroyed) socket.destroy();
  });

  const ws = new WebSocket(`ws://127.0.0.1:${port}/api/v1/responses?api_key=local-token`);
  try {
    ws.addEventListener("message", (event) => downstream.push(JSON.parse(String(event.data))));
    await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
    const send = () =>
      ws.send(JSON.stringify({ type: "response.create", model: "gpt-5.5", input: "hello" }));

    send();
    await waitFor(() => logs.length >= 1);
    await sleep(IDLE_BETWEEN_TURNS_MS);
    const secondTurnSentAt = Date.now();
    send();
    await waitFor(() => logs.length >= 2);

    const [first, second] = logs;
    for (const [label, log] of [
      ["turn 1", first],
      ["turn 2", second],
    ]) {
      assert.ok(
        log.durationMs < FIRST_OUTPUT_MS + TAIL_MS + 300,
        `${label}: durationMs ${log.durationMs} must cover only this turn`
      );
      assert.ok(
        typeof log.firstOutputMs === "number" &&
          log.firstOutputMs >= FIRST_OUTPUT_MS - 30 &&
          log.firstOutputMs <= log.durationMs - (TAIL_MS - 60),
        `${label}: firstOutputMs ${log.firstOutputMs} should mark the first output delta`
      );
    }
    assert.ok(
      Date.parse(second.startedAt) >= secondTurnSentAt - 50,
      "turn 2 starts when its response.create arrives, not when the connection opened"
    );
  } finally {
    ws.close();
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(resolve));
  }
});
