import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import {
  HEADERS_WAIT_TIMEOUT_CODE,
  HEADERS_WAIT_TIMEOUT_NAME,
  headersWaitWaitMs,
  raceDispatchWithHeadersWait,
  resolveHeadersWaitWindowMs,
} from "../../open-sse/executors/opencodeHeadersWait.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  getOpencodeResponsesHeadersWaitMs,
  getOpencodeResponsesHeadersWaitMaxRotations,
  SUGGESTED_OPENCODE_RESPONSES_HEADERS_WAIT_MS,
} from "../../src/shared/utils/runtimeTimeouts.ts";

const MS = "OPENCODE_RESPONSES_HEADERS_WAIT_MS";
const MAX = "OPENCODE_RESPONSES_HEADERS_WAIT_MAX_ROTATIONS";

describe("Responses headers-wait bound (RED first)", () => {
  let priorMs: string | undefined;
  let priorMax: string | undefined;

  beforeEach(() => {
    priorMs = process.env[MS];
    priorMax = process.env[MAX];
    delete process.env[MS];
    delete process.env[MAX];
  });

  afterEach(() => {
    if (priorMs === undefined) delete process.env[MS];
    else process.env[MS] = priorMs;
    if (priorMax === undefined) delete process.env[MAX];
    else process.env[MAX] = priorMax;
  });

  it("stays off without env: getters read 0", () => {
    assert.equal(getOpencodeResponsesHeadersWaitMs(), 0);
    assert.equal(SUGGESTED_OPENCODE_RESPONSES_HEADERS_WAIT_MS, 30_000);
  });

  it("reads the operator values when set", () => {
    process.env[MS] = "30000";
    process.env[MAX] = "3";
    assert.equal(getOpencodeResponsesHeadersWaitMs(), 30_000);
    assert.equal(getOpencodeResponsesHeadersWaitMaxRotations(), 3);
  });

  it("default rotation budget is 2", () => {
    assert.equal(getOpencodeResponsesHeadersWaitMaxRotations(), 2);
  });

  it("window applies to streamed Responses only", () => {
    const cap = 110_000;
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 30_000,
        capTimeoutMs: cap,
      }),
      30_000
    );
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai",
        windowMs: 30_000,
        capTimeoutMs: cap,
      }),
      0
    );
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "claude",
        windowMs: 30_000,
        capTimeoutMs: cap,
      }),
      0
    );
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "gemini",
        windowMs: 30_000,
        capTimeoutMs: cap,
      }),
      0
    );
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: false,
        requestFormat: "openai-responses",
        windowMs: 30_000,
        capTimeoutMs: cap,
      }),
      0
    );
  });

  it("window is neutralized when it would not shorten the fetch-start cap", () => {
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 110_000,
        capTimeoutMs: 110_000,
      }),
      0
    );
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 600_000,
        capTimeoutMs: 110_000,
      }),
      0
    );
  });

  it("no env means no window (off-by-default)", () => {
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 0,
        capTimeoutMs: 110_000,
      }),
      0
    );
  });

  it("no host scoping: same window for any provider once the format matches", () => {
    assert.equal(
      resolveHeadersWaitWindowMs({
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 30_000,
        capTimeoutMs: 600_000,
      }),
      30_000
    );
  });

  it("ok dispatch resolves before the window", { timeout: 5000 }, async () => {
    const outcome = await raceDispatchWithHeadersWait(
      () => new Promise((resolve) => setTimeout(() => resolve("done"), 5)),
      1000,
      null
    );
    assert.equal(outcome.kind, "ok");
    if (outcome.kind === "ok") assert.equal(outcome.result, "done");
  });

  it("slow dispatch expires without throwing TimeoutError", { timeout: 5000 }, async () => {
    const outcome = await raceDispatchWithHeadersWait(() => new Promise(() => {}), 20, null);
    assert.equal(outcome.kind, "expired");
    assert.equal(HEADERS_WAIT_TIMEOUT_NAME, "OpencodeHeadersWaitTimeout");
    assert.equal(HEADERS_WAIT_TIMEOUT_CODE, "OPENCODE_HEADERS_WAIT_TIMEOUT");
    assert.notEqual(HEADERS_WAIT_TIMEOUT_NAME, "TimeoutError");
  });

  it("client abort surfaces as aborted, never expired", { timeout: 5000 }, async () => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10);
    const outcome = await raceDispatchWithHeadersWait(
      () => new Promise(() => {}),
      1000,
      controller.signal
    );
    assert.equal(outcome.kind, "aborted");
  });

  it("waitMs 0 dispatches untouched with no timer", { timeout: 5000 }, async () => {
    let calls = 0;
    const outcome = await raceDispatchWithHeadersWait(
      () => {
        calls++;
        return Promise.resolve("direct");
      },
      0,
      null
    );
    assert.equal(outcome.kind, "ok");
    assert.equal(calls, 1);
  });

  it("dispatch rejections propagate (never mapped to expired)", { timeout: 5000 }, async () => {
    const failure = new TypeError("fetch failed");
    await assert.rejects(
      raceDispatchWithHeadersWait(() => Promise.reject(failure), 1000, null),
      (err: unknown) => err === failure
    );
  });

  it("per-attempt wait needs budget and another candidate", () => {
    const policy = { windowMs: 30_000, maxRotations: 2 };
    const a = { id: "a" };
    const b = { id: "b" };
    const accounts = [a, b];
    assert.equal(
      headersWaitWaitMs({ policy, spent: { attempts: 0 } }, a, accounts, () => true),
      30_000
    );
    assert.equal(
      headersWaitWaitMs({ policy, spent: { attempts: 2 } }, a, accounts, () => true),
      0,
      "budget spent keeps the full window"
    );
    assert.equal(
      headersWaitWaitMs({ policy, spent: { attempts: 0 } }, a, [a], () => true),
      0,
      "last account keeps the full window"
    );
    assert.equal(
      headersWaitWaitMs(
        { policy: { windowMs: 0, maxRotations: 2 }, spent: { attempts: 0 } },
        a,
        accounts,
        () => true
      ),
      0
    );
  });
});

