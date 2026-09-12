import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import {
  OpencodeExecutor,
  resolveOpencodeTargetFormat,
} from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { RESPONSES_FIRST_BYTE_TIMEOUT_CODE } from "../../open-sse/utils/firstByteWatchdog.ts";

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const RESPONSES_MODEL = "muse-spark-1.2-contributor-free";
const CHAT_MODEL = "deepseek-v4-flash-free";
const FPS = ["a".repeat(32), "b".repeat(32), "c".repeat(32)];
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

after(() => servers.forEach((s) => s.close()));

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

type Step = "stall" | "ok" | "429" | "throw";

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

describe("OpencodeExecutor Responses first-byte stall", () => {
  let originalFetch: typeof globalThis.fetch;
  let priorTimeout: string | undefined;
  let calls: string[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorTimeout = process.env.RESPONSES_FIRST_BYTE_TIMEOUT_MS;
    process.env.RESPONSES_FIRST_BYTE_TIMEOUT_MS = "60";
    calls = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorTimeout === undefined) delete process.env.RESPONSES_FIRST_BYTE_TIMEOUT_MS;
    else process.env.RESPONSES_FIRST_BYTE_TIMEOUT_MS = priorTimeout;
  });

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
      if (step === "429") return new Response("{}", { status: 429 });
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

  it("targets the Responses API for the model under test", () => {
    assert.equal(resolveOpencodeTargetFormat("opencode-zen", RESPONSES_MODEL), "openai-responses");
    assert.notEqual(resolveOpencodeTargetFormat("opencode-zen", CHAT_MODEL), "openai-responses");
  });

  it("rotates past a silent Responses stream to a healthy account", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall", "ok"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.deepEqual(calls, [String(ports[0]), String(ports[1])]);
    assert.deepEqual(cooledDown(exec), [FPS[0]]);
    await result.response.body?.cancel();
  });

  it(
    "stops after the second stall without trying further accounts",
    { timeout: 5000 },
    async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch(["stall", "stall", "ok"]);
      await assert.rejects(run(exec, RESPONSES_MODEL, proxiedCredentials(3)), (err: unknown) => {
        assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
        assert.equal((err as Error).name, "TimeoutError");
        return true;
      });
      assert.equal(calls.length, 2, "third account and final direct call are never tried");
      assert.deepEqual(cooledDown(exec).sort(), [FPS[0], FPS[1]].sort());
    }
  );

  it("leaves a silent chat/completions stream alone", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const result = await run(exec, CHAT_MODEL, proxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("leaves non-streaming Responses requests alone", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(2), false);
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("fails fast on the single direct account path", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const started = Date.now();
    await assert.rejects(run(exec, RESPONSES_MODEL, directCredentials), (err: unknown) => {
      assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
      return true;
    });
    assert.deepEqual(calls, ["direct"]);
    assert.ok(Date.now() - started < 2000);
  });

  it(
    "guards the final direct call after a stall and network errors",
    { timeout: 5000 },
    async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch(["stall", "throw", "stall"]);
      await assert.rejects(run(exec, RESPONSES_MODEL, proxiedCredentials(2)), (err: unknown) => {
        assert.equal((err as { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
        return true;
      });
      assert.equal(calls.length, 3);
    }
  );

  it("does nothing when the timeout is set to 0", { timeout: 5000 }, async () => {
    process.env.RESPONSES_FIRST_BYTE_TIMEOUT_MS = "0";
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["stall"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(2));
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    await result.response.body?.cancel();
  });

  it("does not spend the stall budget on a 429", { timeout: 5000 }, async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(["429", "stall", "ok"]);
    const result = await run(exec, RESPONSES_MODEL, proxiedCredentials(3));
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 3);
    await result.response.body?.cancel();
  });
});
