import { test } from "node:test";
import assert from "node:assert/strict";

import { validateProviderApiKey } from "../../../src/lib/providers/validation.ts";
import { validateAdobeFireflyProvider } from "../../../src/lib/providers/validation/adobeFirefly.ts";
import { resolveProviderId } from "../../../src/shared/constants/providers.ts";
import { ADOBE_FIREFLY_CREDITS_BALANCE_URL } from "../../../open-sse/services/adobeFireflyClient.ts";

// A well-formed Adobe IMS *user* access token (3-segment JWT, non-guest payload, long
// enough to satisfy looksLikeAdobeJwt). Only used as a routing/shape fixture — never a
// real credential.
const userJwt =
  `eyJhbGciOiJSUzI1NiJ9.` +
  Buffer.from(
    JSON.stringify({
      user_id: "0EB@AdobeID",
      type: "access_token",
      client_id: "clio-playground-web",
    })
  ).toString("base64url") +
  `.` +
  "x".repeat(60);

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("#10522: resolveProviderId('firefly') stays stable (SPECIALTY_VALIDATORS dual-key registration depends on it)", () => {
  assert.equal(resolveProviderId("firefly"), "adobe-firefly");
});

test("#10522: firefly alias dispatches to the Firefly validator, not the generic unsupported fallback", async () => {
  const result = await validateProviderApiKey({
    provider: "firefly",
    apiKey: "not-a-real-token",
    providerSpecificData: {},
  });
  assert.notEqual(result.unsupported, true);
});

test("#10522: adobe-firefly canonical id dispatches to the Firefly validator, not the generic unsupported fallback", async () => {
  const result = await validateProviderApiKey({
    provider: "adobe-firefly",
    apiKey: "not-a-real-token",
    providerSpecificData: {},
  });
  assert.notEqual(result.unsupported, true);
});

test("#10522: expired/invalid token reports valid:false with a real error message (not 'not supported')", async () => {
  const fetchImpl = async (url: string | URL) => {
    assert.equal(String(url), ADOBE_FIREFLY_CREDITS_BALANCE_URL);
    return jsonResponse(401, { error: "invalid_token" });
  };

  const result = await validateAdobeFireflyProvider({
    apiKey: userJwt,
    providerSpecificData: {},
    fetchImpl: fetchImpl as typeof fetch,
  });

  assert.equal(result.valid, false);
  assert.notEqual((result as { unsupported?: boolean }).unsupported, true);
  assert.ok(result.error && result.error.length > 0);
});

test("#10522: a genuine credits balance payload reports valid:true", async () => {
  const fetchImpl = async (url: string | URL) => {
    assert.equal(String(url), ADOBE_FIREFLY_CREDITS_BALANCE_URL);
    return jsonResponse(200, {
      total: { quota: { total: 100, used: 10, available: 90 } },
      credits: {
        firefly_free_credit: { quota: { total: 50, used: 5, available: 45 } },
        firefly_plan_credit: { quota: { total: 50, used: 5, available: 45 } },
      },
    });
  };

  const result = await validateAdobeFireflyProvider({
    apiKey: userJwt,
    providerSpecificData: {},
    fetchImpl: fetchImpl as typeof fetch,
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});
