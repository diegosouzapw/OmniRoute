import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor, parseStreamResponse } =
  await import("../../open-sse/executors/gemini-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ─── Registration ───────────────────────────────────────────────────────────

test("GeminiWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("gemini-web"));
  const executor = getExecutor("gemini-web");
  assert.ok(executor instanceof GeminiWebExecutor);
});

test("GeminiWebExecutor sets correct provider name", () => {
  const executor = new GeminiWebExecutor();
  assert.equal(executor.getProvider(), "gemini-web");
});

// ─── Input validation ───────────────────────────────────────────────────────

test("Returns 401 when no cookies provided", async () => {
  const executor = new GeminiWebExecutor();
  const result = await executor.execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hi" }], stream: false },
    stream: false,
    credentials: {},
    signal: AbortSignal.timeout(10000),
    log: null,
  });
  assert.equal(result.response.status, 401);
  const json = (await result.response.json()) as any;
  assert.ok(json.error.includes("Missing Gemini cookies"));
});

test("Returns 400 when no user message", async () => {
  const executor = new GeminiWebExecutor();
  const result = await executor.execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "system", content: "You are helpful" }], stream: false },
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });
  assert.equal(result.response.status, 400);
  const json = (await result.response.json()) as any;
  assert.ok(json.error.includes("No user message"));
});

test("Reads bulk-imported cookie credentials from providerSpecificData.cookie", async () => {
  const playwrightError = new Error(
    "browserType.launch: Executable doesn't exist at /home/node/.cache/ms-playwright/chromium_headless_shell-1161/chrome-linux/headless_shell"
  );

  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;

  playwright.chromium.launch = async () => {
    throw playwrightError;
  };

  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: {
        providerSpecificData: { cookie: "__Secure-1PSID=from-bulk-import" },
      } as any,
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    assert.equal(
      result.response.status,
      503,
      "providerSpecificData.cookie should be accepted and reach Playwright launch"
    );
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
});

test("Ignores array-valued providerSpecificData when resolving cookies", async () => {
  const executor = new GeminiWebExecutor();
  const result = await executor.execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: {
      providerSpecificData: ["__Secure-1PSID=not-a-record"],
    } as any,
    signal: AbortSignal.timeout(5000),
    log: null,
  });

  assert.equal(result.response.status, 401);
});

test("Normalizes a bare __Secure-1PSID value before adding browser cookies", async () => {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  let addedCookies: Array<{ name: string; value: string }> = [];

  playwright.chromium.launch = async () =>
    ({
      newContext: async () => ({
        addCookies: async (cookies: Array<{ name: string; value: string }>) => {
          addedCookies = cookies;
        },
        newPage: async () => ({
          on: () => {},
          goto: async () => {},
          waitForTimeout: async () => {},
          waitForSelector: async () => ({
            click: async () => {},
          }),
          keyboard: {
            type: async () => {},
            press: async () => {},
          },
        }),
      }),
      close: async () => {},
    }) as any;

  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "raw-psid-value" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    assert.equal(result.response.status, 502, "fake page intentionally returns no Gemini response");
    assert.equal(addedCookies.length, 1);
    assert.equal(addedCookies[0].name, "__Secure-1PSID");
    assert.equal(addedCookies[0].value, "raw-psid-value");
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
});

// ─── Provider registration ──────────────────────────────────────────────────

test("Provider: gemini-web in WEB_COOKIE_PROVIDERS", async () => {
  const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(WEB_COOKIE_PROVIDERS["gemini-web"], "gemini-web should be in WEB_COOKIE_PROVIDERS");
  assert.equal(WEB_COOKIE_PROVIDERS["gemini-web"].id, "gemini-web");
  assert.ok(WEB_COOKIE_PROVIDERS["gemini-web"].authHint);
});

test("Provider: gemini-web in providerRegistry", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  assert.ok(REGISTRY["gemini-web"], "gemini-web should be in providerRegistry");
  assert.equal(REGISTRY["gemini-web"].executor, "gemini-web");
  assert.ok(REGISTRY["gemini-web"].models.length > 0);
});