const HW_LOG = { debug() {}, info() {}, warn() {}, error() {} };
const HW_RESPONSES_MODEL = "muse-spark-1.2-contributor-free";
const HW_CHAT_MODEL = "deepseek-v4-flash-free";
const HW_FPS = ["a".repeat(32), "b".repeat(32), "c".repeat(32)];
const hwServers: net.Server[] = [];
const hwPorts: number[] = [];

function hwListen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

function hwProxiedCredentials(count: number): ProviderCredentials {
  const fingerprints = HW_FPS.slice(0, count);
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      accountProxies: fingerprints.map((fp, i) => ({
        fingerprint: fp,
        proxy: { type: "http", host: "127.0.0.1", port: hwPorts[i] },
      })),
    },
  };
}

function hwSseBody(): ReadableStream<Uint8Array> {
  const text = "event: message\ndata: {}\n\n";
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

describe("OpencodeExecutor headers-wait rotation (seam)", () => {
  let originalFetch: typeof globalThis.fetch;
  let priorMs: string | undefined;
  let priorMax: string | undefined;
  let calls: string[];

  before(async () => {
    for (let i = 0; i < HW_FPS.length; i++) {
      const server = net.createServer((s) => s.destroy());
      hwServers.push(server);
      hwPorts.push(await hwListen(server));
    }
  });

  after(() => {
    hwServers.forEach((s) => s.close());
    resetDbInstance();
  });

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorMs = process.env[MS];
    priorMax = process.env[MAX];
    process.env[MS] = "40";
    delete process.env[MAX];
    calls = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorMs === undefined) delete process.env[MS];
    else process.env[MS] = priorMs;
    if (priorMax === undefined) delete process.env[MAX];
    else process.env[MAX] = priorMax;
  });

  // A queued first account delays its headers past the window; the second answers at once.
  function installHangThenOk() {
    let call = 0;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      calls.push(resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct");
      call++;
      if (call === 1) {
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(resolve, 5000);
          init?.signal?.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(init.signal?.reason ?? new Error("aborted"));
          });
        });
      }
      return new Response(hwSseBody(), {
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
      log: HW_LOG,
    }) as Promise<{ response: Response }>;
  }

  it(
    "rotates past a queued Responses dispatch to a healthy account",
    { timeout: 10000 },
    async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installHangThenOk();
      const result = await run(exec, HW_RESPONSES_MODEL, hwProxiedCredentials(2));
      assert.equal(result.response.status, 200);
      assert.deepEqual(calls, [String(hwPorts[0]), String(hwPorts[1])]);
      await result.response.body?.cancel();
    }
  );

  it("leaves chat/completions dispatches unbounded", { timeout: 10000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installHangThenOk();
    let settled = false;
    globalThis.fetch = (async () => {
      calls.push("chat");
      settled = true;
      return new Response(hwSseBody(), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as typeof globalThis.fetch;
    const result = await run(exec, HW_CHAT_MODEL, hwProxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.ok(settled);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("off by default: a queued dispatch is returned untouched", { timeout: 10000 }, async () => {
    delete process.env[MS];
    const exec = new OpencodeExecutor("opencode-zen");
    installHangThenOk();
    const result = await run(exec, HW_RESPONSES_MODEL, hwProxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1, "no second account is dispatched");
    await result.response.body?.cancel();
  });

  it("a client abort during the bound window never rotates", { timeout: 10000 }, async () => {
    process.env[MS] = "5000";
    const exec = new OpencodeExecutor("opencode-zen");
    installHangThenOk();
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 30);
    await assert.rejects(
      exec.execute({
        model: HW_RESPONSES_MODEL,
        body: { input: [{ role: "user", content: "hi" }], stream: true },
        stream: true,
        signal: controller.signal,
        credentials: hwProxiedCredentials(2),
        log: HW_LOG,
      })
    );
    assert.equal(calls.length, 1, "no dispatch after the client went away");
  });
});
