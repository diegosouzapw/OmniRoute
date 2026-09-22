/**
 * Muse Code subscription OAuth (device flow + subscription key exchange).
 *
 * Covers requestDeviceCode validation, pollToken shapes, the key-exchange
 * post step (including inactive/billing/malformed cases and credential
 * redaction), token mapping for persistence, and provider registration.
 * All upstream traffic is stubbed — no network, no real credentials.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { MUSE_CODE_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import PROVIDERS from "../../src/lib/oauth/providers/index.ts";
import { museCode } from "../../src/lib/oauth/providers/muse-code.ts";

const originalFetch = globalThis.fetch;

type FetchStub = (url: string | URL | Request, init?: RequestInit) => Promise<Response>;

function useFetch(stub: FetchStub): void {
  globalThis.fetch = stub as typeof globalThis.fetch;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function calls(): Array<{ url: string; init?: RequestInit }> {
  const seen: Array<{ url: string; init?: RequestInit }> = [];
  useFetch(async (url: string | URL | Request, init?: RequestInit) => {
    seen.push({ url: String(url), init });
    throw new Error("unexpected fetch in this case");
  });
  return seen;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const DEVICE_OK = {
  device_code: "dev-code-1",
  user_code: "ABCD-1234",
  verification_uri: "https://auth.meta.com/device",
  verification_uri_complete: "https://auth.meta.com/device?user_code=ABCD-1234",
  expires_in: 1800,
  interval: 5,
};

// Obviously fake key material — never real credential shapes.
const FAKE_ACCOUNT_TOKEN = ["test-account-token-", "x".repeat(16)].join("");
const FAKE_API_KEY = ["test-subscription-key-", "y".repeat(16)].join("");

test("requestDeviceCode posts the device grant and returns the ticket", async () => {
  const seen = calls();
  useFetch(async (url: string | URL | Request, init?: RequestInit) => {
    seen.push({ url: String(url), init });
    return jsonResponse(DEVICE_OK);
  });
  const ticket = await museCode.requestDeviceCode(MUSE_CODE_CONFIG);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].url, MUSE_CODE_CONFIG.deviceCodeUrl);
  assert.equal(seen[0].init?.method, "POST");
  const body = new URLSearchParams(String(seen[0].init?.body ?? ""));
  assert.ok(body.get("client_id"));
  assert.equal(ticket.device_code, "dev-code-1");
  assert.equal(ticket.user_code, "ABCD-1234");
  assert.equal(ticket.verification_uri_complete, DEVICE_OK.verification_uri_complete);
  assert.equal(ticket.expires_in, 1800);
  assert.equal(ticket.interval, 5);
});

test("requestDeviceCode rejects non-JSON, missing fields, bad origin, bad expiry", async () => {
  const bad: unknown[] = [
    "not-json",
    { ...DEVICE_OK, device_code: "" },
    { ...DEVICE_OK, user_code: "   " },
    { ...DEVICE_OK, verification_uri_complete: "https://evil.example.com/device" },
    { ...DEVICE_OK, verification_uri_complete: "not a url" },
    { ...DEVICE_OK, expires_in: 0 },
    { ...DEVICE_OK, expires_in: 999999 },
    { ...DEVICE_OK, expires_in: "soon" },
    ["an", "array"],
    null,
  ];
  for (const payload of bad) {
    useFetch(async () =>
      typeof payload === "string" ? new Response(payload, { status: 200 }) : jsonResponse(payload)
    );
    await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG));
  }
});

test("requestDeviceCode fails closed on HTTP errors without leaking bodies", async () => {
  useFetch(async () => jsonResponse({ error: "access_denied", secret: "s3cr3t" }, 403));
  const error = await museCode.requestDeviceCode(MUSE_CODE_CONFIG).then(
    () => null,
    (e: unknown) => e
  );
  assert.ok(error instanceof Error);
  assert.ok(!error.message.includes("s3cr3t"));
});

test("pollToken returns ok/data shapes for success and pending", async () => {
  useFetch(async () => jsonResponse({ access_token: FAKE_ACCOUNT_TOKEN }));
  const ok = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(ok.ok, true);
  assert.equal(ok.data.access_token, FAKE_ACCOUNT_TOKEN);

  useFetch(async () => jsonResponse({ error: "authorization_pending" }));
  const pending = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(pending.ok, true);
  assert.equal(pending.data.error, "authorization_pending");

  useFetch(async () => jsonResponse({ error: "slow_down" }));
  const slow = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(slow.ok, true);
  assert.equal(slow.data.error, "slow_down");
});

test("pollToken maps unknown errors to a fixed response", async () => {
  useFetch(async () =>
    jsonResponse({ error: "weird_upstream_code", error_description: "secret api_key=abc123" })
  );
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(result.data.error, "invalid_response");
  assert.ok(!("error_description" in result.data));
});

test("pollToken rejects inherited properties as error codes", async () => {
  for (const code of ["constructor", "toString", "hasOwnProperty", "__proto__"]) {
    useFetch(async () => jsonResponse({ error: code, error_description: "x" }));
    const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
    assert.equal(result.data.error, "invalid_response", code);
    assert.ok(!("error_description" in result.data), code);
  }
});

test("pollToken replaces known-code descriptions with fixed messages", async () => {
  useFetch(async () =>
    jsonResponse({ error: "access_denied", error_description: "user=alice api_key=abc123" })
  );
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(result.data.error, "access_denied");
  assert.equal(result.data.error_description, "Authorization denied.");
  assert.ok(!String(result.data.error_description).includes("abc123"));
});

test("pollToken maps transport failure to network_error", async () => {
  useFetch(async () => {
    throw new Error("boom");
  });
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.equal(result.ok, false);
  assert.equal(result.data.error, "network_error");
});

test("postExchange trades the device token for a subscription key", async () => {
  const seen = calls();
  useFetch(async (url: string | URL | Request, init?: RequestInit) => {
    seen.push({ url: String(url), init });
    return jsonResponse({
      api_key: FAKE_API_KEY,
      user_id: "user-123",
      is_subs_active: true,
    });
  });
  const extra = await museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].url, MUSE_CODE_CONFIG.keyUrl);
  assert.equal(seen[0].init?.method, "POST");
  const headers = new Headers(seen[0].init?.headers);
  assert.equal(headers.get("Authorization"), `Bearer ${FAKE_ACCOUNT_TOKEN}`);
  assert.deepEqual(JSON.parse(String(seen[0].init?.body ?? "{}")), { onboard: true });
  assert.equal(extra.apiKey, FAKE_API_KEY);
  assert.equal(extra.accountId, "user-123");
  assert.equal(extra.email, null);
  assert.equal(extra.isSubsActive, true);
});

test("postExchange accepts user_email identity and surfaces it for dedup", async () => {
  useFetch(async () =>
    jsonResponse({ api_key: FAKE_API_KEY, user_email: "a@example.com", is_subs_active: true })
  );
  const extra = await museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN });
  assert.equal(extra.accountId, "a@example.com");
  assert.equal(extra.email, "a@example.com");
});

test("postExchange rejects inactive, billing-action, and incomplete payloads", async () => {
  const bad: unknown[] = [
    { api_key: FAKE_API_KEY, user_id: "u", is_subs_active: false },
    { api_key: FAKE_API_KEY, user_id: "u", require_payment: true },
    { api_key: FAKE_API_KEY, user_id: "u", action_url: "https://example.com/pay" },
    { api_key: FAKE_API_KEY, user_id: "u", require_payment_action_url: "https://example.com/p" },
    { user_id: "u", is_subs_active: true },
    { api_key: FAKE_API_KEY, is_subs_active: true },
    { api_key: "  ", user_id: "u" },
    ["array"],
  ];
  for (const payload of bad) {
    useFetch(async () => jsonResponse(payload));
    await assert.rejects(museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN }));
  }
});

test("postExchange never propagates response bodies or transport errors", async () => {
  const withBody = async (payload: unknown, status: number) => {
    useFetch(async () => jsonResponse(payload, status));
    const error = await museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN }).then(
      () => null,
      (e: unknown) => e
    );
    assert.ok(error instanceof Error);
    assert.ok(!error.message.includes(FAKE_API_KEY), `leaked key: ${error.message}`);
    assert.ok(!error.message.includes(FAKE_ACCOUNT_TOKEN), `leaked token: ${error.message}`);
  };
  // A body that itself carries key material must not round-trip into errors.
  await withBody({ api_key: FAKE_API_KEY, user_id: "u", is_subs_active: false }, 200);
  await withBody({ error: "denied", api_key: FAKE_API_KEY }, 403);
  useFetch(async () => new Response("not json", { status: 200 }));
  await assert.rejects(museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN }));
  useFetch(async () => {
    throw new Error("socket hang up");
  });
  const transport = await museCode.postExchange({ access_token: FAKE_ACCOUNT_TOKEN }).then(
    () => null,
    (e: unknown) => e
  );
  assert.ok(transport instanceof Error);
  assert.ok(!transport.message.includes("socket hang up"));
});

test("postExchange requires the device access token", async () => {
  await assert.rejects(museCode.postExchange({}));
  await assert.rejects(museCode.postExchange({ access_token: "  " }));
});

test("mapTokens stores the subscription key as the inference bearer", () => {
  const mapped = museCode.mapTokens(
    { access_token: FAKE_ACCOUNT_TOKEN },
    { apiKey: FAKE_API_KEY, accountId: "user-123", email: null, isSubsActive: true }
  );
  assert.equal(mapped.accessToken, FAKE_API_KEY);
  assert.ok(!("refreshToken" in mapped), "no refresh grant exists for this flow");
  assert.ok(!("expiresIn" in mapped), "no advertised expiry; reconnect replaces the key");
  const specific = mapped.providerSpecificData as Record<string, unknown>;
  assert.equal(specific.accountId, "user-123");
  assert.ok(!("accountToken" in specific), "device token is discarded, never persisted");
});

test("mapTokens rejects incomplete exchanges", () => {
  assert.throws(() => museCode.mapTokens({ access_token: FAKE_ACCOUNT_TOKEN }, null));
  assert.throws(() =>
    museCode.mapTokens(
      { access_token: FAKE_ACCOUNT_TOKEN },
      { apiKey: "", accountId: "u", email: null, isSubsActive: true }
    )
  );
  assert.throws(() =>
    museCode.mapTokens(
      { access_token: FAKE_ACCOUNT_TOKEN },
      { apiKey: FAKE_API_KEY, accountId: "  ", email: null, isSubsActive: true }
    )
  );
});

test("requestDeviceCode rejects embedded credentials in authorization URLs", async () => {
  useFetch(async () =>
    jsonResponse({
      ...DEVICE_OK,
      verification_uri_complete: "https://user:pass@auth.meta.com/device?code=X",
    })
  );
  await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG));
  useFetch(async () =>
    jsonResponse({ ...DEVICE_OK, verification_uri: "https://auth.meta.com@evil.example.com/" })
  );
  await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG));
});

test("pollToken passes only allowlisted fields to the shared loop", async () => {
  useFetch(async () =>
    jsonResponse({ access_token: FAKE_ACCOUNT_TOKEN, junk: "drop-me", nested: { a: 1 } })
  );
  const ok = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-code-1");
  assert.deepEqual(Object.keys(ok.data).sort(), ["access_token"]);
});

test("provider is registered as a device_code flow with masked client id", () => {
  assert.equal(PROVIDERS["muse-code"], museCode);
  assert.equal(museCode.flowType, "device_code");
  assert.equal(typeof MUSE_CODE_CONFIG.deviceCodeUrl, "string");
  assert.equal(typeof MUSE_CODE_CONFIG.tokenUrl, "string");
  assert.equal(typeof MUSE_CODE_CONFIG.keyUrl, "string");
  // Shape only — the literal client id must never appear in source or tests.
  assert.match(MUSE_CODE_CONFIG.clientId, /^\d{16}$/);
});
