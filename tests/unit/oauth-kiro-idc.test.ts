import test from "node:test";
import assert from "node:assert/strict";

import { kiro } from "@/lib/oauth/providers/kiro";

test("kiro.requestDeviceCode returns resolved region for IDC token endpoint", async () => {
  const originalFetch = global.fetch;

  const fetchCalls: Array<{ url: string; body?: string }> = [];

  global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    fetchCalls.push({ url, body: typeof init?.body === "string" ? init.body : undefined });

    if (url.endsWith("/client/register")) {
      return new Response(JSON.stringify({ clientId: "client-ap", clientSecret: "secret-ap" }), {
        status: 200,
      });
    }

    if (url.endsWith("/device_authorization")) {
      return new Response(
        JSON.stringify({
          deviceCode: "dev-code",
          userCode: "user-code",
          verificationUri: "https://d-tenant.awsapps.com/start/#/device",
          verificationUriComplete: "https://d-tenant.awsapps.com/start/#/device?user_code=ABCD",
          expiresIn: 600,
          interval: 1,
        }),
        { status: 200 }
      );
    }

    return new Response("not-found", { status: 404 });
  }) as typeof fetch;

  try {
    const result = await kiro.requestDeviceCode({
      registerClientUrl: "https://oidc.ap-southeast-1.amazonaws.com/client/register",
      deviceAuthUrl: "https://oidc.ap-southeast-1.amazonaws.com/device_authorization",
      tokenUrl: "https://oidc.ap-southeast-1.amazonaws.com/token",
      startUrl: "https://d-tenant.awsapps.com/start",
      clientName: "kiro-oauth-client",
      clientType: "public",
      scopes: ["codewhisperer:completions"],
      grantTypes: ["urn:ietf:params:oauth:grant-type:device_code", "refresh_token"],
      skipIssuerUrlForRegistration: true,
    });

    assert.equal(result._region, "ap-southeast-1");
    assert.equal(result._clientId, "client-ap");
    assert.equal(result._clientSecret, "secret-ap");

    const registerBody = JSON.parse(fetchCalls[0]?.body || "{}");
    assert.equal(registerBody.issuerUrl, undefined);
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.pollToken uses region provided by extraData", async () => {
  const originalFetch = global.fetch;
  let requestedUrl = "";

  global.fetch = (async (input: RequestInfo | URL) => {
    requestedUrl = String(input);
    return new Response(
      JSON.stringify({
        accessToken: "access",
        refreshToken: "refresh",
        expiresIn: 3600,
      }),
      { status: 200 }
    );
  }) as typeof fetch;

  try {
    const result = await kiro.pollToken(
      { tokenUrl: "https://oidc.us-east-1.amazonaws.com/token" },
      "device-code",
      null,
      { _clientId: "cid", _clientSecret: "csecret", _region: "ap-southeast-1" }
    );

    assert.equal(requestedUrl, "https://oidc.ap-southeast-1.amazonaws.com/token");
    assert.equal(result.ok, true);
    assert.equal(result.data.access_token, "access");
    assert.equal(result.data._region, "ap-southeast-1");
  } finally {
    global.fetch = originalFetch;
  }
});

test("kiro.mapTokens persists region into providerSpecificData", () => {
  const mapped = kiro.mapTokens({
    access_token: "at",
    refresh_token: "rt",
    expires_in: 3600,
    _clientId: "cid",
    _clientSecret: "csec",
    _region: "ap-southeast-1",
  });

  assert.equal(mapped.accessToken, "at");
  assert.equal(mapped.refreshToken, "rt");
  assert.equal(mapped.expiresIn, 3600);
  assert.equal(mapped.providerSpecificData.clientId, "cid");
  assert.equal(mapped.providerSpecificData.clientSecret, "csec");
  assert.equal(mapped.providerSpecificData.region, "ap-southeast-1");
});

test("kiro.mapTokens defaults region to undefined when not provided", () => {
  const mapped = kiro.mapTokens({
    access_token: "at",
    refresh_token: "rt",
    expires_in: 3600,
    _clientId: "cid",
    _clientSecret: "csec",
  });

  assert.equal(mapped.providerSpecificData.region, undefined);
});
