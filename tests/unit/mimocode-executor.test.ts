import { describe, it } from "node:test";
import assert from "node:assert";
import {
  MimocodeExecutor,
  generateFingerprint,
  MIMO_SYSTEM_MARKER,
  type AccountProxyConfig,
} from "../../open-sse/executors/mimocode.ts";

const executor = new MimocodeExecutor();

describe("MimocodeExecutor", () => {
  it("generateFingerprint returns a 64-char hex string", () => {
    const fp = generateFingerprint();
    assert.match(fp, /^[0-9a-f]{64}$/);
  });

  it("generateFingerprint is deterministic", () => {
    assert.strictEqual(generateFingerprint(), generateFingerprint());
  });

  it("generateFingerprint with seed is deterministic", () => {
    assert.strictEqual(generateFingerprint("seed-a"), generateFingerprint("seed-a"));
  });

  it("generateFingerprint with different seeds differs", () => {
    assert.notStrictEqual(generateFingerprint("seed-a"), generateFingerprint("seed-b"));
  });

  it("buildUrl returns the free-ai chat endpoint", () => {
    const url = executor.buildUrl("mimo-auto", false);
    assert.ok(url.includes("/api/free-ai/openai/chat"));
    assert.ok(url.startsWith("https://"));
  });

  it("buildHeaders includes X-Mimo-Source and Content-Type", () => {
    const headers = (executor as any).buildHeaders({}, true);
    assert.strictEqual(headers["Content-Type"], "application/json");
    assert.strictEqual(headers["X-Mimo-Source"], "mimocode-cli-free");
  });

  it("buildHeaders includes Accept for streaming", () => {
    const headers = (executor as any).buildHeaders({}, true);
    assert.ok(headers["Accept"]?.includes("text/event-stream"));
  });

  it("buildHeaders omits Accept for non-streaming", () => {
    const headers = (executor as any).buildHeaders({}, false);
    assert.ok(!headers["Accept"]?.includes("text/event-stream"));
  });

  it("transformRequest strips model prefix", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "hi" }] },
      false
    );
    assert.strictEqual(result.model, "mimo-auto");
  });

  it("transformRequest passes model through when no prefix", () => {
    const result = (executor as any).transformRequest(
      "mimo-auto",
      { model: "mimo-auto", messages: [{ role: "user", content: "hi" }] },
      false
    );
    assert.strictEqual(result.model, "mimo-auto");
  });

  // The Xiaomi free endpoint rejects requests with `403 "Illegal access"` unless the
  // body contains a recognized MiMoCode prompt signature inside a `system`-role message.
  // The executor must inject that marker so user requests pass the upstream anti-abuse gate.
  it("transformRequest injects a MiMoCode system marker when none is present", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "write a haiku" }] },
      true
    );
    assert.ok(Array.isArray(result.messages));
    const first = result.messages[0];
    assert.strictEqual(first.role, "system");
    assert.ok(
      typeof first.content === "string" && first.content.includes(MIMO_SYSTEM_MARKER),
      "first message must be a system message containing the MiMoCode marker"
    );
  });

  it("transformRequest preserves the original user message after injection", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "write a haiku" }] },
      true
    );
    const userMsg = result.messages.find((m: any) => m.role === "user");
    assert.ok(userMsg);
    assert.strictEqual(userMsg.content, "write a haiku");
  });

  it("transformRequest preserves a caller-provided system prompt alongside the marker", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      {
        model: "mcode/mimo-auto",
        messages: [
          { role: "system", content: "You are a pirate." },
          { role: "user", content: "hi" },
        ],
      },
      true
    );
    const systemContents = result.messages
      .filter((m: any) => m.role === "system")
      .map((m: any) => m.content)
      .join("\n");
    assert.ok(systemContents.includes(MIMO_SYSTEM_MARKER), "marker present");
    assert.ok(systemContents.includes("You are a pirate."), "caller system prompt preserved");
  });

  it("transformRequest does not duplicate the marker when already present", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      {
        model: "mcode/mimo-auto",
        messages: [
          { role: "system", content: `${MIMO_SYSTEM_MARKER}\nExtra context.` },
          { role: "user", content: "hi" },
        ],
      },
      true
    );
    const count = result.messages.filter(
      (m: any) =>
        m.role === "system" &&
        typeof m.content === "string" &&
        m.content.includes(MIMO_SYSTEM_MARKER)
    ).length;
    assert.strictEqual(count, 1, "marker should not be duplicated");
  });

  it("transformRequest leaves a body without a messages array untouched", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", prompt: "legacy" },
      true
    );
    assert.strictEqual((result as any).messages, undefined);
    assert.strictEqual((result as any).model, "mimo-auto");
  });

  it("returns 499 on pre-aborted signal", async () => {
    const controller = new AbortController();
    controller.abort(new Error("cancelled"));

    const result = await executor.execute({
      model: "mimo-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: controller.signal,
      credentials: {},
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    });

    assert.strictEqual((result as any).response.status, 499);
  });

  it("is registered in executor index", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("mimocode");
    assert.ok(exec instanceof MimocodeExecutor);
  });

  it("mcode alias works", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("mcode");
    assert.ok(exec instanceof MimocodeExecutor);
  });
});

