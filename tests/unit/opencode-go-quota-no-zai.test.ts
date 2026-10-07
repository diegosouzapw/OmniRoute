import assert from "node:assert/strict";
import test, { after } from "node:test";

const originalQuotaUrl = process.env.OMNIROUTE_OPENCODE_QUOTA_URL;
delete process.env.OMNIROUTE_OPENCODE_QUOTA_URL;

// Dynamic import is required so the module captures the cleared endpoint override.
const { fetchOpencodeQuota, invalidateOpencodeQuotaCache } =
  await import("../../open-sse/services/opencodeQuotaFetcher.ts");

const originalFetch = globalThis.fetch;

after(() => {
  globalThis.fetch = originalFetch;
  if (originalQuotaUrl === undefined) delete process.env.OMNIROUTE_OPENCODE_QUOTA_URL;
  else process.env.OMNIROUTE_OPENCODE_QUOTA_URL = originalQuotaUrl;
});

test("fetchOpencodeQuota uses the official OpenCode Go usage endpoint by default", async () => {
  const connectionId = `official-endpoint-${Date.now()}`;
  let requestUrl = "";
  let authorization: string | null = null;

  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    requestUrl = request.url;
    authorization = request.headers.get("Authorization");
    return new Response(
      JSON.stringify({
        usage: {
          rolling: {
            status: "ok",
            percent: 10,
            resetsAt: "2026-09-01T01:02:03.000Z",
          },
          weekly: {
            status: "ok",
            percent: 20,
            resetsAt: "2026-09-05T04:05:06.000Z",
          },
          monthly: {
            status: "ok",
            percent: 30,
            resetsAt: "2026-09-30T07:08:09.000Z",
          },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const quota = await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" });
    assert.ok(quota);
    assert.equal(requestUrl, "https://opencode.ai/zen/go/v1/usage");
    assert.equal(authorization, "Bearer opencode-key");
  } finally {
    invalidateOpencodeQuotaCache(connectionId);
  }
});
