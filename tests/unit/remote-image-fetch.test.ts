import assert from "node:assert/strict";
import test from "node:test";

import { fetchRemoteImage, fetchUntrustedRemoteImage } from "@/shared/network/remoteImageFetch";

// Stub DNS resolver: every (unused) hostname resolves to a public IP. The
// rebinding guard (GHSA-cmhj-wh2f-9cgx) needs a non-empty resolution; without
// it, fictitious hosts like `cdn.example.com` would correctly be rejected.
const publicLookup = async () => [{ address: "203.0.113.5" as string, family: 4 }];

test("fetchRemoteImage reads public image bytes", async () => {
  const result = await fetchRemoteImage("https://cdn.example.com/image.png", {
    fetchImpl: async () =>
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    guard: "public-only",
    lookup: publicLookup,
  });

  assert.equal(result.buffer.toString("base64"), "AQID");
  assert.equal(result.contentType, "image/png");
});

test("fetchRemoteImage blocks private image hosts before fetch", async () => {
  let called = false;

  await assert.rejects(
    () =>
      fetchRemoteImage("http://127.0.0.1:20128/private.png", {
        fetchImpl: async () => {
          called = true;
          return new Response("unexpected");
        },
        guard: "public-only",
      }),
    /Blocked private or local provider URL/
  );

  assert.equal(called, false);
});

test("fetchRemoteImage blocks redirects to private image hosts", async () => {
  await assert.rejects(
    () =>
      fetchRemoteImage("https://cdn.example.com/redirect.png", {
        fetchImpl: async () =>
          new Response(null, {
            status: 302,
            headers: { location: "http://169.254.169.254/latest/meta-data" },
          }),
        guard: "public-only",
        lookup: publicLookup,
      }),
    /Blocked private or local provider URL/
  );
});

// The default guard mode (no `guard` option passed, matching production callers that rely on
// `getProviderOutboundGuard()`'s local-first default) is "block-metadata". Every other test in
// this file passes `guard: "public-only"` explicitly, which never exercised this branch — the
// gap that let `validateRemoteImageUrl()`'s fall-through to the unchecked `parseOutboundUrl()`
// for cloud-metadata hosts go undetected.
test("fetchRemoteImage blocks cloud-metadata hosts under the default block-metadata guard", async () => {
  let called = false;

  await assert.rejects(
    () =>
      fetchRemoteImage("http://169.254.169.254/latest/meta-data", {
        fetchImpl: async () => {
          called = true;
          return new Response("unexpected");
        },
      }),
    /Blocked cloud-metadata endpoint/
  );

  assert.equal(called, false);
});

test("fetchRemoteImage allows private/LAN image hosts under the default block-metadata guard", async () => {
  const result = await fetchRemoteImage("http://192.168.1.50:8080/local.png", {
    fetchImpl: async () =>
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
  });

  assert.equal(result.buffer.toString("base64"), "AQID");
});

test("fetchRemoteImage blocks redirects to cloud-metadata hosts under the default block-metadata guard", async () => {
  await assert.rejects(
    () =>
      fetchRemoteImage("https://cdn.example.com/redirect.png", {
        fetchImpl: async () =>
          new Response(null, {
            status: 302,
            headers: { location: "http://169.254.169.254/latest/meta-data" },
          }),
        lookup: publicLookup,
      }),
    /Blocked cloud-metadata endpoint/
  );
});

// omni-code-review 2026-09-21_release-v3.8.51_vs_main_e2e-areas LEDGER-50 (round-1 LEDGER-32):
// `fetchUntrustedRemoteImage` is the ONE entry point for caller-supplied / upstream-returned
// URLs. It must hard-code `guard: "public-only"` and `pinDns: true` (GHSA-34rg-3pqj-35g9 /
// #13883) — a caller cannot loosen either, even by passing the opposite value explicitly.

test("fetchUntrustedRemoteImage forces guard public-only even when the caller asks for none", async () => {
  let called = false;
  await assert.rejects(
    () =>
      fetchUntrustedRemoteImage("http://127.0.0.1:20128/private.png", {
        guard: "none",
        fetchImpl: async () => {
          called = true;
          return new Response("unexpected");
        },
      }),
    /Blocked private or local provider URL/
  );
  assert.equal(called, false, "the private URL must be rejected before any fetch");
});

test("fetchUntrustedRemoteImage validates the resolved answers (public-only DNS check) even when the caller asks for none", async () => {
  let lookups = 0;
  let called = false;
  await assert.rejects(
    () =>
      fetchUntrustedRemoteImage("https://rebind.example.com/x.png", {
        guard: "none",
        lookup: async () => {
          lookups += 1;
          return [{ address: "10.0.0.8", family: 4 }];
        },
        fetchImpl: async () => {
          called = true;
          return new Response("unexpected");
        },
      }),
    /DNS rebinding/
  );
  assert.equal(lookups, 1, "public-only must resolve the host (guard none would skip the lookup)");
  assert.equal(called, false);
});

test("fetchUntrustedRemoteImage forces pinDns even when the caller passes pinDns: false", async () => {
  // Same mechanism as tests/unit/pindns-toctou-13883.test.ts: with pinning active the request
  // goes out through the real pinned undici socket towards the (validated, unroutable
  // RFC 5737 TEST-NET-3) answer and fails closed, instead of reaching an un-pinned
  // `globalThis.fetch`. If the helper honoured `pinDns: false`, the mock below would be hit.
  let mockCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    mockCalled = true;
    throw new Error("globalThis.fetch must not be reached when pinDns is active");
  }) as typeof fetch;
  try {
    await assert.rejects(() =>
      fetchUntrustedRemoteImage("https://rebind.example.com/x.png", {
        pinDns: false,
        lookup: async () => [{ address: "203.0.113.7", family: 4 }],
        timeoutMs: 1500,
      })
    );
    assert.equal(mockCalled, false, "pinDns must bypass globalThis.fetch, not call it");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
