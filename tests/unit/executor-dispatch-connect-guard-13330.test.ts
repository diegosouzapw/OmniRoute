// #13330 mandatory item 1 — the DNS-rebinding guard (GHSA-cmhj-wh2f-9cgx) on the provider dispatch
// path. `dispatchGuarded()` (open-sse/executors/dispatchPin.ts, used by BaseExecutor dispatch)
// validates the addresses of the lookup the connection is made with (connect time), for
// operator-supplied base URLs only. It must hand a `dispatcher` to the AMBIENT global fetch —
// never swap in a private fetch, or a configured outbound proxy would be bypassed (IP leak) and
// stubbed-fetch tests would reach the real upstream — and it must never do a DNS lookup itself.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import dns from "node:dns";

import { dispatchGuarded } from "../../open-sse/executors/dispatchPin.ts";
import { runWithDirectFetchContext } from "../../open-sse/utils/proxyFetch.ts";
import {
  CONNECT_GUARD_BLOCKED_CODE,
  createGuardedLookup,
} from "../../open-sse/utils/connectGuardDispatcher.ts";

const ENV_KEYS = [
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
];

function withEnv<T>(overrides: Record<string, string | undefined>, fn: () => Promise<T>) {
  const saved: Record<string, string | undefined> = {};
  for (const k of ENV_KEYS) saved[k] = process.env[k];
  for (const k of ENV_KEYS) delete process.env[k];
  Object.assign(process.env, overrides);
  return fn().finally(() => {
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });
}

const OPERATOR = { providerSpecificData: { baseUrl: "https://operator-host.invalid/v1" } };

/** Replace `dns.lookup` with a fixed answer; counts calls. */
function stubDnsLookup(address: string) {
  const original = dns.lookup;
  let calls = 0;
  (dns as { lookup: unknown }).lookup = (
    _hostname: string,
    options: unknown,
    callback: (err: null, addresses: unknown, family?: number) => void
  ) => {
    calls++;
    const all = typeof options === "object" && options !== null && "all" in options;
    const record = { address, family: address.includes(":") ? 6 : 4 };
    if (all && (options as { all?: boolean }).all) callback(null, [record]);
    else callback(null, record.address, record.family);
  };
  return {
    calls: () => calls,
    restore: () => {
      (dns as { lookup: unknown }).lookup = original;
    },
  };
}

/** Install a stub as the ambient global fetch; returns what it saw. */
function stubGlobalFetch() {
  const real = globalThis.fetch;
  const seen: Array<{ url: unknown; dispatcher: unknown }> = [];
  globalThis.fetch = (async (url: unknown, init?: { dispatcher?: unknown }) => {
    seen.push({ url, dispatcher: init?.dispatcher });
    return new Response("from-stub", { status: 200 });
  }) as typeof fetch;
  return {
    seen,
    restore: () => {
      globalThis.fetch = real;
    },
  };
}

