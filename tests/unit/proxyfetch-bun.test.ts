import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

test("Bun uses native fetch for direct requests", async (t) => {
  if (!process.versions.bun) {
    t.skip("Bun-specific regression test");
    return;
  }

  const previousProxy = {
    http: process.env.HTTP_PROXY,
    https: process.env.HTTPS_PROXY,
    all: process.env.ALL_PROXY,
    no: process.env.NO_PROXY,
  };
  process.env.HTTP_PROXY = "";
  process.env.HTTPS_PROXY = "";
  process.env.ALL_PROXY = "";
  process.env.NO_PROXY = "*";

  try {
    let undiciCalls = 0;
    let nativeCalls = 0;

    const response = await proxyFetch(
      "https://example.invalid/bun-native-fetch",
      { method: "GET" },
      {
        undiciFetch: async () => {
          undiciCalls++;
          throw new Error("Bun must not use the custom undici path");
        },
        nativeFetch: async () => {
          nativeCalls++;
          return new Response("bun-native", { status: 200 });
        },
      }
    );

    assert.equal(await response.text(), "bun-native");
    assert.equal(nativeCalls, 1);
    assert.equal(undiciCalls, 0);
  } finally {
    if (previousProxy.http === undefined) delete process.env.HTTP_PROXY;
    else process.env.HTTP_PROXY = previousProxy.http;
    if (previousProxy.https === undefined) delete process.env.HTTPS_PROXY;
    else process.env.HTTPS_PROXY = previousProxy.https;
    if (previousProxy.all === undefined) delete process.env.ALL_PROXY;
    else process.env.ALL_PROXY = previousProxy.all;
    if (previousProxy.no === undefined) delete process.env.NO_PROXY;
    else process.env.NO_PROXY = previousProxy.no;
  }
});
