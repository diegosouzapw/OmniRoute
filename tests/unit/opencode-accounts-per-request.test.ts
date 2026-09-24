import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";

/**
 * Per-request account lists on the shared opencode executor instance.
 *
 * The executor instance is shared per alias, so two overlapping requests with
 * different credentials must each walk their own list: when request B rebuilds
 * the list while request A is still in flight, A must keep dispatching through
 * its own members. These tests pin the wiring:
 *
 *   1. Two overlapping requests with different credentials: each dispatches
 *      only through its own members (B rebuilding the list mid-flight must not
 *      move A's next dispatch onto B's members).
 *   2. The shared pick cursor still advances across sequential requests on the
 *      same alias (the second request does not restart at the first member).
 *   3. Per-member cooldown history survives a rebuild from the same
 *      credentials (a member refused just before is skipped, not re-picked).
 *
 * The dispatch layer is mocked by stubbing globalThis.fetch (exactly what the
 * empty-rejection test does). Four throwaway TCP listeners stand in for the
 * per-member proxies so runWithProxyContext's reachability probe passes.
 */

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };

const MEMBER_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const MEMBER_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const MEMBER_C = "cccccccccccccccccccccccccccccccc";
const MEMBER_D = "dddddddddddddddddddddddddddddddd";

const MARK_A = "req-scope-alpha";
const MARK_B = "req-scope-beta";

let serverA: net.Server;
let serverB: net.Server;
let serverC: net.Server;
let serverD: net.Server;
let portA = 0;
let portB = 0;
let portC = 0;
let portD = 0;

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
  serverC = net.createServer((s) => s.destroy());
  serverD = net.createServer((s) => s.destroy());
  portA = await listen(serverA);
  portB = await listen(serverB);
  portC = await listen(serverC);
  portD = await listen(serverD);
});

after(() => {
  serverA?.close();
  serverB?.close();
  serverC?.close();
  serverD?.close();
});

function portFor(fp: string): number {
  if (fp === MEMBER_A) return portA;
  if (fp === MEMBER_B) return portB;
  if (fp === MEMBER_C) return portC;
  return portD;
}

function credentialsFor(fingerprints: string[]): ProviderCredentials {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      ...(fingerprints.length > 0 && {
        accountProxies: fingerprints.map((fp) => ({
          fingerprint: fp,
          proxy: { type: "http", host: "127.0.0.1", port: portFor(fp) },
        })),
      }),
    },
  };
}

interface ObservedDispatch {
  mark: string;
  port: string | null;
}