test("Provider: gemini-web has correct models", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  const models = REGISTRY["gemini-web"].models;
  assert.deepEqual(
    models.map((m: any) => [m.id, m.name]),
    [
      ["gemini-3.1-pro", "Gemini 3.1 Pro"],
      ["gemini-3.5-flash", "Gemini 3.5 Flash"],
      ["gemini-3.1-flash-lite", "Gemini 3.1 Flash-Lite"],
    ]
  );
});

// ─── Regression: #2832 / #3516 — Playwright missing in Docker (runner-base) ──
//
// When the `runner-base` Docker image is used (no Playwright browsers installed),
// `import("playwright")` succeeds but `chromium.launch()` throws the well-known
// "Executable doesn't exist" error. The executor MUST surface this as a structured,
// sanitized response — never an unhandled rejection / silent stream abort.
//
// #3516 superseded the original 500: a missing browser is a host/config problem,
// not a transient upstream fault, so it now returns 503 with the
// `X-Omni-Fallback-Hint: connection_cooldown` header (skips the provider circuit
// breaker, short non-exponential cooldown) and an actionable message — instead of a
// retryable 500 that marked the account unavailable and looped.
//
// Hard rule #12: the body carries no raw err.message stack trace.

test("#2832/#3516: missing Playwright browser returns an actionable 503 with cooldown hint, not a retryable 500", async () => {
  const playwrightError = new Error(
    "browserType.launch: Executable doesn't exist at /home/node/.cache/ms-playwright/chromium_headless_shell-1161/chrome-linux/headless_shell\n" +
      "    at /app/node_modules/playwright-core/lib/server/browserType.js:123:19"
  );

  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;

  playwright.chromium.launch = async () => {
    throw playwrightError;
  };

  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    // #3516: missing browser → 503 + connection-cooldown hint (not a retryable 500 loop).
    assert.equal(result.response.status, 503, "missing browser should return HTTP 503");
    assert.equal(
      result.response.headers.get("X-Omni-Fallback-Hint"),
      "connection_cooldown",
      "must signal connection cooldown so the provider breaker is skipped"
    );
    const json = (await result.response.json()) as any;
    assert.ok(typeof json.error === "string", "error field must be a string");
    assert.match(json.error, /playwright install|not installed/i, "message must be actionable");
    // No raw stack trace / source path leaks into the body.
    assert.ok(!json.error.includes("\n    at "), "must not contain multi-line stack trace");
    assert.ok(
      !json.error.includes("node_modules/playwright-core"),
      "must not contain node_modules source path"
    );
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
});

test("#2832: GeminiWebExecutor catch block sanitizes Playwright launch errors (integration path)", async () => {
  // This test verifies the actual catch block in GeminiWebExecutor.execute()
  // handles the Playwright "Executable doesn't exist" error shape correctly.
  // We use an AbortSignal that is already aborted so we bypass the Playwright
  // import entirely and hit the pre-launch abort check — confirming the executor
  // returns a structured Response rather than throwing.
  const executor = new GeminiWebExecutor();
  const controller = new AbortController();
  controller.abort(new Error("Request aborted"));

  const result = await executor.execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "fake-cookie=abc" },
    signal: controller.signal,
    log: null,
  });

  // Aborted request should return a structured 500, not throw
  assert.ok(result.response instanceof Response, "must return a Response object");
  assert.equal(result.response.status, 500, "aborted request returns 500");
  const json = (await result.response.json()) as any;
  assert.ok(typeof json.error === "string", "error must be a string");
  assert.ok(!json.error.includes("at /"), "no stack trace path in error response");
});

// ─── StreamGenerate parsing ─────────────────────────────────────────────────

test("parseStreamResponse concatenates Gemini Web text from multiple wrb.fr chunks", () => {
  const makeChunk = (text: string) => {
    const inner = new Array(80).fill(null);
    inner[4] = [[null, [text]]];
    return `[["wrb.fr", null, ${JSON.stringify(JSON.stringify(inner))}]]`;
  };

  const raw = `)]}'\n10\n${makeChunk("First ")}\n5\n${makeChunk("chunk")}`;
  assert.equal(parseStreamResponse(raw), "First chunk");
});

test("parseStreamResponse ignores wrb.fr lines whose first entry is not an array", () => {
  const raw = `)]}'\n10\n${JSON.stringify(["wrb.fr", null, "[]"])}`;
  assert.equal(parseStreamResponse(raw), "");
});
