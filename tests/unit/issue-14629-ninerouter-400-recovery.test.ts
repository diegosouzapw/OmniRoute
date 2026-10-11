// #14629: NineRouterExecutor overrides execute() without calling super.execute(),
// so an upstream 400 naming the accepted reasoning_effort enum surfaced raw
// instead of reaching the clamp-and-retry that BaseExecutor (and, since #14915,
// glm and cliproxyapi) apply. 9router forwards the OpenAI-shaped body as is.
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ninerouter-14629-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
core
  .getDbInstance()
  .prepare(
    `INSERT OR IGNORE INTO version_manager
       (tool, status, port, auto_start, auto_update, provider_expose)
     VALUES ('9router', 'stopped', 20130, 0, 1, 0)`
  )
  .run();

const { registerSupervisor, unregisterSupervisor } =
  await import("../../src/lib/services/registry.ts");
const { ServiceSupervisor } = await import("../../src/lib/services/ServiceSupervisor.ts");
const { NineRouterExecutor } = await import("../../open-sse/executors/ninerouter.ts");
const { __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

function registerRunningSupervisor() {
  const sup = new ServiceSupervisor({
    tool: "9router",
    port: 20130,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setTimeout(() => {}, 60000)"],
      env: process.env,
      cwd: process.cwd(),
    }),
    healthUrl: () => "http://127.0.0.1:20130/api/health",
    healthIntervalMs: 2000,
    stopTimeoutMs: 3000,
    logsBufferBytes: 64 * 1024,
  });
  // @ts-ignore — patch internal state without spawning a process
  sup["state"] = "running";
  registerSupervisor(sup);
}

const REJECTED = JSON.stringify({
  error: {
    message: 'Invalid option: expected one of "low", "medium", "high"',
    param: "reasoning_effort",
  },
});

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  unregisterSupervisor("9router");
  __test_resetLearnedReasoningEffortCaps();
});

function mockFetch(first: Response) {
  const calls: Array<{ url: string; body: string }> = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: String(init?.body ?? "") });
    if (calls.length === 1) return first;
    return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return calls;
}

describe("issue #14629 — 9router reaches the reactive reasoning_effort 400 recovery", () => {
  it("clamps reasoning_effort and retries once against the same endpoint", async () => {
    __test_resetLearnedReasoningEffortCaps();
    registerRunningSupervisor();
    const calls = mockFetch(new Response(REJECTED, { status: 400 }));

    const result = await new NineRouterExecutor("http://127.0.0.1:20130").execute({
      model: "9router/cx/gpt-5-mini",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" },
      stream: false,
      credentials: {},
    });

    assert.equal(calls.length, 2);
    assert.equal(result.response.status, 200);
    assert.equal(calls[1].url, calls[0].url);
    const retried = JSON.parse(calls[1].body);
    assert.equal(retried.reasoning_effort, "low");
    assert.equal(retried.model, "cx/gpt-5-mini");
  });

  it("does not retry a 400 that names no reasoning_effort enum", async () => {
    __test_resetLearnedReasoningEffortCaps();
    registerRunningSupervisor();
    const calls = mockFetch(
      new Response(JSON.stringify({ error: { message: "messages: field required" } }), {
        status: 400,
      })
    );

    const result = await new NineRouterExecutor("http://127.0.0.1:20130").execute({
      model: "9router/cx/gpt-5-mini",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });

    assert.equal(calls.length, 1);
    assert.equal(result.response.status, 400);
  });
});