describe("mimocode multi-account", () => {
  it("executor has at least one account", () => {
    const accounts = (executor as any).accounts;
    assert.ok(Array.isArray(accounts));
    assert.ok(accounts.length >= 1);
  });

  it("each account has required fields", () => {
    const accounts = (executor as any).accounts;
    for (const acct of accounts) {
      assert.ok(typeof acct.fingerprint === "string");
      assert.ok(typeof acct.jwt === "string");
      assert.ok(typeof acct.expiresAt === "number");
      assert.ok(typeof acct.cooldownUntil === "number");
      assert.ok(typeof acct.consecutiveFails === "number");
    }
  });

  it("pickAccount returns an account", () => {
    const acct = (executor as any).pickAccount();
    assert.ok(acct);
    assert.ok(typeof acct.fingerprint === "string");
  });

  it("markCooldown increases consecutiveFails and sets cooldownUntil", () => {
    const acct = (executor as any).accounts[0];
    const before = acct.consecutiveFails;
    (executor as any).markCooldown(acct);
    assert.strictEqual(acct.consecutiveFails, before + 1);
    assert.ok(acct.cooldownUntil > Date.now());
  });

  it("markSuccess resets consecutiveFails", () => {
    const acct = (executor as any).accounts[0];
    acct.consecutiveFails = 5;
    (executor as any).markSuccess(acct);
    assert.strictEqual(acct.consecutiveFails, 0);
  });
});

describe("mimocode provider registration", () => {
  it("provider is registered in NOAUTH_PROVIDERS", async () => {
    const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const provider = (NOAUTH_PROVIDERS as Record<string, any>)["mimocode"];
    assert.ok(provider);
    assert.strictEqual(provider.id, "mimocode");
    assert.strictEqual(provider.alias, "mcode");
    assert.strictEqual(provider.noAuth, true);
    assert.strictEqual(provider.hasFree, true);
  });

  it("provider has correct service kinds", async () => {
    const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const provider = (NOAUTH_PROVIDERS as Record<string, any>)["mimocode"];
    assert.ok(provider.serviceKinds?.includes("llm"));
  });
});

describe("mimocode providerRegistry entry", () => {
  it("registry entry exists with correct executor", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("mimocode");
    assert.ok(entry);
    assert.strictEqual(entry.executor, "mimocode");
    assert.strictEqual(entry.format, "openai");
    assert.strictEqual(entry.authType, "none");
  });

  it("registry entry has mimo-auto model", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("mimocode");
    const models = entry.models as Array<{ id: string }>;
    const mimoAuto = models.find((m) => m.id === "mimo-auto");
    assert.ok(mimoAuto);
  });
});