async function withHttpServer(fn: (port: number) => Promise<void>) {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("guarded-dispatch-response");
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    await fn((address as { port: number }).port);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

// --- createGuardedLookup ---------------------------------------------------------------------

function lookupWith(guard: "public-only" | "block-metadata", addresses: string[]) {
  return createGuardedLookup(guard, (_h, _o, cb) =>
    cb(
      null,
      addresses.map((address) => ({ address, family: address.includes(":") ? 6 : 4 }))
    )
  );
}

function runLookup(
  lookup: ReturnType<typeof createGuardedLookup>,
  options: { all?: boolean }
): Promise<{ err: NodeJS.ErrnoException | null; address?: unknown; family?: number }> {
  return new Promise((resolve) =>
    lookup("host.invalid", options, (err, address, family) => resolve({ err, address, family }))
  );
}

test("guarded lookup blocks a cloud-metadata answer under block-metadata (all + single shapes)", async () => {
  for (const options of [{ all: true }, {}]) {
    const { err } = await runLookup(lookupWith("block-metadata", ["169.254.169.254"]), options);
    assert.equal((err as { code?: string }).code, CONNECT_GUARD_BLOCKED_CODE);
    assert.match(err!.message, /DNS rebinding/);
  }
});

test("guarded lookup blocks when ANY answer is blocked, not just the first", async () => {
  const { err } = await runLookup(lookupWith("public-only", ["93.184.216.34", "10.0.0.5"]), {
    all: true,
  });
  assert.equal((err as { code?: string }).code, CONNECT_GUARD_BLOCKED_CODE);
});

test("guarded lookup: public-only blocks private, block-metadata allows a LAN address", async () => {
  const strict = await runLookup(lookupWith("public-only", ["192.168.1.10"]), { all: true });
  assert.equal((strict.err as { code?: string }).code, CONNECT_GUARD_BLOCKED_CODE);
  const lax = await runLookup(lookupWith("block-metadata", ["192.168.1.10"]), { all: true });
  assert.equal(lax.err, null);
  assert.deepEqual(lax.address, [{ address: "192.168.1.10", family: 4 }]);
});

test("guarded lookup passes a public answer through in both callback shapes", async () => {
  const all = await runLookup(lookupWith("public-only", ["93.184.216.34"]), { all: true });
  assert.deepEqual(all.address, [{ address: "93.184.216.34", family: 4 }]);
  const single = await runLookup(lookupWith("public-only", ["93.184.216.34"]), {});
  assert.equal(single.address, "93.184.216.34");
  assert.equal(single.family, 4);
});

test("guarded lookup fails closed on an empty answer and forwards a resolver error", async () => {
  const empty = await runLookup(lookupWith("public-only", []), { all: true });
  assert.equal((empty.err as { code?: string }).code, CONNECT_GUARD_BLOCKED_CODE);
  const failing = createGuardedLookup("public-only", (_h, _o, cb) =>
    cb(Object.assign(new Error("boom"), { code: "ENOTFOUND" }), [])
  );
  const failed = await runLookup(failing, { all: true });
  assert.equal((failed.err as { code?: string }).code, "ENOTFOUND");
});

// --- dispatchGuarded ------------------------------------------------------------------------

test("dispatchGuarded hands a dispatcher to the CURRENT global fetch for an operator URL, with no DNS lookup", async () => {
  const dnsStub = stubDnsLookup("127.0.0.1");
  const fetchStub = stubGlobalFetch();
  try {
    await withEnv({}, async () => {
      const res = await dispatchGuarded(
        "openai",
        OPERATOR.providerSpecificData.baseUrl,
        {},
        OPERATOR
      );
      assert.equal(await res.text(), "from-stub", "the stubbed global fetch served the call");
    });
  } finally {
    fetchStub.restore();
    dnsStub.restore();
  }
  assert.equal(fetchStub.seen.length, 1);
  assert.ok(fetchStub.seen[0].dispatcher, "the guarded dispatcher rides on the global fetch");
  assert.equal(dnsStub.calls(), 0, "dispatch itself never resolves DNS (no stub interference)");
});

test("dispatchGuarded leaves the transport alone when there is no operator URL", async () => {
  const fetchStub = stubGlobalFetch();
  try {
    await withEnv({}, async () => {
      await dispatchGuarded("openai", "https://api.openai.com/v1", {}, null);
      await dispatchGuarded(
        "openai",
        "https://api.openai.com/v1",
        {},
        { providerSpecificData: {} }
      );
    });
  } finally {
    fetchStub.restore();
  }
  assert.deepEqual(
    fetchStub.seen.map((s) => s.dispatcher),
    [undefined, undefined]
  );
});

test("dispatchGuarded does not swap the transport for local providers or guard=none", async () => {
  const fetchStub = stubGlobalFetch();
  try {
    await withEnv({}, async () => {
      await dispatchGuarded("ollama-local", "https://example.com/v1", {}, OPERATOR);
    });
    await withEnv({ OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS: "true" }, async () => {
      await dispatchGuarded("openai", "https://example.com/v1", {}, OPERATOR);
    });
  } finally {
    fetchStub.restore();
  }
  assert.deepEqual(
    fetchStub.seen.map((s) => s.dispatcher),
    [undefined, undefined]
  );
});

test("dispatchGuarded does NOT touch the transport when an env proxy applies (no IP leak)", async () => {
  const fetchStub = stubGlobalFetch();
  try {
    await withEnv(
      { HTTPS_PROXY: "http://127.0.0.1:9", HTTP_PROXY: "http://127.0.0.1:9" },
      async () => {
        await dispatchGuarded("openai", "https://operator-host.invalid/v1", {}, OPERATOR);
      }
    );
  } finally {
    fetchStub.restore();
  }
  assert.equal(fetchStub.seen[0].dispatcher, undefined, "a proxied route keeps the ambient path");
});

test("dispatchGuarded does NOT touch the transport under the explicit direct-fetch sentinel", async () => {
  const fetchStub = stubGlobalFetch();
  try {
    await withEnv({}, async () => {
      await runWithDirectFetchContext(() =>
        dispatchGuarded("openai", "https://operator-host.invalid/v1", {}, OPERATOR)
      );
    });
  } finally {
    fetchStub.restore();
  }
  assert.equal(fetchStub.seen[0].dispatcher, undefined);
});

test("REAL fetch: an operator host that rebinds to a metadata address is refused at connect time", async () => {
  const dnsStub = stubDnsLookup("169.254.169.254");
  try {
    await withEnv({}, async () => {
      await assert.rejects(
        () => dispatchGuarded("openai", "http://rebind-host.invalid:81/v1", {}, OPERATOR),
        (error: unknown) => {
          const cause = (error as { cause?: { code?: string } }).cause;
          assert.equal(cause?.code, CONNECT_GUARD_BLOCKED_CODE);
          return true;
        }
      );
    });
  } finally {
    dnsStub.restore();
  }
  assert.ok(dnsStub.calls() >= 1, "the connection's own lookup was the one validated");
});

test("REAL fetch: an operator host resolving to an allowed address connects through the guarded dispatcher", async () => {
  const dnsStub = stubDnsLookup("127.0.0.1");
  try {
    // Default guard is block-metadata (local-first): loopback is allowed, only IMDS is blocked.
    await withEnv({}, async () => {
      await withHttpServer(async (port) => {
        const res = await dispatchGuarded(
          "openai",
          `http://allowed-host.invalid:${port}/v1`,
          {},
          OPERATOR
        );
        assert.equal(res.status, 200);
        assert.equal(await res.text(), "guarded-dispatch-response");
      });
    });
  } finally {
    dnsStub.restore();
  }
});

// --- BaseExecutor.execute wiring ------------------------------------------------------------
// The release tip routes execute()'s transport through `validationFetch()` (strict-validation
// fence). #13330 plugs `dispatchGuarded` in as that fence's transport, so both must hold at once.

test("execute(): strict-validation fence runs AND the operator URL rides the guarded dispatcher", async () => {
  const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
  const executor = new BaseExecutor("openai", {
    baseUrl: "https://api.openai.com/v1/chat/completions",
  });
  const real = globalThis.fetch;
  const seen: Array<{ dispatcher: unknown; redirect: unknown }> = [];
  globalThis.fetch = (async (
    _url: unknown,
    init?: { dispatcher?: unknown; redirect?: unknown }
  ) => {
    seen.push({ dispatcher: init?.dispatcher, redirect: init?.redirect });
    return Response.json({ choices: [{ message: { content: "ok" } }] });
  }) as typeof fetch;
  let fenceCalls = 0;
  try {
    await withEnv({}, async () => {
      await executor.execute({
        model: "gpt-4o-mini",
        body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "sk-test", ...OPERATOR },
        skipUpstreamRetry: true,
        validationDispatch: {
          beforeFetch() {
            fenceCalls++;
          },
          reject(): never {
            throw new Error("strict dispatch rejected");
          },
        },
      });
    });
  } finally {
    globalThis.fetch = real;
  }
  assert.equal(fenceCalls, 1, "the strict-validation fence observed the dispatch");
  assert.equal(seen.length, 1);
  assert.equal(seen[0].redirect, "error", "the fence's redirect lock reached the transport");
  assert.ok(seen[0].dispatcher, "the guarded dispatcher rode on the global fetch");
});
