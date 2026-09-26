import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/selectorClient.ts");
const { getGroupMembers, switchSelector, SELECTOR_CONTROL_TIMEOUT_MS } = mod;

type FakeResp = { status: number; json: () => Promise<unknown> };
type FetchFn = (url: string, init?: Record<string, unknown>) => Promise<FakeResp>;
function jsonResp(status: number, body: unknown): FakeResp {
  return { status, json: async () => body };
}

const BASE = "http://127.0.0.1:9090";

test("SELECTOR_CONTROL_TIMEOUT_MS is 5000", () => {
  assert.equal(SELECTOR_CONTROL_TIMEOUT_MS, 5000);
});

test("getGroupMembers returns selector members with current", async () => {
  const fetchFn: FetchFn = async () => {
    return jsonResp(200, {
      proxies: {
        "group-a": { name: "group-a", type: "Selector", now: "node-1", all: ["node-1", "node-2"] },
      },
    });
  };
  const res = await getGroupMembers(BASE, "group-a", { fetchFn: fetchFn as never });
  assert.deepEqual(res, { members: ["node-1", "node-2"], current: "node-1", reason: "ok" });
});

test("getGroupMembers on non-selector returns not-selector", async () => {
  const fetchFn: FetchFn = async () => {
    return jsonResp(200, { proxies: { "group-a": { name: "group-a", type: "HTTP" } } });
  };
  const res = await getGroupMembers(BASE, "group-a", { fetchFn: fetchFn as never });
  assert.equal(res.reason, "not-selector");
});

test("switchSelector picks first healthy member != current", async () => {
  const calls: Array<{ url: string; init?: Record<string, unknown> }> = [];
  const fetchFn: FetchFn = async (url: string, init?: Record<string, unknown>) => {
    calls.push({ url, init });
    if ((init as { method?: string } | undefined)?.method === "PUT") {
      return jsonResp(204, {});
    }
    return jsonResp(200, {
      proxies: {
        "group-a": { name: "group-a", type: "Selector", now: "node-1", all: ["node-1", "node-2"] },
      },
    });
  };
  const res = await switchSelector(
    { controlUrl: BASE, secret: "s3cret", selector: "group-a", avoidName: "node-1" },
    { fetchFn: fetchFn as never }
  );
  assert.equal(res.switched, true);
  assert.equal(res.target, "node-2");
  const put = calls.find((c) => (c.init as { method?: string } | undefined)?.method === "PUT");
  assert.ok(put);
  assert.equal(put!.url, `${BASE}/proxies/group-a`);
  assert.deepEqual((put!.init as { body?: string }).body, JSON.stringify({ name: "node-2" }));
  assert.equal(
    ((put!.init as { headers?: Record<string, string> }).headers ?? {}).Authorization,
    "Bearer s3cret"
  );
});

test("switchSelector with single member warns, no switch", async () => {
  const fetchFn: FetchFn = async () => {
    return jsonResp(200, {
      proxies: { "group-a": { name: "group-a", type: "Selector", now: "node-1", all: ["node-1"] } },
    });
  };
  const res = await switchSelector(
    { controlUrl: BASE, secret: "s", selector: "group-a", avoidName: "node-1" },
    { fetchFn: fetchFn as never }
  );
  assert.equal(res.switched, false);
  assert.equal(res.reason, "no-target");
});

test("switchSelector maps 401 to auth-failed, never throws", async () => {
  const fetchFn: FetchFn = async () => jsonResp(401, {});
  const res = await switchSelector(
    { controlUrl: BASE, secret: "bad", selector: "group-a", avoidName: "node-1" },
    { fetchFn: fetchFn as never }
  );
  assert.equal(res.switched, false);
  assert.equal(res.reason, "auth-failed");
});

test("switchSelector maps network throw to network-error, never throws", async () => {
  const fetchFn: FetchFn = async () => {
    throw new Error("boom");
  };
  const res = await switchSelector(
    { controlUrl: BASE, secret: "s", selector: "group-a", avoidName: "node-1" },
    { fetchFn: fetchFn as never }
  );
  assert.equal(res.switched, false);
  assert.equal(res.reason, "network-error");
});

test("switchSelector uses bypassProxyPatch + no redirect + timeout", async () => {
  const seen: Array<Record<string, unknown>> = [];
  const fetchFn = async (_url: string, opts?: Record<string, unknown>) => {
    seen.push(opts ?? {});
    return jsonResp(200, { proxies: {} });
  };
  await getGroupMembers(BASE, "group-a", { fetchFn: fetchFn as never });
  const opts = seen[0] as Record<string, unknown>;
  assert.equal(opts.bypassProxyPatch, true);
  assert.equal(opts.allowRedirect, false);
  assert.equal(opts.timeoutMs, 5000);
});

test("secret never appears in thrown or returned detail", async () => {
  const fetchFn: FetchFn = async () => jsonResp(500, { error: "x" });
  const res = await switchSelector(
    { controlUrl: BASE, secret: "s3cret-value", selector: "group-a", avoidName: "n" },
    { fetchFn: fetchFn as never }
  );
  assert.equal(JSON.stringify(res).includes("s3cret-value"), false);
});
