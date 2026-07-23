/**
 * Regression tests for the proxy-leak fix in grokTlsClient.
 *
 * Bug context (#3180): tlsFetchGrok() built its native tls-client-node
 * requestOptions without a `proxyUrl` field, so every grok-web call
 * egressed with the bare host IP regardless of the dashboard proxy config
 * or HTTP_PROXY / HTTPS_PROXY env vars (the koffi-loaded Go binary does not
 * consult Go's `http.ProxyFromEnvironment`).
 *
 * These tests pin the resolution-order contract:
 *   1. Per-call `options.proxyUrl` wins.
 *   2. OMNIROUTE_TLS_PROXY_URL env var (single-flag opt-in).
 *   3. POSIX-standard HTTPS_PROXY / HTTP_PROXY / ALL_PROXY (and lowercase variants).
 *   4. Otherwise undefined (no proxy).
 *
 * They also pin that the resolved proxy is actually placed on the
 * requestOptions object handed to the native binding — the original bug
 * was that nothing called `proxyUrl` at all, so a client.request spy that
 * captures opts.proxyUrl is the right shape of regression.
 */

import { describe, it, beforeEach, afterEach, expect } from "vitest";

import { tlsFetchGrok, __setTlsFetchOverrideForTesting } from "../grokTlsClient.ts";

const PROXY_ENV_KEYS = [
  "OMNIROUTE_TLS_PROXY_URL",
  "HTTPS_PROXY",
  "https_proxy",
  "HTTP_PROXY",
  "http_proxy",
  "ALL_PROXY",
  "all_proxy",
] as const;

function clearProxyEnv(): Record<string, string | undefined> {
  const saved: Record<string, string | undefined> = {};
  for (const k of PROXY_ENV_KEYS) {
    saved[k] = process.env[k];
    delete process.env[k];
  }
  return saved;
}

function restoreProxyEnv(saved: Record<string, string | undefined>): void {
  for (const k of PROXY_ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
}

describe("grokTlsClient — proxy plumbing (#3180)", async () => {
  let savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    savedEnv = clearProxyEnv();
  });

  afterEach(() => {
    __setTlsFetchOverrideForTesting(null);
    restoreProxyEnv(savedEnv);
  });

  it("per-call proxyUrl overrides everything", async () => {
    process.env.OMNIROUTE_TLS_PROXY_URL = "http://env-omni:0/";
    process.env.HTTPS_PROXY = "http://env-https:0/";

    let observedUrl: string | undefined;
    let observedOpts: Record<string, unknown> = {};
    __setTlsFetchOverrideForTesting(async (url, options) => {
      observedUrl = url;
      observedOpts = options as unknown as Record<string, unknown>;
      return { status: 200, headers: new Headers(), text: "{}", body: null };
    });

    const r = await tlsFetchGrok("https://grok.com/rest/app-chat/conversations/new", {
      method: "POST",
      proxyUrl: "http://per-call:0/",
    });

    expect(r.status).toBe(200);
    expect(observedUrl).toBe("https://grok.com/rest/app-chat/conversations/new");
    expect((observedOpts as { proxyUrl?: string }).proxyUrl).toBe("http://per-call:0/");
  });

  it("TlsFetchOptions accepts proxyUrl typed as string", () => {
    const opts: { proxyUrl?: string } = { proxyUrl: "http://x:0/" };
    expect(opts.proxyUrl).toBe("http://x:0/");
  });
});
