import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import {
  guardResponsesStall,
  resolveResponsesStallWindowMs,
  setupStallGuard,
} from "../../open-sse/executors/opencodeResponsesStall.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { RESPONSES_FIRST_BYTE_TIMEOUT_CODE } from "../../open-sse/utils/firstByteWatchdog.ts";
import { DEFAULT_STREAM_READINESS_TIMEOUT_MS } from "../../src/shared/utils/runtimeTimeouts.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Hardened stall guard: the first-byte window is bounded by
// the stream readiness timeout (capMs), one rotation per request, Responses
// scope only. The flag default stays off.
const FLAG = "OPENCODE_RESPONSES_STALL_ROTATION";
const TIMEOUT_ENV = "RESPONSES_FIRST_BYTE_TIMEOUT_MS";

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const RESPONSES_MODEL = "muse-spark-1.2-contributor-free";
const CHAT_MODEL = "deepseek-v4-flash-free";
const FPS = ["a".repeat(32), "b".repeat(32), "c".repeat(32)];

function silentBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({ pull() {} });
}

function sseBody(): ReadableStream<Uint8Array> {
  const text =
    'event: response.created\ndata: {"type":"response.created","response":{"id":"r1"}}\n\n';
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

describe("resolveResponsesStallWindowMs with a readiness bound", () => {
  let priorTimeout: string | undefined;
  let priorFlag: string | undefined;

  beforeEach(() => {
    priorTimeout = process.env[TIMEOUT_ENV];
    priorFlag = process.env[FLAG];
    delete process.env[TIMEOUT_ENV];
    delete process.env[FLAG];
  });

  afterEach(() => {
    if (priorTimeout === undefined) delete process.env[TIMEOUT_ENV];
    else process.env[TIMEOUT_ENV] = priorTimeout;
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
    resetDbInstance();
  });

  after(() => {
    resetDbInstance();
  });

  it("returns 0 for non-stream requests", () => {
    process.env[FLAG] = "true";
    assert.equal(resolveResponsesStallWindowMs(false, "openai-responses", 80_000), 0);
  });

  it("returns 0 for non-Responses formats", () => {
    process.env[FLAG] = "true";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-chat", 80_000), 0);
  });

  it("returns 0 when the flag is off", () => {
    process.env[TIMEOUT_ENV] = "15000";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 0);
  });

  it("returns the configured value when the flag is on", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "15000";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 15_000);
  });

  it("clamps a configured value above the bound down to the bound", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "200000";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 80_000);
  });

  it("treats a configured 0 as disabled", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "0";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 0);
  });

  it("treats a non-positive bound (readiness disabled) as no ceiling", () => {
    // STREAM_READINESS_TIMEOUT_MS=0 means the readiness check is off, so the
    // stall guard is the ONLY first-byte bound left: it must keep working with
    // the configured window instead of being switched off.
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "15000";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 0), 15_000);
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", -1), 15_000);
    process.env[TIMEOUT_ENV] = "200000";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 0), 200_000);
  });

  it("falls back to the stream readiness default when the bound is absent", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "200000";
    assert.equal(
      resolveResponsesStallWindowMs(true, "openai-responses"),
      DEFAULT_STREAM_READINESS_TIMEOUT_MS
    );
  });

  it("falls back to the 15000 default on negative or invalid configured values", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "-5";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 15_000);
    process.env[TIMEOUT_ENV] = "not-a-number";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 15_000);
  });

  it("defaults to 15000 when nothing is configured", () => {
    process.env[FLAG] = "true";
    assert.equal(resolveResponsesStallWindowMs(true, "openai-responses", 80_000), 15_000);
  });
});

