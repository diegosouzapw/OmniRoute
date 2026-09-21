import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  TRANSIENT_RETRY_BASE_DELAY_MS,
  TRANSIENT_RETRY_MAX_DELAY_MS,
  TRANSIENT_RETRY_TOTAL_BUDGET_MS,
  transientRetryDelayMs,
  sleepAbortable,
} from "../../open-sse/executors/opencodeTransientFailure.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// #13615 rework: the failover pause is opt-in (OPENCODE_TRANSIENT_FAILOVER_BACKOFF,
// default off), bounded (per-pause cap + per-request budget), honors the client
// abort signal and releases the failed body before waiting. The executor's sleep
// is injected, so no test waits on a real 1.5s timer.
const FLAG = "OPENCODE_TRANSIENT_FAILOVER_BACKOFF";
const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FPS = ["a", "b", "c", "d", "e", "f", "g"].map((c) => c.repeat(32));

const servers: net.Server[] = [];
const ports: number[] = [];

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

function credentialsFor(count: number): ProviderCredentials {
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

const GEO_BODY = JSON.stringify({
  error: { type: "RegionError", message: "This model is not available in your country." },
});
// Empty upstream rejection: 400 without an error field (see isEmptyUpstreamRejection).
const EMPTY_BODY =
  '{"id":"chatcmpl_44fn2g6e7kk","object":"chat.completion","created":1787419957,"model":"muse-spark-1.2-contributor-free","choices":[{"index":0,"message":{"role":"assistant"},"finish_reason":null}]}';

describe("transient failover pause helpers", () => {
  it("uses its argument: nothing before the second failure, then bounded doubling", () => {
    assert.strictEqual(TRANSIENT_RETRY_BASE_DELAY_MS, BaseExecutor.WAF_RETRY_CONFIG.delayMs);
    assert.strictEqual(transientRetryDelayMs(0), 0);
    assert.strictEqual(transientRetryDelayMs(1), 0);
    assert.strictEqual(transientRetryDelayMs(2), 1500);
    assert.strictEqual(transientRetryDelayMs(3), 3000);
    assert.strictEqual(transientRetryDelayMs(4), TRANSIENT_RETRY_MAX_DELAY_MS);
    assert.strictEqual(transientRetryDelayMs(50), TRANSIENT_RETRY_MAX_DELAY_MS);
    assert.strictEqual(transientRetryDelayMs(Number.NaN), 0);
  });

  it("never exceeds what is left of the per-request budget", () => {
    assert.strictEqual(transientRetryDelayMs(4, TRANSIENT_RETRY_TOTAL_BUDGET_MS - 1000), 1000);
    assert.strictEqual(transientRetryDelayMs(4, TRANSIENT_RETRY_TOTAL_BUDGET_MS), 0);
    assert.strictEqual(transientRetryDelayMs(2, TRANSIENT_RETRY_TOTAL_BUDGET_MS + 5), 0);
  });

  it("sleepAbortable resolves true after the delay and false on abort", async () => {
    assert.strictEqual(await sleepAbortable(5), true);
    assert.strictEqual(await sleepAbortable(5, new AbortController().signal), true);
    const controller = new AbortController();
    const pending = sleepAbortable(60_000, controller.signal);
    controller.abort();
    assert.strictEqual(await pending, false);
    const aborted = new AbortController();
    aborted.abort();
    assert.strictEqual(await sleepAbortable(60_000, aborted.signal), false);
  });
});

describe("opencode rotation with OPENCODE_TRANSIENT_FAILOVER_BACKOFF", () => {
  let originalFetch: typeof globalThis.fetch;
  let priorFlag: string | undefined;
  let observed: string[];
  let upstream: Response[];
  let sleeps: number[];
  // Filled per test: what each dispatched attempt answers.
  let events: string[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorFlag = process.env[FLAG];
    process.env[FLAG] = "true";
    observed = [];
    upstream = [];
    sleeps = [];
    events = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
  });

  function installFetch(plan: Array<{ status: number; body?: string }>) {
    let call = 0;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      observed.push(resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct");
      const step = plan[Math.min(call, plan.length - 1)];
      call++;
      events.push(`dispatch:${step.status}`);
      const response = new Response(step.body ?? JSON.stringify({ ok: step.status === 200 }), {
        status: step.status,
        headers: { "Content-Type": "application/json", "x-upstream-call": String(call) },
      });
      upstream.push(response);
      return response;
    }) as typeof globalThis.fetch;
  }

  function newExecutor(onSleep?: (ms: number) => boolean): OpencodeExecutor {
    const exec = new OpencodeExecutor("opencode-zen");
    exec.transientPauseSleep = async (ms, signal) => {
      sleeps.push(ms);
      events.push(`sleep:${ms}`);
      if (signal?.aborted) return false;
      return onSleep ? onSleep(ms) : true;
    };
    return exec;
  }

  async function run(exec: OpencodeExecutor, count: number, signal: AbortSignal | null = null) {
    const result = (await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal,
      credentials: credentialsFor(count),
      log,
    })) as { response: Response };
    return result.response;
  }

  it("flag off: failover stays immediate even after a long transient streak", async () => {
    delete process.env[FLAG];
    const exec = newExecutor();
    installFetch([{ status: 500 }, { status: 502 }, { status: 503 }, { status: 200 }]);

    const response = await run(exec, 4);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(observed.length, 4);
    assert.deepStrictEqual(sleeps, [], "no pause without the flag");
    assert.strictEqual(upstream[0].bodyUsed, false, "flag off never touches failed bodies");
    await response.body?.cancel();
  });

  it("the first retry after one transient failure is immediate", async () => {
    const exec = newExecutor();
    installFetch([{ status: 500 }, { status: 200 }]);

    const response = await run(exec, 2);

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(sleeps, []);
    await response.body?.cancel();
  });

  it("pauses before the third account, after releasing the failed body", async () => {
    const exec = newExecutor();
    installFetch([{ status: 500 }, { status: 500 }, { status: 200 }]);

    const response = await run(exec, 3);

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(events, ["dispatch:500", "dispatch:500", "sleep:1500", "dispatch:200"]);
    assert.strictEqual(upstream[1].bodyUsed, true, "the failed body is cancelled before sleeping");
    await response.body?.cancel();
  });

  it("backs off with its argument, bounded by the per-request budget", async () => {
    const exec = newExecutor();
    installFetch([
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 200 },
    ]);

    const response = await run(exec, 5);

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(sleeps, [1500, 3000, 5500], "1.5s, 3s, then the 10s budget remainder");
    await response.body?.cancel();
  });

  it("stops pausing once the per-request budget is spent", async () => {
    const exec = newExecutor();
    installFetch([
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 500 },
      { status: 200 },
    ]);

    const response = await run(exec, 7);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(observed.length, 7);
    assert.strictEqual(
      sleeps.reduce((a, b) => a + b, 0),
      TRANSIENT_RETRY_TOTAL_BUDGET_MS,
      "total pause time is bounded"
    );
    await response.body?.cancel();
  });

  it("a mixed streak (500 then empty 400) pauses; a 429 or geo 403 resets it", async () => {
    const mixed = newExecutor();
    installFetch([{ status: 500 }, { status: 400, body: EMPTY_BODY }, { status: 200 }]);
    const mixedResponse = await run(mixed, 3);
    assert.strictEqual(mixedResponse.status, 200);
    assert.deepStrictEqual(sleeps, [1500]);
    await mixedResponse.body?.cancel();

    for (const breaker of [{ status: 429 }, { status: 403, body: GEO_BODY }]) {
      sleeps = [];
      events = [];
      const exec = newExecutor();
      installFetch([{ status: 500 }, breaker, { status: 500 }, { status: 200 }]);
      const response = await run(exec, 4);
      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(sleeps, [], `${breaker.status} breaks the streak`);
      await response.body?.cancel();
    }
  });

  it("a client abort during the pause dispatches nothing more", async () => {
    const controller = new AbortController();
    const exec = newExecutor(() => {
      controller.abort();
      return false;
    });
    installFetch([{ status: 500 }, { status: 500 }, { status: 200 }]);

    const response = await run(exec, 3, controller.signal);

    assert.strictEqual(observed.length, 2, "no third dispatch after the abort");
    assert.strictEqual(response.status, 500, "the last failure status is surfaced");
    assert.strictEqual(response.headers.get("x-upstream-call"), "2", "its headers are kept");
  });

  it("an already-aborted signal skips the pause and the dispatch", async () => {
    const controller = new AbortController();
    const exec = newExecutor();
    installFetch([{ status: 500 }, { status: 500 }, { status: 200 }]);
    let calls = 0;
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async (...args: Parameters<typeof fetch>) => {
      calls++;
      const response = await realFetch(...args);
      if (calls === 2) controller.abort();
      return response;
    }) as typeof globalThis.fetch;

    const response = await run(exec, 3, controller.signal);

    assert.strictEqual(calls, 2);
    assert.strictEqual(response.status, 500);
  });
});
