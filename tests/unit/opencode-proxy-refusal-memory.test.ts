import { describe, it, before, after, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import * as memory from "../../open-sse/utils/proxyRefusalMemory.ts";
import { lastResort429 } from "../../open-sse/executors/opencodeEgressThrottle.ts";

// With PROXY_SKIP_RECENTLY_FAILED on, a refusal received on a proxied opencode account sets
// that member aside across requests; a direct account is never concerned. With the flag off
// (the default) the rotation is exactly the plain one.

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FINGERPRINTS = ["a".repeat(32), "b".repeat(32), "c".repeat(32)];
const servers: net.Server[] = [];
const ports: number[] = [];

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

before(async () => {
  for (let i = 0; i < 3; i++) {
    const server = net.createServer((socket) => socket.destroy());
    servers.push(server);
    ports.push(await listen(server));
  }
});

after(() => {
  for (const server of servers) server.close();
});

function proxyFor(index: number) {
  return { type: "http", host: "127.0.0.1", port: ports[index] };
}

function keyFor(index: number) {
  return memory.proxyEgressKey(proxyFor(index));
}

function credentials(
  accounts: Array<{ fp: string; proxyIndex: number | null }>
): ProviderCredentials {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints: accounts.map((a) => a.fp),
      accountProxies: accounts.map((a) => ({
        fingerprint: a.fp,
        proxy: a.proxyIndex === null ? null : proxyFor(a.proxyIndex),
      })),
    },
  };
}

