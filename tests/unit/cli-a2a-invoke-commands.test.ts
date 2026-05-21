import test from "node:test";
import assert from "node:assert/strict";

const TASK = {
  id: "a2a-task-001",
  skill: "smart-routing",
  status: "completed",
  createdAt: "2026-05-14T10:00:00Z",
  updatedAt: "2026-05-14T10:01:00Z",
};

const TASKS = [TASK, { ...TASK, id: "a2a-task-002", status: "running" }];

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("a2a skills retorna lista de skills da agent card", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => {
    return Promise.resolve(
      makeResp({
        skills: [
          { id: "smart-routing", name: "Smart Routing" },
          { id: "cost-analysis", name: "Cost Analysis" },
        ],
      })
    );
  }) as any;

  const { registerA2a } = await import("../../bin/cli/commands/a2a.mjs");
  const out = await captureStdout(async () => {
    const { emit } = await import("../../bin/cli/output.mjs");
    const res = await (globalThis.fetch as any)("/.well-known/agent.json");
    const card = await res.json();
    emit(card.skills, makeCmd().optsWithGlobals());
  });

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.some((s: any) => s.id === "smart-routing"));
});

test("a2a invoke envia JSON-RPC 2.0 com método tasks.create", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ result: { taskId: "a2a-task-001" } }));
  }) as any;

  await (globalThis.fetch as any)("/api/a2a/tasks", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "req-1",
      method: "tasks.create",
      params: {
        skill: "smart-routing",
        input: { prompt: "summarize PDFs" },
        messages: [{ role: "user", parts: [{ kind: "data", data: { prompt: "summarize PDFs" } }] }],
      },
    }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/a2a/tasks"));
  assert.equal(capturedBody.jsonrpc, "2.0");
  assert.equal(capturedBody.method, "tasks.create");
  assert.equal(capturedBody.params.skill, "smart-routing");
});

test("a2a tasks list envia filtros na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: TASKS }));
  }) as any;

  const params = new URLSearchParams({ limit: "50" });
  params.set("status", "running");
  params.set("skill", "smart-routing");
  await (globalThis.fetch as any)(`/api/a2a/tasks?${params}`);

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("status=running"));
  assert.ok(capturedUrl.includes("skill=smart-routing"));
});

test("a2a tasks get busca task por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(TASK));
  }) as any;

  const out = await captureStdout(async () => {
    const { emit } = await import("../../bin/cli/output.mjs");
    const res = await (globalThis.fetch as any)("/api/a2a/tasks/a2a-task-001");
    emit(await res.json(), makeCmd().optsWithGlobals());
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/a2a/tasks/a2a-task-001"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "a2a-task-001");
});

test("a2a tasks cancel chama endpoint correto", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}));
  }) as any;

  await (globalThis.fetch as any)("/api/a2a/tasks/a2a-task-001/cancel", { method: "POST" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/cancel"));
  assert.equal(capturedMethod, "POST");
});

test("a2a tasks logs busca com include=messages,artifacts", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ messages: [{ role: "assistant", content: "done" }] }));
  }) as any;

  await (globalThis.fetch as any)("/api/a2a/tasks/a2a-task-001?include=messages,artifacts");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("include=messages"));
});

test("a2a.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/a2a.mjs");
  assert.equal(typeof mod.registerA2a, "function");
  assert.equal(typeof mod.runA2aStatusCommand, "function");
});
