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

const FP_D = "dddddddddddddddddddddddddddddddd";

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

describe("OpencodeExecutor geo-block rotation", () => {
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

  it("rotates past two geo-blocked proxies to the healthy third", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: GEO_BODY },
      { status: 403, body: GEO_BODY },
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B, FP_C]),
      log,
    });

    assert.strictEqual(
      (result as { response: Response }).response.status,
      200,
      "must rotate past geo-blocked proxies"
    );
    assert.strictEqual(observed.length, 3, "one call per distinct proxy");
    assert.ok(
      observed[0] === String(portA) &&
        observed.includes(String(portB)) &&
        observed.includes(String(portC)),
      "first attempt on A (fresh cursor), then rotation over untried proxies"
    );
  });

  it("deduplicates fingerprints sharing one proxy (one call, not two)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    // FP_A and FP_B share portA; FP_C is healthy on portC.
    const creds = credentialsFor([FP_A, FP_B, FP_C]);
    (creds.providerSpecificData as Record<string, unknown>).accountProxies = [
      { fingerprint: FP_A, proxy: { type: "http", host: "127.0.0.1", port: portA } },
      { fingerprint: FP_B, proxy: { type: "http", host: "127.0.0.1", port: portA } },
      { fingerprint: FP_C, proxy: { type: "http", host: "127.0.0.1", port: portC } },
    ];
    installFetch([{ status: 403, body: GEO_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 2, "shared proxy tried once, never re-called");
    assert.ok(observed.includes(String(portA)) && observed.includes(String(portC)));
  });

  it("propagates a motif-less 403 immediately without rotation", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: JSON.stringify({ error: { message: "invalid api key" } }) },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1, "no retry on non-geo 403");
  });

  it("propagates the last 403 after exhausting all proxies", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: GEO_BODY },
      { status: 403, body: GEO_BODY },
      { status: 403, body: GEO_BODY },
      // NOTE: 4th step (200) unreachable via break — documents intent, not a real call.
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B, FP_C]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 3, "every proxy tried exactly once");
    for (const port of [portA, portB, portC]) {
      assert.ok(observed.includes(String(port)), `proxy ${port} tried`);
    }
  });

  it("single proxied account: one call, immediate 403 (no dead retry)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 403, body: GEO_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1);
  });

  it("geo rotation never cools the account down", async () => {
    // Warm-up materializes accounts; counters are preserved by fingerprint
    // across executes (opencode.ts:310-320), so pre-loading to 2 detects a
    // stray markCooldown (would raise to 3). The winning account's success
    // resets its own counter via markSuccess — only the winner resets.
    const exec2 = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 200 }]);
    await exec2.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });
    const mid = (
      exec2 as unknown as {
        accounts: Array<{ fingerprint: string; cooldownUntil: number; consecutiveFails: number }>;
      }
    ).accounts;
    assert.strictEqual(mid.length, 2, "warm-up materialized both accounts");
    for (const a of mid) a.consecutiveFails = 2;
    installFetch([{ status: 403, body: GEO_BODY }, { status: 200 }]);
    await exec2.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });
    const after = (
      exec2 as unknown as {
        accounts: Array<{ fingerprint: string; cooldownUntil: number; consecutiveFails: number }>;
      }
    ).accounts;
    for (const a of after) {
      assert.strictEqual(a.cooldownUntil, 0, "no cooldown from geo rotation");
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

  it("a geo-tried proxy is never re-called even after a 429", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    // A geo-blocked (tried), B rate-limited (cooled, untried-403), C geo-blocked
    // (tried), D healthy. The 4th pick must be D — never A or C again.
    const creds = credentialsFor([FP_A, FP_B, FP_C, FP_D]);
    installFetch([
      { status: 403, body: GEO_BODY },
      { status: 429 },
      { status: 403, body: GEO_BODY },
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 4, "no re-call of a tried proxy");
    assert.strictEqual(
      observed.filter((p) => p === String(portA)).length,
      1,
      "tried proxy A called exactly once"
    );
    assert.strictEqual(
      observed.filter((p) => p === String(portC)).length,
      1,
      "tried proxy C called exactly once"
    );
    assert.strictEqual(observed[3], String(portD), "healthy proxy D picked last");
  });

  it("rotates on 451 geo like on 403", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 451, body: GEO_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 2);
  });

  it("does not retry a 1010 fingerprint rejection as geo", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: JSON.stringify({ error_code: 1010, message: "blocked" }) },
      // NOTE: 2nd step (200) unreachable (no 1010 retry) — documents intent, not a real call.
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1, "fingerprint 1010 never rotates as geo");
  });

  it("uses the direct account once, last, when all proxies are tried", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = credentialsFor([FP_A, FP_B]);
    (creds.providerSpecificData as Record<string, unknown>).accountProxies = [
      { fingerprint: FP_A, proxy: { type: "http", host: "127.0.0.1", port: portA } },
    ];
    installFetch([{ status: 403, body: GEO_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 2, "one proxied + one direct, direct last");
    assert.strictEqual(observed[0], String(portA));
    assert.strictEqual(observed[1], "direct");
  });

  it("keeps the 200 success body intact after a geo rotation", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 403, body: GEO_BODY },
      { status: 200, body: '{"ok":true}' },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    const response = (result as { response: Response }).response;
    assert.strictEqual(response.status, 200);
    assert.strictEqual(await response.text(), '{"ok":true}');
  });

  it("combined keyed-1010 plus geo phrase never rotates (fingerprint first)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      {
        status: 403,
        body: JSON.stringify({
          error_code: 1010,
          message: "not available in your country",
        }),
      },
      // NOTE: 2nd step (200) unreachable (1010 rejection = no retry) — documents intent, not a real call.
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1, "fingerprint rejection wins over geo phrase");
  });

  it("phrase-only geo signal without type still rotates", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      {
        status: 403,
        body: JSON.stringify({
          error: { message: "This model is not available in your country." },
        }),
      },
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(observed.length, 2, "phrase match alone rotates, no type needed");
  });

  it("fail-closed: bare country mention without the geo prefix does not rotate", async () => {
    // Bare location text is not a geo signal: only the full
    // "not available in your country/region" phrasing rotates.
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      {
        status: 403,
        body: JSON.stringify({
          error: { message: "quota for in your country dashboard exceeded" },
        }),
      },
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([FP_A, FP_B]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 403);
    assert.strictEqual(observed.length, 1, "no retry without the full geo phrasing");
  });
});
