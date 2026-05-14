// Tests for the undici dispatcher retry logic in proxyFetch.
//
// Approach B (dependency injection): proxyFetch.ts exports a named `proxyFetch` function
// that accepts optional `deps: ProxyFetchDeps` for injecting mock undici/native fetch
// implementations. This makes retry count assertions precise and deterministic without
// requiring mock.module() (which is unavailable in this Node 25 / tsx/ESM setup).
//
// All three tests MUST fail when the retry loop is removed from proxyFetch.ts (sanity check).

import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

function makeUndiciError(msg = "fetch failed", code = "UND_ERR_SOCKET"): Error {
  const err = new Error(msg) as Error & { code?: string };
  err.code = code;
  return err;
}

test("undici is called exactly twice then native fallback fires once (both undici attempts fail)", async () => {
  let undiciCalls = 0;
  let nativeCalls = 0;

  const mockUndici = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    undiciCalls++;
    throw makeUndiciError("fetch failed");
  };

  const mockNative = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    nativeCalls++;
    return new Response("native-fallback-body", { status: 200 });
  };

  const res = await proxyFetch(
    "https://example.invalid/test",
    { method: "GET" },
    { undiciFetch: mockUndici, nativeFetch: mockNative }
  );

  assert.equal(undiciCalls, 2, "undici must be called exactly twice (initial + retry)");
  assert.equal(
    nativeCalls,
    1,
    "native fallback must fire exactly once after both undici attempts fail"
  );
  assert.equal(await res.text(), "native-fallback-body");
});

test("retry-succeeds: undici fails once then succeeds, native fallback is NOT invoked", async () => {
  let undiciCalls = 0;
  let nativeCalls = 0;

  const mockUndici = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    undiciCalls++;
    if (undiciCalls === 1) {
      throw makeUndiciError("fetch failed");
    }
    return new Response("undici-retry-success", { status: 200 });
  };

  const mockNative = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    nativeCalls++;
    return new Response("should-not-be-called", { status: 200 });
  };

  const res = await proxyFetch(
    "https://example.invalid/test",
    { method: "GET" },
    { undiciFetch: mockUndici, nativeFetch: mockNative }
  );

  assert.equal(
    undiciCalls,
    2,
    "undici must be called exactly twice (initial fail + retry success)"
  );
  assert.equal(nativeCalls, 0, "native fallback must NOT be invoked when retry succeeds");
  assert.equal(await res.text(), "undici-retry-success");
});

test("does not retry when body is a ReadableStream (non-replayable body)", async () => {
  let undiciCalls = 0;
  let nativeCalls = 0;

  const mockUndici = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    undiciCalls++;
    throw makeUndiciError("fetch failed");
  };

  const mockNative = async (_input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
    nativeCalls++;
    return new Response("native-stream-fallback", { status: 200 });
  };

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]));
      controller.close();
    },
  });

  const res = await proxyFetch(
    "https://example.invalid/test",
    { method: "POST", body: stream },
    { undiciFetch: mockUndici, nativeFetch: mockNative }
  );

  assert.equal(
    undiciCalls,
    1,
    "undici must NOT retry when body is a ReadableStream (called exactly once)"
  );
  assert.equal(nativeCalls, 1, "native fallback fires after single undici attempt");
  assert.equal(await res.text(), "native-stream-fallback");
});