describe("setupStallGuard wiring", () => {
  let priorTimeout: string | undefined;
  let priorFlag: string | undefined;

  beforeEach(() => {
    priorTimeout = process.env[TIMEOUT_ENV];
    priorFlag = process.env[FLAG];
    delete process.env[TIMEOUT_ENV];
    delete process.env[FLAG];
  });

  afterEach(() => {
    if (priorTimeout === undefined) delete process.env[TIMEOUT_ENV];
    else process.env[TIMEOUT_ENV] = priorTimeout;
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
    resetDbInstance();
  });

  after(() => {
    resetDbInstance();
  });

  it("resolves the window from the bound and reports capping without live env", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "200000";
    const seen: string[] = [];
    const setup = setupStallGuard(
      true,
      "openai-responses",
      {
        warn: (_tag, msg) => seen.push(msg),
      } as { warn: (tag: string, message: string) => void },
      "correlationId=x ",
      () => 80_000,
      () => 200_000
    );
    assert.equal(setup.windowMs, 80_000);
    assert.equal(setup.capped, true);
    assert.equal(seen.length, 1);
    assert.match(seen[0] as string, /stalled stream first-byte wait capped/);
  });

  it("stays silent when nothing is capped", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "15000";
    const seen: string[] = [];
    const setup = setupStallGuard(
      true,
      "openai-responses",
      { warn: (_tag, msg) => seen.push(msg) },
      "",
      () => 80_000,
      () => 15_000
    );
    assert.equal(setup.windowMs, 15_000);
    assert.equal(setup.capped, false);
    assert.deepEqual(seen, []);
  });

  it("keeps the configured window and reports no capping when readiness is disabled", () => {
    process.env[FLAG] = "true";
    process.env[TIMEOUT_ENV] = "200000";
    const seen: string[] = [];
    const setup = setupStallGuard(
      true,
      "openai-responses",
      { warn: (_tag, msg) => seen.push(msg) },
      "",
      () => 0,
      () => 200_000
    );
    assert.equal(setup.windowMs, 200_000);
    assert.equal(setup.capped, false);
    assert.deepEqual(seen, []);
  });

  it("returns a zero window without capping when the guard does not apply", () => {
    const seen: string[] = [];
    const setup = setupStallGuard(
      false,
      "openai-responses",
      { warn: (_tag, msg) => seen.push(msg) },
      "",
      () => 80_000,
      () => 15_000
    );
    assert.equal(setup.windowMs, 0);
    assert.equal(setup.capped, false);
    assert.deepEqual(seen, []);
  });
});

describe("guardResponsesStall identity and rejection", () => {
  after(() => {
    resetDbInstance();
  });

  it("returns the same object when the window is 0", async () => {
    const result = { response: new Response(sseBody(), { status: 200 }) };
    assert.equal(await guardResponsesStall(result, 0), result);
  });

  it("returns the same object when the result carries no response", async () => {
    const result = { status: "ok" };
    assert.equal(await guardResponsesStall(result, 50), result);
  });

  it("returns the same object for a non-ok response", async () => {
    const result = { response: new Response("nope", { status: 500 }) };
    assert.equal(await guardResponsesStall(result, 50), result);
  });

  it("returns the same object when the response has no body", async () => {
    const result = { response: new Response(null, { status: 200 }) };
    assert.equal(await guardResponsesStall(result, 50), result);
  });

  it("rejects with the stall name and code on a silent 2xx body", { timeout: 5000 }, async () => {
    const result = { response: new Response(silentBody(), { status: 200 }) };
    await assert.rejects(guardResponsesStall(result, 30), (err: unknown) => {
      assert.equal((err as Error).name, "TimeoutError");
      assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
      return true;
    });
  });

  it("keeps the status and replays the first chunk on a talking body", async () => {
    const result = { response: new Response(sseBody(), { status: 200 }) };
    const guarded = await guardResponsesStall(result, 1000);
    assert.equal(guarded.response.status, 200);
    const text = await guarded.response.text();
    assert.match(text, /response\.created/);
  });
});

