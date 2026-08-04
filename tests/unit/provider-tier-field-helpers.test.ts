/**
 * Client-side fetch helpers behind the Advanced Settings tier-override
 * selector (#7818). Pure integration logic — no DOM — unit-testable by
 * stubbing global.fetch, mirroring `tests/unit/agent-bridge-maintenance-api.test.ts`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { normalizeTierValue, fetchProviderTierOverride, saveProviderTierOverride } = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/providerTierFieldApi.ts"
);

type FetchCall = { url: string; init?: RequestInit };

function stubFetch(handler: (call: FetchCall) => { ok: boolean; status?: number; body?: unknown }) {
  const calls: FetchCall[] = [];
  const original = global.fetch;
  global.fetch = (async (url: string, init?: RequestInit) => {
    const call = { url: String(url), init };
    calls.push(call);
    const { ok, status = ok ? 200 : 500, body } = handler(call);
    return {
      ok,
      status,
      json: async () => body,
    } as unknown as Response;
  }) as typeof fetch;
  return {
    calls,
    restore() {
      global.fetch = original;
    },
  };
}

test("normalizeTierValue maps valid tiers through and everything else to unset", () => {
  assert.equal(normalizeTierValue("free"), "free");
  assert.equal(normalizeTierValue("cheap"), "cheap");
  assert.equal(normalizeTierValue("premium"), "premium");
  assert.equal(normalizeTierValue(undefined), "");
  assert.equal(normalizeTierValue(null), "");
  assert.equal(normalizeTierValue("gold"), "");
  assert.equal(normalizeTierValue(""), "");
});

test("fetchProviderTierOverride returns the matching override (case-insensitive)", async () => {
  const stub = stubFetch(() => ({
    ok: true,
    body: {
      providerOverrides: [{ provider: "My-Custom-Endpoint", tier: "premium" }],
    },
  }));
  try {
    const result = await fetchProviderTierOverride("my-custom-endpoint");
    assert.equal(result, "premium");
    assert.equal(stub.calls[0].url, "/api/settings/tier-config");
  } finally {
    stub.restore();
  }
});

test("fetchProviderTierOverride returns '' when no override exists or the request fails", async () => {
  const okStub = stubFetch(() => ({ ok: true, body: { providerOverrides: [] } }));
  try {
    assert.equal(await fetchProviderTierOverride("unset-provider"), "");
  } finally {
    okStub.restore();
  }

  const failStub = stubFetch(() => ({ ok: false, status: 500 }));
  try {
    assert.equal(await fetchProviderTierOverride("any-provider"), "");
  } finally {
    failStub.restore();
  }
});

test("saveProviderTierOverride PUTs the provider + tier, and null when clearing", async () => {
  const stub = stubFetch(() => ({ ok: true, body: {} }));
  try {
    await saveProviderTierOverride("my-custom-endpoint", "cheap");
    const body = JSON.parse(String(stub.calls[0].init?.body));
    assert.equal(stub.calls[0].init?.method, "PUT");
    assert.deepEqual(body, { provider: "my-custom-endpoint", tier: "cheap" });

    await saveProviderTierOverride("my-custom-endpoint", "");
    const clearBody = JSON.parse(String(stub.calls[1].init?.body));
    assert.deepEqual(clearBody, { provider: "my-custom-endpoint", tier: null });
  } finally {
    stub.restore();
  }
});

test("saveProviderTierOverride throws on a non-OK response", async () => {
  const stub = stubFetch(() => ({ ok: false, status: 400 }));
  try {
    await assert.rejects(() => saveProviderTierOverride("my-custom-endpoint", "free"));
  } finally {
    stub.restore();
  }
});
