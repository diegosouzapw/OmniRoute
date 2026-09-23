import assert from "node:assert/strict";
import test from "node:test";
import {
  MUSE_DEVICE_AUTH_URL,
  MUSE_DEVICE_TOKEN_URL,
  MUSE_DEVICE_GRANT,
  MUSE_KEY_URL,
  MUSE_SUBSCRIPTION_BASE_URL,
  MUSE_SUBSCRIPTION_RESPONSES_URL,
  MuseSubscriptionError,
  mintMuseSubscriptionKey,
  museSubscriptionHeaders,
  normalizeMuseResponsesRequest,
  pollMuseDeviceToken,
  requestMuseDeviceCode,
  type MuseFetch,
} from "../../../open-sse/services/museCodeSubscription.ts";

// All credentials here are inert fixtures; no live Meta requests are made.
const SESSION = "dca:test-session-never-valid";
const KEY = "test-muse-key-never-valid";
const deviceFixture = {
  device_code: "device-test-code",
  user_code: "ABCD-EFGH",
  verification_uri: "https://auth.meta.com/oidc/device/",
  verification_uri_complete: "https://auth.meta.com/oidc/device/?user_code=ABCD-EFGH",
  expires_in: 600,
  interval: 5,
};
const mintFixture = {
  api_key: KEY,
  base_url: MUSE_SUBSCRIPTION_BASE_URL,
  is_subs_active: true,
  subs_tier_name: "High Usage",
  subs_tier_id: "fixture-high-tier",
  require_payment: false,
  user_email: "subscriber@example.invalid",
};

function jsonFetch(data: unknown, status = 200): MuseFetch {
  return async () => Response.json(data, { status });
}

function requestHeaders(init: RequestInit): Headers {
  return new Headers(init.headers);
}

test("device request uses the discovered public-client form and fixed destination", async () => {
  const result = await requestMuseDeviceCode("fixture-client", async (url, init) => {
    assert.equal(url, MUSE_DEVICE_AUTH_URL);
    assert.equal(init.method, "POST");
    assert.equal(init.redirect, "error");
    assert.ok(init.signal instanceof AbortSignal);
    assert.equal(new URLSearchParams(String(init.body)).get("client_id"), "fixture-client");
    assert.equal(requestHeaders(init).get("authorization"), null);
    return Response.json(deviceFixture);
  });
  assert.deepEqual(result, deviceFixture);
});

test("verification_uri works without verification_uri_complete", async () => {
  const { verification_uri_complete: _unused, ...fixture } = deviceFixture;
  const result = await requestMuseDeviceCode("client", jsonFetch(fixture));
  assert.equal(result.verification_uri, fixture.verification_uri);
  assert.equal(result.verification_uri_complete, undefined);
});

test("device timing respects short lifetimes and never polls faster than five seconds", async () => {
  const result = await requestMuseDeviceCode("client", jsonFetch({ ...deviceFixture, expires_in: 3, interval: 1 }));
  assert.equal(result.expires_in, 3);
  assert.equal(result.interval, 5);
  const large = await requestMuseDeviceCode("client", jsonFetch({ ...deviceFixture, expires_in: 999999, interval: 12 }));
  assert.equal(large.expires_in, 900);
  assert.equal(large.interval, 12);
});

for (const url of [
  "http://auth.meta.com/device", "https://auth.meta.com.attacker.invalid/device",
  "https://attacker.invalid/device", "https://auth.meta.com@attacker.invalid/device",
  "https://user:pass@auth.meta.com/device", "https://auth.meta.com:444/device",
  "javascript:alert(1)", "https://127.0.0.1/device",
]) {
  test(`rejects untrusted verification URL ${url}`, async () => {
    await assert.rejects(
      requestMuseDeviceCode("client", jsonFetch({ ...deviceFixture, verification_uri_complete: url })),
      /untrusted verification URL/
    );
  });
}

test("missing device code cannot create a login session", async () => {
  await assert.rejects(requestMuseDeviceCode("client", jsonFetch({ ...deviceFixture, device_code: "" })), /Invalid Muse device code/);
});

test("poll uses RFC 8628 grant and never submits a session token as client_id", async () => {
  const result = await pollMuseDeviceToken("client", "device", async (url, init) => {
    assert.equal(url, MUSE_DEVICE_TOKEN_URL);
    const body = new URLSearchParams(String(init.body));
    assert.equal(body.get("grant_type"), MUSE_DEVICE_GRANT);
    assert.equal(body.get("device_code"), "device");
    assert.equal(body.get("client_id"), "client");
    return Response.json({ access_token: SESSION, expires_in: 60 });
  });
  assert.equal(result.data.access_token, SESSION);
  assert.equal(result.data.expires_in, 60);
});

for (const code of ["authorization_pending", "slow_down"]) {
  test(`HTTP 400 ${code} remains usable by OmniRoute's generic poll wrapper`, async () => {
    const result = await pollMuseDeviceToken("client", "device", jsonFetch({ error: code }, 400));
    assert.equal(result.ok, true);
    assert.equal(result.data.error, code);
    assert.equal(result.data.access_token, undefined);
  });
}

