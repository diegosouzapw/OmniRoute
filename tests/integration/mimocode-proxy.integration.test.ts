import { describe, it, before } from "node:test";
import assert from "node:assert";
import { MimocodeExecutor, generateFingerprint } from "../../open-sse/executors/mimocode.ts";

const PROXY_URL = process.env.MIMOCODE_SOCKS5_PROXY;

function parseProxyUrl(url: string): { type: string; host: string; port: number } | null {
  try {
    const parsed = new URL(url);
    return { type: parsed.protocol.replace(":", ""), host: parsed.hostname, port: parsed.port ? Number(parsed.port) : 1080 };
  } catch {
    return null;
  }
}

function requireProxy() {
  if (!PROXY_URL) {
    return false;
  }
  const parsed = parseProxyUrl(PROXY_URL);
  return parsed !== null;
}

const proxyConfig = PROXY_URL ? parseProxyUrl(PROXY_URL) : null;

describe("mimocode per-account proxy — SOCKS5 integration", { timeout: 30_000 }, () => {
  before(() => {
    if (!PROXY_URL) {
      console.log("# MIMOCODE_SOCKS5_PROXY not set, skipping live proxy tests");
    }
  });

  it("bootstrap returns JWT through configured proxy", { skip: !requireProxy() ? "MIMOCODE_SOCKS5_PROXY not set" : false }, async () => {
    process.env.ENABLE_SOCKS5_PROXY = "true";
    const { Socks5ProxyAgent } = await import("undici");
    const agent = new Socks5ProxyAgent(PROXY_URL!);

    const fp = generateFingerprint("integration-bootstrap-" + Date.now());
    const resp = await fetch("https://api.xiaomimimo.com/api/free-ai/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client: fp }),
      // @ts-expect-error — undici dispatcher
      dispatcher: agent,
      signal: AbortSignal.timeout(15_000),
    });
    assert.strictEqual(resp.status, 200, `Bootstrap through proxy: expected 200, got ${resp.status}`);
    const data = await resp.json();
    assert.ok(data.jwt, "Response should contain JWT");
    assert.ok(typeof data.jwt === "string" && data.jwt.length > 10, "JWT should be a non-trivial string");
  });

  it("chat request succeeds through configured proxy", { skip: !requireProxy() ? "MIMOCODE_SOCKS5_PROXY not set" : false }, async () => {
    process.env.ENABLE_SOCKS5_PROXY = "true";
    const { Socks5ProxyAgent } = await import("undici");
    const agent = new Socks5ProxyAgent(PROXY_URL!);

    const fp = generateFingerprint("integration-chat-" + Date.now());
    const bootstrapResp = await fetch("https://api.xiaomimimo.com/api/free-ai/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client: fp }),
      // @ts-expect-error — undici dispatcher
      dispatcher: agent,
      signal: AbortSignal.timeout(15_000),
    });
    assert.strictEqual(bootstrapResp.status, 200);
    const { jwt } = await bootstrapResp.json();

    const chatResp = await fetch("https://api.xiaomimimo.com/api/free-ai/openai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
        "X-Mimo-Source": "mimocode-cli-free",
      },
      body: JSON.stringify({
        model: "mimo-auto",
        messages: [
          { role: "system", content: "You are MiMoCode, an interactive CLI tool that helps users with software engineering tasks." },
          { role: "user", content: "Say exactly: proxy-integration-ok" },
        ],
        stream: false,
      }),
      // @ts-expect-error — undici dispatcher
      dispatcher: agent,
      signal: AbortSignal.timeout(20_000),
    });
    assert.ok(chatResp.status === 200 || chatResp.status === 429,
      `Chat through proxy: expected 200/429, got ${chatResp.status}`);
  });

  it("accounts carry proxy config after sync", () => {
    const exec = new MimocodeExecutor();
    const fp = "integration-fp-1";
    const cfg = proxyConfig || { type: "socks5", host: "127.0.0.1", port: 1080 };
    (exec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0, proxy: null },
    ];
    (exec as any).nextAccountIdx = 0;

    (exec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [{ fingerprint: fp, proxy: cfg }],
      },
    });

    const acct = (exec as any).accounts.find((a: any) => a.fingerprint === fp);
    assert.ok(acct, "Account should exist");
    assert.deepStrictEqual(acct.proxy, cfg);
  });

  it("two accounts with different proxies tracked independently", () => {
    const exec = new MimocodeExecutor();
    const fp1 = "integration-fp-a";
    const fp2 = "integration-fp-b";
    const proxy1 = { type: "http" as const, host: "proxy-a.example.com", port: 8080 };
    const proxy2 = { type: "socks5" as const, host: "proxy-b.example.com", port: 1080 };

    (exec as any).accounts = [
      { fingerprint: fp1, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0, proxy: null },
      { fingerprint: fp2, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0, proxy: null },
    ];
    (exec as any).nextAccountIdx = 0;

    (exec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp1, proxy: proxy1 },
          { fingerprint: fp2, proxy: proxy2 },
        ],
      },
    });

    const a1 = (exec as any).accounts.find((a: any) => a.fingerprint === fp1);
    const a2 = (exec as any).accounts.find((a: any) => a.fingerprint === fp2);
    assert.deepStrictEqual(a1.proxy, proxy1, "Account 1 should have proxy1");
    assert.deepStrictEqual(a2.proxy, proxy2, "Account 2 should have proxy2");
    assert.notDeepStrictEqual(a1.proxy, a2.proxy, "Proxies should differ");
  });

  it("no accountProxies keeps all proxies null (backward compat)", () => {
    const exec = new MimocodeExecutor();
    const accounts = (exec as any).accounts;
    assert.ok(accounts.length >= 1);
    for (const acct of accounts) {
      assert.strictEqual(acct.proxy, null, "Default account proxy should be null");
    }
  });
});
