import test from "node:test";
import assert from "node:assert/strict";

// #4683: Qoder PAT (`pt-*`) chat requests failed with a Cosy 500 because OmniRoute
// injected the raw `pt-*` PAT into the Cosy `security_oauth_token`. The official
// qodercli uses a TWO-step flow: exchange the PAT for a short-lived `jt-*` job token
// at openapi.qoder.sh/api/v1/jobToken/exchange, then carry the `jt-*` in the Cosy
// envelope. These tests assert the exchange now happens and the `jt-*` is what flows
// downstream — the raw `pt-*` must never be the Cosy token anymore.

const {
  parseQoderJobTokenResponse,
  exchangeQoderJobToken,
  resolveQoderJobToken,
  isQoderPatToken,
  validateQoderCliPat,
  __clearQoderJobTokenCache,
} = await import("../../open-sse/services/qoderCli.ts");

function jsonResponse(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  } as unknown as Response;
}

test("#4683 isQoderPatToken only matches pt-* tokens", () => {
  assert.equal(isQoderPatToken("pt-abc"), true);
  assert.equal(isQoderPatToken("jt-abc"), false);
  assert.equal(isQoderPatToken("sk-abc"), false);
  assert.equal(isQoderPatToken(""), false);
});

test("#4683 parseQoderJobTokenResponse extracts jt-* across response shapes", () => {
  assert.equal(parseQoderJobTokenResponse({ job_token: "jt-1" })?.jobToken, "jt-1");
  assert.equal(parseQoderJobTokenResponse({ data: { jobToken: "jt-2" } })?.jobToken, "jt-2");
  // expires_in is reported in seconds -> milliseconds.
  assert.equal(
    parseQoderJobTokenResponse({ job_token: "jt-3", expires_in: 86400 })?.expiresInMs,
    86400 * 1000
  );
  // No jt-* anywhere -> null.
  assert.equal(parseQoderJobTokenResponse({ token: "pt-nope" }), null);
  assert.equal(parseQoderJobTokenResponse(null), null);
});

test("#4683 exchangeQoderJobToken POSTs the PAT to the exchange endpoint", async () => {
  const calls: { url: string; body: unknown }[] = [];
  const fetchImpl = async (url: string, init?: Record<string, unknown>) => {
    calls.push({ url, body: JSON.parse(String(init?.body ?? "{}")) });
    return jsonResponse({ job_token: "jt-from-exchange", expires_in: 86400 });
  };

  const result = await exchangeQoderJobToken("pt-secret", { fetchImpl });
  assert.equal(result?.jobToken, "jt-from-exchange");
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /openapi\.qoder\.sh\/api\/v1\/jobToken\/exchange/);
  assert.deepEqual(calls[0].body, { personal_token: "pt-secret" });
});

test("#4683 resolveQoderJobToken exchanges a pt-* once and caches the jt-*", async () => {
  __clearQoderJobTokenCache();
  let fetchCount = 0;
  const fetchImpl = async () => {
    fetchCount += 1;
    return jsonResponse({ job_token: "jt-cached", expires_in: 86400 });
  };

  const first = await resolveQoderJobToken("pt-x", { fetchImpl, now: 1_000 });
  const second = await resolveQoderJobToken("pt-x", { fetchImpl, now: 2_000 });
  assert.equal(first, "jt-cached");
  assert.equal(second, "jt-cached");
  assert.equal(fetchCount, 1, "second resolve must hit the cache, not re-exchange");
  __clearQoderJobTokenCache();
});

test("#4683 resolveQoderJobToken coalesces concurrent pt-* exchanges", async () => {
  __clearQoderJobTokenCache();
  let fetchCount = 0;
  let releaseExchange: (() => void) | undefined;
  let markExchangeStarted: (() => void) | undefined;
  const exchangeStarted = new Promise<void>((resolveStarted) => {
    markExchangeStarted = resolveStarted;
  });
  const fetchImpl = async () => {
    fetchCount += 1;
    markExchangeStarted?.();
    await new Promise<void>((release) => {
      releaseExchange = release;
    });
    return jsonResponse({ job_token: "jt-shared", expires_in: 86400 });
  };

  const resolves = Array.from({ length: 8 }, () =>
    resolveQoderJobToken("pt-concurrent", { fetchImpl, now: 1_000 })
  );
  await exchangeStarted;
  releaseExchange?.();
  const tokens = await Promise.all(resolves);
  assert.deepEqual(tokens, Array(8).fill("jt-shared"));
  assert.equal(fetchCount, 1, "concurrent resolves must share one upstream exchange");
  __clearQoderJobTokenCache();
});