for (const code of ["access_denied", "expired_token", "invalid_grant"]) {
  test(`${code} stops polling`, async () => {
    const result = await pollMuseDeviceToken("client", "device", jsonFetch({ error: code }, 400));
    assert.equal(result.ok, false);
    assert.equal(result.data.error, code);
  });
}

test("upstream error descriptions and unexpected errors are not reflected", async () => {
  const result = await pollMuseDeviceToken("client", "device", jsonFetch({ error: SESSION, error_description: KEY }, 400));
  assert.ok(!JSON.stringify(result).includes(SESSION));
  assert.ok(!JSON.stringify(result).includes(KEY));
});

test("mint sends the DCA token only to the fixed mint endpoint", async () => {
  const result = await mintMuseSubscriptionKey(SESSION, async (url, init) => {
    assert.equal(url, MUSE_KEY_URL);
    assert.equal(init.redirect, "error");
    assert.equal(requestHeaders(init).get("authorization"), `Bearer ${SESSION}`);
    assert.deepEqual(JSON.parse(String(init.body)), { dca_token: SESSION });
    return Response.json(mintFixture);
  });
  assert.equal(result.accessToken, KEY);
  assert.equal(result.providerSpecificData.subscriptionTier, "High Usage");
  assert.equal(result.email, "subscriber@example.invalid");
  assert.ok(!JSON.stringify(result).includes(SESSION));
  assert.equal(Object.hasOwn(result, "refreshToken"), false);
  assert.equal(Object.hasOwn(result, "expiresIn"), false);
  assert.equal(Object.hasOwn(result, "expiresAt"), false);
});

for (const active of [false, undefined, null, "true", 1]) {
  test(`subscription must be strictly true, not ${String(active)}`, async () => {
    await assert.rejects(
      mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, is_subs_active: active })),
      (error: unknown) => error instanceof MuseSubscriptionError && error.status === 403
    );
  });
}

test("require_payment is rejected even if the response contains a key", async () => {
  await assert.rejects(mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, require_payment: true })), /active Muse Code subscription/);
});

for (const base_url of [
  "https://attacker.invalid/v1", "http://api.meta.ai/v1", "https://api.meta.ai/v1?redirect=elsewhere",
  "https://api.meta.ai.evil.invalid/v1", "https://127.0.0.1/v1",
]) {
  test(`mint cannot redirect inference credentials to ${base_url}`, async () => {
    await assert.rejects(mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, base_url })), /unsupported inference endpoint/);
  });
}

test("optional mint base URL and trailing slash normalize to the one supported destination", async () => {
  for (const base_url of [undefined, "", `${MUSE_SUBSCRIPTION_BASE_URL}/`]) {
    const grant = await mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, base_url }));
    assert.equal(grant.providerSpecificData.baseUrl, MUSE_SUBSCRIPTION_BASE_URL);
  }
});

for (const api_key of ["", SESSION, "bad\r\nAuthorization: injected"]) {
  test(`invalid inference key is rejected (${api_key === SESSION ? "session token" : "empty/control"})`, async () => {
    await assert.rejects(mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, api_key })), MuseSubscriptionError);
  });
}

test("malformed responses do not echo sensitive upstream data", async () => {
  await assert.rejects(mintMuseSubscriptionKey(SESSION, async () => new Response(`${KEY} <html>`, { status: 502 })), (error: unknown) => {
    assert.ok(error instanceof MuseSubscriptionError);
    assert.ok(!error.message.includes(KEY));
    return true;
  });
});

test("transport errors are safe and do not include credentials", async () => {
  await assert.rejects(mintMuseSubscriptionKey(SESSION, async () => { throw new Error(SESSION); }), (error: unknown) => {
    assert.ok(error instanceof MuseSubscriptionError);
    assert.ok(!error.message.includes(SESSION));
    return true;
  });
});

test("oversized authentication response is bounded", async () => {
  await assert.rejects(mintMuseSubscriptionKey(SESSION, async () => new Response("x".repeat(65537))), /oversized/);
});

test("inference uses only the minted key, with an honest client identity", async () => {
  const grant = await mintMuseSubscriptionKey(SESSION, jsonFetch(mintFixture));
  const headers = museSubscriptionHeaders(grant);
  assert.equal(headers.Authorization, `Bearer ${KEY}`);
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["User-Agent"], "OmniRoute/MuseCodeSubscription");
});

test("generic API keys, absent provenance, and DCA tokens cannot become inference credentials", async () => {
  const grant = await mintMuseSubscriptionKey(SESSION, jsonFetch(mintFixture));
  for (const credentials of [
    {}, { apiKey: KEY }, { accessToken: KEY }, { ...grant, accessToken: SESSION },
    { ...grant, apiKey: "ordinary-payg-key" },
    { ...grant, providerSpecificData: { ...grant.providerSpecificData, isSubscriptionActive: false } },
    { ...grant, providerSpecificData: { ...grant.providerSpecificData, baseUrl: "https://attacker.invalid" } },
  ]) {
    assert.throws(() => museSubscriptionHeaders(credentials), MuseSubscriptionError);
  }
});

