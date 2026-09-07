import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conductor-create-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const createRoute = await import("../../src/app/api/conductor/tasks/route.ts");

const servers: Server[] = [];

function fakeHub(routes: Record<string, { status: number; body: unknown }>): Promise<string> {
  const server = createServer((req, res) => {
    const hit = Object.entries(routes).find(([p]) => (req.url ?? "").startsWith(p));
    res.writeHead(hit ? hit[1].status : 404, { "content-type": "application/json" });
    res.end(
      JSON.stringify(hit ? hit[1].body : { error: "hub: segredo interno que NÃO pode vazar" })
    );
  });
  servers.push(server);
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve(`http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`);
    });
  });
}

function postJson(body: unknown): Request {
  return new Request("http://localhost/api/conductor/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("route: requireManagementAuth antes de criar a task no hub", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/conductor/tasks/route.ts"),
    "utf8"
  );
  const authAt = src.indexOf("requireManagementAuth(");
  assert.ok(authAt > 0, "handler chama requireManagementAuth");
  assert.match(src, /if \(authError\) return authError;/, "curto-circuito no erro de auth");
  const proxyAt = src.indexOf("createConductorTask(");
  assert.ok(proxyAt > authAt, "proxy ao hub só depois do gate de auth");
  assert.ok(
    !src.includes("CONDUCTOR_HUB_TOKEN"),
    "token nunca manuseado na rota (vive no hubProxy)"
  );
});

test("POST /api/conductor/tasks: body válido + hub ok → 201 {task_id}", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/tasks": { status: 201, body: { id: "t_repeat_1" } },
  });
  process.env.CONDUCTOR_HUB_TOKEN = "tok";

  const res = await createRoute.POST(
    postJson({ repoUrl: "https://git.x/repo", prompt: "refaça isso" })
  );
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { task_id: "t_repeat_1" });
});

test("POST /api/conductor/tasks: hub recusa (502) → status espelhado, sem corpo upstream", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/tasks": { status: 502, body: { error: "segredo interno que NÃO pode vazar" } },
  });
  process.env.CONDUCTOR_HUB_TOKEN = "tok";

  const res = await createRoute.POST(
    postJson({ repoUrl: "https://git.x/repo", prompt: "refaça isso" })
  );
  assert.equal(res.status, 502);
  const text = await res.text();
  assert.ok(!text.includes("segredo interno"), "corpo do hub NUNCA repassado (HR#12)");
});

test("POST /api/conductor/tasks: body inválido (sem prompt) → 400", async () => {
  const res = await createRoute.POST(postJson({ repoUrl: "https://git.x/repo" }));
  assert.equal(res.status, 400);
});

test("POST /api/conductor/tasks: body inválido (sem repoUrl) → 400", async () => {
  const res = await createRoute.POST(postJson({ prompt: "refaça isso" }));
  assert.equal(res.status, 400);
});

test("POST /api/conductor/tasks: JSON malformado → 400", async () => {
  const res = await createRoute.POST(
    new Request("http://localhost/api/conductor/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not json",
    })
  );
  assert.equal(res.status, 400);
});

/**
 * Review finding (Minor A): the hub's status was forwarded verbatim as OUR response status.
 * `Response.json()` throws a `RangeError` for anything outside 200-599, and a 3xx/2xx is
 * meaningless as an error status anyway — so anything outside 400-599 must become a 502
 * instead of an unhandled throw. A 302 with no `Location` is returned as-is by fetch (there
 * is nothing to follow), which reproduces the out-of-band status without a fake fetch impl.
 */
test("POST /api/conductor/tasks: status fora de 400-599 vindo do hub é clampado para 502", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/tasks": { status: 302, body: { error: "segredo interno que NÃO pode vazar" } },
  });
  process.env.CONDUCTOR_HUB_TOKEN = "tok";

  const res = await createRoute.POST(
    postJson({ repoUrl: "https://git.x/repo", prompt: "refaça isso" })
  );
  assert.equal(res.status, 502);
  const text = await res.text();
  assert.ok(!text.includes("segredo interno"), "corpo do hub NUNCA repassado (HR#12)");
});

test("POST /api/conductor/tasks: status 4xx/5xx legítimo do hub continua espelhado", async () => {
  process.env.CONDUCTOR_HUB_URL = await fakeHub({
    "/v1/tasks": { status: 429, body: { error: "rate limited" } },
  });
  process.env.CONDUCTOR_HUB_TOKEN = "tok";

  const res = await createRoute.POST(
    postJson({ repoUrl: "https://git.x/repo", prompt: "refaça isso" })
  );
  assert.equal(res.status, 429);
});
