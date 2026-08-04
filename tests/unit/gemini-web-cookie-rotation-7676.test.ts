// Repro probe for issue #7676:
// gemini-web executor never reads back the live Playwright cookie jar after a
// successful run, so rotated __Secure-1PSIDTS / __Secure-1PSIDCC values are
// never persisted via onCredentialsRefreshed — unlike chatgpt-web.ts, which
// already forwards its rotated cookie through the same callback
// (open-sse/executors/chatgpt-web.ts:2843).
import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");

test("#7676: GeminiWebExecutor persists rotated __Secure-1PSIDTS/__Secure-1PSIDCC via onCredentialsRefreshed after a successful run", async () => {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;

  const staleCookie =
    "__Secure-1PSID=abc123; __Secure-1PSIDTS=OLD_TS_VALUE; __Secure-1PSIDCC=OLD_CC_VALUE";

  const rotatedJarCookies = [
    { name: "__Secure-1PSID", value: "abc123", domain: ".google.com", path: "/" },
    { name: "__Secure-1PSIDTS", value: "ROTATED_TS_VALUE", domain: ".google.com", path: "/" },
    { name: "__Secure-1PSIDCC", value: "ROTATED_CC_VALUE", domain: ".google.com", path: "/" },
  ];

  playwright.chromium.launch = async () =>
    ({
      newContext: async () => ({
        addCookies: async () => {},
        cookies: async () => rotatedJarCookies,
        newPage: async () => ({
          on: (event: string, handler: (resp: { url: () => string; text: () => Promise<string> }) => void) => {
            if (event === "response") {
              const body =
                ")]}'\n" +
                "30\n" +
                JSON.stringify([
                  [
                    "wrb.fr",
                    null,
                    JSON.stringify([null, null, null, null, [[null, ["hello back"]]]]),
                  ],
                ]) +
                "\n";
              handler({
                url: () =>
                  "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
                text: async () => body,
              });
            }
          },
          goto: async () => {},
          waitForTimeout: async () => {},
          waitForSelector: async () => ({ click: async () => {} }),
          keyboard: { type: async () => {}, press: async () => {} },
        }),
      }),
      close: async () => {},
    }) as unknown as typeof originalLaunch;

  let persistedCredentials: Record<string, unknown> | null = null;

  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: staleCookie },
      signal: AbortSignal.timeout(5000),
      log: null,
      onCredentialsRefreshed: async (newCreds: Record<string, unknown>) => {
        persistedCredentials = newCreds;
      },
    } as unknown as Parameters<InstanceType<typeof GeminiWebExecutor>["execute"]>[0]);

    assert.equal(result.response.status, 200, "run should succeed with a Gemini response");
    assert.ok(
      persistedCredentials,
      "onCredentialsRefreshed must be called so the rotated cookie jar is persisted to provider_connections (#7676)"
    );
    assert.ok(
      typeof persistedCredentials.apiKey === "string" &&
        persistedCredentials.apiKey.includes("ROTATED_TS_VALUE"),
      `persisted apiKey must contain the rotated __Secure-1PSIDTS value, got: ${persistedCredentials?.apiKey}`
    );
    assert.ok(
      persistedCredentials.apiKey.includes("ROTATED_CC_VALUE"),
      `persisted apiKey must contain the rotated __Secure-1PSIDCC value, got: ${persistedCredentials?.apiKey}`
    );
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
});
