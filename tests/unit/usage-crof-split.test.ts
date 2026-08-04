// Characterization of the services/usage.ts crof split (god-file decomposition): the CrofAI
// /usage_api/ fetcher (getCrofUsage) + its overridable URL moved into services/usage/crof.ts so
// usage.ts stays a thin dispatcher. Behavior-preserving move — these locks pin the export surface
// and the no-key fail-open message already covered via getUsageForProvider in crof-usage.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

const C = await import("../../open-sse/services/usage/crof.ts");

test("module exposes getCrofUsage", () => {
  assert.equal(typeof C.getCrofUsage, "function");
});

test("getCrofUsage returns a friendly message when the api key is missing", async () => {
  const r = (await C.getCrofUsage("")) as { message?: string };
  assert.match(r.message ?? "", /CrofAI API key not available/);
});

test("getCrofUsage surfaces Requests Today + Credits for a subscription account", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ usable_requests: 450, credits: 12.3456 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const r = (await C.getCrofUsage("test-key")) as {
      quotas?: Record<
        string,
        { remaining: number; total: number; used: number; displayName?: string; unlimited: boolean }
      >;
    };
    assert.ok(r.quotas?.["Requests Today"]);
    assert.equal(r.quotas!["Requests Today"].remaining, 450);
    assert.equal(r.quotas!["Requests Today"].total, 1000);
    assert.equal(r.quotas!["Requests Today"].used, 550);
    assert.ok(r.quotas?.["Credits"]?.unlimited);
    assert.match(r.quotas!["Credits"].displayName!, /\$12\.3456/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getCrofUsage omits Requests Today for pay-as-you-go (usable_requests=null)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ usable_requests: null, credits: 5.5 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const r = (await C.getCrofUsage("test-key")) as { quotas?: Record<string, unknown> };
    assert.equal(r.quotas?.["Requests Today"], undefined);
    assert.ok(r.quotas?.["Credits"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getCrofUsage returns a rejected-key message on 401/403", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("nope", { status: 401 });
  try {
    const r = (await C.getCrofUsage("bad-key")) as { message?: string };
    assert.match(r.message ?? "", /rejected/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
