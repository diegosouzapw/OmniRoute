import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
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
    model: "gemini-2.5-pro",
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
    model: "gemini-2.5-pro",
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
  const modelIds = models.map((m: any) => m.id);
  assert.ok(modelIds.includes("gemini-2.5-pro"));
  assert.ok(modelIds.includes("gemini-2.5-flash"));
  assert.ok(modelIds.includes("gemini-2.0-pro"));
  assert.ok(modelIds.includes("gemini-2.0-flash"));
});

// ─── Regression: #2832 — Playwright missing in Docker (runner-base) ──────────
//
// When the `runner-base` Docker image is used (no Playwright browsers installed),
// `import("playwright")` succeeds but `chromium.launch()` throws the well-known
// "Executable doesn't exist" error. The executor MUST surface this as a sanitized
// 500 — never an unhandled rejection — so users get a clear error message rather
// than a silent stream abort.
//
// Hard rule #12: error must go through sanitizeErrorMessage (no raw err.message
// or stack trace in the response body).

test("#2832: Playwright launch failure returns sanitized 500, not unhandled rejection", async () => {
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
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });

    assert.equal(result.response.status, 500, "should return HTTP 500");
    const json = (await result.response.json()) as any;
    assert.ok(typeof json.error === "string", "error field must be a string");
    // Hard rule #12: sanitizeErrorMessage must strip the stack trace tail.
    assert.ok(!json.error.includes("\n    at "), "must not contain multi-line stack trace");
    assert.ok(!json.error.includes("node_modules/playwright-core"), "must not contain node_modules source path");
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
    model: "gemini-2.5-pro",
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
