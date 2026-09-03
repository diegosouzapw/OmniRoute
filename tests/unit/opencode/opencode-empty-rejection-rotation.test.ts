import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../../open-sse/utils/proxyFetch.ts";
import {
  isEmptyUpstreamRejection,
  extractChatcmplId,
} from "../../../open-sse/executors/accountRotation.ts";

/**
 * Empty-upstream-rejection rotation (#design opencode-empty-rejection-rotation).
 *
 * An upstream 400 whose body carries no usable completion (the observed malformed
 * envelope: `choices[0].message` with no error field, no real content,
 * `finish_reason: null`) must be rotated/retried instead of propagated as a fatal
 * success — that was killing subagent sessions. These tests pin the wiring:
 *
 *   1. A 400 empty rejection rotates to the next account (and its proxy).
 *   2. The retry budget is bounded: +1 attempt for a single account, exactly N
 *      for an N-account all-empty run (propagate the last 400, never loop forever).
 *   3. A 400 carrying a real error field (or non-empty content) still propagates
 *      immediately — no cooldown, no success, no rotation.
 *   4. The 200/success path is never cloned or read (anti-bufferisation).
 *
 * The dispatch layer is mocked by stubbing globalThis.fetch (exactly what the
 * #4954 proxy integration test does). Three throwaway TCP listeners stand in for
 * the per-account proxies so runWithProxyContext's reachability probe passes.
 */

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };

const ACCOUNT_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const ACCOUNT_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const ACCOUNT_C = "cccccccccccccccccccccccccccccccc";

const EMPTY_BODY =
  '{"id":"chatcmpl_44fn2g6e7kk","object":"chat.completion","created":1787419957,"model":"muse-spark-1.2-contributor-free","choices":[{"index":0,"message":{"role":"assistant"},"finish_reason":null}]}';
const ERROR_BODY = JSON.stringify({
  error: { message: "bad request", type: "invalid_request_error" },
});

let serverA: net.Server;
let serverB: net.Server;
let serverC: net.Server;
let portA = 0;
let portB = 0;
let portC = 0;

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
  portA = await listen(serverA);
  portB = await listen(serverB);
  portC = await listen(serverC);
});

after(() => {
  serverA?.close();
  serverB?.close();
  serverC?.close();
});

function portFor(fp: string): number {
  if (fp === ACCOUNT_A) return portA;
  if (fp === ACCOUNT_B) return portB;
  return portC;
}

/** `fingerprints` accounts; `proxied` is the subset that get a dedicated proxy
 * (defaults to all). A proxy-less account shares the default egress. */
function credentialsFor(
  fingerprints: string[],
  proxied: string[] = [...fingerprints]
): ProviderCredentials {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      ...(proxied.length > 0 && {
        accountProxies: proxied.map((fp) => ({
          fingerprint: fp,
          proxy: { type: "http", host: "127.0.0.1", port: portFor(fp) },
        })),
      }),
    },
  };
}

/** A Response subclass that counts clone() so we can assert the executor never
 * buffers a 200/streaming response. Note: `clone()` returns a plain Response, so
 * only `clone()` is reliably counted (a read on the clone hits the native
 * method, not this override) — counting clones is the meaningful invariant. */
class SpyResponse extends Response {
  static clones = 0;
  clone(): Response {
    SpyResponse.clones++;
    return super.clone();
  }
}

interface PlanStep {
  status: number;
  body?: string;
  throw?: Error;
}

