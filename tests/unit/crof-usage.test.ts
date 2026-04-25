import test from "node:test";
import assert from "node:assert/strict";

const usage = await import("../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

test("USAGE_SUPPORTED_PROVIDERS includes crof", () => {
  assert.ok(
    (USAGE_SUPPORTED_PROVIDERS as string[]).includes("crof"),
    "crof must be in the usage-supported providers allowlist"
  );
});

test("getUsageForProvider returns helpful message when crof has no apiKey", async () => {
  const result = (await usage.getUsageForProvider({
    id: "crof-no-key",
    provider: "crof",
    apiKey: "",
  })) as { message?: string };
  assert.ok(typeof result.message === "string");
  assert.match(result.message!, /CrofAI/);
});

test("getUsageForProvider exposes Requests Today + Credits for subscription accounts", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ usable_requests: 450, credits: 12.3456 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = (await usage.getUsageForProvider({
      id: "crof-sub",
      provider: "crof",
      apiKey: "test-key",
    })) as {
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining: number;
          displayName?: string;
          unlimited: boolean;
          resetAt?: string | null;
        }
      >;
    };
    assert.ok(result.quotas, "quotas must be returned");
    assert.ok(result.quotas!["Requests Today"], "Requests Today quota must be present");
    assert.equal(result.quotas!["Requests Today"].remaining, 450);
    assert.match(result.quotas!["Requests Today"].displayName!, /450 left/);
    // Total must default to the Pro-plan baseline (1000) so the dashboard's
    // percentage formula reads "remaining/total" rather than 0% (red, depleted).
    assert.equal(result.quotas!["Requests Today"].total, 1000);
    assert.equal(result.quotas!["Requests Today"].used, 550);
    // CrofAI does not return a reset timestamp; we synthesize next UTC midnight
    // so the dashboard's countdown renders. Assert it parses to a future Date
    // within the next 24h without pinning the exact boundary.
    const resetAt = result.quotas!["Requests Today"].resetAt;
    assert.equal(typeof resetAt, "string", "Requests Today.resetAt must be an ISO string");
    const resetTs = Date.parse(resetAt!);
    assert.ok(Number.isFinite(resetTs), "Requests Today.resetAt must parse");
    const deltaMs = resetTs - Date.now();
    assert.ok(deltaMs > 0, "Requests Today.resetAt must be in the future");
    assert.ok(deltaMs <= 24 * 60 * 60 * 1000, "Requests Today.resetAt must be within 24h");
    assert.ok(result.quotas!["Credits"], "Credits quota must be present");
    assert.equal(result.quotas!["Credits"].unlimited, true);
    assert.match(result.quotas!["Credits"].displayName!, /\$12\.3456/);
    assert.equal(result.quotas!["Credits"].resetAt ?? null, null, "Credits has no reset bucket");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider omits Requests Today on pay-as-you-go (usable_requests=null)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ usable_requests: null, credits: 5.5 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = (await usage.getUsageForProvider({
      id: "crof-payg",
      provider: "crof",
      apiKey: "test-key",
    })) as { quotas?: Record<string, unknown> };
    assert.ok(result.quotas);
    assert.equal(
      result.quotas!["Requests Today"],
      undefined,
      "no Requests Today quota when not on a subscription plan"
    );
    assert.ok(result.quotas!["Credits"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getUsageForProvider returns 401 message when crof rejects the api key", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("nope", { status: 401 });
  try {
    const result = (await usage.getUsageForProvider({
      id: "crof-401",
      provider: "crof",
      apiKey: "bad-key",
    })) as { message?: string };
    assert.match(result.message ?? "", /rejected/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
