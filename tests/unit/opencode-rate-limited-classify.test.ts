import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import {
  classify429,
  classifyUpstream429,
  parseRetryAfterSeconds,
  readBodyPrefix,
  RATE_LIMIT_BODY_SNIFF_BYTES,
} from "../../open-sse/executors/opencodeRateLimited.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { getProviderErrorRuleMatch } from "../../open-sse/config/providerErrorRules.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// #13657 rework: the 429 classifier is kept; stopping the cross-account wave at a
// classified 429 is opt-in (OPENCODE_RATE_LIMITED_429_EARLY_STOP, default off —
// the free tier is per egress IP, #9611). Whatever ends the wave, the client gets
// the REAL last upstream 429 (status, body, Retry-After, quota headers), never a
// synthetic drain, so the opencode provider error rules keep matching it.
const FLAG = "OPENCODE_RATE_LIMITED_429_EARLY_STOP";
const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FPS = ["x", "y", "z"].map((c) => c.repeat(32));
const MONTHLY_BODY = JSON.stringify({
  error: {
    message:
      "[429] Monthly usage limit reached. Resets in 13 days. To continue using this model now, enable usage from your available balance.",
  },
});

describe("classify429 / parseRetryAfterSeconds", () => {
  it("a parseable Retry-After alone classifies rate_limited", () => {
    assert.strictEqual(classify429({ retryAfter: "30" }), "rate_limited");
    assert.strictEqual(classify429({ retryAfter: 45 }), "rate_limited");
    const future = new Date(Date.now() + 120_000).toUTCString();
    assert.strictEqual(classify429({ retryAfter: future }), "rate_limited");
  });

  it("a body naming a rate or usage limit classifies rate_limited", () => {
    assert.strictEqual(classify429({ bodyText: "Rate limited, slow down" }), "rate_limited");
    assert.strictEqual(classify429({ bodyText: "Too many requests" }), "rate_limited");
    assert.strictEqual(classify429({ bodyText: MONTHLY_BODY }), "rate_limited");
  });

  it("anything else is a burst", () => {
    assert.strictEqual(classify429({}), "burst");
    assert.strictEqual(classify429({ bodyText: '{"error":"boom"}' }), "burst");
    assert.strictEqual(classify429({ retryAfter: "not-a-date" }), "burst");
    assert.strictEqual(classify429({ retryAfter: "" }), "burst");
  });

  it("parses delta-seconds and HTTP dates against an injected clock", () => {
    const now = Date.parse("2026-09-15T00:00:00Z");
    assert.strictEqual(parseRetryAfterSeconds("30", now), 30);
    assert.strictEqual(parseRetryAfterSeconds("Tue, 15 Sep 2026 00:02:00 GMT", now), 120);
    assert.strictEqual(parseRetryAfterSeconds("not-a-date", now), null);
    assert.strictEqual(parseRetryAfterSeconds(-5, now), null);
  });
});

describe("readBodyPrefix / classifyUpstream429", () => {
  it("reads only a bounded prefix and leaves the original body intact", async () => {
    const body = "a".repeat(RATE_LIMIT_BODY_SNIFF_BYTES) + " rate limited";
    const response = new Response(body, { status: 429 });
    const prefix = await readBodyPrefix(response);
    assert.strictEqual(
      prefix?.length,
      RATE_LIMIT_BODY_SNIFF_BYTES,
      "signal past the cap is unseen"
    );
    assert.strictEqual(await classifyUpstream429(response), "burst");
    assert.strictEqual(response.bodyUsed, false);
    assert.strictEqual(await response.text(), body, "the caller still gets the full body");
  });

  it("checks the header before touching the body", async () => {
    const response = new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": "7" },
    });
    assert.strictEqual(await classifyUpstream429(response), "rate_limited");
    assert.strictEqual(await response.text(), "Too many requests");
  });
});