describe("OpencodeExecutor empty-rejection rotation", () => {
  let originalFetch: typeof globalThis.fetch;
  let observed: Array<{ source: string; host: string | null; port: string | null }>;
  const GUARD_FLAG = "NETWORK_ROTATION_SHARED_EGRESS_GUARD";
  let savedGuardFlag: string | undefined;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    observed = [];
    SpyResponse.clones = 0;
    savedGuardFlag = process.env[GUARD_FLAG];
    delete process.env[GUARD_FLAG];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (savedGuardFlag === undefined) delete process.env[GUARD_FLAG];
    else process.env[GUARD_FLAG] = savedGuardFlag;
  });

  function installFetch(plan: PlanStep[]) {
    let call = 0;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const resolved = resolveProxyForRequest(url);
      observed.push({
        source: resolved.source,
        host: resolved.proxyUrl ? new URL(resolved.proxyUrl).hostname : null,
        port: resolved.proxyUrl ? new URL(resolved.proxyUrl).port : null,
      });
      const step = plan[Math.min(call, plan.length - 1)];
      call++;
      if (step.throw) throw step.throw;
      return new SpyResponse(step.body ?? JSON.stringify({ ok: step.status === 200 }), {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  }

  /**
   * Launches the executor. Asserts the predicate itself behaves (regression guard
   * for the design's signature — the wiring tests below depend on it).
   */
  it("predicate matches the observed envelope and rejects real errors", () => {
    assert.strictEqual(isEmptyUpstreamRejection(400, EMPTY_BODY), true);
    assert.strictEqual(isEmptyUpstreamRejection(200, EMPTY_BODY), false);
    assert.strictEqual(isEmptyUpstreamRejection(400, ERROR_BODY), false);
    assert.strictEqual(extractChatcmplId(EMPTY_BODY), "chatcmpl_44fn2g6e7kk");
  });

  it("rotates to the next account on an empty 400 rejection (loop)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 400, body: EMPTY_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B]),
      log,
    });

    assert.strictEqual(
      (result as { response: Response }).response.status,
      200,
      "must rotate past the empty 400"
    );
    assert.ok(observed.length >= 2, "should have dispatched on a second account");
    assert.ok(
      observed.some((o) => o.port === String(portA)),
      "first attempt on account A"
    );
    assert.ok(
      observed.some((o) => o.port === String(portB)),
      "rotated attempt on account B"
    );
  });

  it("caps an all-empty N-account run at N attempts and propagates the last 400 intact", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 400, body: EMPTY_BODY },
      { status: 400, body: EMPTY_BODY },
      { status: 400, body: EMPTY_BODY },
      { status: 200 },
    ]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B, ACCOUNT_C]),
      log,
    });

    assert.strictEqual(
      (result as { response: Response }).response.status,
      400,
      "must propagate the last empty 400"
    );
    assert.strictEqual(observed.length, 3, "must NOT exceed N attempts (no infinite loop)");
    assert.ok(SpyResponse.clones >= 1, "the empty 400 path must read the body to classify it");
    const propagated = await (result as { response: Response }).response.clone().text();
    assert.strictEqual(propagated, EMPTY_BODY, "propagated 400 body must stay intact");
    for (const p of observed) {
      assert.strictEqual(p.source, "context", "every dispatch must egress through a proxy context");
    }
  });

  it("retries the same proxied account once when it is the only account", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 400, body: EMPTY_BODY },
      { status: 400, body: EMPTY_BODY },
    ]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 400);
    assert.strictEqual(observed.length, 2, "exactly one bounded retry on the sole account");
    assert.ok(
      observed.every((o) => o.port === String(portA)),
      "both attempts egress through the single account's proxy"
    );
  });

  it("coexists with 429 rotation and 200 success in the same request", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 429 }, { status: 400, body: EMPTY_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B, ACCOUNT_C]),
      log,
    });

    assert.strictEqual(
      (result as { response: Response }).response.status,
      200,
      "final response should succeed"
    );
    assert.strictEqual(observed.length, 3, "429 + empty-400 + success across three accounts");
    assert.ok(
      observed.some((o) => o.port === String(portA)),
      "account A (429)"
    );
    assert.ok(
      observed.some((o) => o.port === String(portB)),
      "account B (empty 400)"
    );
    assert.ok(
      observed.some((o) => o.port === String(portC)),
      "account C (200)"
    );
  });

  it("propagates a 400 carrying an error field immediately (no rotation)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 400, body: ERROR_BODY }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B]),
      log,
    });

    assert.strictEqual(
      (result as { response: Response }).response.status,
      400,
      "real error 400 must propagate"
    );
    assert.strictEqual(observed.length, 1, "must NOT rotate on a genuine error 400");
  });

  it("never clones or reads the body of a 200 via the loop", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 200 }, { status: 200 }, { status: 200 }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B, ACCOUNT_C]),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(SpyResponse.clones, 0, "loop 200 must never be cloned");
  });

  it("retries once via the fast path when a direct account answers an empty 400", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 400, body: EMPTY_BODY },
      { status: 400, body: EMPTY_BODY },
    ]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A], []),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 400);
    assert.strictEqual(observed.length, 2, "fast path must retry the direct account exactly once");
  });

  it("propagates the second 400 intact when the fast path retries and empty-rejects again", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([
      { status: 400, body: EMPTY_BODY },
      { status: 400, body: EMPTY_BODY },
    ]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A], []),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 400);
    const propagated = await (result as { response: Response }).response.clone().text();
    assert.strictEqual(propagated, EMPTY_BODY, "second rejection propagates with intact body");
    assert.strictEqual(observed.length, 2, "exactly one retry, no loop");
  });

  it("never clones or reads the body of a 200 via the fast path", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 200 }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: credentialsFor([ACCOUNT_A], []),
      log,
    });

    assert.strictEqual((result as { response: Response }).response.status, 200);
    assert.strictEqual(SpyResponse.clones, 0, "fast path 200 must never be cloned");
  });

  it("rotates to a proxied account after a proxy-less account empty-rejects (shared-egress guard on by default)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch([{ status: 400, body: EMPTY_BODY }, { status: 200 }]);

    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      // A proxy-less, B proxied: B must still be tried and succeed.
      credentials: credentialsFor([ACCOUNT_A, ACCOUNT_B], [ACCOUNT_B]),
      log,
    });

    assert.strictEqual(
      (result as { response: { status: number } }).response.status,
      200,
      "the proxied account (B) must still be tried and must succeed"
    );
    assert.strictEqual(observed.length, 2, "exactly one empty rejection (A) then one success (B)");
    assert.ok(
      observed.some((o) => o.source === "direct"),
      "first dispatch on the proxy-less account"
    );
    assert.ok(
      observed.some((o) => o.port === String(portB)),
      "rotated dispatch on the proxied account"
    );
  });
});
