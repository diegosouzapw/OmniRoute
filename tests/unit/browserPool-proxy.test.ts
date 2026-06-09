import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolvePlaywrightProxy } from "../../open-sse/services/browserPool.ts";

describe("resolvePlaywrightProxy", () => {
  it("returns undefined when no proxy is configured", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => null,
    });
    assert.strictEqual(proxy, undefined);
  });

  it("formats http proxy server string", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => ({ type: "http", host: "proxy.example.com", port: 8080 }),
    });
    assert.deepStrictEqual(proxy, { server: "http://proxy.example.com:8080" });
  });

  it("formats socks5 proxy server string", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => ({ type: "socks5", host: "socks.example.com", port: 1080 }),
    });
    assert.deepStrictEqual(proxy, { server: "socks5://socks.example.com:1080" });
  });

  it("defaults to http scheme when type is absent", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({ host: "proxy.example.com", port: 3128 }),
    });
    assert.deepStrictEqual(proxy, { server: "http://proxy.example.com:3128" });
  });

  it("includes credentials when username is set", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({
        type: "http",
        host: "proxy.example.com",
        port: 3128,
        username: "user",
        password: "pass",
      }),
    });
    assert.deepStrictEqual(proxy, {
      server: "http://proxy.example.com:3128",
      username: "user",
      password: "pass",
    });
  });

  it("uses empty string for password when null", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({
        type: "http",
        host: "proxy.example.com",
        port: 3128,
        username: "user",
        password: null,
      }),
    });
    assert.deepStrictEqual(proxy, {
      server: "http://proxy.example.com:3128",
      username: "user",
      password: "",
    });
  });

  it("swallows DB errors and returns undefined", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => {
        throw new Error("no such table: proxy_registry");
      },
    });
    assert.strictEqual(proxy, undefined);
  });

  it("passes the actual provider key to the resolver", async () => {
    let capturedKey = "";
    await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async (id) => {
        capturedKey = id;
        return null;
      },
    });
    assert.strictEqual(capturedKey, "gemini-web");
  });
});
