/**
 * Regression for GitHub issue #13232 — "[BUG] Z.ai web error".
 *
 * The Z.ai web transport drives a real headed Chromium browser (via Playwright) to get past
 * Z.ai's CAPTCHA. When the local Playwright Chromium binary is missing,
 * `browserType.launch()` throws "Executable doesn't exist at ...". Before this fix, zai-web.ts
 * had no classification for that failure and surfaced it as a plain 502 with no fallback hint —
 * a status that trips the whole-provider circuit breaker (`AGENTS.md` → "Provider Circuit
 * Breaker") as if the upstream itself were failing, instead of applying the intended
 * host/config connection cooldown. This mirrors the exact failure class already handled for
 * Gemini Web in #3516 (`isMissingBrowserExecutable`, now shared via
 * `open-sse/executors/browserExecutableCheck.ts`).
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Buffer } from "node:buffer";

const mod = await import("../../open-sse/executors/zai-web.ts");

const TEST_TOKEN = `e30.${Buffer.from(JSON.stringify({ id: "user-123" })).toString("base64url")}.sig`;

describe("issue #13232 — Z.ai browser transport classifies a missing Chromium install", () => {
  let emptyBrowsersDir: string;
  let originalBrowsersPath: string | undefined;

  before(() => {
    emptyBrowsersDir = fs.mkdtempSync(path.join(os.tmpdir(), "playwright-empty-"));
    originalBrowsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
    // Force chromium.launch() to genuinely fail with the exact class of error the reporter hit
    // ("Executable doesn't exist at ..."), without touching any real ~/.cache/ms-playwright
    // install.
    process.env.PLAYWRIGHT_BROWSERS_PATH = emptyBrowsersDir;
  });

  after(() => {
    if (originalBrowsersPath === undefined) {
      delete process.env.PLAYWRIGHT_BROWSERS_PATH;
    } else {
      process.env.PLAYWRIGHT_BROWSERS_PATH = originalBrowsersPath;
    }
    fs.rmSync(emptyBrowsersDir, { recursive: true, force: true });
  });

  it(
    "returns a classified 503 + X-Omni-Fallback-Hint: connection_cooldown instead of a bare " +
      "502 (contrast: gemini-web.ts isMissingBrowserExecutable, #3516)",
    async () => {
      const executor = new mod.ZaiWebExecutor();
      const body = { model: "glm-5.3-flash", messages: [{ role: "user", content: "hi" }] };
      const result = await executor.execute({
        model: "glm-5.3-flash",
        body,
        stream: false,
        credentials: { apiKey: TEST_TOKEN },
        signal: null,
      });

      assert.ok("response" in result, "expected an error Response, not a stream result");
      const response = (result as { response: Response }).response;
      const payload = (await response.json()) as { error?: { message?: string } };

      assert.equal(
        response.status,
        503,
        "zai-web must classify a missing local Chromium install as a host/config error (503), " +
          "not a generic retryable 502 that trips the whole-provider circuit breaker."
      );
      assert.equal(
        response.headers.get("X-Omni-Fallback-Hint"),
        "connection_cooldown",
        "the connection-cooldown hint must be set so accountFallback applies a short cooldown " +
          "instead of tripping the provider circuit breaker."
      );
      assert.match(
        payload.error?.message ?? "",
        /Playwright Chromium browser.*not installed.*npx playwright install chromium/s
      );
    }
  );
});
