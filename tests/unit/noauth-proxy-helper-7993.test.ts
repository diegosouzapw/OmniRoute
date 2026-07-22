/**
 * #7993 — Tests for pickNoAuthAccountProxy helper
 *
 * Verifies that the helper correctly extracts proxies from the
 * providerSpecificData.accountProxies array for no-auth providers
 * whose executors don't implement syncAccountsFromCredentials
 * (duckduckgo-web, theoldllm, chipotle, veoaifree-web).
 */

import test from "node:test";
import assert from "node:assert/strict";

import { pickNoAuthAccountProxy } from "../../open-sse/utils/noAuthProxyHelper.ts";

test("#7993: pickNoAuthAccountProxy returns first proxy from accountProxies", () => {
  const creds = {
    providerSpecificData: {
      accountProxies: [
        {
          fingerprint: "fp-aaa",
          proxy: { type: "http", host: "10.0.0.1", port: 8080 },
        },
        {
          fingerprint: "fp-bbb",
          proxy: { type: "socks5", host: "10.0.0.2", port: 1080 },
        },
      ],
    },
  };

  const proxy = pickNoAuthAccountProxy(creds);
  assert.equal(proxy?.host, "10.0.0.1");
  assert.equal(proxy?.type, "http");
  assert.equal(proxy?.port, 8080);
});

test("#7993: pickNoAuthAccountProxy returns null when accountProxies is empty", () => {
  const creds = {
    providerSpecificData: {
      accountProxies: [],
    },
  };
  assert.equal(pickNoAuthAccountProxy(creds), null);
});

test("#7993: pickNoAuthAccountProxy returns null when no PSD", () => {
  assert.equal(pickNoAuthAccountProxy(null), null);
  assert.equal(pickNoAuthAccountProxy(undefined), null);
  assert.equal(pickNoAuthAccountProxy({}), null);
});

test("#7993: pickNoAuthAccountProxy returns null when accountProxies missing", () => {
  const creds = {
    providerSpecificData: {
      fingerprints: ["fp-1"],
    },
  };
  assert.equal(pickNoAuthAccountProxy(creds), null);
});

test("#7993: pickNoAuthAccountProxy skips entries with null proxy", () => {
  const creds = {
    providerSpecificData: {
      accountProxies: [
        { fingerprint: "fp-null", proxy: null },
        { fingerprint: "fp-no-host", proxy: { type: "http", host: "", port: 8080 } },
        {
          fingerprint: "fp-ok",
          proxy: { type: "socks5", host: "10.0.0.5", port: 1080 },
        },
      ],
    },
  };

  const proxy = pickNoAuthAccountProxy(creds);
  assert.equal(proxy?.host, "10.0.0.5");
});

test("#7993: pickNoAuthAccountProxy returns null when all proxies are null", () => {
  const creds = {
    providerSpecificData: {
      accountProxies: [
        { fingerprint: "fp-1", proxy: null },
        { fingerprint: "fp-2", proxy: null },
      ],
    },
  };
  assert.equal(pickNoAuthAccountProxy(creds), null);
});

test("#7993: pickNoAuthAccountProxy handles proxy with auth credentials", () => {
  const creds = {
    providerSpecificData: {
      accountProxies: [
        {
          fingerprint: "fp-auth",
          proxy: {
            type: "http",
            host: "proxy.example.com",
            port: 3128,
            username: "user",
            password: "secret",
          },
        },
      ],
    },
  };

  const proxy = pickNoAuthAccountProxy(creds);
  assert.equal(proxy?.host, "proxy.example.com");
  assert.equal(proxy?.username, "user");
  assert.equal(proxy?.password, "secret");
});
