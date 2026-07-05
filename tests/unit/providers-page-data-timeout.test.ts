import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Regression guard for the "providers/quota dashboard stuck on its skeleton
// forever" bug. The page gates `loading` on awaiting every first-paint request;
// a bare `fetch()` that never *settles* (browser connection-pool starvation
// under the RSC prefetch storm, or a stalled connection) left `loading` true
// forever. loadProviderPageData bounds each request with an AbortSignal timeout
// so the loader ALWAYS resolves (degrading to defaults) and the page paints.
const { loadProviderPageData } = await import(
  "@/app/(dashboard)/dashboard/providers/providerPageUtils"
);

// A fetch mock that honors AbortSignal the way the real fetch does: it never
// resolves on its own, but rejects with an AbortError once the signal fires.
function hangingFetch(): typeof fetch {
  return ((_url: string | URL, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (signal) {
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        signal.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true }
        );
      }
    })) as unknown as typeof fetch;
}

function jsonFetch(map: Record<string, unknown>): typeof fetch {
  return ((url: string | URL) => {
    const body = map[String(url)] ?? {};
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
  }) as unknown as typeof fetch;
}

describe("loadProviderPageData — never freezes the dashboard skeleton", () => {
  test("a never-settling fetch is aborted by the timeout and the loader still resolves", async () => {
    const start = Date.now();
    const data = await loadProviderPageData(hangingFetch(), 50);
    const elapsed = Date.now() - start;

    // The core guarantee: bounded, not infinite.
    assert.ok(elapsed < 3000, `loader should resolve promptly, took ${elapsed}ms`);
    assert.deepEqual(data.connections, []);
    assert.deepEqual(data.providerNodes, []);
    assert.equal(data.ccCompatibleProviderEnabled, false);
    assert.equal(data.expirations, null);
    assert.equal(data.blockedProviders, null);
    assert.equal(data.settings, null);
  });

  test("returns parsed data when every endpoint resolves", async () => {
    const data = await loadProviderPageData(
      jsonFetch({
        "/api/providers": { connections: [{ id: "c1" }] },
        "/api/provider-nodes": { nodes: [{ id: "n1" }], ccCompatibleProviderEnabled: true },
        "/api/providers/expiration": { openai: "2030-01-01" },
        "/api/settings": { blockedProviders: ["openai"] },
      }),
      1000
    );

    assert.deepEqual(data.connections, [{ id: "c1" }]);
    assert.deepEqual(data.providerNodes, [{ id: "n1" }]);
    assert.equal(data.ccCompatibleProviderEnabled, true);
    assert.deepEqual(data.expirations, { openai: "2030-01-01" });
    assert.deepEqual(data.blockedProviders, ["openai"]);
  });

  test("a rejecting fetch degrades to defaults instead of throwing", async () => {
    const rejectFetch = (() => Promise.reject(new Error("network down"))) as unknown as typeof fetch;
    const data = await loadProviderPageData(rejectFetch, 1000);
    assert.deepEqual(data.connections, []);
    assert.equal(data.settings, null);
  });
});