describe("OpencodeExecutor 429 wave", () => {
  const servers: net.Server[] = [];
  const ports: number[] = [];
  let originalFetch: typeof globalThis.fetch;
  let priorFlag: string | undefined;
  let observed: string[];

  before(async () => {
    for (let i = 0; i < FPS.length; i++) {
      const server = net.createServer((s) => s.destroy());
      servers.push(server);
      ports.push(
        await new Promise<number>((resolve) =>
          server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port))
        )
      );
    }
  });

  after(() => {
    servers.forEach((s) => s.close());
    resetDbInstance();
  });

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    priorFlag = process.env[FLAG];
    observed = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (priorFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = priorFlag;
  });

  type Step = { status: number; body?: string; headers?: Record<string, string> };

  function installFetch(plan: Step[]) {
    let call = 0;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      observed.push(resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct");
      const step = plan[Math.min(call, plan.length - 1)];
      call++;
      return new Response(step.body ?? JSON.stringify({ ok: step.status === 200, call }), {
        status: step.status,
        headers: { "Content-Type": "application/json", ...(step.headers ?? {}) },
      });
    }) as typeof globalThis.fetch;
  }

  function credentials(count: number): ProviderCredentials {
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

  async function run(exec: OpencodeExecutor, count: number) {
    const result = (await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentials(count),
      log,
    })) as { response: Response };
    return result.response;
  }

  function cooled(exec: OpencodeExecutor): number {
    const accounts = (exec as unknown as { accounts: Array<{ cooldownUntil: number }> }).accounts;
    return accounts.filter((a) => a.cooldownUntil > Date.now()).length;
  }

  const RATE_LIMITED: Step = {
    status: 429,
    body: MONTHLY_BODY,
    headers: { "Retry-After": "30", "x-ratelimit-remaining-requests": "0" },
  };

  it("flag off: a classified 429 still rotates to the next account (#9611)", async () => {
    delete process.env[FLAG];
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([RATE_LIMITED, { status: 200 }]);

    const response = await run(exec, 2);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(observed.length, 2);
    await response.body?.cancel();
  });

  it("flag off: an exhausted wave returns the last real upstream 429 untouched", async () => {
    delete process.env[FLAG];
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 429, body: '{"error":"first"}' },
      { status: 429, body: '{"error":"second"}' },
      RATE_LIMITED,
    ]);

    const response = await run(exec, 3);

    assert.strictEqual(observed.length, 3);
    assert.strictEqual(response.status, 429);
    assert.strictEqual(response.headers.get("retry-after"), "30");
    assert.strictEqual(response.headers.get("x-ratelimit-remaining-requests"), "0");
    assert.strictEqual(response.headers.get("x-opencode-retry-state"), null, "nothing synthetic");
    assert.strictEqual(await response.text(), MONTHLY_BODY);
  });

  describe("flag on", () => {
    beforeEach(() => {
      process.env[FLAG] = "true";
    });

    it("stops at the first classified 429 and returns it untouched", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([RATE_LIMITED, { status: 200 }]);

      const response = await run(exec, 3);

      assert.strictEqual(observed.length, 1, "no further account is tried");
      assert.strictEqual(response.status, 429);
      assert.strictEqual(response.headers.get("retry-after"), "30");
      assert.strictEqual(response.headers.get("x-ratelimit-remaining-requests"), "0");
      assert.strictEqual(cooled(exec), 1, "the rate-limited account is cooled down");
      const text = await response.text();
      assert.strictEqual(text, MONTHLY_BODY, "upstream body preserved");
      const rule = getProviderErrorRuleMatch(
        "opencode-zen",
        429,
        Object.fromEntries(response.headers.entries()),
        JSON.parse(text)
      );
      assert.strictEqual(rule?.reason, "quota_exhausted", "provider error rules still match");
      assert.ok((rule?.cooldownMs ?? 0) > 24 * 60 * 60 * 1000, "the 13-day reset still applies");
    });

    it("a body-only signal stops without inventing a Retry-After", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([{ status: 429, body: '{"error":"Rate limited"}' }, { status: 200 }]);

      const response = await run(exec, 2);

      assert.strictEqual(observed.length, 1);
      assert.strictEqual(response.status, 429);
      assert.strictEqual(response.headers.get("retry-after"), null);
      assert.strictEqual(await response.text(), '{"error":"Rate limited"}');
    });

    it("an unclassified (burst) 429 keeps rotating", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([{ status: 429, body: '{"error":"boom"}' }, { status: 200 }]);

      const response = await run(exec, 2);

      assert.strictEqual(response.status, 200);
      assert.strictEqual(observed.length, 2);
      await response.body?.cancel();
    });

    it("an all-burst wave still returns the last real upstream 429", async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      installFetch([
        { status: 429, body: '{"error":"a"}' },
        { status: 429, body: '{"error":"b"}', headers: { "x-upstream": "last" } },
      ]);

      const response = await run(exec, 2);

      assert.strictEqual(observed.length, 2);
      assert.strictEqual(response.status, 429);
      assert.strictEqual(response.headers.get("x-upstream"), "last");
      assert.strictEqual(await response.text(), '{"error":"b"}');
    });
  });
});
