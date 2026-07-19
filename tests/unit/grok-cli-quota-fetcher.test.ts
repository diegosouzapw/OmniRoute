import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchGrokCliQuota,
  invalidateGrokCliQuotaCache,
  registerGrokCliQuotaFetcher,
  type GrokCliQuota,
} from "../../open-sse/services/grokCliQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";

interface FetchCall {
  url: string;
  headers: Record<string, string>;
}

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let v = BigInt(value);
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0n);
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeDoubleField(fieldNumber: number, value: number): Buffer {
  const body = Buffer.alloc(8);
  body.writeDoubleLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 1), body]);
}

function buildFramedCreditsBuffer(percentUsed: number): ArrayBuffer {
  const payload = encodeDoubleField(1, percentUsed);
  const header = Buffer.alloc(5);
  header[0] = 0x00;
  header.writeUInt32BE(payload.length, 1);
  const framed = Buffer.concat([header, payload]);
  return framed.buffer.slice(framed.byteOffset, framed.byteOffset + framed.byteLength);
}

test("fetchGrokCliQuota returns null when credentials.accessToken is missing", async () => {
  const quota = await fetchGrokCliQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchGrokCliQuota returns null when connection has no nested credentials object", async () => {
  const quota = await fetchGrokCliQuota(`no-creds-${Date.now()}`, { providerSpecificData: {} });
  assert.equal(quota, null);
});

test("fetchGrokCliQuota sends Authorization + X-Grpc-Web headers to the billing endpoint", async () => {
  const connectionId = `grok-cli-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string> });
    return new Response(buildFramedCreditsBuffer(0.3), {
      status: 200,
      headers: { "content-type": "application/grpc-web+proto" },
    });
  }) as typeof fetch;

  const quota = (await fetchGrokCliQuota(connectionId, {
    credentials: { accessToken: "grok-token" },
  })) as GrokCliQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://grok.com/grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig"
  );
  assert.equal(calls[0].headers["Authorization"], "Bearer grok-token");
  assert.equal(calls[0].headers["X-Grpc-Web"], "1");
  assert.ok(quota);
  assert.ok(Math.abs(quota.percentUsed - 0.3) < 1e-9);
  assert.equal(quota.used, 30);
  assert.equal(quota.limitReached, false);

  invalidateGrokCliQuotaCache(connectionId);
});

test("fetchGrokCliQuota marks limitReached when the pool is fully used", async () => {
  const connectionId = `grok-cli-full-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(buildFramedCreditsBuffer(1), { status: 200 })) as typeof fetch;

  const quota = (await fetchGrokCliQuota(connectionId, {
    credentials: { accessToken: "grok-token" },
  })) as GrokCliQuota | null;

  assert.ok(quota);
  assert.equal(quota.limitReached, true);
  assert.equal(quota.percentUsed, 1);

  invalidateGrokCliQuotaCache(connectionId);
});

test("fetchGrokCliQuota fails open (returns null) on upstream 401/5xx without throwing", async () => {
  const connectionId401 = `grok-cli-401-${Date.now()}`;
  globalThis.fetch = (async () => new Response(null, { status: 401 })) as typeof fetch;
  const quota401 = await fetchGrokCliQuota(connectionId401, {
    credentials: { accessToken: "bad-token" },
  });
  assert.equal(quota401, null);

  const connectionId500 = `grok-cli-500-${Date.now()}`;
  globalThis.fetch = (async () => new Response(null, { status: 500 })) as typeof fetch;
  const quota500 = await fetchGrokCliQuota(connectionId500, {
    credentials: { accessToken: "some-token" },
  });
  assert.equal(quota500, null);
});

test("fetchGrokCliQuota returns null (does not throw) when the response body is unparseable", async () => {
  const connectionId = `grok-cli-malformed-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(new Uint8Array([0xff, 0xff, 0xff]), { status: 200 })) as typeof fetch;

  const quota = await fetchGrokCliQuota(connectionId, {
    credentials: { accessToken: "grok-token" },
  });
  assert.equal(quota, null);
});

test("fetchGrokCliQuota caches results within the TTL window", async () => {
  const connectionId = `grok-cli-cache-${Date.now()}`;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(buildFramedCreditsBuffer(0.2), { status: 200 });
  }) as typeof fetch;

  const connection = { credentials: { accessToken: "grok-token" } };
  await fetchGrokCliQuota(connectionId, connection);
  await fetchGrokCliQuota(connectionId, connection);

  assert.equal(callCount, 1);
  invalidateGrokCliQuotaCache(connectionId);
});

test("invalidateGrokCliQuotaCache forces a re-fetch on the next call", async () => {
  const connectionId = `grok-cli-invalidate-${Date.now()}`;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(buildFramedCreditsBuffer(0.1), { status: 200 });
  }) as typeof fetch;

  const connection = { credentials: { accessToken: "grok-token" } };
  await fetchGrokCliQuota(connectionId, connection);
  invalidateGrokCliQuotaCache(connectionId);
  await fetchGrokCliQuota(connectionId, connection);

  assert.equal(callCount, 2);
  invalidateGrokCliQuotaCache(connectionId);
});

test("registerGrokCliQuotaFetcher wires grok-cli into preflightQuota", async () => {
  registerGrokCliQuotaFetcher();

  const connectionId = `grok-cli-preflight-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(buildFramedCreditsBuffer(1), { status: 200 })) as typeof fetch;

  const result = await preflightQuota("grok-cli", connectionId, {
    credentials: { accessToken: "grok-token" },
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  assert.equal(result.proceed, false);

  invalidateGrokCliQuotaCache(connectionId);
});