describe("OpencodeExecutor per-request account lists", () => {
  let originalFetch: typeof globalThis.fetch;
  let observed: ObservedDispatch[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    observed = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function markOf(init: RequestInit | undefined): string {
    const body = typeof init?.body === "string" ? init.body : "";
    if (body.includes(MARK_A)) return MARK_A;
    if (body.includes(MARK_B)) return MARK_B;
    return "unknown";
  }

  function recordDispatch(url: unknown, init: RequestInit | undefined): string {
    const raw = typeof url === "string" ? url : url instanceof URL ? url.toString() : "";
    const resolved = resolveProxyForRequest(raw);
    const mark = markOf(init);
    observed.push({
      mark,
      port: resolved.proxyUrl ? new URL(resolved.proxyUrl).port : null,
    });
    return mark;
  }

  function okResponse(): Response {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  function refusedResponse(): Response {
    return new Response(JSON.stringify({ ok: false }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  function runRequest(exec: OpencodeExecutor, mark: string, fingerprints: string[]) {
    return exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: `hello ${mark}` }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor(fingerprints),
      log,
    });
  }

  it("exposes the historical direct member before any request ran", () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const cold = exec.accounts;
    assert.strictEqual(cold.length, 1, "cold read must expose the default member");
    assert.strictEqual(cold[0]?.fingerprint, "");
    assert.strictEqual(cold[0]?.cooldownUntil, 0);
    assert.strictEqual(cold[0]?.consecutiveFails, 0);
    assert.strictEqual(cold[0]?.proxy, null);
  });

  it("resets the shared pick cursor on the direct path after a fleet", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      recordDispatch(input as string, init);
      return okResponse();
    }) as typeof globalThis.fetch;

    const fleet = await runRequest(exec, MARK_A, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((fleet as { response: Response }).response.status, 200);
    assert.notStrictEqual(
      (exec as unknown as { nextAccountIdx: number }).nextAccountIdx,
      0,
      "fleet request must advance the cursor"
    );
    const direct = await runRequest(exec, MARK_A, []);
    assert.strictEqual((direct as { response: Response }).response.status, 200);
    assert.strictEqual(
      (exec as unknown as { nextAccountIdx: number }).nextAccountIdx,
      0,
      "direct path must reset the cursor, not inherit the fleet position"
    );
    assert.deepStrictEqual(
      observed.map((o) => o.port),
      [String(portA), null],
      "fleet dispatches on its member, direct dispatches without a member proxy"
    );
    observed = [];
    const fleetAgain = await runRequest(exec, MARK_B, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((fleetAgain as { response: Response }).response.status, 200);
    assert.strictEqual(
      observed[0]?.port,
      String(portA),
      "fleet after direct restarts at the first member"
    );
  });

  it("keeps each overlapping request on its own member list", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    let firstDispatchResolve!: () => void;
    const firstDispatchGate = new Promise<void>((resolve) => {
      firstDispatchResolve = resolve;
    });
    let releaseGate!: () => void;
    const gate = new Promise<void>((resolve) => {
      releaseGate = resolve;
    });

    let firstCalls = 0;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const mark = recordDispatch(input as string, init);
      if (mark === MARK_A && firstCalls === 0) {
        firstCalls++;
        firstDispatchResolve();
        await gate;
        return refusedResponse();
      }
      return okResponse();
    }) as typeof globalThis.fetch;

    const requestA = (bodyMark: string) =>
      exec.execute({
        model: "deepseek-v4-flash-free",
        body: { messages: [{ role: "user", content: `hello ${bodyMark}` }], stream: false },
        stream: false,
        signal: null,
        credentials: credentialsFor(
          bodyMark === MARK_A ? [MEMBER_A, MEMBER_B] : [MEMBER_C, MEMBER_D]
        ),
        log,
      });

    const promiseA = requestA(MARK_A);
    await firstDispatchGate;
    const resultB = await requestA(MARK_B);
    assert.strictEqual(
      (resultB as { response: Response }).response.status,
      200,
      "second request must succeed on its own list"
    );
    releaseGate();
    const resultA = await promiseA;

    assert.strictEqual(
      (resultA as { response: Response }).response.status,
      200,
      "first request must succeed after its held dispatch is refused"
    );
    const portsA = observed.filter((o) => o.mark === MARK_A).map((o) => o.port);
    const portsB = observed.filter((o) => o.mark === MARK_B).map((o) => o.port);
    assert.deepStrictEqual(
      portsA,
      [String(portA), String(portB)],
      "first request must stay on its own members after the second request rebuilt the list"
    );
    assert.ok(
      portsB.length >= 1 && portsB.every((p) => p === String(portC) || p === String(portD)),
      "second request must stay on its own members"
    );
  });

  it("advances the shared pick cursor across sequential requests", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      recordDispatch(input as string, init);
      return okResponse();
    }) as typeof globalThis.fetch;

    const first = await runRequest(exec, MARK_A, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((first as { response: Response }).response.status, 200);
    const second = await runRequest(exec, MARK_B, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((second as { response: Response }).response.status, 200);

    assert.deepStrictEqual(
      observed.map((o) => o.port),
      [String(portA), String(portB)],
      "second sequential request must continue past the first member"
    );
  });

  it("keeps member cooldown history across a rebuild from the same credentials", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    let calls = 0;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      recordDispatch(input as string, init);
      calls++;
      // First request: refuse the first member once, then serve everything.
      if (calls === 1) return refusedResponse();
      return okResponse();
    }) as typeof globalThis.fetch;

    const first = await runRequest(exec, MARK_A, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((first as { response: Response }).response.status, 200);
    assert.deepStrictEqual(
      observed.map((o) => o.port),
      [String(portA), String(portB)],
      "first request must move past the refused member"
    );

    observed = [];
    const second = await runRequest(exec, MARK_B, [MEMBER_A, MEMBER_B]);
    assert.strictEqual((second as { response: Response }).response.status, 200);
    assert.strictEqual(
      observed[0]?.port,
      String(portB),
      "rebuilt list must skip the member still cooling down, not re-pick it"
    );
  });
});
