import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conductor-a2a-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const tasksRoute = await import("../../src/app/api/a2a/tasks/route.ts");

const servers: Server[] = [];

async function enableA2A() {
  await settings.updateSettings({ a2aEnabled: true });
}

function delegationRequest(body: unknown, bearer?: string) {
  return new Request("http://localhost/api/a2a/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

const VALID_BODY = {
  skill: "conductor-cli-claude",
  messages: [{ role: "user", content: "adicione um README com a seção Sobre" }],
  metadata: { conductor: { repo: { url: "https://git.x/repo", base_ref: "dev" }, mode: "solo", model: "cc/claude-sonnet-5" } },
};

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.OMNIROUTE_API_KEY;
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.OMNIROUTE_API_KEY;
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("A2A desabilitado → 503 (mesmo gate do JSON-RPC)", async () => {
  const res = await tasksRoute.POST(delegationRequest(VALID_BODY));
  assert.equal(res.status, 503);
});

test("com OMNIROUTE_API_KEY configurada, bearer errado → 401 e bearer certo passa", async () => {
  await enableA2A();
  process.env.OMNIROUTE_API_KEY = "chave-certa";
  const denied = await tasksRoute.POST(delegationRequest(VALID_BODY, "chave-errada"));
  assert.equal(denied.status, 401);
});

test("delegação válida → 201 com o task_id do hub; requirements derivados da skill do card", async () => {
  await enableA2A();
  const bodies: unknown[] = [];
  await new Promise<void>((resolve) => {
    const server = createServer((req, res) => {
      let raw = "";
      req.on("data", (c) => (raw += c));
      req.on("end", () => {
        bodies.push(JSON.parse(raw));
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ id: "t_delegada", status: "submitted" }));
      });
    });
    servers.push(server);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      process.env.CONDUCTOR_HUB_URL = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
      resolve();
    });
  });
  const res = await tasksRoute.POST(delegationRequest(VALID_BODY));
  assert.equal(res.status, 201);
  const out = await res.json();
  assert.equal(out.conductor_task_id, "t_delegada");
  assert.equal(out.state, "submitted");
  const sent = bodies[0] as { repo: { url: string; base_ref: string }; spec: { prompt: string }; requirements: { cli: string; model: string } };
  assert.equal(sent.repo.url, "https://git.x/repo");
  assert.equal(sent.repo.base_ref, "dev");
  assert.equal(sent.spec.prompt, "adicione um README com a seção Sobre");
  assert.equal(sent.requirements.cli, "claude", "skill conductor-cli-claude vira requirements.cli");
  assert.equal(sent.requirements.model, "cc/claude-sonnet-5");
});

test("sem repo na metadata → 400 (delegação exige repo); skill não-conductor → 400", async () => {
  await enableA2A();
  const noRepo = await tasksRoute.POST(
    delegationRequest({ skill: "conductor", messages: [{ role: "user", content: "p" }] })
  );
  assert.equal(noRepo.status, 400);
  const wrongSkill = await tasksRoute.POST(
    delegationRequest({ ...VALID_BODY, skill: "smart-routing" })
  );
  assert.equal(wrongSkill.status, 400);
});