describe("OpencodeExecutor hardened stall guard", () => {
  const servers: net.Server[] = [];
  const ports: number[] = [];
  let originalFetch: typeof globalThis.fetch;
  let priorTimeout: string | undefined;
  let priorFlag: string | undefined;
  let priorReadiness: string | undefined;
  let calls: string[];

  function listen(server: net.Server): Promise<number> {
    return new Promise((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
    });
  }

  before(async () => {
    for (let i = 0; i < FPS.length; i++) {
      const server = net.createServer((s) => s.destroy());
      servers.push(server);
      ports.push(await listen(server));
    }
  });

  after(() => {
    servers.forEach((s) => s.close());
    resetDbInstance();
  });

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorTimeout = process.env[TIMEOUT_ENV];
    priorFlag = process.env[FLAG];
    priorReadiness = process.env.STREAM_READINESS_TIMEOUT_MS;
    process.env[TIMEOUT_ENV] = "60";
    process.env[FLAG] = "true";
    delete process.env.STREAM_READINESS_TIMEOUT_MS;
    calls = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorTimeout === undefined) delete process.env[TIMEOUT_ENV];
    else process.env[TIMEOUT_ENV] = priorTimeout;
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
    if (priorReadiness === undefined) delete process.env.STREAM_READINESS_TIMEOUT_MS;
    else process.env.STREAM_READINESS_TIMEOUT_MS = priorReadiness;
  });

  function proxiedCredentials(count: number): ProviderCredentials {
    const fingerprints = FPS.slice(0, count);
    return {
      apiKey: null,
      accessToken: null,
      connectionId: "noauth",
      providerSpecificData: {
        fingerprints,
        accountProxies: fingerprints.map((fp, i) => ({
          fingerprint: fp,
          proxy: { type: "http", host: "127.0.0.1", port: ports[i] },
        })),
      },
    };
  }

  const directCredentials: ProviderCredentials = {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {},
  };

  type Step = "stall" | "ok" | "throw";

  function installFetch(plan: Step[]) {
    let call = 0;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      calls.push(resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct");
      const step = plan[Math.min(call, plan.length - 1)];
      call++;
      if (step === "throw") throw new TypeError("fetch failed");
      return new Response(step === "stall" ? silentBody() : sseBody(), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as typeof globalThis.fetch;
  }

  function run(exec: OpencodeExecutor, model: string, creds: ProviderCredentials, stream = true) {
    return exec.execute({
      model,
      body: { input: [{ role: "user", content: "hi" }], stream },
      stream,
      signal: null,
      credentials: creds,
      log,
    }) as Promise<{ response: Response }>;
  }

  function cooledDown(exec: OpencodeExecutor): string[] {
    const accounts = (
      exec as unknown as {
        accounts: Array<{ fingerprint: string; cooldownUntil: number }>;
      }
    ).accounts;
    return accounts.filter((a) => a.cooldownUntil > Date.now()).map((a) => a.fingerprint);
  }

  it("a silent Responses stream rotates once then fails fast", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall", "stall", "ok"]);
    await assert.rejects(run(exec, RESPONSES_MODEL, proxiedCredentials(3)), (err: unknown) => {
      assert.equal((err as Error).name, "TimeoutError");
      assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
      return true;
    });
    assert.equal(calls.length, 2);
    assert.deepEqual(cooledDown(exec).sort(), [FPS[0], FPS[1]].sort());
  });

  it(
    "a mixed stall and network failure tolerates the guarded final direct call without a second rotation",
    { timeout: 5000 },
    async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch(["stall", "throw", "stall"]);
      await assert.rejects(run(exec, RESPONSES_MODEL, proxiedCredentials(2)), (err: unknown) => {
        assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
        return true;
      });
      assert.equal(calls.length, 3);
      assert.deepEqual(cooledDown(exec).sort(), [FPS[0], FPS[1]].sort());
    }
  );

  it(
    "a configured window above the readiness bound still fails fast near the bound",
    { timeout: 10000 },
    async () => {
      process.env[TIMEOUT_ENV] = "200000";
      process.env.STREAM_READINESS_TIMEOUT_MS = "80";
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch(["stall", "stall", "stall"]);
      const started = Date.now();
      await assert.rejects(run(exec, RESPONSES_MODEL, directCredentials), (err: unknown) => {
        assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
        return true;
      });
      assert.deepEqual(calls, ["direct"]);
      assert.ok(Date.now() - started < 10000, "the bound window applies, not the raw 200 s");
    }
  );

  it("a silent chat stream is left alone", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const result = await run(exec, CHAT_MODEL, proxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("a non-streaming Responses request is left alone", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(2), false);
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("flag off: a silent Responses stream is returned untouched", { timeout: 5000 }, async () => {
    delete process.env[FLAG];
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall", "ok"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.deepEqual(calls, [String(ports[0])]);
    assert.deepEqual(cooledDown(exec), []);
    await result.response.body?.cancel();
  });
});