test("#4683 resolveQoderJobToken does not let the first caller abort poison shared waiters", async () => {
  __clearQoderJobTokenCache();
  let fetchCount = 0;
  let releaseExchange: (() => void) | undefined;
  let markExchangeStarted: (() => void) | undefined;
  const exchangeStarted = new Promise<void>((resolveStarted) => {
    markExchangeStarted = resolveStarted;
  });
  const firstCaller = new AbortController();
  const fetchImpl = async (_url: string, init?: Record<string, unknown>) => {
    fetchCount += 1;
    markExchangeStarted?.();
    await new Promise<void>((resolve, reject) => {
      releaseExchange = resolve;
      const signal = init?.signal as AbortSignal | undefined;
      signal?.addEventListener("abort", () => reject(signal.reason ?? new Error("aborted")), {
        once: true,
      });
    });
    return jsonResponse({ job_token: "jt-unpoisoned", expires_in: 86400 });
  };

  const first = resolveQoderJobToken("pt-abort-shared", {
    fetchImpl,
    now: 1_000,
    signal: firstCaller.signal,
  }).catch((error: unknown) => error);
  await exchangeStarted;
  const second = resolveQoderJobToken("pt-abort-shared", { fetchImpl, now: 1_000 });

  firstCaller.abort(new Error("caller went away"));
  releaseExchange?.();

  assert.equal(await second, "jt-unpoisoned");
  assert.equal(fetchCount, 1, "the unaffected waiter must share the original exchange");
  await first;
  __clearQoderJobTokenCache();
});

test("#4683 resolveQoderJobToken passes a jt-* through without exchanging", async () => {
  __clearQoderJobTokenCache();
  let fetchCount = 0;
  const fetchImpl = async () => {
    fetchCount += 1;
    return jsonResponse({ job_token: "jt-unused" });
  };
  const resolved = await resolveQoderJobToken("jt-already", { fetchImpl });
  assert.equal(resolved, "jt-already");
  assert.equal(fetchCount, 0);
});

test("#4683 resolveQoderJobToken falls back to the PAT when the exchange fails", async () => {
  __clearQoderJobTokenCache();
  const fetchImpl = async () => jsonResponse({ error: "nope" }, { ok: false, status: 500 });
  const resolved = await resolveQoderJobToken("pt-y", { fetchImpl });
  assert.equal(resolved, "pt-y", "graceful fallback keeps prior behavior");
  __clearQoderJobTokenCache();
});

test("#4683 validateQoderCliPat performs the jobToken exchange before the Cosy chat call", async () => {
  __clearQoderJobTokenCache();
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  // @ts-ignore - test stub
  globalThis.fetch = async (url: string, init?: Record<string, unknown>) => {
    urls.push(String(url));
    if (String(url).includes("/ping")) return jsonResponse({ ok: true });
    if (String(url).includes("/jobToken/exchange")) {
      assert.deepEqual(JSON.parse(String(init?.body ?? "{}")), { personal_token: "pt-live" });
      return jsonResponse({ job_token: "jt-live", expires_in: 86400 });
    }
    // agent_chat_generation -> accept (valid)
    return jsonResponse({ success: true }, { ok: true, status: 200 });
  };

  try {
    const res = await validateQoderCliPat({ apiKey: "pt-live" });
    assert.equal(res.valid, true);
    const exchangeIdx = urls.findIndex((u) => u.includes("/jobToken/exchange"));
    const chatIdx = urls.findIndex((u) => u.includes("agent_chat_generation"));
    assert.ok(
      exchangeIdx >= 0,
      "the PAT->job-token exchange step must run (was skipped before #4683)"
    );
    assert.ok(chatIdx >= 0 && exchangeIdx < chatIdx, "exchange must precede the Cosy chat call");
  } finally {
    globalThis.fetch = originalFetch;
    __clearQoderJobTokenCache();
  }
});