test("Responses normalization preserves tool round trips, vision and reasoning without mutating input", () => {
  const body = {
    input: [
      { role: "user", content: [{ type: "input_image", image_url: "https://example.invalid/image.png" }] },
      { type: "function_call", call_id: "call_1", name: "read_file", arguments: '{"path":"a.ts"}' },
      { type: "function_call_output", call_id: "call_1", output: "hello" },
    ],
    tools: [{ type: "function", name: "read_file", parameters: { type: "object" } }],
    reasoning: { effort: "high" },
    stream: false,
    generate: {}, prompt_cache_retention: "24h", safety_identifier: "caller",
    stream_options: { include_usage: true }, client_metadata: { local: true },
  };
  const before = structuredClone(body);
  const normalized = normalizeMuseResponsesRequest("muse-spark-1.3", body);
  assert.equal(normalized.stream, true);
  assert.equal(normalized.model, "muse-spark-1.3");
  assert.equal(normalized.instructions, "");
  for (const field of ["generate", "prompt_cache_retention", "safety_identifier", "stream_options", "client_metadata"]) {
    assert.equal(Object.hasOwn(normalized, field), false);
  }
  assert.deepEqual(normalized.input, body.input);
  assert.deepEqual(normalized.tools, body.tools);
  assert.deepEqual(normalized.reasoning, body.reasoning);
  assert.deepEqual(body, before);
});

test("untranslated Chat Completions payload is not silently forwarded as Responses", () => {
  assert.throws(() => normalizeMuseResponsesRequest("muse-spark-1.3", { messages: [] }), /translated Responses input/);
});

test("mock protocol round trip: device -> token -> subscription key -> native request", async () => {
  const urls: string[] = [];
  const fetcher: MuseFetch = async (url) => {
    urls.push(url);
    if (url === MUSE_DEVICE_AUTH_URL) return Response.json(deviceFixture);
    if (url === MUSE_DEVICE_TOKEN_URL) return Response.json({ access_token: SESSION, expires_in: 60 });
    if (url === MUSE_KEY_URL) return Response.json(mintFixture);
    throw new Error("Unexpected network destination");
  };
  const device = await requestMuseDeviceCode("client", fetcher);
  const token = await pollMuseDeviceToken("client", device.device_code, fetcher);
  assert.ok(token.data.access_token);
  const grant = await mintMuseSubscriptionKey(token.data.access_token, fetcher);
  assert.equal(museSubscriptionHeaders(grant).Authorization, `Bearer ${KEY}`);
  assert.equal(normalizeMuseResponsesRequest("muse-spark-1.3", { input: "hello" }).stream, true);
  assert.equal(MUSE_SUBSCRIPTION_RESPONSES_URL, "https://api.meta.ai/v1/responses");
  assert.deepEqual(urls, [MUSE_DEVICE_AUTH_URL, MUSE_DEVICE_TOKEN_URL, MUSE_KEY_URL]);
});

test("invalid timing cannot extend an expired grant or overflow a browser timer", async () => {
  for (const timing of [
    { expires_in: 0 }, { expires_in: -1 }, { expires_in: "600" },
    { interval: -1 }, { interval: 2 ** 32 }, { interval: 1.5 },
  ]) {
    await assert.rejects(
      requestMuseDeviceCode("client", jsonFetch({ ...deviceFixture, ...timing })),
      MuseSubscriptionError
    );
  }
});

test("server errors cannot masquerade as ordinary pending authorization", async () => {
  const result = await pollMuseDeviceToken(
    "client", "device", jsonFetch({ error: "authorization_pending" }, 503)
  );
  assert.equal(result.ok, false);
});


test("client identifiers reject embedded whitespace before making a request", async () => {
  const neverFetch: MuseFetch = async () => {
    assert.fail("invalid client identifier must not leave this process");
  };
  await assert.rejects(requestMuseDeviceCode("invalid client", neverFetch), /client identifier/);
});

test("session tokens reject embedded whitespace before minting", async () => {
  const neverFetch: MuseFetch = async () => {
    assert.fail("invalid session token must not leave this process");
  };
  await assert.rejects(mintMuseSubscriptionKey("dca:invalid token", neverFetch), /session token/);
});

test("minted keys containing whitespace cannot enter the credential store", async () => {
  await assert.rejects(
    mintMuseSubscriptionKey(SESSION, jsonFetch({ ...mintFixture, api_key: "invalid key" })),
    /Code key/
  );
});

test("stored keys containing whitespace cannot become authorization headers", async () => {
  const grant = await mintMuseSubscriptionKey(SESSION, jsonFetch(mintFixture));
  assert.throws(
    () => museSubscriptionHeaders({ ...grant, accessToken: "invalid key" }),
    /Sign in to Muse Code Subscription again/
  );
});
