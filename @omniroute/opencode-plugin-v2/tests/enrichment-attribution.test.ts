import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { defaultOmniRouteEnrichmentFetcher } from "../src/shared/enrich.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

/**
 * A gateway routes the same model id through several upstream providers. The
 * overlay must keep them apart: one connection's price shown on another's
 * model is worse than no price at all, because it looks authoritative.
 */
describe("two providers selling the same model id keep their own overlay", () => {
  it("does not let the second provider's price land on the first one's model", async () => {
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/pricing/models"))
        return ok({
          providers: {
            cc: {
              id: "claude",
              alias: "cc",
              name: "Claude",
              models: [{ id: "shared", name: "From Claude" }],
            },
            kir: {
              id: "kiro",
              alias: "kir",
              name: "Kiro",
              models: [{ id: "shared", name: "From Kiro" }],
            },
          },
        });
      if (href.includes("/api/pricing"))
        return ok({
          cc: { shared: { input: 3, output: 15 } },
          kir: { shared: { input: 99, output: 99 } },
        });
      return ok({});
    }) as unknown as typeof fetch;

    const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
    assert.deepEqual(map.get("cc/shared")?.pricing, { input: 3, output: 15 });
    assert.deepEqual(map.get("kir/shared")?.pricing, { input: 99, output: 99 });
    // The bare fallback belongs to whoever claimed it first, and keeps that
    // provider's numbers rather than the last writer's.
    assert.equal(map.get("shared")?.providerAlias, "cc");
    assert.deepEqual(map.get("shared")?.pricing, { input: 3, output: 15 });
    assert.notEqual(map.get("shared"), map.get("cc/shared"), "the bare entry is its own object");
  });
});
