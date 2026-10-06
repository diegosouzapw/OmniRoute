import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// #13498 rework: rotation on an upstream `user_blocked` refusal is opt-in
// (OPENCODE_USER_BLOCKED_ROTATION, default off), bounded to one hop, treats 403
// and 451 the same, cools the refused account down and cancels the body of the
// refusal it rotates away from.
const FLAG = "OPENCODE_USER_BLOCKED_ROTATION";
const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };

const FPS = ["a", "b", "c", "d"].map((c) => c.repeat(32));

const BLOCKED_BODY = JSON.stringify({
  error: {
    type: "server_error",
    message:
      "Error from provider (Console): Upstream request failed: [user_blocked] egress refused.",
  },
});
const GEO_BODY = JSON.stringify({
  error: { type: "RegionError", message: "This model is not available in your country." },
});

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

type AccountsProbe = Array<{
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
}>;

function accountsOf(exec: OpencodeExecutor): AccountsProbe {
  return (exec as unknown as { accounts: AccountsProbe }).accounts;
}

describe("OpencodeExecutor user_blocked refusal (OPENCODE_USER_BLOCKED_ROTATION)", () => {
  let originalFetch: typeof globalThis.fetch;
  let priorFlag: string | undefined;
  let observed: string[];
  // Every upstream Response handed to the executor, in dispatch order. A body the
  // loop cancelled is disturbed (bodyUsed === true) even though nobody read it.
  let upstream: Response[];

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorFlag = process.env[FLAG];
    observed = [];
    upstream = [];
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
      const response = new Response(step.body ?? JSON.stringify({ ok: true }), {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      });
      upstream.push(response);
      return response;
    }) as typeof globalThis.fetch;
  }

  async function run(exec: OpencodeExecutor, creds: ProviderCredentials) {
    const result = (await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    })) as { response: Response };
    return result.response;
  }

  describe("flag off (default): the refusal is returned unchanged", () => {
    for (const status of [403, 451]) {
      it(`${status} user_blocked: one call, no rotation, no cooldown`, async () => {
        delete process.env[FLAG];
        const exec = new OpencodeExecutor("opencode-zen");
        installFetch([{ status, body: BLOCKED_BODY }, { status: 200 }]);

        const response = await run(exec, credentialsFor(3));

        assert.strictEqual(response.status, status);
        assert.strictEqual(await response.text(), BLOCKED_BODY, "upstream body preserved");
        assert.strictEqual(observed.length, 1, "no failover without the flag");
        for (const a of accountsOf(exec)) assert.strictEqual(a.cooldownUntil, 0);
      });
    }
  });

  describe("flag on", () => {
    beforeEach(() => {
      process.env[FLAG] = "true";
    });

    for (const status of [403, 451]) {
      it(`${status} user_blocked rotates once to a healthy account and cools the refused one`, async () => {
        const exec = new OpencodeExecutor("opencode-zen");
        installFetch([{ status, body: BLOCKED_BODY }, { status: 200 }]);

        const response = await run(exec, credentialsFor(3));

        assert.strictEqual(response.status, 200);
        assert.strictEqual(observed.length, 2);
        const cooled = accountsOf(exec).filter((a) => a.cooldownUntil > Date.now());
        assert.deepStrictEqual(
          cooled.map((a) => a.fingerprint),
          [FPS[0]],
          "only the refused account is cooled down"
        );
        assert.strictEqual(upstream[0].bodyUsed, true, "the abandoned refusal body is cancelled");
        assert.strictEqual(response.bodyUsed, false, "the served body is untouched");
        await response.body?.cancel();
      });
    }

    it("rotates at most once: the second refusal is returned without trying a third account", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([
        { status: 403, body: BLOCKED_BODY },
        { status: 451, body: BLOCKED_BODY },
        { status: 200 },
      ]);

      const response = await run(exec, credentialsFor(3));

      assert.strictEqual(response.status, 451);
      assert.strictEqual(await response.text(), BLOCKED_BODY, "the returned refusal is intact");
      assert.strictEqual(observed.length, 2, "bounded: one rotation only");
      const accounts = accountsOf(exec);
      assert.strictEqual(accounts.filter((a) => a.cooldownUntil > Date.now()).length, 2);
      for (const fp of [FPS[0], FPS[1]]) {
        const account = accounts.find((a) => a.fingerprint === fp);
        assert.strictEqual(
          account?.consecutiveFails,
          1,
          "refused accounts are never marked success"
        );
      }
      assert.strictEqual(upstream[0].bodyUsed, true, "the superseded refusal body is cancelled");
    });

    it("single proxied account: the refusal comes back after one call", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([{ status: 403, body: BLOCKED_BODY }, { status: 200 }]);

      const response = await run(exec, credentialsFor(1));

      assert.strictEqual(response.status, 403);
      assert.strictEqual(observed.length, 1);
      assert.strictEqual(accountsOf(exec)[0].consecutiveFails, 1, "cooldown recorded, no success");
    });

    it("the exhaustion path returns the kept refusal with its body intact", async () => {
      // A refused (the one rotation), B throws a network error → the loop exhausts and
      // surfaces A's kept refusal, whose body must still be readable.
      const exec = new OpencodeExecutor("opencode-zen");
      let call = 0;
      globalThis.fetch = (async (input: RequestInfo | URL) => {
        const url =
          typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
        observed.push(resolveProxyForRequest(url).proxyUrl ?? "direct");
        call++;
        if (call === 1) return new Response(BLOCKED_BODY, { status: 403 });
        throw new TypeError("fetch failed");
      }) as typeof globalThis.fetch;

      const response = await run(exec, credentialsFor(2));

      assert.strictEqual(response.status, 403);
      assert.strictEqual(await response.text(), BLOCKED_BODY);
      assert.strictEqual(observed.length, 2);
    });

    it("a signal-less 403/451 still passes through untouched", async () => {
      for (const status of [403, 451]) {
        const exec = new OpencodeExecutor("opencode-zen");
        observed = [];
        installFetch([{ status, body: JSON.stringify({ error: { message: "invalid api key" } }) }]);

        const response = await run(exec, credentialsFor(2));

        assert.strictEqual(response.status, status);
        assert.strictEqual(observed.length, 1, `no retry on signal-less ${status}`);
      }
    });

    it("never rotates a Cloudflare 1010 fingerprint rejection carrying the token", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([
        { status: 403, body: JSON.stringify({ error_code: 1010, message: "[user_blocked]" }) },
        { status: 200 },
      ]);

      const response = await run(exec, credentialsFor(2));

      assert.strictEqual(response.status, 403);
      assert.strictEqual(observed.length, 1);
    });

    it("shares the tried-set with geo rotation and does not spend its budget on geo", async () => {
      // A geo-blocked (geo rotation, unbounded as before), B refused (the one user_blocked hop),
      // C healthy.
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([
        { status: 403, body: GEO_BODY },
        { status: 403, body: BLOCKED_BODY },
        { status: 200 },
      ]);

      const response = await run(exec, credentialsFor(3));

      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(observed, [String(ports[0]), String(ports[1]), String(ports[2])]);
      await response.body?.cancel();
    });
  });
});
