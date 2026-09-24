import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  _resetToolObservationForTests,
  getObservedToolNames,
  recordAcceptedToolNames,
} from "../../open-sse/executors/opencodeToolObservation.ts";

// Upstream free-tier refusal: the request identity/shape is rejected, the account
// is not. Rotating cannot help (every account gets the same verdict from the same
// request), and the refusal must never improve the account's rotation health —
// markSuccess resets the failure history that drives the cooldown backoff.
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
const REAL_400_BODY = JSON.stringify({
  error: { type: "invalid_request_error", message: "max_tokens is too large" },
});

const log: ExecutorLog = { debug() {}, info() {}, warn() {}, error() {} };
const FPS = ["a", "b", "c"].map((c) => c.repeat(32));
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

describe("OpencodeExecutor free-tier refusal", () => {
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
      return new Response(step.body ?? JSON.stringify({ ok: true }), {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  }

  async function run(exec: OpencodeExecutor, creds: ProviderCredentials) {
    const result = (await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      // The client declares its own tool list: the request contract adds nothing, so a refusal
      // is returned as-is. (When the contract injects the tools itself, the executor replays
      // the request once in the other shape first: see opencode-request-shape-retry.test.ts.)
      body: {
        messages: [{ role: "user", content: "hi" }],
        tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
        stream: false,
      },
      stream: false,
      signal: null,
      credentials: creds,
      log,
    })) as { response: Response };
    return result.response;
  }

  // Materialize the account list, then set the health the refusal must not touch.
  async function warmUp(exec: OpencodeExecutor, creds: ProviderCredentials) {
    installFetch([{ status: 200 }]);
    const warm = await run(exec, creds);
    await warm.body?.cancel();
    observed = [];
    for (const account of accountsOf(exec)) account.consecutiveFails = 2;
  }

  for (const status of [403, 451]) {
    it(`${status}: returned as-is, no rotation, account health untouched`, async () => {
      const exec = new OpencodeExecutor("opencode-zen");
      const creds = credentialsFor(3);
      await warmUp(exec, creds);
      installFetch([{ status, body: REFUSAL_BODY }, { status: 200 }]);

      const response = await run(exec, creds);

      assert.strictEqual(response.status, status);
      assert.strictEqual(await response.text(), REFUSAL_BODY, "upstream body preserved");
      assert.strictEqual(observed.length, 1, "no rotation: every account gets the same verdict");
      for (const account of accountsOf(exec)) {
        assert.strictEqual(account.consecutiveFails, 2, "never marked success");
        assert.strictEqual(account.cooldownUntil, 0, "no cooldown: the account is not at fault");
      }
    });
  }

  it("a single account behaves the same (no special case)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = credentialsFor(1);
    await warmUp(exec, creds);
    installFetch([{ status: 403, body: REFUSAL_BODY }, { status: 200 }]);

    const response = await run(exec, creds);

    assert.strictEqual(response.status, 403);
    assert.strictEqual(observed.length, 1);
    assert.strictEqual(accountsOf(exec)[0].consecutiveFails, 2);
  });

  it("a 400 carrying a real upstream error no longer marks the account successful", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = credentialsFor(2);
    await warmUp(exec, creds);
    installFetch([{ status: 400, body: REAL_400_BODY }]);

    const response = await run(exec, creds);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(await response.text(), REAL_400_BODY);
    for (const account of accountsOf(exec)) {
      assert.strictEqual(account.consecutiveFails, 2, "a rejected request is not a success");
    }
  });

  it("an unmatched refusal status no longer marks the account successful", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = credentialsFor(2);
    await warmUp(exec, creds);
    installFetch([
      { status: 401, body: JSON.stringify({ error: { message: "invalid api key" } }) },
    ]);

    const response = await run(exec, creds);

    assert.strictEqual(response.status, 401);
    await response.body?.cancel();
    for (const account of accountsOf(exec)) {
      assert.strictEqual(account.consecutiveFails, 2);
    }
  });

  it("a successful response still clears the account's failure history", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = credentialsFor(2);
    await warmUp(exec, creds);
    installFetch([{ status: 200 }]);

    const response = await run(exec, creds);

    assert.strictEqual(response.status, 200);
    await response.body?.cancel();

    const served = accountsOf(exec).filter((a) => a.consecutiveFails === 0);
    assert.strictEqual(served.length, 1, "the account that served is reset");
  });
});

