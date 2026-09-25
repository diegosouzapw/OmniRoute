/**
 * Pool re-selection per attempt: when a proxy-less account dispatches under an
 * ambient pool context and the provider buckets quota by egress address, a 429
 * asks the pool for another member for the next attempt instead of retrying
 * the refused address. Opt-in via OPENCODE_POOL_RESELECT (default off).
 */
import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  resolveProxyForRequest,
  runWithAppliedProxyCapture,
  runWithProxyContext,
} from "../../open-sse/utils/proxyFetch.ts";
import { runInRequestContext } from "../../open-sse/executors/opencodeRequestContext.ts";

const FLAG = "OPENCODE_POOL_RESELECT";

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FPS = ["a", "b", "c", "d"].map((c) => c.repeat(32));

const servers: net.Server[] = [];
const ports: number[] = [];

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

before(async () => {
  for (let i = 0; i < 3; i++) {
    const server = net.createServer((s) => s.destroy());
    servers.push(server);
    ports.push(await listen(server));
  }
});

after(() => {
  servers.forEach((s) => s.close());
});

let originalFetch: typeof globalThis.fetch;
let priorFlag: string | undefined;
let observed: Array<string | null>;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  priorFlag = process.env[FLAG];
  process.env[FLAG] = "true";
  observed = [];
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (priorFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = priorFlag;
});

function credentialsNoProxy(count: number): ProviderCredentials {
  const fingerprints = FPS.slice(0, count);
  return {
    apiKey: "sk-test",
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: { fingerprints },
  };
}

function credentialsMixedOwnProxy(): ProviderCredentials {
  return {
    apiKey: "sk-test",
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints: FPS.slice(0, 2),
      accountProxies: [
        { fingerprint: FPS[0], proxy: null },
        {
          fingerprint: FPS[1],
          proxy: { type: "http", host: "127.0.0.1", port: ports[2] },
        },
      ],
    },
  };
}

const QUOTA_429 = JSON.stringify({ error: { message: "rate limit reached, try again" } });

/** First call(s) 429, then 200. Records the egress proxy port per dispatch. */
function installFetch(first429s: number) {
  let call = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const resolved = resolveProxyForRequest(url);
    let proxyPort: string | null = null;
    try {
      proxyPort = resolved.proxyUrl ? new URL(resolved.proxyUrl).port : null;
    } catch {
      proxyPort = null;
    }
    observed.push(proxyPort);
    call++;
    if (call <= first429s) {
      return new Response(QUOTA_429, {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
}

const memberB = () => ({ type: "http", host: "127.0.0.1", port: ports[1] });

async function runWith(
  sinkExtra: Record<string, unknown>,
  ambientPort: number,
  count: number,
  first429s: number,
  provider = "opencode"
) {
  installFetch(first429s);
  const exec = new OpencodeExecutor(provider);
  const sink: Record<string, unknown> = { proxy: null, ...sinkExtra };
  return runWithProxyContext({ type: "http", host: "127.0.0.1", port: ambientPort }, () =>
    runWithAppliedProxyCapture(sink as never, () =>
      runInRequestContext(() =>
        exec.execute({
          model: "muse-spark-1.3-contributor-free",
          body: { messages: [{ role: "user", content: "hi" }], stream: false },
          stream: false,
          signal: null,
          credentials: credentialsNoProxy(count),
          log,
        })
      )
    )
  );
}

describe("opencode 429 pool re-selection per attempt", () => {
  it("second attempt uses another pool member after an egress-bucketed 429", async () => {
    const result = (await runWith(
      { reselectPoolMember: async () => memberB() },
      ports[0],
      2,
      1
    )) as { response: Response };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    assert.strictEqual(String(observed[0]), String(ports[0]));
    assert.strictEqual(String(observed[1]), String(ports[1]));
  });

  it("keeps the same member when the provider is outside the egress-bucketed list", async () => {
    const result = (await runWith(
      { reselectPoolMember: async () => memberB() },
      ports[0],
      2,
      1,
      "opencode-zen"
    )) as { response: Response };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    for (const port of observed) assert.strictEqual(String(port), String(ports[0]));
  });

  it("keeps the same member when the pool offers nothing (null resolver result)", async () => {
    const result = (await runWith({ reselectPoolMember: async () => null }, ports[0], 2, 1)) as {
      response: Response;
    };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    for (const port of observed) assert.strictEqual(String(port), String(ports[0]));
  });

  it("stays inert with the flag off even when a resolver is published", async () => {
    delete process.env[FLAG];
    const result = (await runWith(
      { reselectPoolMember: async () => memberB() },
      ports[0],
      2,
      1
    )) as { response: Response };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    for (const port of observed) assert.strictEqual(String(port), String(ports[0]));
  });

  it("ignores a resolver answer for the same member without logging", async () => {
    const warnings: string[] = [];
    const quietLog: ExecutorLog = {
      debug() {},
      info() {},
      warn(_ns: string, msg: string) {
        warnings.push(String(msg));
      },
      error() {},
    };
    installFetch(1);
    const exec = new OpencodeExecutor("opencode");
    // Resolver hands back the ambient member itself (same host and port as
    // the request egressed through): reselectedProxy stays unset and no
    // "pool re-selected" line is logged. The sink's recorded proxy is the
    // applied ambient member, which the executor reads as lastPoolKey.
    const sink: Record<string, unknown> = {
      proxy: { type: "http", host: "127.0.0.1", port: ports[0] },
      reselectPoolMember: async () => ({ type: "http", host: "127.0.0.1", port: ports[0] }),
    };
    const result = (await runWithProxyContext(
      { type: "http", host: "127.0.0.1", port: ports[0] },
      () =>
        runWithAppliedProxyCapture(sink as never, () =>
          runInRequestContext(() =>
            exec.execute({
              model: "muse-spark-1.3-contributor-free",
              body: { messages: [{ role: "user", content: "hi" }], stream: false },
              stream: false,
              signal: null,
              credentials: credentialsNoProxy(2),
              log: quietLog,
            })
          )
        )
    )) as { response: Response };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    for (const port of observed) assert.strictEqual(String(port), String(ports[0]));
    assert.ok(
      warnings.every((w) => !w.includes("pool re-selected")),
      `expected no pool re-selected log, got: ${warnings.join(" | ")}`
    );
  });

  it("keeps an account's own proxy even when the pool re-selected a member", async () => {
    installFetch(1);
    const exec = new OpencodeExecutor("opencode");
    const sink: Record<string, unknown> = {
      proxy: null,
      reselectPoolMember: async () => memberB(),
    };
    const result = (await runWithProxyContext(
      { type: "http", host: "127.0.0.1", port: ports[0] },
      () =>
        runWithAppliedProxyCapture(sink as never, () =>
          runInRequestContext(() =>
            exec.execute({
              model: "muse-spark-1.3-contributor-free",
              body: { messages: [{ role: "user", content: "hi" }], stream: false },
              stream: false,
              signal: null,
              credentials: credentialsMixedOwnProxy(),
              log,
            })
          )
        )
    )) as { response: Response };
    assert.strictEqual(result.response.status, 200);
    assert.ok(observed.length >= 2, `expected 2 dispatches, got ${observed.length}`);
    assert.strictEqual(String(observed[0]), String(ports[0]));
    assert.strictEqual(String(observed[1]), String(ports[2]));
  });
});
