/**
 * The ghe-copilot device flow sends requests to a caller-supplied `gheUrl`. The route only
 * checks that it is an https URL, so every outbound request built from it must still go
 * through the provider outbound guard and must not follow redirects: a redirect is how an
 * https-only check is walked over to a plain-http internal or cloud-metadata address, and
 * the device-code response body is echoed back to the caller.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oauth-ghe-ssrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

const METADATA_URL = "http://169.254.169.254/latest/meta-data/iam/security-credentials/role";
const METADATA_SECRET = "metadata-secret-access-key";

const originalFetch = globalThis.fetch;
let requestedUrls: string[] = [];

// Models a GHE host that answers every request with a redirect to the metadata service.
// When the caller lets fetch follow redirects (the default), the redirect is followed the
// way undici does it, so the metadata request shows up in `requestedUrls`.
function installRedirectingFetch() {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    requestedUrls.push(url);
    if (url.startsWith("http://169.254.169.254/")) {
      return new Response(JSON.stringify({ SecretAccessKey: METADATA_SECRET }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (init?.redirect === "manual") {
      return new Response(null, { status: 303, headers: { location: METADATA_URL } });
    }
    requestedUrls.push(METADATA_URL);
    return new Response(JSON.stringify({ SecretAccessKey: METADATA_SECRET }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

const GUARD_ENV_KEYS = [
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "OUTBOUND_SSRF_GUARD_ENABLED",
];
const originalGuardEnv = Object.fromEntries(GUARD_ENV_KEYS.map((key) => [key, process.env[key]]));

function restoreGuardEnv() {
  for (const key of GUARD_ENV_KEYS) {
    if (originalGuardEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalGuardEnv[key];
  }
}

test.beforeEach(() => {
  restoreGuardEnv();
  for (const key of GUARD_ENV_KEYS) delete process.env[key];
  requestedUrls = [];
  installRedirectingFetch();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreGuardEnv();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function reachedMetadata() {
  return requestedUrls.some((url) => new URL(url).hostname === "169.254.169.254");
}

async function deviceCode(gheUrl: string) {
  const url =
    "http://localhost/api/oauth/ghe-copilot/device-code" + `?gheUrl=${encodeURIComponent(gheUrl)}`;
  return route.GET(new Request(url) as unknown as NextRequest, {
    params: Promise.resolve({ provider: "ghe-copilot", action: "device-code" }),
  });
}

async function poll(gheUrl: string) {
  const request = new Request("http://localhost/api/oauth/ghe-copilot/poll", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ deviceCode: "device-code", extraData: { gheUrl } }),
  });
  return route.POST(request as unknown as NextRequest, {
    params: Promise.resolve({ provider: "ghe-copilot", action: "poll" }),
  });
}

test("ghe-copilot device-code does not contact a metadata gheUrl", async () => {
  const res = await deviceCode("https://169.254.169.254");
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
  assert.notEqual(res.status, 200);
});

test("ghe-copilot device-code does not follow a redirect from the GHE host", async () => {
  const res = await deviceCode("https://ghe.example.test");
  const body = await res.text();
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
  assert.equal(body.includes(METADATA_SECRET), false);
  assert.notEqual(res.status, 200);
});

test("ghe-copilot poll does not follow a redirect from the GHE host", async () => {
  const res = await poll("https://ghe.example.test");
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
  const body = await res.text();
  assert.equal(body.includes(METADATA_SECRET), false);
});

test("ghe-copilot poll does not contact a metadata gheUrl", async () => {
  await poll("https://169.254.169.254");
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
});

test("ghe-copilot device-code still works against a GHE host that answers directly", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    requestedUrls.push(String(input instanceof Request ? input.url : input));
    return new Response(
      JSON.stringify({ device_code: "dc", user_code: "ABCD-EFGH", verification_uri: "x" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const res = await deviceCode("https://ghe.example.test/");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.user_code, "ABCD-EFGH");
  assert.deepEqual(requestedUrls, ["https://ghe.example.test/login/device/code"]);
});

test("ghe-copilot never contacts a metadata gheUrl even with private provider URLs allowed", async () => {
  process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
  await deviceCode("https://169.254.169.254");
  await poll("https://169.254.169.254");
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
});

test("ghe-copilot device-code relays only the device-flow fields", async () => {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        device_code: "dc",
        user_code: "ABCD-EFGH",
        verification_uri: "https://ghe.example.test/login/device",
        expires_in: 900,
        interval: 5,
        SecretAccessKey: METADATA_SECRET,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  const res = await deviceCode("https://ghe.example.test");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.device_code, "dc");
  assert.equal(body.expires_in, 900);
  assert.equal("SecretAccessKey" in body, false);
});

test("ghe-copilot device-code does not echo the host's error body", async () => {
  globalThis.fetch = (async () => new Response(METADATA_SECRET, { status: 502 })) as typeof fetch;

  const res = await deviceCode("https://ghe.example.test");
  const text = await res.text();
  assert.notEqual(res.status, 200);
  assert.equal(text.includes(METADATA_SECRET), false);
});

test("ghe-copilot poll reports a non-json answer without echoing it", async () => {
  globalThis.fetch = (async () =>
    new Response(`<html>${METADATA_SECRET}</html>`, { status: 200 })) as typeof fetch;

  const res = await poll("https://ghe.example.test");
  const text = await res.text();
  assert.equal(text.includes(METADATA_SECRET), false);
  assert.equal(JSON.parse(text).success, false);
});

test("ghe-copilot poll maps an unknown error code to a fixed one", async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: METADATA_SECRET, message: METADATA_SECRET }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const res = await poll("https://ghe.example.test");
  const text = await res.text();
  assert.equal(text.includes(METADATA_SECRET), false);
  assert.equal(JSON.parse(text).error, "invalid_response");
});

test("ghe-copilot keeps authorization_pending as a pending answer", async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "authorization_pending" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const res = await poll("https://ghe.example.test");
  const body = await res.json();
  assert.equal(body.pending, true);
  assert.equal(body.error, "authorization_pending");
});

test("ghe-copilot post-login lookups do not follow a redirect from the GHE host", async () => {
  const tokenUrl = "https://ghe.example.test/login/oauth/access_token";
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    requestedUrls.push(url);
    if (url === tokenUrl) {
      return new Response(JSON.stringify({ access_token: "gho_test", expires_in: 3600 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (init?.redirect === "manual") {
      return new Response(null, { status: 303, headers: { location: METADATA_URL } });
    }
    requestedUrls.push(METADATA_URL);
    return new Response(JSON.stringify({ login: METADATA_SECRET }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const res = await poll("https://ghe.example.test");
  const text = await res.text();
  assert.equal(reachedMetadata(), false, `unexpected requests: ${requestedUrls.join(", ")}`);
  assert.equal(text.includes(METADATA_SECRET), false);
  assert.equal(res.status, 200);
  assert.equal(JSON.parse(text).success, true);
});
