/**
 * #13616 — generic billing/quota for `openai-compatible-*` connections.
 *
 * These connections get an id minted per connection, so they can never be
 * members of USAGE_SUPPORTED_PROVIDERS or of the switch in services/usage.ts.
 * The capability therefore has to be read off the connection, and the response
 * shape has to come from a mapping rather than from a hard-coded upstream.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolvePath, getOpenAiCompatibleUsage, buildAuthHeaders } =
  await import("../../open-sse/services/usage/openaiCompatible.ts");
const { supportsProviderQuota } = await import("../../src/shared/utils/providerQuotaVisibility.ts");

const ENDPOINT = {
  url: "https://api.example.com/v1/credits",
  auth: "bearer" as const,
  plan: "$.data.plan",
  quotas: {
    credits: {
      used: "$.data.used_usd",
      total: "$.data.limit_usd",
      resetAt: "$.data.renews_at",
      currency: "USD",
    },
  },
};
const BODY = {
  data: { plan: "Scale", used_usd: 40, limit_usd: 100, renews_at: "2026-10-01T00:00:00Z" },
};

function withFetch(body: unknown, status = 200, fn: () => Promise<void>) {
  const original = globalThis.fetch;
  const calls: { url: string; headers: Record<string, string> }[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url: String(url), headers: (init?.headers ?? {}) as Record<string, string> });
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  return fn()
    .finally(() => {
      globalThis.fetch = original;
    })
    .then(() => calls);
}

test("resolvePath walks dot and bracket paths, and gives up rather than guessing", () => {
  const root = { a: { b: [{ c: 7 }] }, zero: 0, empty: "" };
  assert.equal(resolvePath(root, "$.a.b[0].c"), 7);
  assert.equal(resolvePath(root, "a.b.0.c"), 7);
  assert.equal(resolvePath(root, "$.zero"), 0, "0 is a value, not a miss");
  assert.equal(resolvePath(root, "$.empty"), "");
  assert.equal(resolvePath(root, "$.a.missing.c"), undefined);
  assert.equal(resolvePath(root, "$.a.b[9].c"), undefined);
  assert.equal(resolvePath(root, ""), undefined);
});

test("a mapped response becomes a UsageQuota", async () => {
  let result: Record<string, never> | undefined;
  await withFetch(BODY, 200, async () => {
    result = (await getOpenAiCompatibleUsage("sk-test", { quotaEndpoint: ENDPOINT })) as never;
  });
  const r = result as unknown as { plan: string; quotas: Record<string, Record<string, unknown>> };
  assert.equal(r.plan, "Scale");
  assert.deepEqual(
    { ...r.quotas.credits },
    {
      used: 40,
      total: 100,
      remaining: 60,
      remainingPercentage: 60,
      resetAt: "2026-10-01T00:00:00.000Z",
      unlimited: false,
      currency: "USD",
    }
  );
});

test("auth mode selects the header, and custom headers merge last", () => {
  assert.equal(buildAuthHeaders({ url: "u" }, "sk").authorization, "Bearer sk");
  assert.equal(buildAuthHeaders({ url: "u", auth: "x-api-key" }, "sk")["x-api-key"], "sk");
  assert.equal(buildAuthHeaders({ url: "u", auth: "none" }, "sk").authorization, undefined);
  assert.equal(
    buildAuthHeaders({ url: "u", headers: { accept: "text/plain" } }, "sk").accept,
    "text/plain",
    "an explicit header overrides the default"
  );
});

test("an unresolvable mapping reports nothing rather than 0/0", async () => {
  // 0/0 renders as a fully-exhausted quota. An operator would act on that, so a
  // wrong path must produce no card at all -- this is the assertion that keeps
  // a typo in the config from looking like an outage.
  let result: { message?: string; quotas?: unknown } | undefined;
  await withFetch(BODY, 200, async () => {
    result = (await getOpenAiCompatibleUsage("sk-test", {
      quotaEndpoint: { ...ENDPOINT, quotas: { credits: { used: "$.nope.a", total: "$.nope.b" } } },
    })) as never;
  });
  assert.equal(result?.quotas, undefined);
  assert.match(String(result?.message), /no mapping resolved/i);
});

test("failure paths degrade to a message instead of throwing", async () => {
  const noConfig = await getOpenAiCompatibleUsage("sk", {});
  assert.match(String((noConfig as { message: string }).message), /No quota endpoint/i);

  const noMapping = await getOpenAiCompatibleUsage("sk", {
    quotaEndpoint: { url: "https://x", quotas: {} },
  });
  assert.match(String((noMapping as { message: string }).message), /without a `quotas` mapping/i);

  let http: { message?: string } | undefined;
  await withFetch({}, 503, async () => {
    http = (await getOpenAiCompatibleUsage("sk", { quotaEndpoint: ENDPOINT })) as never;
  });
  assert.match(String(http?.message), /HTTP 503/);
});

test("the upstream URL never reaches the message on a transport failure", async () => {
  // The URL is operator-supplied and can carry a query-string secret; it must
  // not be echoed into a dashboard-visible string.
  const original = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("connect ECONNREFUSED https://api.example.com/v1/credits?key=SECRET");
  }) as typeof fetch;
  try {
    const r = (await getOpenAiCompatibleUsage("sk", { quotaEndpoint: ENDPOINT })) as {
      message: string;
    };
    assert.doesNotMatch(r.message, /SECRET|api\.example\.com/);
    assert.match(r.message, /unreachable/i);
  } finally {
    globalThis.fetch = original;
  }
});

test("a quota endpoint that never answers is aborted instead of hanging the sync", async () => {
  // The endpoint is operator-configured and can point at a host that accepts
  // the connection and then goes silent; without a bound, fetch() waits forever.
  const original = globalThis.fetch;
  let signal: AbortSignal | undefined;
  globalThis.fetch = ((_url: string, init: RequestInit) => {
    signal = init?.signal ?? undefined;
    return new Promise<Response>((_resolve, reject) => {
      signal?.addEventListener("abort", () => reject(signal?.reason));
    });
  }) as typeof fetch;
  try {
    const pending = getOpenAiCompatibleUsage("sk", { quotaEndpoint: ENDPOINT });
    await new Promise((resolve) => setImmediate(resolve));
    assert.ok(signal instanceof AbortSignal, "the quota fetch must carry an abort signal");
    // Fire the bound now rather than waiting the real 15s.
    (signal as AbortSignal & { dispatchEvent: (e: Event) => boolean }).dispatchEvent(
      new Event("abort")
    );
    const r = (await pending) as { message: string };
    assert.match(r.message, /unreachable/i);
  } finally {
    globalThis.fetch = original;
  }
});

test("the gate follows the connection, not the provider id", () => {
  const id = "openai-compatible-chat-abc123";
  assert.equal(
    supportsProviderQuota(id, { provider: id, providerSpecificData: { quotaEndpoint: ENDPOINT } }),
    true
  );
  assert.equal(supportsProviderQuota(id, { provider: id, providerSpecificData: {} }), false);
  assert.equal(
    supportsProviderQuota(id, {
      provider: id,
      providerSpecificData: { quotaEndpoint: { url: "https://x" } },
    }),
    false,
    "a url with no mapping can be fetched but never yields a quota"
  );
});