describe("mimocode per-account proxy", () => {
  const exec = new MimocodeExecutor();

  it("AccountProxyConfig type has required fields", () => {
    const config: AccountProxyConfig = {
      fingerprint: "abc123",
      proxy: { type: "http", host: "proxy.example.com", port: 8080 },
    };
    assert.strictEqual(config.fingerprint, "abc123");
    assert.strictEqual(config.proxy?.host, "proxy.example.com");
  });

  it("default proxyUrlMap is empty", () => {
    const testExec = new MimocodeExecutor();
    const map = (testExec as any).proxyUrlMap;
    assert.ok(map instanceof Map);
    assert.strictEqual(map.size, 0);
  });

  it("syncAccountsFromCredentials populates proxyUrlMap with correct URLs", () => {
    const testExec = new MimocodeExecutor();
    const fp1 = "fingerprint-1";
    const fp2 = "fingerprint-2";
    (testExec as any).accounts = [
      { fingerprint: fp1, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
      { fingerprint: fp2, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];

    const credentials = {
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp1, proxy: { type: "http", host: "p1.example.com", port: 1080 } },
          { fingerprint: fp2, proxy: null },
        ],
      },
    };
    (testExec as any).syncAccountsFromCredentials(credentials);

    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    assert.strictEqual(map.get(fp1), "http://p1.example.com:1080");
    assert.strictEqual(map.has(fp2), false);
  });

  it("syncAccountsFromCredentials skips when accountProxies absent", () => {
    const testExec = new MimocodeExecutor();
    const mapBefore = (testExec as any).proxyUrlMap.size;
    (testExec as any).syncAccountsFromCredentials({ providerSpecificData: {} });
    assert.strictEqual((testExec as any).proxyUrlMap.size, mapBefore);
  });

  it("syncAccountsFromCredentials adds proxyUrlMap entries for all valid proxy configs", () => {
    const testExec = new MimocodeExecutor();
    const existingFp = (testExec as any).accounts[0].fingerprint;
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          {
            fingerprint: "nonexistent-fingerprint",
            proxy: { type: "socks5", host: "s5.example.com", port: 1080 },
          },
        ],
      },
    });
    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    assert.strictEqual(
      map.has("nonexistent-fingerprint"),
      true,
      "proxyUrlMap stores all valid proxy configs"
    );
    assert.strictEqual(map.get("nonexistent-fingerprint"), "socks5://s5.example.com:1080");
    assert.strictEqual(
      map.has(existingFp),
      false,
      "existing fingerprint without proxy is not in map"
    );
  });

  it("accounts with different proxies produce distinct URLs", () => {
    const testExec = new MimocodeExecutor();
    const fp1 = "fp-a";
    const fp2 = "fp-b";
    (testExec as any).accounts = [
      { fingerprint: fp1, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
      { fingerprint: fp2, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp1, proxy: { type: "http", host: "a.com", port: 8080 } },
          { fingerprint: fp2, proxy: { type: "socks5", host: "b.com", port: 1080 } },
        ],
      },
    });

    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    assert.strictEqual(map.get(fp1), "http://a.com:8080");
    assert.strictEqual(map.get(fp2), "socks5://b.com:1080");
  });

  it("getProxyDispatcher returns a dispatcher for known fingerprint", () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-dispatcher-test";
    (testExec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp, proxy: { type: "socks5", host: "s5.test", port: 1080 } },
        ],
      },
    });

    const dispatcher = (testExec as any).getProxyDispatcher(fp);
    assert.ok(dispatcher, "dispatcher should exist for registered fingerprint");
  });

  it("getProxyDispatcher returns undefined for unknown fingerprint", () => {
    const testExec = new MimocodeExecutor();
    const dispatcher = (testExec as any).getProxyDispatcher("unknown-fp");
    assert.strictEqual(dispatcher, undefined);
  });

  it("fetchWithProxy falls back to plain fetch when no proxy configured", async () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-no-proxy";
    const originalFetch = globalThis.fetch;
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response("ok");
    };
    try {
      const resp = await (testExec as any).fetchWithProxy("https://example.com", {}, fp);
      assert.ok(fetchCalled, "plain fetch should have been called");
      assert.strictEqual(resp.status, 200);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("authenticated proxy includes credentials in URL", () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-auth";
    (testExec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          {
            fingerprint: fp,
            proxy: {
              type: "socks5",
              host: "s5.auth.com",
              port: 1080,
              username: "user",
              password: "pass",
            },
          },
        ],
      },
    });

    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    const url = map.get(fp);
    assert.ok(url);
    assert.ok(url.includes("user:pass@"), "URL should include encoded credentials");
  });

  it("default port is 1080 for socks5 when not specified", () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-default-port";
    (testExec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp, proxy: { type: "socks5", host: "s5.test", port: undefined } },
        ],
      },
    });

    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    assert.strictEqual(map.get(fp), "socks5://s5.test:1080");
  });

  it("default port is 8080 for http when not specified", () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-http-default";
    (testExec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];
    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp, proxy: { type: "http", host: "h.test", port: undefined } },
        ],
      },
    });

    const map: Map<string, string> = (testExec as any).proxyUrlMap;
    assert.strictEqual(map.get(fp), "http://h.test:8080");
  });

  it("proxy URL map updates correctly on re-sync", () => {
    const testExec = new MimocodeExecutor();
    const fp = "fp-re-sync";
    (testExec as any).accounts = [
      { fingerprint: fp, jwt: "", expiresAt: 0, cooldownUntil: 0, consecutiveFails: 0 },
    ];

    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp, proxy: { type: "http", host: "first.proxy", port: 8080 } },
        ],
      },
    });
    assert.strictEqual((testExec as any).proxyUrlMap.get(fp), "http://first.proxy:8080");

    (testExec as any).syncAccountsFromCredentials({
      providerSpecificData: {
        accountProxies: [
          { fingerprint: fp, proxy: { type: "socks5", host: "second.proxy", port: 1080 } },
        ],
      },
    });
    assert.strictEqual((testExec as any).proxyUrlMap.get(fp), "socks5://second.proxy:1080");
  });
});
