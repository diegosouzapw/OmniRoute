/**
 * #9694 — proxy "Test connection" false-negative on IPv4-only SOCKS5/SSH proxies.
 *
 * #1255 moved every egress probe to `api64.ipify.org`, which is IPv6-first, so a
 * proxy with no IPv6 route has nothing to connect to and the probe hangs until the
 * caller's deadline — a healthy proxy reported dead. Swapping the target to
 * `api4.ipify.org` fixes that case and breaks #1255's.
 *
 * The probe now tries the targets in order inside the budget the caller already
 * enforced. `api64` stays FIRST so a proxy with working IPv6 behaves exactly as it
 * did after #1255 — including which of its addresses is reported, which matters
 * because the egress IP is used as an identity to detect accounts sharing an address.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  probeEchoTargets,
  resolveEgressEchoUrls,
  splitEchoAttemptBudget,
  EGRESS_ECHO_URL_DUAL,
  EGRESS_ECHO_URL_V4,
  EGRESS_ECHO_URL_ENV,
  MIN_ECHO_ATTEMPT_MS,
} = await import("../../../src/lib/proxyEchoTarget.ts");

test("#9694: the IPv6-first target is still tried first", () => {
  assert.deepEqual(resolveEgressEchoUrls({}), [EGRESS_ECHO_URL_DUAL, EGRESS_ECHO_URL_V4]);
  assert.equal(EGRESS_ECHO_URL_DUAL, "https://api64.ipify.org?format=json");
  assert.equal(EGRESS_ECHO_URL_V4, "https://api4.ipify.org?format=json");
});

test("#9694: an operator override pins exactly one target", () => {
  const env = { [EGRESS_ECHO_URL_ENV]: "  https://echo.internal/ip  " };
  assert.deepEqual(resolveEgressEchoUrls(env), ["https://echo.internal/ip"]);
  for (const blank of ["", "   "]) {
    assert.deepEqual(resolveEgressEchoUrls({ [EGRESS_ECHO_URL_ENV]: blank }), [
      EGRESS_ECHO_URL_DUAL,
      EGRESS_ECHO_URL_V4,
    ]);
  }
});

test("#9694: attempts share the caller's budget instead of extending it", () => {
  // The real call sites use 5s, 6s and 10s.
  assert.deepEqual(splitEchoAttemptBudget(10000, 2), [5000, 5000]);
  assert.deepEqual(splitEchoAttemptBudget(6000, 2), [3000, 3000]);
  assert.deepEqual(splitEchoAttemptBudget(5000, 2), [2500, 2500]);
  for (const total of [10000, 6000, 5000]) {
    const budgets = splitEchoAttemptBudget(total, 2);
    assert.ok(
      budgets.reduce((a, b) => a + b, 0) <= total,
      "the sum must never exceed the deadline the caller already enforced"
    );
  }
});

test("#9694: a budget too small to split is spent on one attempt, not two useless ones", () => {
  assert.deepEqual(splitEchoAttemptBudget(MIN_ECHO_ATTEMPT_MS * 2 - 2, 2), [
    MIN_ECHO_ATTEMPT_MS * 2 - 2,
  ]);
  assert.deepEqual(splitEchoAttemptBudget(0, 2), []);
  assert.deepEqual(splitEchoAttemptBudget(-1, 2), []);
  assert.deepEqual(splitEchoAttemptBudget(10000, 0), []);
  assert.deepEqual(splitEchoAttemptBudget(10000, 1), [10000]);
});

test("#9694: a reachable IPv6-first target is used and the IPv4 target is never touched", async () => {
  const tried: string[] = [];
  const outcome = await probeEchoTargets(
    async (url) => {
      tried.push(url);
      return '{"ip":"2001:db8::1"}';
    },
    10000,
    {}
  );
  assert.deepEqual(tried, [EGRESS_ECHO_URL_DUAL], "no extra request for a healthy IPv6 proxy");
  assert.equal(outcome.url, EGRESS_ECHO_URL_DUAL);
  assert.equal(outcome.result, '{"ip":"2001:db8::1"}');
});

test("#9694: an IPv4-only proxy reaches the IPv4 target and succeeds", async () => {
  const tried: Array<{ url: string; timeoutMs: number }> = [];
  const outcome = await probeEchoTargets(
    async (url, timeoutMs) => {
      tried.push({ url, timeoutMs });
      // What an IPv4-only SOCKS5 tunnel does with an IPv6-first host: nothing,
      // until the attempt budget aborts it.
      if (url === EGRESS_ECHO_URL_DUAL) throw new Error("This operation was aborted");
      return '{"ip":"203.0.113.7"}';
    },
    10000,
    {}
  );
  assert.deepEqual(
    tried.map((t) => t.url),
    [EGRESS_ECHO_URL_DUAL, EGRESS_ECHO_URL_V4],
    "the IPv6 attempt must not end the probe"
  );
  assert.deepEqual(
    tried.map((t) => t.timeoutMs),
    [5000, 5000],
    "each attempt gets half of the caller's 10s budget"
  );
  assert.equal(outcome.url, EGRESS_ECHO_URL_V4);
  assert.equal(outcome.result, '{"ip":"203.0.113.7"}');
});

test("#9694: a genuinely dead proxy still fails, with the last real error", async () => {
  await assert.rejects(
    () =>
      probeEchoTargets(
        async (url) => {
          throw new Error(`ECONNREFUSED ${url}`);
        },
        10000,
        {}
      ),
    /ECONNREFUSED .*api4\.ipify\.org/,
    "the surfaced error must describe a network failure, not internal bookkeeping"
  );
});

test("#9694: an override that fails is not silently retried against ipify", async () => {
  const tried: string[] = [];
  await assert.rejects(() =>
    probeEchoTargets(
      async (url) => {
        tried.push(url);
        throw new Error("nope");
      },
      10000,
      { [EGRESS_ECHO_URL_ENV]: "https://echo.internal/ip" }
    )
  );
  assert.deepEqual(tried, ["https://echo.internal/ip"]);
});
