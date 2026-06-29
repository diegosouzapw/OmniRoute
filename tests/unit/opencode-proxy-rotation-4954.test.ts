import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  resolveProxyForRequest,
  runWithAppliedProxyCapture,
} from "../../open-sse/utils/proxyFetch.ts";

/**
 * #4954 — "OpenCode Free" exposes per-account proxy + multi-account rotation in
 * the UI (NoAuthAccountCard persists providerSpecificData.fingerprints +
 * providerSpecificData.accountProxies), but the executor ignored them entirely:
 * every request egressed direct and never rotated. These tests pin the wiring:
 *
 *   1. A request for an account that has a configured proxy must egress THROUGH
 *      that proxy (resolveProxyForRequest reports source "context", not "direct").
 *   2. On a 429 the executor must rotate to the NEXT account (and its proxy).
 *
 * The dispatch layer is mocked by stubbing globalThis.fetch — exactly what the
 * proxy context wraps — and we observe the proxy that resolveProxyForRequest sees
 * for the in-flight request, mirroring the mimocode proxy integration test. Two
 * throwaway local TCP listeners stand in for the proxies so runWithProxyContext's
 * fast-fail reachability probe passes without a live SOCKS/HTTP proxy.
 */

const log = { debug() {}, info() {}, warn() {}, error() {} };

const ACCOUNT_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const ACCOUNT_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

// Two local listeners so the proxy fast-fail reachability check succeeds. The
// proxy host/port are observable in the egress context — that is what asserts the
// per-account proxy is honored (was always "direct" before #4954).
let serverA: net.Server;
let serverB: net.Server;
let portA = 0;
let portB = 0;

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve((server.address() as net.AddressInfo).port);
    });
  });
}

before(async () => {
  serverA = net.createServer((s) => s.destroy());
  serverB = net.createServer((s) => s.destroy());
  portA = await listen(serverA);
  portB = await listen(serverB);
});

after(() => {
  serverA?.close();
  serverB?.close();
});

function credentialsWithProxies() {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints: [ACCOUNT_A, ACCOUNT_B],
      accountProxies: [
        { fingerprint: ACCOUNT_A, proxy: { type: "http", host: "127.0.0.1", port: portA } },
        { fingerprint: ACCOUNT_B, proxy: { type: "http", host: "127.0.0.1", port: portB } },
      ],
    },
  } as any;
}

describe("OpencodeExecutor per-account proxy + rotation (#4954)", () => {
  let originalFetch: typeof globalThis.fetch;
  let observed: Array<{ source: string; host: string | null; port: string | null }>;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    observed = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  /** Record the proxy context resolved for each dispatch, then return `status`. */
  function installFetchStub(statuses: number[]) {
    let call = 0;
    globalThis.fetch = (async (input: any) => {
      const url = typeof input === "string" ? input : input?.url || String(input);
      const resolved = resolveProxyForRequest(url);
      let host: string | null = null;
      let port: string | null = null;
      try {
        if (resolved.proxyUrl) {
          const u = new URL(resolved.proxyUrl);
          host = u.hostname;
          port = u.port;
        }
      } catch {
        host = resolved.proxyUrl;
      }
      observed.push({ source: resolved.source, host, port });
      const status = statuses[Math.min(call, statuses.length - 1)];
      call++;
      return new Response(JSON.stringify({ ok: status === 200 }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  }

  it("dispatches through the selected account's proxy (not direct)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetchStub([200]);

    const result = await exec.execute({
      model: "grok-code",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsWithProxies(),
      log,
    });

    assert.strictEqual((result as any).response.status, 200);
    assert.ok(observed.length >= 1, "at least one dispatch happened");
    const first = observed[0];
    assert.strictEqual(
      first.source,
      "context",
      `expected proxy-context egress, got source="${first.source}" (was always "direct" before #4954)`
    );
    assert.strictEqual(first.host, "127.0.0.1", "egress must use a configured proxy host");
    assert.ok(
      first.port === String(portA) || first.port === String(portB),
      `expected one of the configured proxy ports, got "${first.port}"`
    );
  });

  it("rotates to the next account (and its proxy) on a 429", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    // first account → 429, second account → 200
    installFetchStub([429, 200]);

    const result = await exec.execute({
      model: "grok-code",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsWithProxies(),
      log,
    });

    assert.strictEqual((result as any).response.status, 200, "final response should succeed");
    assert.ok(observed.length >= 2, "should have retried on a second account after 429");
    const ports = observed.map((p) => p.port);
    assert.ok(ports.includes(String(portA)), "first attempt should use account A's proxy");
    assert.ok(ports.includes(String(portB)), "rotated attempt should use account B's proxy");
    assert.notStrictEqual(
      observed[0].port,
      observed[1].port,
      "rotation must switch to a different account/proxy"
    );
    for (const p of observed) {
      assert.strictEqual(p.source, "context", "every dispatch must egress through a proxy context");
    }
  });

  // #5217 (Gap 2): the per-request account/proxy selection log was log.debug, which
  // is hidden at the default APP_LOG_LEVEL=info — operators could not see which
  // account/proxy a request rotated to. It must be emitted at info level.
  it("logs the account/proxy rotation selection at info level (#5217)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetchStub([200]);

    const infoCalls: Array<{ tag: unknown; msg: string }> = [];
    const debugCalls: Array<{ tag: unknown; msg: string }> = [];
    const spyLog = {
      debug: (tag: unknown, msg: string) => debugCalls.push({ tag, msg }),
      info: (tag: unknown, msg: string) => infoCalls.push({ tag, msg }),
      warn() {},
      error() {},
    };

    await exec.execute({
      model: "grok-code",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsWithProxies(),
      log: spyLog as any,
    });

    const dispatchInfo = infoCalls.find(
      (c) => c.tag === "OPENCODE" && /dispatch via account/.test(c.msg)
    );
    assert.ok(
      dispatchInfo,
      `expected an info-level "dispatch via account …" log; info calls=${JSON.stringify(infoCalls)}`
    );
    // The selection line must carry the masked account id + rotation index, and
    // must NOT be emitted at debug (where it would be invisible at default level).
    assert.match(dispatchInfo!.msg, /account aaaaaaaa…|account bbbbbbbb…/);
    assert.match(dispatchInfo!.msg, /idx \d+\/2/);
    assert.ok(
      !debugCalls.some((c) => /dispatch via account/.test(c.msg)),
      "the selection log must not also/only be at debug level"
    );
    // Masking guard: never log the full 32-char account id.
    assert.ok(
      !/(a{32}|b{32})/.test(dispatchInfo!.msg),
      "rotation log must keep the account id masked"
    );
  });

  // #5217 (secondary): the per-account proxy the executor pins internally must be
  // captured into an AppliedProxySink so the post-execution egress logger reflects
  // the real egress (was "direct") rather than the pre-resolved connection proxy.
  it("records the executor-applied account proxy into the AppliedProxySink (#5217)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetchStub([200]);

    const sink: { proxy: any } = { proxy: null };
    await runWithAppliedProxyCapture(sink, () =>
      exec.execute({
        model: "grok-code",
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
        stream: false,
        signal: null,
        credentials: credentialsWithProxies(),
        log,
      })
    );

    assert.ok(sink.proxy, "sink must capture the proxy the executor actually applied");
    assert.equal(sink.proxy.host, "127.0.0.1", "captured proxy host must match the account proxy");
    assert.ok(
      sink.proxy.port === portA || sink.proxy.port === portB,
      `captured proxy port must be one of the configured account proxies, got ${sink.proxy.port}`
    );
  });
});
