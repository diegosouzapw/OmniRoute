// #15076: gemini-web launches Chromium without applying the configured provider proxy.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15076-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#15076 gemini-web passes the provider proxy to Chromium (launch or context)", async () => {
  const created = await proxiesDb.createProxy({
    name: "gemini proxy",
    type: "http",
    host: "proxy.example.test",
    port: 7890,
  });
  await proxiesDb.assignProxyToScope("provider", "gemini-web", created.id);
  // sanity: the registry DOES resolve a proxy for this provider (what browserPool uses)
  const resolved = (await proxiesDb.resolveProxyForProvider("gemini-web")) as {
    host?: string;
  } | null;
  assert.equal(resolved?.host, "proxy.example.test");

  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  const launchOptions: unknown[] = [];
  const contextOptions: unknown[] = [];
  playwright.chromium.launch = (async (opts: unknown) => {
    launchOptions.push(opts);
    return {
      newContext: async (o: unknown) => {
        contextOptions.push(o);
        return {
          addCookies: async () => undefined,
          close: async () => undefined,
          newPage: async () => ({
            on: () => undefined,
            goto: async () => undefined,
            waitForTimeout: async () => undefined,
            waitForSelector: async (s: string) =>
              s.includes(".ql-editor") ? { click: async () => undefined } : null,
            keyboard: { insertText: async () => undefined, press: async () => undefined },
          }),
          cookies: async () => [],
        };
      },
      close: async () => undefined,
    };
  }) as never;

  try {
    const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
    const { resetGeminiBrowserLeaseForTests } =
      await import("../../open-sse/executors/gemini-web/browserLease.ts");
    await resetGeminiBrowserLeaseForTests();
    await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    } as never);
    await resetGeminiBrowserLeaseForTests();
  } finally {
    playwright.chromium.launch = originalLaunch;
  }

  const all = JSON.stringify({ launchOptions, contextOptions });
  assert.ok(
    all.includes("proxy.example.test"),
    `configured proxy never reached Playwright: ${all}`
  );
});
