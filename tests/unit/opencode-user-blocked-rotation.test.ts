import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };

const FP_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const FP_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const FP_C = "cccccccccccccccccccccccccccccccc";
const FP_D = "dddddddddddddddddddddddddddddddd";

const BLOCKED_BODY = JSON.stringify({
  error: {
    type: "server_error",
    message:
      "Error from provider (Console): Upstream request failed: [user_blocked] Your access has been restricted due to repeated policy violations.",
  },
});
const GEO_BODY = JSON.stringify({
  error: { type: "RegionError", message: "This model is not available in your country." },
});

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
  if (fp === FP_A) return portA;
  if (fp === FP_B) return portB;
  if (fp === FP_C) return portC;
  return portD;
}

function credentialsFor(fingerprints: string[]): ProviderCredentials {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      accountProxies: fingerprints.map((fp) => ({
        fingerprint: fp,
        proxy: { type: "http", host: "127.0.0.1", port: portFor(fp) },
      })),
    },
  };
}

type AccountsProbe = Array<{
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
}>;

function accountsOf(exec: OpencodeExecutor): AccountsProbe {
  return (exec as unknown as { accounts: AccountsProbe }).accounts;
}

describe("OpencodeExecutor user_blocked rotation", () => {
  let originalFetch: typeof globalThis.fetch;
  let observed: string[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    observed = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
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

  function run(exec: OpencodeExecutor, creds: ProviderCredentials) {
    return exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    });
  }

  it("rotates past two user-blocked proxies to the healthy third", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: BLOCKED_BODY },
      { status: 403, body: BLOCKED_BODY },
      { status: 200 },
    ]);

    const result = await run(exec, credentialsFor([FP_A, FP_B, FP_C]));

    assert.strictEqual(
      (result as { response: Response }).response.status,
      200,
      "must rotate past user-blocked proxies"
    );
    assert.strictEqual(observed.length, 3, "one call per distinct proxy");
  });

  it("propagates a signal-less 403 and 451 immediately without rotation", async () => {
    for (const status of [403, 451]) {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([{ status, body: JSON.stringify({ error: { message: "invalid api key" } }) }]);

      const result = await run(exec, credentialsFor([FP_A, FP_B]));

      assert.strictEqual((result as { response: Response }).response.status, status);
      assert.strictEqual(observed.length, 1, `no retry on signal-less ${status}`);
      observed = [];
    }
  });

  it("propagates the last 403 after exhausting all proxies without marking success", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: BLOCKED_BODY },
      { status: 403, body: BLOCKED_BODY },
      { status: 403, body: BLOCKED_BODY },
      // NOTE: 4th step (200) unreachable via break — documents intent, not a real call.
      { status: 200 },
    ]);

    const result = await run(exec, credentialsFor([FP_A, FP_B, FP_C]));

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 3, "every proxy tried exactly once");
    for (const a of accountsOf(exec)) {
      assert.strictEqual(a.consecutiveFails, 0, "blocked accounts keep their prior fails");
      assert.strictEqual(a.cooldownUntil, 0, "no cooldown from user_blocked rotation");
    }
  });

  it("single proxied account: one call, immediate 403 (no dead retry)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 403, body: BLOCKED_BODY }, { status: 200 }]);

    const result = await run(exec, credentialsFor([FP_A]));

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1);
  });

  it("user_blocked rotation never cools the account down", async () => {
    // Warm-up materializes accounts; counters are preserved by fingerprint
    // across executes, so pre-loading to 2 detects a stray markCooldown
    // (would raise to 3). The winning account's success resets its own
    // counter via markSuccess — only the winner resets.
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 200 }]);
    await run(exec, credentialsFor([FP_A, FP_B]));
    const mid = accountsOf(exec);
    assert.strictEqual(mid.length, 2, "warm-up materialized both accounts");
    for (const a of mid) a.consecutiveFails = 2;
    installFetch([{ status: 403, body: BLOCKED_BODY }, { status: 200 }]);
    await run(exec, credentialsFor([FP_A, FP_B]));
    const after = accountsOf(exec);
    for (const a of after) {
      assert.strictEqual(a.cooldownUntil, 0, "no cooldown from user_blocked rotation");
    }
    assert.strictEqual(
      after.filter((a) => a.consecutiveFails === 0).length,
      1,
      "exactly one account reset to 0 (the winner via markSuccess)"
    );
    assert.strictEqual(
      after.filter((a) => a.consecutiveFails === 2).length,
      1,
      "the blocked account keeps its prior fails"
    );
  });

  it("does not rotate a 1010 fingerprint rejection carrying the signal", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: JSON.stringify({ error_code: 1010, message: "[user_blocked]" }) },
      // NOTE: 2nd step (200) unreachable (no 1010 retry) — documents intent, not a real call.
      { status: 200 },
    ]);

    const result = await run(exec, credentialsFor([FP_A, FP_B]));

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1, "fingerprint 1010 never rotates");
  });

  it("shares the tried-set with geo-blocked proxies in both directions", async () => {
    // A geo-blocked, B user-blocked, C healthy: neither tried proxy is re-called.
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: GEO_BODY },
      { status: 403, body: BLOCKED_BODY },
      { status: 200 },
    ]);

    const result = await run(exec, credentialsFor([FP_A, FP_B, FP_C]));

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 3, "no re-call of a tried proxy");
    assert.strictEqual(observed[2], String(portC), "healthy proxy picked last");

    // Reverse direction: A user-blocked, B geo-blocked, C healthy.
    const exec2 = new OpencodeExecutor("opencode-zen");
    observed = [];
    installFetch([
      { status: 403, body: BLOCKED_BODY },
      { status: 403, body: GEO_BODY },
      { status: 200 },
    ]);

    const result2 = await run(exec2, credentialsFor([FP_A, FP_B, FP_D]));

    assert.strictEqual((result2 as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 3, "no re-call of a tried proxy");
    assert.strictEqual(observed[2], String(portD), "healthy proxy picked last");
  });

  it("451 + user_blocked: no rotation, no success mark", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 451, body: BLOCKED_BODY }, { status: 200 }]);
    await run(exec, credentialsFor([FP_A, FP_B]));
    for (const a of accountsOf(exec)) {
      assert.strictEqual(a.consecutiveFails, 0, "no success marked on 451 passthrough");
      assert.strictEqual(a.cooldownUntil, 0, "no cooldown on 451 passthrough");
    }

    const exec2 = new OpencodeExecutor("opencode-zen");
    observed = [];
    installFetch([{ status: 451, body: BLOCKED_BODY }, { status: 200 }]);

    const result = await run(exec2, credentialsFor([FP_A, FP_B]));

    assert.strictEqual((result as { response: Response }).response.status, 451);
    assert.strictEqual(observed.length, 1, "no rotation on 451");
  });

  it("combined geo + user_blocked body rotates like geo", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      {
        status: 403,
        body: JSON.stringify({
          error: { type: "RegionError", message: "not available in your country [user_blocked]" },
        }),
      },
      { status: 200 },
    ]);

    const result = await run(exec, credentialsFor([FP_A, FP_B]));

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 2, "combined-signal body rotates exactly once");

    // The tried proxy stays excluded: a second failure on the peer exhausts
    // the fleet instead of re-calling the combined-signal proxy.
    const exec2 = new OpencodeExecutor("opencode-zen");
    observed = [];
    installFetch([
      {
        status: 403,
        body: JSON.stringify({
          error: { type: "RegionError", message: "not available in your country [user_blocked]" },
        }),
      },
      { status: 403, body: BLOCKED_BODY },
      // NOTE: 3rd step (200) unreachable via break — documents intent.
      { status: 200 },
    ]);

    const result2 = await run(exec2, credentialsFor([FP_A, FP_B]));

    assert.strictEqual((result2 as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 2, "combined-signal proxy never re-called");
  });
});
