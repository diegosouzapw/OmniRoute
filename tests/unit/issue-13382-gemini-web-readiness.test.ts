// #13382: gemini-web must not sit on a fixed 3s sleep before it looks for
// the composer. Readiness is the composer selector, bounded at 10s.
import test from "node:test";
import assert from "node:assert/strict";

test("#13382 composer readiness replaces the fixed 3s wait", async () => {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  const waits: number[] = [];
  const selectors: string[] = [];
  playwright.chromium.launch = async () =>
    ({
      newContext: async () => ({
        addCookies: async () => undefined,
        newPage: async () => ({
          on: () => undefined,
          goto: async () => undefined,
          waitForTimeout: async (ms: number) => {
            waits.push(ms);
          },
          waitForSelector: async (selector: string) => {
            selectors.push(selector);
            if (selector.includes(".ql-editor")) return { click: async () => undefined };
            return null;
          },
          keyboard: {
            insertText: async () => undefined,
            press: async () => undefined,
          },
        }),
        cookies: async () => [],
      }),
      close: async () => undefined,
    }) as never;

  try {
    const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
    const executor = new GeminiWebExecutor();
    await executor.execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    } as never);
  } finally {
    playwright.chromium.launch = originalLaunch;
  }

  assert.equal(waits.includes(3000), false);
  assert.ok(selectors.some((selector) => selector.includes(".ql-editor")));
});
