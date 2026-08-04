// Characterization of the services/usage.ts nanogpt split (god-file decomposition): the NanoGPT
// subscription usage fetcher (getNanoGptUsage) + its API config moved into
// services/usage/nanogpt.ts so usage.ts stays a thin dispatcher. Behavior-preserving move —
// these locks pin the export surface and the no-key / 401 fail-open messages.
import { test } from "node:test";
import assert from "node:assert/strict";

const N = await import("../../open-sse/services/usage/nanogpt.ts");

test("module exposes getNanoGptUsage", () => {
  assert.equal(typeof N.getNanoGptUsage, "function");
});

test("getNanoGptUsage returns a friendly message when the api key is missing", async () => {
  const r = (await N.getNanoGptUsage("")) as { message?: string };
  assert.match(r.message ?? "", /NanoGPT API key not available/);
});

test("getNanoGptUsage returns FREE plan with no quotas for inactive subscriptions", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ active: false }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const r = (await N.getNanoGptUsage("k")) as { plan?: string; quotas?: Record<string, unknown> };
    assert.equal(r.plan, "FREE");
    assert.deepEqual(r.quotas ?? {}, {});
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getNanoGptUsage surfaces Daily Tokens + Daily Images for PRO accounts", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        active: true,
        dailyInputTokens: { used: 10, remaining: 90, percentUsed: 0.1, resetAt: 1_700_000_000 },
        dailyImages: { used: 2, remaining: 8, percentUsed: 0.2, resetAt: 1_700_000_000 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const r = (await N.getNanoGptUsage("k")) as {
      plan?: string;
      quotas?: Record<
        string,
        { total: number; used: number; remaining: number; remainingPercentage: number }
      >;
    };
    assert.equal(r.plan, "PRO");
    assert.ok(r.quotas?.["Daily Tokens"]);
    assert.equal(r.quotas!["Daily Tokens"].total, 100);
    assert.equal(r.quotas!["Daily Tokens"].remaining, 90);
    assert.equal(r.quotas!["Daily Images"].total, 10);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getNanoGptUsage returns Invalid API key message on 401", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("nope", { status: 401 });
  try {
    const r = (await N.getNanoGptUsage("bad")) as { message?: string };
    assert.match(r.message ?? "", /Invalid NanoGPT API key/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
