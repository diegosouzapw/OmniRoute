import test from "node:test";
import assert from "node:assert/strict";

import {
  getFleetSnapshot,
  getConductorTaskDetail,
  cancelConductorTask,
} from "../../src/lib/conductor/hubProxy.ts";

const RUNNERS = [
  {
    id: "r_1",
    token: "NUNCA-VAZAR",
    online: true,
    draining: false,
    capabilities: { name: "devbox", clis: [{ profile: "claude" }, { profile: "codex" }], skills: [] },
  },
];

const TASKS = [
  {
    id: "t_1",
    status: "completed",
    mode: "solo",
    from: "orchestrator",
    repo: { url: "https://git.x/repo", base_ref: "main" },
    spec: { prompt: "faz algo" },
    assigned_runner: "r_1",
    manifest: { summary: "feito", branch: "task/t_1", error: null },
    council: null,
    created_at: "2026-07-22T00:00:00Z",
    updated_at: "2026-07-22T00:01:00Z",
  },
  {
    id: "t_2",
    status: "working",
    mode: "council-3",
    from: "orchestrator",
    repo: { url: "https://git.x/repo", base_ref: "main" },
    spec: { prompt: "outra" },
    assigned_runner: null,
    manifest: null,
    council: { candidate_task_ids: ["t_2a", "t_2b"] },
    created_at: "2026-07-22T00:02:00Z",
    updated_at: "2026-07-22T00:02:30Z",
  },
];

function fakeHub(routes: Record<string, { status: number; body: unknown }>) {
  const calls: { url: string; method: string; auth: string | null }[] = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    calls.push({
      url: u,
      method: init?.method ?? "GET",
      auth: (init?.headers as Record<string, string> | undefined)?.authorization ?? null,
    });
    const hit = Object.entries(routes).find(([path]) => u.includes(path));
    if (!hit) return new Response("{}", { status: 404 });
    return new Response(JSON.stringify(hit[1].body), { status: hit[1].status });
  }) as typeof fetch;
  return { impl, calls };
}

test.beforeEach(() => {
  process.env.CONDUCTOR_HUB_URL = "http://hub.test:7910";
  process.env.CONDUCTOR_HUB_TOKEN = "tok-secreto";
});

test.after(() => {
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test("snapshot: runners e tasks sanitizados (whitelist — token do runner NUNCA passa)", async () => {
  const { impl, calls } = fakeHub({
    "/v1/runners": { status: 200, body: RUNNERS },
    "/v1/tasks": { status: 200, body: TASKS },
  });
  const snap = await getFleetSnapshot({ fetchImpl: impl });
  assert.equal(snap.offline, false);
  assert.deepEqual(snap.runners, [
    { id: "r_1", name: "devbox", clis: ["claude", "codex"], online: true, draining: false },
  ]);
  assert.equal(snap.tasks.length, 2);
  assert.deepEqual(snap.tasks[0], {
    id: "t_1",
    status: "completed",
    mode: "solo",
    repo: "https://git.x/repo",
    runner: "r_1",
    summary: "feito",
    branch: "task/t_1",
    error: null,
    updated_at: "2026-07-22T00:01:00Z",
  });
  assert.ok(!JSON.stringify(snap).includes("NUNCA-VAZAR"), "token de runner não vaza");
  assert.ok(!JSON.stringify(snap).includes("tok-secreto"), "token do hub não vaza");
  assert.equal(calls.every((c) => c.auth === "Bearer tok-secreto"), true, "proxy autentica no hub");
});

test("snapshot: hub fora do ar → degradado {offline:true} sem lançar", async () => {
  const failing = (async () => {
    throw new Error("ECONNREFUSED");
  }) as unknown as typeof fetch;
  const snap = await getFleetSnapshot({ fetchImpl: failing });
  assert.deepEqual(snap, { offline: true, runners: [], tasks: [] });
});

test("snapshot: env ausente → degradado sem fetch", async () => {
  delete process.env.CONDUCTOR_HUB_URL;
  const { impl, calls } = fakeHub({});
  const snap = await getFleetSnapshot({ fetchImpl: impl });
  assert.equal(snap.offline, true);
  assert.equal(calls.length, 0);
});

test("detalhe: manifest e council passam; spec.prompt vem; campos fora da whitelist não", async () => {
  const { impl } = fakeHub({ "/v1/tasks/t_2": { status: 200, body: TASKS[1] } });
  const detail = await getConductorTaskDetail("t_2", { fetchImpl: impl });
  assert.ok(detail);
  assert.equal(detail!.id, "t_2");
  assert.equal(detail!.prompt, "outra");
  assert.deepEqual(detail!.council, { candidate_task_ids: ["t_2a", "t_2b"] });
  assert.equal(detail!.base_ref, "main");
});

test("detalhe: 404 do hub → null", async () => {
  const { impl } = fakeHub({});
  assert.equal(await getConductorTaskDetail("t_x", { fetchImpl: impl }), null);
});

test("cancelar: POST no hub e repassa o status", async () => {
  const { impl, calls } = fakeHub({ "/v1/tasks/t_1/cancel": { status: 200, body: { ok: true } } });
  const r = await cancelConductorTask("t_1", { fetchImpl: impl });
  assert.deepEqual(r, { ok: true, status: 200 });
  assert.equal(calls[0].method, "POST");
  const miss = await cancelConductorTask("t_zzz", { fetchImpl: fakeHub({}).impl });
  assert.deepEqual(miss, { ok: false, status: 404 });
});