describe("OpencodeExecutor free-tier refusal retry with observed tools", () => {
  let originalFetch: typeof globalThis.fetch;
  let seenTools: Array<readonly string[] | null>;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    seenTools = [];
    _resetToolObservationForTests();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function toolNameOf(entry: unknown): string | null {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
    const rec = entry as { name?: unknown; function?: { name?: unknown } };
    const name = typeof rec.name === "string" ? rec.name : rec.function?.name;
    return typeof name === "string" ? name : null;
  }

  async function runWithBody(exec: OpencodeExecutor, body: unknown) {
    return (await exec.execute({
      model: "muse-spark-1.3-contributor-free",
      body,
      stream: true,
      signal: null,
      credentials: {
        apiKey: null,
        accessToken: null,
        connectionId: "noauth",
        providerSpecificData: {},
      },
      log,
    })) as { response: Response };
  }

  // Single direct account (fast path): first dispatch 403 FreeTier, retry carries
  // the union and succeeds — one extra fetch, original tools intact first.
  it("retries once with observed names appended and returns the retry success", async () => {
    const exec = new OpencodeExecutor("opencode");
    recordAcceptedToolNames("opencode", "muse-spark-1.3-contributor-free", undefined, [
      "edit",
      "write",
    ]);
    const calls: Array<{ status: number; body?: string }> = [
      { status: 403, body: REFUSAL_BODY },
      { status: 200, body: JSON.stringify({ ok: true }) },
    ];
    let call = 0;
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const parsed = JSON.parse(String((init as Record<string, unknown>)?.body ?? "{}")) as {
        tools?: unknown[];
      };
      seenTools.push(Array.isArray(parsed.tools) ? parsed.tools.map(toolNameOf) : null);
      const step = calls[Math.min(call, calls.length - 1)];
      call++;
      return new Response(step.body ?? "{}", {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;

    const clientBody = {
      model: "muse-spark-1.3-contributor-free",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      tools: [
        { type: "function", function: { name: "glob", parameters: { type: "object" } } },
        { type: "function", function: { name: "read", parameters: { type: "object" } } },
      ],
    };
    const result = await runWithBody(exec, clientBody);

    assert.strictEqual(result.response.status, 200);
    assert.strictEqual(seenTools.length, 2, "exactly one retry dispatch");
    assert.deepEqual(seenTools[0], ["glob", "read"], "first dispatch keeps client tools");
    assert.deepEqual(
      seenTools[1],
      ["glob", "read", "edit", "write"],
      "retry appends observed names after client tools"
    );
    await result.response.body?.cancel();
  });

  // Retry refusal: the ORIGINAL 403 is propagated and the store is untouched.
  it("propagates the original refusal when the retry is refused, store untouched", async () => {
    const exec = new OpencodeExecutor("opencode");
    recordAcceptedToolNames("opencode", "muse-spark-1.3-contributor-free", undefined, ["edit"]);
    globalThis.fetch = (async () => {
      return new Response(REFUSAL_BODY, {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;

    const result = await runWithBody(exec, {
      model: "muse-spark-1.3-contributor-free",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      tools: [{ type: "function", function: { name: "glob", parameters: { type: "object" } } }],
    });

    assert.strictEqual(result.response.status, 403);
    assert.strictEqual(await result.response.text(), REFUSAL_BODY);
    assert.deepEqual(getObservedToolNames("opencode", "muse-spark-1.3-contributor-free"), ["edit"]);
  });

  // Nothing observed to add: no second fetch.
  it("skips the retry when the store holds nothing new", async () => {
    const exec = new OpencodeExecutor("opencode");
    let fetches = 0;
    globalThis.fetch = (async () => {
      fetches++;
      return new Response(REFUSAL_BODY, {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;

    const result = await runWithBody(exec, {
      model: "muse-spark-1.3-contributor-free",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      tools: [{ type: "function", function: { name: "glob", parameters: { type: "object" } } }],
    });

    assert.strictEqual(result.response.status, 403);
    assert.strictEqual(fetches, 1, "no retry without observed names");
  });
});
