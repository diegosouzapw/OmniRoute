import test from "node:test";
import assert from "node:assert/strict";

import { createConductorTask } from "../../src/lib/conductor/hubProxy.ts";

function fakeHub(body: unknown, status = 201) {
  const calls: { url: string; method: string; auth: string | null; body: unknown }[] = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({
      url: String(url),
      method: init?.method ?? "GET",
      auth: (init?.headers as Record<string, string> | undefined)?.authorization ?? null,
      body: JSON.parse(String(init?.body ?? "{}")),
    });
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
  return { impl, calls };
}

test.beforeEach(() => {
  process.env.CONDUCTOR_HUB_URL = "http://hub.test:7910";
  process.env.CONDUCTOR_HUB_TOKEN = "tok-hub";
  delete process.env.CONDUCTOR_ORCHESTRATOR_TOKEN;
});

test.after(() => {
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
  delete process.env.CONDUCTOR_ORCHESTRATOR_TOKEN;
});

test("traduz a delegação A2A no POST /v1/tasks do hub (shape exato do contrato)", async () => {
  const { impl, calls } = fakeHub({ id: "t_novo", status: "submitted" });
  const r = await createConductorTask(
    { repoUrl: "https://git.x/repo", baseRef: "dev", prompt: "adicione um README", mode: "council-3", cli: "claude", model: "cc/claude-sonnet-5" },
    { fetchImpl: impl }
  );
  assert.deepEqual(r, { ok: true, status: 201, task_id: "t_novo" });
  assert.equal(calls[0].url, "http://hub.test:7910/v1/tasks");
  assert.equal(calls[0].method, "POST");
  assert.deepEqual(calls[0].body, {
    repo: { url: "https://git.x/repo", base_ref: "dev" },
    spec: { prompt: "adicione um README" },
    mode: "council-3",
    requirements: { cli: "claude", model: "cc/claude-sonnet-5" },
  });
});

test("defaults: base_ref main, mode solo, sem requirements quando cli/model ausentes", async () => {
  const { impl, calls } = fakeHub({ id: "t_d", status: "submitted" });
  await createConductorTask({ repoUrl: "https://git.x/r", prompt: "p" }, { fetchImpl: impl });
  assert.deepEqual(calls[0].body, { repo: { url: "https://git.x/r", base_ref: "main" }, spec: { prompt: "p" }, mode: "solo" });
});

test("credencial: prefere CONDUCTOR_ORCHESTRATOR_TOKEN; fallback é o token do hub", async () => {
  const a = fakeHub({ id: "t_1" });
  await createConductorTask({ repoUrl: "https://x/r", prompt: "p" }, { fetchImpl: a.impl });
  assert.equal(a.calls[0].auth, "Bearer tok-hub");
  process.env.CONDUCTOR_ORCHESTRATOR_TOKEN = "tok-orch";
  const b = fakeHub({ id: "t_2" });
  await createConductorTask({ repoUrl: "https://x/r", prompt: "p" }, { fetchImpl: b.impl });
  assert.equal(b.calls[0].auth, "Bearer tok-orch");
});

test("recusa do hub → {ok:false, status} sem lançar nem vazar corpo; env ausente → 503", async () => {
  const { impl } = fakeHub({ error: "segredo do hub" }, 422);
  const r = await createConductorTask({ repoUrl: "https://x/r", prompt: "p" }, { fetchImpl: impl });
  assert.deepEqual(r, { ok: false, status: 422 });
  delete process.env.CONDUCTOR_HUB_URL;
  assert.deepEqual(await createConductorTask({ repoUrl: "https://x/r", prompt: "p" }, {}), { ok: false, status: 503 });
});
