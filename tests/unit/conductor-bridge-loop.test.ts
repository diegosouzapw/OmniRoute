import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";

import { A2ATaskManager } from "../../src/lib/a2a/taskManager.ts";
import { createConductorBridge } from "../../src/lib/conductor/bridge.ts";

const managers: A2ATaskManager[] = [];
const servers: Server[] = [];
const bridges: { stop(): void }[] = [];

function createManager() {
  const manager = new A2ATaskManager(5);
  managers.push(manager);
  return manager;
}

test.afterEach(async () => {
  while (bridges.length > 0) bridges.pop()?.stop();
  while (managers.length > 0) managers.pop()?.destroy();
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

// Formato REAL do SSE do hub (verificado ao vivo 2026-07-22): id/type nos campos do
// frame; o `data:` carrega só {ts, payload}.
const sse = (id: number, type: string, payload: Record<string, unknown>) =>
  `id: ${id}\nevent: ${type}\ndata: ${JSON.stringify({ ts: "2026-07-22T00:00:00Z", payload })}\n\n`;

interface FakeHub {
  url: string;
  requests: { lastEventId: string | null; auth: string | null }[];
}

/** Fake hub SSE: each handler invocation pops the next script entry {events, thenClose}. */
function fakeHub(script: { events: string[]; thenClose: boolean }[]): Promise<FakeHub> {
  const requests: FakeHub["requests"] = [];
  let call = 0;
  const server = createServer((req, res) => {
    const u = new URL(req.url ?? "/", "http://x");
    requests.push({ lastEventId: u.searchParams.get("last_event_id"), auth: req.headers.authorization ?? null });
    const step = script[Math.min(call, script.length - 1)];
    call++;
    res.writeHead(200, { "content-type": "text/event-stream" });
    for (const e of step.events) res.write(e);
    if (step.thenClose) res.end();
    // senão: conexão fica aberta (o teste encerra via bridge.stop() + server.close())
  });
  servers.push(server);
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ url: `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`, requests });
    });
  });
}

function waitFor(cond: () => boolean, ms = 3000): Promise<void> {
  const deadline = Date.now() + ms;
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (cond()) return resolve();
      if (Date.now() > deadline) return reject(new Error("waitFor timeout"));
      setTimeout(tick, 10);
    };
    tick();
  });
}

test("mirrors events from the hub SSE, advancing the injected cursor (incl. canceled→cancelled)", async () => {
  const hub = await fakeHub([
    {
      events: [
        sse(1, "task.created", { task_id: "t_x", mode: "solo", from: "orch" }),
        sse(2, "task.scheduled", { task_id: "t_x", runner_id: "r_1" }),
        sse(3, "task.canceled", { task_id: "t_x" }),
      ],
      thenClose: false,
    },
  ]);
  const tm = createManager();
  let cursor: string | null = null;
  const bridge = createConductorBridge({
    hubUrl: hub.url,
    token: "tok-spk",
    tm,
    cursor: { get: () => cursor, set: (v) => (cursor = v) },
    backoffBaseMs: 10,
  });
  bridges.push(bridge);
  bridge.start();
  await waitFor(() => cursor === "3");
  assert.equal(hub.requests[0].lastEventId, "0", "sem cursor persistido, começa do 0 (replay total)");
  assert.equal(hub.requests[0].auth, "Bearer tok-spk");
  const tasks = tm.listTasks();
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].state, "cancelled");
});

test("reconnects with backoff and resumes from the persisted cursor", async () => {
  const hub = await fakeHub([
    { events: [sse(1, "task.created", { task_id: "t_r", mode: "solo", from: "o" })], thenClose: true },
    { events: [sse(2, "task.completed", { task_id: "t_r", manifest: { summary: "ok" } })], thenClose: false },
  ]);
  const tm = createManager();
  let cursor: string | null = null;
  const bridge = createConductorBridge({
    hubUrl: hub.url,
    token: "tok",
    tm,
    cursor: { get: () => cursor, set: (v) => (cursor = v) },
    backoffBaseMs: 10,
  });
  bridges.push(bridge);
  bridge.start();
  await waitFor(() => hub.requests.length >= 2 && cursor === "2");
  assert.equal(hub.requests[1].lastEventId, "1", "reconexão retoma do cursor persistido");
  assert.equal(tm.listTasks()[0].state, "completed");
});

test("stop() aborts and never reconnects", async () => {
  const hub = await fakeHub([{ events: [sse(1, "task.created", { task_id: "t_s", mode: "solo", from: "o" })], thenClose: true }]);
  const tm = createManager();
  let cursor: string | null = null;
  const bridge = createConductorBridge({
    hubUrl: hub.url,
    token: "tok",
    tm,
    cursor: { get: () => cursor, set: (v) => (cursor = v) },
    backoffBaseMs: 10,
  });
  bridges.push(bridge);
  bridge.start();
  await waitFor(() => cursor === "1");
  bridge.stop();
  const before = hub.requests.length;
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(hub.requests.length, before, "nenhuma reconexão após stop()");
  assert.equal(bridge.state(), "stopped");
});
