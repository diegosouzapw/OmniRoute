import test from "node:test";
import assert from "node:assert/strict";

const { normalizeWebFetchCredentials } = await import("../../../src/lib/skills/webFetchExecution.ts");

test("web-fetch skills reject unavailable credential sentinels", () => {
  assert.equal(
    normalizeWebFetchCredentials({ allRateLimited: true, retryAfter: "tomorrow" }),
    null
  );
  assert.equal(normalizeWebFetchCredentials({ allExpired: true, expiredCount: 2 }), null);
});

test("web-fetch skills expose only the credential fields used by fetch executors", () => {
  assert.deepEqual(
    normalizeWebFetchCredentials({
      apiKey: "secret",
      baseUrl: "https://fetch.example.test",
      providerSpecificData: { region: "test" },
      accessToken: "must-not-leak-through",
    }),
    {
      apiKey: "secret",
      baseUrl: "https://fetch.example.test",
      providerSpecificData: { region: "test" },
    }
  );
});
