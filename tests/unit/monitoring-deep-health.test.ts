import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { probeDeepHealth, DEEP_HEALTH_VERDICT_TTL_MS } from "@/lib/monitoring/observability.js";

function stubFetcher(status: number, delayMs = 0): () => Promise<Response> {
  return async () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(new Response("{}", { status })), delayMs)
    );
}

describe("probeDeepHealth — fail-open verdict, failover only on 502/503", () => {
  it("502 and 503 set failover:true", async () => {
    for (const status of [502, 503]) {
      const v = await probeDeepHealth("http://localhost:1/v1/chat/completions", {
        timeoutMs: 3000,
        fetcher: stubFetcher(status),
      });
      assert.equal(v.ok, false);
      assert.equal(v.failover, true);
      assert.equal(v.status, status);
    }
  });

  it("4xx sets failover:false without throwing", async () => {
    for (const status of [400, 401, 404, 429]) {
      const v = await probeDeepHealth("http://localhost:1/v1/chat/completions", {
        timeoutMs: 3000,
        fetcher: stubFetcher(status),
      });
      assert.equal(v.ok, false);
      assert.equal(v.failover, false, `status ${status} must never trip failover`);
    }
  });

  it("2xx is ok without failover", async () => {
    const v = await probeDeepHealth("http://localhost:1/v1/chat/completions", {
      timeoutMs: 3000,
      fetcher: stubFetcher(200),
    });
    assert.equal(v.ok, true);
    assert.equal(v.failover, false);
  });

  it("timeout and network errors return a verdict, never throw", async () => {
    const timeout = await probeDeepHealth("http://localhost:1/v1/chat/completions", {
      timeoutMs: 50,
      fetcher: (async () => {
        await new Promise((_, reject) => setTimeout(() => reject(new Error("aborted")), 5000));
        return new Response("{}", { status: 200 });
      }) as typeof fetch,
    });
    assert.equal(timeout.ok, false);
    assert.equal(timeout.failover, false);
    const refused = await probeDeepHealth("http://localhost:1/v1/chat/completions", {
      timeoutMs: 3000,
      fetcher: async () => {
        throw new Error("connection refused");
      },
    });
    assert.equal(refused.ok, false);
    assert.equal(refused.failover, false);
  });

  it("posts a minimal 1-token non-streaming completion", async () => {
    let seenUrl = "";
    let seenInit: RequestInit | null = null;
    await probeDeepHealth("http://gw.example.com/v1/chat/completions", {
      timeoutMs: 3000,
      fetcher: (async (url: string, init: RequestInit) => {
        seenUrl = url;
        seenInit = init;
        return new Response("{}", { status: 200 });
      }) as typeof fetch,
    });
    assert.equal(seenUrl, "http://gw.example.com/v1/chat/completions");
    assert.ok(seenInit, "fetcher must be called");
    const body = JSON.parse(String(seenInit.body)) as Record<string, unknown>;
    assert.equal(body["stream"], false);
    assert.equal(body["max_tokens"], 1);
  });

  it("verdict TTL is a short cache window", () => {
    assert.equal(DEEP_HEALTH_VERDICT_TTL_MS, 30_000);
  });
});

describe("route gating — the probe never fires unless opted-in and authenticated", () => {
  it("anonymous callers never trigger a probe even with ?deep=1", async () => {
    const { GET, __test_resetMonitoringHealthPayloadCache } = await import(
      "@/app/api/monitoring/health/route.js"
    );
    __test_resetMonitoringHealthPayloadCache();
    const res = (await GET(
      new Request("http://localhost/api/monitoring/health?deep=1")
    )) as Response;
    const body = (await res.json()) as Record<string, unknown>;
    assert.ok(!("deepHealth" in body), "anonymous view must never carry deepHealth");
  });

  it("opt-in off + ?deep=1 as management caller → no probe, no deepHealth", async () => {
    delete process.env.DEEP_HEALTH_CHECK_ENABLED;
    const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
    const { GET, __test_resetMonitoringHealthPayloadCache } = await import(
      "@/app/api/monitoring/health/route.js"
    );
    __test_resetMonitoringHealthPayloadCache();
    const req = await makeManagementSessionRequest(
      "http://localhost/api/monitoring/health?deep=1"
    );
    const res = (await GET(req as never)) as Response;
    const body = (await res.json()) as Record<string, unknown>;
    assert.ok(!("deepHealth" in body), "flag off must stay inert even when authenticated");
  });

  it("deepHealth rides along without altering status on success paths", async () => {
    const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
    const route = await import("@/app/api/monitoring/health/route.js");
    route.__test_resetMonitoringHealthPayloadCache();
    const req = await makeManagementSessionRequest("http://localhost/api/monitoring/health");
    const plain = (await (await route.GET(req as never)).json()) as Record<string, unknown>;
    assert.ok("status" in plain, "baseline payload must carry status");
    assert.ok(!("deepHealth" in plain), "no verdict cached yet → no deepHealth key");
  });

  it("a cached verdict is served on the 2nd call with status intact (TTL)", async () => {
    process.env.DEEP_HEALTH_CHECK_ENABLED = "1";
    try {
      const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
      const route = await import("@/app/api/monitoring/health/route.js");
      route.__test_resetMonitoringHealthPayloadCache();
      const seed = { ok: false, failover: true, status: 503, latencyMs: 12, at: "t" };
      route.__test_seedDeepHealthVerdict(seed);
      const url = "http://localhost/api/monitoring/health?deep=1";
      const first = (await (
        await route.GET(((await makeManagementSessionRequest(url)) as unknown) as never)
      ).json()) as Record<string, unknown>;
      const second = (await (
        await route.GET(((await makeManagementSessionRequest(url)) as unknown) as never)
      ).json()) as Record<string, unknown>;
      assert.deepEqual(first["deepHealth"], seed, "1st call serves the cached verdict");
      assert.deepEqual(second["deepHealth"], seed, "2nd call serves the same cached verdict");
      assert.equal(second["status"], first["status"], "deepHealth must never alter status");
      assert.ok(!("error" in second) || second["status"] !== undefined);
    } finally {
      delete process.env.DEEP_HEALTH_CHECK_ENABLED;
    }
  });
});
