// Issue #12729: the context-relay / universal-handoff bodies built in
// open-sse/services/contextHandoff.ts carry internal `_omnirouteSkipContextRelay`
// / `_omnirouteInternalRequest` markers (a client can also send
// `_omnirouteSkipUniversalHandoff`). The routing layer (src/sse/handlers/chat.ts,
// open-sse/services/combo.ts) reads them before dispatch, but strict
// OpenAI-compatible gateways reject unknown top-level keys with HTTP 400
// ("Unsupported parameter(s)") — one wasted upstream call per combo step.
//
// `stripInternalBodyFields()` removes the internal markers on the shared
// BaseExecutor paths — inside `transformRequest()` and again before the dispatch
// in `execute()`. Two executors build on that exception: `dario` and `9router`
// override `transformRequest()` without calling the base implementation, so
// neither strip ever ran for them and whatever the routing layer left on the
// body went out verbatim. Both now route their outbound body through the helper
// before serializing.
//
// The probe below is deliberately a marker the helper has always stripped, so
// this suite proves the wiring (the body really passes through the helper) and
// stays valid regardless of when #13355 makes the helper match every
// `_omniroute*` key by prefix.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after, afterEach } from "node:test";

// Temp DATA_DIR has to be in place before anything opens the SQLite singleton:
// dario resolves its base URL from settings, and the 9router executor reads its
// API key from version_manager.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-strip-internal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.DARIO_HOST = "127.0.0.1";
process.env.DARIO_PORT = "9";

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

getDbInstance()
  .prepare(
    `INSERT OR IGNORE INTO version_manager
       (tool, status, port, auto_start, auto_update, provider_expose)
     VALUES ('9router', 'stopped', 20130, 0, 1, 0)`
  )
  .run();

const { registerSupervisor, unregisterSupervisor } =
  await import("../../src/lib/services/registry.ts");
const { ServiceSupervisor } = await import("../../src/lib/services/ServiceSupervisor.ts");
const { DarioExecutor } = await import("../../open-sse/executors/dario.ts");
const { NineRouterExecutor } = await import("../../open-sse/executors/ninerouter.ts");

// An internal marker the helper strips on the current tip and after #13355, so
// its absence from the serialized body is proof the strip ran on this path.
const STRIP_PROBE = { _omnirouteResponsesStore: { id: "resp_probe" } };

// The handoff markers from #12729 — present on the handoff bodies, and stripped
// by the helper once it matches every `_omniroute*` key by prefix.
const HANDOFF_MARKERS = {
  _omnirouteSkipContextRelay: true,
  _omnirouteInternalRequest: "context-handoff",
  _omnirouteSkipUniversalHandoff: true,
};

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

after(() => {
  unregisterSupervisor("9router");
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/** Record every request the executor hands to fetch. */
function captureRequests(responseBody: unknown = {}) {
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];

  globalThis.fetch = (async (
    url: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>,
    });
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  return calls;
}

function assertBodyWentThroughMarkerStrip(body: Record<string, unknown>, executor: string) {
  assert.equal(
    "_omnirouteResponsesStore" in body,
    false,
    `${executor} serialized its body without running stripInternalBodyFields() — every internal marker on this path reaches the upstream gateway`
  );
}

/** A supervising 9router service, without actually spawning a process. */
function fakeRunningSupervisor() {
  const supervisor = new ServiceSupervisor({
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
  // @ts-ignore — accessing private field for test purposes
  supervisor["state"] = "running";
  return supervisor;
}

test("DarioExecutor strips internal markers from the body it serializes", async () => {
  const calls = captureRequests();
  const executor = new DarioExecutor("http://127.0.0.1:9");

  await executor.execute({
    model: "dario-chat",
    body: {
      model: "dario-chat",
      messages: [{ role: "user", content: "hi" }],
      stream: false,
      ...STRIP_PROBE,
      ...HANDOFF_MARKERS,
    },
    stream: false,
    credentials: { apiKey: "dario-key" },
    log: null,
  });

  assert.equal(calls.length, 1);
  assertBodyWentThroughMarkerStrip(calls[0].body, "DarioExecutor");
  // Everything else still reaches upstream untouched.
  assert.equal(calls[0].body.stream, false);
  assert.deepEqual(calls[0].body.messages, [{ role: "user", content: "hi" }]);
});

test("NineRouterExecutor strips internal markers from the body it serializes", async () => {
  registerSupervisor(fakeRunningSupervisor());
  const calls = captureRequests();
  const executor = new NineRouterExecutor("http://127.0.0.1:20130");

  await executor.execute({
    model: "gpt-5",
    body: {
      model: "gpt-5",
      messages: [{ role: "user", content: "hi" }],
      stream: false,
      ...STRIP_PROBE,
      ...HANDOFF_MARKERS,
    },
    stream: false,
    credentials: {},
    log: null,
  });

  assert.equal(calls.length, 1);
  assertBodyWentThroughMarkerStrip(calls[0].body, "NineRouterExecutor");
});
