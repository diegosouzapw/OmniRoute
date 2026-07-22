import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conductor-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const fleetRoute = await import("../../src/app/api/conductor/fleet/route.ts");
const detailRoute = await import("../../src/app/api/conductor/tasks/[id]/route.ts");
const cancelRoute = await import("../../src/app/api/conductor/tasks/[id]/cancel/route.ts");

const servers: Server[] = [];

function fakeHub(routes: Record<string, { status: number; body: unknown }>): Promise<string> {
  const server = createServer((req, res) => {
    const hit = Object.entries(routes).find(([p]) => (req.url ?? "").startsWith(p));
    res.writeHead(hit ? hit[1].status : 404, { "content-type": "application/json" });
    res.end(JSON.stringify(hit ? hit[1].body : { error: "hub: segredo interno que NÃO pode vazar" }));
  });
  servers.push(server);
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve(`http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`);
    });
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.CONDUCTOR_HUB_URL;
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("GET /api/conductor/fleet devolve snapshot whitelisted; sem hub → degradado 200", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/runners": {
      status: 200,
      body: [{ id: "r_1", token: "VAZOU?", online: true, capabilities: { name: "devbox", clis: [{ profile: "claude" }] } }],
    },
    "/v1/tasks": {
      status: 200,
      body: [{ id: "t_1", status: "working", mode: "solo", repo: { url: "https://x/r" }, assigned_runner: "r_1" }],
    },
  });
  process.env.CONDUCTOR_HUB_TOKEN = "tok";
  const res = await fleetRoute.GET(new Request("http://localhost/api/conductor/fleet"));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.offline, false);
  assert.equal(body.runners[0].name, "devbox");
  assert.equal(body.tasks[0].status, "working");
  assert.ok(!JSON.stringify(body).includes("VAZOU?"), "token de runner não vaza pela rota");

  delete process.env.CONDUCTOR_HUB_URL; // sem hub: degradado, nunca 500
  const down = await fleetRoute.GET(new Request("http://localhost/api/conductor/fleet"));
  assert.equal(down.status, 200);
  assert.equal((await down.json()).offline, true);
});

test("GET /api/conductor/tasks/[id] → 404 sanitizado quando o hub não conhece a task", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({});
  const res = await detailRoute.GET(new Request("http://localhost/api/conductor/tasks/t_x"), {
    params: Promise.resolve({ id: "t_x" }),
  });
  assert.equal(res.status, 404);
  const text = await res.text();
  assert.ok(!text.includes("segredo interno"), "corpo do hub NUNCA repassado");
});

test("POST cancel repassa recusa do hub com status, sem corpo upstream", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/tasks/t_done/cancel": { status: 409, body: { error: "segredo interno que NÃO pode vazar" } },
    "/v1/tasks/t_ok/cancel": { status: 200, body: { ok: true } },
  });
  const denied = await cancelRoute.POST(new Request("http://localhost/x", { method: "POST" }), {
    params: Promise.resolve({ id: "t_done" }),
  });
  assert.equal(denied.status, 409);
  assert.ok(!(await denied.text()).includes("segredo interno"));

  const ok = await cancelRoute.POST(new Request("http://localhost/x", { method: "POST" }), {
    params: Promise.resolve({ id: "t_ok" }),
  });
  assert.equal(ok.status, 200);
  assert.deepEqual(await ok.json(), { ok: true });
});
