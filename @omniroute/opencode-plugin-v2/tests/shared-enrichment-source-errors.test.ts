import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { defaultOmniRouteEnrichmentFetcher } from "../src/shared/enrich.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("enrichment source failures are reported", () => {
  it("names each endpoint a gateway refuses, then throws so the caller keeps last-known", async () => {
    globalThis.fetch = (async () =>
      new Response("forbidden", { status: 403 })) as unknown as typeof globalThis.fetch;
    const seen: Array<[string, string]> = [];
    await assert.rejects(
      defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000, (endpoint, reason) =>
        seen.push([endpoint, reason])
      ),
      /enrichment (catalog source|sources) failed/
    );
    assert.deepEqual(seen.map(([endpoint]) => endpoint).sort(), [
      "/api/free-tier/summary",
      "/api/pricing",
      "/api/pricing/models",
    ]);
    for (const [, reason] of seen) assert.match(reason, /403/);
  });

  it("reports a transport failure with its cause, then throws", async () => {
    globalThis.fetch = (async () => {
      throw new Error("connect ECONNREFUSED");
    }) as unknown as typeof globalThis.fetch;
    const seen: string[] = [];
    await assert.rejects(
      defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000, (_e, reason) =>
        seen.push(reason)
      ),
      /enrichment (catalog source|sources) failed/
    );
    assert.equal(seen.length, 3);
    for (const reason of seen) assert.match(reason, /ECONNREFUSED/);
  });

  it("stays silent when every source answers", async () => {
    globalThis.fetch = (async () =>
      new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" },
      })) as unknown as typeof globalThis.fetch;
    const seen: string[] = [];
    await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000, (e) =>
      seen.push(e)
    );
    assert.deepEqual(seen, []);
  });
});
