import test from "node:test";
import assert from "node:assert/strict";

// A per-process memory of proxies that just failed, shared by pool selection and the
// per-account rotation. One canonical key per entry point, a period that doubles on each
// repeat up to a cap, and a null key that never sets anything aside. The store is pure:
// whether it is consulted is decided by the PROXY_SKIP_RECENTLY_FAILED flag at call sites.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const MIN = 60_000;
const START_MS = 1_800_000_000_000;

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
});

test("an object, its URL and a legacy string give the same key", () => {
  const fromObject = memory.proxyEgressKey({
    type: "http",
    host: "H",
    port: 8080,
    username: "a@b",
    password: "pw",
  });
  assert.equal(fromObject, "http://a@b@h:8080");
  assert.equal(memory.proxyEgressKey("http://a%40b:pw@h:8080"), fromObject);
  assert.equal(memory.proxyEgressKey("http://a%40b:pw@H:8080"), fromObject);
});

test("the password and the family marker are not part of the key, the username is", () => {
  const base = memory.proxyEgressKey("http://a%40b:pw@h:8080");
  assert.equal(memory.proxyEgressKey("http://a%40b:other@h:8080"), base);
  assert.equal(memory.proxyEgressKey("http://a%40b:pw@h:8080?family=ipv6"), base);
  assert.notEqual(memory.proxyEgressKey("http://c:pw@h:8080"), base);
});

test("an IPv6 host gives the same non-null key as an object or a URL", () => {
  const fromObject = memory.proxyEgressKey({ type: "http", host: "::1", port: 8080 });
  assert.equal(fromObject, "http://@::1:8080");
  assert.equal(memory.proxyEgressKey("http://[::1]:8080"), fromObject);
});

test("invalid input, null, undefined and relays give a null key without throwing", () => {
  for (const input of ["not a url", null, undefined, { type: "http" }, 42]) {
    assert.equal(memory.proxyEgressKey(input), null, String(input));
  }
  assert.equal(memory.proxyEgressKey({ type: "vercel", host: "x.vercel.app", port: 443 }), null);
});

test("repeated refusals double the period up to the one-hour cap", () => {
  const key = "http://@h:8080";
  const periods: Array<number | null> = [];
  let now = START_MS;
  for (let i = 0; i < 7; i++) {
    const period = memory.noteProxyRefusal(key, "ip_quota_429", now);
    periods.push(period);
    now += period ?? 0;
  }
  assert.deepEqual(periods, [2 * MIN, 4 * MIN, 8 * MIN, 16 * MIN, 32 * MIN, 60 * MIN, 60 * MIN]);
});

test("a note while the proxy is set aside changes nothing", () => {
  const key = "http://@h:8080";
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429", START_MS), 2 * MIN);
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429", START_MS + MIN), null);
  assert.equal(memory.isProxyAvoided(key, START_MS + 2 * MIN - 1), true);
  assert.equal(memory.isProxyAvoided(key, START_MS + 2 * MIN), false);
});

test("recovery ends the period but keeps the streak for a repeat", () => {
  const key = "http://@h:8080";
  memory.noteProxyRefusal(key, "proxy_unreachable", START_MS);
  memory.noteProxyRecovered(key, "proxy_unreachable", START_MS + 10_000);
  assert.equal(memory.isProxyAvoided(key, START_MS + 10_000), false);
  assert.equal(memory.noteProxyRefusal(key, "proxy_unreachable", START_MS + 20_000), 2 * MIN);
});