describe("OpencodeExecutor proxy refusal memory", () => {
  let originalFetch: typeof globalThis.fetch;
  let observed: string[] = [];
  let statuses: number[] = [];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    memory.__resetProxyRefusalMemoryForTesting();
    process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      observed.push(resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct");
      const status = statuses.shift() ?? 200;
      return new Response(JSON.stringify({ ok: status === 200 }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    mock.timers.reset();
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  });

  const proxied = () => credentials(FINGERPRINTS.map((fp, i) => ({ fp, proxyIndex: i })));
  const port = (index: number) => String(ports[index]);

  async function run(exec: OpencodeExecutor, creds: ProviderCredentials, plan: number[]) {
    statuses = [...plan];
    observed = [];
    const result = await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    });
    return { status: (result as { response: Response }).response.status, observed: [...observed] };
  }

  // Account cooldowns are a separate, shorter mechanism: clear them so each assertion shows
  // the effect of the proxy memory alone.
  function clearCooldowns(exec: OpencodeExecutor) {
    const state = exec as unknown as { accounts: Array<{ cooldownUntil: number }> };
    for (const account of state.accounts) account.cooldownUntil = 0;
  }

  it("a received refusal sets that member aside for later requests", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const first = await run(exec, proxied(), [429, 200]);
    assert.deepStrictEqual(first.observed, [port(0), port(1)]);
    assert.strictEqual(first.status, 200);
    assert.strictEqual(memory.isProxyAvoided(keyFor(0)), true);

    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(2)]);
    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(1)]);
  });

  it("with the flag at its default (off) the refused proxy is tried again in turn", async () => {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    const exec = new OpencodeExecutor("opencode-zen");
    await run(exec, proxied(), [429, 200]);
    assert.strictEqual(memory.__proxyRefusalMemorySizeForTesting(), 0);

    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(2)]);
    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(0)]);
  });

  it("once the period ends the proxy is tried again", async () => {
    mock.timers.enable({ apis: ["Date"], now: 1_800_000_000_000 });
    const exec = new OpencodeExecutor("opencode-zen");
    await run(exec, proxied(), [429, 200]);

    mock.timers.tick(2 * 60_000 + 1);
    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(2)]);
    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(0)]);
  });

  it("with the flag off a member set aside earlier is not skipped", async () => {
    memory.noteProxyRefusal(keyFor(0), "ip_quota_429");
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    const exec = new OpencodeExecutor("opencode-zen");
    assert.deepStrictEqual((await run(exec, proxied(), [200])).observed, [port(0)]);
  });

  it("when every proxy is set aside one attempt still happens and its success clears it", async () => {
    for (let i = 0; i < 3; i++) memory.noteProxyRefusal(keyFor(i), "ip_quota_429");
    const exec = new OpencodeExecutor("opencode-zen");

    const result = await run(exec, proxied(), [200]);
    assert.strictEqual(result.status, 200);
    assert.deepStrictEqual(result.observed, [port(0)]);
    assert.strictEqual(memory.isProxyAvoided(keyFor(0)), false);
    assert.strictEqual(memory.isProxyAvoided(keyFor(1)), true);
  });

  it("a refusal on a proxyless account writes nothing, direct stays eligible", async () => {
    const mixed = () =>
      credentials([
        { fp: FINGERPRINTS[0], proxyIndex: null },
        { fp: FINGERPRINTS[1], proxyIndex: 1 },
      ]);
    const exec = new OpencodeExecutor("opencode-zen");

    const first = await run(exec, mixed(), [429, 200]);
    assert.deepStrictEqual(first.observed, ["direct", port(1)]);
    assert.strictEqual(memory.__proxyRefusalMemorySizeForTesting(), 0);

    clearCooldowns(exec);
    assert.deepStrictEqual((await run(exec, mixed(), [200])).observed, ["direct"]);
  });

  it("a connection without configured accounts never touches the memory", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const noAccounts: ProviderCredentials = {
      apiKey: null,
      accessToken: null,
      connectionId: "noauth",
      providerSpecificData: {},
    };
    // The fast path may retry a refusal internally: every planned answer is a refusal.
    await run(exec, noAccounts, [429, 429, 429, 429, 429]);
    assert.strictEqual(memory.__proxyRefusalMemorySizeForTesting(), 0);
  });

  it("after a 429, a member set aside by an earlier request still gets one real call", async () => {
    for (let i = 1; i < 3; i++) memory.noteProxyRefusal(keyFor(i), "ip_quota_429");
    const exec = new OpencodeExecutor("opencode-zen");

    const result = await run(exec, proxied(), [429, 200]);
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.observed.length, 2);
    assert.strictEqual(result.observed[0], port(0));
    assert.notStrictEqual(result.observed[1], port(0));
    const served = ports.findIndex((p) => String(p) === result.observed[1]);
    assert.strictEqual(memory.isProxyAvoided(keyFor(served)), false);
  });

  it("the last resort after a 429 is a single call, then the 429 is served", async () => {
    for (let i = 1; i < 3; i++) memory.noteProxyRefusal(keyFor(i), "ip_quota_429");
    const exec = new OpencodeExecutor("opencode-zen");

    const result = await run(exec, proxied(), [429, 429, 429]);
    assert.strictEqual(result.status, 429);
    assert.strictEqual(result.observed.length, 2);
    assert.strictEqual(new Set(result.observed).size, 2);
  });

  it("with the flag off, members cooling down from an earlier request still get one call", async () => {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    const exec = new OpencodeExecutor("opencode-zen");
    assert.strictEqual((await run(exec, proxied(), [429, 429, 429])).observed.length, 3);

    const result = await run(exec, proxied(), [429, 200]);
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.observed.length, 2);
    assert.notStrictEqual(result.observed[0], result.observed[1]);
  });
});

describe("lastResort429", () => {
  const account = (fingerprint: string, proxy: { host: string; port: number } | null) => ({
    fingerprint,
    cooldownUntil: Date.now() + 60_000,
    consecutiveFails: 1,
    proxy: proxy === null ? null : { type: "http", ...proxy },
  });
  const never = () => false;

  it("never hands out a proxy-less account and leaves the cursor untouched", () => {
    const accounts = [account("a", { host: "127.0.0.1", port: 1 }), account("b", null)];
    const cursor = { nextAccountIdx: 1, lastHealthyFingerprint: "b" };
    const spare = lastResort429(accounts, cursor, new Set(["127.0.0.1:1"]));

    assert.strictEqual(spare.take(429, accounts[0], never), null);
    assert.deepStrictEqual(cursor, { nextAccountIdx: 1, lastHealthyFingerprint: "b" });
  });

  it("hands out one open account per request, and only after a 429", () => {
    const accounts = [
      account("a", { host: "127.0.0.1", port: 1 }),
      account("b", { host: "127.0.0.1", port: 2 }),
    ];
    const spare = lastResort429(accounts, { nextAccountIdx: 0 }, new Set(["127.0.0.1:1"]));

    assert.strictEqual(spare.take(403, accounts[0], never), null);
    assert.strictEqual(spare.take(429, accounts[0], never), accounts[1]);
    assert.strictEqual(spare.take(429, accounts[0], never), null);
  });
});
