import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";

// The park-and-replay path re-selects outside the rotation loop, so the
// per-request dedup guarantee below only holds with it disabled.
const PARK_FLAG = "OPENCODE_PARK_AND_RESUME";
const EARLY_STOP_FLAG = "OPENCODE_RATE_LIMITED_429_EARLY_STOP";

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FPS = ["d", "e", "f"].map((c) => c.repeat(32));

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
});

function credentialsFor(proxies: number[]): ProviderCredentials {
  const fingerprints = FPS.slice(0, proxies.length);
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      accountProxies: fingerprints.map((fp, i) => ({
        fingerprint: fp,
        proxy: { type: "http", host: "127.0.0.1", port: proxies[i] },
      })),
    },
  };
}

const BUSY_BODY = JSON.stringify({ error: { message: "upstream busy, try again" } });

describe("opencode 429 proxy dedup per request", () => {
  let originalFetch: typeof globalThis.fetch;
  let priorPark: string | undefined;
  let priorEarlyStop: string | undefined;
  let observed: string[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorPark = process.env[PARK_FLAG];
    priorEarlyStop = process.env[EARLY_STOP_FLAG];
    delete process.env[PARK_FLAG];
    delete process.env[EARLY_STOP_FLAG];
    observed = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorPark === undefined) delete process.env[PARK_FLAG];
    else process.env[PARK_FLAG] = priorPark;
    if (priorEarlyStop === undefined) delete process.env[EARLY_STOP_FLAG];
    else process.env[EARLY_STOP_FLAG] = priorEarlyStop;
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
      return new Response(step.body ?? JSON.stringify({ ok: step.status === 200 }), {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  }

  async function run(credentials: ProviderCredentials) {
    const exec = new OpencodeExecutor("opencode-zen");
    return exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials,
      log,
    });
  }

  it("does not replay a rate-limited proxy within one rotation wave", async () => {
    installFetch([{ status: 429, body: BUSY_BODY }, { status: 200 }]);
    const result = await run(credentialsFor([ports[0], ports[0]]));
    assert.strictEqual(observed.length, 1, `same proxy replayed (saw ${observed.length} calls)`);
    assert.strictEqual(observed[0], String(ports[0]));
    assert.strictEqual((result as { response: Response }).response.status, 429);
  });

  it("serves the last 429 when every proxy is rate-limited", async () => {
    installFetch([{ status: 429, body: BUSY_BODY }]);
    const result = await run(credentialsFor([ports[0], ports[0], ports[0]]));
    assert.strictEqual(observed.length, 1, `exhaustion replayed a proxy (saw ${observed.length})`);
    assert.strictEqual((result as { response: Response }).response.status, 429);
  });

  it("does not deduplicate two proxies sharing one host", async () => {
    installFetch([{ status: 429, body: BUSY_BODY }, { status: 200 }]);
    const result = await run(credentialsFor([ports[0], ports[1]]));
    assert.strictEqual(observed.length, 2);
    assert.notStrictEqual(observed[0], observed[1]);
    assert.strictEqual((result as { response: Response }).response.status, 200);
  });
});
