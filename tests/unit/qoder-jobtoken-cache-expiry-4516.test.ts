import test from "node:test";
import assert from "node:assert/strict";

// Port of 9router#4516: Qoder PAT connections went dead after the cached `jt-*`
// job token expired upstream. Two defects:
//  (1) the cached `jt-*` was never invalidated when the upstream rejected it (401),
//      so every later call kept sending the dead token until the process restarted;
//  (2) `expires_in` was assumed to be seconds — a millisecond value (86400000)
//      became a ~1000-day cache TTL, outliving the real token by years.

const { parseQoderJobTokenResponse, resolveQoderJobToken, __clearQoderJobTokenCache } =
  await import("../../open-sse/services/qoderCli.ts");
const { getQoderUsage } = await import("../../open-sse/services/usage/qoder.ts");

const DAY_MS = 24 * 60 * 60 * 1000;

test("9router#4516 expires_in in seconds (86400) -> 24h", () => {
  assert.equal(
    parseQoderJobTokenResponse({ job_token: "jt-s", expires_in: 86400 })?.expiresInMs,
    DAY_MS
  );
});

test("9router#4516 expires_in in milliseconds (86400000) -> 24h, not 1000 days", () => {
  assert.equal(
    parseQoderJobTokenResponse({ job_token: "jt-ms", expires_in: 86_400_000 })?.expiresInMs,
    DAY_MS
  );
});

test("9router#4516 an oversized expires_in is capped at 24h", () => {
  const parsed = parseQoderJobTokenResponse({ job_token: "jt-big", expires_in: 30 * 86400 });
  assert.ok(parsed);
  assert.ok(parsed.expiresInMs <= DAY_MS, `TTL ${parsed.expiresInMs} must be capped at 24h`);
});

test("9router#4516 a 401 on the cached jt-* invalidates the cache so the next call re-exchanges", async () => {
  __clearQoderJobTokenCache();
  const originalFetch = globalThis.fetch;
  let exchangeCount = 0;
  let statusCalls = 0;
  const statusAuth: string[] = [];

  // @ts-ignore — test stub
  globalThis.fetch = async (url: string, init?: Record<string, unknown>) => {
    const u = String(url);
    if (u.includes("/jobToken/exchange")) {
      exchangeCount += 1;
      return new Response(
        JSON.stringify({ job_token: `jt-gen-${exchangeCount}`, expires_in: 86400 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    statusCalls += 1;
    statusAuth.push(String((init?.headers as Record<string, string>)?.Authorization));
    // First status call: the upstream says the jt-* expired.
    if (statusCalls === 1) {
      return new Response(JSON.stringify({ code: "ExpiredToken" }), { status: 401 });
    }
    return new Response(
      JSON.stringify({ userType: "teams", userTag: "Teams", quota: 0, isQuotaExceeded: false }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const first = (await getQoderUsage("pt-expiring")) as { message?: string };
    assert.match(String(first.message), /rejected/i);
    assert.equal(exchangeCount, 1);

    const second = (await getQoderUsage("pt-expiring")) as { plan?: string };
    assert.equal(exchangeCount, 2, "after a 401 the next call must redo the PAT->jt exchange");
    assert.deepEqual(statusAuth, ["Bearer jt-gen-1", "Bearer jt-gen-2"]);
    assert.equal(second.plan, "Teams");

    // And the fresh token is cached again (no third exchange on a healthy call).
    assert.equal(await resolveQoderJobToken("pt-expiring"), "jt-gen-2");
    assert.equal(exchangeCount, 2);
  } finally {
    globalThis.fetch = originalFetch;
    __clearQoderJobTokenCache();
  }
});