test("a served response forgets every refusal kind for that key", () => {
  const key = "http://@h:8080";
  memory.noteProxyRefusal(key, "proxy_unreachable", START_MS);
  memory.noteProxyRefusal(key, "ip_quota_429", START_MS);
  memory.noteProxyServed(key);
  assert.equal(memory.isProxyAvoided(key, START_MS + 1), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("an old streak is purged per kind: unreachable 20 min, refusal 2 h", () => {
  const key = "http://@h:8080";
  memory.noteProxyRefusal(key, "proxy_unreachable", START_MS);
  const endUnreachable = START_MS + MIN;
  assert.equal(
    memory.noteProxyRefusal(key, "proxy_unreachable", endUnreachable + 19 * MIN),
    2 * MIN
  );

  memory.__resetProxyRefusalMemoryForTesting();
  memory.noteProxyRefusal(key, "proxy_unreachable", START_MS);
  assert.equal(memory.noteProxyRefusal(key, "proxy_unreachable", endUnreachable + 20 * MIN), MIN);

  memory.__resetProxyRefusalMemoryForTesting();
  memory.noteProxyRefusal(key, "ip_quota_429", START_MS);
  const endRefusal = START_MS + 2 * MIN;
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429", endRefusal + 119 * MIN), 4 * MIN);
  memory.__resetProxyRefusalMemoryForTesting();
  memory.noteProxyRefusal(key, "ip_quota_429", START_MS);
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429", endRefusal + 120 * MIN), 2 * MIN);
});

test("a null key never writes and is never set aside", () => {
  assert.equal(memory.noteProxyRefusal(null, "ip_quota_429", START_MS), null);
  memory.noteProxyRecovered(null, "proxy_unreachable", START_MS);
  memory.noteProxyServed(null);
  assert.equal(memory.isProxyAvoided(null, START_MS), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("the memory keeps at most 1000 entries and evicts the oldest", () => {
  for (let i = 0; i < 1001; i++) {
    memory.noteProxyRefusal(`http://@h:${10000 + i}`, "ip_quota_429", START_MS);
  }
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 1000);
  assert.equal(memory.isProxyAvoided("http://@h:10000", START_MS + 1), false);
  assert.equal(memory.isProxyAvoided("http://@h:11000", START_MS + 1), true);
});

test("the key matches the one derived from the dispatcher's normalized proxy URL", async () => {
  // The memory module computes keys without importing the proxy dispatcher (so the DB layer
  // can consult it cheaply). Guard against drift from proxyConfigToUrl() normalization.
  const { proxyConfigToUrl } = await import("../../open-sse/utils/proxyDispatcher.ts");
  const authority = /^([a-z0-9+.-]+):\/\/(?:([^@/]*)@)?(\[[^\]]+\]|[^:/?#]+):(\d+)/i;
  const viaDispatcher = (input: unknown) => {
    let normalizedInput = input;
    if (input && typeof input === "object") {
      const host = (input as { host?: string }).host;
      if (typeof host === "string" && host.includes(":") && !host.startsWith("[")) {
        normalizedInput = { ...(input as object), host: `[${host}]` };
      }
    }
    const url = proxyConfigToUrl(normalizedInput, { allowSocks5: true });
    const match = url ? authority.exec(url) : null;
    if (!match) return null;
    const [, scheme, userinfo, host, port] = match;
    const user = userinfo ? decodeURIComponent(userinfo.split(":")[0]) : "";
    const bare = host.startsWith("[") ? host.slice(1, -1) : host;
    return `${scheme.toLowerCase()}://${user}@${bare.toLowerCase()}:${port}`;
  };
  const inputs: unknown[] = [
    { type: "http", host: "Proxy.Example.com", port: 3128, username: "u s", password: "p" },
    { type: "https", host: "h", port: "443" },
    { type: "socks5", host: "10.0.0.2", username: "a@b", password: "x:y" },
    { type: "http", host: "h" },
    { type: "http", host: "2001:db8::1", port: 8080, family: "ipv6" },
    { host: "h", port: 80 },
    "http://user:pw@H:80",
    "https://h",
    "socks5://a%40b:pw@10.0.0.3:1080?family=ipv4",
    "http://[2001:db8::2]:3128",
    "http://h:8080/",
  ];
  for (const input of inputs) {
    assert.equal(memory.proxyEgressKey(input), viaDispatcher(input), JSON.stringify(input));
  }
});

test("an out-of-range port or an unsupported scheme gives a null key", () => {
  assert.equal(memory.proxyEgressKey({ type: "http", host: "h", port: 70000 }), null);
  assert.equal(memory.proxyEgressKey({ type: "ftp", host: "h", port: 21 }), null);
  assert.equal(memory.proxyEgressKey("ftp://h:21"), null);
});

test("set-aside events are ordered, and only the one in force is reported", () => {
  const a = "http://@a:8080";
  const b = "http://@b:8080";
  assert.equal(memory.hasProxyRefusals(), false);
  assert.equal(memory.proxySetAsideSeq(a, START_MS), null);
  const before = memory.getProxyRefusalSeq();

  memory.noteProxyRefusal(a, "proxy_unreachable", START_MS);
  const seqA = memory.proxySetAsideSeq(a, START_MS + 1);
  assert.ok(seqA !== null && seqA > before);
  assert.equal(memory.hasProxyRefusals(), true);

  // A note while already set aside records no new event.
  memory.noteProxyRefusal(a, "proxy_unreachable", START_MS + 2);
  assert.equal(memory.proxySetAsideSeq(a, START_MS + 3), seqA);

  memory.noteProxyRefusal(b, "ip_quota_429", START_MS + 4);
  const seqB = memory.proxySetAsideSeq(b, START_MS + 5);
  assert.ok(seqB !== null && seqB > seqA);
  assert.equal(memory.getProxyRefusalSeq(), seqB);

  // A second kind on the same proxy reports the most recent event.
  memory.noteProxyRefusal(a, "ip_quota_429", START_MS + 6);
  assert.equal(memory.proxySetAsideSeq(a, START_MS + 7), memory.getProxyRefusalSeq());

  // Once every period is over nothing is in force.
  assert.equal(memory.proxySetAsideSeq(b, START_MS + 4 + 2 * MIN), null);
});
